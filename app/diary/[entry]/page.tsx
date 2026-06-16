import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ThemeToggle from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getPublishedDiaryEntry,
  getPublishedDiaryEntrySlugs,
  type PublishedDiaryEntry,
} from "@/lib/diary/entries";
import { SEO } from "@/lib/content/seo";

type DiaryEntryPageProps = {
  params: Promise<{
    entry: string;
  }>;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatEntryDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

async function getPublishedEntry(
  entrySlug: string,
): Promise<PublishedDiaryEntry | null> {
  try {
    return await getPublishedDiaryEntry(entrySlug);
  } catch {
    return null;
  }
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPublishedDiaryEntrySlugs();

  return slugs.map((slug) => ({ entry: slug }));
}

export async function generateMetadata({
  params,
}: DiaryEntryPageProps): Promise<Metadata> {
  const { entry: entrySlug } = await params;
  const entry = await getPublishedEntry(entrySlug);

  if (!entry) {
    return {};
  }

  const url = `/diary/${entry.slug}`;
  const title = entry.title;

  return {
    title,
    description: entry.description,
    alternates: {
      canonical: url,
    },
    authors: [{ name: "Jeet Shah", url: SEO.url }],
    openGraph: {
      title,
      description: entry.description,
      url,
      type: "article",
      publishedTime: entry.publishedAt,
      modifiedTime: entry.editedAt,
      authors: ["Jeet Shah"],
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: entry.description,
      images: ["/twitter-image"],
    },
  };
}

export default async function DiaryEntryPage({ params }: DiaryEntryPageProps) {
  const { entry: entrySlug } = await params;
  const entry = await getPublishedEntry(entrySlug);

  if (!entry) {
    notFound();
  }

  const { Component } = entry;

  return (
    <main
      id="main-content"
      className="flex-1 font-mono"
    >
      <div className="mx-auto flex w-full flex-none items-center justify-between px-4 pt-2 pb-2 md:p-4 md:pb-2">
        <Button
          nativeButton={false}
          render={<Link href="/diary" />}
          variant="link"
          className="flex text-xs"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span className="underline">../diary</span>
        </Button>
        <ThemeToggle />
      </div>

      <article className="mx-auto max-w-3xl px-6 pb-12 pt-3 md:pb-16 md:pt-6">
        <header className="mb-10 space-y-5 border-l-2 border-accent pl-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{formatEntryDate(entry.publishedAt)}</Badge>
            {entry.editedAt !== entry.publishedAt && (
              <Badge>Edited {formatEntryDate(entry.editedAt)}</Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-normal text-primary md:text-5xl">
            {entry.title}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {entry.description}
          </p>
          {entry.tags.length > 0 && (
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
          )}
        </header>

        <div className="diary-prose space-y-6">
          <Component />
        </div>
      </article>
    </main>
  );
}
