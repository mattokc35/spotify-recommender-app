import { ChatMessage as ChatMessageType } from "@/types/recommendations";
import TrackList from "./TrackList";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isError = message.role === "error";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      {/* Assistant avatar */}
      {!isUser && (
        <div className="mr-3 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z" />
          </svg>
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "rounded-tr-sm bg-green-600 text-white"
            : isError
            ? "rounded-tl-sm bg-red-900/50 text-red-300"
            : "rounded-tl-sm bg-gray-800 text-gray-100"
        }`}
      >
        {/* Loading animation */}
        {message.loading ? (
          <div className="flex items-center gap-1 py-1">
            <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
            <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
            <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" />
          </div>
        ) : (
          <>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
            {message.tracks && message.tracks.length > 0 && (
              <TrackList tracks={message.tracks} />
            )}
          </>
        )}
      </div>
    </div>
  );
}