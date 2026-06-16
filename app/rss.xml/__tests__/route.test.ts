import { describe, expect, it } from "vitest";

import {
  getAllDiaryEntries,
  getPublishedDiaryEntries,
} from "@/lib/diary/entries";

import { buildRssXml, escapeXml, GET } from "../route";

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

    for (const entry of publishedEntries) {
      expect(xml).toContain(escapeXml(entry.title));
      expect(xml).toContain(escapeXml(`/diary/${entry.slug}`));
    }

    for (const entry of allEntries.filter((entry) => entry.draft)) {
      expect(xml).not.toContain(escapeXml(entry.title));
      expect(xml).not.toContain(escapeXml(`/diary/${entry.slug}`));
    }
  });

  it("uses updatedAt for RSS update fields", () => {
    const xml = buildRssXml([
      {
        title: "Updated entry",
        description: "An entry with an explicit update date.",
        slug: "updated-entry",
        publishedAt: "2026-06-01",
        updatedAt: "2026-06-08",
      },
    ]);

    expect(xml).toContain(
      "<lastBuildDate>Mon, 08 Jun 2026 00:00:00 GMT</lastBuildDate>",
    );
    expect(xml).toContain(
      "<atom:updated>2026-06-08T00:00:00.000Z</atom:updated>",
    );
    expect(xml).toContain("<pubDate>Mon, 01 Jun 2026 00:00:00 GMT</pubDate>");
  });
});
