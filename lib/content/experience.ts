import type { ExperienceItem } from "./types";

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Elevate Fitness",
    role: "Software Developer",
    period: "Dec 2025 - Present",
    type: "work",
    description: [
      "Building the Movynn mobile application.",
      "Engineered an offline-first synchronization engine for low-connectivity environments.",
      "Managing full-cycle development and secure user data handling.",
    ],
    textLinks: [
      {
        label: "Movynn",
        href: "https://www.instagram.com/movynn_in/",
      },
    ],
  },
  {
    company: "Voltek AI",
    role: "Software Developer",
    period: "Oct 2024 - Present",
    type: "work",
    description: [
      "Designed Nanoloy data pipeline (PostgreSQL, Azure), reducing query latency by 200%.",
      "Built Multi-LLM RAG system for internal knowledge retrieval.",
    ],
    textLinks: [
      {
        label: "Nanoloy",
        href: "https://www.nanoloy.com/",
      },
    ],
  },
  {
    company: "ISRO (Space Applications Centre)",
    role: "Research Intern (SRTD)",
    period: "May 2023 - Aug 2023",
    type: "research",
    description: [
      "Developed ConvLSTM model for precipitation nowcasting in a high-security air-gapped HPC environment.",
      "Outperformed baseline by 30.7%.",
    ],
  },
  {
    company: "National Federation of the Blind Maharashtra",
    role: "Project Solutions Intern",
    period: "May 2024 - Sep 2024",
    type: "internship",
    description: [
      "Developed assistive navigation tools using Raspberry Pi and OpenCV.",
    ],
  },
  {
    company: "Sportskeeda",
    role: "Golf Content Writer",
    period: "Aug 2023 - Oct 2023",
    type: "internship",
    description: ["Golf Content Writer."],
    compact: true,
  },
  {
    company: "Analyse India",
    role: "Intern",
    period: "May 2022 - Aug 2022",
    type: "internship",
    description: ["Automated technical analysis processes."],
    compact: true,
  },
  {
    company: "SNEHA",
    role: "IT/IM Intern",
    period: "Apr 2022 - Jun 2022",
    type: "internship",
    description: ["Audited network diagrams."],
    compact: true,
  },
];
