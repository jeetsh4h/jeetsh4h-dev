import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomepageAbout from "../about";
import HomepageEducation from "../education";
import HomepageSocials from "../socials";
import TerminalAbout from "../terminal/about";
import TerminalEducation from "../terminal/education";
import TerminalSocials from "../terminal/socials";

describe("shared content sections", () => {
  it("renders the same intro facts on homepage and terminal", () => {
    render(
      <>
        <HomepageAbout />
        <TerminalAbout />
      </>,
    );

    expect(screen.getAllByText(/Jeet Shah/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Full-Stack Engineer & AI Researcher/i).length,
    ).toBeGreaterThan(0);
  });

  it("renders shared social links on homepage and terminal", () => {
    const { container } = render(
      <>
        <HomepageSocials />
        <TerminalSocials />
      </>,
    );

    expect(container.textContent).toContain("GitHub");
    expect(container.textContent).toContain("LinkedIn");
    expect(container.textContent).toContain("Email");
  });

  it("renders prior education on both surfaces", () => {
    render(
      <>
        <HomepageEducation />
        <TerminalEducation />
      </>,
    );

    expect(screen.getAllByText(/Prior Education/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/PACE Jr\. Sci\. College/i).length).toBeGreaterThan(
      0,
    );
  });
});
