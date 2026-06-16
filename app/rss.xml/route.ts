import { getPublishedDiaryEntries } from "@/lib/diary/entries";
import { SEO } from "@/lib/content/seo";
import {
  dateStringToIsoDateTime,
  type PublishedDiaryEntrySummary,
} from "@/lib/diary/metadata";

export const dynamic = "force-static";

export function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822Date(date: string) {
  return new Date(`${date}T00:00:00.000Z`).toUTCString();
}

type RssEntry = Pick<
  PublishedDiaryEntrySummary,
  "title" | "description" | "slug" | "publishedAt" | "updatedAt"
>;

export function buildRssXml(entries: readonly RssEntry[]) {
  const lastUpdatedAt = entries
    .map((entry) => entry.updatedAt)
    .sort()
    .at(-1);
  const items = entries
    .map((entry) => {
      const url = `${SEO.url}/diary/${entry.slug}`;

      return [
        "    <item>",
        `      <title>${escapeXml(entry.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid>${escapeXml(url)}</guid>`,
        `      <description>${escapeXml(entry.description)}</description>`,
        `      <pubDate>${rfc822Date(entry.publishedAt)}</pubDate>`,
        `      <atom:updated>${escapeXml(
          dateStringToIsoDateTime(entry.updatedAt),
        )}</atom:updated>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml("Jeet Shah Diary")}</title>`,
    `    <link>${escapeXml(`${SEO.url}/diary`)}</link>`,
    `    <atom:link href="${escapeXml(
      `${SEO.url}/rss.xml`,
    )}" rel="self" type="application/rss+xml" />`,
    `    <description>${escapeXml(
      "Writing by Jeet Shah on software engineering, systems, web interfaces, and research.",
    )}</description>`,
    lastUpdatedAt ?
      `    <lastBuildDate>${rfc822Date(lastUpdatedAt)}</lastBuildDate>`
    : "",
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return rss;
}

export async function GET() {
  const entries = await getPublishedDiaryEntries();

  return new Response(buildRssXml(entries), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
