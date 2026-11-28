import { trackEvent } from "@/lib/meta-pixel";

/**
 * WhatsApp click tracking.
 *
 * Callers pass the exact wa.me URL they built before (number and prefilled
 * text unchanged); this only adds a Meta "Contact" event in front of it.
 *
 * A click is recorded as Contact — "opened WhatsApp" — never as Lead: it does
 * not prove that a message was sent or an enquiry received. `source` names the
 * button (e.g. "Schedule demo"); never put the message text or customer
 * details in it. Nothing is sent without consent.
 */
export function trackWhatsAppClick(source: string): void {
  trackEvent("Contact", { content_name: source, content_category: "WhatsApp" });
}

/** Track the click, then open the given wa.me URL in a new tab, as before. */
export function openWhatsApp(url: string, source: string): void {
  trackWhatsAppClick(source);
  window.open(url, "_blank");
}
