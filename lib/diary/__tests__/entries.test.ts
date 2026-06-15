import fs from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  getAllDiaryEntries,
  getPublishedDiaryEntries,
  getPublishedDiaryEntry,
  getSlugFromFilename,
} from "../entries";

async function getExpectedSlugs() {
  const filenames = await fs.readdir(
    path.join(process.cwd(), "content", "diary"),
  );

  return filenames
    .filter((filename) => filename.endsWith(".mdx"))
    .map(getSlugFromFilename)
    .sort();
}

describe("diary entry helpers", () => {
  it("derives unique slugs from MDX filenames", async () => {
    const expectedSlugs = await getExpectedSlugs();
    const entries = await getAllDiaryEntries();
    const actualSlugs = entries.map((entry) => entry.slug).sort();

    expect(actualSlugs).toEqual(expectedSlugs);
    expect(new Set(actualSlugs).size).toBe(actualSlugs.length);
  });

  it("excludes drafts from published helpers", async () => {
    const allEntries = await getAllDiaryEntries();
    const draftSlugs = allEntries
      .filter((entry) => entry.draft)
      .map((entry) => entry.slug);
    const publishedEntries = await getPublishedDiaryEntries();
    const publishedSlugs = publishedEntries.map((entry) => entry.slug);

    expect(draftSlugs.length).toBeGreaterThan(0);
    expect(publishedEntries.every((entry) => !entry.draft)).toBe(true);
    expect(publishedSlugs).not.toEqual(expect.arrayContaining(draftSlugs));

    for (const slug of draftSlugs) {
      await expect(getPublishedDiaryEntry(slug)).resolves.toBeNull();
    }
  });

  it("returns published entries newest first by explicit publishedAt date", async () => {
    const publishedEntries = await getPublishedDiaryEntries();
    const expectedOrder = [...publishedEntries]
      .sort((first, second) => {
        const dateComparison = second.publishedAt.localeCompare(
          first.publishedAt,
        );

        if (dateComparison !== 0) {
          return dateComparison;
        }

        return first.slug.localeCompare(second.slug);
      })
      .map((entry) => entry.slug);

    expect(publishedEntries.map((entry) => entry.slug)).toEqual(expectedOrder);
    expect(
      publishedEntries.every((entry) => entry.publishedAt && entry.editedAt),
    ).toBe(true);
  });
});
