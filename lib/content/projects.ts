import type { ProjectItem } from "./types";

export const PROJECTS: ProjectItem[] = [
  {
    title: "Nilakan Programming Language",
    description:
      "I implement Nilakan with Prajas Naik, based on language fundamentals designed by Prof. Aamod Sane. The language uses Python-like syntax and indentation-based blocks. My work spans the parser, static checks, interpreter, runtime diagnostics, CLI, documentation, and browser playground.",
    links: [
      {
        label: "Website",
        href: "https://nilakan.jeetsh4h.workers.dev",
      },
    ],
    stack: ["TypeScript", "Chevrotain", "Monaco", "Playwright"],
    featured: true,
  },
  {
    title: "INSAT-3D Nowcasting Toolkit",
    description:
      "An end-to-end research toolkit for caching MOSDAC satellite data, generating temporal windows, training ConvLSTM models, and comparing forecasts with optical-flow baselines. The ConvLSTM reduced six-hour RMSE by 30.7%.",
    status: "research",
    links: [
      {
        label: "Repository",
        href: "https://github.com/jeetsh4h/DISS384",
      },
    ],
    stack: ["Python", "TensorFlow/Keras", "OpenCV", "HDF5"],
    featured: true,
  },
  {
    title: "Ladybird Browser Contribution",
    description:
      "Added an Open Link in New Window context-menu action across LibWebView, Qt, and AppKit; merged upstream in May 2026.",
    status: "public",
    links: [
      {
        label: "Merged pull request",
        href: "https://github.com/LadybirdBrowser/ladybird/pull/8009",
      },
    ],
    stack: ["C++", "Objective-C++", "Qt", "AppKit"],
    featured: true,
  },
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
    featured: false,
  },
  {
    title: "Jyeshthanubandh",
    description:
      "A senior-citizen safety application developed with FLAME University and Pimpri-Chinchwad Police. I contributed Firebase phone authentication, React Native integration, Android build work, and release fixes.",
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.Jyeshthanubandh.pcmc_app",
      },
    ],
    stack: ["React Native", "Firebase"],
    featured: false,
  },
  {
    title: "Project Euler+ Solutions",
    description:
      "Documented implementations and optimization iterations across 52 numbered Project Euler problems, with space and time complexity analysis.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/jeetsh4h/ProjectEuler",
      },
    ],
    stack: ["Python", "Jupyter", "Algorithms"],
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
