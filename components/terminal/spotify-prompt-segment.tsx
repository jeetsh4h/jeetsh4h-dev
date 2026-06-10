"use client";

import { useEffect, useRef } from "react";
import useSWR, { useSWRConfig } from "swr";
import { IconBrandSpotify } from "@tabler/icons-react";
import Link from "next/link";
import { fetcher } from "@/lib/utils";
import type { SpotifyResponse } from "./types";

const SPOTIFY_DEDUPING_INTERVAL_MS = 15_000;

export function SpotifyPromptSegment({
  refreshTrigger,
}: {
  refreshTrigger: number;
}) {
  const { mutate } = useSWRConfig();
  const lastMutateRef = useRef<number>(0);

  const { data, error, isLoading, isValidating } = useSWR<SpotifyResponse>(
    `/api/spotify`,
    fetcher,
    {
      dedupingInterval: SPOTIFY_DEDUPING_INTERVAL_MS,
      errorRetryCount: 0,
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    const now = Date.now();
    if (now - lastMutateRef.current >= SPOTIFY_DEDUPING_INTERVAL_MS) {
      lastMutateRef.current = now;
      mutate(`/api/spotify`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [refreshTrigger]);

  if ((isLoading || isValidating) && !data && !error) {
    return (
      <div className="flex items-center text-xs font-bold select-none">
        <span className="text-muted-foreground/70">[</span>
        <div className="flex items-center text-success opacity-70">
          <IconBrandSpotify
            size={13}
            className="-ml-px mr-0.5 animate-spin"
          />
          <span className="animate-pulse tracking-widest">
            —————————— ~ ——————————
          </span>
        </div>
        <span className="text-muted-foreground/70">]</span>
      </div>
    );
  }

  const fallbackData: SpotifyResponse = {
    isPlaying: false,
    title: "Not playing",
    artist: "",
    url: "",
  };
  const spotifyData = data ?? fallbackData;
  const bracketColor =
    spotifyData.isPlaying ? "text-success" : "text-warning";

  return (
    <div className="flex items-center text-xs font-bold select-none">
      <span className={bracketColor}>[</span>

      <div className="flex items-center text-success">
        <IconBrandSpotify
          size={13}
          className="-ml-px mr-0.5"
        />
        {spotifyData.url ?
          <Link
            href={spotifyData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate max-w-75 hover:underline cursor-pointer"
          >
            <span>
              {spotifyData.title} ~ {spotifyData.artist}
            </span>
          </Link>
        : <span className="truncate max-w-75">
            {spotifyData.title}
            {spotifyData.artist ? ` ~ ${spotifyData.artist}` : ""}
          </span>
        }
      </div>

      <span className={bracketColor}>]</span>
    </div>
  );
}
