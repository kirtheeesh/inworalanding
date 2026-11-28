import { useEffect, useRef, useSyncExternalStore } from "react";
import { useLocation } from "wouter";

/**
 * Meta Pixel + Conversions API for inwora.com.
 *
 * Nothing runs until the visitor accepts the consent banner:
 * - no fbevents.js download, no Pixel cookies, no /api/events calls.
 * - The choice is stored in localStorage (`inwora_consent`).
 *
 * After consent, every event gets ONE event ID that both copies share:
 *   browser: fbq('track', name, data, { eventID })
 *   server:  POST /api/events { event_name, event_id, ... } → Meta CAPI
 * Meta merges the two into one event (deduplication).
 *
 * Events: PageView, ViewContent, Contact (a WhatsApp click). Never Lead,
 * CompleteRegistration or Purchase from the browser: a WhatsApp click does
 * not prove that an enquiry was received. Never pass names, emails, phone
 * numbers or message text.
 */
export const META_PIXEL_ID = "1082744314811489";

const CONSENT_KEY = "inwora_consent";
const EVENTS_ENDPOINT = "/api/events";

export type Consent = "granted" | "denied" | null;
export type PixelEvent = "PageView" | "ViewContent" | "Contact";
export interface PixelCustomData {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: "product";
}

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: unknown;
  queue?: unknown[];
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/* ── Consent store ─────────────────────────────────────────────────────── */

function readStoredConsent(): Consent {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

let consent: Consent = typeof window === "undefined" ? null : readStoredConsent();
let bannerOpen = consent === null;
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getConsent(): Consent {
  return consent;
}

/** Consent state + banner visibility for React components. */
export function useConsent(): { consent: Consent; bannerOpen: boolean } {
  const current = useSyncExternalStore(subscribe, () => consent, () => null);
  const open = useSyncExternalStore(subscribe, () => bannerOpen, () => false);
  return { consent: current, bannerOpen: open };
}

/** Reopen the banner (footer "Cookie preferences"). */
export function openConsentBanner(): void {
  bannerOpen = true;
  emit();
}

function storeConsent(value: "granted" | "denied"): void {
  consent = value;
  bannerOpen = false;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Private mode or blocked storage: the choice lasts for this page only.
  }
  emit();
}

export function grantConsent(): void {
  const wasGranted = consent === "granted";
  storeConsent("granted");
  if (wasGranted) return;
  loadPixel();
  window.fbq?.("consent", "grant");
  trackPageView();
}

/**
 * Stops all tracking immediately: our own calls check consent synchronously,
 * events still queued for a not-yet-loaded fbevents.js are discarded, the
 * Pixel is told to revoke, and its first-party cookies are removed.
 */
export function revokeConsent(): void {
  storeConsent("denied");
  const fbq = window.fbq;
  if (fbq) {
    // fbevents.js not loaded yet: drop queued events but keep set/init, so a
    // later re-accept on this page still has an initialised Pixel.
    if (!fbq.callMethod && Array.isArray(fbq.queue)) {
      const kept = fbq.queue.filter((args) => {
        const method = (args as ArrayLike<unknown>)[0];
        return method !== "track" && method !== "trackCustom" && method !== "trackSingle";
      });
      fbq.queue.length = 0;
      fbq.queue.push(...kept);
    }
    fbq("consent", "revoke");
  }
  for (const name of ["_fbp", "_fbc"]) {
    const expired = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = expired;
    document.cookie = `${expired}; domain=.${window.location.hostname.replace(/^www\./, "")}`;
  }
}

/* ── Pixel loading (once) ──────────────────────────────────────────────── */

let pixelLoaded = false;

/** Meta's base code, run at most once per page and only with consent. */
function loadPixel(): void {
  if (pixelLoaded || consent !== "granted") return;
  pixelLoaded = true;
  if (window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) (fbq.callMethod as (...a: unknown[]) => void)(...args);
    else fbq.queue!.push(args);
  } as Fbq & { push?: Fbq; loaded?: boolean; version?: string };
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  // Meta's own History-API tracking is off; route changes are tracked below,
  // so each page view is counted once. No "Automatic Events".
  (fbq as Fbq & { disablePushState?: boolean }).disablePushState = true;
  fbq("set", "autoConfig", false, META_PIXEL_ID);
  fbq("init", META_PIXEL_ID);
}

/* ── Events ────────────────────────────────────────────────────────────── */

function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Page URL without query string or fragment (they can carry personal data). */
function sourceUrl(): string {
  return `${window.location.origin}${window.location.pathname}`;
}

function sendToServer(name: PixelEvent, eventId: string, customData: PixelCustomData): void {
  const body = JSON.stringify({
    event_name: name,
    event_id: eventId,
    event_source_url: sourceUrl(),
    custom_data: customData,
    consent: true,
  });
  try {
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon?.(EVENTS_ENDPOINT, blob)) return;
  } catch {
    // Fall through to fetch.
  }
  fetch(EVENTS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
    credentials: "same-origin",
  }).catch(() => undefined);
}

/**
 * Send one event to the Pixel and the Conversions API with a shared event ID.
 * Does nothing without consent. Returns the event ID, or null when skipped.
 */
export function trackEvent(name: PixelEvent, customData: PixelCustomData = {}): string | null {
  if (consent !== "granted" || typeof window === "undefined") return null;
  loadPixel();
  const eventId = newEventId();
  window.fbq?.("track", name, customData, { eventID: eventId });
  sendToServer(name, eventId, customData);
  return eventId;
}

/* ── PageView: one per page load and one per route change ──────────────── */

let navigationId = 0;
let pageViewSentFor = -1;

/** PageView for the current page, at most once per navigation. */
export function trackPageView(): void {
  if (pageViewSentFor === navigationId) return;
  if (trackEvent("PageView") !== null) pageViewSentFor = navigationId;
}

/**
 * Mount once inside the router. On first mount it loads the Pixel and sends
 * the page-load PageView if consent was already given; afterwards it sends
 * one PageView per pathname change. Hash-only changes (/#process) are not
 * page views. Re-mounts (React StrictMode) cannot send a second PageView.
 */
export function MetaPixelRouteTracker(): null {
  const [location] = useLocation();
  const previous = useRef(location);

  useEffect(() => {
    if (previous.current !== location) {
      previous.current = location;
      navigationId += 1;
    }
    trackPageView();
  }, [location]);

  return null;
}
