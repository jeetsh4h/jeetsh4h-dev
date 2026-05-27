import { afterEach, describe, expect, it, vi } from "vitest";

import { GET } from "../route";

const SPOTIFY_ENV_KEYS = [
  "SPOTIFY_CLIENT_ID",
  "SPOTIFY_CLIENT_SECRET",
  "SPOTIFY_REFRESH_TOKEN",
] as const;

const originalEnv = Object.fromEntries(
  SPOTIFY_ENV_KEYS.map((key) => [key, process.env[key]]),
);

function setSpotifyEnv() {
  process.env.SPOTIFY_CLIENT_ID = "client-id";
  process.env.SPOTIFY_CLIENT_SECRET = "client-secret";
  process.env.SPOTIFY_REFRESH_TOKEN = "refresh-token";
}

function clearSpotifyEnv() {
  for (const key of SPOTIFY_ENV_KEYS) {
    delete process.env[key];
  }
}

function restoreSpotifyEnv() {
  for (const key of SPOTIFY_ENV_KEYS) {
    const value = originalEnv[key];
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

function jsonResponse(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

const spotifyTrack = {
  name: "Keep Falling in Love",
  artists: [{ name: "Sports" }],
  duration_ms: 191365,
  album: {
    images: [{ url: "https://i.scdn.co/image/test" }],
  },
  external_urls: {
    spotify: "https://open.spotify.com/track/test",
  },
};

describe("spotify route", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    restoreSpotifyEnv();
  });

  it("returns a stable fallback when Spotify env vars are missing", async () => {
    clearSpotifyEnv();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      isPlaying: false,
      title: "Not playing",
      artist: "",
      url: "",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns a stable fallback when token retrieval fails", async () => {
    setSpotifyEnv();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse({}, { status: 401 })),
    );

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      isPlaying: false,
      title: "Not playing",
      artist: "",
      url: "",
    });
  });

  it("falls back from a 204 currently-playing response to recent plays", async () => {
    setSpotifyEnv();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ access_token: "access-token" }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }))
      .mockResolvedValueOnce(
        jsonResponse({
          items: [
            {
              track: spotifyTrack,
              played_at: "2026-05-27T12:47:44.706Z",
            },
          ],
        }),
      );
    vi.stubGlobal("fetch", fetchMock);

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      isPlaying: false,
      title: "Keep Falling in Love",
      artist: "Sports",
      url: "https://open.spotify.com/track/test",
      playedAt: "2026-05-27T12:47:44.706Z",
    });
  });

  it("returns not playing when recent plays are empty", async () => {
    setSpotifyEnv();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ access_token: "access-token" }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }))
      .mockResolvedValueOnce(jsonResponse({ items: [] }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      isPlaying: false,
      title: "Not playing",
      artist: "",
      url: "",
    });
  });
});
