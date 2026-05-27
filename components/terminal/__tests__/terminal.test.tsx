import React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const searchParamsState = {
  cmd: null as string | null,
};

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => (key === "cmd" ? searchParamsState.cmd : null),
  }),
}));

vi.mock("next/dynamic", () => ({
  default: () => () => <div data-testid="walking-cat" />,
}));

vi.mock("../hooks/use-dimension", () => ({
  useTerminalDimensions: () => ({
    cols: 80,
    rows: 24,
    width: 800,
    height: 600,
  }),
}));

vi.mock("../spotify-prompt-segment", () => ({
  SpotifyPromptSegment: () => <div data-testid="spotify-segment" />,
}));

vi.mock("@/components/ui/terminal-crt-overlay", () => ({
  default: () => null,
}));

import { Terminal } from "../terminal";

describe("Terminal", () => {
  beforeEach(() => {
    searchParamsState.cmd = null;
  });

  it("renders initial help output", () => {
    render(<Terminal />);

    expect(screen.getByText("Available Commands:")).toBeInTheDocument();
    expect(screen.getByText("now")).toBeInTheDocument();
    expect(screen.getByText("proof")).toBeInTheDocument();
    expect(screen.queryByText("whoami")).not.toBeInTheDocument();
  });

  it("executes external commands when the prop changes", () => {
    const { rerender } = render(<Terminal />);

    expect(screen.getAllByText("Available Commands:")).toHaveLength(1);

    rerender(<Terminal externalCommand="help" />);

    expect(screen.getAllByText("Available Commands:")).toHaveLength(2);
  });

  it("preserves autorun behavior from the cmd query parameter", () => {
    searchParamsState.cmd = "about";

    render(<Terminal />);

    expect(screen.getByText(/My name is/i)).toBeInTheDocument();
  });
});
