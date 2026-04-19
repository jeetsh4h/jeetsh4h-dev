"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import ShaderOverlay from "./shader-overlay";

export default function CrtOverlay() {
  const { resolvedTheme } = useTheme();

  return (
    <ShaderOverlay
      fragmentPath="/shaders/background.frag"
      sizeMode="viewport"
      className={cn(
        "pointer-events-none fixed inset-0 z-50 h-full w-full transition-opacity duration-1000",
        resolvedTheme === "dark" ?
          "opacity-70 mix-blend-overlay"
        : "opacity-30 mix-blend-multiply",
      )}
    />
  );
}
