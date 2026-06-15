import { describe, expect, it } from "vitest";

import { getAllBlogPosts, getPublishedBlogPosts } from "@/lib/blog/posts";

import { generateStaticParams } from "../page";

describe("blog post page", () => {
  it("generates static params for published posts only", async () => {
    const params = await generateStaticParams();
    const allPosts = await getAllBlogPosts();
    const publishedPosts = await getPublishedBlogPosts();
    const draftSlugs = allPosts
      .filter((post) => post.draft)
      .map((post) => ({ slug: post.slug }));

    expect(params).toEqual(publishedPosts.map((post) => ({ slug: post.slug })));
    expect(params).not.toEqual(expect.arrayContaining(draftSlugs));
  });
});
