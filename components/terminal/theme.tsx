"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export type ThemeArgs = "--toggle" | "--system";
export const isThemeArg = (value: string): value is ThemeArgs =>
  value === "--toggle" || value === "--system";

export function Theme({ args }: { args: [] | [ThemeArgs] }) {
  const { setTheme, resolvedTheme, theme } = useTheme();

  // Capture static output values on initial mount so history doesn't update retroactively
  const [staticTheme] = useState(theme);
  const [staticNextTheme] = useState(() => {
    const effectiveTheme = resolvedTheme ?? theme ?? "light";
    return effectiveTheme === "dark" ? "light" : "dark";
  });

  const hasExecuted = useRef(false);

  useEffect(() => {
    if (hasExecuted.current) return;

    hasExecuted.current = true;
    const arg = args[0];

    if (!arg) return;

    if (arg === "--toggle") {
      setTheme(staticNextTheme);
      return;
    }

    if (arg === "--system") {
      setTheme("system");
    }
  }, [args, staticNextTheme, setTheme]);

  const arg = args[0];
  if (!arg) {
    return (
      <p className="text-foreground text-xs">
        Current theme is{" "}
        <span className="rounded bg-muted px-1 pb-0.5">{staticTheme}</span>.
      </p>
    );
  }

  if (arg === "--toggle") {
    return (
      <p className="text-foreground text-xs">
        Theme toggled to{" "}
        <span className="rounded bg-muted px-1 pb-0.5">{staticNextTheme}</span>.
      </p>
    );
  }

  if (arg === "--system") {
    return (
      <p className="text-foreground text-xs">
        Theme set to <span className="rounded bg-muted px-1">system</span>.
      </p>
    );
  }

  return <p className="text-destructive">Invalid argument</p>;
}
