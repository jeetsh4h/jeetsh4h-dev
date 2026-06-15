import type { MetadataRoute } from "next";
import { getPublishedDiaryEntries } from "@/lib/diary/entries";
import { SEO } from "@/lib/content/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const diaryEntries = await getPublishedDiaryEntries();
  const latestDiaryEdit = diaryEntries
    .map((entry) => entry.editedAt)
    .sort()
    .at(-1);

  return [
    {
      url: SEO.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SEO.url}/cv.pdf`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SEO.url}/diary`,
      lastModified:
        latestDiaryEdit ?
          new Date(`${latestDiaryEdit}T00:00:00.000Z`)
        : lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...diaryEntries.map((entry) => ({
      url: `${SEO.url}/diary/${entry.slug}`,
      lastModified: new Date(`${entry.editedAt}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
