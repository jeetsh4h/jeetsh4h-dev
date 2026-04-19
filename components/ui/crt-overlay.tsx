"use client";

import ShaderOverlay from "./shader-overlay";

export default function CrtOverlay() {
  return (
    <ShaderOverlay
      fragmentPath="/shaders/background.frag"
      sizeMode="viewport"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-30 mix-blend-multiply transition-opacity duration-1000 dark:opacity-70 dark:mix-blend-overlay"
    />
  );
}
