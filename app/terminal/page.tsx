"use client";

import { Terminal } from "@/components/terminal/terminal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState, Suspense } from "react";
import Footer from "@/components/footer";
import { IconTerminal2 } from "@tabler/icons-react";

export default function TerminalPage() {
  const [viewportHeight, setViewportHeight] = useState("100dvh");

  useEffect(() => {
    // Only run on client-side and if API is supported
    if (!window.visualViewport) return;

    const handleResize = () => {
      // Force the height to match the actual visible area (minus keyboard)
      setViewportHeight(`${window.visualViewport!.height}px`);

      // Prevent the document from scrolling out of view
      window.scrollTo(0, 0);
    };

    window.visualViewport.addEventListener("resize", handleResize, {
      passive: true,
    });
    window.visualViewport.addEventListener("scroll", handleResize, {
      passive: true,
    });

    // Set initial height
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
    };
  }, []);

  const triggerHelp = () => {
    window.dispatchEvent(
      new CustomEvent("run-terminal-command", { detail: "help" }),
    );
  };

  return (
    <>
      <div
        className="flex w-full flex-col relative"
        style={{ height: viewportHeight }}
      >
        <div className="flex-none p-4 pb-2 flex justify-between items-center w-full mx-auto">
          <Link href="/">
            <Button
              variant="link"
              className="group flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-secondary hover:decoration-secondary transition-colors hover:no-underline cursor-pointer px-0"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">
                ←
              </span>
              <span className="underline">../home</span>
            </Button>
          </Link>

          <Button
            onClick={triggerHelp}
            className="rounded bg-card text-accent hover:text-accent-foreground hover:bg-accent border border-border cursor-pointer shadow-sm transition-colors"
          >
            <IconTerminal2 className="size-4" />
            <span className="text-xs font-mono">help</span>
          </Button>
        </div>

        <div className="w-full flex-1 min-h-0 max-w-3xl mx-auto px-4 pb-4">
          <Suspense fallback={<div className="size-full" />}>
            <Terminal />
          </Suspense>
        </div>
      </div>
      <Footer className="mt-12" />
    </>
  );
}
