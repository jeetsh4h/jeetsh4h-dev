import fs from "node:fs/promises";
import path from "node:path";
import type { MetadataRoute } from "next";
import { getPublishedDiaryEntries } from "@/lib/diary/entries";
import { SEO } from "@/lib/content/seo";
import {
  dateStringToUtcDate,
  type PublishedDiaryEntrySummary,
} from "@/lib/diary/metadata";

type SitemapEntry = Pick<PublishedDiaryEntrySummary, "slug" | "updatedAt">;

async function getCvLastModified() {
  const stats = await fs.stat(path.join(process.cwd(), "public", "cv.pdf"));

  return stats.mtime;
}

export function buildSitemapEntries({
  diaryEntries,
  cvLastModified,
}: {
  diaryEntries: readonly SitemapEntry[];
  cvLastModified: Date;
}): MetadataRoute.Sitemap {
  const latestDiaryUpdate =
    diaryEntries
      .map((entry) => entry.updatedAt)
      .sort()
      .at(-1) ?? SEO.updatedAt;

  return [
    {
      url: SEO.url,
      lastModified: dateStringToUtcDate(SEO.updatedAt),
    },
    {
      url: `${SEO.url}/pdf`,
      lastModified: cvLastModified,
    },
    {
      url: `${SEO.url}/cv.pdf`,
      lastModified: cvLastModified,
    },
    {
      url: `${SEO.url}/diary`,
      lastModified: dateStringToUtcDate(latestDiaryUpdate),
    },
    ...diaryEntries.map((entry) => ({
      url: `${SEO.url}/diary/${entry.slug}`,
      lastModified: dateStringToUtcDate(entry.updatedAt),
    })),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [diaryEntries, cvLastModified] = await Promise.all([
    getPublishedDiaryEntries(),
    getCvLastModified(),
  ]);

  return buildSitemapEntries({
    diaryEntries,
    cvLastModified,
  });
}
