import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, ArrowLeft, ArrowRight, Info, MessageCircle, Calendar } from "lucide-react";
import { SiGoogleplay } from "react-icons/si";
import { SectionHeading } from "./_shared";
import { ProductDetailsDialog } from "./ProductDetailsDialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { fetchProducts } from "@/lib/api";
import { resolveProductIcon, FALLBACK_PRODUCTS, type Product } from "@/lib/products-data";

const WHATSAPP_NUMBER = "919025728998";
const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

function ProductCard({
  product,
  index,
  onLearnMore,
}: {
  product: Product;
  index: number;
  onLearnMore: (product: Product) => void;
}) {
  const Icon = resolveProductIcon(product.icon);

  const handleEnquiry = () =>
    window.open(
      waLink(`Hello INWORA! I have an enquiry about the "${product.title}" product. Could you share pricing and more details?`),
      "_blank",
    );

  const handleRequestDemo = () =>
    window.dispatchEvent(
      new CustomEvent("open-schedule-demo", { detail: { productName: product.title } })
    );

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        product.featured
          ? "border-[#228B22]/50 ring-2 ring-[#228B22]/15 shadow-md shadow-[#228B22]/5"
          : "border-[#E0EEE0] dark:border-border/70 hover:border-[#228B22]/40",
      )}
      data-testid={`card-product-${index}`}
    >
      {product.image ? (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="h-14 w-20 overflow-hidden rounded-xl border border-[#E0EEE0] dark:border-border bg-muted shadow-2xs">
            <img src={product.image} alt={product.title} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <Badge product={product} />
        </div>
      ) : (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] shadow-2xs">
            <Icon className="h-6 w-6" />
          </div>
          <Badge product={product} />
        </div>
      )}

      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{product.title}</h3>
      {product.subtitle && <p className="mt-1 text-xs font-semibold text-[#228B22] dark:text-[#8ce68c]">{product.subtitle}</p>}
      {product.desc && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{product.desc}</p>}

      {product.features.length > 0 && (
        <ul className="mt-4 mb-4 space-y-2 border-t border-border/60 pt-3">
          {product.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs text-foreground/90">
              <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#228B22]" />
              <span className="line-clamp-1">{f}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Live / store chips */}
      <div className="mb-4 flex flex-wrap gap-2">
        {product.playStoreUrl && (
          <a
            href={product.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E0EEE0] dark:border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <SiGoogleplay className="h-3.5 w-3.5 text-[#228B22]" />
            Google Play
          </a>
        )}
        {product.liveUrl ? (
          <a
            href={product.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E0EEE0] dark:border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#228B22]" />
            {hostOf(product.liveUrl)}
          </a>
        ) : (
          !product.playStoreUrl && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#E0EEE0] dark:border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[#228B22]" />
              Demo on request
            </span>
          )
        )}
      </div>

      {/* CTAs */}
      <div className="mt-auto flex flex-col gap-2 pt-2">
        <button
          onClick={handleRequestDemo}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full brand-btn-primary px-3 py-2 text-xs font-semibold cursor-pointer shadow-xs"
          data-testid={`button-product-request-demo-${index}`}
        >
          <Calendar className="h-3.5 w-3.5" />
          Request a Demo
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => onLearnMore(product)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-[#228B22]/40 hover:text-[#228B22] cursor-pointer"
            data-testid={`button-product-learn-more-${index}`}
          >
            <Info className="h-3.5 w-3.5" />
            Learn more
          </button>
          <button
            onClick={handleEnquiry}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-[#228B22]/40 hover:text-[#228B22] cursor-pointer"
            data-testid={`button-product-enquiry-${index}`}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Enquiry
          </button>
        </div>
      </div>
    </div>
  );
}

function Badge({ product }: { product: Product }) {
  if (product.featured) {
    return (
      <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
        Most popular
      </span>
    );
  }
  if (!product.badge) return null;
  return (
    <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
      {product.badge}
    </span>
  );
}

function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return "Live";
  }
}

export default function Products() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSelected(api.selectedScrollSnap());
      setSnaps(api.scrollSnapList());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const products = data && data.length > 0 ? data : FALLBACK_PRODUCTS;

  return (
    <section id="products" className="border-y border-border bg-gradient-to-b from-background via-[#E0EEE0]/15 to-background dark:via-[#228B22]/5 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Proprietary Business Suite"
          title="Enterprise Software Built to Scale Operations"
          subtitle="Production-ready software platforms — from Unified Business ERP and automated gold rate creatives to restaurant POS & KOT. Request a live walkthrough tailored to your business."
        />

        {isPending && (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6">
                <div className="h-12 w-12 rounded-xl bg-muted animate-pulse" />
                <div className="mt-5 h-5 w-2/3 rounded bg-muted animate-pulse" />
                <div className="mt-3 h-4 w-full rounded bg-muted animate-pulse" />
                <div className="mt-2 h-4 w-5/6 rounded bg-muted animate-pulse" />
                <div className="mt-6 h-10 w-full rounded-lg bg-muted animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="mt-12 rounded-xl border border-destructive/20 bg-destructive/5 p-10 text-center">
            <h3 className="mb-1 text-lg font-semibold text-foreground">We couldn't load the products</h3>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        )}

        {data && products.length === 0 && (
          <div className="mt-12 rounded-xl border border-border bg-muted/30 p-12 text-center">
            <p className="text-muted-foreground">No products have been published yet — check back soon.</p>
          </div>
        )}

        {products.length > 0 && (
          <>
            <Carousel
              setApi={setApi}
              opts={{ align: "start", loop: true }}
              className="mt-12"
            >
              <CarouselContent>
                {products.map((product, i) => (
                  <CarouselItem key={product.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                    <ProductCard product={product} index={i} onLearnMore={setActiveProduct} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                aria-label="Previous product"
                data-testid="button-products-prev"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                {snaps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => api?.scrollTo(i)}
                    aria-label={`Go to product ${i + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === selected ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40",
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => api?.scrollNext()}
                aria-label="Next product"
                data-testid="button-products-next"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>

      <ProductDetailsDialog
        product={activeProduct}
        open={activeProduct !== null}
        onOpenChange={(open) => !open && setActiveProduct(null)}
      />
    </section>
  );
}
