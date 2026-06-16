import type { SeoContent } from "./types";

export const SITE_TITLE_TEMPLATE = "%s | Jeet Shah";

export function applySiteTitleTemplate(title: string) {
  return SITE_TITLE_TEMPLATE.replace("%s", title);
}

export const SEO: SeoContent = {
  title: "Jeet Shah | Software Engineer, Columbia MSCS",
  description:
    "Jeet Shah is a New York City software developer and Columbia MSCS student building startup software across mobile apps, data platforms, systems, and research.",
  url: "https://jeetsh4h.dev",
  updatedAt: "2026-06-17",
  areas: [
    "Software engineering",
    "Columbia University",
    "FLAME University",
    "Computer science",
    "Network systems",
    "Programming languages",
    "AI-assisted software engineering",
    "React Native",
    "Convex",
    "FastAPI",
    "Supabase",
    "Weather4Cast",
    "NeurIPS",
    "Precipitation nowcasting",
  ],
};
