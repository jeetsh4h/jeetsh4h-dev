import fs from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";

import {
  type DiaryEntryMetadata,
  type DiaryEntrySummary,
  type PublishedDiaryEntrySummary,
} from "@/lib/diary/metadata";

const DIARY_CONTENT_DIR = path.join(process.cwd(), "content", "diary");
const MDX_EXTENSION = ".mdx";
const VALID_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type DiaryEntryModule = {
  default: ComponentType;
  metadata?: DiaryEntryMetadata;
};

export type DiaryEntry = DiaryEntrySummary & {
  Component: ComponentType;
};

export type PublishedDiaryEntry = PublishedDiaryEntrySummary & {
  Component: ComponentType;
};

export function getSlugFromFilename(filename: string) {
  if (!filename.endsWith(MDX_EXTENSION)) {
    throw new Error(`Diary entry filename must end with ${MDX_EXTENSION}.`);
  }

  return filename.slice(0, -MDX_EXTENSION.length);
}

function assertValidSlug(slug: string) {
  if (!VALID_SLUG_PATTERN.test(slug)) {
    throw new Error(`Invalid diary entry slug: ${slug}`);
  }
}

async function getDiaryEntryFiles() {
  const filenames = await fs.readdir(DIARY_CONTENT_DIR);
  const mdxFiles = filenames.filter((filename) =>
    filename.endsWith(MDX_EXTENSION),
  );
  const seen = new Set<string>();

  for (const filename of mdxFiles) {
    const slug = getSlugFromFilename(filename);
    assertValidSlug(slug);

    if (seen.has(slug)) {
      throw new Error(`Duplicate diary entry slug: ${slug}`);
    }

    seen.add(slug);
  }

  return mdxFiles.sort();
}

async function readDiaryEntryMetadata(
  filename: string,
): Promise<DiaryEntrySummary> {
  const slug = getSlugFromFilename(filename);
  const entryModule = await importDiaryEntryModule(slug);

  if (!entryModule.metadata) {
    throw new Error(`${filename} must export metadata.`);
  }

  return {
    slug,
    ...entryModule.metadata,
  };
}

function isPublishedEntry(
  entry: DiaryEntrySummary,
): entry is PublishedDiaryEntrySummary {
  return !entry.draft && Boolean(entry.publishedAt && entry.editedAt);
}

function sortNewestFirst(entries: DiaryEntrySummary[]) {
  return [...entries].sort((first, second) => {
    const dateComparison = (second.publishedAt ?? "").localeCompare(
      first.publishedAt ?? "",
    );

    if (dateComparison !== 0) {
      return dateComparison;
    }

    return first.slug.localeCompare(second.slug);
  });
}

async function importDiaryEntryModule(slug: string) {
  return (await import(`@/content/diary/${slug}.mdx`)) as DiaryEntryModule;
}

export async function getAllDiaryEntries() {
  const files = await getDiaryEntryFiles();
  const entries = await Promise.all(files.map(readDiaryEntryMetadata));

  return sortNewestFirst(entries);
}

export async function getPublishedDiaryEntries() {
  const entries = await getAllDiaryEntries();

  return entries.filter(isPublishedEntry);
}

export async function getPublishedDiaryEntrySlugs() {
  const entries = await getPublishedDiaryEntries();

  return entries.map((entry) => entry.slug);
}

export async function getDiaryEntry(slug: string): Promise<DiaryEntry | null> {
  assertValidSlug(slug);

  const entries = await getAllDiaryEntries();
  const entry = entries.find((candidate) => candidate.slug === slug);

  if (!entry) {
    return null;
  }

  const entryModule = await importDiaryEntryModule(slug);

  return {
    ...entry,
    Component: entryModule.default,
  };
}

export async function getPublishedDiaryEntry(
  slug: string,
): Promise<PublishedDiaryEntry | null> {
  assertValidSlug(slug);

  const entries = await getPublishedDiaryEntries();
  const entry = entries.find((candidate) => candidate.slug === slug);

  if (!entry) {
    return null;
  }

  const entryModule = await importDiaryEntryModule(slug);

  return {
    ...entry,
    Component: entryModule.default,
  };
}
