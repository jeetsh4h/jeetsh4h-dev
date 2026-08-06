import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import type { PublishedDiaryEntrySummary } from "@/lib/diary/metadata";
import { executeParsedCommand } from "../command-executor";
import { parseCommandInput } from "../command-parser";
import { TERMINAL_COMMANDS } from "../command-registry";
import type { TerminalDimensions } from "../types";

const dimensions: TerminalDimensions = {
  cols: 80,
  rows: 24,
  width: 800,
  height: 600,
};

const context = {
  args: [],
  dimensions,
  diaryEntries: [],
};

function parseOrThrow(input: string) {
  const parsed = parseCommandInput(input);

  if (!parsed) {
    throw new Error(`Expected parsed command for "${input}"`);
  }

  return parsed;
}

describe("executeParsedCommand", () => {
  it("executes every registered command without throwing", () => {
    for (const command of TERMINAL_COMMANDS) {
      const result = executeParsedCommand(parseOrThrow(command.name), {
        ...context,
      });

      if (command.name === "clear") {
        expect(result).toEqual({ kind: "clear" });
      } else {
        expect(result.kind).toBe("render");
        if (result.kind === "render") {
          expect(result.status).toBe("success");
        }
      }
    }
  });

  it("returns clear for clear and cls", () => {
    expect(
      executeParsedCommand(parseOrThrow("clear"), {
        ...context,
      }),
    ).toEqual({ kind: "clear" });

    expect(
      executeParsedCommand(parseOrThrow("cls"), {
        ...context,
      }),
    ).toEqual({ kind: "clear" });
  });

  it("returns an error for unknown commands", () => {
    expect(
      executeParsedCommand(parseOrThrow("unknown"), {
        ...context,
      }),
    ).toEqual({
      kind: "error",
      message: 'Command not found: "unknown"',
    });
  });

  it("resolves aliases to the same canonical behavior", () => {
    const aliasResult = executeParsedCommand(parseOrThrow("bio"), {
      ...context,
    });
    const canonicalResult = executeParsedCommand(parseOrThrow("about"), {
      ...context,
    });

    expect(aliasResult.kind).toBe("render");
    expect(canonicalResult.kind).toBe("render");
    if (aliasResult.kind === "render" && canonicalResult.kind === "render") {
      expect(aliasResult.status).toBe(canonicalResult.status);
      expect(aliasResult.node).toEqual(canonicalResult.node);
    }
  });

  it("keeps theme argument validation behavior", () => {
    expect(
      executeParsedCommand(parseOrThrow("theme --invalid"), {
        ...context,
        args: ["--invalid"],
      }),
    ).toEqual({
      kind: "error",
      message: "Usage: theme [light | dark | system | toggle]",
    });
  });

  it("supports filtered CV and diary commands", () => {
    for (const input of [
      "experience engineering",
      "projects rust",
      "research thesis",
      "education coursework",
      "skills systems",
      "diary search programming",
      "help experience",
      "theme dark",
    ]) {
      const result = executeParsedCommand(parseOrThrow(input), {
        ...context,
        args: parseOrThrow(input).args,
      });

      expect(result.kind).toBe("render");
    }
  });

  it("renders the published diary entries supplied by the terminal page", () => {
    const diaryEntries: PublishedDiaryEntrySummary[] = [
      {
        slug: "terminal-diary-entry",
        title: "A terminal diary entry",
        description: "Loaded from the published diary index.",
        publishedAt: "2026-08-06",
        updatedAt: "2026-08-06",
        tags: ["terminal"],
        draft: false,
      },
    ];
    const result = executeParsedCommand(parseOrThrow("diary"), {
      ...context,
      diaryEntries,
    });

    expect(result.kind).toBe("render");
    if (result.kind === "render") {
      const output = renderToStaticMarkup(result.node);

      expect(output).toContain("A terminal diary entry");
      expect(output).toContain("2026-08-06");
      expect(output).toContain("/diary/terminal-diary-entry");
    }
  });

  it("returns usage errors for invalid filters", () => {
    expect(
      executeParsedCommand(parseOrThrow("experience sales"), {
        ...context,
        args: ["sales"],
      }),
    ).toEqual({
      kind: "error",
      message: "Usage: experience [engineering | research | teaching]",
    });

    expect(
      executeParsedCommand(parseOrThrow("diary search"), {
        ...context,
        args: ["search"],
      }),
    ).toEqual({
      kind: "error",
      message: "Usage: diary [list | read <slug> | search <text> | tag <tag>]",
    });
  });
});
