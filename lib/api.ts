export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:5001";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("spotify_jwt");
}

export function setToken(token: string): void {
  // Basic sanity check: JWT must have three dot-separated segments
  const parts = token.split(".");
  if (parts.length !== 3) return;
  localStorage.setItem("spotify_jwt", token);
}

export function clearToken(): void {
  localStorage.removeItem("spotify_jwt");
}

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const token = getToken();
  const headers = new Headers(init?.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });
}
