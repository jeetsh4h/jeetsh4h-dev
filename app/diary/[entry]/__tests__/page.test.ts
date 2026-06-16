import { describe, expect, it } from "vitest";

import {
  getAllDiaryEntries,
  getPublishedDiaryEntries,
} from "@/lib/diary/entries";

import { generateStaticParams } from "../page";

describe("diary entry page", () => {
  it("generates static params for published entries only", async () => {
    const params = await generateStaticParams();
    const allEntries = await getAllDiaryEntries();
    const publishedEntries = await getPublishedDiaryEntries();
    const draftParams = allEntries
      .filter((entry) => entry.draft)
      .map((entry) => ({ entry: entry.slug }));

    expect(params).toEqual(
      publishedEntries.map((entry) => ({ entry: entry.slug })),
    );
    for (const draftParam of draftParams) {
      expect(params).not.toContainEqual(draftParam);
    }
  });
});
