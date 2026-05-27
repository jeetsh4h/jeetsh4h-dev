import type { ResearchItem } from "./types";

export const RESEARCH: ResearchItem[] = [
  {
    title:
      "Computationally-efficient deep learning models for nowcasting of precipitation",
    year: "2025",
    citationAuthors: "Bhuskute, Anushree, et al.",
    kind: "publication",
    status: "published",
    summary:
      "Co-author on a ConvGRU transfer-learning approach for short-term rainfall prediction using SEVIRI infrared imagery and OPERA-compatible rainfall targets.",
    result:
      "Team kaubega placed 2nd in the official Weather4Cast 2025 cumulative rainfall challenge.",
    links: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2511.11197",
      },
      {
        label: "Weather4Cast 2025 result",
        href: "https://weather4cast.net/neurips2025/",
      },
    ],
  },
  {
    title:
      "A conditional Generative Adversarial Network model for the Weather4Cast 2024 Challenge",
    year: "2024",
    citationAuthors: "Deshpande, Atharva, et al.",
    kind: "publication",
    status: "published",
    summary:
      "Co-author on a dense optical-flow and conditional-GAN approach for four-hour cumulative rainfall prediction in Weather4Cast 2024.",
    result:
      "Placed 1st on the Weather4Cast 2024 core/cumulative-rainfall challenge at the competition deadline; the public leaderboard now includes later post-deadline submissions.",
    contribution:
      "Contributed to optical-flow forecasting and model architecture experiments, including ConvLSTM-layer design work.",
    links: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2412.00451",
      },
      {
        label: "Weather4Cast 2024 leaderboard",
        href: "https://weather4cast.net/neurips2024/competitions/w4c24-cum1/?leaderboard=",
      },
      {
        label: "Weather4Cast 2024 page",
        href: "https://weather4cast.net/neurips2024/",
      },
    ],
  },
  {
    title: "Programming languages and AI-assisted software engineering workflows",
    year: "In progress",
    kind: "interest",
    status: "in-progress",
    summary:
      "Current unpublished research direction. Details withheld pending peer review or public release.",
  },
];
