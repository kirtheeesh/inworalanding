import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Check } from "lucide-react";
import { SiGoogleplay } from "react-icons/si";
import { fetchProducts } from "@/lib/api";
import { FALLBACK_PRODUCTS, resolveProductIcon } from "@/lib/products-data";

const DAILY_GOLD_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.kirtheeshh.usermobile&pli=1";

const highlights = ["5 live products", "Custom apps built to spec", "369+ projects shipped"];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const item: any = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] } },
};

export default function Hero() {
  const { data } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const products = (data && data.length > 0 ? data : FALLBACK_PRODUCTS).slice(0, 5);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24">
      {/* Subtle background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col gap-6">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Premium IT product company
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-foreground"
            >
              Innovative software solutions{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                &amp; custom applications
              </span>{" "}
              built for modern business
            </motion.h1>

            <motion.p variants={item} className="max-w-lg text-base md:text-lg leading-relaxed text-muted-foreground">
              INWORA delivers high-performance subscription software and bespoke digital applications engineered to automate workflows, optimize operations, and drive scalable business growth.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-lg gap-2"
                onClick={() => window.open(DAILY_GOLD_PLAY_URL, "_blank")}
                data-testid="button-download-dailygold"
              >
                <SiGoogleplay className="h-4 w-4" />
                Get Daily Gold app
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-lg gap-1"
                onClick={() => scrollToSection("#products")}
                data-testid="button-explore-products"
              >
                Explore products
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.ul variants={item} className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  {h}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right: product panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xl shadow-black/[0.03]">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Our products</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Live
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {products.map((p, i) => {
                  const Icon = resolveProductIcon(p.icon);

                  return (
                    <motion.a
                      key={p.id}
                      href="#products"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        scrollToSection("#products");
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
                      className="group flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/30 hover:bg-muted/40"
                    >
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {p.title}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">{p.tagline || p.subtitle}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
                {[
                  { v: "369+", l: "Projects" },
                  { v: String(products.length), l: "Products" },
                  { v: "69+", l: "Industries" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-lg font-bold text-foreground">{s.v}</p>
                    <p className="text-[11px] text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
