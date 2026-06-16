import { describe, expect, it } from "vitest";

import { defineDiaryEntry } from "../metadata";

const validPublishedMetadata = {
  title: "A valid entry",
  description: "A short SEO-safe description.",
  publishedAt: "2026-06-13",
} as const;

function defineUnsafeDiaryEntry(input: Record<string, unknown>) {
  return defineDiaryEntry(input as never);
}

describe("defineDiaryEntry", () => {
  it("normalizes published entries", () => {
    const defaulted = defineDiaryEntry(validPublishedMetadata);
    const explicitlyUpdated = defineDiaryEntry({
      ...validPublishedMetadata,
      updatedAt: "2026-06-20",
      tags: ["nextjs", "systems"],
    });

    expect(defaulted).toEqual({
      ...validPublishedMetadata,
      updatedAt: validPublishedMetadata.publishedAt,
      tags: [],
      draft: false,
    });
    expect(explicitlyUpdated).toMatchObject({
      publishedAt: validPublishedMetadata.publishedAt,
      updatedAt: "2026-06-20",
      tags: ["nextjs", "systems"],
      draft: false,
    });
  });

  it("allows drafts to omit descriptions and dates", () => {
    expect(
      defineDiaryEntry({
        title: "Draft entry",
        draft: true,
      }),
    ).toEqual({
      title: "Draft entry",
      description: "",
      draft: true,
      publishedAt: undefined,
      updatedAt: undefined,
      tags: [],
    });
  });

  it("requires published entries to provide descriptions and dates", () => {
    expect(() =>
      defineUnsafeDiaryEntry({
        title: "Missing description",
        publishedAt: "2026-06-13",
      }),
    ).toThrow("description is required for published entries");

    expect(() =>
      defineUnsafeDiaryEntry({
        title: "Missing date",
        description: "A short SEO-safe description.",
      }),
    ).toThrow("publishedAt is required for published entries");
  });

  it("rejects invalid or regressive dates", () => {
    expect(() =>
      defineUnsafeDiaryEntry({
        ...validPublishedMetadata,
        publishedAt: "2026/06/13",
      }),
    ).toThrow("publishedAt must be a valid YYYY-MM-DD date");

    expect(() =>
      defineUnsafeDiaryEntry({
        ...validPublishedMetadata,
        updatedAt: "2026-13-01",
      }),
    ).toThrow("updatedAt must be a valid YYYY-MM-DD date");

    expect(() =>
      defineDiaryEntry({
        ...validPublishedMetadata,
        updatedAt: "2026-06-12",
      }),
    ).toThrow("updatedAt cannot be earlier than publishedAt");
  });
});
