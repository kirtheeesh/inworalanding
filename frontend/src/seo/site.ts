/**
 * Single source of truth for page-level SEO on inwora.com.
 *
 * Used in two places:
 *  1. `seo-prerender.ts` (Vite build plugin) writes a static <head> per route,
 *     so crawlers that don't run JavaScript (Facebook, WhatsApp, LinkedIn, X)
 *     still get the correct title, description, canonical URL and preview.
 *  2. `useSeo()` keeps the same tags in sync during client-side navigation.
 *
 * Keep this file free of React/JSX and of "@/..." imports: it is also loaded
 * by vite.config.ts in Node.
 *
 * Only put facts here that are true and visible on the site. Do not add an
 * address, opening hours, ratings or reviews unless they are verified.
 */

export const SITE = {
  origin: "https://inwora.com",
  name: "Inwora Technologies",
  shortName: "Inwora",
  tagline: "Innovate. Automate. Scale.",
  locale: "en_IN",
  language: "en-IN",
  /** 1200x630 share image built from the approved logo (public/og-inwora.jpg). */
  ogImage: "https://inwora.com/og-inwora.jpg",
  ogImageAlt: "Inwora Technologies logo — Innovate. Automate. Scale.",
  /** Approved stacked logo (public/assets/inwora_logo.png, 816x883). */
  logo: "https://inwora.com/assets/inwora_logo.png",
  email: "info@inwora.com",
  telephones: ["+91 90257 28998", "+91 79042 42107"],
  locality: "Madurai",
  region: "Tamil Nadu",
  country: "IN",
  /**
   * Confirmed social profiles only. Facebook, LinkedIn and YouTube are added
   * here (and to the footer and Organization `sameAs` in index.html) once the
   * official URLs are provided — never guess them.
   */
  social: {
    instagram: "https://www.instagram.com/inwora_official/",
  },
} as const;

export type Breadcrumb = { name: string; path: string };

export interface PageSeo {
  /** Path without trailing slash ("/" for home). */
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  ogImageAlt?: string;
  /** Adds `noindex, follow` (used for the 404 page). */
  noindex?: boolean;
  /** Omit canonical and og:url (used for shells whose real URL is unknown at build time). */
  noCanonical?: boolean;
  breadcrumbs?: Breadcrumb[];
  /** Extra page-specific JSON-LD nodes (merged into one @graph with the breadcrumb). */
  jsonLd?: Record<string, unknown>[];
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  if (path === "/" || path === "") return `${SITE.origin}/`;
  return `${SITE.origin}${path.startsWith("/") ? path : `/${path}`}`;
}

const ORG_ID = `${SITE.origin}/#organization`;

/* ── Static routes ─────────────────────────────────────────────────────── */

const HOME: PageSeo = {
  path: "/",
  title: "Inwora Technologies | ERP, POS & KOT Software Company in Madurai",
  description:
    "Inwora Technologies, Madurai: ERP, POS & KOT, Factory OS and Construction ERP software, custom development, AI solutions, automation and digital marketing.",
  ogTitle: "Inwora Technologies — ERP, POS & KOT, AI and Business Automation",
  ogDescription:
    "ERP, POS & KOT, Factory OS, Construction ERP, custom software, AI video marketing, digital marketing and digital invitations. Innovate. Automate. Scale.",
};

const SERVICES: PageSeo = {
  path: "/services",
  title: "Custom Software Development & IT Services in Tamil Nadu | Inwora",
  description:
    "Custom software development, application maintenance, QA test automation, IT outsourcing and API integration services from Inwora Technologies, Madurai.",
  ogTitle: "Software Development & IT Services | Inwora Technologies",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ],
};

