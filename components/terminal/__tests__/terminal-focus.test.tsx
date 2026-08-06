import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("next/dynamic", () => ({
  default: () => () => null,
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
  SpotifyPromptSegment: () => null,
}));

vi.mock("@/components/ui/terminal-crt-overlay", () => ({
  default: () => null,
}));

import { Terminal } from "../terminal";

describe("Terminal focus", () => {
  it("keeps the command input focused after rendering overflowing output", async () => {
    const { container } = render(<Terminal initialCommand="help" />);
    const input = screen.getByRole("textbox", {
      name: "Terminal command input",
    });
    const viewport = container.querySelector<HTMLElement>(
      '[data-slot="scroll-area-viewport"]',
    );

    expect(viewport).not.toBeNull();
    Object.defineProperties(viewport, {
      clientHeight: { configurable: true, value: 100 },
      scrollHeight: { configurable: true, value: 1_000 },
    });
    const scrollTo = vi.mocked(viewport!.scrollTo);
    scrollTo.mockClear();

    await waitFor(() => expect(input).toHaveFocus());

    fireEvent.change(input, { target: { value: "about" } });
    await waitFor(() =>
      expect(scrollTo).toHaveBeenCalledWith({
        top: 1_000,
        behavior: "auto",
      }),
    );
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => expect(screen.getAllByText("about")).toHaveLength(2));
    expect(input).toHaveFocus();
  });
});
