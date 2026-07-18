import { describe, expect, it } from "vitest";

import {
  getAllDiaryEntries,
  getPublishedDiaryEntries,
} from "@/lib/diary/entries";
import { SEO } from "@/lib/content/seo";
import { dateStringToUtcDate } from "@/lib/diary/metadata";

import sitemap, { buildSitemapEntries } from "../sitemap";

describe("sitemap", () => {
  it("includes published diary entries and excludes drafts", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);
    const allEntries = await getAllDiaryEntries();
    const publishedEntries = await getPublishedDiaryEntries();

    for (const entry of publishedEntries) {
      expect(urls).toContain(`${SEO.url}/diary/${entry.slug}`);
    }

    for (const entry of allEntries.filter((entry) => entry.draft)) {
      expect(urls).not.toContain(`${SEO.url}/diary/${entry.slug}`);
    }
  });

  it("uses content update dates for generated sitemap entries", () => {
    const cvLastModified = new Date("2026-06-14T12:34:56.000Z");
    const entries = buildSitemapEntries({
      cvLastModified,
      diaryEntries: [
        {
          slug: "published-entry",
          updatedAt: "2026-06-08",
        },
        {
          slug: "older-entry",
          updatedAt: "2026-06-02",
        },
      ],
    });
    const urls = entries.map((entry) => entry.url);
    const diaryIndex = entries.find(
      (entry) => entry.url === `${SEO.url}/diary`,
    );
    const publishedEntry = entries.find(
      (entry) => entry.url === `${SEO.url}/diary/published-entry`,
    );
    const cvPdf = entries.find((entry) => entry.url === `${SEO.url}/cv.pdf`);

    expect(urls).toEqual(
      expect.arrayContaining([
        SEO.url,
        `${SEO.url}/cv.pdf`,
        `${SEO.url}/diary`,
        `${SEO.url}/diary/published-entry`,
        `${SEO.url}/diary/older-entry`,
      ]),
    );
    expect(urls).not.toContain(`${SEO.url}/pdf`);
    expect(urls).not.toContain(`${SEO.url}/terminal`);
    expect(diaryIndex?.lastModified).toEqual(dateStringToUtcDate("2026-06-08"));
    expect(publishedEntry?.lastModified).toEqual(
      dateStringToUtcDate("2026-06-08"),
    );
    expect(cvPdf?.lastModified).toEqual(cvLastModified);
  });
});
