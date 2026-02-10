export const PROFILE = {
  name: "Jeet Shah",
  role: "Full-Stack Engineer & AI Researcher",
  bio: "I am a Product-minded Full-Stack Engineer and AI Researcher. Currently co-founding TriCatch and building scalable systems. I specialize in spatiotemporal modeling (NeurIPS Winner) and bridging the gap between business requirements and technical architecture.",
  email: "jeetsh4h@gmail.com",
  github: "github.com/jeetsh4h",
  linkedin: "linkedin.com/in/jeetsh4h",
};

export const EXPERIENCE = [
  {
    company: "TriCatch",
    role: "Co-founder & Lead Engineer",
    period: "Dec 2025 - Present",
    type: "work",
    achievements: [
      "Architecting Movynn (React Native & Supabase).",
      "Engineered an offline-first synchronization engine for low-connectivity environments.",
      "Managing full-cycle development and secure user data handling.",
    ],
  },
  {
    company: "Voltek AI",
    role: "Software Developer",
    period: "Oct 2024 - Present",
    type: "work",
    achievements: [
      "Designed NANOLOY data pipeline (PostgreSQL, Azure), reducing query latency by 200%.",
      "Built Multi-LLM RAG system for internal knowledge retrieval.",
      "Deployed full-stack logging visualization (NextJS, FastAPI).",
    ],
  },
  {
    company: "ISRO (Space Apps Centre)",
    role: "Research Intern (SRTD)",
    period: "May 2023 - Aug 2023",
    type: "research",
    description:
      "Developed ConvLSTM model for precipitation nowcasting in a high-security air-gapped HPC environment. Outperformed baselines by 30.7%.",
  },
  {
    company: "National Federation of the Blind",
    role: "Project Solutions Intern",
    period: "May 2024 - Sep 2024",
    type: "internship",
    description:
      "Developed assistive navigation tools using Raspberry Pi and CV.",
  },
  {
    company: "Sportskeeda",
    role: "Golf Content Writer",
    period: "Aug '23 - Oct '23",
    type: "internship",
  },
  {
    company: "Analyse India",
    role: "Intern",
    period: "May '22 - Aug '22",
    type: "internship",
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
  {
    title: "Spicetify Extensions",
    description:
      "Open Source contribution to Spotify customization tool. Implemented 'Wikify' feature for track metadata.",
    link: "https://github.com/CharlieS1103/spicetify-extensions/pull/110",
    linkText: "PR Link",
  },
  {
    title: "Precipitation Nowcasting",
    description:
      "Codebase for my dissertation (DISS384). Research resources and implementation for high-resolution rainfall prediction.",
    link: "https://github.com/jeetsh4h/DISS384",
    linkText: "GitHub",
  },
];

export const RESEARCH = [
  {
    title:
      "Computationally-efficient deep learning models for nowcasting of precipitation",
    year: "2025",
    venue: "arXiv:2511.11197 [cs.CV]",
    authors: "Bhuskute, Anushree, et al.",
    link: "https://arxiv.org/abs/2511.11197",
  },
  {
    title:
      "A conditional Generative Adversarial network model for the Weather4Cast 2024 Challenge",
    year: "2024",
    venue: "arXiv:2412.00451 [cs.CV]",
    authors: "Deshpande, Atharva, et al.",
    link: "https://arxiv.org/abs/2412.00451",
  },
];

export const EDUCATION = [
  {
    institution: "FLAME University",
    period: "2021 - 2025",
    degree: "BSc. (Hons.) in Computer Science",
    details: ["GPA: 8.88/10", "Award: Merit Scholarship (25%)"],
  },
  {
    institution: "FLAME University",
    period: "2025",
    degree: "PG Diploma in Interdisciplinary Studies",
    details: ["GPA: 8.38/10", "Award: Merit Scholarship (60%)"],
  },
];

export const SKILLS = {
  Languages: "Python, TypeScript, C++, SQL, Haskell, C#",
  Frameworks: "React Native, Next.js, NestJS, FastAPI, Flask",
  "AI/ML": "PyTorch, TensorFlow, Computer Vision, RAG, ConvLSTM",
  Infra: "Docker, Linux (HPC/Air-gapped), Azure, GCP, PostgreSQL",
};
