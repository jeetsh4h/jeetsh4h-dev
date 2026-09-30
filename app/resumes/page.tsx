import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowUpRight, IconDownload } from "@tabler/icons-react";

import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getResumes } from "@/lib/resumes";

export const metadata: Metadata = {
  title: "Resumes",
  description:
    "Role-specific resumes for Jeet Shah, with PDF downloads and update dates.",
  alternates: { canonical: "/resumes" },
  robots: { index: false, follow: true },
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default async function ResumesPage() {
  const resumes = await getResumes();

  return (
    <main
      id="main-content"
      className="flex-1 font-mono"
    >
      <div className="mx-auto flex w-full items-center justify-between px-4 py-2 md:p-4">
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          variant="link"
          className="text-xs"
        >
          <span aria-hidden="true">←</span>
          <span className="underline">../home</span>
        </Button>
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-12 pt-3 md:pb-16 md:pt-6">
        <header className="mb-8 space-y-3 border-l-2 border-accent pl-4">
          <h1 className="text-3xl font-bold text-primary md:text-4xl">
            resumes
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            One-page resumes tailored to each role. For my full experience,
            research, and education,{" "}
            <Link
              href="/cv.pdf"
              className="text-primary underline underline-offset-4"
            >
              view my CV
            </Link>
            .
          </p>
        </header>

        <ul
          className="space-y-4"
          aria-label="Role-specific resumes"
        >
          {resumes.map((resume) => (
            <li key={resume.slug}>
              <Card variant="content">
                <CardHeader className="gap-2 px-0">
                  <h2 className="text-lg font-semibold text-primary">
                    {resume.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {resume.description}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 px-0 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Updated{" "}
                    <time dateTime={resume.updatedAt}>
                      {dateFormatter.format(
                        new Date(`${resume.updatedAt}T00:00:00Z`),
                      )}
                    </time>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      nativeButton={false}
                      render={
                        <a
                          href={resume.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                      variant="secondary"
                      size="icon"
                      aria-label={`View ${resume.title} resume PDF (new tab)`}
                    >
                      <IconArrowUpRight
                        className="size-4"
                        aria-hidden="true"
                      />
                    </Button>
                    <Button
                      nativeButton={false}
                      render={
                        <a
                          href={resume.href}
                          download
                        />
                      }
                      variant="secondary"
                      size="icon"
                      aria-label={`Download ${resume.title} resume PDF`}
                    >
                      <IconDownload
                        className="size-4"
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
