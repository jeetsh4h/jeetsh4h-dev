import fs from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  getAllBlogPosts,
  getPublishedBlogPosts,
  getPublishedBlogPost,
  getSlugFromFilename,
} from "../posts";

async function getExpectedSlugs() {
  const filenames = await fs.readdir(
    path.join(process.cwd(), "content", "blog"),
  );

  return filenames
    .filter((filename) => filename.endsWith(".mdx"))
    .map(getSlugFromFilename)
    .sort();
}

describe("blog post helpers", () => {
  it("derives unique slugs from MDX filenames", async () => {
    const expectedSlugs = await getExpectedSlugs();
    const posts = await getAllBlogPosts();
    const actualSlugs = posts.map((post) => post.slug).sort();

    expect(actualSlugs).toEqual(expectedSlugs);
    expect(new Set(actualSlugs).size).toBe(actualSlugs.length);
  });

  it("excludes drafts from published helpers", async () => {
    const allPosts = await getAllBlogPosts();
    const draftSlugs = allPosts
      .filter((post) => post.draft)
      .map((post) => post.slug);
    const publishedPosts = await getPublishedBlogPosts();
    const publishedSlugs = publishedPosts.map((post) => post.slug);

    expect(draftSlugs.length).toBeGreaterThan(0);
    expect(publishedPosts.every((post) => !post.draft)).toBe(true);
    expect(publishedSlugs).not.toEqual(expect.arrayContaining(draftSlugs));

    for (const slug of draftSlugs) {
      await expect(getPublishedBlogPost(slug)).resolves.toBeNull();
    }
  });

  it("returns published posts newest first by explicit publishedAt date", async () => {
    const publishedPosts = await getPublishedBlogPosts();
    const expectedOrder = [...publishedPosts]
      .sort((first, second) => {
        const dateComparison = second.publishedAt.localeCompare(
          first.publishedAt,
        );

        if (dateComparison !== 0) {
          return dateComparison;
        }

        return first.slug.localeCompare(second.slug);
      })
      .map((post) => post.slug);

    expect(publishedPosts.map((post) => post.slug)).toEqual(expectedOrder);
    expect(
      publishedPosts.every((post) => post.publishedAt && post.editedAt),
    ).toBe(true);
  });
});
