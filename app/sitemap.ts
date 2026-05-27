import type { MetadataRoute } from "next";
import { SEO } from "@/lib/content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SEO.url,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
