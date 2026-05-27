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
import { EXPERIENCE } from "../content/experience";
import { PROJECTS } from "../content/projects";
import { RESEARCH } from "../content/research";
import { SEO } from "../content/seo";

function expectNonEmptyString(value: unknown) {
  expect(value).toBeTypeOf("string");
  expect((value as string).trim().length).toBeGreaterThan(0);
}

function expectValidHref(value: string) {
  expect(() => new URL(value)).not.toThrow();
}

describe("site-content", () => {
  it("builds an intro section with required profile fields", () => {
    const intro = buildIntroSection();
    const socials = buildSocialsSection();

    expect(intro.id).toBe("intro");
    expectNonEmptyString(intro.name);
    expectNonEmptyString(intro.role);
    expectNonEmptyString(intro.location);
    expectNonEmptyString(intro.bio);
    expect(intro.socialLinks).toEqual(socials.links);
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

  it("keeps experience entries structurally complete", () => {
    for (const entry of EXPERIENCE) {
      expectNonEmptyString(entry.company);
      expectNonEmptyString(entry.role);
      expectNonEmptyString(entry.period);
      expect(["work", "research", "internship", "contract"]).toContain(
        entry.type,
      );
      expect(entry.description.length).toBeGreaterThan(0);
      entry.description.forEach(expectNonEmptyString);
      entry.textLinks?.forEach((link) => {
        expectNonEmptyString(link.label);
        expectValidHref(link.href);
      });
    }
  });

  it("builds education sections with complete entries", () => {
    const education = buildEducationSection();
    const allEducationEntries = [
      ...education.higherEducation,
      ...education.priorEducation,
    ];

    expect(education.id).toBe("education");
    expect(education.higherEducation.length).toBeGreaterThan(0);
    for (const entry of allEducationEntries) {
      expectNonEmptyString(entry.institution);
      expectNonEmptyString(entry.degree);
      expectNonEmptyString(entry.period);
      expect(Array.isArray(entry.details)).toBe(true);
      entry.details.forEach(expectNonEmptyString);
    }
  });

  it("builds skills as structured arrays instead of comma-separated strings", () => {
    const skills = buildSkillsSection();

    expect(skills.id).toBe("skills");
    expect(skills.categories.length).toBeGreaterThan(0);
    for (const category of skills.categories) {
      expectNonEmptyString(category.name);
      expect(category.items.length).toBeGreaterThan(0);
      category.items.forEach(expectNonEmptyString);
    }
  });

  it("builds social links with valid labels and hrefs", () => {
    const socials = buildSocialsSection();

    expect(socials.id).toBe("socials");
    expect(socials.links.length).toBeGreaterThan(0);
    for (const link of socials.links) {
      expectNonEmptyString(link.label);
      expectValidHref(link.href);
    }
  });

  it("keeps project entries link-safe", () => {
    const projects = buildProjectsSection();

    expect(projects.id).toBe("projects");
    expect(projects.entries.length).toBeGreaterThan(0);
    for (const project of PROJECTS) {
      expectNonEmptyString(project.title);
      expectNonEmptyString(project.description);
      if (project.status) {
        expect(["public", "private", "pre-beta", "research"]).toContain(
          project.status,
        );
      }
      if (project.link) {
        expectValidHref(project.link);
      } else {
        expect(project.linkText).toBeUndefined();
      }
      project.stack?.forEach(expectNonEmptyString);
      project.highlights?.forEach(expectNonEmptyString);
      if (project.confidentialityNote) {
        expectNonEmptyString(project.confidentialityNote);
      }
    }
  });

  it("keeps research entries typed by publication or current interest", () => {
    const research = buildResearchSection();

    expect(research.id).toBe("research");
    expect(research.entries.length).toBeGreaterThan(0);
    for (const entry of RESEARCH) {
      expectNonEmptyString(entry.title);
      expectNonEmptyString(entry.summary);
      expect(["publication", "interest"]).toContain(entry.kind);
      if (entry.kind === "publication") {
        expect(entry.year).toMatch(/^\d{4}$/);
        expectNonEmptyString(entry.citationAuthors);
      } else {
        expect(entry.status).toBe("in-progress");
      }
      entry.links?.forEach((link) => {
        expectNonEmptyString(link.label);
        expectValidHref(link.href);
      });
    }
  });

  it("keeps SEO metadata concise and parseable", () => {
    expectNonEmptyString(SEO.title);
    expectNonEmptyString(SEO.description);
    expectValidHref(SEO.url);
    expect(SEO.description.length).toBeLessThanOrEqual(180);
    expect(SEO.keywords.length).toBeGreaterThan(0);
    SEO.keywords.forEach(expectNonEmptyString);

    const keywordSet = new Set(
      SEO.keywords.map((keyword) => keyword.toLowerCase()),
    );
    expect(keywordSet.size).toBe(SEO.keywords.length);
  });
});
