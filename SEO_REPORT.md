# Inwora Technologies: Meta Verification and SEO Report

Branch: `seo/meta-verification-technical-seo` (not committed, not deployed)
Prepared: 24 Nov 2026
Site: https://inwora.com (Vite + React 19 SPA, PHP/MySQL backend, Hostinger)

Status labels used below:
- **DONE**: implemented in this branch and verified locally (build + Apache test + headless browser).
- **RECOMMENDED**: not implemented; needs a decision, new content or more work.
- **EXTERNAL**: needs access to Meta Business, Google Search Console, Hostinger or the Google Business Profile.

No ranking, traffic or indexing results are claimed anywhere in this report. Nothing has been deployed.

---

## 1. Initial SEO audit (baseline, live site on 23 Nov 2026)

| Area | Finding | Severity |
|---|---|---|
| Architecture | Client-rendered SPA. Every URL returns the same `index.html`; body content needs JavaScript. | High |
| Per-page titles and canonicals | The static HTML for **every** route had the home title and `canonical=https://inwora.com/`. `/services`, `/products`, `/portfolio` and the case studies told crawlers they were duplicates of the homepage. Only Services, Products, Portfolio and ProjectDetails corrected this after JavaScript ran, inconsistently. Home and About had no handling. | **Critical** |
| Social previews | `og:image` (`/opengraph.jpg`) was a **"Replit Agent is building…" placeholder**. Every Facebook, WhatsApp and LinkedIn share showed it. Facebook doesn't run JS, so all pages also shared the homepage preview. | **Critical** |
| 404 handling | Any URL (e.g. `/does-not-exist`) returned **HTTP 200** with the homepage (soft 404). | High |
| www / non-www | `https://www.inwora.com` served the site (200) instead of redirecting, so the whole site existed twice. | High |
| HTTPS | `http://` → `https://` 301 is in place (Hostinger). | OK |
| robots.txt | A separate `User-agent: Googlebot` group made Googlebot **ignore** the `*` rules. `Disallow: /api/` blocked Bingbot and others from the API the portfolio is rendered from. `Crawl-delay: 10` slowed Bing. `/admin` was not excluded. | Medium |
| Sitemap | Static, 5 URLs, with none of the 25 portfolio case studies. | Medium |
| Structured data | `FAQPage` with questions **not visible on the page** (against Google's guidelines). A `ProfessionalService` pointing at **`inwora.in`** (wrong domain). `SoftwareApplication` offers **without a price** (invalid for rich results). Organization `sameAs` listed an unrelated organisation. | Medium |
| Headings | Each page has exactly one H1. H2/H3 structure is reasonable. | OK |
| Image alt text | All `<img>` tags have `alt` attributes. | OK |
| Internal links | Navbar and footer link to all main pages. Footer social links (LinkedIn, X, Instagram, Facebook, YouTube) are all `href="#"`. | Low |
| Performance | One 735 KB JS bundle (224 KB gzip) for every page. Montserrat was downloaded **twice** (Google Fonts + a 690 KB local TTF that overrode it). No cache headers. Project images are 1–2 MB PNG/JPG each. | Medium |
| Mobile | Responsive layout with a correct viewport meta. | OK |
| Branding | The website UI uses green `#228B22`; the approved logo is teal. Not changed (out of scope). | Note |
| Location | The site only said "Tamil Nadu". Madurai appeared nowhere. | Medium |

---

## 2. Files modified

All paths are relative to `inworalanding/`.

| File | Change |
|---|---|
| `frontend/index.html` | Meta verification tag. New route-specific SEO block (with markers). Cleaned site-wide schema (Organization + WebSite). Removed invalid/duplicate schema and obsolete meta tags. |
| `frontend/src/seo/site.ts` | **New.** Single source of truth for titles, descriptions, canonicals, OG and JSON-LD per page. |
| `frontend/src/seo/head.ts` | **New.** Renders the per-page `<head>` block. |
| `frontend/src/hooks/use-seo.ts` | **New.** Keeps `<head>` in sync during client-side navigation. |
| `frontend/seo-prerender.ts` | **New.** Vite build plugin: per-route HTML, `404.html`, generated `sitemap.xml`. |
| `frontend/vite.config.ts` | Registers the plugin. |
| `frontend/src/pages/*.tsx` | Replaced the ad-hoc `document.title`/meta code with `useSeo()` (Landing, Services, Products, Portfolio, ProjectDetails, About, not-found). Services keeps its Service catalogue JSON-LD. |
| `frontend/src/App.tsx` | Code-splits secondary pages (`React.lazy`). |
| `frontend/src/index.css` | Removed the duplicate local Montserrat `@font-face` (690 KB TTF). |
| `frontend/src/components/landing/Footer.tsx` | Location text "Tamil Nadu, India" → "Madurai, Tamil Nadu, India". |
| `frontend/public/.htaccess` | www→non-www, real 404s, duplicate-URL redirects, pre-rendered route serving, cache headers. |
| `frontend/public/robots.txt` | Rewritten (single group, `/admin` excluded, `/api/` crawlable). |
| `frontend/public/og-inwora.jpg` | **New.** 1200×630 share image: the approved logo, unmodified, on white. |
| `frontend/public/opengraph.jpg` | Replaced the Replit placeholder with the same image (old shared links pick it up after a re-scrape). |
| `frontend/public/sitemap.xml` | **Deleted**; now generated at build time. |
| `backend/index.php` | Adds `X-Robots-Tag: noindex, nofollow` to all backend (API/admin) responses. No logic changed. |

Not touched: authentication, API logic, database, payments, `.env` files, other subdomain projects.

---

## 3. Meta domain verification: DONE

- Tag: `<meta name="facebook-domain-verification" content="ysvebysnto8qk4f8evuu4i29yhzw0i" />`
- Location: `frontend/index.html`, static in `<head>` directly after `charset`/`viewport`. Not injected by JavaScript.
- It appears exactly **once** in every generated HTML file (`index.html`, `404.html`, all 31 files in `_pages/`). Checked with a script.
- **EXTERNAL**: after deploy, click **Verify** in Meta Business Settings → Brand Safety → Domains → inwora.com.

---

## 4. Page-by-page SEO

How it works: at build time each route gets its own HTML file whose `<head>` already holds the correct tags. Crawlers that don't run JavaScript (Facebook, WhatsApp, LinkedIn, X) see them, and so does Google before rendering. `useSeo()` applies the same values when users navigate inside the app.

| URL | Title | Description (chars) | H1 (unchanged) | Schema |
|---|---|---|---|---|
| `/` | Inwora Technologies \| ERP, POS & KOT Software Company in Madurai | 155 | Innovative Software Solutions & Custom Applications | Organization, WebSite |
| `/services` | Custom Software Development & IT Services in Tamil Nadu \| Inwora | 152 | IT Services, Software Development & Application Support | BreadcrumbList, ItemList of Service |
| `/products` | ERP, POS & KOT, Factory & Construction Software \| Inwora | 162 | Enterprise Software & Unified Business ERP | BreadcrumbList, ItemList of 5 SoftwareApplication |
| `/portfolio` | Software Portfolio & Case Studies \| Inwora Technologies | 143 | (existing) | BreadcrumbList |
| `/about` | About Inwora Technologies \| Software Company in Madurai | 159 | Built on innovation, driven by purpose | BreadcrumbList, AboutPage |
| `/portfolio/<slug>` (25) | `<Project> — Case Study \| Inwora Technologies` | from project summary, ≤158 | project title | BreadcrumbList; og:image = project banner |
| 404 | Page not found \| Inwora Technologies | — | Page not found | `noindex`, no canonical |

Canonical URLs: absolute, `https://inwora.com`, no trailing slash, self-referencing on every indexable page.

Headings: each page already had one H1 and a sensible H2/H3 structure, so no visual copy was changed. Alt text was already present on all images.

**RECOMMENDED** internal linking:
- In the footer, the "POS & KOT", "Unified Business ERP" and "Factory Management" links all go to `/products`. Once product pages exist (§10), link each one to its own page.
- Link from each portfolio case study to the related product (e.g. `pos-kot` → POS product page).
- Replace the `href="#"` social links with the real profiles, or remove them.

---

## 5. Keyword mapping

No search volumes, difficulty scores or rankings are included: no keyword tool data was available in this session. Run the keywords below through Google Keyword Planner or Search Console before setting priorities.

| Intent cluster | Keywords (initial ideas) | Current target page | Gap |
|---|---|---|---|
| Brand + location | Inwora, Inwora Technologies, software company in Madurai, software development company in Tamil Nadu | `/`, `/about` | Covered |
| ERP | ERP software company in India, ERP software in Tamil Nadu, business management software, custom ERP development | `/products` | Needs a dedicated ERP page |
| Restaurant | restaurant POS software, POS and KOT software, restaurant billing software, restaurant management system | `/products`, `/portfolio/pos-kot` | Needs a dedicated POS & KOT page |
| Manufacturing | factory management software, manufacturing ERP software, factory automation software | `/products`, `/portfolio/factory-automation` | Needs a Factory OS page |
| Construction | construction ERP software, construction project management software, construction billing software | `/products`; product lives on `construction.inwora.com` | Subdomain needs its own SEO (§10) |
| Custom development | custom software development, enterprise software solutions | `/services` | Covered |
| AI & marketing | AI video marketing services, AI advertisement video production, digital marketing company in Madurai, business promotional video services | **none** | No page offers these services today. Don't target them until a page describing the real service exists. |
| Digital invitations | digital invitation, online wedding invitation | `/portfolio/inwora-wishes`; `digitalinvitation.inwora.com` | Subdomain SEO |

Keywords were placed in titles and descriptions naturally, once each. There's no keyword stuffing and no `meta keywords` tag (Google ignores it).

---

## 6. Technical SEO report (verified locally on Apache 2.4 with the production `.htaccess`)

| Test | Result |
|---|---|
| `/`, `/services`, `/products`, `/portfolio`, `/about` | 200, unique title + self canonical |
| `/portfolio/pos-kot` (and the other 24) | 200, case-study title + canonical |
| `/portfolio/<new-slug-not-yet-built>` | 200, neutral shell without canonical; the page sets its tags after load |
| `/random-page`, `/services/extra` | **404**, `noindex` |
| `www.inwora.com/*` | 301 → `https://inwora.com/*` |
| `/services/` | 301 → `/services` |
| `/index.html` | 301 → `/` |
| `/_pages/services.html` | 301 → `/services` |
| JS/CSS | `Cache-Control: public, max-age=31536000, immutable` |
| HTML | `Cache-Control: no-cache` |
| Images/fonts | `Cache-Control: public, max-age=2592000` |
| Client-side navigation (headless Chrome) | Title, description, canonical, og:url, robots and JSON-LD update correctly on every route; 1 H1 per page; no JS errors |

Hostinger usually runs **LiteSpeed**, not Apache. The rules avoid Apache-only features (`<If>`, `R=404`), so they should behave the same, but check them after deploy (§12).

---

## 7. Structured data validation

- All JSON-LD blocks in all 32 generated HTML files parse as valid JSON (scripted check).
- **Removed:** the `FAQPage` (questions not on the page), the `ProfessionalService` (wrong `inwora.in` domain), the price-less `Offer` objects, and the parent company in `sameAs`.
- **Kept / added:** Organization (name, logo, email, both phone numbers, `addressLocality: Madurai`, Tamil Nadu, IN, slogan, founding date 2023, `knowsAbout` service list, Instagram in `sameAs`); WebSite; BreadcrumbList; SoftwareApplication ×5; Service list; AboutPage.
- **Not added:** `LocalBusiness`. It needs a verified street address (and ideally opening hours), and the site publishes neither. No address, hours, ratings or reviews were invented.
- **EXTERNAL**: after deploy, run every main URL through https://search.google.com/test/rich-results and https://validator.schema.org.

---

## 8. Sitemap and robots.txt

- `sitemap.xml` is generated on every build: 5 main pages + 25 case studies = **30 URLs**, `lastmod` = build date. Slugs come from `https://inwora.com/api/projects` at build time (override with `SEO_PROJECTS_URL`). If the API is unreachable, the build still succeeds with a warning.
- **Rebuild after adding a portfolio project in the admin**, so it gets pre-rendered and added to the sitemap.
- `robots.txt` (new):
  ```
  User-agent: *
  Allow: /
  Disallow: /admin
  Sitemap: https://inwora.com/sitemap.xml
  ```
  `/api/` stays crawlable so Google can render portfolio content; backend responses send `X-Robots-Tag: noindex`.

**Index:** `/`, `/services`, `/products`, `/portfolio`, `/about`, `/portfolio/*`.
**Don't index:** `/admin*`, `/api/*` (header), 404 responses, `/_pages/*` (redirected).

---

## 9. Performance

| Item | Before | After |
|---|---|---|
| Main JS bundle | 735 KB (224 KB gzip), all pages | 622 KB (201 KB gzip) for home; other pages load 10–37 KB chunks on demand |
| Montserrat | Google Fonts **and** a 690 KB local TTF | Google Fonts woff2 only (same typeface) |
| Caching | None | Long-lived for hashed JS/CSS; 30 days for images/fonts |
| OG image | 13 KB placeholder | 34 KB real logo card |

**RECOMMENDED** (not done; they need asset or DB changes):
- Convert the portfolio images in `public/assets/projects/` and `backend/uploads/` (1–2 MB PNG/JPG each) to WebP at ~1600 px wide. This is likely the biggest LCP win on portfolio and product pages. `cwebp` is available in XAMPP.
- Split the main bundle further (framer-motion, radix, react-icons): check with `npx vite-bundle-visualizer`.
- The 12 MB `public/fonts/` folder is no longer used by the CSS. Remove it from the deploy after confirming nothing else references it.
- Measure real Core Web Vitals after deploy with PageSpeed Insights and the Search Console CWV report. No scores are claimed here.

---

## 10. Remaining issues and recommendations

1. **No dedicated product pages.** ERP, POS & KOT, Factory OS and Construction ERP only share `/products`. Separate pages (`/products/pos-kot-software`, `/products/erp-software`, `/products/factory-management-software`, `/products/construction-erp`) would let each one target its own keywords. Add each route to `STATIC_PAGES` in `src/seo/site.ts` and to the `.htaccess` route list.
2. **AI video marketing / digital marketing services** are not described anywhere on the site. Add a real services section or page before targeting those keywords.
3. **Social profile links.** Only Instagram (@inwora_official) is shown and listed in `sameAs`. Facebook, LinkedIn and YouTube stay hidden until the official URLs are provided; add them to `SITE.social` in `src/seo/site.ts`, the footer and `sameAs` in `index.html`.
4. **Street address / Google Business Profile.** With a verified address, add `LocalBusiness` schema and create or claim a Google Business Profile. That is the main driver for "software company in Madurai" map results.
5. **Brand consistency.** Confirmed: the public name is Inwora Technologies, an independent brand. All parent-company references were removed from the schema, content and portfolio data.
6. **Brand colour.** The site uses green `#228B22`; the logo is teal. Not changed.
7. **Full pre-rendering of body content** (React SSG) would remove the dependence on Google's JS rendering. It's a larger change; the current setup fixes the head-level problems.

### Future product SEO architecture (subdomains)

Each product subdomain (`construction.inwora.com`, `gold.inwora.com`, `digitalinvitation.inwora.com`, `wishes.inwora.com`, future ones) should:
- be added as its own **Domain property** in Search Console (one `inwora.com` Domain property covers all subdomains for reporting) and submit its own `sitemap.xml`;
- have its own `robots.txt` pointing to its own sitemap;
- use self-referencing canonicals on its own host (never canonical to inwora.com);
- carry `SoftwareApplication` schema with `publisher: {"@id": "https://inwora.com/#organization"}`, so all products link to one entity;
- have a matching landing page on `inwora.com/products/<product>` that links to the subdomain (and back), to target "<product> software" keywords from the main domain;
- reuse the `src/seo/site.ts` + `seo-prerender.ts` pattern if built with Vite/React.

The subdomain projects are not in this repository and were not modified.

---

## 11. Deployment instructions (not done; needs your approval)

1. Back up the current live `public_html/.htaccess`, `public_html/index.html` and `public_html/backend/index.php` (Hostinger File Manager → download).
2. Build:
   ```
   cd frontend
   npm run build      # prints "[seo] wrote 5 static pages, 25 case studies, 404.html and sitemap.xml"
   ```
3. Upload the **contents** of `frontend/dist/public/` to `public_html/`, replacing existing files. This must include `.htaccess`, `index.html`, `404.html`, the `_pages/` folder, `assets/`, `robots.txt`, `sitemap.xml`, `og-inwora.jpg` and `opengraph.jpg`. Upload `backend/index.php` to `public_html/backend/index.php`.
   - Do not upload `.env` files or `inwora-deploy.zip`/`inwora-database.zip` anywhere public: they contain production credentials.
4. Purge the Hostinger CDN cache (hPanel → Website → Performance → CDN → Purge).
5. **Rollback:** re-upload the three backed-up files and the previous `assets/` build.

---

## 12. Post-deployment verification checklist

- [ ] `curl -s https://inwora.com/ | grep facebook-domain-verification` shows the tag → click **Verify** in Meta Business Settings.
- [ ] `https://inwora.com/services` page source shows the Services title and `canonical …/services`.
- [ ] `curl -I https://inwora.com/xyz` → `404`.
- [ ] `curl -I https://www.inwora.com/` → `301` to `https://inwora.com/`.
- [ ] `curl -I https://inwora.com/services/` → `301` to `/services`.
- [ ] `/admin` login and portfolio/product editing still work; `/api/projects` returns JSON.
- [ ] Facebook Sharing Debugger (https://developers.facebook.com/tools/debug/): enter `https://inwora.com/` and **Scrape Again**; the logo card should replace the Replit placeholder. Repeat for `/services`, `/products`.
- [ ] Rich Results Test and validator.schema.org on `/`, `/products`, `/services`, `/portfolio/pos-kot`.
- [ ] Search Console: add/verify the property, submit `https://inwora.com/sitemap.xml`, and URL-inspect the 5 main pages (Request indexing).
- [ ] PageSpeed Insights (mobile) on `/` and `/products`: record the baseline.
- [ ] Re-check indexing and Core Web Vitals in Search Console after 2–4 weeks, and report only what Search Console shows.
