import ts from "typescript";

const DIARY_METADATA_MODULE = "@/lib/diary/metadata";

const diaryEntryMetadata = {
  meta: {
    type: "problem",
    docs: {
      description: "Require diary MDX files to start with typed metadata.",
    },
    schema: [],
  },

  create(context) {
    return {
      Program() {
        const sourceText = context.sourceCode.text;
        const prologue = readMdxPrologue(sourceText);

        if (!prologue.firstNonImport) {
          reportMissingMetadata(context);
          return;
        }

        const defineDiaryEntryImport = prologue.imports.some(
          (entry) =>
            entry.imported === "defineDiaryEntry" &&
            entry.local === "defineDiaryEntry" &&
            entry.source === DIARY_METADATA_MODULE &&
            !entry.typeOnly,
        );
        const statement = parseStatement(prologue.firstNonImport.text);

        if (!statement || !isExportedConstMetadata(statement)) {
          context.report({
            loc: offsetToLoc(sourceText, prologue.firstNonImport.offset),
            message:
              "Diary entries must export const metadata as the first non-import top-level statement.",
          });
          return;
        }

        const declaration = statement.declarationList.declarations[0];
        const initializer = declaration.initializer;

        if (
          !initializer ||
          !ts.isCallExpression(initializer) ||
          !ts.isIdentifier(initializer.expression) ||
          initializer.expression.text !== "defineDiaryEntry"
        ) {
          context.report({
            loc: offsetToLoc(
              sourceText,
              prologue.firstNonImport.offset +
                (initializer ?? declaration.name).getStart(),
            ),
            message:
              "Diary metadata must be created with defineDiaryEntry(...).",
          });
          return;
        }

        if (!defineDiaryEntryImport) {
          context.report({
            loc: offsetToLoc(
              sourceText,
              prologue.firstNonImport.offset +
                initializer.expression.getStart(),
            ),
            message:
              'defineDiaryEntry must be imported from "@/lib/diary/metadata".',
          });
        }
      },
    };
  },
};

export default diaryEntryMetadata;

function reportMissingMetadata(context) {
  context.report({
    loc: { line: 1, column: 0 },
    message:
      "Diary entries must export metadata before any non-import content.",
  });
}

function readMdxPrologue(sourceText) {
  const imports = [];
  let offset = 0;

  while (offset < sourceText.length) {
    offset = skipWhitespaceAndComments(sourceText, offset);

    if (startsWithWord(sourceText, offset, "import")) {
      const statement = collectJavaScriptStatement(sourceText, offset);
      imports.push(...readImports(statement.text));
      offset = statement.endOffset;
      continue;
    }

    if (offset >= sourceText.length) {
      return { firstNonImport: undefined, imports };
    }

    if (startsWithWord(sourceText, offset, "export")) {
      const statement = collectJavaScriptStatement(sourceText, offset);

      return {
        firstNonImport: {
          offset,
          text: statement.text,
        },
        imports,
      };
    }

    return {
      firstNonImport: undefined,
      imports,
    };
  }

  return { firstNonImport: undefined, imports };
}

function skipWhitespaceAndComments(sourceText, offset) {
  let currentOffset = offset;

  while (currentOffset < sourceText.length) {
    if (/\s/u.test(sourceText[currentOffset])) {
      currentOffset += 1;
      continue;
    }

    if (sourceText.startsWith("//", currentOffset)) {
      currentOffset = skipUntil(sourceText, currentOffset, "\n");
      continue;
    }

    if (sourceText.startsWith("/*", currentOffset)) {
      currentOffset = skipUntil(sourceText, currentOffset + 2, "*/") + 2;
      continue;
    }

    if (sourceText.startsWith("{/*", currentOffset)) {
      currentOffset = skipUntil(sourceText, currentOffset + 3, "*/}") + 3;
      continue;
    }

    if (sourceText.startsWith("<!--", currentOffset)) {
      currentOffset = skipUntil(sourceText, currentOffset + 4, "-->") + 3;
      continue;
    }

    return currentOffset;
  }

  return currentOffset;
}

function skipUntil(sourceText, offset, marker) {
  const markerOffset = sourceText.indexOf(marker, offset);

  return markerOffset === -1 ? sourceText.length : markerOffset;
}

