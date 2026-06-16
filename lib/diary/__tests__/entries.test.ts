import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  getAllDiaryEntries,
  getPublishedDiaryEntries,
  getPublishedDiaryEntry,
  getSlugFromFilename,
  type DiaryEntrySourceOptions,
} from "../entries";
import { defineDiaryEntry, type DiaryEntryMetadata } from "../metadata";

const fixtureDirs: string[] = [];

async function createDiaryFixture(
  entriesBySlug: Record<string, DiaryEntryMetadata>,
): Promise<DiaryEntrySourceOptions> {
  const contentDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "diary-entry-fixtures-"),
  );
  fixtureDirs.push(contentDir);

  await Promise.all(
    Object.keys(entriesBySlug).map((slug) =>
      fs.writeFile(path.join(contentDir, `${slug}.mdx`), "# Fixture\n", "utf8"),
    ),
  );

  return {
    contentDir,
    importEntryModule: async (slug) => {
      const metadata = entriesBySlug[slug];

      if (!metadata) {
        throw new Error(`Missing fixture metadata for ${slug}.`);
      }

      return {
        default: function FixtureEntry() {
          return null;
        },
        metadata,
      };
    },
  };
}

afterEach(async () => {
  await Promise.all(
    fixtureDirs.splice(0).map((fixtureDir) =>
      fs.rm(fixtureDir, {
        recursive: true,
        force: true,
      }),
    ),
  );
});

describe("diary entry helpers", () => {
  it("derives unique slugs from MDX filenames", async () => {
    const source = await createDiaryFixture({
      "alpha-entry": defineDiaryEntry({
        title: "Alpha entry",
        description: "A published fixture entry.",
        publishedAt: "2026-06-01",
      }),
      "draft-entry": defineDiaryEntry({
        title: "Draft entry",
        draft: true,
      }),
      "zulu-entry": defineDiaryEntry({
        title: "Zulu entry",
        description: "Another published fixture entry.",
        publishedAt: "2026-06-02",
      }),
    });
    const expectedSlugs = ["alpha-entry", "draft-entry", "zulu-entry"];
    const entries = await getAllDiaryEntries(source);
    const actualSlugs = entries.map((entry) => entry.slug).sort();

    expect(actualSlugs).toEqual(expectedSlugs);
    expect(new Set(actualSlugs).size).toBe(actualSlugs.length);
    expect(getSlugFromFilename("alpha-entry.mdx")).toBe("alpha-entry");
  });

  it("excludes drafts from published helpers", async () => {
    const source = await createDiaryFixture({
      "draft-entry": defineDiaryEntry({
        title: "Draft entry",
        draft: true,
      }),
      "published-entry": defineDiaryEntry({
        title: "Published entry",
        description: "A published fixture entry.",
        publishedAt: "2026-06-01",
      }),
    });
    const allEntries = await getAllDiaryEntries(source);
    const draftSlugs = allEntries
      .filter((entry) => entry.draft)
      .map((entry) => entry.slug);
    const publishedEntries = await getPublishedDiaryEntries(source);
    const publishedSlugs = publishedEntries.map((entry) => entry.slug);

    expect(draftSlugs).toEqual(["draft-entry"]);
    expect(publishedEntries.every((entry) => !entry.draft)).toBe(true);
    expect(publishedSlugs).not.toEqual(expect.arrayContaining(draftSlugs));

    for (const slug of draftSlugs) {
      await expect(getPublishedDiaryEntry(slug, source)).resolves.toBeNull();
    }
  });

  it("returns published entries newest first by explicit publishedAt date", async () => {
    const source = await createDiaryFixture({
      "older-entry": defineDiaryEntry({
        title: "Older entry",
        description: "An older fixture entry.",
        publishedAt: "2026-06-01",
      }),
      "same-day-a": defineDiaryEntry({
        title: "Same day A",
        description: "A same-day fixture entry.",
        publishedAt: "2026-06-03",
      }),
      "same-day-b": defineDiaryEntry({
        title: "Same day B",
        description: "Another same-day fixture entry.",
        publishedAt: "2026-06-03",
      }),
      "newest-entry": defineDiaryEntry({
        title: "Newest entry",
        description: "The newest fixture entry.",
        publishedAt: "2026-06-05",
        updatedAt: "2026-06-08",
      }),
    });
    const publishedEntries = await getPublishedDiaryEntries(source);

    expect(publishedEntries.map((entry) => entry.slug)).toEqual([
      "newest-entry",
      "same-day-a",
      "same-day-b",
      "older-entry",
    ]);
    expect(
      publishedEntries.every((entry) => entry.publishedAt && entry.updatedAt),
    ).toBe(true);
  });
});
