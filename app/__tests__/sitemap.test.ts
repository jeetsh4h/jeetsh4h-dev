import { describe, expect, it } from "vitest";

import { getAllBlogPosts, getPublishedBlogPosts } from "@/lib/blog/posts";
import { SEO } from "@/lib/content/seo";

import sitemap from "../sitemap";

describe("sitemap", () => {
  it("includes the blog index and published posts while excluding drafts", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);
    const allPosts = await getAllBlogPosts();
    const publishedPosts = await getPublishedBlogPosts();

    expect(urls).toContain(`${SEO.url}/blog`);

    for (const post of publishedPosts) {
      expect(urls).toContain(`${SEO.url}/blog/${post.slug}`);
    }

    for (const post of allPosts.filter((entry) => entry.draft)) {
      expect(urls).not.toContain(`${SEO.url}/blog/${post.slug}`);
    }
  });
});
