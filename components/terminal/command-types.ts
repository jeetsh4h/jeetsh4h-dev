import type { ReactNode } from "react";

import type { TerminalDimensions } from "./types";
import type { PublishedDiaryEntrySummary } from "@/lib/diary/metadata";

export type TerminalCommandStatus = "success" | "error";

export type TerminalCommandResult =
  | { kind: "render"; node: ReactNode; status: TerminalCommandStatus }
  | { kind: "clear" }
  | { kind: "error"; message: string };

export type TerminalCommandContext = {
  args: string[];
  dimensions: TerminalDimensions;
  diaryEntries: PublishedDiaryEntrySummary[];
};

export type TerminalCommandCategory =
  | "profile"
  | "writing"
  | "navigation"
  | "system"
  | "fun";

export type TerminalCommand = {
  name: string;
  description: string;
  category: TerminalCommandCategory;
  usage?: string;
  examples?: string[];
  aliases?: string[];
  execute: (context: TerminalCommandContext) => TerminalCommandResult;
};

export type ParsedCommand = {
  rawInput: string;
  rawName: string;
  commandName: string;
  args: string[];
};
