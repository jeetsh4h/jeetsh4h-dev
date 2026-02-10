"use client";

import { useState, useEffect, RefObject } from "react";
import { TerminalDimensions } from "./types";

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
        // TODO: make this not a magic number
        const lineHeight =
          parseFloat(styles.lineHeight) || parseFloat(styles.fontSize) * 1.5;

        // TODO: make this not a magic number.
        // We assume p-4 (1rem = 16px) on both sides -> 32px total padding
        const paddingX = 32;
        const paddingY = 32;

        const width = ref.current.clientWidth - paddingX;
        const height = ref.current.clientHeight - paddingY;

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
