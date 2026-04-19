"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { IconGitCommit } from "@tabler/icons-react";

import { Card, CardHeader } from "@/components/ui/card";
import TerminalCrtOverlay from "@/components/ui/terminal-crt-overlay";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { useTerminalDimensions } from "./hooks/use-dimension";
import { useTerminal } from "./hooks/use-terminal";
import { SpotifyPromptSegment } from "./spotify-prompt-segment";

const WalkingCat = dynamic(() => import("./walking-cat"), {
  ssr: false,
});

function getCommitHash() {
  const commitSha = process.env.NEXT_PUBLIC_COMMIT_SHA ?? "HEAD";

  if (commitSha === "HEAD") {
    return commitSha;
  }

  return commitSha.slice(0, 7);
}

const ActivePrompt = ({
  refreshTrigger,
  children,
}: {
  refreshTrigger: number;
  children: React.ReactNode;
}) => {
  const commitHash = getCommitHash();

  return (
    <div className="mt-2 flex flex-col gap-1 w-full">
      <div className="flex items-center justify-between w-full pr-4 flex-wrap">
        <div className="flex items-center text-xs font-bold select-none">
          <div className="flex items-center">
            <span className="text-muted-foreground/70">[</span>
            <span className="text-primary">guest</span>
            <span className="text-accent/80">@</span>
            <span className="text-primary">jeetsh4h-dev</span>
            <span className="text-accent/80">:</span>
            <span className="text-secondary">~</span>
            <span className="text-muted-foreground/70">]</span>
          </div>

          <div className="flex items-center text-accent">
            <span className="text-muted-foreground/70">[</span>
            <IconGitCommit
              size={14}
              className="-ml-0.5"
            />
            <span>{commitHash}</span>
            <span className="text-muted-foreground/70">]</span>
          </div>
        </div>

        <div className="shrink-0">
          <SpotifyPromptSegment refreshTrigger={refreshTrigger} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-accent text-lg leading-none select-none">❯</span>
        {children}
      </div>
    </div>
  );
};

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
        status === "error" ? "text-destructive" : "text-term-success",
      )}
    >
      ❯
    </span>
    <span className="text-sm text-foreground whitespace-pre-wrap">
      {command}
    </span>
  </div>
);

interface TerminalProps {
  initialCommand?: string;
  externalCommand?: string | null;
}

export function Terminal({
  initialCommand = "help",
  externalCommand = null,
}: TerminalProps) {
  const searchParams = useSearchParams();
  const autoRunCommand = searchParams.get("cmd") || undefined;

  return (
    <TerminalBase
      initialCommand={initialCommand}
      autoRunCommand={autoRunCommand}
      externalCommand={externalCommand}
      key={autoRunCommand}
    />
  );
}

function TerminalBase({
  initialCommand,
  autoRunCommand,
  externalCommand,
}: TerminalProps & { autoRunCommand?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastExternalCommandRef = useRef<string | null>(null);

  const dimensions = useTerminalDimensions(containerRef);
  const { history, input, setInput, handleKeyDown, suggestion, execute } =
    useTerminal(dimensions, initialCommand, autoRunCommand);

  useEffect(() => {
    if (!externalCommand) {
      lastExternalCommandRef.current = null;
      return;
    }

    if (externalCommand === lastExternalCommandRef.current) {
      return;
    }

    lastExternalCommandRef.current = externalCommand;
    execute(externalCommand);
    inputRef.current?.focus();
  }, [execute, externalCommand]);

  useEffect(() => {
    const scrollAreaViewport = containerRef.current?.querySelector(
      '[data-slot="scroll-area-viewport"]',
    ) as HTMLElement;

    if (!scrollAreaViewport) return;

    const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
      scrollAreaViewport.scrollTo({
        top: scrollAreaViewport.scrollHeight,
        behavior,
      });
    };

    scrollToBottom("auto");

    const timeout = setTimeout(() => {
      scrollToBottom("auto");
    }, 250);

    return () => clearTimeout(timeout);
  }, [history, dimensions]);

  const handleFocus = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    inputRef.current?.focus();
  };

  return (
    <Card
      ref={containerRef}
      className="w-full h-full overflow-hidden font-mono text-sm min-h-0 p-0 gap-0 relative rounded-sm shadow-md"
      onClick={handleFocus}
    >
      <TerminalCrtOverlay />

      <CardHeader className="relative flex-none border-b py-3 bg-card z-20 flex flex-row items-center justify-between space-y-0">
        <WalkingCat />

        <div className="flex items-center gap-2 mt-1">
          <div className="size-3 rounded-full bg-[#ff5f56] border border-[#e0443e] hover:bg-[#ff5f56]/80 shadow-sm" />
          <div className="size-3 rounded-full bg-[#ffbd2e] border border-[#dea123] hover:bg-[#ffbd2e]/80 shadow-sm" />
          <div className="size-3 rounded-full bg-[#27c93f] border border-[#1aab29] hover:bg-[#27c93f]/80 shadow-sm" />
        </div>
        <div className="w-12" />
      </CardHeader>

      <ScrollArea
        className="flex-1 w-full min-h-0"
        scrollThumbClassName="rounded-b-md"
      >
        <div className="px-4 pb-4 pt-1">
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

          <ActivePrompt refreshTrigger={history.length}>
            <div className="relative flex-1">
              <span className="text-muted-foreground opacity-50 select-none absolute left-0 top-0 pointer-events-none whitespace-pre-wrap break-all inline-block">
                <span className="opacity-0">{input}</span>
                <span>{suggestion}</span>
              </span>

              <input
                ref={inputRef}
                className={cn(
                  "relative w-full bg-transparent text-foreground font-medium outline-none border-none caret-secondary ring-0 p-0 m-0",
                  "focus:ring-0 focus:outline-none",
                )}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onTouchEnd={(e) => {
                  if (suggestion) {
                    e.preventDefault();
                    setInput((prev) => prev + suggestion);
                  }
                }}
                autoComplete="off"
                spellCheck={false}
                autoFocus
              />
            </div>
          </ActivePrompt>

          <div className="h-4" />
        </div>
      </ScrollArea>
    </Card>
  );
}
