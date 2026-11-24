import { useEffect } from "react";
import { resolvePageSeo } from "@/seo/head";
import { jsonLdString, type PageSeo } from "@/seo/site";

function upsertMeta(attr: "name" | "property", key: string, content: string | null) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (href === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(json: string | null) {
  let el = document.getElementById("seo-page-jsonld") as HTMLScriptElement | null;
  if (json === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "seo-page-jsonld";
    document.head.appendChild(el);
  }
  if (el.textContent !== json) el.textContent = json;
}

/**
 * Keeps <head> in sync with the current page during client-side navigation.
 * The same values are written statically at build time (see seo-prerender.ts),
 * so on a full page load this is a no-op.
 */
export function useSeo(page: PageSeo | null | undefined) {
  const key = page ? JSON.stringify(page) : "";
  useEffect(() => {
    if (!page) return;
    const s = resolvePageSeo(page);
    document.title = s.title;
    upsertMeta("name", "description", s.description);
    upsertMeta("name", "robots", s.robots);
    upsertCanonical(page.noindex ? null : s.canonical);
    upsertMeta("property", "og:type", s.ogType);
    upsertMeta("property", "og:title", s.ogTitle);
    upsertMeta("property", "og:description", s.ogDescription);
    upsertMeta("property", "og:url", page.noindex ? null : s.ogUrl);
    upsertMeta("property", "og:image", s.ogImage);
    upsertMeta("property", "og:image:width", s.ogImageIsDefault ? "1200" : null);
    upsertMeta("property", "og:image:height", s.ogImageIsDefault ? "630" : null);
    upsertMeta("property", "og:image:alt", s.ogImageAlt);
    upsertMeta("name", "twitter:title", s.ogTitle);
    upsertMeta("name", "twitter:description", s.ogDescription);
    upsertMeta("name", "twitter:image", s.ogImage);
    upsertMeta("name", "twitter:image:alt", s.ogImageAlt);
    upsertJsonLd(s.jsonLd ? jsonLdString(s.jsonLd) : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
