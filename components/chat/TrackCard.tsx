import Image from "next/image";
import { RecommendedTrack } from "@/types/recommendations";

interface TrackCardProps {
  track: RecommendedTrack;
}

export default function TrackCard({ track }: TrackCardProps) {
  const albumArt = track.album?.images?.[0]?.url;
  const artistNames = track.artists.map((a) => a.name).join(", ");
  const spotifyUrl = `https://open.spotify.com/track/${track.id}`;

  return (
    <a
      href={spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl bg-gray-800 p-3 transition-colors hover:bg-gray-700"
    >
      {albumArt ? (
        <Image
          src={albumArt}
          alt={track.album?.name ?? track.name}
          width={48}
          height={48}
          className="rounded-md object-cover flex-shrink-0"
        />
      ) : (
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#1DB954"
            className="h-6 w-6"
          >
            <path d="M9 3v10.55A4 4 0 1 0 11 17V7h4V3H9z" />
          </svg>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-white text-sm">{track.name}</p>
        <p className="truncate text-xs text-gray-400">{artistNames}</p>
        {track.album?.name && (
          <p className="truncate text-xs text-gray-500">{track.album.name}</p>
        )}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#1DB954"
        className="h-5 w-5 flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 0 1-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 0 1 .207.857zm1.223-2.722a.779.779 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.779.779 0 0 1-.968-.519.78.78 0 0 1 .519-.968c3.632-1.102 8.147-.568 11.228 1.324a.78.78 0 0 1 .258 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.935.935 0 1 1-.543-1.79c3.532-1.072 9.404-.865 13.115 1.338a.936.936 0 0 1-.955 1.609z" />
      </svg>
    </a>
  );
}