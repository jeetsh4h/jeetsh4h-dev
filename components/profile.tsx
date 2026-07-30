import Link from "next/link";
import { Button } from "./ui/button";
import { IconTerminal2, IconFileCv } from "@tabler/icons-react";
import About from "./about";
import ThemeToggle from "./theme-toggle";
import Socials from "./socials";
import ReadmeCta from "./readme-cta";
import { TooltipTrigger, Tooltip, TooltipContent } from "./ui/tooltip";
import { buildIntroSection } from "@/lib/site-content";

export default function Profile() {
  const intro = buildIntroSection();

  return (
    <div className="relative overflow-hidden border border-input/70 bg-card/55 p-5 sm:p-7 md:p-9">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 size-80 rounded-full bg-primary/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-1/3 size-64 rounded-full bg-accent/8 blur-3xl"
      />

      <div className="relative space-y-7">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h1 className="min-w-0 text-4xl font-bold tracking-[-0.04em] text-primary sm:text-5xl md:text-6xl">
              {intro.name}
            </h1>
            <div className="flex shrink-0 items-center">
              <div className="hidden items-center md:flex">
                <Button
                  nativeButton={false}
                  render={<Link href="/terminal" />}
                  size="lg"
                  className="mr-2"
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
                        variant="secondary"
                        size="lg"
                        className="mr-2"
                      >
                        <IconFileCv className="size-4" />
                        <span>Open as PDF</span>
                      </Button>
                    }
                  />
                  <TooltipContent
                    side="bottom"
                    alignOffset={2}
                  >
                    <IconTerminal2 className="size-3" />
                    pdf
                  </TooltipContent>
                </Tooltip>
              </div>
              <ThemeToggle />
            </div>
          </div>
          <p className="max-w-3xl text-lg font-semibold text-secondary sm:text-xl">
            {intro.role}
          </p>
          <p className="text-sm text-subtext">{intro.location}</p>
        </div>

        <About />

        <div className="grid items-center gap-5 text-sm sm:grid-cols-[auto_minmax(0,1fr)]">
          <Socials />
          <ReadmeCta />
        </div>

        <div className="flex flex-wrap gap-2 md:hidden">
          <Button
            nativeButton={false}
            render={<Link href="/terminal" />}
            size="lg"
          >
            <IconTerminal2 className="size-4" />
            <span>Open in Terminal</span>
          </Button>

          <Button
            nativeButton={false}
            render={<Link href="/pdf" />}
            variant="secondary"
            size="lg"
          >
            <IconFileCv className="size-4" />
            <span>Open as PDF</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
