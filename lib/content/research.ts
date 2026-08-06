import type { ResearchItem } from "./types";

export const RESEARCH: ResearchItem[] = [
  {
    title:
      "Computationally-efficient deep learning models for nowcasting of precipitation: A solution for the Weather4cast 2025 challenge",
    year: "2025",
    citationAuthors: "Anushree Bhuskute, Kaushik Gopalan, and Jeet Shah",
    kind: "preprint",
    status: "preprint",
    summary:
      "arXiv preprint. Co-author. Team kaubega placed second in the Weather4Cast 2025 cumulative-rainfall task.",
    featured: true,
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
    kind: "preprint",
    status: "preprint",
    summary:
      "arXiv preprint. Co-author. Team kaubega placed first on the Weather4Cast 2024 core-challenge leaderboard.",
    featured: true,
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
      "Precipitation Nowcasting Using ConvLSTM with INSAT-3D Satellite Data over the Indian Subcontinent",
    year: "2025",
    citationAuthors: "Jeet Shah",
    kind: "thesis",
    status: "completed",
    summary:
      "FLAME Scholar's Program undergraduate thesis supervised by Kaushik Gopalan, consolidating research begun in CSIT334 and continued during the ISRO internship.",
    featured: true,
    links: [
      {
        label: "Thesis repository",
        href: "https://github.com/jeetsh4h/DISS384",
      },
    ],
  },
  {
    title:
      "Precipitation Nowcasting with OLR data using Optical Flow and Machine Learning",
    year: "2023",
    citationAuthors: "Jeet Shah",
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
