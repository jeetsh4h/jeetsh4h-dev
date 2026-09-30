import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PDFViewer from "@/components/pdf-viewer";
import ThemeToggle from "@/components/theme-toggle";

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
      <div className="mx-auto flex w-full flex-none items-center justify-between px-4 pt-2 pb-2 md:p-4 md:pb-2">
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
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Button>
        </nav>
        <ThemeToggle />
      </div>
      <div className="mx-auto min-h-0 w-full max-w-6xl flex-1 px-4 pb-4">
        <PDFViewer />
      </div>
    </main>
  );
}
