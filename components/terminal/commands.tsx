import React from "react";
import { type CommandDef } from "./types";

const whoami: CommandDef = {
  description: "Display current user info",
  action: () => {
    return {
      result: (
        <div className="text-muted-foreground">
          <span className="text-green-500 font-bold">visitor</span>
          <span className="text-blue-500 font-bold">system</span>
        </div>
      ),
      status: "success",
    };
  },
};

const clear: CommandDef = {
  description: "Clear the terminal screen",
  aliases: ["cls"],
  action: ({ clearHistory }) => {
    return {
      result: clearHistory(),
      status: "success",
    };
  },
};

const help: CommandDef = {
  description: "List available commands",
  action: () => {
    return {
      result: (
        <div className="flex flex-col gap-2 mt-2">
          <div className="text-primary font-bold mb-1">Available Commands:</div>
          <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-1 text-sm">
            {/* TODO: show the aliases in help */}
            {Object.entries(COMMAND_REGISTRY).map(([key, cmd]) => {
              if (cmd.aliases?.includes(key)) return null;
              return (
                <React.Fragment key={key}>
                  <span className="text-yellow-500 font-mono">{key}</span>
                  <span className="text-muted-foreground">
                    {cmd.description}
                  </span>
                </React.Fragment>
              );
            })}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Tip: Use <kbd className="bg-muted px-1 rounded">Tab</kbd> to
            autocomplete.
          </div>
        </div>
      ),
      status: "success",
    };
  },
};

export const COMMAND_REGISTRY: Record<string, CommandDef> = {
  // commands i define
  whoami,

  // system commands
  clear,
  cls: clear,
  help,
};
