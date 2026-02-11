export interface Profile {
  name: string;
  role: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  type: "work" | "research" | "internship";
  description: string[];
  compact?: boolean;
}

export interface ProjectItem {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

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

export interface Skills {
  [category: string]: string;
}
