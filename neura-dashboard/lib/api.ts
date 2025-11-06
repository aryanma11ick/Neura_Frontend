// lib/api.ts

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // fallback for local dev

/**
 * Basic GET helper for the Neura FastAPI backend.
 * @param path e.g. "/events"
 * @param params optional query params
 */
export async function apiGet(path: string, params?: Record<string, any>) {
  const url = new URL(`${API_URL}${path.startsWith("/") ? path : `/${path}`}`);

  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        url.searchParams.append(key, String(val));
      }
    });
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // always fresh
  });

  if (!res.ok) {
    console.error(`[apiGet] ${res.status} ${res.statusText}`);
    throw new Error(`GET ${url.toString()} failed: ${res.status}`);
  }

  return res.json();
}

/**
 * POST helper
 */
export async function apiPost(path: string, body: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`POST ${path} failed: ${res.status}`);
  }

  return res.json();
}
