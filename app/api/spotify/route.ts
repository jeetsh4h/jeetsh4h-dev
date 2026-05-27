import { NextResponse } from "next/server";
import type {
  SpotifyResponse,
  SpotifyTokenResponse,
  SpotifyNowPlayingResponse,
  SpotifyRecentlyPlayedResponse,
  SpotifyTrack,
} from "@/components/terminal/types";

export const runtime = "edge";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const SPOTIFY_CACHE_CONTROL = "public, max-age=15, stale-while-revalidate=60";
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

function spotifyJson(data: SpotifyResponse, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", SPOTIFY_CACHE_CONTROL);

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
): Promise<string | null> => {
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

  if (!response.ok) {
    return null;
  }

  const token = (await response.json()) as Partial<SpotifyTokenResponse>;

  return typeof token.access_token === "string" ? token.access_token : null;
};

export async function GET() {
  try {
    const config = getSpotifyConfig();

    if (!config) {
      return spotifyJson(NOT_PLAYING_RESPONSE);
    }

    const accessToken = await getAccessToken(config);

    if (!accessToken) {
      return spotifyJson(NOT_PLAYING_RESPONSE);
    }

    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

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
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

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
