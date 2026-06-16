import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPublishedDiaryEntries } from "@/lib/diary/entries";
import ThemeToggle from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Diary",
  description:
    "Writing by Jeet Shah on software engineering, systems, web interfaces, and research.",
  alternates: {
    canonical: "/diary",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: "Diary | Jeet Shah",
    description:
      "Writing by Jeet Shah on software engineering, systems, web interfaces, and research.",
    url: "/diary",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diary | Jeet Shah",
    description:
      "Writing by Jeet Shah on software engineering, systems, web interfaces, and research.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatEntryDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

export default async function DiaryPage() {
  const entries = await getPublishedDiaryEntries();

  return (
    <main
      id="main-content"
      className="flex-1 font-mono"
    >
      {/* TODO: add cmd-k search bar and theme toggle */}
      <div className="mx-auto flex w-full flex-none items-center justify-between px-4 pt-2 pb-2 md:p-4 md:pb-2">
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          variant="link"
          className="flex text-xs"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span className="underline">../home</span>
        </Button>
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-12 pt-3 md:pb-16 md:pt-6">
        <div className="mb-10 space-y-3 border-l-2 border-accent pl-4">
          <h1 className="text-3xl font-bold tracking-normal text-primary md:text-4xl">
            diary
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            An SEO-friendly albeit random archive of my thoughts, learnings, and
            interests.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {entries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/diary/${entry.slug}`}
              className="group block"
            >
              <Card variant="interactive">
                <CardHeader className="px-0">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <CardTitle className="text-lg text-primary">
                      {entry.title}
                    </CardTitle>
                    <Badge>{formatEntryDate(entry.publishedAt)}</Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {entry.description}
                  </CardDescription>
                </CardHeader>
                {entry.tags.length > 0 && (
                  <CardContent className="px-0">
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <Badge
                          key={tag}
                          size="xs"
                          className="text-muted-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
