import Image from "next/image";
import { Track } from "@/types/recommendations";

interface TrackCardProps {
  track: Track;
  index: number;
}

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function TrackCard({ track, index }: TrackCardProps) {
  return (
    <a
      href={track.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl bg-gray-900 px-3 py-2.5 transition-all hover:bg-gray-700 hover:scale-[1.01] hover:shadow-lg hover:shadow-green-900/20 group"
      aria-label={`Open ${track.name} by ${track.artist} on Spotify`}
    >
      {/* Track number */}
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

      {/* Album art */}
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
        {track.albumImageUrl ? (
          <Image
            src={track.albumImageUrl}
            alt={`${track.albumName} album art`}
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
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14.5a4.5 4.5 0 1 1 4.5-4.5 4.505 4.505 0 0 1-4.5 4.5zm0-5.5a1 1 0 1 0 1 1 1 1 0 0 0-1-1z" />
            </svg>
          </div>
        )}
      </div>

      {/* Track info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{track.name}</p>
        <p className="truncate text-xs text-gray-400">{track.artist}</p>
        <p className="truncate text-xs text-gray-500">{track.albumName}</p>
      </div>

      {/* Duration + Spotify icon */}
      <div className="flex flex-shrink-0 flex-col items-end gap-1">
        {track.durationMs != null && (
          <span className="text-xs text-gray-500">
            {formatDuration(track.durationMs)}
          </span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-gray-600 group-hover:text-green-400 transition-colors"
          aria-hidden="true"
        >
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 1 1-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 0 1 .207.857zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.973-.519.781.781 0 0 1 .52-.974c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 0 1 .257 1.073zm.105-2.835c-3.223-1.914-8.54-2.09-11.618-1.156a.935.935 0 1 1-.543-1.79c3.532-1.073 9.404-.866 13.115 1.337a.936.936 0 0 1-1.155 1.476z" />
        </svg>
      </div>
    </a>
  );
}
