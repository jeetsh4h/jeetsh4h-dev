"use client";

import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader } from "@/components/ui/card";
import { useTerminalDimensions } from "./hooks/use-dimension";
import { useTerminal } from "./hooks/use-terminal";
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
        status === "error" ? "text-term-error" : "text-term-success",
      )}
    >
      ❯
    </span>
    <span className="font-mono text-sm text-foreground whitespace-pre-wrap">
      {command}
    </span>
  </div>
);

interface TerminalProps {
  initialCommand?: string;
}

export function Terminal({ initialCommand = "help" }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const dimensions = useTerminalDimensions(containerRef);
  const { history, input, setInput, handleKeyDown, suggestion } = useTerminal(
    dimensions,
    initialCommand,
  );

  useEffect(() => {
    // Immediate scroll
    bottomRef.current?.scrollIntoView({ behavior: "auto" });

    // Double-check scroll after 250ms (fixes iOS keyboard animation timing issues)
    const timeout = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 250);

    return () => clearTimeout(timeout);
  }, [history, dimensions]);

  const handleFocus = () => inputRef.current?.focus();

  return (
    <Card
      ref={containerRef}
      className="w-full h-full bg-term-bg border-term-border rounded-xl shadow-2xl overflow-hidden font-mono text-sm relative transition-colors duration-300 ring-4 ring-term-border/20 min-h-0 p-0 gap-0"
      onClick={handleFocus}
    >
      {/* Window Decorations / Header */}
      <CardHeader className="absolute top-0 left-0 right-0 z-20 flex flex-row items-center justify-between px-4 py-3 bg-term-bg border-b border-term-border select-none space-y-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] hover:bg-[#ff5f56]/80 transition-colors shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] hover:bg-[#ffbd2e]/80 transition-colors shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] hover:bg-[#27c93f]/80 transition-colors shadow-sm" />
        </div>
        <div className="text-xs text-term-muted font-bold opacity-60 flex items-center gap-2">
          <span className="hidden sm:inline">visitor@jeetsh4h-dev: ~</span>
          <span className="sm:hidden">terminal</span>
        </div>
        <div className="w-12" />
      </CardHeader>

      <ScrollArea className="h-full w-full">
        <div className="px-4 pb-4 pt-14">
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
              : <div className="pl-4 border-l-2 border-term-border/50 ml-0.5 text-term-muted">
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
            className="h-4"
          />
        </div>
      </ScrollArea>
    </Card>
  );
}
