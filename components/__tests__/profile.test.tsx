import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../theme-toggle", () => ({
  default: () => <div data-testid="theme-toggle" />,
}));

import Profile from "../profile";

describe("Profile", () => {
  it("routes all PDF CTAs to the in-site PDF viewer", () => {
    const { container } = render(<Profile />);

    const pdfLinks = container.querySelectorAll('a[href="/pdf"]');
    expect(pdfLinks.length).toBe(2);
    for (const link of pdfLinks) {
      expect(link).toHaveAttribute("href", "/pdf");
    }
    expect(container.querySelector('a[href="/cv.pdf"]')).not.toBeInTheDocument();
  });
});
