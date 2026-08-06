import type { ProjectItem } from "./types";

export const PROJECTS: ProjectItem[] = [
  {
    title: "Personal Website and Diary",
    description:
      "A Next.js portfolio and file-based MDX diary with terminal and PDF views, generated Open Graph images, automated Vitest checks, and a GitHub Actions pipeline that compiles the LaTeX CV and deploys the site.",
    link: "https://github.com/jeetsh4h/jeetsh4h-dev",
    linkText: "GitHub",
    stack: ["Next.js", "TypeScript", "MDX", "GitHub Actions"],
    featured: true,
  },
  {
    title: "Jyeshthanubandh",
    description:
      "A senior-citizen safety application co-developed with FLAME University and Pimpri-Chinchwad Police, integrating registered profiles, medical information, location, and emergency-assistance workflows with a police-response dashboard.",
    link: "https://play.google.com/store/apps/details?id=com.Jyeshthanubandh.pcmc_app",
    linkText: "Play Store",
    stack: ["React Native", "AWS"],
    featured: true,
  },
  {
    title: "INSAT-3D Nowcasting Toolkit",
    description:
      "A command-line research toolkit for caching MOSDAC satellite data and training ConvLSTM models on INSAT-3D imagery.",
    status: "research",
    link: "https://github.com/jeetsh4h/DISS384",
    linkText: "GitHub",
    stack: ["TensorFlow", "OpenCV"],
  },
  {
    title: "Rust Systems Projects",
    description:
      "A command shell with built-in commands, PATH resolution, and external-process execution, plus an asynchronous HTTP/1.1 server with concurrent TCP handling, file upload and download, and gzip support.",
    link: "https://github.com/jeetsh4h/http-server-rust-cc",
    linkText: "HTTP server",
    stack: ["Rust", "Tokio", "TCP", "HTTP/1.1"],
    featured: true,
  },
  {
    title: "Project Euler+ Solutions",
    description:
      "Documented solutions to 52 HackerRank Project Euler+ problems with time- and space-complexity notes.",
    link: "https://github.com/jeetsh4h/ProjectEuler",
    linkText: "GitHub",
    stack: ["Python", "Jupyter", "Algorithms"],
  },
  {
    title: "Curriculum Mapping",
    description:
      "An interactive prerequisite-graph application for computer science, economics, and psychology curricula, with course-detail views and custom CSV uploads.",
    link: "https://github.com/jeetsh4h/Course_Mapping",
    linkText: "GitHub",
    stack: ["React", "TypeScript", "React Flow"],
  },
  {
    title: "RefreshRateChange",
    description:
      "A C++ command-line utility with PowerShell and Windows Task Scheduler automation that switches display refresh rates when a laptop transitions between AC and battery power.",
    link: "https://github.com/jeetsh4h/RefreshRateChange",
    linkText: "GitHub",
    stack: ["C++", "PowerShell"],
  },
  {
    title: "Event Extract",
    description:
      "A regex-based Google Workspace add-on that extracts dates from university emails and lets users create Google Calendar events; deployed as a proof of concept to the Google Workspace Marketplace.",
    link: "https://github.com/jeetsh4h/EventExtractAddOn",
    linkText: "GitHub",
    stack: ["Google Apps Script", "JavaScript"],
    featured: true,
  },
  {
    title: "Paudha Yodha",
    description:
      "A Streamlit image-classification application that predicts plant species and leaf-health conditions across 38 classes and returns plant-care guidance.",
    link: "https://github.com/jeetsh4h/paudhayodha",
    linkText: "GitHub",
    stack: ["Python", "Streamlit", "Computer Vision"],
  },
];
