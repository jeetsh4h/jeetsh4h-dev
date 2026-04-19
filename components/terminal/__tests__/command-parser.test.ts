import { describe, expect, it } from "vitest";

import { parseCommandInput } from "../command-parser";

describe("parseCommandInput", () => {
  it("parses a bare command", () => {
    expect(parseCommandInput("help")).toMatchObject({
      rawInput: "help",
      rawName: "help",
      commandName: "help",
      args: [],
    });
  });

  it("trims whitespace and preserves argument order", () => {
    expect(parseCommandInput("  theme   --toggle   now  ")).toMatchObject({
      rawInput: "theme   --toggle   now",
      rawName: "theme",
      commandName: "theme",
      args: ["--toggle", "now"],
    });
  });

  it("resolves aliases to canonical command names", () => {
    expect(parseCommandInput("cls")).toMatchObject({
      rawName: "cls",
      commandName: "clear",
      args: [],
    });
  });

  it("returns null for empty input", () => {
    expect(parseCommandInput("   ")).toBeNull();
  });
});
