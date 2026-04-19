"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import ShaderOverlay from "./shader-overlay";

export default function TerminalCrtOverlay() {
  const { resolvedTheme } = useTheme();

  return (
    <ShaderOverlay
      fragmentPath="/shaders/terminal.frag"
      sizeMode="element"
      className={cn(
        "pointer-events-none absolute inset-0 z-10 size-full transition-opacity duration-1000 rounded-sm",
        resolvedTheme === "dark" ?
          "opacity-80 mix-blend-overlay"
        : "opacity-40 mix-blend-multiply",
      )}
    />
  );
}
