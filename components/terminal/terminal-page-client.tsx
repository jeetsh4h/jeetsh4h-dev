"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { IconTerminal2 } from "@tabler/icons-react";
import Link from "next/link";
import Footer from "@/components/footer";
import { Terminal } from "@/components/terminal/terminal";
import { Button } from "@/components/ui/button";

const MIN_ZOOMED_TERMINAL_PAGE_HEIGHT_PX = 560;

function getTerminalPageHeight(viewport: VisualViewport) {
  const height =
    viewport.scale > 1 ?
      Math.max(viewport.height, MIN_ZOOMED_TERMINAL_PAGE_HEIGHT_PX)
    : viewport.height;

  return `${height}px`;
}

export default function TerminalPageClient() {
  const [viewportHeight, setViewportHeight] = useState("100dvh");
  const [externalCommand, setExternalCommand] = useState<string | null>(null);
  const helpTriggerTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!window.visualViewport) return;

    const handleResize = () => {
      setViewportHeight(getTerminalPageHeight(window.visualViewport!));
      window.scrollTo(0, 0);
    };

    window.visualViewport.addEventListener("resize", handleResize, {
      passive: true,
    });
    window.visualViewport.addEventListener("scroll", handleResize, {
      passive: true,
    });

    handleResize();

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (helpTriggerTimeoutRef.current !== null) {
        window.clearTimeout(helpTriggerTimeoutRef.current);
      }
    };
  }, []);

  const triggerHelp = () => {
    if (helpTriggerTimeoutRef.current !== null) {
      window.clearTimeout(helpTriggerTimeoutRef.current);
    }

    setExternalCommand(null);
    helpTriggerTimeoutRef.current = window.setTimeout(() => {
      setExternalCommand("help");
      helpTriggerTimeoutRef.current = null;
    }, 0);
  };

  return (
    <>
      <main
        id="main-content"
        className="relative flex w-full flex-col"
        style={{ height: viewportHeight }}
      >
        <div className="mx-auto flex w-full flex-none items-center justify-between px-4 pt-2 pb-2 md:p-4 md:pb-2">
          <Button
            nativeButton={false}
            render={<Link href="/" />}
            variant="link"
            className="flex text-xs"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            <span className="underline">../home</span>
          </Button>

          <Button
            onClick={triggerHelp}
            variant="tertiary"
          >
            <IconTerminal2 className="size-4" />
            <span className="text-xs font-mono">help</span>
          </Button>
        </div>

        <div className="mx-auto min-h-0 w-full max-w-3xl flex-1 px-4 pb-4">
          <Suspense fallback={<div className="size-full" />}>
            <Terminal externalCommand={externalCommand} />
          </Suspense>
        </div>
      </main>
      <Footer className="mt-12" />
    </>
  );
}
