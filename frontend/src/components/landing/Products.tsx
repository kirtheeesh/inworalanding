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
  const handleCustomQuote = (productTitle: string) => {
    const msg = `Hello INWORA! I would like to request a custom quote for the "${productTitle}" solution.`;
    window.open(`https://wa.me/919047370027?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="products" className="relative overflow-hidden bg-muted/20 py-24 md:py-32">
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4"
          >
            Our Products
          </motion.span>
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ 
                duration: 0.7, 
                delay: i * 0.15, 
                ease: [0.25, 1, 0.5, 1] 
              }}
              whileHover={{ 
                y: -12, 
                rotateX: 2,
                rotateY: -2,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className={`group relative flex flex-col rounded-3xl border ${product.borderColor} bg-card p-8 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/10 perspective-1000`}
              data-testid={`card-product-${i}`}
            >
              {/* Featured indicator */}
              {product.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <motion.span 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="rounded-full bg-primary px-5 py-1.5 text-[10px] font-black uppercase tracking-tighter text-white shadow-xl shadow-primary/40 whitespace-nowrap block"
                  >
                    Most Popular
                  </motion.span>
                </div>
              )}

              {/* Icon + Badge */}
              <div className="flex items-start justify-between mb-6">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${product.iconBg} text-white shadow-lg shadow-primary/20 transition-all duration-500`}
                >
                  <product.icon className="h-8 w-8" />
                </motion.div>
                <span className={`rounded-full border px-4 py-1 text-[10px] font-bold uppercase tracking-wider ${product.badgeBg}`}>
                  {product.badge}
                </span>
              </div>

              {/* Live URL badge */}
              {product.liveUrl && (
                <motion.a
                  href={product.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.05)" }}
                  className={`mb-4 inline-flex items-center gap-2 rounded-xl border bg-background/50 backdrop-blur-sm px-4 py-2 text-xs font-bold ${product.accent} border-current/20 hover:bg-muted transition-all w-fit group/btn`}
                  data-testid={`link-live-${i}`}
                >
                  <span className="h-2 w-2 rounded-full bg-primary dark:bg-emerald-500 animate-pulse" />
                  Live: {product.liveLabel}
                  <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </motion.a>
              )}

              {/* Title */}
              <h3
                className="text-2xl font-black text-foreground mb-1 group-hover:text-primary transition-colors duration-300"
                style={{ fontFamily: "var(--app-font-display)" }}
              >
                {product.title}
              </h3>
              <p className={`text-sm font-bold mb-4 tracking-tight ${product.accent}`}>{product.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">{product.desc}</p>

              {/* Feature List */}
              <motion.ul 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
                className="space-y-3 mb-10"
              >
                {product.features.map((f, fIdx) => (
                  <motion.li 
                    key={f} 
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="flex items-center gap-3 text-sm font-medium text-foreground/90"
                  >
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full ${product.badgeBg} border-none`}>
                      <Check className={`h-3 w-3 ${product.accent}`} />
                    </div>
                    {f}
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {product.liveUrl ? (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full rounded-2xl py-4 px-6 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/10 ${product.ctaColor}`}
                    data-testid={`button-product-demo-${i}`}
                  >
                    Explore Product
                    <ExternalLink className="h-4.5 w-4.5" />
                  </a>
                ) : (
                  <button
                    onClick={() => handleCustomQuote(product.title)}
                    className={`w-full rounded-2xl py-4 px-6 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/10 ${product.ctaColor}`}
                    data-testid={`button-product-demo-${i}`}
                  >
                    Custom Quote
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
