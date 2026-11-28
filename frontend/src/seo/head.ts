import { SITE, absoluteUrl, jsonLdString, pageJsonLd, type PageSeo } from "./site";

/** Markers in index.html that wrap the route-specific <head> tags. */
export const SEO_BLOCK_START = "<!-- seo:page:start -->";
export const SEO_BLOCK_END = "<!-- seo:page:end -->";

const ROBOTS_INDEX = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const ROBOTS_NOINDEX = "noindex, follow";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Resolved values shared by the static renderer and the client-side hook. */
export function resolvePageSeo(page: PageSeo) {
  const url = absoluteUrl(page.path);
  return {
    title: page.title,
    description: page.description,
    canonical: url,
    robots: page.noindex ? ROBOTS_NOINDEX : ROBOTS_INDEX,
    ogType: page.ogType ?? "website",
    ogTitle: page.ogTitle ?? page.title,
    ogDescription: page.ogDescription ?? page.description,
    ogUrl: url,
    ogImage: page.ogImage ?? SITE.ogImage,
    ogImageAlt: page.ogImageAlt ?? SITE.ogImageAlt,
    // Only the default share image has known dimensions.
    ogImageIsDefault: !page.ogImage || page.ogImage === SITE.ogImage,
    jsonLd: pageJsonLd(page),
  };
}

/** Static HTML for the route-specific part of <head>. */
export function renderPageHead(page: PageSeo): string {
  const s = resolvePageSeo(page);
  const lines = [
    `<title>${esc(s.title)}</title>`,
    `<meta name="description" content="${esc(s.description)}" />`,
    `<meta name="robots" content="${s.robots}" />`,
    page.noindex || page.noCanonical ? "" : `<link rel="canonical" href="${esc(s.canonical)}" />`,
    `<meta property="og:type" content="${s.ogType}" />`,
    `<meta property="og:title" content="${esc(s.ogTitle)}" />`,
    `<meta property="og:description" content="${esc(s.ogDescription)}" />`,
    page.noindex || page.noCanonical ? "" : `<meta property="og:url" content="${esc(s.ogUrl)}" />`,
    `<meta property="og:image" content="${esc(s.ogImage)}" />`,
    s.ogImageIsDefault ? `<meta property="og:image:width" content="1200" />` : "",
    s.ogImageIsDefault ? `<meta property="og:image:height" content="630" />` : "",
    `<meta property="og:image:alt" content="${esc(s.ogImageAlt)}" />`,
    `<meta name="twitter:title" content="${esc(s.ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(s.ogDescription)}" />`,
    `<meta name="twitter:image" content="${esc(s.ogImage)}" />`,
    `<meta name="twitter:image:alt" content="${esc(s.ogImageAlt)}" />`,
    s.jsonLd
      ? `<script type="application/ld+json" id="seo-page-jsonld">${jsonLdString(s.jsonLd)}</script>`
      : "",
  ].filter(Boolean);
  return `${SEO_BLOCK_START}\n    ${lines.join("\n    ")}\n    ${SEO_BLOCK_END}`;
}

/** Replace the marked block in an index.html string with tags for `page`. */
export function injectPageHead(html: string, page: PageSeo): string {
  const start = html.indexOf(SEO_BLOCK_START);
  const end = html.indexOf(SEO_BLOCK_END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error("index.html is missing the <!-- seo:page:start/end --> markers");
  }
  return html.slice(0, start) + renderPageHead(page) + html.slice(end + SEO_BLOCK_END.length);
}
