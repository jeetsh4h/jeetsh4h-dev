import type { ReactNode } from "react";

import type { TerminalDimensions } from "./types";

export type TerminalCommandStatus = "success" | "error";

export type TerminalCommandResult =
  | { kind: "render"; node: ReactNode; status: TerminalCommandStatus }
  | { kind: "clear" }
  | { kind: "error"; message: string };

export type TerminalCommandContext = {
  args: string[];
  dimensions: TerminalDimensions;
};

export type TerminalCommand = {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  execute: (context: TerminalCommandContext) => TerminalCommandResult;
};

export type ParsedCommand = {
  rawInput: string;
  rawName: string;
  commandName: string;
  args: string[];
};
