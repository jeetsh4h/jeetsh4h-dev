import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomepageAbout from "../about";
import HomepageEducation from "../education";
import HomepageExperience from "../experience";
import HomepageProjects from "../projects";
import HomepageResearch from "../research";
import HomepageSkills from "../skills";
import HomepageSocials from "../socials";
import TerminalAbout from "../terminal/about";
import TerminalEducation from "../terminal/education";
import TerminalProjects from "../terminal/projects";
import TerminalSocials from "../terminal/socials";
import { ABOUT } from "@/lib/content/about";
import { EDUCATION, PRIOR_EDUCATION } from "@/lib/content/education";
import { PROJECTS } from "@/lib/content/projects";
import { SOCIALS } from "@/lib/content/socials";

describe("shared content sections", () => {
  it("renders the same intro facts on homepage and terminal", () => {
    render(
      <>
        <HomepageAbout />
        <TerminalAbout />
      </>,
    );

    expect(screen.getAllByText(ABOUT.name).length).toBeGreaterThan(0);
    expect(screen.getAllByText(ABOUT.role).length).toBeGreaterThan(0);
    expect(screen.getAllByText(ABOUT.location).length).toBeGreaterThan(0);
  });

  it("renders shared social links on homepage and terminal", () => {
    const { container } = render(
      <>
        <HomepageSocials />
        <TerminalSocials />
      </>,
    );

    for (const link of SOCIALS) {
      expect(container.textContent).toContain(link.label);
    }
  });

  it("renders education entries according to the shared content model", () => {
    render(
      <>
        <HomepageEducation />
        <TerminalEducation />
      </>,
    );

    for (const entry of EDUCATION) {
      expect(screen.getAllByText(entry.institution).length).toBeGreaterThan(0);
    }

    if (PRIOR_EDUCATION.length > 0) {
      expect(screen.getAllByText(/Prior Education/i).length).toBeGreaterThan(0);
    } else {
      expect(screen.queryByText(/Prior Education/i)).not.toBeInTheDocument();
    }
  });

  it("renders real visible headings for homepage command sections", () => {
    render(
      <>
        <HomepageExperience />
        <HomepageResearch />
        <HomepageSkills />
        <HomepageProjects />
        <HomepageEducation />
      </>,
    );

    expect(
      screen.getByRole("heading", { name: /experience/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /research/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /skills/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /projects/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /education/i }),
    ).toBeInTheDocument();
  });

  it("only makes project cards clickable when a public link exists", () => {
    render(<TerminalProjects />);

    for (const project of PROJECTS) {
      const cardLink = screen.getByText(project.title).closest("a");
      if (project.link) {
        expect(cardLink?.getAttribute("href")).toBe(project.link);
      } else {
        expect(cardLink).toBeNull();
      }
    }
  });
});
