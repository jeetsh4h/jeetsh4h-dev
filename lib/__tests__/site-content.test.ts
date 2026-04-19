import { describe, expect, it } from "vitest";

import {
  buildEducationSection,
  buildExperienceSection,
  buildIntroSection,
  buildProjectsSection,
  buildResearchSection,
  buildSkillsSection,
  buildSocialsSection,
} from "../site-content";

describe("site-content", () => {
  it("builds an intro section with profile and social facts", () => {
    const intro = buildIntroSection();
    const socials = buildSocialsSection();

    expect(intro).toMatchObject({
      id: "intro",
      name: "Jeet Shah",
      role: "Full-Stack Engineer & AI Researcher",
    });
    expect(intro.bio.length).toBeGreaterThan(0);
    expect(intro.socialLinks).toEqual(socials.links);
  });

  it("splits experience into featured and compact entries once", () => {
    const experience = buildExperienceSection();

    expect(experience.id).toBe("experience");
    expect(experience.featuredEntries.length).toBeGreaterThan(0);
    expect(experience.compactEntries.length).toBeGreaterThan(0);
    expect(experience.featuredEntries.every((entry) => !entry.compact)).toBe(
      true,
    );
    expect(experience.compactEntries.every((entry) => entry.compact)).toBe(
      true,
    );
  });

  it("builds an education section with higher and prior education", () => {
    const education = buildEducationSection();

    expect(education.id).toBe("education");
    expect(education.higherEducation.length).toBeGreaterThan(0);
    expect(education.priorEducation.length).toBeGreaterThan(0);
  });

  it("builds skills as structured arrays instead of comma-separated strings", () => {
    const skills = buildSkillsSection();

    expect(skills.id).toBe("skills");
    expect(skills.categories.length).toBeGreaterThan(0);
    expect(Array.isArray(skills.categories[0]?.items)).toBe(true);
    expect(skills.categories[0]?.items[0]).toBeTypeOf("string");
  });

  it("preserves project, research, and social ordering", () => {
    const projects = buildProjectsSection();
    const research = buildResearchSection();
    const socials = buildSocialsSection();

    expect(projects.entries[0]?.title).toBe("Jyeshthanubandh");
    expect(research.entries[0]?.year).toBe("2025");
    expect(socials.links.map((link) => link.label)).toEqual([
      "GitHub",
      "LinkedIn",
      "Email",
    ]);
  });
});
