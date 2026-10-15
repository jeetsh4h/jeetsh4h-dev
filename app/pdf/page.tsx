import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconDownload, IconExternalLink } from "@tabler/icons-react";
import PDFViewer from "@/components/pdf-viewer";
import ThemeToggle from "@/components/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CV_DOWNLOAD_FILENAME, CV_PATH } from "@/lib/cv";

export const metadata: Metadata = {
  title: "CV",
  description: "Jeet Shah's CV as an embeddable PDF viewer.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PDFPage() {
  return (
    <main
      id="main-content"
      className="h-dvh flex flex-col"
    >
      <div className="mx-auto flex w-full flex-none items-center justify-between gap-2 px-4 pt-2 pb-2 md:p-4 md:pb-2">
        <nav
          aria-label="Page navigation"
          className="flex items-center gap-3"
        >
          <Button
            nativeButton={false}
            render={<Link href="/" />}
            variant="link"
            className="text-xs"
          >
            <span
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-0.5"
            >
              ←
            </span>
            <span className="underline">../home</span>
          </Button>
          <span
            aria-hidden="true"
            className="h-4 border-l border-border"
          />
          <Button
            nativeButton={false}
            render={<Link href="/resumes" />}
            variant="link"
            className="text-xs"
          >
            <span className="underline">./résumés</span>
            <span
              aria-hidden="true"
              className="hidden transition-transform group-hover:translate-x-0.5 min-[24rem]:inline"
            >
              →
            </span>
          </Button>
        </nav>
        <div className="flex items-center gap-2">
          <div className="flex">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    nativeButton={false}
                    render={
                      <a
                        href={CV_PATH}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    variant="secondary"
                    size="icon-lg"
                    className="rounded-r-none"
                    aria-label="Open CV in a new tab"
                  >
                    <IconExternalLink
                      className="size-4"
                      aria-hidden="true"
                    />
                  </Button>
                }
              />
              <TooltipContent side="bottom">Open CV</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    nativeButton={false}
                    render={
                      <a
                        href={CV_PATH}
                        download={CV_DOWNLOAD_FILENAME}
                      />
                    }
                    variant="secondary"
                    size="icon-lg"
                    className="-ml-px rounded-l-none"
                    aria-label="Download CV PDF"
                  >
                    <IconDownload
                      className="size-4"
                      aria-hidden="true"
                    />
                  </Button>
                }
              />
              <TooltipContent side="bottom">Download PDF</TooltipContent>
            </Tooltip>
          </div>
          <ThemeToggle />
        </div>
      </div>
      <div className="mx-auto min-h-0 w-full max-w-6xl flex-1 px-4 pb-4">
        <PDFViewer />
      </div>
    </main>
  );
}
