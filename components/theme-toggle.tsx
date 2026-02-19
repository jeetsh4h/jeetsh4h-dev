"use client";

import { Button } from "./ui/button";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setMounted(true);
  }, []);

  return (
    <div className="relative flex group">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              className="size-9 rounded bg-card text-accent border-accent cursor-pointer group-hover:rounded-r-none"
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
          }
        />
        <TooltipContent
          className="font-mono rounded bg-card text-muted-foreground border-border border"
          side="bottom"
          alignOffset={2}
        >
          theme --toggle
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              className="absolute left-9 group-[:not(:hover)]:opacity-0 group-[:not(:hover)]:pointer-events-none transition-opacity duration-300 ease-in-out size-9 rounded-r border-l-0 bg-card border-border hover:border-accent cursor-pointer"
              onClick={() => {
                if (theme !== "system") setTheme("system");
                else setTheme(resolvedTheme!);
              }}
            >
              <IconDeviceDesktop
                suppressHydrationWarning
                className={`size-4 ${theme === "system" ? "text-accent" : "text-muted-foreground"}`}
              />
            </Button>
          }
        />
        <TooltipContent
          className="font-mono rounded bg-card text-muted-foreground border-border border"
          side="bottom"
        >
          theme --system
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
