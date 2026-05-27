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
      <div className="relative space-y-2">
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {intro.name}
          </h1>

          <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center md:flex">
            <Button
              nativeButton={false}
              render={<Link href="/terminal" />}
              variant={null}
              className="h-9 rounded cursor-pointer mr-2 bg-primary text-primary-foreground border-transparent hover:bg-primary-foreground hover:text-primary hover:border-primary transition-all"
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
                    variant={null}
                    className="h-9 rounded cursor-pointer mr-2 bg-secondary-foreground text-secondary border-secondary hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all"
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

        <p className="text-xl font-semibold text-secondary max-w-2xl">
          {intro.role}
        </p>
        <p className="text-sm text-muted-foreground">{intro.location}</p>
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
          variant={null}
          className="flex h-9 rounded cursor-pointer mr-2 bg-primary text-primary-foreground border-transparent hover:bg-primary-foreground hover:text-primary hover:border-primary transition-all"
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
                variant={null}
                className="flex h-9 rounded cursor-pointer mr-2 bg-secondary-foreground text-secondary border-secondary hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all"
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
