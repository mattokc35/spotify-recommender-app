"use client";

import { useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api";
import { ChatMessage as ChatMessageType, Track } from "@/types/recommendations";
import ChatMessage from "./ChatMessage";

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

const SUGGESTIONS = [
  "Show me my top artists this month",
  "Show me my top songs this month",
  "What can you help me with?",
];

export default function RecommendationChat() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! I'm your AI assistant. Ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load chat history on mount
  useEffect(() => {
    apiFetch("/chat/history")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.messages) && data.messages.length > 0) {
          const history: ChatMessageType[] = data.messages.map(
            (m: { role: string; content: string }) => ({
              id: generateId(),
              role: (m.role === "user" || m.role === "error"
                ? m.role
                : "assistant") as ChatMessageType["role"],
              text: m.content,
            })
          );
          setMessages(history);
        }
      })
      .catch(() => {
        // ignore history load errors; keep welcome message
      });
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      id: generateId(),
      role: "user",
      text: text.trim(),
    };

    const loadingMessage: ChatMessageType = {
      id: generateId(),
      role: "assistant",
      text: "",
      loading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await apiFetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Unknown error" }));
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingMessage.id
              ? {
                  ...m,
                  loading: false,
                  role: "error" as const,
                  text: `Something went wrong: ${err.error ?? res.statusText}`,
                }
              : m
          )
        );
        return;
      }

      const data: { reply: string; tracks?: Track[] } = await res.json();

      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMessage.id
            ? {
                ...m,
                loading: false,
                role: "assistant" as const,
                text: data.reply,
                tracks: data.tracks,
              }
            : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMessage.id
            ? {
                ...m,
                loading: false,
                role: "error" as const,
                text: "Could not reach the server. Make sure the backend is running.",
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex h-full w-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips — only show when just the welcome message */}
        <div className="flex flex-wrap gap-2 px-4 pb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              disabled={isLoading}
              className="rounded-full border border-gray-700 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-green-500 hover:text-green-400 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>

      {/* Input bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-gray-800 px-4 py-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          disabled={true}
          className="flex-1 rounded-full bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-black transition-colors hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Send"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405z" />
          </svg>
        </button>
      </form>
    </div>
  );
}