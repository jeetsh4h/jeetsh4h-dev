"use client";

import { Button } from "./ui/button";
import {
  IconDeviceDesktop,
  IconMoon,
  IconSun,
  IconTerminal2,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const effectiveTheme = resolvedTheme ?? theme;
  const isDark = effectiveTheme === "dark";

  return (
    <div className="relative flex group">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              className="size-9 rounded bg-card text-accent border-accent cursor-pointer group-hover:rounded-r-none"
              onClick={() => {
                setTheme(isDark ? "light" : "dark");
              }}
            >
              <IconMoon
                suppressHydrationWarning
                className={`size-4 ${isDark ? "" : "hidden"}`}
              />
              <IconSun
                suppressHydrationWarning
                className={`size-4 ${!isDark ? "" : "hidden"}`}
              />
            </Button>
          }
        />
        <TooltipContent
          className="font-mono rounded bg-card text-muted-foreground border-border border inline-flex items-center justify-center whitespace-nowrap gap-1.5 px-1.5"
          side="bottom"
          alignOffset={2}
        >
          <IconTerminal2 className="size-3" />
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
                else setTheme(effectiveTheme === "dark" ? "dark" : "light");
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
          className="font-mono rounded bg-card text-muted-foreground border-border border inline-flex items-center justify-center whitespace-nowrap gap-1.5 px-1.5"
          side="bottom"
        >
          <IconTerminal2 className="size-3" />
          theme --system
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
