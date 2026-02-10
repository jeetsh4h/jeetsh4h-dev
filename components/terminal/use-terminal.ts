"use client";

import { useState, useCallback, useMemo } from "react";
import { HistoryItem, TerminalDimensions } from "./types";
import { COMMAND_REGISTRY } from "./commands";

export function useTerminal(
  dimensions: TerminalDimensions,
  initialCommand?: string,
) {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (!initialCommand) return [];

    const cmdKey = initialCommand.toLowerCase();
    const commandDef = COMMAND_REGISTRY[cmdKey];

    if (commandDef) {
      try {
        // Mock the context for the initial render
        const { result, status } = commandDef.action({
          args: [],
          dimensions,
          pushToHistory: () => {},
          clearHistory: () => {},
        });

        if (result) {
          return [
            {
              id: "welcome",
              type: "output",
              content: result,
              timestamp: 0,
              status: status,
            },
          ];
        }
      } catch (error) {
        console.error("Failed to execute initial command:", error);
      }
    }
    return [];
  });

  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const suggestion = useMemo(() => {
    if (!input.trim()) return "";

    const match = Object.keys(COMMAND_REGISTRY).find((cmd) =>
      cmd.startsWith(input.toLowerCase()),
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

      const [cmdKey, ...args] = trimmed.split(/\s+/);
      const commandDef = COMMAND_REGISTRY[cmdKey.toLowerCase()];

      let outputEntry: HistoryItem | null = null;
      let commandStatus: "success" | "error";

      if (commandDef) {
        try {
          const { result, status } = commandDef.action({
            args,
            dimensions,
            pushToHistory: (item: HistoryItem) =>
              setHistory((prev) => [...prev, item]),
            clearHistory: () => setHistory([]),
          });

          commandStatus = status;

          if (result) {
            outputEntry = {
              id: crypto.randomUUID(),
              type: "output",
              content: result,
              timestamp: Date.now(),
              status: status,
            };
          }
        } catch (error) {
          commandStatus = "error";
          outputEntry = {
            id: crypto.randomUUID(),
            type: "error",
            content: `Execution Error: ${error instanceof Error ? error.message : String(error)}`,
            timestamp: Date.now(),
            status: commandStatus,
          };
        }
      } else {
        commandStatus = "error";
        outputEntry = {
          id: crypto.randomUUID(),
          type: "error",
          content: `Command not found: "${cmdKey}"`,
          timestamp: Date.now(),
          status: commandStatus,
        };
      }

      const userEntry: HistoryItem = {
        id: crypto.randomUUID(),
        type: "command",
        content: trimmed,
        commandName: trimmed.split(" ")[0],
        timestamp: Date.now(),
        status: commandStatus,
      };

      setHistory((prev) => {
        if (cmdKey === "clear" || cmdKey === "cls") {
          return [];
        }
        const newItems = outputEntry ? [userEntry, outputEntry] : [userEntry];
        return [...prev, ...newItems];
      });

      setCmdHistory((prev) => {
        // TODO: Don't add duplicates if it's the same as the very last command?
        return [...prev, trimmed];
      });

      setHistoryIndex(-1);
      setInput("");
    },
    [dimensions],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
    }
    // TODO: allow right arrow to autocomplete as well
  };

  return {
    history,
    input,
    setInput,
    handleKeyDown,
    suggestion,
  };
}
