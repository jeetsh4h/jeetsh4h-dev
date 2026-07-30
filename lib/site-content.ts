import { ABOUT } from "@/lib/content/about";
import { COURSEWORK } from "@/lib/content/coursework";
import { EDUCATION, PRIOR_EDUCATION } from "@/lib/content/education";
import { EXPERIENCE } from "@/lib/content/experience";
import { PROJECTS } from "@/lib/content/projects";
import { RESEARCH } from "@/lib/content/research";
import { SKILLS } from "@/lib/content/skills";
import { SOCIALS } from "@/lib/content/socials";
import type {
  EducationItem,
  CourseworkItem,
  ExperienceItem,
  PriorEducationItem,
  ProjectItem,
  ResearchItem,
  SocialLink,
} from "@/lib/content/types";

export type SiteSectionId =
  | "intro"
  | "socials"
  | "experience"
  | "research"
  | "skills"
  | "projects"
  | "education";

export const CONTENT_SECTION_IDS: SiteSectionId[] = [
  "intro",
  "socials",
  "experience",
  "research",
  "skills",
  "projects",
  "education",
];

export type SocialLinkModel = SocialLink;
export type ExperienceEntryModel = ExperienceItem;
export type ResearchEntryModel = ResearchItem;
export type ProjectEntryModel = ProjectItem;
export type EducationEntryModel = EducationItem;
export type CourseworkEntryModel = CourseworkItem;
export type PriorEducationEntryModel = PriorEducationItem;

export interface IntroSectionModel {
  id: "intro";
  name: string;
  role: string;
  location: string;
  bio: string;
  socialLinks: SocialLinkModel[];
}

export interface SocialsSectionModel {
  id: "socials";
  links: SocialLinkModel[];
}

export interface ExperienceSectionModel {
  id: "experience";
  featuredEntries: ExperienceEntryModel[];
  compactEntries: ExperienceEntryModel[];
}

export interface ResearchSectionModel {
  id: "research";
  entries: ResearchEntryModel[];
}

export interface SkillCategoryModel {
  name: string;
  items: string[];
}

export interface SkillsSectionModel {
  id: "skills";
  categories: SkillCategoryModel[];
}

export interface ProjectsSectionModel {
  id: "projects";
  entries: ProjectEntryModel[];
}

export interface EducationSectionModel {
  id: "education";
  higherEducation: EducationEntryModel[];
  priorEducation: PriorEducationEntryModel[];
  coursework: CourseworkEntryModel[];
}

export function buildSocialsSection(): SocialsSectionModel {
  return {
    id: "socials",
    links: SOCIALS,
  };
}

export function buildIntroSection(): IntroSectionModel {
  return {
    id: "intro",
    name: ABOUT.name,
    role: ABOUT.role,
    location: ABOUT.location,
    bio: ABOUT.bio,
    socialLinks: SOCIALS,
  };
}

export function buildExperienceSection(): ExperienceSectionModel {
  return {
    id: "experience",
    featuredEntries: EXPERIENCE.filter((entry) => !entry.compact),
    compactEntries: EXPERIENCE.filter((entry) => entry.compact),
  };
}

export function buildResearchSection(): ResearchSectionModel {
  return {
    id: "research",
    entries: RESEARCH,
  };
}

export function buildSkillsSection(): SkillsSectionModel {
  return {
    id: "skills",
    categories: Object.entries(SKILLS).map(([name, items]) => ({
      name,
      items,
    })),
  };
}

export function buildProjectsSection(): ProjectsSectionModel {
  return {
    id: "projects",
    entries: PROJECTS,
  };
}

export function buildEducationSection(): EducationSectionModel {
  return {
    id: "education",
    higherEducation: EDUCATION,
    priorEducation: PRIOR_EDUCATION,
    coursework: COURSEWORK,
  };
}
