import Image from "next/image";
import { Artist } from "@/types/recommendations";

interface ArtistCardProps {
  artist: Artist;
  index: number;
}

export default function ArtistCard({ artist, index }: ArtistCardProps) {
  return (
    <a
      href={artist.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl bg-gray-900 px-3 py-2.5 transition-all hover:bg-gray-700 hover:scale-[1.01] hover:shadow-lg hover:shadow-green-900/20 group"
      aria-label={`Open ${artist.name} on Spotify`}
    >
      {/* Artist number */}
      <span className="w-5 flex-shrink-0 text-right text-xs text-gray-500 group-hover:hidden">
        {index + 1}
      </span>
      {/* Play icon shown on hover */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="hidden h-4 w-4 flex-shrink-0 text-green-400 group-hover:block"
        aria-hidden="true"
      >
        <path d="M8 5v14l11-7z" />
      </svg>

      {/* Artist image */}
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
        {artist.imageUrl ? (
          <Image
            src={artist.imageUrl}
            alt={`${artist.name} profile`}
            fill
            sizes="48px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-gray-500"
              aria-hidden="true"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
        )}
      </div>

      {/* Artist info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{artist.name}</p>
        {artist.genres && artist.genres.length > 0 && (
          <p className="truncate text-xs text-gray-400">
            {artist.genres.slice(0, 2).join(", ")}
          </p>
        )}
      </div>

      {/* Spotify icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 flex-shrink-0 text-gray-600 group-hover:text-green-400 transition-colors"
        aria-hidden="true"
      >
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 1 1-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 0 1 .207.857zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.973-.519.781.781 0 0 1 .52-.974c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 0 1 .257 1.073zm.105-2.835c-3.223-1.914-8.54-2.09-11.618-1.156a.935.935 0 1 1-.543-1.79c3.532-1.073 9.404-.866 13.115 1.337a.936.936 0 0 1-1.155 1.476z" />
      </svg>
    </a>
  );
}
