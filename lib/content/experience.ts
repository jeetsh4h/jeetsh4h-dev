import type { ExperienceItem } from "./types";

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Elevate Fitness",
    role: "Software Engineer",
    period: "Dec 2025 - Present",
    type: "contract",
    description: [
      "Develop and maintain Movynn, a React Native and Expo fitness application backed by Convex and published on the Apple App Store and Google Play.",
      "Own end-to-end authentication, session-management, and turf-booking workflows within a two-engineer team.",
      "Co-design application architecture and release processes, including testing, continuous integration, and deployment workflows.",
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
      "Lead frontend development of an internal dashboard for ingesting, reviewing, and analyzing battery-experiment data.",
      "Co-design Supabase/PostgreSQL schemas and FastAPI services for ingesting and retrieving experimental data.",
      "Reduced median query latency by 67% through database indexing and API-layer optimization.",
      "Co-maintain NDAX and Neware ingestion pipelines, including file reconciliation and defensive parsing for incomplete file sets.",
    ],
    textLinks: [
      {
        label: "Nanoloy",
        href: "https://www.nanoloy.com/",
      },
    ],
  },
  {
    company: "Centre for Interdisciplinary AI, FLAME University",
    role: "Research Assistant",
    period: "Jan 2024 - May 2025",
    type: "research",
    description: [
      "Configured and administered a multi-user GPU compute server for research and model training, including user management, drivers, storage, and environment isolation.",
      "Co-developed ConvGRU, conditional-GAN, and ConvLSTM training pipelines and satellite-data ingestion tooling for precipitation nowcasting.",
      "Supported team kaubega's Weather4Cast 2024 and 2025 submissions through model development, data-ingestion tooling, and GPU infrastructure.",
    ],
  },
  {
    company: "ISRO, Space Applications Centre",
    role: "Research Intern, Space Research and Training Division",
    period: "May 2023 - Aug 2023",
    type: "research",
    description: [
      "Developed ConvLSTM precipitation-nowcasting models using INSAT-3D satellite data in an air-gapped HPC environment.",
      "Improved RMSE by 30.7% relative to baseline optical-flow models.",
    ],
  },
  {
    company: "National Federation of the Blind Maharashtra",
    role: "Project Solutions Intern",
    period: "May 2024 - Sep 2024",
    type: "internship",
    compact: true,
    description: [
      "Prototyped object identification with navigation cues on Raspberry Pi for students at Jagriti Blind School.",
      "Benchmarked more than 10 object-detection models for edge deployment using accuracy and memory usage as evaluation criteria.",
    ],
  },
  {
    company: "Sportskeeda",
    role: "Golf Content Writer",
    period: "Aug 2023 - Oct 2023",
    type: "work",
    compact: true,
    description: ["Reported and published golf news articles and listicles."],
  },
  {
    company: "FLAME Q Centre",
    role: "Peer Tutor",
    period: "Sep 2022 - Apr 2025",
    type: "work",
    compact: true,
    description: [
      "Provided one-to-one tutoring in programming, mathematics, and quantitative economics.",
    ],
  },
  {
    company: "FLAME Mathematical Modelling Centre",
    role: "Student Researcher",
    period: "Oct 2022 - Apr 2023",
    type: "research",
    compact: true,
    description: [
      "Implemented and evaluated genetic algorithms and variational autoencoders for synthetic sample generation in imbalanced classification and protein data experiments.",
    ],
  },
  {
    company: "Analyse India",
    role: "Technical Intern",
    period: "May 2022 - Aug 2022",
    type: "internship",
    compact: true,
    description: [
      "Built Python tooling to collect and normalize market data from Google Finance and Yahoo Finance for technical research.",
      "Implemented candlestick-pattern detection and alerting within MetaStock.",
    ],
  },
  {
    company: "SNEHA",
    role: "IT/IM Intern",
    period: "May 2022 - Aug 2022",
    type: "internship",
    compact: true,
    description: [
      "Audited network infrastructure across three Mumbai offices and produced a consolidated topology diagram.",
    ],
  },
];
