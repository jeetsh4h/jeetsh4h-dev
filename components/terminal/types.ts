import { type ReactNode } from "react";

export type TerminalDimensions = {
  cols: number; // Width in characters
  rows: number; // Height in lines
  width: number; // Width in pixels
  height: number; // Height in pixels
};

export type CommandContext = {
  args: string[];
  dimensions: TerminalDimensions;
  pushToHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
};

export type CommandResult = {
  result: ReactNode | void;
  status: "success" | "error";
};
export type CommandAction = (context: CommandContext) => CommandResult;

export type CommandDef = {
  description: string;
  usage?: string;
  aliases?: string[];
  action: CommandAction;
};

export type HistoryItem = {
  id: string;
  type: "command" | "output" | "error";
  content: ReactNode;
  timestamp: number;
  // TODO: use typescript shenanigans to make this only present if type === 'command' else undefined
  commandName?: string;
  status?: "success" | "error";
};
