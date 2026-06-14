import { describe, expect, it } from "vitest";

import { normalizeBlogPostMetadata } from "../schema";

const validPublishedFrontmatter = {
  title: "A valid post",
  description: "A short SEO-safe description.",
  publishedAt: "2026-06-13",
};

describe("normalizeBlogPostMetadata", () => {
  it("requires published posts to provide a publishedAt date", () => {
    expect(() =>
      normalizeBlogPostMetadata(
        {
          title: "Missing date",
          description: "A short SEO-safe description.",
        },
        "post.mdx",
      ),
    ).toThrow("publishedAt is required for published posts");
  });

  it("allows drafts to omit dates", () => {
    expect(
      normalizeBlogPostMetadata(
        {
          title: "Draft post",
          description: "Working notes.",
          draft: true,
        },
        "draft.mdx",
      ),
    ).toEqual({
      title: "Draft post",
      description: "Working notes.",
      draft: true,
      publishedAt: undefined,
      editedAt: undefined,
      tags: [],
    });
  });

  it("defaults editedAt to publishedAt and tags to an empty array", () => {
    expect(
      normalizeBlogPostMetadata(validPublishedFrontmatter, "post.mdx"),
    ).toEqual({
      ...validPublishedFrontmatter,
      editedAt: "2026-06-13",
      tags: [],
      draft: false,
    });
  });

  it("accepts explicit editedAt dates", () => {
    expect(
      normalizeBlogPostMetadata(
        {
          ...validPublishedFrontmatter,
          editedAt: "2026-06-20",
          tags: ["nextjs", "systems"],
        },
        "post.mdx",
      ),
    ).toMatchObject({
      publishedAt: "2026-06-13",
      editedAt: "2026-06-20",
      tags: ["nextjs", "systems"],
    });
  });

  it("rejects invalid dates", () => {
    expect(() =>
      normalizeBlogPostMetadata(
        {
          ...validPublishedFrontmatter,
          publishedAt: "2026-02-30",
        },
        "post.mdx",
      ),
    ).toThrow("publishedAt must be a valid YYYY-MM-DD date");

    expect(() =>
      normalizeBlogPostMetadata(
        {
          ...validPublishedFrontmatter,
          editedAt: "2026-13-01",
        },
        "post.mdx",
      ),
    ).toThrow("editedAt must be a valid YYYY-MM-DD date");
  });

  it("rejects editedAt dates earlier than publishedAt", () => {
    expect(() =>
      normalizeBlogPostMetadata(
        {
          ...validPublishedFrontmatter,
          editedAt: "2026-06-12",
        },
        "post.mdx",
      ),
    ).toThrow("editedAt cannot be earlier than publishedAt");
  });

  it("rejects duplicate tags case-insensitively", () => {
    expect(() =>
      normalizeBlogPostMetadata(
        {
          ...validPublishedFrontmatter,
          tags: ["NextJS", "nextjs"],
        },
        "post.mdx",
      ),
    ).toThrow("tags must be unique");
  });
});