function startsWithWord(sourceText, offset, word) {
  if (!sourceText.startsWith(word, offset)) {
    return false;
  }

  const nextCharacter = sourceText[offset + word.length];
  return !nextCharacter || !/[$_\p{ID_Continue}]/u.test(nextCharacter);
}

function collectJavaScriptStatement(sourceText, offset) {
  let currentOffset = offset;
  let quote;
  let lineComment = false;
  let blockComment = false;
  let braceDepth = 0;
  let bracketDepth = 0;
  let parenDepth = 0;

  while (currentOffset < sourceText.length) {
    const character = sourceText[currentOffset];
    const nextCharacter = sourceText[currentOffset + 1];
    const previousCharacter = sourceText[currentOffset - 1];

    if (lineComment) {
      if (character === "\n") {
        lineComment = false;
      }

      currentOffset += 1;
      continue;
    }

    if (blockComment) {
      if (character === "*" && nextCharacter === "/") {
        blockComment = false;
        currentOffset += 2;
        continue;
      }

      currentOffset += 1;
      continue;
    }

    if (quote) {
      if (character === quote && previousCharacter !== "\\") {
        quote = undefined;
      }

      currentOffset += 1;
      continue;
    }

    if (character === "/" && nextCharacter === "/") {
      lineComment = true;
      currentOffset += 2;
      continue;
    }

    if (character === "/" && nextCharacter === "*") {
      blockComment = true;
      currentOffset += 2;
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      currentOffset += 1;
      continue;
    }

    if (character === "{") {
      braceDepth += 1;
    } else if (character === "}") {
      braceDepth = Math.max(0, braceDepth - 1);
    } else if (character === "[") {
      bracketDepth += 1;
    } else if (character === "]") {
      bracketDepth = Math.max(0, bracketDepth - 1);
    } else if (character === "(") {
      parenDepth += 1;
    } else if (character === ")") {
      parenDepth = Math.max(0, parenDepth - 1);
    }

    const complete = braceDepth === 0 && bracketDepth === 0 && parenDepth === 0;

    if (complete && character === ";") {
      currentOffset += 1;
      break;
    }

    if (complete && character === "\n") {
      const text = sourceText.slice(offset, currentOffset);

      if (parseStatement(text)) {
        break;
      }
    }

    currentOffset += 1;
  }

  return {
    endOffset: currentOffset,
    text: sourceText.slice(offset, currentOffset),
  };
}

function readImports(statementText) {
  const statement = parseStatement(statementText);

  if (!statement || !ts.isImportDeclaration(statement)) {
    return [];
  }

  const source = getStringLiteralText(statement.moduleSpecifier);
  const importClause = statement.importClause;

  if (!source || !importClause?.namedBindings) {
    return [];
  }

  if (!ts.isNamedImports(importClause.namedBindings)) {
    return [];
  }

  return importClause.namedBindings.elements.map((specifier) => ({
    imported: (specifier.propertyName ?? specifier.name).text,
    local: specifier.name.text,
    source,
    typeOnly: importClause.isTypeOnly || specifier.isTypeOnly,
  }));
}

function parseStatement(statementText) {
  const sourceFile = ts.createSourceFile(
    "diary-entry-metadata.mdx.ts",
    statementText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  if (sourceFile.parseDiagnostics.length > 0) {
    return undefined;
  }

  return sourceFile.statements[0];
}

function isExportedConstMetadata(statement) {
  if (!ts.isVariableStatement(statement)) {
    return false;
  }

  const exported = statement.modifiers?.some(
    (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
  );
  const isConst =
    (statement.declarationList.flags & ts.NodeFlags.Const) ===
    ts.NodeFlags.Const;
  const declarations = statement.declarationList.declarations;

  return (
    Boolean(exported) &&
    isConst &&
    declarations.length === 1 &&
    ts.isIdentifier(declarations[0].name) &&
    declarations[0].name.text === "metadata"
  );
}

function getStringLiteralText(node) {
  if (ts.isStringLiteral(node)) {
    return node.text;
  }

  return undefined;
}

function offsetToLoc(sourceText, offset) {
  const beforeOffset = sourceText.slice(0, offset);
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
