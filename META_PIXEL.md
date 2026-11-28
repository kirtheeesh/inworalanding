# Meta Pixel + Conversions API: Inwora Technologies

Pixel ID: **1082744314811489** · Graph API **v26.0** · Site: https://inwora.com

## How it works

Nothing is tracked until the visitor clicks **Accept** on the consent banner.

| Piece | File | What it does |
|---|---|---|
| Consent banner | `frontend/src/components/ConsentBanner.tsx` | Accept / Decline. Choice stored in `localStorage` (`inwora_consent`). Reopened from the footer's **Cookie preferences**. |
| Pixel loader + events | `frontend/src/lib/meta-pixel.ts` | Loads `fbevents.js` **once**, only after consent (`autoConfig` off, `disablePushState`). `trackEvent()` gives each event one ID, sends it to the Pixel (`eventID`) and to `POST /api/events` (`event_id`) with `sendBeacon`. |
| PageView | `MetaPixelRouteTracker` in `meta-pixel.ts` | One per page load and one per route change; hash-only changes are ignored; re-mounts can't send a second one. |
| ViewContent | `pages/ProjectDetails.tsx`, `components/landing/ProductDetailsDialog.tsx` | A case study opened; a product's "Learn more" dialog opened. |
| Contact | `frontend/src/lib/whatsapp.ts` | A WhatsApp button or link clicked. The `wa.me` URL is passed through unchanged. |
| Server endpoint | `backend/src/MetaCapi.php` via `backend/index.php` | Validates and forwards consented events to the Conversions API. |
| Rate limit / duplicates | `backend/src/RateLimiter.php` | 30 events per IP per minute; a repeated `event_id` within 10 minutes is sent once. Files only, no database. |
| Diagnostics | `/admin/diagnostics` (admin login) | cURL, `open_basedir`, config found/valid, token set yes/no, IP headers. Never shows the token. |

`frontend/index.html` no longer contains Pixel code or a `<noscript>` image (no consent is possible without JavaScript). The Meta domain-verification tag stays.

**A WhatsApp click is Contact, never Lead.** It only means "opened WhatsApp"; it does not prove an enquiry was sent or received.

**Never from the browser:** Lead, CompleteRegistration, Purchase. `/api/events` refuses them. Future server code may send them with `MetaCapi::sendServerEvent()` only after a confirmed success (a saved enquiry, a completed registration, a verified payment webhook), hashing identifiers with `meta_hash()` first.

### `POST /api/events`

- Same-origin only (Origin, else `Sec-Fetch-Site`, else Referer must match the host). CORS stays GET-only.
- `Content-Type: application/json`, body ≤ 4 KB, `consent: true` required, only known fields.
- Allowed: PageView, ViewContent, Contact. `custom_data` keys: `content_name`, `content_category`, `content_ids`, `content_type`.
- `event_source_url` must be on this host; query string and fragment are removed; `/admin` refused.
- Sent to Meta: event name/time/ID, page URL, `action_source: website`, IP (from the configured header), user agent, `_fbp`/`_fbc` cookies. No names, emails, phones or message text.
- **Delivery is synchronous**: the PHP request waits for Meta (2 s connect, 3 s total). Where LiteSpeed/FPM allows, the browser connection is closed first (`litespeed_finish_request`), but the PHP worker still waits. No queue, no retry: a failed event is logged and lost.
- Logs (`[inwora-capi]` in the PHP error log) contain only event name, HTTP status, Meta error code/type/message and `fbtrace_id`.
- Responses are only `{"ok":true}` or a generic error, never config details.

## Private config (token storage)

The token is **not** in `.env`, `env.php`, the frontend, Git or any response. It lives in one PHP file **outside `public_html`**:

```
/home/u891386226/domains/inwora.com/private/meta-capi.config.php    (permissions 600)
```

Template: `backend/meta-capi.config.example.php` (do not upload). **Fail closed:** if the file is missing, unreadable, readable by other users, invalid, or `enabled` is false, or cURL / the storage folder are unavailable, `/api/events` accepts events and drops them. The site, the browser Pixel and all other APIs keep working. Instant off switch: set `'enabled' => false`.

Before uploading a build: `cd frontend && npm run build && npm run check:secrets`.

## Privacy / consent

- Before consent: no `fbevents.js`, no Pixel cookies, no `/api/events` calls.
- Decline / revoke: our calls stop immediately; events still queued for a not-yet-loaded `fbevents.js` are discarded; `fbq('consent','revoke')`; `_fbp`/`_fbc` removed. The server also refuses events without `consent: true` (it trusts this flag; it cannot verify consent on its own).
- Keep **Automatic Advanced Matching OFF** in Events Manager → Pixel → Settings.
- Privacy policy text: `PRIVACY_POLICY_DRAFT.md`, **draft, not published**, awaiting approval.

## Installing the same pixel on another Inwora product

Example: `https://digitalinvitation.inwora.com` (note the spelling; `digitalinvitaion.inwora.com` does not resolve). Not modified; awaiting your authorisation. If you add it there, load it only after consent, as inwora.com now does.

1. Check the project has no existing pixel (`grep -ri "fbq\|fbevents" .`).
2. Paste into the global `<head>` (e.g. `index.html`, or the root layout):
   ```html
   <!-- Meta Pixel Code -->
   <script>
   !function(f,b,e,v,n,t,s)
   {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
   n.queue=[];t=b.createElement(e);t.async=!0;
   t.src=v;s=b.getElementsByTagName(e)[0];
   s.parentNode.insertBefore(t,s)}(window, document,'script',
   'https://connect.facebook.net/en_US/fbevents.js');
   fbq('set', 'autoConfig', false, '1082744314811489');
   fbq('init', '1082744314811489');
   fbq('track', 'PageView');
   </script>
   <!-- End Meta Pixel Code -->
   ```
   And at the top of `<body>`:
   ```html
   <noscript><img height="1" width="1" style="display:none" alt=""
   src="https://www.facebook.com/tr?id=1082744314811489&ev=PageView&noscript=1" /></noscript>
   ```
3. **Multi-page site** (plain HTML/PHP, each page a real page load): that's all. **SPA** (React/Vue router): also add `fbq.disablePushState = true;` before `fbq('init', …)` and copy `src/lib/meta-pixel.ts` (`MetaPixelRouteTracker`) into the app, rendered inside the router.
4. All subdomains can share the one pixel. The `_fbp` cookie is set on `.inwora.com`, so a visitor is recognised across subdomains. To tell products apart in reports, filter by URL/domain in Events Manager or create Custom Conversions per domain.
5. Add every domain in Events Manager → Pixel → Settings → **Traffic permissions** (allow list), so nobody else can send events to this pixel.


## Testing

Local (done): PHP unit tests, HTTP tests against a mock Meta server, old-vs-new backend comparison, headless browser with `fbevents.js` blocked (so nothing reaches the real Pixel).

Live, after the private config exists (not done yet):

1. `/admin/diagnostics`: cURL available, config readable, permissions 600, token set: yes; pick the IP header that shows your real IP and set `client_ip_header`.
2. Set `test_event_code` (Events Manager → Test events) and `'enabled' => true`.
3. In normal Chrome (headless browsers are ignored by `fbevents.js`): accept the banner, browse, open a case study, click a WhatsApp button. In Test events each of PageView, ViewContent and Contact should show **Browser** and **Server**, marked deduplicated, for pixel 1082744314811489.
4. Clear `test_event_code`.

Meta Pixel Helper (Chrome extension): one pixel, one PageView per page, no duplicate-pixel warnings; nothing at all before Accept.
