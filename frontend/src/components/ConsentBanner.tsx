import { Button } from "@/components/ui/button";
import { grantConsent, revokeConsent, useConsent } from "@/lib/meta-pixel";

/**
 * Consent for the Meta Pixel and Conversions API. Shown until the visitor
 * chooses; reopened from the footer's "Cookie preferences". Nothing is
 * tracked until "Accept" is clicked.
 *
 * The wording below is a placeholder pending approval, together with the
 * privacy policy draft (PRIVACY_POLICY_DRAFT.md).
 */
export default function ConsentBanner() {
  const { consent, bannerOpen } = useConsent();
  if (!bannerOpen) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and tracking preferences"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-border bg-card p-4 shadow-xl sm:inset-x-6 sm:bottom-6 sm:p-5"
      data-testid="consent-banner"
    >
      <p className="text-sm leading-relaxed text-foreground">
        We use the Meta Pixel to measure visits and how well our ads work. It runs only if you accept, and you can
        change your choice any time from &ldquo;Cookie preferences&rdquo; at the bottom of the page.
      </p>
      {consent && (
        <p className="mt-1.5 text-xs text-muted-foreground">
          Current choice: {consent === "granted" ? "accepted" : "declined"}.
        </p>
      )}
      <div className="mt-4 flex flex-wrap justify-end gap-2.5">
        <Button
          variant="outline"
          className="rounded-full px-5"
          onClick={revokeConsent}
          data-testid="button-consent-decline"
        >
          Decline
        </Button>
        <Button
          className="brand-btn-primary rounded-full px-5"
          onClick={grantConsent}
          data-testid="button-consent-accept"
        >
          Accept
        </Button>
      </div>
    </div>
  );
}
