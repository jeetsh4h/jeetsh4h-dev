import Link from "next/link";
import { Button } from "./ui/button";
import { IconTerminal2, IconFileCv } from "@tabler/icons-react";
import About from "./about";
import ThemeToggle from "./theme-toggle";
import Socials from "./socials";
import { TooltipTrigger, Tooltip, TooltipContent } from "./ui/tooltip";
import { buildIntroSection } from "@/lib/site-content";

export default function Profile() {
  const intro = buildIntroSection();

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {intro.name}
          </h1>
          <p className="text-xl font-semibold text-secondary">{intro.role}</p>
          <p className="text-sm text-muted-foreground">{intro.location}</p>
        </div>

        <div className="flex items-center">
          <Button
            nativeButton={false}
            render={<Link href="/terminal" />}
            className="hidden md:flex h-9 rounded cursor-pointer mr-2 hover:bg-primary-foreground hover:text-primary hover:border-primary transition-all"
          >
            <IconTerminal2 className="size-4" />
            <span>Open in Terminal</span>
          </Button>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  nativeButton={false}
                  render={<Link href="/pdf" />}
                  className="hidden md:flex h-9 rounded cursor-pointer mr-2 hover:bg-secondary hover:text-secondary-foreground bg-secondary-foreground text-secondary border-secondary transition-all"
                >
                  <IconFileCv className="size-4" />
                  <span>Open as PDF</span>
                </Button>
              }
            />
            <TooltipContent
              className="font-mono rounded bg-card text-muted-foreground border-border border inline-flex items-center justify-center whitespace-nowrap gap-1.5 px-1.5"
              side="bottom"
              alignOffset={2}
            >
              <IconTerminal2 className="size-3" />
              pdf
            </TooltipContent>
          </Tooltip>

          <ThemeToggle />
        </div>
      </div>

      <div className="relative">
        <About />
      </div>

      <div className="flex gap-6 text-sm">
        <Socials />
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden flex gap-1">
        <Button
          nativeButton={false}
          render={<Link href="/terminal" />}
          className="flex h-9 rounded cursor-pointer mr-2 hover:bg-primary-foreground hover:text-primary hover:border-primary transition-all"
        >
          <IconTerminal2 className="size-4" />
          <span>Open in Terminal</span>
        </Button>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                nativeButton={false}
                render={<Link href="/cv.pdf" />}
                className="flex h-9 rounded cursor-pointer mr-2 hover:bg-secondary hover:text-secondary-foreground bg-secondary-foreground text-secondary border-secondary transition-all"
              >
                <IconFileCv className="size-4" />
                <span>Open as PDF</span>
              </Button>
            }
          />
          <TooltipContent
            className="font-mono rounded bg-card text-muted-foreground border-border border inline-flex items-center justify-center whitespace-nowrap gap-1.5 px-1.5"
            side="bottom"
            alignOffset={2}
          >
            <IconTerminal2 className="size-3" />
            pdf
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
}
