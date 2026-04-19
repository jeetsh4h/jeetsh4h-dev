"use client";

import ShaderOverlay from "./shader-overlay";

export default function TerminalCrtOverlay() {
  return (
    <ShaderOverlay
      fragmentPath="/shaders/terminal.frag"
      sizeMode="element"
      className="pointer-events-none absolute inset-0 z-10 size-full rounded-sm opacity-40 mix-blend-multiply transition-opacity duration-1000 dark:opacity-80 dark:mix-blend-overlay"
    />
  );
}
