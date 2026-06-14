import { describe, expect, it } from "vitest";

import { defineBlogPost } from "../metadata";

const validPublishedMetadata = {
  title: "A valid post",
  description: "A short SEO-safe description.",
  publishedAt: "2026-06-13",
} as const;

function defineUnsafeBlogPost(input: Record<string, unknown>) {
  return defineBlogPost(input as never);
}

describe("defineBlogPost", () => {
  it("defaults published posts", () => {
    expect(defineBlogPost(validPublishedMetadata)).toEqual({
      ...validPublishedMetadata,
      editedAt: "2026-06-13",
      tags: [],
      draft: false,
    });
  });

  it("allows drafts to omit descriptions and dates", () => {
    expect(
      defineBlogPost({
        title: "Draft post",
        draft: true,
      }),
    ).toEqual({
      title: "Draft post",
      description: "",
      draft: true,
      publishedAt: undefined,
      editedAt: undefined,
      tags: [],
    });
  });

  it("accepts explicit editedAt dates and tags", () => {
    expect(
      defineBlogPost({
        ...validPublishedMetadata,
        editedAt: "2026-06-20",
        tags: ["nextjs", "systems"],
      }),
    ).toMatchObject({
      publishedAt: "2026-06-13",
      editedAt: "2026-06-20",
      tags: ["nextjs", "systems"],
    });
  });

  it("requires published posts to provide descriptions and dates", () => {
    expect(() =>
      defineUnsafeBlogPost({
        title: "Missing description",
        publishedAt: "2026-06-13",
      }),
    ).toThrow("description is required for published posts");

    expect(() =>
      defineUnsafeBlogPost({
        title: "Missing date",
        description: "A short SEO-safe description.",
      }),
    ).toThrow("publishedAt is required for published posts");
  });

  it("rejects invalid date shapes", () => {
    expect(() =>
      defineUnsafeBlogPost({
        ...validPublishedMetadata,
        publishedAt: "2026/06/13",
      }),
    ).toThrow("publishedAt must be a valid YYYY-MM-DD date");

    expect(() =>
      defineUnsafeBlogPost({
        ...validPublishedMetadata,
        publishedAt: "06-13-2026",
      }),
    ).toThrow("publishedAt must be a valid YYYY-MM-DD date");
  });

  it("rejects impossible calendar dates", () => {
    expect(() =>
      defineUnsafeBlogPost({
        ...validPublishedMetadata,
        publishedAt: "2026-02-30",
      }),
    ).toThrow("publishedAt must be a valid YYYY-MM-DD date");

    expect(() =>
      defineUnsafeBlogPost({
        ...validPublishedMetadata,
        editedAt: "2026-13-01",
      }),
    ).toThrow("editedAt must be a valid YYYY-MM-DD date");
  });

  it("rejects Date object inputs", () => {
    expect(() =>
      defineUnsafeBlogPost({
        ...validPublishedMetadata,
        publishedAt: new Date("2026-06-13"),
      }),
    ).toThrow("publishedAt must be a YYYY-MM-DD string");
  });

  it("rejects editedAt dates earlier than publishedAt", () => {
    expect(() =>
      defineBlogPost({
        ...validPublishedMetadata,
        editedAt: "2026-06-12",
      }),
    ).toThrow("editedAt cannot be earlier than publishedAt");
  });
});
