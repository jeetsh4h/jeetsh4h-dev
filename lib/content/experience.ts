import type { ExperienceItem } from "./types";

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Elevate Fitness",
    role: "Software Developer (Contract)",
    period: "Dec 2025 - Present",
    type: "contract",
    description: [
      "Building Movynn, a React Native/Convex fitness platform entering closed beta.",
      "Own auth/session flows and turf-booking workflows across a two-person engineering team.",
      "Co-own app architecture, code quality, and release readiness for the pre-beta mobile app.",
    ],
    textLinks: [
      {
        label: "Movynn",
        href: "https://www.instagram.com/movynn_in/",
      },
    ],
  },
  {
    company: "Voltek AI / Nanoloy",
    role: "Software Developer (Contract)",
    period: "Oct 2024 - Present",
    type: "contract",
    description: [
      "Led frontend development for an internal dashboard supporting battery manufacturing research workflows.",
      "Co-designed Supabase/Postgres data models and FastAPI services for experimental data ingestion and retrieval.",
      "Improved query latency by 67% through database indexing and API-layer optimization.",
      "Co-maintain NDAX/Neware ingestion handlers for unreliable client environments, file reconciliation, and edge-case parsing.",
    ],
    textLinks: [
      {
        label: "Nanoloy",
        href: "https://www.nanoloy.com/",
      },
    ],
  },
  {
    company: "ISRO, Space Applications Centre",
    role: "Research Intern (SRTD)",
    period: "May 2023 - Aug 2023",
    type: "research",
    description: [
      "Developed ConvLSTM models for precipitation nowcasting using INSAT-3D satellite data.",
      "Outperformed optical-flow baselines by 30.7%.",
      "Worked in an air-gapped Linux/HPC environment with large spatiotemporal satellite datasets.",
    ],
  },
  {
    company: "National Federation of the Blind Maharashtra",
    role: "Project Solutions Intern",
    period: "May 2024 - Sep 2024",
    type: "internship",
    description: [
      "Built Raspberry Pi/OpenCV assistive-navigation prototypes and conducted user-facing technical support sessions.",
    ],
  },
];
