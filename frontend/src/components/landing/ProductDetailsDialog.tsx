import { Check, ExternalLink, MessageCircle, PlayCircle, Calendar } from "lucide-react";
import { SiGoogleplay } from "react-icons/si";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BannerSlider } from "@/components/ui/banner-slider";
import { resolveProductIcon, getProductBanners, type Product } from "@/lib/products-data";

const WHATSAPP_NUMBER = "919025728998";
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
  const banners = getProductBanners(product);
  const hasVideo = (product.videoType === "youtube" && product.videoUrl) || (product.videoType === "upload" && product.videoFileUrl);

  const handleQuote = () =>
    window.open(waLink(`Hello INWORA! I'm interested in "${product.title}". Could you share pricing and more details?`), "_blank");

  const handleRequestDemo = () => {
    onOpenChange(false);
    window.dispatchEvent(new CustomEvent("open-schedule-demo", { detail: { productName: product.title } }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl p-0 sm:rounded-2xl">
        <DialogTitle className="sr-only">{product.title}</DialogTitle>

        <div className="p-5 sm:p-7">
          {banners.length > 1 ? (
            <BannerSlider
              images={banners}
              alt={product.title}
              className="aspect-[16/10] sm:aspect-[16/9] rounded-2xl border border-[#E0EEE0] dark:border-border shadow-md"
            />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-[#E0EEE0] dark:border-border aspect-[16/10] sm:aspect-[16/9] bg-muted shadow-md">
              <img
                src={banners[0]}
                alt={product.title}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              {(product.featured || product.badge) && (
                <span
                  className={
                    product.featured
                      ? "inline-flex items-center rounded-full bg-[#228B22] px-3 py-1 text-[11px] font-semibold text-white shadow-xs"
                      : "inline-flex items-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-2.5 py-1 text-[11px] font-medium text-[#165b16] dark:text-[#8ce68c]"
                  }
                >
                  {product.featured ? "Most popular" : product.badge}
                </span>
              )}
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">{product.title}</h2>
              {product.subtitle && <p className="mt-1 text-sm font-semibold text-[#228B22] dark:text-[#8ce68c]">{product.subtitle}</p>}
            </div>
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22]">
              <Icon className="h-6 w-6" />
            </div>
          </div>

          {product.overview && (
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.overview}</p>
          )}

          {product.features.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {product.features.map((f) => (
                <div key={f} className="flex items-start gap-2.5 rounded-xl border border-[#E0EEE0] dark:border-border/60 bg-card p-3 shadow-2xs">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] mt-0.5">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-medium text-foreground/90">{f}</span>
                </div>
              ))}
            </div>
          )}

          {hasVideo && (
            <div className="mt-7">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                <PlayCircle className="h-4 w-4 text-[#228B22]" />
                Working demo
              </h3>
              <div className="aspect-video w-full overflow-hidden rounded-2xl border border-[#E0EEE0] dark:border-border bg-muted">
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

          <div className="mt-7 flex flex-wrap gap-2.5 border-t border-border/80 pt-6">
            <Button
              className="flex-1 rounded-full brand-btn-primary gap-1.5 h-11 text-xs font-semibold cursor-pointer shadow-xs"
              onClick={handleRequestDemo}
            >
              <Calendar className="h-3.5 w-3.5" />
              Request a Demo
            </Button>
            {product.liveUrl && (
              <Button asChild variant="outline" className="flex-1 rounded-full brand-btn-secondary gap-1.5 h-11 text-xs font-semibold cursor-pointer">
                <a href={product.liveUrl} target="_blank" rel="noopener noreferrer">
                  Visit live site
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            )}
            {product.playStoreUrl && (
              <Button asChild variant="outline" className="flex-1 rounded-full brand-btn-secondary gap-1.5 h-11 text-xs font-semibold cursor-pointer">
                <a href={product.playStoreUrl} target="_blank" rel="noopener noreferrer">
                  <SiGoogleplay className="h-3.5 w-3.5" />
                  Google Play
                </a>
              </Button>
            )}
            <Button variant="outline" className="flex-1 rounded-full brand-btn-secondary gap-1.5 h-11 text-xs font-semibold cursor-pointer" onClick={handleQuote}>
              <MessageCircle className="h-3.5 w-3.5" />
              Request quote
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
