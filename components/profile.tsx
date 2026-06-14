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

            <ThemeToggle />
          </div>
        </div>

        <p className="text-xl font-semibold text-secondary max-w-2xl">
          {intro.role}
        </p>
        <p className="text-sm text-accent">{intro.location}</p>
      </div>

      <div className="relative">
        <About />
      </div>

      <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 text-sm sm:gap-6 md:min-h-24">
        <Socials />
        <ReadmeCta />
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden flex gap-1">
        <Button
          nativeButton={false}
          render={<Link href="/terminal" />}
          size="lg"
          className="flex mr-2"
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
                className="flex mr-2"
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
    </>
  );
}
