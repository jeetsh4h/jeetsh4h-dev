import { describe, expect, it } from "vitest";

import {
  getAllDiaryEntries,
  getPublishedDiaryEntries,
} from "@/lib/diary/entries";

import { escapeXml, GET } from "../route";

describe("rss.xml route", () => {
  it("escapes XML-sensitive characters", () => {
    expect(escapeXml(`A & <B> "C" 'D'`)).toBe(
      "A &amp; &lt;B&gt; &quot;C&quot; &apos;D&apos;",
    );
  });

  it("includes published entries and excludes drafts", async () => {
    const response = await GET();
    const xml = await response.text();
    const allEntries = await getAllDiaryEntries();
    const publishedEntries = await getPublishedDiaryEntries();

    expect(response.headers.get("Content-Type")).toBe(
      "application/rss+xml; charset=utf-8",
    );
    expect(xml).toContain('<rss version="2.0">');

    for (const entry of publishedEntries) {
      expect(xml).toContain(escapeXml(entry.title));
      expect(xml).toContain(escapeXml(`/diary/${entry.slug}`));
    }

    for (const entry of allEntries.filter((entry) => entry.draft)) {
      expect(xml).not.toContain(escapeXml(entry.title));
      expect(xml).not.toContain(escapeXml(`/diary/${entry.slug}`));
    }
  });
});
