import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, ArrowLeft, ArrowRight, Info, MessageCircle } from "lucide-react";
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
import { resolveProductIcon, type Product } from "@/lib/products-data";

const WHATSAPP_NUMBER = "919047370027";
const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const primaryBtn =
  "inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";
const outlineBtn =
  "inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary";

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

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg",
        product.featured ? "border-primary/40 ring-1 ring-primary/15" : "border-border",
      )}
      data-testid={`card-product-${index}`}
    >
      {product.image ? (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="h-12 w-16 overflow-hidden rounded-lg border border-border bg-muted">
            <img src={product.image} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <Badge product={product} />
        </div>
      ) : (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <Badge product={product} />
        </div>
      )}

      <h3 className="text-lg font-semibold text-foreground">{product.title}</h3>
      {product.subtitle && <p className="mt-1 text-sm font-medium text-primary">{product.subtitle}</p>}
      {product.desc && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.desc}</p>}

      {product.features.length > 0 && (
        <ul className="mt-5 mb-5 space-y-2.5">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              {f}
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
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <SiGoogleplay className="h-3.5 w-3.5" />
            Google Play
          </a>
        )}
        {product.liveUrl ? (
          <a
            href={product.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {hostOf(product.liveUrl)}
          </a>
        ) : (
          !product.playStoreUrl && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
              Demo on request
            </span>
          )
        )}
      </div>

      {/* CTAs */}
      <div className="mt-auto flex gap-2.5">
        <button
          onClick={() => onLearnMore(product)}
          className={primaryBtn}
          data-testid={`button-product-learn-more-${index}`}
        >
          <Info className="h-4 w-4" />
          Learn more
        </button>
        <button onClick={handleEnquiry} className={outlineBtn} data-testid={`button-product-enquiry-${index}`}>
          <MessageCircle className="h-4 w-4" />
          Enquiry
        </button>
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

  const products = data ?? [];

  return (
    <section id="products" className="border-y border-border bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Our products"
          title="Five products, built to ship fast"
          subtitle="Subscription-powered software and apps — from gold-rate posters to full factory operations. Drag or swipe to explore the suite."
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
