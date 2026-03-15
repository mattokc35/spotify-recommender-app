import { Artist } from "@/types/recommendations";
import ArtistCard from "./ArtistCard";

interface ArtistListProps {
  artists: Artist[];
}

export default function ArtistList({ artists }: ArtistListProps) {
  if (artists.length === 0) return null;

  return (
    <div className="mt-3 w-full max-w-sm">
      <p className="mb-2 text-xs font-medium text-gray-400">🎤 Artists</p>
      <div className="flex flex-col gap-1">
        {artists.map((artist, i) => (
          <ArtistCard key={artist.spotifyUrl} artist={artist} index={i} />
        ))}
      </div>
    </div>
  );
}
