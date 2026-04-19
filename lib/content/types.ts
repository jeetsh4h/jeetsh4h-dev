export interface AboutContent {
  name: string;
  role: string;
  bio: string;
}

export interface SeoContent {
  title: string;
  description: string;
  url: string;
  keywords: string[];
}

export type SocialKind = "github" | "linkedin" | "email";

export interface SocialLink {
  label: string;
  href: string;
  kind: SocialKind;
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

export interface PriorEducationItem {
  institution: string;
  period: string;
  degree: string;
  details: string[];
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

export interface ProjectItem {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

export type Skills = Record<string, string[]>;