/** The five products shown on the site (see FALLBACK_PRODUCTS in lib/products-data.ts). */
const PRODUCT_SCHEMA: Record<string, unknown>[] = [
  {
    name: "Unified Business ERP",
    applicationSubCategory: "ERP",
    description:
      "Cloud ERP that brings sales billing, multi-warehouse inventory, GST accounting, customers and staff into one system.",
  },
  {
    name: "POS & KOT Software",
    applicationSubCategory: "Point of Sale",
    description:
      "Restaurant billing and kitchen order ticket (KOT) software for restaurants, cafes and retail counters.",
  },
  {
    name: "Factory Management Software",
    applicationSubCategory: "Manufacturing",
    description: "Tracks factory operations from raw material to packing and dispatch.",
  },
  {
    name: "Construction Management Software",
    applicationSubCategory: "Construction",
    description: "Site accounts, material and money movement for construction projects in one place.",
    url: "https://construction.inwora.com",
  },
  {
    name: "Inwora Daily Gold",
    applicationSubCategory: "Marketing",
    description: "Daily gold-rate posters and creatives for jewellery businesses.",
    url: "https://gold.inwora.com",
  },
].map((p) => ({
  "@type": "SoftwareApplication",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  publisher: { "@id": ORG_ID },
  ...p,
}));

const PRODUCTS: PageSeo = {
  path: "/products",
  title: "ERP, POS & KOT, Factory & Construction Software | Inwora",
  description:
    "Inwora's business software: Unified Business ERP with GST billing and inventory, restaurant POS & KOT, factory and construction management, and Inwora Daily Gold.",
  ogTitle: "Business Software Products | Inwora Technologies",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ],
  jsonLd: [
    {
      "@type": "ItemList",
      name: "Inwora Technologies software products",
      itemListElement: PRODUCT_SCHEMA.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item,
      })),
    },
  ],
};

const PORTFOLIO: PageSeo = {
  path: "/portfolio",
  title: "Software Portfolio & Case Studies | Inwora Technologies",
  description:
    "Case studies of ERP, POS, CRM, e-commerce, jewellery, hospitality and business websites built by Inwora Technologies for clients in Tamil Nadu.",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
  ],
};

const ABOUT: PageSeo = {
  path: "/about",
  title: "About Inwora Technologies | Software Company in Madurai",
  description:
    "Inwora Technologies is an independent technology and SaaS company in Madurai, Tamil Nadu: ERP, POS & KOT, Factory OS, Construction ERP, AI and automation.",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ],
  jsonLd: [{ "@type": "AboutPage", about: { "@id": ORG_ID } }],
};

export const NOT_FOUND: PageSeo = {
  path: "/404",
  title: "Page not found | Inwora Technologies",
  description: "The page you are looking for does not exist or has moved.",
  noindex: true,
};

/** Served for case studies created after the last build (see .htaccess). */
export const PORTFOLIO_SHELL: PageSeo = {
  path: "/portfolio",
  title: "Case Study | Inwora Technologies",
  description: "Software case study by Inwora Technologies, Madurai.",
  noCanonical: true,
};

export const STATIC_PAGES: PageSeo[] = [HOME, SERVICES, PRODUCTS, PORTFOLIO, ABOUT];

export function getStaticPageSeo(path: string): PageSeo | undefined {
  return STATIC_PAGES.find((p) => p.path === path);
}

/* ── Portfolio case studies ────────────────────────────────────────────── */

export interface ProjectSeoInput {
  id: string;
  title: string;
  desc?: string | null;
  banner?: string | null;
}

function clip(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export function projectSeo(project: ProjectSeoInput): PageSeo {
  const path = `/portfolio/${project.id}`;
  const description = clip(
    project.desc ||
      `${project.title}: case study of software designed and built by Inwora Technologies.`,
  );
  const image = project.banner ? absoluteUrl(project.banner) : undefined;
  return {
    path,
    title: `${project.title} — Case Study | Inwora Technologies`,
    description,
    ogType: "article",
    ogImage: image,
    ogImageAlt: image ? `${project.title} by Inwora Technologies` : undefined,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Portfolio", path: "/portfolio" },
      { name: project.title, path },
    ],
  };
}

/* ── JSON-LD helpers ───────────────────────────────────────────────────── */

export function pageJsonLd(page: PageSeo): Record<string, unknown> | null {
  const graph: Record<string, unknown>[] = [];
  if (page.breadcrumbs && page.breadcrumbs.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: page.breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: absoluteUrl(b.path),
      })),
    });
  }
  if (page.jsonLd) {
    for (const node of page.jsonLd) {
      graph.push(
        node["@type"] === "AboutPage"
          ? { ...node, url: absoluteUrl(page.path), name: page.title }
          : node,
      );
    }
  }
  if (graph.length === 0) return null;
  return { "@context": "https://schema.org", "@graph": graph };
}

/** Escape JSON so it is safe inside <script type="application/ld+json">. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
