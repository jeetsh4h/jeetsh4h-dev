"use client";

import { useCallback, useMemo, useState } from "react";

import { executeParsedCommand } from "../command-executor";
import { parseCommandInput } from "../command-parser";
import { TERMINAL_COMMAND_NAMES } from "../command-registry";
import type { TerminalCommandResult } from "../command-types";
import type { HistoryItem, TerminalDimensions } from "../types";
import type { PublishedDiaryEntrySummary } from "@/lib/diary/metadata";

function createHistoryItemId() {
  return crypto.randomUUID();
}

function createOutputEntry(
  result: Extract<TerminalCommandResult, { kind: "render" }>,
): HistoryItem {
  return {
    id: createHistoryItemId(),
    type: "output",
    content: result.node,
    timestamp: Date.now(),
    status: result.status,
  };
}

function createErrorEntry(message: string): HistoryItem {
  return {
    id: createHistoryItemId(),
    type: "error",
    content: message,
    timestamp: Date.now(),
    status: "error",
  };
}

function applyCommandToHistory({
  history,
  commandStr,
  dimensions,
  diaryEntries,
  includeCommandEntry,
}: {
  history: HistoryItem[];
  commandStr: string;
  dimensions: TerminalDimensions;
  diaryEntries: PublishedDiaryEntrySummary[];
  includeCommandEntry: boolean;
}) {
  const parsedCommand = parseCommandInput(commandStr);

  if (!parsedCommand) {
    return { history, executedCommand: null as string | null };
  }

  const result = executeParsedCommand(parsedCommand, {
    args: parsedCommand.args,
    dimensions,
    diaryEntries,
  });

  if (result.kind === "clear") {
    return {
      history: [],
      executedCommand: parsedCommand.rawInput,
    };
  }

  const nextEntries: HistoryItem[] = [];

  if (includeCommandEntry) {
    nextEntries.push({
      id: createHistoryItemId(),
      type: "command",
      content: parsedCommand.rawInput,
      commandName: parsedCommand.rawName,
      timestamp: Date.now(),
      status: result.kind === "error" ? "error" : result.status,
    });
  }

  if (result.kind === "render") {
    nextEntries.push(createOutputEntry(result));
  } else {
    nextEntries.push(createErrorEntry(result.message));
  }

  return {
    history: [...history, ...nextEntries],
    executedCommand: parsedCommand.rawInput,
  };
}

export function useTerminal(
  dimensions: TerminalDimensions,
  initialCommand?: string,
  autoRunCommand?: string,
  diaryEntries: PublishedDiaryEntrySummary[] = [],
) {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    let nextHistory: HistoryItem[] = [];

    if (initialCommand && !autoRunCommand) {
      nextHistory = applyCommandToHistory({
        history: nextHistory,
        commandStr: initialCommand,
        dimensions,
        diaryEntries,
        includeCommandEntry: false,
      }).history;
    }

    if (autoRunCommand) {
      nextHistory = applyCommandToHistory({
        history: nextHistory,
        commandStr: autoRunCommand,
        dimensions,
        diaryEntries,
        includeCommandEntry: true,
      }).history;
    }

    return nextHistory;
  });

  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cmdHistory, setCmdHistory] = useState<string[]>(() => {
    const trimmed = autoRunCommand?.trim();
    return trimmed ? [trimmed] : [];
  });

  const suggestion = useMemo(() => {
    if (!input.trim()) return "";

    const match = TERMINAL_COMMAND_NAMES.find((commandName) =>
      commandName.startsWith(input.toLowerCase()),
    );

    if (match && match !== input.toLowerCase()) {
      return match.slice(input.length);
    }

    return "";
  }, [input]);

  const execute = useCallback(
    (commandStr: string) => {
      const trimmed = commandStr.trim();
      if (!trimmed) return;

      const executedCommand = parseCommandInput(trimmed)?.rawInput ?? null;

      setHistory(
        (prev) =>
          applyCommandToHistory({
            history: prev,
            commandStr: trimmed,
            dimensions,
            diaryEntries,
            includeCommandEntry: true,
          }).history,
      );
      setCmdHistory((prev) => {
        if (!executedCommand || prev[prev.length - 1] === executedCommand) {
          return prev;
        }

        return [...prev, executedCommand];
      });
      setHistoryIndex(-1);
      setInput("");
    },
    [dimensions, diaryEntries],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      execute("clear");
    } else if (e.key === "Enter") {
      execute(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;

      const newIndex =
        historyIndex === -1 ?
          cmdHistory.length - 1
        : Math.max(0, historyIndex - 1);

      setHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;

      if (historyIndex < cmdHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) {
        setInput(input + suggestion);
      }
    } else if (e.key === "ArrowRight") {
      if (suggestion && e.currentTarget.selectionStart === input.length) {
        e.preventDefault();
        setInput(input + suggestion);
      }
    }
  };

  return {
    history,
    input,
    setInput,
    handleKeyDown,
    suggestion,
    execute,
  };
}
