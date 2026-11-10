import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Check, Calendar } from "lucide-react";
import { SiGoogleplay } from "react-icons/si";
import { fetchProducts } from "@/lib/api";
import { FALLBACK_PRODUCTS, resolveProductIcon } from "@/lib/products-data";

const DAILY_GOLD_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.kirtheeshh.usermobile&pli=1";

const highlights = ["3 subscription products", "Custom apps built to spec", "80+ projects shipped across Tamil Nadu"];

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
    <section id="home" className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 bg-gradient-to-b from-[#E0EEE0]/35 via-background to-background dark:from-[#228B22]/10 dark:via-background dark:to-background">
      {/* Organic Mint Wave Accents (Matching Reference Image) */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -top-12 -left-12 w-80 md:w-[28rem] text-[#E0EEE0]/80 dark:text-[#228B22]/10 z-0 opacity-80"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-50 -50 C120 -20 190 70 170 180 C150 290 80 340 -50 370 Z"
          fill="currentColor"
        />
      </svg>
      <svg
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 w-80 md:w-[28rem] text-[#E0EEE0]/75 dark:text-[#228B22]/10 z-0 opacity-75"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M450 -50 C280 -20 210 70 230 180 C250 290 320 340 450 370 Z"
          fill="currentColor"
        />
      </svg>

      {/* Soft Ambient Radial Mint Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#E0EEE0]/60 dark:bg-[#228B22]/10 blur-3xl -z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 right-10 w-80 h-80 rounded-full bg-[#E0EEE0]/50 dark:bg-[#228B22]/10 blur-3xl -z-10"
      />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col gap-6">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#228B22]/20 bg-[#E0EEE0]/80 dark:bg-[#228B22]/15 px-3.5 py-1 text-xs font-semibold text-[#185e18] dark:text-[#8ce68c]">
                <span className="h-2 w-2 rounded-full bg-[#228B22] animate-pulse" />
                Premium IT Engineering &amp; Software Company
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.08] tracking-tight text-foreground"
            >
              Innovative Software Solutions{" "}
              <span className="text-[#228B22] dark:text-[#3cd43c] block sm:inline">
                &amp; Custom Applications
              </span>{" "}
              <span className="block text-2xl md:text-3xl lg:text-4xl font-bold text-foreground/80 mt-2 tracking-tight">
                built for modern business
              </span>
            </motion.h1>

            <motion.p variants={item} className="max-w-lg text-base md:text-lg leading-relaxed text-muted-foreground">
              INWORA delivers bespoke enterprise web and mobile applications, scalable SaaS portals, and dedicated white-collar engineering teams to automate workflows and drive high-velocity business growth.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                size="lg"
                className="brand-btn-primary rounded-full px-6 gap-2 h-11 text-sm font-semibold cursor-pointer"
                onClick={() => window.open(DAILY_GOLD_PLAY_URL, "_blank")}
                data-testid="button-download-dailygold"
              >
                <SiGoogleplay className="h-4 w-4" />
                Get Daily Gold App
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="brand-btn-secondary rounded-full px-6 gap-2 h-11 text-sm font-semibold cursor-pointer"
                onClick={() => window.dispatchEvent(new CustomEvent("open-schedule-demo"))}
                data-testid="button-hero-request-demo"
              >
                <Calendar className="h-4 w-4 text-[#228B22]" />
                Request a Demo
              </Button>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="ghost"
                  className="rounded-full px-5 gap-1.5 h-11 text-sm font-semibold text-foreground hover:bg-[#E0EEE0]/40 dark:hover:bg-muted cursor-pointer"
                  data-testid="button-explore-products"
                >
                  Explore Products
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.ul variants={item} className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground/80">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22]">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </div>
                  {h}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right Column: product panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="rounded-2xl border border-[#E0EEE0] dark:border-border bg-card p-6 shadow-xl shadow-black/[0.04] relative">
              <div className="mb-4 flex items-center justify-between pb-3 border-b border-border/70">
                <div className="brand-structure-bar">
                  <p className="text-sm font-bold text-foreground">Featured Products</p>
                  <p className="text-[11px] text-muted-foreground">Ready-to-deploy platforms</p>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-3 py-1 text-xs font-semibold text-[#185e18] dark:text-[#8ce68c] hover:bg-[#d4e8d4] transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#228B22]" />
                  View All
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="flex flex-col gap-2.5">
                {products.map((p, i) => {
                  const Icon = resolveProductIcon(p.icon);

                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
                    >
                      <Link
                        href="/products"
                        className="group flex items-center gap-3.5 rounded-xl border border-[#E0EEE0]/80 dark:border-border bg-background p-3.5 transition-all hover:border-[#228B22]/50 hover:bg-[#E0EEE0]/20 hover:translate-x-1"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                            {p.title}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">{p.tagline || p.subtitle}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Live Demo Prompt */}
              <div className="mt-3.5 flex items-center justify-between rounded-xl bg-[#E0EEE0]/50 dark:bg-muted/40 px-3.5 py-2.5 border border-[#E0EEE0] dark:border-border">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <span className="h-2 w-2 rounded-full bg-[#228B22] animate-pulse" />
                  Live Product Walkthroughs
                </div>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-schedule-demo"))}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#228B22] hover:underline cursor-pointer"
                >
                  Request a Demo
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* Clean Stats Strip (Like 100+ Projects | 50+ Clients | 5+ Years in Reference Image) */}
              <div className="mt-4 grid grid-cols-3 divide-x divide-border border-t border-border/80 pt-4 text-center">
                {[
                  { v: "80+", l: "Projects" },
                  { v: "12", l: "Industries" },
                  { v: "2023", l: "Est." },
                ].map((s) => (
                  <div key={s.l} className="px-2">
                    <p className="text-xl font-extrabold text-foreground tracking-tight">{s.v}</p>
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{s.l}</p>
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
