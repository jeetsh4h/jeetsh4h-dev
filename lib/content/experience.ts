import type { ExperienceItem } from "./types";

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Columbia Software Solutions",
    role: "Software Engineer",
    period: "Oct 2026 - Present",
    category: "engineering",
    description: [
      "Student-run organization building free, custom software for nonprofits and small businesses in New York City.",
    ],
    textLinks: [
      {
        label: "Columbia Software Solutions",
        href: "https://www.columbiasoftwaresolutions.com/",
      },
    ],
  },
  {
    company: "Columbia University",
    role: "Teaching Assistant",
    period: "Fall 2026",
    category: "teaching-writing",
    description: [
      "Hold office hours, grade coursework, facilitate discussions, and support assignments for COMS2702 · AI in Context, a course with approximately 180 enrolled students.",
    ],
  },
  {
    company: "Elevate Fitness",
    role: "Software Engineer (Part-time)",
    period: "Dec 2025 - Aug 2026",
    category: "engineering",
    description: [
      "Built and maintained Movynn, a React Native and Expo fitness application backed by Convex and published on the Apple App Store and the Google Play Store in India.",
      "Implemented native Apple Sign-In and secure session recovery, including nonce verification and first-login profile persistence.",
      "Built multi-ticket booking and Razorpay payment recovery and reconciliation, requiring server-confirmed capture before order fulfillment.",
      "Added account-deletion and pseudonymization flows, automated app and backend tests, continuous-integration checks, and release documentation.",
    ],
    textLinks: [
      {
        label: "Movynn on the App Store",
        href: "https://apps.apple.com/in/app/movynn/id6767674156",
      },
    ],
  },
  {
    company: "Voltek AI",
    role: "Software Engineer (Part-time)",
    period: "Oct 2024 - Aug 2026",
    category: "engineering",
    description: [
      "Led frontend development for an internal battery-research platform used by 10 - 100 Nanoloy users.",
      "Redesigned PostgreSQL process storage from process-specific, join-heavy tables to three indexed canonical tables with transactional writes and backfill validation, reducing observed material-query latency from 3-20 seconds to under 500 ms.",
      "Built the Next.js orchestration layer for a battery-research assistant supporting OpenAI, Anthropic, Gemini, and xAI, with internal-document retrieval, web search, citations, streamed responses, and chat history.",
      "Co-maintained NDAX and Neware ingestion pipelines, including file reconciliation and defensive parsing for incomplete file sets.",
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
    company: "Space Applications Centre, ISRO",
    role: "Research Intern, Scientific Research and Training Division",
    period: "May 2023 - Aug 2023",
    category: "research",
    description: [
      "Developed ConvLSTM precipitation-nowcasting models using INSAT-3D satellite data in an air-gapped HPC environment.",
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
    period: "Apr 2022 - Jun 2022",
    category: "engineering",
    compact: true,
    description: [
      "Audited network infrastructure across three Mumbai offices and produced a consolidated topology diagram.",
    ],
  },
];
