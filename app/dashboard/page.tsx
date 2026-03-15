"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch, setToken, getToken, clearToken } from "@/lib/api";
import Image from "next/image";
import RecommendationChat from "@/components/chat/RecommendationChat";

interface SpotifyUser {
  displayName: string;
  email: string;
  profileImageUrl: string;
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Capture JWT from URL if present (OAuth redirect)
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      // Clean the URL — remove ?token= from the address bar
      window.history.replaceState({}, "", "/dashboard");
    }

    const token = tokenFromUrl || getToken();
    if (!token) {
      router.replace("/");
      setLoading(false);
      return;
    }

    apiFetch("/auth/me")
      .then(async (res) => {
        if (!res.ok) {
          clearToken();
          router.replace("/");
          return;
        }
        const data: SpotifyUser = await res.json();
        setUser(data);
      })
      .catch(() => {
        clearToken();
        router.replace("/");
      })
      .finally(() => setLoading(false));
  }, [router, searchParams]);

  const handleLogout = () => {
    clearToken();
    router.replace("/");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400">Loading…</p>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="flex h-screen flex-col bg-gray-950">
      {/* Top nav */}
      <header className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
        <div className="flex items-center gap-3">
          {user.profileImageUrl ? (
            <Image
              src={user.profileImageUrl}
              alt={user.displayName}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-black">
              {user.displayName?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-white">{user.displayName}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-full border border-gray-700 px-4 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:border-red-500 hover:text-red-400"
        >
          Logout
        </button>
      </header>

      {/* Chat — fills remaining height */}
      <div className="flex-1 overflow-hidden">
        <RecommendationChat />
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-gray-400">Loading…</p>
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}