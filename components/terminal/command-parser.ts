import { TERMINAL_COMMAND_ALIASES } from "./command-registry";
import type { ParsedCommand } from "./command-types";

export function parseCommandInput(input: string): ParsedCommand | null {
  const trimmed = input.trim();

  if (!trimmed) {
    return null;
  }

  const [rawName, ...args] = trimmed.split(/\s+/);
  const normalizedName = rawName.toLowerCase();

  return {
    rawInput: trimmed,
    rawName,
    commandName: TERMINAL_COMMAND_ALIASES[normalizedName] ?? normalizedName,
    args,
  };
}
