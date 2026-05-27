import type { ProjectItem } from "./types";

export const PROJECTS: ProjectItem[] = [
  {
    title: "Nanoloy Internal Platform",
    description:
      "Internal dashboard and data platform for battery manufacturing research workflows.",
    status: "private",
    stack: ["Next.js", "FastAPI", "Supabase/Postgres", "Python"],
    highlights: [
      "Led frontend development.",
      "Co-designed data models for experimental manufacturing data.",
      "Improved query latency by 67%.",
    ],
    confidentialityNote: "Public details limited by client confidentiality.",
  },
  {
    title: "Movynn",
    description:
      "React Native/Convex fitness platform for turf booking and member-facing workflows.",
    status: "pre-beta",
    stack: ["React Native", "Expo", "Convex"],
    highlights: [
      "Own auth/session flows and turf-booking workflows.",
      "Co-own app architecture and release readiness.",
      "Closed beta timeline controlled by Elevate Fitness.",
    ],
    link: "https://www.instagram.com/movynn_in/",
    linkText: "Instagram",
  },
  {
    title: "Jyeshthanubandh",
    description:
      "Safety app deployed with Pimpri-Chinchwad Police for senior-citizen support workflows.",
    status: "public",
    link: "https://play.google.com/store/apps/details?id=com.Jyeshthanubandh.pcmc_app",
    linkText: "Play Store",
  },
  {
    title: "Paudha Yodha",
    description:
      "Plant disease detection app using fine-tuned ResNet-50; Bit N Build finalist.",
    status: "public",
    link: "https://github.com/jeetsh4h/paudhayodha",
    linkText: "GitHub",
  },
  {
    title: "Precipitation Nowcasting",
    description:
      "Prior research codebase and experiments around high-resolution rainfall prediction.",
    status: "research",
    link: "https://github.com/jeetsh4h/DISS384",
    linkText: "GitHub",
  },
];
