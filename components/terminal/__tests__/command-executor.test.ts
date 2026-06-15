import { describe, expect, it } from "vitest";

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
        args: [],
        dimensions,
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
        args: [],
        dimensions,
      }),
    ).toEqual({ kind: "clear" });

    expect(
      executeParsedCommand(parseOrThrow("cls"), {
        args: [],
        dimensions,
      }),
    ).toEqual({ kind: "clear" });
  });

  it("returns an error for unknown commands", () => {
    expect(
      executeParsedCommand(parseOrThrow("unknown"), {
        args: [],
        dimensions,
      }),
    ).toEqual({
      kind: "error",
      message: 'Command not found: "unknown"',
    });
  });

  it("resolves aliases to the same canonical behavior", () => {
    const aliasResult = executeParsedCommand(parseOrThrow("bio"), {
      args: [],
      dimensions,
    });
    const canonicalResult = executeParsedCommand(parseOrThrow("about"), {
      args: [],
      dimensions,
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
        args: ["--invalid"],
        dimensions,
      }),
    ).toEqual({
      kind: "error",
      message:
        "Invalid argument: --invalid. Usage: theme [--toggle | --system]",
    });
  });
});
