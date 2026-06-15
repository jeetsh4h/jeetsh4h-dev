import { describe, expect, it } from "vitest";

import { getAllBlogPosts, getPublishedBlogPosts } from "@/lib/blog/posts";

import { escapeXml, GET } from "../route";

describe("rss.xml route", () => {
  it("escapes XML-sensitive characters", () => {
    expect(escapeXml(`A & <B> "C" 'D'`)).toBe(
      "A &amp; &lt;B&gt; &quot;C&quot; &apos;D&apos;",
    );
  });

  it("includes published posts and excludes drafts", async () => {
    const response = await GET();
    const xml = await response.text();
    const allPosts = await getAllBlogPosts();
    const publishedPosts = await getPublishedBlogPosts();

    expect(response.headers.get("Content-Type")).toBe(
      "application/rss+xml; charset=utf-8",
    );
    expect(xml).toContain('<rss version="2.0">');

    for (const post of publishedPosts) {
      expect(xml).toContain(escapeXml(post.title));
      expect(xml).toContain(escapeXml(`/blog/${post.slug}`));
    }

    for (const post of allPosts.filter((entry) => entry.draft)) {
      expect(xml).not.toContain(escapeXml(post.title));
      expect(xml).not.toContain(escapeXml(`/blog/${post.slug}`));
    }
  });
});
