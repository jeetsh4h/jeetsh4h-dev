import path from "node:path";

import { TraceMap, originalPositionFor } from "@jridgewell/trace-mapping";
import { compileSync } from "@mdx-js/mdx";
import { SourceMapGenerator } from "source-map";
import ts from "typescript";

const tsconfigCache = new Map();

const helperTypes =
  "\ntype MDXProps = { components?: any } & Record<string, unknown>;\n";

const mdxTypecheck = {
  meta: {
    type: "problem",
    docs: {
      description: "Typecheck MDX files through a virtual TSX module.",
    },
    schema: [],
  },

  create(context) {
    return {
      Program() {
        const filename = getAbsoluteFilename(context);

        if (!filename.endsWith(".mdx")) {
          return;
        }

        const sourceText = context.sourceCode.text;
        let compiled;

        try {
          compiled = compileSync(
            {
              path: filename,
              value: sourceText,
            },
            {
              format: "mdx",
              jsx: true,
              outputFormat: "program",
              SourceMapGenerator,
            },
          );
        } catch (error) {
          context.report({
            loc: getMdxCompileErrorLoc(error),
            message: getErrorMessage(error),
          });
          return;
        }

        const compiledText = String(compiled);
        const virtualText = toVirtualTsx(compiledText);
        const virtualFilename = `${filename}.tsx`;
        const traceMap = compiled.map ? new TraceMap(compiled.map) : undefined;
        const diagnostics = getVirtualDiagnostics(
          filename,
          virtualFilename,
          virtualText,
        );

        for (const diagnostic of diagnostics) {
          const mapped = mapDiagnostic({
            diagnostic,
            sourceText,
            traceMap,
            virtualText,
          });

          if (!mapped) {
            continue;
          }

          context.report({
            loc: mapped,
            message: ts.flattenDiagnosticMessageText(
              diagnostic.messageText,
              "\n",
            ),
          });
        }
      },
    };
  },
};

export default mdxTypecheck;

function getAbsoluteFilename(context) {
  const filename = context.physicalFilename ?? context.filename;

  if (path.isAbsolute(filename)) {
    return filename;
  }

  return path.resolve(process.cwd(), filename);
}

function getMdxCompileErrorLoc(error) {
  const line =
    typeof error?.line === "number" ? error.line
    : typeof error?.place?.start?.line === "number" ? error.place.start.line
    : 1;
  const column =
    typeof error?.column === "number" ? error.column - 1
    : typeof error?.place?.start?.column === "number" ?
      error.place.start.column - 1
    : 0;

  return {
    line,
    column: Math.max(0, column),
  };
}

function getErrorMessage(error) {
  if (typeof error?.message === "string") {
    return error.message;
  }

  return String(error);
}

function toVirtualTsx(compiledText) {
  return (
    compiledText
      .replace("/*@jsxRuntime automatic*/", "/* @jsxRuntime automatic */")
      .replace("/*@jsxImportSource react*/", "/* @jsxImportSource react */")
      .replace(
        "function _createMdxContent(props) {",
        "function _createMdxContent(props: MDXProps) {",
      )
      .replace(
        "export default function MDXContent(props = {}) {",
        "export default function MDXContent(props: MDXProps = {}) {",
      ) + helperTypes
  );
}

