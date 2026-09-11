import { Check, ExternalLink, MessageCircle, PlayCircle } from "lucide-react";
import { SiGoogleplay } from "react-icons/si";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BannerSlider } from "@/components/ui/banner-slider";
import { resolveProductIcon, type Product } from "@/lib/products-data";

const WHATSAPP_NUMBER = "919047370027";
const waLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

/**
 * The "Learn more" dialog — the product's full detail view (banner slider,
 * overview, features, demo video) without leaving the home page. Mirrors the
 * portfolio project detail page's content, condensed into a modal.
 */
export function ProductDetailsDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!product) return null;

  const Icon = resolveProductIcon(product.icon);
  const hasVideo = (product.videoType === "youtube" && product.videoUrl) || (product.videoType === "upload" && product.videoFileUrl);

  const handleQuote = () =>
    window.open(waLink(`Hello INWORA! I'm interested in "${product.title}". Could you share pricing and more details?`), "_blank");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl p-0 sm:rounded-2xl">
        <DialogTitle className="sr-only">{product.title}</DialogTitle>

        <div className="p-5 sm:p-7">
          {product.banners.length > 0 ? (
            <BannerSlider images={product.banners} alt={product.title} className="aspect-[16/10] sm:aspect-[16/9]" />
          ) : (
            <div className="flex aspect-[16/9] w-full items-center justify-center rounded-2xl border border-border bg-muted/60">
              <Icon className="h-14 w-14 text-primary/40" />
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              {(product.featured || product.badge) && (
                <span
                  className={
                    product.featured
                      ? "inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground"
                      : "inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  }
                >
                  {product.featured ? "Most popular" : product.badge}
                </span>
              )}
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">{product.title}</h2>
              {product.subtitle && <p className="mt-1 text-sm font-medium text-primary">{product.subtitle}</p>}
            </div>
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
          </div>

          {product.overview && (
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.overview}</p>
          )}

          {product.features.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {product.features.map((f) => (
                <div key={f} className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground/90">{f}</span>
                </div>
              ))}
            </div>
          )}

          {hasVideo && (
            <div className="mt-7">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <PlayCircle className="h-4 w-4 text-primary" />
                Working demo
              </h3>
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
                {product.videoType === "youtube" ? (
                  <iframe
                    className="h-full w-full"
                    src={product.videoUrl!}
                    title={`${product.title} demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video className="h-full w-full" src={product.videoFileUrl!} controls playsInline preload="metadata" />
                )}
              </div>
            </div>
          )}

          <div className="mt-7 flex flex-wrap gap-2.5 border-t border-border pt-6">
            {product.liveUrl && (
              <Button asChild className="flex-1 rounded-lg gap-1.5">
                <a href={product.liveUrl} target="_blank" rel="noopener noreferrer">
                  Visit live site
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            {product.playStoreUrl && (
              <Button asChild variant={product.liveUrl ? "outline" : "default"} className="flex-1 rounded-lg gap-1.5">
                <a href={product.playStoreUrl} target="_blank" rel="noopener noreferrer">
                  <SiGoogleplay className="h-4 w-4" />
                  Get on Google Play
                </a>
              </Button>
            )}
            <Button variant="outline" className="flex-1 rounded-lg gap-1.5" onClick={handleQuote}>
              <MessageCircle className="h-4 w-4" />
              Request a quote
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
