import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

if (!HTMLElement.prototype.scrollTo) {
  HTMLElement.prototype.scrollTo = vi.fn();
}

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string | { pathname?: string };
    [key: string]: unknown;
  }) =>
    React.createElement(
      "a",
      { href: typeof href === "string" ? href : href.pathname, ...props },
      children,
    ),
}));

vi.mock("next/image", () => ({
  default: () => null,
}));
