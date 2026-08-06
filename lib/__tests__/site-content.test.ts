import { describe, expect, it } from "vitest";

import {
  buildAwardsSection,
  buildEducationSection,
  buildExperienceSection,
  buildIntroSection,
  buildLeadershipSection,
  buildProjectsSection,
  buildResearchSection,
  buildSkillsSection,
  buildSocialsSection,
} from "../site-content";
import { ABOUT } from "../content/about";
import { AWARDS } from "../content/awards";
import { COURSEWORK } from "../content/coursework";
import { EDUCATION, PRIOR_EDUCATION } from "../content/education";
import { EXPERIENCE } from "../content/experience";
import { LEADERSHIP } from "../content/leadership";
import { PROJECTS } from "../content/projects";
import { RESEARCH } from "../content/research";
import { SKILLS } from "../content/skills";
import { SOCIALS } from "../content/socials";

describe("site-content", () => {
  it("builds the intro section from profile and social content", () => {
    const intro = buildIntroSection();

    expect(intro).toEqual({
      id: "intro",
      name: ABOUT.name,
      role: ABOUT.role,
      location: ABOUT.location,
      bio: ABOUT.bio,
      socialLinks: SOCIALS,
    });
  });

  it("splits experience entries by compact display contract", () => {
    const experience = buildExperienceSection();

    expect(experience.id).toBe("experience");
    expect([
      ...experience.featuredEntries,
      ...experience.compactEntries,
    ]).toHaveLength(EXPERIENCE.length);
    expect(experience.featuredEntries.every((entry) => !entry.compact)).toBe(
      true,
    );
    expect(experience.compactEntries.every((entry) => entry.compact)).toBe(
      true,
    );
  });

  it("builds skills as structured arrays instead of comma-separated strings", () => {
    const skills = buildSkillsSection();

    expect(skills).toEqual({
      id: "skills",
      categories: Object.entries(SKILLS).map(([name, items]) => ({
        name,
        items,
      })),
    });
  });

  it("passes through section content without reshaping entry data", () => {
    expect(buildSocialsSection()).toEqual({
      id: "socials",
      links: SOCIALS,
    });
    expect(buildResearchSection()).toEqual({
      id: "research",
      entries: RESEARCH,
    });
    expect(buildProjectsSection()).toEqual({
      id: "projects",
      entries: PROJECTS,
    });
    expect(buildEducationSection()).toEqual({
      id: "education",
      higherEducation: EDUCATION,
      priorEducation: PRIOR_EDUCATION,
      coursework: COURSEWORK,
    });
    expect(buildAwardsSection()).toEqual({ entries: AWARDS });
    expect(buildLeadershipSection()).toEqual({ entries: LEADERSHIP });
  });
});
