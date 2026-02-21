"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef, useCallback } from "react";

type CatState = {
  id: number;
  action: "walk" | "run";
  direction: "ltr" | "rtl";
};

export default function WalkingCat() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("cat-unlocked") === "true";
    }
    return false;
  });

  const [cat, setCat] = useState<CatState | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Background spawner: Randomly waits 3-10 seconds
  const scheduleNextWalk = useCallback(() => {
    const delay = Math.random() * 7000 + 3000;

    timeoutRef.current = setTimeout(() => {
      const id = Math.floor(Math.random() * 6) + 1;
      const direction = Math.random() > 0.5 ? "ltr" : "rtl";
      setCat({ id, action: "walk", direction });
    }, delay);
  }, []);

  useEffect(() => {
    const handleUnlock = () => {
      setIsUnlocked(true);
      sessionStorage.setItem("cat-unlocked", "true");

      // INSTANT SPAWN LOGIC:
      // When the command is run, check if a cat is ALREADY walking.
      // If not, spawn one instantly!
      setCat((currentCat) => {
        if (!currentCat) {
          const id = Math.floor(Math.random() * 6) + 1;
          const direction = Math.random() > 0.5 ? "ltr" : "rtl";
          return { id, action: "walk", direction };
        }
        return currentCat; // Do nothing if one is already walking
      });
    };

    window.addEventListener("cat-summoned", handleUnlock);
    return () => window.removeEventListener("cat-summoned", handleUnlock);
  }, []);

  useEffect(() => {
    if (isUnlocked && !cat) {
      scheduleNextWalk();
    }
    // Automatically clears the background timer if an instant spawn is triggered
    return () => clearTimeout(timeoutRef.current);
  }, [isUnlocked, cat, scheduleNextWalk]);

  useEffect(() => {
    if (!cat || !wrapperRef.current) return;

    if (cat.action === "walk") {
      const startX = cat.direction === "rtl" ? "100vw" : "-20vw";
      const endX = cat.direction === "rtl" ? "-20vw" : "100vw";

      animationRef.current = wrapperRef.current.animate(
        [
          { transform: `translateX(${startX})` },
          { transform: `translateX(${endX})` },
        ],
        {
          duration: 15000,
          iterations: 1,
          easing: "linear",
        },
      );

      animationRef.current.onfinish = () => {
        setCat(null);
      };
    } else if (cat.action === "run" && animationRef.current) {
      animationRef.current.playbackRate = 4.0;
    }
  }, [cat]);

  const handleInteraction = () => {
    if (cat?.action === "walk") {
      setCat({ ...cat, action: "run" });
    }
  };

  if (!isUnlocked || !cat) return null;

  return (
    <div className="absolute bottom-0 left-0 w-full z-100 pointer-events-none">
      <div
        ref={wrapperRef}
        className="absolute bottom-1 left-0 flex items-end"
      >
        <Image
          src={`/cats/cat-${cat.id}-${cat.action}.gif`}
          alt="pixel cat"
          width={100}
          height={100}
          unoptimized
          className={`h-16 md:h-20 w-auto translate-y-[40%] opacity-80  pointer-events-auto hover:opacity-100 transition-opacity cursor-grabbing ${
            cat.direction === "rtl" ? "-scale-x-100" : ""
          }`}
          style={{
            imageRendering: "pixelated",
          }}
          onClick={handleInteraction}
          onMouseEnter={handleInteraction}
        />
      </div>
    </div>
  );
}
