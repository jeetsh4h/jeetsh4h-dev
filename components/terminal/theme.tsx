"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export type ThemeArgs = "--toggle" | "--system";
export const isThemeArg = (value: string): value is ThemeArgs =>
  value === "--toggle" || value === "--system";

export function Theme({ args }: { args: [] | [ThemeArgs] }) {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [output, setOutput] = useState<React.ReactNode | null>(null);

  const hasExecuted = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || hasExecuted.current) return;

    hasExecuted.current = true;
    const arg = args[0];

    if (!arg) {
      setOutput(
        <p className="text-foreground text-xs">
          Current theme is{" "}
          <span className="rounded bg-muted px-1 pb-0.5">{theme}</span>.
        </p>,
      );
      return;
    }

    if (arg === "--toggle") {
      const next = resolvedTheme === "dark" ? "light" : "dark";
      setTheme(next);
      setOutput(
        <p className="text-foreground text-xs">
          Theme toggled to{" "}
          <span className="rounded bg-muted px-1 pb-0.5">{next}</span>.
        </p>,
      );
      return;
    }

    if (arg === "--system") {
      setTheme("system");
      setOutput(
        <p className="text-foreground text-xs">
          Theme set to <span className="rounded bg-muted px-1">system</span>.
        </p>,
      );
      return;
    }

    // Ideally never reaches here due to prior validation, but just in case
    setOutput(<p className="text-destructive">Invalid argument</p>);

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [mounted]);

  return output;
}
