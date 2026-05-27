import { NextResponse } from "next/server";
import type {
  SpotifyResponse,
  SpotifyTokenResponse,
  SpotifyNowPlayingResponse,
  SpotifyRecentlyPlayedResponse,
  SpotifyTrack,
} from "@/components/terminal/types";

export const runtime = "nodejs";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const SPOTIFY_BROWSER_CACHE_CONTROL = "public, max-age=0, must-revalidate";
const SPOTIFY_CDN_CACHE_CONTROL =
  "public, s-maxage=15, stale-while-revalidate=60, stale-if-error=300";
const DEFAULT_RATE_LIMIT_RETRY_AFTER_SECONDS = 60;
const NOT_PLAYING_RESPONSE: SpotifyResponse = {
  isPlaying: false,
  title: "Not playing",
  artist: "",
  url: "",
};

type SpotifyConfig = {
  basic: string;
  refreshToken: string;
};

type AccessTokenResult =
  | { status: "success"; accessToken: string }
  | { status: "rate-limited"; retryAfterSeconds: number | null }
  | { status: "error" };

function encodeBasicAuth(clientId: string, clientSecret: string) {
  const credentials = `${clientId}:${clientSecret}`;

  if (typeof btoa === "function") {
    return btoa(credentials);
  }

  return Buffer.from(credentials).toString("base64");
}

function getSpotifyConfig(): SpotifyConfig | null {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  return {
    basic: encodeBasicAuth(clientId, clientSecret),
    refreshToken,
  };
}

function getRetryAfterSeconds(response: Response) {
  const retryAfter = response.headers.get("Retry-After");

  if (!retryAfter) {
    return null;
  }

  const seconds = Number(retryAfter);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.ceil(seconds);
  }

  const retryAfterDate = Date.parse(retryAfter);
  if (!Number.isNaN(retryAfterDate)) {
    return Math.max(0, Math.ceil((retryAfterDate - Date.now()) / 1000));
  }

  return null;
}

function getRateLimitCacheControl(retryAfterSeconds: number | null) {
  const sMaxage = Math.max(
    1,
    retryAfterSeconds ?? DEFAULT_RATE_LIMIT_RETRY_AFTER_SECONDS,
  );

  return `public, s-maxage=${sMaxage}, stale-while-revalidate=300, stale-if-error=300`;
}

function spotifyJson(
  data: SpotifyResponse,
  init?: ResponseInit,
  cdnCacheControl = SPOTIFY_CDN_CACHE_CONTROL,
) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", SPOTIFY_BROWSER_CACHE_CONTROL);
  headers.set("CDN-Cache-Control", cdnCacheControl);
  headers.set("Vercel-CDN-Cache-Control", cdnCacheControl);

  return NextResponse.json(data, {
    ...init,
    headers,
  });
}

function spotifyTrackToResponse({
  track,
  isPlaying,
  progressMs,
  playedAt,
}: {
  track: SpotifyTrack;
  isPlaying: boolean;
  progressMs?: number;
  playedAt?: string;
}): SpotifyResponse {
  return {
    isPlaying,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    url: track.external_urls.spotify,
    albumImageUrl: track.album?.images?.[0]?.url || "",
    progressMs,
    playedAt,
    durationMs: track.duration_ms,
  };
}

const getAccessToken = async (
  config: SpotifyConfig,
): Promise<AccessTokenResult> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${config.basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: config.refreshToken,
    }),
    cache: "no-store",
  });

  if (response.status === 429) {
    return {
      status: "rate-limited",
      retryAfterSeconds: getRetryAfterSeconds(response),
    };
  }

  if (!response.ok) {
    return { status: "error" };
  }

  const token = (await response.json()) as Partial<SpotifyTokenResponse>;

  if (typeof token.access_token !== "string") {
    return { status: "error" };
  }

  return { status: "success", accessToken: token.access_token };
};

function spotifyRateLimitedJson(retryAfterSeconds: number | null) {
  const headers = new Headers();

  if (retryAfterSeconds !== null) {
    headers.set("Retry-After", String(retryAfterSeconds));
  }

  return spotifyJson(
    NOT_PLAYING_RESPONSE,
    { headers },
    getRateLimitCacheControl(retryAfterSeconds),
  );
}

export async function GET() {
  try {
    const config = getSpotifyConfig();

    if (!config) {
      return spotifyJson(NOT_PLAYING_RESPONSE);
    }

    const tokenResult = await getAccessToken(config);

    if (tokenResult.status === "rate-limited") {
      return spotifyRateLimitedJson(tokenResult.retryAfterSeconds);
    }

    if (tokenResult.status !== "success") {
      return spotifyJson(NOT_PLAYING_RESPONSE);
    }

    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${tokenResult.accessToken}` },
      cache: "no-store",
    });

    if (nowPlayingRes.status === 429) {
      return spotifyRateLimitedJson(getRetryAfterSeconds(nowPlayingRes));
    }

    if (nowPlayingRes.status === 200) {
      const song = (await nowPlayingRes.json()) as SpotifyNowPlayingResponse;

      if (song.item && song.item.name) {
        return spotifyJson(
          spotifyTrackToResponse({
            track: song.item,
            isPlaying: song.is_playing,
            progressMs: song.progress_ms,
          }),
        );
      }
    }

    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${tokenResult.accessToken}` },
      cache: "no-store",
    });

    if (recentRes.status === 429) {
      return spotifyRateLimitedJson(getRetryAfterSeconds(recentRes));
    }

    if (recentRes.status === 200) {
      const recentData =
        (await recentRes.json()) as SpotifyRecentlyPlayedResponse;

      if (recentData.items && recentData.items.length > 0) {
        const lastSong = recentData.items[0].track;
        const playedAt = recentData.items[0].played_at;
        return spotifyJson(
          spotifyTrackToResponse({
            track: lastSong,
            isPlaying: false,
            playedAt,
          }),
        );
      }
    }

    return spotifyJson(NOT_PLAYING_RESPONSE);
  } catch (error) {
    console.error("Spotify API error:", error);
    return spotifyJson(NOT_PLAYING_RESPONSE);
  }
}
