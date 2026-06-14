import type { ProjectItem } from "./types";

export const PROJECTS: ProjectItem[] = [
  {
    title: "Jyeshthanubandh",
    description:
      "Safety app deployed with Pimpri-Chinchwad Police for senior-citizen support workflows. Built while working with the CAI @ FLAME University.",
    link: "https://play.google.com/store/apps/details?id=com.Jyeshthanubandh.pcmc_app",
    linkText: "Play Store",
    stack: ["React Native", "AWS"],
  },
  {
    title: "Precipitation Nowcasting",
    description:
      "A CLI tool that I developed to train a ConvLSTM model for precipitation nowcasting using INSAT-3D satellite data. This is the repository that functioned as my source of truth while researching and writing my undergraduate honors thesis at FLAME University.",
    link: "https://github.com/jeetsh4h/DISS384",
    linkText: "GitHub",
    stack: ["TensorFlow", "OpenCV"],
  },
  {
    title: "Girlfriend Birthday Gift",
    description:
      "Built a website for my girlfriend as a birthday card (I also got her a gift). “Love someone to the point of creation.”",
    highlights: ["She loved the website and the gift.", "YAYYYYY!!!"],
    link: "https://birthday.sunishqa.my",
    linkText: "Website",
    stack: ["Astro", "Photoshop"],
  },
];
