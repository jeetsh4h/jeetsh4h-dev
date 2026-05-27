"use client";

import { useState, useEffect, RefObject } from "react";
import type { TerminalDimensions } from "../types";

const FALLBACK_LINE_HEIGHT_RATIO = 1.5;
const TERMINAL_CONTENT_PADDING_PX = 32;

export function useTerminalDimensions(ref: RefObject<HTMLElement | null>) {
  const [dimensions, setDimensions] = useState<TerminalDimensions>({
    cols: 0,
    rows: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!ref.current) return;

    const measure = () => {
      if (!ref.current) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const styles = window.getComputedStyle(ref.current);

      if (ctx) {
        ctx.font = `${styles.fontSize} ${styles.fontFamily}`;
        const charWidth = ctx.measureText("0").width;
        const lineHeight =
          parseFloat(styles.lineHeight) ||
          parseFloat(styles.fontSize) * FALLBACK_LINE_HEIGHT_RATIO;

        const width = ref.current.clientWidth - TERMINAL_CONTENT_PADDING_PX;
        const height = ref.current.clientHeight - TERMINAL_CONTENT_PADDING_PX;

        setDimensions({
          width,
          height,
          cols: Math.floor(width / charWidth),
          rows: Math.floor(height / lineHeight),
        });
      }
    };

    const observer = new ResizeObserver(() => measure());
    observer.observe(ref.current);

    measure();

    return () => observer.disconnect();
  }, [ref]);

  return dimensions;
}
