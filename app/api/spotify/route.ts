import { NextResponse } from "next/server";
import type {
  SpotifyTokenResponse,
  SpotifyNowPlayingResponse,
  SpotifyRecentlyPlayedResponse,
} from "@/components/terminal/types";

/* Vercel specific confiuration */
export const runtime = "edge";

// CHECK: does this work for the edge runtime
export const revalidate = 15; // seconds

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;

const getAccessToken = async (): Promise<SpotifyTokenResponse> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${BASIC}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN!,
    }),
    cache: "no-store",
  });

  return response.json() as Promise<SpotifyTokenResponse>;
};

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    if (!access_token) {
      return NextResponse.json(
        { error: "Failed to retrieve access token" },
        { status: 500 },
      );
    }

    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    });

    if (nowPlayingRes.status === 200) {
      const song = (await nowPlayingRes.json()) as SpotifyNowPlayingResponse;

      if (song.item && song.item.name) {
        return NextResponse.json({
          isPlaying: song.is_playing,
          title: song.item.name,
          artist: song.item.artists.map((a) => a.name).join(", "),
          url: song.item.external_urls.spotify,
          albumImageUrl: song.item.album?.images?.[0]?.url || "",
          progressMs: song.progress_ms,
          durationMs: song.item.duration_ms,
        });
      }
    }

    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    });

    if (recentRes.status === 200) {
      const recentData =
        (await recentRes.json()) as SpotifyRecentlyPlayedResponse;

      if (recentData.items && recentData.items.length > 0) {
        const lastSong = recentData.items[0].track;
        const playedAt = recentData.items[0].played_at;
        return NextResponse.json({
          isPlaying: false,
          title: lastSong.name,
          artist: lastSong.artists.map((a) => a.name).join(", "),
          url: lastSong.external_urls.spotify,
          albumImageUrl: lastSong.album?.images?.[0]?.url || "",
          playedAt: playedAt,
          durationMs: lastSong.duration_ms,
        });
      }
    }

    return NextResponse.json({
      isPlaying: false,
      title: "Not playing",
      artist: "",
      url: "",
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json({ error: "Spotify API error" }, { status: 500 });
  }
}
