import { motion } from "framer-motion";
import { ImageIcon, Monitor, Smartphone, Check, ArrowRight, ExternalLink } from "lucide-react";

const products = [
  {
    icon: ImageIcon,
    badge: "Gold Poster SaaS",
    title: "Gold Poster Generation App",
    subtitle: "For Jewelry & Business Promotions",
    desc: "A powerful subscription-based platform for creating stunning gold-themed promotional posters. Perfect for jewelry shops, retailers, and brand promotions — generate professional visuals in seconds.",
    features: [
      "Fast poster creation engine",
      "Gold & metallic theme templates",
      "Subscription-based access",
      "Brand logo & customization",
      "High-resolution exports",
      "Mobile & web ready",
    ],
    gradient: "from-primary/80 to-primary dark:from-amber-500 dark:via-yellow-500 dark:to-amber-600",
    borderColor: "border-border dark:border-amber-500/30",
    badgeBg: "bg-primary/10 text-primary border-primary/20 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30",
    iconBg: "bg-primary dark:bg-gradient-to-br dark:from-amber-400 dark:to-yellow-600",
    ctaColor: "bg-primary hover:bg-primary/90 dark:bg-gradient-to-r dark:from-amber-500 dark:to-yellow-600 dark:hover:from-amber-600 dark:hover:to-yellow-700 text-white",
    accent: "text-primary dark:text-amber-500",
    liveUrl: "https://gold.inwora.com",
    liveLabel: "gold.inwora.com",
  },
  {
    icon: Monitor,
    badge: "Business Software",
    title: "POS & KOT Software",
    subtitle: "For Restaurants, Billing & Order Workflows",
    desc: "A live SaaS subscription POS & Kitchen Order Ticket system for restaurants, cafes, and retail counters. Streamline orders, billing, and operations in real time — with customized builds also available for your brand.",
    features: [
      "Real-time order management",
      "Kitchen display system (KOT)",
      "Subscription model",
      "Multi-counter support",
      "Sales reports & analytics",
      "Customized build available",
    ],
    gradient: "from-primary to-primary/70 dark:from-blue-500 dark:via-indigo-500 dark:to-blue-600",
    borderColor: "border-primary/30 dark:border-blue-500/30",
    badgeBg: "bg-primary/10 text-primary border-primary/20 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30",
    iconBg: "bg-primary dark:bg-gradient-to-br dark:from-blue-500 dark:to-indigo-600",
    ctaColor: "bg-primary hover:bg-primary/90 dark:bg-gradient-to-r dark:from-blue-500 dark:to-indigo-600 dark:hover:from-blue-600 dark:hover:to-indigo-700 text-white",
    accent: "text-primary dark:text-blue-500",
    featured: true,
    liveUrl: "https://kot.nexoraapp.in/",
    liveLabel: "kot.nexoraapp.in",
  },
  {
    icon: Smartphone,
    badge: "Mobile Development",
    title: "Mobile App Solutions",
    subtitle: "Android & iOS for Startups & Businesses",
    desc: "Custom-built mobile applications engineered for scale. From MVP to enterprise app — INWORA delivers pixel-perfect, performant apps that users love and businesses rely on.",
    features: [
      "Android & iOS development",
      "Custom UI/UX design",
      "Scalable architecture",
      "API integrations",
      "App Store deployment",
      "Post-launch support",
    ],
    gradient: "from-primary/80 to-primary dark:from-teal-500 dark:via-emerald-500 dark:to-teal-600",
    borderColor: "border-border dark:border-teal-500/30",
    badgeBg: "bg-primary/10 text-primary border-primary/20 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/30",
    iconBg: "bg-primary dark:bg-gradient-to-br dark:from-teal-500 dark:to-emerald-600",
    ctaColor: "bg-primary hover:bg-primary/90 dark:bg-gradient-to-r dark:from-teal-500 dark:to-emerald-600 dark:hover:from-teal-600 dark:hover:to-emerald-700 text-white",
    accent: "text-primary dark:text-teal-500",
    liveUrl: null,
  },
];

export default function Products() {
  return (
    <section id="products" className="relative overflow-hidden bg-muted/20 py-24 md:py-32">
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Our Products
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground"
            style={{ fontFamily: "var(--app-font-display)" }}
          >
            Products by INWORA
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Subscription-powered software built for businesses that need to move fast, look great, and operate reliably.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 0.61, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className={`group relative flex flex-col rounded-3xl border ${product.borderColor} bg-card p-7 transition-all duration-300`}
              data-testid={`card-product-${i}`}
            >
              {/* Featured indicator */}
              {product.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-xs font-bold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon + Badge */}
              <div className="flex items-start justify-between mb-5">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${product.iconBg} text-white`}>
                  <product.icon className="h-7 w-7" />
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${product.badgeBg}`}>
                  {product.badge}
                </span>
              </div>

              {/* Live URL badge */}
              {product.liveUrl && (
                <a
                  href={product.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mb-3 inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-1.5 text-xs font-semibold ${product.accent} border-current/20 hover:bg-muted transition-colors w-fit`}
                  data-testid={`link-live-${i}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary dark:bg-emerald-500 animate-pulse" />
                  Live: {product.liveLabel}
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              )}

              {/* Title */}
              <h3
                className="text-xl font-extrabold text-foreground mb-1"
                style={{ fontFamily: "var(--app-font-display)" }}
              >
                {product.title}
              </h3>
              <p className={`text-sm font-semibold mb-3 ${product.accent}`}>{product.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{product.desc}</p>

              {/* Feature List */}
              <ul className="space-y-2 mb-8 flex-1">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                    <Check className={`h-4 w-4 flex-shrink-0 ${product.accent}`} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {product.liveUrl ? (
                <a
                  href={product.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full rounded-xl py-3 px-6 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${product.ctaColor}`}
                  data-testid={`button-product-demo-${i}`}
                >
                  View Live Product
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <button
                  className={`w-full rounded-xl py-3 px-6 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${product.ctaColor}`}
                  data-testid={`button-product-demo-${i}`}
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
