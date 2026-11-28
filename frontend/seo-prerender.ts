/**
 * Build-time SEO for the Inwora SPA.
 *
 * After `vite build`, this plugin:
 *  - rewrites dist/public/index.html with the home page <head> tags;
 *  - writes dist/public/_pages/<route>.html for every other route (same app,
 *    route-specific title/description/canonical/Open Graph/JSON-LD), which
 *    .htaccess serves for that URL;
 *  - writes dist/public/404.html (noindex) used as Apache's ErrorDocument;
 *  - writes dist/public/sitemap.xml including every portfolio case study.
 *
 * Portfolio case studies live in MySQL, so their slugs are read from the
 * public API at build time (SEO_PROJECTS_URL, default the live site). If the
 * API can't be reached the build still succeeds and those pages simply fall
 * back to the generic SPA shell; a warning is printed.
 */
import fs from "node:fs/promises";
import path from "node:path";
import type { Plugin } from "vite";
import { injectPageHead } from "./src/seo/head";
import {
  NOT_FOUND,
  PORTFOLIO_SHELL,
  STATIC_PAGES,
  absoluteUrl,
  projectSeo,
  type PageSeo,
  type ProjectSeoInput,
} from "./src/seo/site";

const SLUG = /^[a-z0-9][a-z0-9-]{0,100}$/i;

async function fetchProjects(url: string): Promise<ProjectSeoInput[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = (await res.json()) as { data?: ProjectSeoInput[] };
    if (!Array.isArray(body.data)) throw new Error("unexpected response shape");
    return body.data.filter((p) => typeof p.id === "string" && SLUG.test(p.id) && p.title);
  } finally {
    clearTimeout(timer);
  }
}

function sitemapXml(pages: PageSeo[], lastmod: string): string {
  const urls = pages
    .map((p) => `  <url>\n    <loc>${absoluteUrl(p.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function seoPrerender(options: { outDir: string }): Plugin {
  return {
    name: "inwora-seo-prerender",
    apply: "build",
    async closeBundle() {
      const outDir = options.outDir;
      const indexPath = path.join(outDir, "index.html");
      const shell = await fs.readFile(indexPath, "utf8");

      const projectsUrl = process.env.SEO_PROJECTS_URL ?? "https://inwora.com/api/projects";
      let projectPages: PageSeo[] = [];
      try {
        projectPages = (await fetchProjects(projectsUrl)).map(projectSeo);
      } catch (err) {
        this.warn(
          `Could not load portfolio projects from ${projectsUrl} (${(err as Error).message}). ` +
            "Case-study pages will use the generic shell and are left out of sitemap.xml.",
        );
      }

      const pagesDir = path.join(outDir, "_pages");
      await fs.rm(pagesDir, { recursive: true, force: true });

      for (const page of [...STATIC_PAGES, ...projectPages]) {
        const html = injectPageHead(shell, page);
        const file =
          page.path === "/" ? indexPath : path.join(pagesDir, `${page.path.replace(/^\//, "")}.html`);
        await fs.mkdir(path.dirname(file), { recursive: true });
        await fs.writeFile(file, html);
      }

      await fs.writeFile(path.join(pagesDir, "portfolio-shell.html"), injectPageHead(shell, PORTFOLIO_SHELL));
      await fs.writeFile(path.join(outDir, "404.html"), injectPageHead(shell, NOT_FOUND));

      const lastmod = new Date().toISOString().slice(0, 10);
      await fs.writeFile(
        path.join(outDir, "sitemap.xml"),
        sitemapXml([...STATIC_PAGES, ...projectPages], lastmod),
      );

      console.log(
        `\n[seo] wrote ${STATIC_PAGES.length} static pages, ${projectPages.length} case studies, 404.html and sitemap.xml`,
      );
    },
  };
}
