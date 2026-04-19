import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://jeetsh4h.dev",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
