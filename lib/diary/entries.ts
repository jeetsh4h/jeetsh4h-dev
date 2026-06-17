import fs from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";

import {
  type DiaryEntryMetadata,
  type DiaryEntrySummary,
  type PublishedDiaryEntrySummary,
} from "@/lib/diary/metadata";

const DIARY_CONTENT_DIR = path.join(process.cwd(), "diary");
const MDX_EXTENSION = ".mdx";
const VALID_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type DiaryEntryModule = {
  default: ComponentType;
  metadata?: DiaryEntryMetadata;
};

export type DiaryEntrySourceOptions = {
  contentDir?: string;
  importEntryModule?: (
    slug: string,
    filePath: string,
  ) => Promise<DiaryEntryModule>;
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

function resolveDiaryEntrySource(options: DiaryEntrySourceOptions = {}) {
  return {
    contentDir: options.contentDir ?? DIARY_CONTENT_DIR,
    importEntryModule: options.importEntryModule ?? importDiaryEntryModule,
  };
}

async function getDiaryEntryFiles(contentDir: string) {
  const filenames = await fs.readdir(contentDir);
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
  source: ReturnType<typeof resolveDiaryEntrySource>,
): Promise<DiaryEntrySummary> {
  const slug = getSlugFromFilename(filename);
  const filePath = path.join(source.contentDir, filename);
  const entryModule = await source.importEntryModule(slug, filePath);

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
  return !entry.draft && Boolean(entry.publishedAt && entry.updatedAt);
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
  return (await import(`@/diary/${slug}.mdx`)) as DiaryEntryModule;
}

export async function getAllDiaryEntries(options?: DiaryEntrySourceOptions) {
  const source = resolveDiaryEntrySource(options);
  const files = await getDiaryEntryFiles(source.contentDir);
  const entries = await Promise.all(
    files.map((filename) => readDiaryEntryMetadata(filename, source)),
  );

  return sortNewestFirst(entries);
}

export async function getPublishedDiaryEntries(
  options?: DiaryEntrySourceOptions,
) {
  const entries = await getAllDiaryEntries(options);

  return entries.filter(isPublishedEntry);
}

export async function getPublishedDiaryEntrySlugs(
  options?: DiaryEntrySourceOptions,
) {
  const entries = await getPublishedDiaryEntries(options);

  return entries.map((entry) => entry.slug);
}

export async function getDiaryEntry(
  slug: string,
  options?: DiaryEntrySourceOptions,
): Promise<DiaryEntry | null> {
  assertValidSlug(slug);

  const source = resolveDiaryEntrySource(options);
  const entries = await getAllDiaryEntries(options);
  const entry = entries.find((candidate) => candidate.slug === slug);

  if (!entry) {
    return null;
  }

  const entryModule = await source.importEntryModule(
    slug,
    path.join(source.contentDir, `${slug}${MDX_EXTENSION}`),
  );

  return {
    ...entry,
    Component: entryModule.default,
  };
}

export async function getPublishedDiaryEntry(
  slug: string,
  options?: DiaryEntrySourceOptions,
): Promise<PublishedDiaryEntry | null> {
  assertValidSlug(slug);

  const source = resolveDiaryEntrySource(options);
  const entries = await getPublishedDiaryEntries(options);
  const entry = entries.find((candidate) => candidate.slug === slug);

  if (!entry) {
    return null;
  }

  const entryModule = await source.importEntryModule(
    slug,
    path.join(source.contentDir, `${slug}${MDX_EXTENSION}`),
  );

  return {
    ...entry,
    Component: entryModule.default,
  };
}
