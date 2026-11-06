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
  const emailLink = intro.socialLinks.find((link) =>
    link.href.startsWith("mailto:"),
  );

  return (
    <div className="relative overflow-hidden sm:border sm:border-input/70 sm:bg-card/55 sm:p-7 md:p-9">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 hidden size-80 rounded-full bg-primary/8 blur-3xl sm:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-1/3 hidden size-64 rounded-full bg-accent/8 blur-3xl sm:block"
      />

      <div className="relative space-y-7">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h1 className="min-w-0 text-4xl font-bold tracking-[-0.04em] text-primary sm:text-5xl md:text-6xl">
              {intro.name}
            </h1>
            <div className="flex shrink-0 items-center">
              <ThemeToggle />
            </div>
          </div>
          <p className="max-w-3xl text-lg font-semibold text-secondary-readable sm:text-xl">
            {intro.role}
          </p>
          <p className="text-sm text-subtext">{intro.location}</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground">
            <span>Open to Summer 2027 internships</span>
            {emailLink && (
              <a
                href={emailLink.href}
                className="rounded-sm text-primary-readable underline decoration-primary-readable/40 underline-offset-4 hover:decoration-primary-readable"
              >
                {emailLink.href.slice("mailto:".length)}
              </a>
            )}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    nativeButton={false}
                    render={<a href="/resumes/software-engineer.pdf" />}
                    size="lg"
                  >
                    <IconFileCv className="size-4" />
                    <span>Résumé</span>
                  </Button>
                }
              />
              <TooltipContent
                side="bottom"
                alignOffset={2}
              >
                one page, pdf
              </TooltipContent>
            </Tooltip>

            <Button
              nativeButton={false}
              render={<Link href="/terminal" />}
              variant="secondary"
              className="border-secondary-readable text-secondary-readable hover:bg-secondary-readable"
              size="lg"
            >
              <IconTerminal2 className="size-4" />
              <span>Open in Terminal</span>
            </Button>

            <Link
              href="/resumes"
              className="self-center rounded-sm text-sm text-subtext underline decoration-subtext/40 underline-offset-4 hover:text-primary-readable hover:decoration-primary-readable"
            >
              all résumés
            </Link>
          </div>
        </div>

        <About />

        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5 text-sm">
          <Socials />
          <ReadmeCta />
        </div>
      </div>
    </div>
  );
}
