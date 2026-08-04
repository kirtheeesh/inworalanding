import type { Project } from "@/lib/portfolio-data";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

/** Build an absolute URL to a backend endpoint. */
export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Thrown for any non-OK response so callers can branch on the status. */
export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function getJson<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(apiUrl(path), { headers: { Accept: "application/json" } });
  } catch {
    throw new ApiError(0, "Could not reach the server. Please check your connection and try again.");
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(response.status, body?.error ?? `Request failed with status ${response.status}.`);
  }

  return body?.data as T;
}

export function fetchProjects(): Promise<Project[]> {
  return getJson<Project[]>("/api/projects");
}

export function fetchProject(slug: string): Promise<Project> {
  return getJson<Project>(`/api/projects/${encodeURIComponent(slug)}`);
}
