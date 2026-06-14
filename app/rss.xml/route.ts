import { getPublishedBlogPosts } from "@/lib/blog/posts";
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
  const posts = await getPublishedBlogPosts();
  const lastEditedAt = posts
    .map((post) => post.editedAt)
    .sort()
    .at(-1);
  const items = posts
    .map((post) => {
      const url = `${SEO.url}/blog/${post.slug}`;

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid>${escapeXml(url)}</guid>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <pubDate>${rfc822Date(post.publishedAt)}</pubDate>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    `    <title>${escapeXml("Jeet Shah Blog")}</title>`,
    `    <link>${escapeXml(`${SEO.url}/blog`)}</link>`,
    `    <description>${escapeXml(
      "Writing by Jeet Shah on software engineering, systems, web interfaces, and research.",
    )}</description>`,
    lastEditedAt ? `    <lastBuildDate>${rfc822Date(lastEditedAt)}</lastBuildDate>` : "",
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
