import type { Project } from "@/lib/portfolio-data";
import { FALLBACK_PROJECTS } from "@/lib/portfolio-data";
import type { Product } from "@/lib/products-data";
import { FALLBACK_PRODUCTS, getProductBanner, getProductBanners } from "@/lib/products-data";

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

function normalizeProduct(product: Product): Product {
  const banners = getProductBanners(product);
  const image = getProductBanner(product);
  const isPosKot =
    product.id === "pos-kot" ||
    product.id === "pos-kot-software" ||
    product.title.toLowerCase().includes("pos");
  return {
    ...product,
    image,
    banners,
    liveUrl: isPosKot ? null : product.liveUrl,
  };
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

  if (!body || body.data === undefined) {
    throw new ApiError(
      response.status,
      body?.error ?? "Invalid API response: expected JSON data but received HTML or malformed response. Please verify backend deployment and .htaccess."
    );
  }

  return body.data as T;
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const data = await getJson<Project[]>("/api/projects");
    return data && data.length > 0 ? data : FALLBACK_PROJECTS;
  } catch (err) {
    console.warn("API error fetching projects, using fallback portfolio data:", err);
    return FALLBACK_PROJECTS;
  }
}

export async function fetchProject(slug: string): Promise<Project> {
  try {
    return await getJson<Project>(`/api/projects/${encodeURIComponent(slug)}`);
  } catch (err) {
    console.warn(`API error fetching project "${slug}", checking fallback portfolio data:`, err);
    const found = FALLBACK_PROJECTS.find((p) => p.id === slug);
    if (found) return found;
    throw err;
  }
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const data = await getJson<Product[]>("/api/products");
    const raw = data && data.length > 0 ? data : FALLBACK_PRODUCTS;
    return raw.map(normalizeProduct);
  } catch (err) {
    console.warn("API error fetching products, using fallback products data:", err);
    return FALLBACK_PRODUCTS.map(normalizeProduct);
  }
}

export async function fetchProduct(slug: string): Promise<Product> {
  try {
    const data = await getJson<Product>(`/api/products/${encodeURIComponent(slug)}`);
    return normalizeProduct(data);
  } catch (err) {
    console.warn(`API error fetching product "${slug}", checking fallback products data:`, err);
    const found = FALLBACK_PRODUCTS.find((p) => p.id === slug);
    if (found) return normalizeProduct(found);
    throw err;
  }
}
