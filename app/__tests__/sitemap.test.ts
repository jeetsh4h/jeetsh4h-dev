import { describe, expect, it } from "vitest";

import {
  getAllDiaryEntries,
  getPublishedDiaryEntries,
} from "@/lib/diary/entries";
import { SEO } from "@/lib/content/seo";

import sitemap from "../sitemap";

describe("sitemap", () => {
  it("includes the diary index and published entries while excluding drafts", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);
    const allEntries = await getAllDiaryEntries();
    const publishedEntries = await getPublishedDiaryEntries();

    expect(urls).toContain(`${SEO.url}/diary`);

    for (const entry of publishedEntries) {
      expect(urls).toContain(`${SEO.url}/diary/${entry.slug}`);
    }

    for (const entry of allEntries.filter((entry) => entry.draft)) {
      expect(urls).not.toContain(`${SEO.url}/diary/${entry.slug}`);
    }
  });
});
