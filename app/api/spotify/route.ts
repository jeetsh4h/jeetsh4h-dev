import { NextResponse } from "next/server";

// Vercel specific confiuration
export const runtime = "edge";
export const revalidate = 15; // seconds

interface SpotifyArtist {
  name: string;
}

interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  external_urls: {
    spotify: string;
  };
}

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface SpotifyNowPlayingResponse {
  is_playing: boolean;
  item: SpotifyTrack | null;
}

interface SpotifyRecentlyPlayedResponse {
  items: {
    track: SpotifyTrack;
  }[];
}

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

      if (song.item) {
        return NextResponse.json({
          isPlaying: song.is_playing,
          title: song.item.name,
          artist: song.item.artists.map((a) => a.name).join(", "),
          url: song.item.external_urls.spotify,
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
        return NextResponse.json({
          isPlaying: false,
          title: lastSong.name,
          artist: lastSong.artists.map((a) => a.name).join(", "),
          url: lastSong.external_urls.spotify,
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
