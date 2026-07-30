import type { ProjectItem } from "./types";

export const PROJECTS: ProjectItem[] = [
  {
    title: "Personal Website",
    description:
      "The source for this portfolio and diary: an accessibility, performance, SEO, and maintainability exercise with local MDX, terminal and PDF views, and a CV build pipeline.",
    link: "https://github.com/jeetsh4h/jeetsh4h-dev",
    linkText: "GitHub",
    stack: ["Next.js", "TypeScript", "MDX"],
  },
  {
    title: "Jyeshthanubandh",
    description:
      "A senior-citizen safety application deployed with Pimpri-Chinchwad Police, pairing a React Native app with police-facing support workflows.",
    link: "https://play.google.com/store/apps/details?id=com.Jyeshthanubandh.pcmc_app",
    linkText: "Play Store",
    stack: ["React Native", "AWS"],
  },
  {
    title: "Precipitation Nowcasting",
    description:
      "The research codebase and CLI for caching INSAT-3D satellite data and training ConvLSTM precipitation-nowcasting models for my undergraduate honours thesis.",
    status: "research",
    link: "https://github.com/jeetsh4h/DISS384",
    linkText: "GitHub",
    stack: ["TensorFlow", "OpenCV"],
  },
  {
    title: "Project Euler+ Solutions",
    description:
      "A single Jupyter notebook documenting Python solutions, iterations, and complexity analysis for 52 HackerRank Project Euler+ problems.",
    link: "https://github.com/jeetsh4h/ProjectEuler",
    linkText: "GitHub",
    stack: ["Python", "Jupyter", "Algorithms"],
  },
  {
    title: "Curriculum Mapping",
    description:
      "An interactive prerequisite graph for exploring course relationships across computer science, economics, and psychology curricula, with custom CSV upload support.",
    link: "https://github.com/jeetsh4h/Course_Mapping",
    linkText: "GitHub",
    stack: ["React", "TypeScript", "React Flow"],
  },
  {
    title: "RefreshRateChange",
    description:
      "A Windows command-line utility and scheduled-task configuration for changing a display's refresh rate when power state changes.",
    link: "https://github.com/jeetsh4h/RefreshRateChange",
    linkText: "GitHub",
    stack: ["C++", "PowerShell"],
  },
  {
    title: "Event Extract",
    description:
      "A Google Workspace add-on that extracts dates from university email and creates calendar events; developed as a software-engineering course project and published to the Workspace Marketplace.",
    link: "https://github.com/jeetsh4h/EventExtractAddOn",
    linkText: "GitHub",
    stack: ["Google Apps Script", "JavaScript"],
  },
  {
    title: "Paudha Yodha",
    description:
      "A Streamlit application for plant-species and leaf-disease detection, built with Aniket Khetan for the final round of the Bit N Build 2024 Maharashtra hackathon.",
    link: "https://github.com/jeetsh4h/paudhayodha",
    linkText: "GitHub",
    stack: ["Python", "Streamlit", "Computer Vision"],
  },
  {
    title: "JJDB",
    description:
      "A C++ course project implementing a file-backed database CLI with schema files, CSV loading, typed records, command chaining, and index-file creation.",
    link: "https://github.com/jeetsh4h/CSIT372/tree/main/db_internals",
    linkText: "GitHub",
    stack: ["C++", "File structures", "Database internals"],
  },
];
