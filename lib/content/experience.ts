import type { ExperienceItem } from "./types";

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Elevate Fitness",
    role: "Software Engineer",
    period: "Dec 2025 - Present",
    type: "contract",
    description: [
      "Build Movynn, a React Native and Convex fitness application.",
      "Own authentication, session, and turf-booking workflows across a two-person engineering team.",
      "Co-own application architecture, code quality, and release readiness.",
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
    role: "Software Engineer",
    period: "Oct 2024 - Present",
    type: "contract",
    description: [
      "Led frontend development for an internal dashboard supporting battery manufacturing research workflows.",
      "Co-designed Supabase/Postgres data models and FastAPI services for experimental data ingestion and retrieval.",
      "Reduced query latency through database indexing and API-layer optimization.",
      "Co-maintain NDAX and Neware ingestion handlers, file reconciliation, and edge-case parsing for unreliable client environments.",
    ],
    textLinks: [
      {
        label: "Nanoloy",
        href: "https://www.nanoloy.com/",
      },
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
  {
    company: "ISRO, Space Applications Centre",
    role: "Research Intern (SRTD)",
    period: "May 2023 - Aug 2023",
    type: "research",
    description: [
      "Developed ConvLSTM models for precipitation nowcasting using INSAT-3D satellite data.",
      "Worked in an air-gapped HPC environment with large spatiotemporal satellite datasets.",
    ],
  },
  {
    company: "Sportskeeda",
    role: "Golf Content Writer",
    period: "Aug 2023 - Oct 2023",
    type: "work",
    compact: true,
    description: [
      "Reported and wrote published golf news articles and listicles.",
    ],
  },
  {
    company: "FLAME Q Centre",
    role: "Peer Tutor",
    period: "Sep 2022 - Apr 2025",
    type: "work",
    compact: true,
    description: [
      "Tutored students in programming, mathematics, economics, and other quantitative coursework.",
    ],
  },
  {
    company: "FLAME Mathematical Modelling Centre",
    role: "Student Researcher",
    period: "Oct 2022 - Apr 2023",
    type: "research",
    compact: true,
    description: [
      "Explored genetic algorithms and variational autoencoders for synthetic examples of imbalanced and protein datasets.",
    ],
  },
  {
    company: "Analyse India",
    role: "Technical Intern",
    period: "May 2022 - Aug 2022",
    type: "internship",
    compact: true,
    description: [
      "Automated market-data collection and technical-analysis alerts using Google Finance and Yahoo Finance data.",
    ],
  },
  {
    company: "SNEHA",
    role: "IT/IM Intern",
    period: "May 2022 - Aug 2022",
    type: "internship",
    compact: true,
    description: [
      "Audited office network infrastructure across Mumbai and supported field survey software and devices.",
    ],
  },
];
