import { getPublishedDiaryEntries } from "@/lib/diary/entries";
import { SEO } from "@/lib/content/seo";

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

export async function GET() {
  const entries = await getPublishedDiaryEntries();
  const lastEditedAt = entries
    .map((entry) => entry.editedAt)
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
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    `    <title>${escapeXml("Jeet Shah Diary")}</title>`,
    `    <link>${escapeXml(`${SEO.url}/diary`)}</link>`,
    `    <description>${escapeXml(
      "Writing by Jeet Shah on software engineering, systems, web interfaces, and research.",
    )}</description>`,
    lastEditedAt ?
      `    <lastBuildDate>${rfc822Date(lastEditedAt)}</lastBuildDate>`
    : "",
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
