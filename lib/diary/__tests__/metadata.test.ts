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
  it("defaults published entries", () => {
    expect(defineDiaryEntry(validPublishedMetadata)).toEqual({
      ...validPublishedMetadata,
      editedAt: "2026-06-13",
      tags: [],
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
      editedAt: undefined,
      tags: [],
    });
  });

  it("accepts explicit editedAt dates and tags", () => {
    expect(
      defineDiaryEntry({
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

  it("rejects invalid date shapes", () => {
    expect(() =>
      defineUnsafeDiaryEntry({
        ...validPublishedMetadata,
        publishedAt: "2026/06/13",
      }),
    ).toThrow("publishedAt must be a valid YYYY-MM-DD date");

    expect(() =>
      defineUnsafeDiaryEntry({
        ...validPublishedMetadata,
        publishedAt: "06-13-2026",
      }),
    ).toThrow("publishedAt must be a valid YYYY-MM-DD date");
  });

  it("rejects impossible calendar dates", () => {
    expect(() =>
      defineUnsafeDiaryEntry({
        ...validPublishedMetadata,
        publishedAt: "2026-02-30",
      }),
    ).toThrow("publishedAt must be a valid YYYY-MM-DD date");

    expect(() =>
      defineUnsafeDiaryEntry({
        ...validPublishedMetadata,
        editedAt: "2026-13-01",
      }),
    ).toThrow("editedAt must be a valid YYYY-MM-DD date");
  });

  it("rejects Date object inputs", () => {
    expect(() =>
      defineUnsafeDiaryEntry({
        ...validPublishedMetadata,
        publishedAt: new Date("2026-06-13"),
      }),
    ).toThrow("publishedAt must be a YYYY-MM-DD string");
  });

  it("rejects editedAt dates earlier than publishedAt", () => {
    expect(() =>
      defineDiaryEntry({
        ...validPublishedMetadata,
        editedAt: "2026-06-12",
      }),
    ).toThrow("editedAt cannot be earlier than publishedAt");
  });
});
