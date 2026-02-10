"use client";

import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTerminalDimensions } from "./use-dimension";
import { useTerminal } from "./use-terminal";
import { cn } from "@/lib/utils";

const ActivePrompt = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-2 flex flex-col gap-1 animate-in fade-in duration-300">
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 select-none">
      <span className="text-term-user">visitor</span>
      <span className="text-term-muted">::</span>
      <span className="text-term-host">~</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-term-path text-lg leading-none">❯</span>
      {children}
    </div>
  </div>
);

const TransientPrompt = ({
  command,
  status,
}: {
  command: string;
  status?: "success" | "error";
}) => (
  <div className="flex items-center gap-2 mb-2">
    <span
      className={cn(
        "text-lg leading-none select-none",
        status === "error" ? "text-term-error" : "text-term-path",
      )}
    >
      ❯
    </span>
    <span className="font-mono text-sm text-foreground whitespace-pre-wrap">
      {command}
    </span>
  </div>
);

export function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const dimensions = useTerminalDimensions(containerRef);
  const { history, input, setInput, handleKeyDown, suggestion } =
    useTerminal(dimensions);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleFocus = () => inputRef.current?.focus();

  return (
    <div
      ref={containerRef}
      className="w-full max-w-3xl mx-auto h-[85vh] min-h-100 bg-term-bg border-2 border-term-border rounded-2xl shadow-xl overflow-hidden flex flex-col font-mono text-sm p-6 relative ring-offset-2 transition-colors duration-300"
      onClick={handleFocus}
    >
      <ScrollArea className="flex-1 h-full pr-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="mb-4"
          >
            {item.type === "command" ?
              <TransientPrompt
                command={item.content as string}
                status={item.status}
              />
            : <div className="pl-4 border-l-2 border-term-border/50 ml-1 animate-in slide-in-from-left-2 duration-200 text-term-muted">
                {item.content}
              </div>
            }
          </div>
        ))}

        <ActivePrompt>
          <div className="relative flex-1">
            <span className="whitespace-pre-wrap break-all text-foreground font-medium">
              {input}
            </span>

            <span className="inline-block w-0.5 h-5 bg-term-caret align-middle -mt-1 animate-caret-blink opacity-80" />

            <span className="text-muted-foreground opacity-50 select-none">
              {suggestion}
            </span>

            <input
              ref={inputRef}
              className="absolute inset-0 w-full h-full opacity-0 cursor-default"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </ActivePrompt>

        <div
          ref={bottomRef}
          className="h-12"
        />
      </ScrollArea>
    </div>
  );
}
