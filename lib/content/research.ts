import type { ResearchItem } from "./types";

export const RESEARCH: ResearchItem[] = [
  {
    title:
      "Computationally-efficient deep learning models for nowcasting of precipitation: A solution for the Weather4cast 2025 challenge",
    year: "2025",
    citationAuthors: "Anushree Bhuskute, Kaushik Gopalan, and Jeet Shah",
    kind: "publication",
    status: "published",
    summary:
      "Co-author. Team kaubega placed 2nd in the official Weather4Cast 2025 cumulative rainfall challenge.",
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
      "A conditional Generative Adversarial network model for the Weather4Cast 2024 Challenge",
    year: "2024",
    citationAuthors:
      "Atharva Deshpande, Kaushik Gopalan, Jeet Shah, and Hrishikesh Simu",
    kind: "publication",
    status: "published",
    summary:
      "Co-author. Team kaubega placed 1st on the Weather4Cast 2024 core/cumulative-rainfall challenge at the competition deadline; the public leaderboard now includes later post-deadline submissions.",
    links: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2412.00451",
      },
      {
        label: "Weather4Cast 2024 leaderboard",
        href: "https://weather4cast.net/neurips2024/competitions/w4c24-cum1/?leaderboard=",
      },
    ],
  },
  {
    title:
      "Precipitation Nowcasting with OLR data using Optical Flow and Machine Learning",
    year: "2023",
    citationAuthors: "Jeet Shah, Kaushik Gopalan, and Dr. Bipasha Paul Shukla",
    kind: "presentation",
    status: "presented",
    summary:
      "Presented at the NCVPRIPG 2023 Student Research Symposium at IIT Jodhpur, covering INSAT-3D OLR data, optical flow, and machine-learning approaches to precipitation nowcasting.",
    links: [
      {
        label: "Official symposium programme",
        href: "https://events.iitj.ac.in/ncvpripg2023/srs.html",
      },
      {
        label: "Research repository",
        href: "https://github.com/jeetsh4h/Nowcasting-OLR",
      },
    ],
  },
];
