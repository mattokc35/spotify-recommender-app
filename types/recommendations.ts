export type MessageRole = "user" | "assistant" | "error";

export interface Track {
  name: string;
  artist: string;
  albumName: string;
  albumImageUrl: string;
  spotifyUrl: string;
  previewUrl?: string | null;
  durationMs?: number;
}

export interface Artist {
  name: string;
  imageUrl: string;
  spotifyUrl: string;
  genres: string[];
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  loading?: boolean;
  tracks?: Track[];
  artists?: Artist[];
}