import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useTerminal } from "../hooks/use-terminal";
import type { TerminalDimensions } from "../types";

const dimensions: TerminalDimensions = {
  cols: 80,
  rows: 24,
  width: 800,
  height: 600,
};

function createKeyboardEvent(
  key: string,
  selectionStart = 0,
  ctrlKey = false,
): React.KeyboardEvent<HTMLInputElement> {
  return {
    key,
    ctrlKey,
    preventDefault: () => {},
    currentTarget: {
      selectionStart,
    },
  } as React.KeyboardEvent<HTMLInputElement>;
}

describe("useTerminal", () => {
  it("boots initial help and autorun through the same execution path", () => {
    const { result } = renderHook(() =>
      useTerminal(dimensions, "help", "about"),
    );

    expect(result.current.history).toHaveLength(2);
    expect(result.current.history[0]).toMatchObject({
      type: "command",
      content: "about",
      status: "success",
    });
    expect(result.current.history[1]?.type).toBe("output");
  });

  it("appends command and output entries for valid commands", () => {
    const { result } = renderHook(() => useTerminal(dimensions));

    act(() => {
      result.current.execute("about");
    });

    expect(result.current.history).toHaveLength(2);
    expect(result.current.history[0]).toMatchObject({
      type: "command",
      content: "about",
      status: "success",
    });
    expect(result.current.history[1]?.type).toBe("output");
  });

  it("appends command and error entries for invalid commands", () => {
    const { result } = renderHook(() => useTerminal(dimensions));

    act(() => {
      result.current.execute("unknown");
    });

    expect(result.current.history).toHaveLength(2);
    expect(result.current.history[0]).toMatchObject({
      type: "command",
      content: "unknown",
      status: "error",
    });
    expect(result.current.history[1]).toMatchObject({
      type: "error",
      content: 'Command not found: "unknown"',
      status: "error",
    });
  });

  it("clears history through an explicit clear result", () => {
    const { result } = renderHook(() => useTerminal(dimensions));

    act(() => {
      result.current.execute("about");
      result.current.execute("clear");
    });

    expect(result.current.history).toEqual([]);
  });

  it("navigates command history with arrow keys", () => {
    const { result } = renderHook(() => useTerminal(dimensions));

    act(() => {
      result.current.execute("about");
      result.current.execute("skills");
    });

    act(() => {
      result.current.handleKeyDown(createKeyboardEvent("ArrowUp"));
    });
    expect(result.current.input).toBe("skills");

    act(() => {
      result.current.handleKeyDown(createKeyboardEvent("ArrowUp"));
    });
    expect(result.current.input).toBe("about");

    act(() => {
      result.current.handleKeyDown(createKeyboardEvent("ArrowDown"));
    });
    expect(result.current.input).toBe("skills");
  });

  it("computes autocomplete suggestions for partial commands", () => {
    const { result } = renderHook(() => useTerminal(dimensions));

    act(() => {
      result.current.setInput("he");
    });

    expect(result.current.suggestion).toBe("lp");

    act(() => {
      result.current.handleKeyDown(createKeyboardEvent("ArrowRight", 2));
    });

    expect(result.current.input).toBe("help");
  });

  it("clears output with Ctrl+L", () => {
    const { result } = renderHook(() => useTerminal(dimensions));

    act(() => {
      result.current.execute("about");
      result.current.handleKeyDown(createKeyboardEvent("l", 0, true));
    });

    expect(result.current.history).toEqual([]);
  });
});
