import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LoginButton from "@/components/LoginButton";
import { API_BASE_URL } from "@/lib/api";

async function getSession() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Backend not reachable – treat as logged out
  }
  return null;
}

export default async function HomePage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="flex flex-col items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#1DB954"
          className="h-16 w-16"
          aria-hidden="true"
        >
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 0 1-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 0 1 .207.857zm1.223-2.722a.779.779 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.779.779 0 0 1-.968-.519.78.78 0 0 1 .519-.968c3.632-1.102 8.147-.568 11.228 1.324a.78.78 0 0 1 .258 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.935.935 0 1 1-.543-1.79c3.532-1.072 9.404-.865 13.115 1.338a.936.936 0 0 1-.955 1.609z" />
        </svg>
        <h1 className="text-4xl font-bold tracking-tight">
          Spotify Recommender
        </h1>
        <p className="max-w-md text-lg text-gray-400">
          Discover new music tailored to your taste. Connect your Spotify
          account to get started.
        </p>
      </div>
      <LoginButton />
    </main>
  );
}
