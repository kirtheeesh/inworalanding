import { motion } from "framer-motion";
import { ImageIcon, Monitor, Smartphone, Check, ArrowRight, ExternalLink } from "lucide-react";
import { SiGoogleplay } from "react-icons/si";
import { SectionHeading, fadeUpDelay } from "./_shared";

interface ProductItem {
  icon: any;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  featured?: boolean;
  playStoreUrl?: string | null;
  liveUrl?: string | null;
  liveLabel?: string;
}

const products: ProductItem[] = [
  {
    icon: ImageIcon,
    badge: "Inwora Daily Gold",
    title: "Inwora Daily Gold App",
    subtitle: "Gold-rate poster & daily creatives app",
    desc: "A mobile app & subscription platform for creating gold & silver rate posters and promotional graphics. Generate professional visuals in seconds.",
    features: [
      "Official Android app on Google Play",
      "Automated gold & silver rate templates",
      "Fast poster creation engine",
      "Brand logo & shop customization",
    ],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.kirtheeshh.usermobile&pli=1",
    liveUrl: "https://gold.inwora.com",
    liveLabel: "gold.inwora.com",
  },
  {
    icon: Monitor,
    badge: "Business Software",
    title: "POS & KOT Software",
    subtitle: "Restaurants, billing & order workflows",
    desc: "A live SaaS subscription POS & Kitchen Order Ticket system for restaurants, cafes, and retail counters. Streamline orders and billing in real time.",
    features: [
      "Real-time order management",
      "Kitchen display system (KOT)",
      "Multi-counter support",
      "Sales reports & analytics",
    ],
    featured: true,
    liveUrl: "https://kot.nexoraapp.in/",
    liveLabel: "kot.nexoraapp.in",
  },
  {
    icon: Smartphone,
    badge: "Mobile Development",
    title: "Mobile App Solutions",
    subtitle: "Android & iOS for startups & businesses",
    desc: "Custom-built mobile applications engineered for scale. From MVP to enterprise — pixel-perfect, performant apps that users love and businesses rely on.",
    features: [
      "Android & iOS development",
      "Custom UI/UX design",
      "Scalable architecture & APIs",
      "App Store deployment & support",
    ],
    liveUrl: null,
  },
];

export default function Products() {
  const handleCustomQuote = (productTitle: string) => {
    const msg = `Hello INWORA! I would like to request a custom quote for the "${productTitle}" solution.`;
    window.open(`https://wa.me/919047370027?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="products" className="border-y border-border bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Our products"
          title="Products built to ship fast"
          subtitle="Subscription-powered software and mobile applications built for businesses that need to move fast, look great, and operate reliably."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              {...fadeUpDelay(i)}
              className={`relative flex flex-col rounded-xl border bg-card p-6 transition-shadow hover:shadow-md ${
                product.featured ? "border-primary/40 ring-1 ring-primary/15" : "border-border"
              }`}
              data-testid={`card-product-${i}`}
            >
              {product.featured && (
                <span className="absolute right-4 top-4 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                  Most popular
                </span>
              )}

              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <product.icon className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-semibold text-foreground">{product.title}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{product.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.desc}</p>

              <ul className="mt-5 mb-6 space-y-2.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Live / store links */}
              {(product.playStoreUrl || product.liveUrl) && (
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
                  {product.liveUrl && (
                    <a
                      href={product.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {product.liveLabel}
                    </a>
                  )}
                </div>
              )}

              {/* Primary CTA */}
              <div className="mt-auto">
                {product.playStoreUrl ? (
                  <a
                    href={product.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    data-testid={`button-product-playstore-${i}`}
                  >
                    <SiGoogleplay className="h-4 w-4" />
                    Get on Google Play
                  </a>
                ) : product.liveUrl ? (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    data-testid={`button-product-demo-${i}`}
                  >
                    Explore product
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <button
                    onClick={() => handleCustomQuote(product.title)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    data-testid={`button-product-demo-${i}`}
                  >
                    Request a quote
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
