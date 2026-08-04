import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Layers, Smartphone, ImageIcon, Monitor, ChevronRight } from "lucide-react";

const badges = [
  { icon: Smartphone, label: "Mobile App Solutions", cls: "border-primary/40 bg-primary/10 text-primary dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-300", href: "#products" },
  { icon: ImageIcon, label: "Gold Poster SaaS", cls: "border-primary/40 bg-primary/10 text-primary dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300", href: "https://gold.inwora.com" },
  { icon: Monitor, label: "POS + KOT Subscription", cls: "border-primary/40 bg-primary/10 text-primary dark:border-teal-500/40 dark:bg-teal-500/10 dark:text-teal-300", href: "#products" },
];

const trustStats = [
  { icon: Zap, label: "Fast Deployment" },
  { icon: Layers, label: "Scalable Products" },
  { icon: Shield, label: "Subscription Ready" },
];

const productCards = [
  {
    title: "Gold Poster App",
    desc: "Jewelry & Business Creatives",
    accent: "from-primary to-primary/70 dark:from-amber-500 dark:to-yellow-600",
    glow: "shadow-primary/20 dark:shadow-amber-500/20",
    bar: "bg-primary dark:bg-amber-400",
    tags: ["Subscription", "Fast Creation"],
    icon: "✦",
  },
  {
    title: "POS & KOT Software",
    desc: "Restaurants & Retail Billing",
    accent: "from-primary to-primary/70 dark:from-blue-500 dark:to-indigo-600",
    glow: "shadow-primary/20 dark:shadow-blue-500/20",
    bar: "bg-primary dark:bg-blue-400",
    tags: ["Real-time Orders", "Multi-device"],
    icon: "⊞",
  },
  {
    title: "Mobile App Solutions",
    desc: "Android & iOS for Startups",
    accent: "from-primary to-primary/70 dark:from-teal-500 dark:to-emerald-600",
    glow: "shadow-primary/20 dark:shadow-teal-500/20",
    bar: "bg-primary dark:bg-teal-400",
    tags: ["Custom Build", "Scalable"],
    icon: "◈",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 0.61, 0.36, 1] } },
};

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20"
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary/15 blur-[120px] opacity-60 animate-glow-breathe" />
        <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[100px] opacity-50 animate-glow-breathe" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px] opacity-40 animate-glow-breathe" style={{ animationDelay: "3s" }} />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Top badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Premium IT Product Company
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-foreground"
              style={{ fontFamily: "var(--app-font-display)" }}
            >
              Powering{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                Mobile Apps,
              </span>{" "}
              Smart Business Software,{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent dark:from-emerald-400 dark:to-green-500">
                Subscription Products
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              INWORA builds modern mobile apps, gold poster generation platforms, and subscription-based
              POS &amp; KOT systems for growing businesses, jewelry brands, restaurants, and startups.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="rounded-full px-8 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow bg-primary text-primary-foreground"
                  data-testid="button-start-subscription"
                  onClick={() => window.open("https://gold.inwora.com", "_blank")}
                >
                  Gold Rate Poster
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 font-semibold border-primary/20 hover:bg-primary/5 transition-all text-primary"
                  onClick={() => scrollToSection("#products")}
                  data-testid="button-explore-products"
                >
                  Our Products
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Floating product badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-2">
              {badges.map((b, idx) => (
                <motion.a
                  key={b.label}
                  href={b.href}
                  whileHover={{ y: -2, backgroundColor: "rgba(var(--primary), 0.15)" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all ${b.cls}`}
                  {...(b.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : { onClick: (e) => {
                    if (b.href.startsWith("#")) {
                      e.preventDefault();
                      scrollToSection(b.href);
                    }
                  }})}
                >
                  <b.icon className="h-3.5 w-3.5" />
                  {b.label}
                </motion.a>
              ))}
            </motion.div>

            {/* Trust stats */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-4 border-t border-border/50 mt-2">
              {trustStats.map((s, idx) => (
                <motion.div 
                  key={s.label} 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + idx * 0.1 }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Product Cards Visual */}
          <motion.div
            initial={{ opacity: 0, perspective: 2000 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex flex-col gap-5 relative group/cards"
          >
            {productCards.map((card, i) => (
              <motion.div 
                key={card.title} 
                className={["animate-float", "animate-float-delay", "animate-float-delay-2"][i]}
                initial={{ opacity: 0, x: 100, rotateY: 35, z: -100 }}
                animate={{ opacity: 1, x: 0, rotateY: 20, z: 0 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.6 + i * 0.2, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <motion.div
                whileHover={{ 
                  x: -30,
                  rotateY: 0,
                  scale: 1.05,
                  z: 50,
                  boxShadow: "0 30px 60px -15px rgba(0,0,0,0.15)"
                }}
                className="relative rounded-[2rem] border border-border bg-card/90 backdrop-blur-md p-6 lg:p-8 transition-all duration-700 cursor-pointer overflow-hidden group shadow-2xl shadow-black/5"
              >
                {/* Decorative background element */}
                <div 
                  className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-br ${card.accent} opacity-10 blur-3xl transition-opacity animate-pulse`} 
                />

                <div className="flex items-start gap-5">
                  <div
                    className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-xl shadow-primary/20 transition-transform group-hover:scale-110 duration-700`}
                  >
                    <span className="text-2xl font-black">{card.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-black text-foreground text-base group-hover:text-primary transition-colors">{card.title}</h3>
                      <span className="flex-shrink-0 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20">
                        Live Now
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground font-medium leading-relaxed">{card.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg bg-secondary px-3 py-1 text-[10px] font-black text-secondary-foreground border border-primary/5 uppercase tracking-tighter"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Progress bar decoration */}
                <div className="mt-5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${65 + i * 12}%` }}
                    transition={{ duration: 2, delay: 1.5 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full shadow-[0_0_8px_var(--primary)] ${card.bar}`}
                  />
                </div>
              </motion.div>
              </motion.div>
            ))}

            {/* Floating glow accent */}
            <div className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-primary/20 blur-[100px] animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
