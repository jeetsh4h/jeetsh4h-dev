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
  loading: () => <ThemeToggleSkeleton />,
  ssr: false,
});
export default ThemeToggle;

function ThemeToggleSkeleton() {
  return (
    <div
      className="flex"
      aria-hidden="true"
    >
      <div className="size-9 rounded-r-none rounded bg-card border border-accent" />
      <div className="-ml-px size-9 rounded-l-none rounded bg-card border border-border" />
    </div>
  );
}

function ThemeToggleBase() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const toggleSystemTheme = () => {
    if (theme !== "system") {
      setTheme("system");
      return;
    }

    setTheme(isDark ? "dark" : "light");
  };

  return (
    <div className="flex">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              className="relative z-10 size-9 rounded rounded-r-none bg-card text-accent border-border hover:z-20 hover:border-accent focus-visible:z-20 cursor-pointer"
              onClick={toggleTheme}
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
              className="relative z-10 -ml-px size-9 rounded rounded-l-none bg-card border-border hover:z-20 hover:border-accent focus-visible:z-20 cursor-pointer"
              onClick={toggleSystemTheme}
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
