"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTerminalDimensions } from "./hooks/use-dimension";

export default function CatArt() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useTerminalDimensions(containerRef);
  const [catArt, setCatArt] = useState<string>("");

  useEffect(() => {
    fetch("/cat.txt")
      .then((res) => res.text())
      .then((text) => {
        const cats = text
          .split("~~~~~~~~~~~~~~~~~~~~~~")
          .filter((cat) => cat.length > 0);

        if (cats.length > 0) {
          const randomCat = cats[Math.floor(Math.random() * cats.length)];
          setCatArt(randomCat);
        } else {
          throw new Error("No cats found in file");
        }
      })
      .catch((err) => {
        console.error("Failed to load cat art:", err);
        setCatArt("  /\\_/\\\n ( x.x )\n  > ^ <");
      });
  }, []);

  if (!catArt) return null;

  const lines = catArt.split("\n");
  const maxLineCols = Math.max(...lines.map((line) => line.length));

  const scale =
    dimensions.cols > 0 && maxLineCols > dimensions.cols ?
      dimensions.cols / maxLineCols
    : 1;

  return (
    <div
      ref={containerRef}
      className="w-full py-2 flex items-center justify-center overflow-hidden"
    >
      <pre
        className="text-foreground font-mono text-sm leading-tight m-0 p-0 origin-center transition-transform"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        {catArt}
      </pre>
    </div>
  );
}