function getVirtualDiagnostics(sourceFilename, virtualFilename, virtualText) {
  const { compilerOptions } = getCompilerOptions(sourceFilename);
  const normalizedVirtualFilename = path.normalize(virtualFilename);
  const host = ts.createCompilerHost(compilerOptions, true);
  const originalFileExists = host.fileExists.bind(host);
  const originalReadFile = host.readFile.bind(host);
  const originalGetSourceFile = host.getSourceFile.bind(host);

  host.fileExists = (filename) =>
    isSameFilename(filename, normalizedVirtualFilename) ||
    originalFileExists(filename);
  host.readFile = (filename) =>
    isSameFilename(filename, normalizedVirtualFilename) ? virtualText : (
      originalReadFile(filename)
    );
  host.getSourceFile = (
    filename,
    languageVersion,
    onError,
    shouldCreateNewSourceFile,
  ) => {
    if (isSameFilename(filename, normalizedVirtualFilename)) {
      return ts.createSourceFile(
        normalizedVirtualFilename,
        virtualText,
        languageVersion,
        true,
        ts.ScriptKind.TSX,
      );
    }

    return originalGetSourceFile(
      filename,
      languageVersion,
      onError,
      shouldCreateNewSourceFile,
    );
  };

  const program = ts.createProgram(
    [normalizedVirtualFilename],
    compilerOptions,
    host,
  );
  const sourceFile = program.getSourceFile(normalizedVirtualFilename);

  if (!sourceFile) {
    return [];
  }

  return [
    ...program.getSyntacticDiagnostics(sourceFile),
    ...program.getSemanticDiagnostics(sourceFile),
  ].filter((diagnostic) => diagnostic.file === sourceFile);
}

function getCompilerOptions(sourceFilename) {
  const searchDirectory = path.dirname(sourceFilename);
  const configPath = ts.findConfigFile(
    searchDirectory,
    ts.sys.fileExists,
    "tsconfig.json",
  );

  if (!configPath) {
    return {
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        noEmit: true,
        skipLibCheck: true,
        strict: true,
        target: ts.ScriptTarget.ESNext,
      },
    };
  }

  const normalizedConfigPath = path.normalize(configPath);
  const cached = tsconfigCache.get(normalizedConfigPath);

  if (cached) {
    return cached;
  }

  const config = ts.readConfigFile(normalizedConfigPath, ts.sys.readFile);

  if (config.error) {
    return {
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        noEmit: true,
        skipLibCheck: true,
        strict: true,
        target: ts.ScriptTarget.ESNext,
      },
    };
  }

  const parsed = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    path.dirname(normalizedConfigPath),
  );
  const result = {
    compilerOptions: {
      ...parsed.options,
      incremental: false,
      noEmit: true,
      tsBuildInfoFile: undefined,
    },
  };

  tsconfigCache.set(normalizedConfigPath, result);
  return result;
}

function isSameFilename(left, right) {
  return path.normalize(left) === path.normalize(right);
}

function mapDiagnostic({ diagnostic, sourceText, traceMap, virtualText }) {
  if (
    diagnostic.start === undefined ||
    diagnostic.length === undefined ||
    !diagnostic.file
  ) {
    return { line: 1, column: 0 };
  }

  const start = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
  const generatedPosition = {
    line: start.line + 1,
    column: start.character,
  };

  if (isGeneratedMdxHelperDiagnostic(diagnostic, generatedPosition.line)) {
    return undefined;
  }

  const exactMapped = mapWithSourceMap(traceMap, generatedPosition);

  if (exactMapped) {
    return exactMapped;
  }

  const fallbackMapped = mapGeneratedSnippet({
    diagnostic,
    generatedPosition,
    sourceText,
    virtualText,
  });

  if (fallbackMapped) {
    return fallbackMapped;
  }

  if (isGeneratedMdxHelperDiagnostic(diagnostic, generatedPosition.line)) {
    return undefined;
  }

  return { line: 1, column: 0 };
}

function mapWithSourceMap(traceMap, generatedPosition) {
  if (!traceMap) {
    return undefined;
  }

  const original = originalPositionFor(traceMap, generatedPosition);

  if (original.line === null || original.column === null) {
    return undefined;
  }

  return {
    line: original.line,
    column: original.column,
  };
}

