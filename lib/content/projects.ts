import type { ProjectItem } from "./types";

// Every card shares one shape: title, one-line summary, a two-to-three line
// description, two or three verified highlights, stack, and links.
export const PROJECTS: ProjectItem[] = [
  {
    title: "Nilakan",
    summary:
      "A programming language I co-designed and whose implementation I own.",
    description:
      "Python-like syntax with indentation-based blocks, co-designed with Prof. Aamod Sane. I own the implementation, working with Prajas Naik: parser, static checks, interpreter, CLI and browser playground. I build it mostly with Codex and Claude Code and review the generated code.",
    links: [
      {
        label: "Website",
        href: "https://nilakan.jeetsh4h.workers.dev",
      },
    ],
    stack: ["TypeScript", "Chevrotain", "Monaco", "Playwright"],
    highlights: ["450+ commits", "45k+ lines", "80+ test files"],
    featured: true,
  },
  {
    title: "Ladybird",
    summary: "A merged upstream contribution to an independent web browser.",
    description:
      'Added an "Open in New Window" action to the link context menu, across the shared LibWebView layer and the Qt and AppKit front ends. Merged upstream after code review.',
    status: "public",
    links: [
      {
        label: "Merged pull request",
        href: "https://github.com/LadybirdBrowser/ladybird/pull/8009",
      },
    ],
    stack: ["C++", "Objective-C++", "Qt", "AppKit"],
    highlights: ["PR #8009", "Merged May 2026"],
    featured: true,
  },
  {
    title: "Jyeshthanubandh",
    summary:
      "Phone sign-in and Android releases for a senior-citizen safety app.",
    description:
      "A safety app for senior citizens, developed with FLAME University and Pimpri-Chinchwad Police. In 2024, I added Firebase phone authentication and React Native integration, and handled Android builds and release fixes.",
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.Jyeshthanubandh.pcmc_app",
      },
    ],
    stack: ["React Native", "Firebase"],
    highlights: ["10K+ Google Play downloads", "2024"],
    featured: true,
  },
  {
    title: "INSAT-3D Nowcasting",
    summary:
      "Satellite precipitation nowcasting, from data caching to model comparison.",
    description:
      "A research toolkit that caches MOSDAC satellite data, builds temporal windows, trains ConvLSTM models and compares their forecasts with optical-flow baselines.",
    status: "research",
    links: [
      {
        label: "Repository",
        href: "https://github.com/jeetsh4h/DISS384",
      },
    ],
    stack: ["Python", "TensorFlow/Keras", "OpenCV", "HDF5"],
    highlights: ["30.7% lower 6-hour RMSE", "Honors thesis"],
    featured: true,
  },
  {
    title: "jeetsh4h.dev",
    summary: "This site: a portfolio and diary with terminal and PDF views.",
    description:
      "A Next.js portfolio and file-based MDX diary with generated Open Graph images. GitHub Actions runs Vitest, compiles the LaTeX CV and deploys the site.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/jeetsh4h/jeetsh4h-dev",
      },
    ],
    stack: ["Next.js", "TypeScript", "MDX", "Tailwind CSS", "LaTeX"],
    highlights: ["CI-built résumé PDFs", "Vitest checks"],
    featured: false,
  },
  {
    title: "Project Euler+",
    summary: "Optimized solutions to Project Euler problems.",
    description:
      "Documented implementations and optimization iterations for each problem, with space and time complexity analysis.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/jeetsh4h/ProjectEuler",
      },
    ],
    stack: ["Python", "Jupyter", "Algorithms"],
    highlights: ["52 problems", "Complexity analysis"],
  },
  {
    title: "RefreshRateChange",
    summary: "Switches a laptop's refresh rate between AC and battery power.",
    description:
      "A C++ command-line utility, triggered by PowerShell and Windows Task Scheduler, that changes the display refresh rate whenever the laptop changes power source.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/jeetsh4h/RefreshRateChange",
      },
    ],
    stack: ["C++", "PowerShell", "Windows Task Scheduler"],
    highlights: ["Runs on power-source change", "Windows"],
  },
  {
    title: "Paudha Yodha",
    summary: "Identifies plant species and leaf health from a photo.",
    description:
      "A Streamlit image-classification app that predicts plant species and leaf-health conditions, then returns plant-care guidance.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/jeetsh4h/paudhayodha",
      },
    ],
    stack: ["Python", "TensorFlow/Keras", "Streamlit", "Computer Vision"],
    highlights: ["38 classes", "Plant-care guidance"],
  },
];
