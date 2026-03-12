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

import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => Promise.resolve(ThemeToggleBase), {
  ssr: false,
});
export default ThemeToggle;

function ThemeToggleBase() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const isDark = resolvedTheme === "dark";

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
              aria-label="Toggle Theme"
            >
              {isDark ?
                <IconMoon className="size-4" />
              : <IconSun className="size-4" />}
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
              className="absolute left-0 top-9 md:left-9 md:top-0 md:group-[:not(:hover)]:opacity-0 md:group-[:not(:hover)]:pointer-events-none transition-opacity duration-300 ease-in-out size-9 rounded-b md:rounded-r border-t-0 md:border-t md:border-l-0 bg-card border-border hover:border-accent cursor-pointer"
              onClick={() => {
                if (theme !== "system") setTheme("system");
                else setTheme(resolvedTheme === "dark" ? "dark" : "light");
              }}
              aria-label="System Theme"
            >
              <IconDeviceDesktop
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
