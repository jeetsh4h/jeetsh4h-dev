import { TERMINAL_COMMAND_MAP } from "./command-registry";
import type {
  ParsedCommand,
  TerminalCommandContext,
  TerminalCommandResult,
} from "./command-types";

export function executeParsedCommand(
  parsedCommand: ParsedCommand,
  context: TerminalCommandContext,
): TerminalCommandResult {
  const command = TERMINAL_COMMAND_MAP[parsedCommand.commandName];

  if (!command) {
    return {
      kind: "error",
      message: `Command not found: "${parsedCommand.rawName}"`,
    };
  }

  try {
    return command.execute({
      ...context,
      args: parsedCommand.args,
    });
  } catch (error) {
    return {
      kind: "error",
      message: `Execution Error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
