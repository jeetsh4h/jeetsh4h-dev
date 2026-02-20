import { type ReactNode } from "react";

// CHECK: not tested properly
export type TerminalDimensions = {
  cols: number; // Width in characters
  rows: number; // Height in lines
  width: number; // Width in pixels
  height: number; // Height in pixels
};

type CommandContext = {
  args: string[];
  dimensions: TerminalDimensions;
  pushToHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
};

type CommandResult = {
  result: ReactNode | void;
  status: "success" | "error";
};
export type CommandAction = (context: CommandContext) => CommandResult;

export type CommandDef = {
  description: string;
  usage?: string;
  aliases?: string[];
  action: CommandAction;
};

type BaseHistoryItem = {
  id: string;
  content: ReactNode;
  timestamp: number;
};

export type CommandHistoryItem = BaseHistoryItem & {
  type: "command";
  commandName: string;
  status: "success" | "error";
};

export type OutputHistoryItem = BaseHistoryItem & {
  type: "output";
  status: "success" | "error";
};

export type ErrorHistoryItem = BaseHistoryItem & {
  type: "error";
  status: "error";
};

export type HistoryItem =
  | CommandHistoryItem
  | OutputHistoryItem
  | ErrorHistoryItem;

/**
 * SPOTIFY types
 */

export type SpotifyResponse = {
  isPlaying: boolean;
  title: string;
  artist: string;
  url: string;
  albumImageUrl?: string;
  playedAt?: string;
  progressMs?: number;
  durationMs?: number;
};

export interface SpotifyArtist {
  name: string;
}

export interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  duration_ms: number;
  album: {
    images: { url: string }[];
  };
  external_urls: { spotify: string };
}

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface SpotifyNowPlayingResponse {
  is_playing: boolean;
  progress_ms: number;
  item: SpotifyTrack | null;
}

export interface SpotifyRecentlyPlayedResponse {
  items: {
    track: SpotifyTrack;
    played_at: string;
  }[];
}
