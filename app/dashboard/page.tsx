"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import Image from "next/image";

interface SpotifyUser {
  displayName: string;
  email: string;
  profileImageUrl: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(user);
  useEffect(() => {
    apiFetch("/auth/me")
      .then(async (res) => {
        if (!res.ok) {
          router.replace("/");
          return;
        }
        const data: SpotifyUser = await res.json();
        setUser(data);
      })
      .catch(() => router.replace("/"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } finally {
      router.replace("/");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400">Loading…</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const avatarUrl = user.profileImageUrl;
``
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-gray-900 p-8 shadow-xl">
        <div className="flex flex-col items-center gap-4">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={user.displayName}
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500 text-3xl font-bold text-black">
              {user?.displayName?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="text-center">
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <p className="mt-1 text-sm text-gray-400">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full rounded-full border border-gray-700 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-red-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
