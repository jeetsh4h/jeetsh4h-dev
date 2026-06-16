import type { MetadataRoute } from "next";
import { SEO } from "@/lib/content/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SEO.url}/sitemap.xml`,
  };
}
