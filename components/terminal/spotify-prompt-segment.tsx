"use client";

import { useEffect, useRef } from "react";
import useSWR, { useSWRConfig } from "swr";
import { IconBrandSpotify } from "@tabler/icons-react";
import Link from "next/link";
import { fetcher } from "@/lib/utils";
import type { SpotifyResponse } from "./types";

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
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    // do not mutate more than once per second
    const now = Date.now();
    if (now - lastMutateRef.current >= 1000) {
      lastMutateRef.current = now;
      mutate(`/api/spotify`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [refreshTrigger]);

  if ((isLoading || isValidating) && !data && !error) {
    return (
      <div className="flex items-center text-xs font-bold select-none">
        <span className="text-muted-foreground/70">[</span>
        <div className="flex items-center text-term-success opacity-70">
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
    spotifyData.isPlaying ? "text-term-success" : "text-term-warning";

  return (
    <div className="flex items-center text-xs font-bold select-none">
      <span className={bracketColor}>[</span>

      <div className="flex items-center text-term-success">
        <IconBrandSpotify
          size={13}
          className="-ml-px mr-0.5"
        />
        {spotifyData.url ?
          <Link
            href={spotifyData.url}
            target="_blank"
            rel="noreferrer"
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
