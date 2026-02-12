"use client";

import { Terminal } from "@/components/terminal/terminal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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

    window.visualViewport.addEventListener("resize", handleResize);
    window.visualViewport.addEventListener("scroll", handleResize);

    // Set initial height
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
    };
  }, []);

  return (
    <div
      className="flex w-full flex-col overflow-hidden relative"
      style={{ height: viewportHeight }}
    >
      {/* Fixed Header */}
      <div className="flex-none p-4 pb-2">
        <Link href="/">
          <Button
            variant="link"
            className="group flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-secondary hover:decoration-secondary transition-colors hover:no-underline cursor-pointer"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            <span className="underline">../home</span>
          </Button>
        </Link>
      </div>

      {/* Terminal fills remaining space */}
      <div className="w-full flex-1 min-h-0 max-w-3xl mx-auto px-4 pb-4">
        <Terminal />
      </div>
    </div>
  );
}
