import type { ExperienceItem } from "./types";

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Elevate Fitness",
    role: "Software Engineer",
    period: "Dec 2025 - Present",
    category: "engineering",
    description: [
      "Develop and maintain Movynn, a React Native and Expo fitness application backed by Convex and published on the Apple App Store and Google Play.",
      "Coordinate development within a two-engineer team and own end-to-end authentication, session-management, and turf-booking workflows.",
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
    category: "engineering",
    description: [
      "Lead frontend development of an internal battery-research dashboard and coordinate delivery across the team.",
      "Co-design Supabase/PostgreSQL schemas and FastAPI services for ingesting and retrieving experimental data.",
      "Built a multi-LLM retrieval-augmented generation pipeline that routes battery-research queries to specialized models.",
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
    category: "research",
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
    category: "research",
    description: [
      "Developed ConvLSTM precipitation-nowcasting models using INSAT-3D satellite data in an air-gapped HPC environment.",
      "Improved RMSE by 30.7% relative to baseline optical-flow models.",
    ],
  },
  {
    company: "National Federation of the Blind Maharashtra",
    role: "Project Solutions Intern",
    period: "May 2024 - Sep 2024",
    category: "engineering",
    compact: true,
    description: [
      "Interviewed officials at Jagriti School for Blind Girls and field-tested a Raspberry Pi prototype that provided object-identification and navigation cues for students.",
      "Benchmarked more than 10 object-detection models for edge deployment, comparing accuracy and memory usage.",
    ],
  },
  {
    company: "Sportskeeda",
    role: "Golf Content Writer",
    period: "Aug 2023 - Oct 2023",
    category: "teaching-writing",
    compact: true,
    description: ["Reported and published golf news articles and listicles."],
  },
  {
    company: "FLAME Q Centre",
    role: "Peer Tutor",
    period: "Sep 2022 - Apr 2025",
    category: "teaching-writing",
    compact: true,
    description: [
      "Provided one-to-one tutoring in programming, mathematics, and quantitative economics, supporting an average of seven students per academic year.",
    ],
  },
  {
    company: "FLAME Mathematical Modelling Centre",
    role: "Student Researcher",
    period: "Oct 2022 - Apr 2023",
    category: "research",
    compact: true,
    description: [
      "Implemented and evaluated genetic algorithms and variational autoencoders for synthetic sample generation in experiments on imbalanced classification and protein datasets.",
    ],
  },
  {
    company: "Analyse India",
    role: "Technical Intern",
    period: "May 2022 - Aug 2022",
    category: "engineering",
    compact: true,
    description: [
      "Built Python tooling to collect and normalize Google Finance and Yahoo Finance data for publicly listed companies on India's National Stock Exchange.",
      "Backtested trading strategies, calculated returns and technical indicators, and implemented candlestick-pattern detection and alerting within MetaStock.",
    ],
  },
  {
    company: "SNEHA",
    role: "IT/IM Intern",
    period: "May 2022 - Aug 2022",
    category: "engineering",
    compact: true,
    description: [
      "Audited network infrastructure across three Mumbai offices and produced a consolidated topology diagram.",
    ],
  },
];
