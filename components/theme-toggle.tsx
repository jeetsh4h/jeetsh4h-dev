"use client";

import * as React from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 border border-term-border rounded bg-term-bg opacity-50" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center w-9 h-9 rounded border border-term-border bg-term-bg text-term-muted hover:text-term-user hover:border-term-user transition-all group relative"
      aria-label="Toggle theme"
    >
      <IconSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
      <IconMoon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute" />

      <span className="absolute top-full mt-2 right-0 text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-term-bg border border-term-border px-2 py-1 rounded text-term-muted pointer-events-none z-50">
        mode --toggle
      </span>
    </button>
  );
}

import { useState } from "react";
