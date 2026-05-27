import type { MetadataRoute } from "next";
import { SEO } from "@/lib/content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SEO.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SEO.url}/cv.pdf`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
