import type { SeoContent } from "./types";

export const SITE_TITLE_TEMPLATE = "%s | Jeet Shah";

export function applySiteTitleTemplate(title: string) {
  return SITE_TITLE_TEMPLATE.replace("%s", title);
}

export const SEO: SeoContent = {
  title: "Jeet Shah | Software Engineer, Columbia MSCS",
  description:
    "Jeet Shah is a software engineer and Columbia MSCS student building mobile products, data platforms, developer tools, and precipitation-nowcasting research.",
  url: "https://jeetsh4h.dev",
  updatedAt: "2026-08-25",
  areas: [
    "Software engineering",
    "Columbia University",
    "FLAME University",
    "Computer science",
    "Programming languages",
    "Developer tools",
    "React Native",
    "Convex",
    "FastAPI",
    "Supabase",
    "Weather4Cast",
    "NeurIPS",
    "Precipitation nowcasting",
    "Distributed systems",
    "Database systems",
  ],
};