function mapGeneratedSnippet({
  diagnostic,
  generatedPosition,
  sourceText,
  virtualText,
}) {
  const diagnosticText = diagnostic.file.text.slice(
    diagnostic.start,
    diagnostic.start + diagnostic.length,
  );
  const generatedLineText = getLineText(virtualText, generatedPosition.line);
  const tagName = getNearestJsxTagName(
    generatedLineText,
    generatedPosition.column,
  );

  if (tagName) {
    const tagMapped = findInSourceJsxTag(sourceText, tagName, diagnosticText);

    if (tagMapped) {
      return tagMapped;
    }
  }

  const trimmedDiagnosticText = diagnosticText.trim();

  if (trimmedDiagnosticText.length > 1) {
    const sourceOffset = sourceText.indexOf(trimmedDiagnosticText);

    if (sourceOffset !== -1) {
      return offsetToLoc(sourceText, sourceOffset);
    }
  }

  return undefined;
}

function getLineText(text, line) {
  const lines = text.split(/\r?\n/u);
  return lines[line - 1] ?? "";
}

function getNearestJsxTagName(lineText, column) {
  const beforeDiagnostic = lineText.slice(0, Math.max(0, column) + 1);
  const matches = [
    ...beforeDiagnostic.matchAll(
      /<([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*)\b/gu,
    ),
  ];
  const lastMatch = matches.at(-1);

  return lastMatch?.[1];
}

function findInSourceJsxTag(sourceText, tagName, diagnosticText) {
  const tagPattern = new RegExp(`<${escapeRegExp(tagName)}(?=\\s|/|>)`, "gu");
  const trimmedDiagnosticText = diagnosticText.trim();
  let match;

  while ((match = tagPattern.exec(sourceText))) {
    const tagStart = match.index;
    const tagEnd = findOpeningTagEnd(sourceText, tagStart);
    const tagSource = sourceText.slice(tagStart, tagEnd);

    if (trimmedDiagnosticText.length === 0) {
      return offsetToLoc(sourceText, tagStart);
    }

    const diagnosticOffset = tagSource.indexOf(trimmedDiagnosticText);

    if (diagnosticOffset !== -1) {
      return offsetToLoc(sourceText, tagStart + diagnosticOffset);
    }
  }

  return undefined;
}

function findOpeningTagEnd(sourceText, startOffset) {
  let quote;
  let braceDepth = 0;

  for (let index = startOffset; index < sourceText.length; index += 1) {
    const character = sourceText[index];
    const previous = sourceText[index - 1];

    if (quote) {
      if (character === quote && previous !== "\\") {
        quote = undefined;
      }

      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }

    if (character === "{") {
      braceDepth += 1;
      continue;
    }

    if (character === "}") {
      braceDepth = Math.max(0, braceDepth - 1);
      continue;
    }

    if (character === ">" && braceDepth === 0) {
      return index + 1;
    }
  }

  return sourceText.length;
}

function offsetToLoc(text, offset) {
  const beforeOffset = text.slice(0, offset);
  const lineBreaks = beforeOffset.match(/\r?\n/gu);
  const line = lineBreaks ? lineBreaks.length + 1 : 1;
  const lastLineBreak = Math.max(
    beforeOffset.lastIndexOf("\n"),
    beforeOffset.lastIndexOf("\r"),
  );

  return {
    line,
    column: offset - lastLineBreak - 1,
  };
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function isGeneratedMdxHelperDiagnostic(diagnostic, generatedLine) {
  const diagnosticText =
    diagnostic.start === undefined || diagnostic.length === undefined ?
      ""
    : diagnostic.file.text.slice(
        diagnostic.start,
        diagnostic.start + diagnostic.length,
      );
  const lineText = getLineText(diagnostic.file.text, generatedLine);

  return (
    diagnosticText.includes("_components") ||
    diagnosticText.includes("_createMdxContent") ||
    diagnosticText.includes("MDXContent") ||
    diagnosticText.includes("MDXLayout") ||
    diagnosticText.includes("MDXProps") ||
    diagnosticText.includes("props.components") ||
    lineText.includes("function _createMdxContent") ||
    lineText.includes("export default function MDXContent") ||
    lineText.includes("@jsx")
  );
}
