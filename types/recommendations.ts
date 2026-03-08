export interface RecommendedTrack {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album?: {
    id: string;
    name: string;
    images?: { url: string; width: number; height: number }[];
  };
  score: number;
  reasons: string[];
}

export interface RecommendationResponse {
  profile: {
    generatedAt: string;
    audioCentroid: number[];
    topGenres: [string, number][];
  };
  recommendations: RecommendedTrack[];
}

export type MessageRole = "user" | "assistant" | "error";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  tracks?: RecommendedTrack[];
  loading?: boolean;
}