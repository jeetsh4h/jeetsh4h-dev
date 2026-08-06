import type { ProjectItem } from "./types";

export const PROJECTS: ProjectItem[] = [
  {
    title: "Personal Website and Diary",
    description:
      "A Next.js portfolio and file-based MDX diary with terminal and PDF views, generated Open Graph images, automated Vitest checks, and a GitHub Actions pipeline that compiles the LaTeX CV and deploys the site.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/jeetsh4h/jeetsh4h-dev",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "MDX",
      "Tailwind CSS",
      "LaTeX",
      "GitHub Actions",
    ],
    featured: true,
  },
  {
    title: "Jyeshthanubandh",
    description:
      "A senior-citizen safety application co-developed with FLAME University and Pimpri-Chinchwad Police, integrating registered profiles, medical information, location, and emergency-assistance workflows with a police-response dashboard.",
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.Jyeshthanubandh.pcmc_app",
      },
    ],
    stack: ["React Native", "AWS"],
    featured: true,
  },
  {
    title: "INSAT-3D Nowcasting Toolkit",
    description:
      "A command-line research toolkit for caching MOSDAC satellite data and training ConvLSTM models on INSAT-3D imagery.",
    status: "research",
    links: [
      {
        label: "Repository",
        href: "https://github.com/jeetsh4h/DISS384",
      },
    ],
    stack: ["Python", "TensorFlow/Keras", "OpenCV"],
  },
  {
    title: "Rust Systems Projects",
    description:
      "A command shell with built-in commands, PATH resolution, and external-process execution, plus an asynchronous HTTP/1.1 server with concurrent TCP handling, file upload and download, and gzip support.",
    links: [
      {
        label: "HTTP server",
        href: "https://github.com/jeetsh4h/http-server-rust-cc",
      },
      {
        label: "Shell",
        href: "https://github.com/jeetsh4h/basic-shell-rust-cc",
      },
    ],
    stack: ["Rust", "Tokio", "TCP", "HTTP/1.1"],
    featured: true,
  },
  {
    title: "Project Euler+ Solutions",
    description:
      "Documented solutions to 52 HackerRank Project Euler+ problems with time- and space-complexity notes.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/jeetsh4h/ProjectEuler",
      },
    ],
    stack: ["Python", "Jupyter", "Algorithms"],
  },
  {
    title: "Curriculum Mapping",
    description:
      "An interactive prerequisite-graph application for computer science, economics, and psychology curricula, with course-detail views and custom CSV uploads.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/jeetsh4h/Course_Mapping",
      },
    ],
    stack: ["React", "TypeScript", "React Flow", "Vite"],
  },
  {
    title: "RefreshRateChange",
    description:
      "A C++ command-line utility with PowerShell and Windows Task Scheduler automation that switches display refresh rates when a laptop transitions between AC and battery power.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/jeetsh4h/RefreshRateChange",
      },
    ],
    stack: ["C++", "PowerShell", "Windows Task Scheduler"],
  },
  {
    title: "Event Extract",
    description:
      "A regex-based Google Workspace add-on that extracts dates from university emails and lets users create Google Calendar events; deployed as a proof of concept to the Google Workspace Marketplace.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/jeetsh4h/EventExtractAddOn",
      },
    ],
    stack: ["Google Apps Script", "JavaScript", "Google Calendar API"],
    featured: true,
  },
  {
    title: "Paudha Yodha",
    description:
      "A Streamlit image-classification application that predicts plant species and leaf-health conditions across 38 classes and returns plant-care guidance.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/jeetsh4h/paudhayodha",
      },
    ],
    stack: ["Python", "TensorFlow/Keras", "Streamlit", "Computer Vision"],
  },
];
