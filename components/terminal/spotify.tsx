"use client";

import { useEffect, useState } from "react";
import { IconBrandSpotify } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import type { SpotifyResponse } from "@/components/terminal/types";

function getFormattedTimeAgo(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMins = diffMs / (1000 * 60);

  if (diffMins < 60) return "<1h ago";
  const diffHours = diffMins / 60;
  if (diffHours < 24) return `${Math.floor(diffHours)}h ago`;

  const diffDays = diffHours / 24;
  if (diffDays < 7) return `${Math.floor(diffDays)}d ago`;

  const diffWeeks = diffDays / 7;
  if (diffWeeks <= 4) return `${Math.floor(diffWeeks)}wk ago`;

  return ">4wk ago";
}

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

type SpotifyFetchState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; data: SpotifyResponse };

export default function SpotifyCommand() {
  const [state, setState] = useState<SpotifyFetchState>({ status: "loading" });

  useEffect(() => {
    let isMounted = true;

    fetch("/api/spotify")
      .then((res) => res.json())
      .then((fetchedData) => {
        if (isMounted) setState({ status: "success", data: fetchedData });
      })
      .catch(() => {
        if (isMounted) setState({ status: "error" });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (state.status === "loading" || state.status === "error") {
    return <SpotifySkeleton />;
  }

  const { data } = state;

  const progressMs = data.progressMs ?? 0;
  const durationMs = data.durationMs ?? 1;
  const progressPercent = Math.min((progressMs / durationMs) * 100, 100);

  return (
    <div className="mt-2 flex max-w-sm flex-col gap-3 rounded-lg border border-border bg-card p-3 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
        <div className="flex items-center gap-2 text-term-success">
          <IconBrandSpotify size={16} />
          <span>
            {data.isPlaying ?
              "Now Playing"
            : data.playedAt ?
              "Recently Played"
            : "Paused"}
          </span>
        </div>
        {!data.isPlaying && data.playedAt && (
          <div className="text-[10px] normal-case text-muted-foreground font-mono">
            {getFormattedTimeAgo(data.playedAt)}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {data.albumImageUrl ?
          <Image
            src={data.albumImageUrl}
            alt="Album Art"
            width={64}
            height={64}
            className="rounded-md object-cover shadow-sm border border-border shrink-0"
          />
        : <div className="size-16 rounded-md bg-muted flex items-center justify-center border border-border shrink-0">
            <IconBrandSpotify
              size={24}
              className="text-muted-foreground opacity-70"
            />
          </div>
        }

        {/* Removed py-0.5 to allow true top/bottom alignment */}
        <div className="flex flex-1 min-w-0 flex-col h-16 @container">
          {/* Top-aligned when playing, vertically centered when paused */}
          <div
            className={
              data.isPlaying ?
                "flex flex-col min-h-0"
              : "flex flex-col justify-center h-full min-h-0"
            }
          >
            <Link
              href={data.url || "#"}
              target="_blank"
              rel="noreferrer"
              className="group relative flex overflow-hidden whitespace-nowrap text-sm font-semibold hover:underline leading-tight"
            >
              <span className="inline-block transition-transform duration-3000 ease-linear group-hover:-translate-x-[max(0px,calc(100%-100cqw))]">
                {data.title}
              </span>
            </Link>
            <div className="group relative flex overflow-hidden whitespace-nowrap text-xs text-muted-foreground mt-0.5 leading-tight">
              <span className="inline-block transition-transform duration-3000 ease-linear group-hover:-translate-x-[max(0px,calc(100%-100cqw))]">
                {data.artist}
              </span>
            </div>
          </div>

          {/* Locked strictly to the bottom */}
          {data.isPlaying && (
            <div className="flex flex-col gap-1.5 w-full mt-auto pb-0.5">
              <div className="h-1 w-full overflow-hidden rounded-full bg-muted/80">
                <div
                  className="h-full bg-term-success"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] leading-none text-muted-foreground font-mono">
                <span>{formatDuration(progressMs)}</span>
                <span>{formatDuration(durationMs)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SpotifySkeleton() {
  return (
    <div className="mt-2 flex max-w-sm flex-col gap-3 rounded-lg border border-border bg-card p-3 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
        <div className="flex items-center gap-2 text-term-success">
          <IconBrandSpotify size={16} />
          <span>Loading...</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="size-16 rounded-md bg-muted flex items-center justify-center border border-border shrink-0">
          <IconBrandSpotify
            size={24}
            className="text-muted-foreground opacity-70 animate-spin"
          />
        </div>

        <div className="flex flex-1 min-w-0 flex-col h-16 justify-center @container">
          <div className="h-4 w-3/4 rounded bg-muted animate-pulse mb-2"></div>
          <div className="h-3 w-1/2 rounded bg-muted animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
