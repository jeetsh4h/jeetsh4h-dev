export interface ResearchItem {
  title: string;
  year: string;
  authors: string;
  link: string;
}

export interface EducationItem {
  institution: string;
  period: string;
  degree: string;
  details: string[];
}

export interface PriorEducationItem {
  institution: string;
  period: string;
  degree: string;
}

export interface ExperienceTextLink {
  label: string;
  href: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  type: string;
  description: string[];
  compact?: boolean;
  textLinks?: ExperienceTextLink[];
}

export interface Skills {
  [category: string]: string;
}

export const ABOUT = {
  name: "Jeet Shah",
  role: "Full-Stack Engineer & AI Researcher",
  bio: "I am a product-minded Full-Stack Engineer and an AI Researcher. Currently co-founding TriCatch and building scalable systems. I specialize in spatiotemporal deep-learning problems. Bridging the gap between business requirements and technical architecture from Mumbai, India.",
};

export const SEO = {
  title: "Jeet Shah | Software Engineer & AI Researcher",
  description: ABOUT.bio,
  url: "https://jeetsh4h.dev",
  keywords: [
    "Jeet Shah",
    "Software Engineer",
    "AI Researcher",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Machine Learning",
    "Precipitation Nowcasting",
    "ConvLSTM",
    "Deep Learning",
    "Software Developer",
    "TriCatch",
  ],
};

export const SOCIALS = {
  github: "github.com/jeetsh4h",
  linkedin: "linkedin.com/in/jeetsh4h",
  email: "jeetsh4h@gmail.com",
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "TriCatch",
    role: "Co-founder & Lead Engineer",
    period: "Dec 2025 - Present",
    type: "work",
    description: [
      "Architecting Movynn (React Native & Supabase).",
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

export const PROJECTS = [
  {
    title: "Jyeshthanubandh",
    description:
      "Official safety app for Pimpri-Chinchwad Police. Features real-time police integration and medical data tracking.",
    link: "https://play.google.com/store/apps/details?id=com.Jyeshthanubandh.pcmc_app",
    linkText: "Play Store",
  },
  {
    title: "Paudha Yodha",
    description:
      "Plant disease detection app (92% accuracy). Fine-tuned ResNet-50 on leaf imagery. Bit N Build Finalist.",
    link: "https://github.com/jeetsh4h/paudhayodha",
    linkText: "GitHub",
  },
  // {
  //   title: "Spicetify Extensions",
  //   description:
  //     "Open Source contribution to Spotify customization tool. Implemented 'Wikify' feature for track metadata.",
  //   link: "https://github.com/CharlieS1103/spicetify-extensions/pull/110",
  //   linkText: "PR Link",
  // },
  {
    title: "Precipitation Nowcasting",
    description:
      "Codebase for my dissertation (DISS384). Research resources and implementation for high-resolution rainfall prediction.",
    link: "https://github.com/jeetsh4h/DISS384",
    linkText: "GitHub",
  },
];

export const RESEARCH: ResearchItem[] = [
  {
    title:
      "Computationally-efficient deep learning models for nowcasting of precipitation",
    year: "2025",
    authors: "Bhuskute, Anushree, et al.",
    link: "https://arxiv.org/abs/2511.11197",
  },
  {
    title:
      "A conditional Generative Adversarial network model for the Weather4Cast 2024 Challenge",
    year: "2024",
    authors: "Deshpande, Atharva, et al.",
    link: "https://arxiv.org/abs/2412.00451",
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "FLAME University",
    period: "2024 - 2025",
    degree: "PG Diploma in Interdisciplinary Studies",
    details: ["CGPA: 8.38/10", "Award: Merit Scholarship (60%)"],
  },
  {
    institution: "FLAME University",
    period: "2021 - 2024",
    degree: "BSc. (Hons.) in Computer Science",
    details: ["CGPA: 8.88/10", "Award: Merit Scholarship (25%)"],
  },
];

export const PRIOR_EDUCATION: PriorEducationItem[] = [
  {
    institution: "PACE Jr. Sci. College (HSC)",
    period: "2019 - 2021",
    degree: "94.00% (Merit Scholarship)",
  },
  {
    institution: "CP Goenka Int'l School (IGCSE)",
    period: "2019",
    degree: "92.25% (Cambridge Certificate)",
  },
];

export const SKILLS: Skills = {
  Languages: "Python, TypeScript, C++, SQL, Haskell, C#",
  Frameworks: "React Native, Next.js, NestJS, FastAPI, Flask",
  "AI/ML": "PyTorch, TensorFlow, Computer Vision, RAG, ConvLSTM",
  Infra: "Docker, Linux (HPC/Air-gapped), Azure, GCP, PostgreSQL",
};
