import { Track } from "@/types/recommendations";
import TrackCard from "./TrackCard";

interface TrackListProps {
  tracks: Track[];
}

export default function TrackList({ tracks }: TrackListProps) {
  if (tracks.length === 0) return null;

  return (
    <div className="mt-3 w-full max-w-sm">
      <p className="mb-2 text-xs font-medium text-gray-400">🎵 Tracks</p>
      <div className="flex flex-col gap-1">
        {tracks.map((track, i) => (
          <TrackCard key={track.spotifyUrl} track={track} index={i} />
        ))}
      </div>
    </div>
  );
}
