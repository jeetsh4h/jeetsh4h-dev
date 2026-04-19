import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://jeetsh4h.dev/sitemap.xml",
    host: "https://jeetsh4h.dev",
  };
}
