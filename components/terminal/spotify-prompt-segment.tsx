"use client";

import { useEffect } from "react";
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

  const { data, isLoading, isValidating } = useSWR<SpotifyResponse>(
    `/api/spotify`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    mutate(`/api/spotify`);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [refreshTrigger]);

  if (isLoading || !data || isValidating) {
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

  const bracketColor =
    data.isPlaying ? "text-term-success" : "text-term-warning";

  return (
    <div className="flex items-center text-xs font-bold select-none">
      <span className={bracketColor}>[</span>

      <div className="flex items-center text-term-success">
        <IconBrandSpotify
          size={13}
          className="-ml-px mr-0.5"
        />
        <Link
          href={data.url}
          target="_blank"
          rel="noreferrer"
          className="truncate max-w-75 hover:underline cursor-pointer"
        >
          <span>
            {data.title} ~ {data.artist}
          </span>
        </Link>
      </div>

      <span className={bracketColor}>]</span>
    </div>
  );
}
