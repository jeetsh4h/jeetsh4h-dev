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
      "Co-author. Team kaubega placed 2nd in the official Weather4Cast 2025 cumulative rainfall challenge.",
    result:
      "2nd place, Weather4Cast 2025 cumulative rainfall challenge.",
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
      "Co-author. Verified Weather4Cast 2024 core leaderboard result; the paper reports 1st place on the core challenge leaderboard.",
    contribution:
      "Contributed to optical-flow forecasting and model architecture experiments, including ConvLSTM-layer design work.",
    links: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2412.00451",
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
