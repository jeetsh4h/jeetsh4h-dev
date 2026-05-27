export interface AboutContent {
  name: string;
  role: string;
  location: string;
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

export interface LinkItem {
  label: string;
  href: string;
}

export interface ResearchItem {
  title: string;
  year: string;
  citationAuthors?: string;
  kind: "publication" | "interest";
  status?: "published" | "in-progress";
  summary: string;
  contribution?: string;
  result?: string;
  links?: LinkItem[];
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
  type: "work" | "research" | "internship" | "contract";
  description: string[];
  compact?: boolean;
  textLinks?: ExperienceTextLink[];
}

export interface ProjectItem {
  title: string;
  description: string;
  status?: "public" | "private" | "pre-beta" | "research";
  stack?: string[];
  highlights?: string[];
  link?: string;
  linkText?: string;
  confidentialityNote?: string;
}

export type Skills = Record<string, string[]>;
