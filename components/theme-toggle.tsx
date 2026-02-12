"use client";

import { Button } from "./ui/button";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setMounted(true);
  }, []);

  return (
    <div className="relative flex group">
      <Button
        className="size-9 rounded bg-card text-accent border-accent cursor-pointer group-hover:rounded-r-none btn-group"
        onClick={() => {
          if (!mounted) return;
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        }}
      >
        <IconMoon
          className={`size-4 ${resolvedTheme === "dark" && mounted ? "" : "hidden"}`}
        />
        <IconSun
          className={`size-4 ${resolvedTheme === "light" && mounted ? "" : "hidden"}`}
        />
      </Button>
      <Button
        className="absolute left-9 group-[:not(:hover)]:hidden size-9 rounded-r border-l-0 bg-card border-border hover:border-accent cursor-pointer btn-group"
        onClick={() => setTheme("system")}
      >
        <IconDeviceDesktop
          className={`size-4 ${theme === "system" ? "text-accent" : "text-muted-foreground"}`}
        />
      </Button>
    </div>
  );
}
