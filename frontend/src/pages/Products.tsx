import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Boxes, Check, Info, MessageCircle, ExternalLink,
  Sparkles, Layers, ShieldCheck, ArrowRight,
  Cloud, RefreshCw, Zap, Calendar, BarChart3,
  Monitor, HardHat, Factory,
} from "lucide-react";
import { SiGoogleplay } from "react-icons/si";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import FinalCTA from "@/components/landing/FinalCTA";
import { ProductDetailsDialog } from "@/components/landing/ProductDetailsDialog";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/lib/api";
import { resolveProductIcon, FALLBACK_PRODUCTS, type Product } from "@/lib/products-data";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "919025728998";
const waLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return "Live";
  }
}

export default function ProductsPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo(0, 0);

    const originalTitle = document.title;
    document.title = "Unified Business ERP & Software Products | Inwora Technologies";

    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc?.getAttribute("content") ?? "";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Explore Inwora's enterprise software suite: Unified Business ERP with GST billing & multi-warehouse inventory, Gold Poster Automation SaaS, and restaurant POS & KOT software. Schedule a personalized demo."
      );
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    let createdCanonical = false;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
      createdCanonical = true;
    }
    const originalCanonical = canonical.getAttribute("href") ?? "";
    canonical.setAttribute("href", "https://inwora.com/products");

    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.setAttribute("content", originalDesc);
      if (canonical) {
        if (createdCanonical) {
          canonical.remove();
        } else {
          canonical.setAttribute("href", originalCanonical);
        }
      }
    };
  }, []);

  const products = data && data.length > 0 ? data : FALLBACK_PRODUCTS;

  const handleEnquiry = (productTitle: string) => {
    window.open(
      waLink(`Hello INWORA! I would like to request details and pricing for "${productTitle}".`),
      "_blank"
    );
  };

  const handleRequestDemo = (productTitle: string) => {
    window.dispatchEvent(
      new CustomEvent("open-schedule-demo", { detail: { productName: productTitle } })
    );
  };

  const handleWhiteLabelEnquiry = () => {
    window.open(
      waLink("Hello INWORA! I am interested in white-label licensing / custom deployment of your software products."),
      "_blank"
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* Products Hero */}
        <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 border-b border-border bg-gradient-to-b from-[#E0EEE0]/35 via-background to-background dark:from-[#228B22]/10 dark:via-background dark:to-background">
          {/* Organic Mint Wave Accents */}
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

          <div className="container relative z-10 mx-auto px-4 md:px-8 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#228B22]/20 bg-[#E0EEE0]/80 dark:bg-[#228B22]/15 px-3.5 py-1 text-xs font-semibold text-[#185e18] dark:text-[#8ce68c] mb-6 shadow-2xs"
            >
              <Boxes className="h-3.5 w-3.5 text-[#228B22]" />
              INWORA Proprietary Product Suite
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08]"
            >
              Enterprise Software &{" "}
              <span className="text-[#228B22] dark:text-[#3cd43c] block sm:inline">
                Unified Business ERP
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto"
            >
              Streamline multi-warehouse stock, automate GST billing, and unify departmental operations with our production-ready software suite. Designed for modern enterprises that demand speed and reliability.
            </motion.p>
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            {isPending && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-card p-6">
                    <div className="h-12 w-12 rounded-xl bg-muted animate-pulse mb-4" />
                    <div className="h-6 w-3/4 rounded bg-muted animate-pulse mb-2" />
                    <div className="h-4 w-full rounded bg-muted animate-pulse mb-4" />
                    <div className="h-28 w-full rounded-xl bg-muted animate-pulse" />
                  </div>
                ))}
              </div>
            )}

            {isError && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-10 text-center max-w-xl mx-auto">
                <h3 className="mb-1 text-lg font-semibold text-foreground">Could not load products</h3>
                <p className="text-sm text-muted-foreground">{error.message}</p>
              </div>
            )}

            {products.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {products.map((product, idx) => {
                  const Icon = resolveProductIcon(product.icon);
                  const hasImage = Boolean(product.image && !failedImages[product.id]);

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className={cn(
                        "group relative flex flex-col rounded-2xl border bg-card p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                        product.featured
                          ? "border-[#228B22]/60 ring-2 ring-[#228B22]/20 shadow-md shadow-[#228B22]/10"
                          : "border-[#E0EEE0] dark:border-border/70 hover:border-[#228B22]/50"
                      )}
                    >
                      {/* Card Header */}
                      <div className="mb-5 flex items-start justify-between gap-3">
                        {hasImage ? (
                          <div className="h-14 w-20 overflow-hidden rounded-xl border border-[#E0EEE0] dark:border-border bg-muted shadow-2xs">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                              onError={() => setFailedImages((prev) => ({ ...prev, [product.id]: true }))}
                            />
                          </div>
                        ) : (
                          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] shadow-2xs">
                            <Icon className="h-6 w-6" />
                          </div>
                        )}

                        {product.featured ? (
                          <span className="rounded-full bg-[#228B22] px-3 py-1 text-[11px] font-semibold text-white shadow-xs">
                            Most popular
                          </span>
                        ) : product.badge ? (
                          <span className="rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-2.5 py-1 text-[11px] font-medium text-[#165b16] dark:text-[#8ce68c]">
                            {product.badge}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      {product.subtitle && (
                        <p className="mt-1 text-sm font-semibold text-[#228B22] dark:text-[#8ce68c]">
                          {product.subtitle}
                        </p>
                      )}
                      {product.desc && (
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-1">
                          {product.desc}
                        </p>
                      )}

                      {/* Key features bullets */}
                      {product.features.length > 0 && (
                        <ul className="mt-5 mb-5 space-y-2 border-t border-border/60 pt-4">
                          {product.features.slice(0, 4).map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90">
                              <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#228B22]" />
                              <span className="line-clamp-1">{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Store / Live link chips */}
                      <div className="mb-5 flex flex-wrap gap-2 pt-1">
                        {product.playStoreUrl && (
                          <a
                            href={product.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#E0EEE0] dark:border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-[#228B22]/40"
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
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#E0EEE0] dark:border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-[#228B22]/40"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#228B22]" />
                            {hostOf(product.liveUrl)}
                          </a>
                        ) : (
                          !product.playStoreUrl && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#E0EEE0] dark:border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#228B22]" />
                              Demo on request
                            </span>
                          )
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="mt-auto flex flex-col gap-2 pt-2">
                        <Button
                          onClick={() => handleRequestDemo(product.title)}
                          className="w-full rounded-full brand-btn-primary gap-1.5 text-xs font-semibold h-10 cursor-pointer shadow-xs"
                          data-testid={`button-product-request-demo-${idx}`}
                        >
                          <Calendar className="h-3.5 w-3.5" />
                          Request a Demo
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setActiveProduct(product)}
                            variant="outline"
                            className="flex-1 rounded-full brand-btn-secondary gap-1.5 text-xs font-semibold h-9 cursor-pointer"
                            data-testid={`button-product-learn-more-${idx}`}
                          >
                            <Info className="h-3.5 w-3.5" />
                            Learn more
                          </Button>
                          <Button
                            onClick={() => handleEnquiry(product.title)}
                            variant="outline"
                            className="flex-1 rounded-full brand-btn-secondary gap-1.5 text-xs font-semibold h-9 cursor-pointer"
                            data-testid={`button-product-enquiry-${idx}`}
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            Enquiry
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Unified Business ERP Feature Spotlight (SEO & Readable Points) */}
        <section className="py-16 md:py-24 border-t border-[#E0EEE0] dark:border-border/80 bg-gradient-to-b from-[#E0EEE0]/20 via-background to-background dark:from-[#228B22]/10 dark:via-background dark:to-background">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#228B22]/20 bg-[#E0EEE0] dark:bg-primary/20 px-3.5 py-1 text-xs font-semibold text-[#185e18] dark:text-[#8ce68c] mb-4 shadow-2xs">
                <Boxes className="h-3.5 w-3.5 text-[#228B22]" />
                Flagship Enterprise Solution
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Unified Business ERP:{" "}
                <span className="text-[#228B22] dark:text-[#3cd43c]">
                  Your Complete Operations Command Center
                </span>
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                Eliminate disconnected software, manual spreadsheets, and accounting discrepancies. Unified Business ERP centralizes multi-warehouse stock, GST-compliant invoicing, supply chain procurement, and workforce access into one intuitive platform.
              </p>
            </div>

            {/* ERP Showcase Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Authentic UI Mockup Preview */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="relative group overflow-hidden rounded-2xl border border-[#E0EEE0] dark:border-border bg-card shadow-2xl">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between border-b border-border/80 bg-muted/60 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">app.inwora.com/erp/dashboard</span>
                    <span className="rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-[#185e18] dark:text-[#8ce68c]">
                      Live SaaS
                    </span>
                  </div>

                  <img
                    src="/assets/projects/unified-business-erp.jpg"
                    alt="Unified Business ERP Dashboard Interface"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />

                  {/* Highlights Floating Overlay */}
                  <div className="p-4 bg-card/95 backdrop-blur-sm border-t border-border/80 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-muted/40">
                      <p className="font-bold text-foreground">Multi-Warehouse</p>
                      <p className="text-[11px] text-muted-foreground">Live Stock Sync</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/40">
                      <p className="font-bold text-foreground">100% GST Ready</p>
                      <p className="text-[11px] text-muted-foreground">E-Way Bills &amp; Tax</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/40">
                      <p className="font-bold text-foreground">Bank-Grade</p>
                      <p className="text-[11px] text-muted-foreground">Audit &amp; Permissions</p>
                    </div>
                  </div>
                </div>

                {/* Direct CTA under image */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    size="lg"
                    onClick={() => handleRequestDemo("Unified Business ERP")}
                    className="brand-btn-primary rounded-full px-6 gap-2 h-11 text-xs sm:text-sm font-semibold cursor-pointer shadow-md"
                  >
                    <Calendar className="h-4 w-4" />
                    Request a Live ERP Demo
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleEnquiry("Unified Business ERP")}
                    className="brand-btn-secondary rounded-full px-6 gap-2 h-11 text-xs sm:text-sm font-semibold cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Custom Spec Consultation
                  </Button>
                </div>
              </div>

              {/* Right Column: High-Value Readable Points */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Multi-Warehouse Inventory",
                    desc: "Track raw materials and finished goods across central godowns and branch stores with barcode scanning and low-stock replenishment alerts.",
                    tag: "Inventory Control",
                  },
                  {
                    title: "Automated GST Invoicing",
                    desc: "Generate compliant tax invoices with CGST/SGST/IGST breakdown, e-Way bills, credit notes, and automated monthly GSTR reconciliation.",
                    tag: "Tax & Compliance",
                  },
                  {
                    title: "Financial Ledger & P&L",
                    desc: "Double-entry accounting engine automatically updates balance sheets, journal entries, accounts receivable aging, and real-time cash flow.",
                    tag: "Core Finance",
                  },
                  {
                    title: "Procurement & Purchase Orders",
                    desc: "Streamline multi-tier PO approvals, track vendor lead times, match Goods Received Notes (GRN) with supplier bills, and prevent billing leaks.",
                    tag: "Supply Chain",
                  },
                  {
                    title: "Staff Roles & Audit Trails",
                    desc: "Enforce strict departmental permissions for billing, warehouse staff, and accountants. Every change is tracked in an unalterable audit log.",
                    tag: "Enterprise Security",
                  },
                  {
                    title: "Executive Visual Dashboards",
                    desc: "Monitor gross margins, top-performing product categories, cash flow projections, and branch sales benchmarks in real-time visual charts.",
                    tag: "Analytics & Growth",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col p-4 rounded-xl border border-[#E0EEE0] dark:border-border/70 bg-card hover:border-[#228B22]/40 transition-all hover:shadow-md"
                  >
                    <span className="inline-block self-start rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-[#185e18] dark:text-[#8ce68c] mb-2">
                      {item.tag}
                    </span>
                    <h3 className="text-sm font-bold text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* POS & KOT Software Feature Spotlight */}
        <section className="py-16 md:py-24 border-t border-[#E0EEE0] dark:border-border/80 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#228B22]/20 bg-[#E0EEE0] dark:bg-primary/20 px-3.5 py-1 text-xs font-semibold text-[#185e18] dark:text-[#8ce68c] mb-4 shadow-2xs">
                <Monitor className="h-3.5 w-3.5 text-[#228B22]" />
                Restaurant &amp; Dining SaaS
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                POS &amp; KOT Software:{" "}
                <span className="text-[#228B22] dark:text-[#3cd43c]">
                  Lightning-Fast Restaurant Billing &amp; Kitchen Workflows
                </span>
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                Eliminate order delays, lost paper tickets, and communication friction between dining room captains and kitchen staff. High-speed table-side ordering, instant Kitchen Display System (KDS) routing, and cloud-synchronized billing.
              </p>
            </div>

            {/* POS & KOT Grid (Reversed: Points Left, UI Preview Right on lg) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: High-Value Readable Points */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 order-2 lg:order-1">
                {[
                  {
                    title: "Real-Time KOT Dispatch",
                    desc: "Orders punched on waiter tablets immediately reflect on station-specific Kitchen Display Systems (KDS) or thermal printers, cutting order prep wait times by up to 35%.",
                    tag: "Kitchen Routing",
                  },
                  {
                    title: "Dynamic Table Map & Floor Layout",
                    desc: "Interactive color-coded table maps give captains and cashiers real-time visibility into vacant, seated, food-served, and billing tables to maximize floor turn rates.",
                    tag: "Floor Operations",
                  },
                  {
                    title: "High-Speed Split & UPI Billing",
                    desc: "Split checks by item or guest in seconds. Accept dynamic UPI QR, cards, and cash with automated CGST/SGST tax calculations and high-speed thermal printing.",
                    tag: "Billing Engine",
                  },
                  {
                    title: "Ingredient & Recipe Depletion",
                    desc: "Link recipe bills of materials (BOM) to each menu item. Stock automatically deducts upon every order, preventing kitchen shortages and unrecorded ingredient theft.",
                    tag: "Recipe & Inventory",
                  },
                  {
                    title: "Waiter PIN Security & Shifts",
                    desc: "Every waiter and captain logs in with an individual PIN. Track individual server sales, tips, voids, cancellations, and shift-end cash drawer balances.",
                    tag: "Access Control",
                  },
                  {
                    title: "Daily Sales & Peak Auditing",
                    desc: "Instantly audit daily gross receipts, best-selling menu items, peak hourly dining rushes, and table turnover trends from any smartphone or tablet.",
                    tag: "Auditing & Analytics",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col p-4 rounded-xl border border-[#E0EEE0] dark:border-border/70 bg-card hover:border-[#228B22]/40 transition-all hover:shadow-md"
                  >
                    <span className="inline-block self-start rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-[#185e18] dark:text-[#8ce68c] mb-2">
                      {item.tag}
                    </span>
                    <h3 className="text-sm font-bold text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Right Column: Authentic UI Mockup Preview */}
              <div className="lg:col-span-6 flex flex-col gap-4 order-1 lg:order-2">
                <div className="relative group overflow-hidden rounded-2xl border border-[#E0EEE0] dark:border-border bg-card shadow-2xl">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between border-b border-border/80 bg-muted/60 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">app.inwora.com/pos-kot</span>
                    <span className="rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-[#185e18] dark:text-[#8ce68c]">
                      Live SaaS
                    </span>
                  </div>

                  <img
                    src="/assets/projects/pos-kot.jpg"
                    alt="POS & KOT Restaurant Order and Kitchen Workflow Interface"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />

                  {/* Highlights Floating Overlay */}
                  <div className="p-4 bg-card/95 backdrop-blur-sm border-t border-border/80 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-muted/40">
                      <p className="font-bold text-foreground">Sub-Second KOT</p>
                      <p className="text-[11px] text-muted-foreground">Direct Kitchen Routing</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/40">
                      <p className="font-bold text-foreground">Interactive Tables</p>
                      <p className="text-[11px] text-muted-foreground">Live Occupancy Status</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/40">
                      <p className="font-bold text-foreground">Fast Billing</p>
                      <p className="text-[11px] text-muted-foreground">Split Bills &amp; Thermal</p>
                    </div>
                  </div>
                </div>

                {/* Direct CTA under image */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    size="lg"
                    onClick={() => handleRequestDemo("POS & KOT Software")}
                    className="brand-btn-primary rounded-full px-6 gap-2 h-11 text-xs sm:text-sm font-semibold cursor-pointer shadow-md"
                  >
                    <Calendar className="h-4 w-4" />
                    Request a POS &amp; KOT Demo
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleEnquiry("POS & KOT Software")}
                    className="brand-btn-secondary rounded-full px-6 gap-2 h-11 text-xs sm:text-sm font-semibold cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Restaurant Tech Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Construction Management Feature Spotlight */}
        <section className="py-16 md:py-24 border-t border-[#E0EEE0] dark:border-border/80 bg-gradient-to-b from-[#E0EEE0]/20 via-background to-background dark:from-[#228B22]/10 dark:via-background dark:to-background">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#228B22]/20 bg-[#E0EEE0] dark:bg-primary/20 px-3.5 py-1 text-xs font-semibold text-[#185e18] dark:text-[#8ce68c] mb-4 shadow-2xs">
                <HardHat className="h-3.5 w-3.5 text-[#228B22]" />
                Infrastructure &amp; Site Operations ERP
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Construction Management:{" "}
                <span className="text-[#228B22] dark:text-[#3cd43c]">
                  Every Site Account, Material &amp; Movement in One Step
                </span>
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                Stop losing capital to untracked site expenses, phantom material loss, and undocumented labour claims. Inwora Construction Management centralizes multi-site accounts, material indents, contractor billing, and project milestones into a single synchronized ledger.
              </p>
            </div>

            {/* Construction Grid (Image Left, Points Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Authentic UI Mockup Preview */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="relative group overflow-hidden rounded-2xl border border-[#E0EEE0] dark:border-border bg-card shadow-2xl">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between border-b border-border/80 bg-muted/60 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">construction.inwora.com</span>
                    <span className="rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-[#185e18] dark:text-[#8ce68c]">
                      Live SaaS
                    </span>
                  </div>

                  <img
                    src="/assets/projects/construction-crm.jpg"
                    alt="Construction Site Project Management and Expense Ledger Interface"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />

                  {/* Highlights Floating Overlay */}
                  <div className="p-4 bg-card/95 backdrop-blur-sm border-t border-border/80 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-muted/40">
                      <p className="font-bold text-foreground">Multi-Site Ledger</p>
                      <p className="text-[11px] text-muted-foreground">Live Cash Audits</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/40">
                      <p className="font-bold text-foreground">Material Indents</p>
                      <p className="text-[11px] text-muted-foreground">Cement &amp; Steel Tracking</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/40">
                      <p className="font-bold text-foreground">Daily Muster</p>
                      <p className="text-[11px] text-muted-foreground">Labour &amp; Contractor Pay</p>
                    </div>
                  </div>
                </div>

                {/* Direct CTA under image */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    size="lg"
                    onClick={() => handleRequestDemo("Construction Management")}
                    className="brand-btn-primary rounded-full px-6 gap-2 h-11 text-xs sm:text-sm font-semibold cursor-pointer shadow-md"
                  >
                    <Calendar className="h-4 w-4" />
                    Request Construction ERP Demo
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleEnquiry("Construction Management")}
                    className="brand-btn-secondary rounded-full px-6 gap-2 h-11 text-xs sm:text-sm font-semibold cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Site Accounting Consultation
                  </Button>
                </div>
              </div>

              {/* Right Column: High-Value Readable Points */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Multi-Site Petty Cash & Ledgers",
                    desc: "Centralize remote project cash accounts, supervisor imprest funds, fuel vouchers, and emergency site purchases into an unalterable digital ledger with receipt uploads.",
                    tag: "Site Accounts",
                  },
                  {
                    title: "Material Indents & Indent Orders",
                    desc: "Site engineers raise digital purchase requests for cement, structural steel, aggregates, and electricals. Compare POs against delivery challans to prevent invoice fraud.",
                    tag: "Material Control",
                  },
                  {
                    title: "Daily Labour Muster & Contractor Pay",
                    desc: "Log daily headcounts for masons, bar benders, carpenters, and helpers. Compute contractor wages accurately while eliminating ghost worker claims.",
                    tag: "Workforce Management",
                  },
                  {
                    title: "Measurement Books (MB) & Retention",
                    desc: "Record verified on-site work measurements against contract milestones. Generate running account (RA) bills with automated retention money and TDS deductions.",
                    tag: "Contractor Billing",
                  },
                  {
                    title: "Physical vs Financial Progress",
                    desc: "Compare actual site milestone completion against budgeted financial expenditure to identify project schedule slips and cost overruns before they escalate.",
                    tag: "Milestone Tracking",
                  },
                  {
                    title: "Machinery Runtime & Diesel Logs",
                    desc: "Track operating runtime, idling hours, diesel fuel consumption, and preventive service schedules for excavators, batching plants, transit mixers, and cranes.",
                    tag: "Plant & Machinery",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col p-4 rounded-xl border border-[#E0EEE0] dark:border-border/70 bg-card hover:border-[#228B22]/40 transition-all hover:shadow-md"
                  >
                    <span className="inline-block self-start rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-[#185e18] dark:text-[#8ce68c] mb-2">
                      {item.tag}
                    </span>
                    <h3 className="text-sm font-bold text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Factory Management Feature Spotlight */}
        <section className="py-16 md:py-24 border-t border-[#E0EEE0] dark:border-border/80 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#228B22]/20 bg-[#E0EEE0] dark:bg-primary/20 px-3.5 py-1 text-xs font-semibold text-[#185e18] dark:text-[#8ce68c] mb-4 shadow-2xs">
                <Factory className="h-3.5 w-3.5 text-[#228B22]" />
                Manufacturing &amp; MES Operations
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Factory Management:{" "}
                <span className="text-[#228B22] dark:text-[#3cd43c]">
                  Raw Material to Dispatch in a Single Click
                </span>
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                Gain complete transparency across your production line. Track raw material intake, stage-by-stage work-in-progress (WIP), quality checkpoints, machine runtimes, and digital gate passes from one industrial command center.
              </p>
            </div>

            {/* Factory Grid (Reversed: Points Left, UI Preview Right on lg) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: High-Value Readable Points */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 order-2 lg:order-1">
                {[
                  {
                    title: "Raw Intake & Batch Formulation",
                    desc: "Record incoming supplier raw materials with batch codes, test certificates, and expiration dates. Allocate verified lots directly into active production work orders.",
                    tag: "Raw Inventory",
                  },
                  {
                    title: "Multi-Stage WIP Pipeline",
                    desc: "Monitor products moving through mixing, machining, heat treatment, assembly, and packaging. Pinpoint throughput bottlenecks across workstations in real time.",
                    tag: "Production Flow",
                  },
                  {
                    title: "In-Line Quality Checkpoints",
                    desc: "Enforce strict quality checkpoint checklists before any batch advances to subsequent production phases. Log rejection codes, rework instructions, and defect logs.",
                    tag: "Quality Assurance",
                  },
                  {
                    title: "Machine Runtime & OEE Audits",
                    desc: "Log operating machine hours, unplanned mechanical stoppages, and scheduled preventive maintenance intervals to improve Overall Equipment Effectiveness (OEE).",
                    tag: "Machine Maintenance",
                  },
                  {
                    title: "1-Click Gate Pass & Dispatch",
                    desc: "Generate barcode packing labels, carton dispatch lists, GST delivery challans, and commercial gate passes the moment finished goods exit the packing floor.",
                    tag: "Dispatch & Logistics",
                  },
                  {
                    title: "Unit Batch Costing & Yield",
                    desc: "Compute real manufacturing cost-per-unit factoring in raw materials, machine electricity, operator labour hours, and scrap wastage percentages.",
                    tag: "Cost Accounting",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col p-4 rounded-xl border border-[#E0EEE0] dark:border-border/70 bg-card hover:border-[#228B22]/40 transition-all hover:shadow-md"
                  >
                    <span className="inline-block self-start rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-[#185e18] dark:text-[#8ce68c] mb-2">
                      {item.tag}
                    </span>
                    <h3 className="text-sm font-bold text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Right Column: Authentic UI Mockup Preview */}
              <div className="lg:col-span-6 flex flex-col gap-4 order-1 lg:order-2">
                <div className="relative group overflow-hidden rounded-2xl border border-[#E0EEE0] dark:border-border bg-card shadow-2xl">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between border-b border-border/80 bg-muted/60 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">factory.inwora.com</span>
                    <span className="rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-[#185e18] dark:text-[#8ce68c]">
                      Live SaaS
                    </span>
                  </div>

                  <img
                    src="/assets/projects/factory-automation.jpg"
                    alt="Factory Manufacturing Execution System and Production Pipeline Interface"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />

                  {/* Highlights Floating Overlay */}
                  <div className="p-4 bg-card/95 backdrop-blur-sm border-t border-border/80 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-muted/40">
                      <p className="font-bold text-foreground">Batch Pipeline</p>
                      <p className="text-[11px] text-muted-foreground">Raw Material to Dispatch</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/40">
                      <p className="font-bold text-foreground">In-Line QC</p>
                      <p className="text-[11px] text-muted-foreground">Stage-Gate Inspection</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/40">
                      <p className="font-bold text-foreground">1-Click Dispatch</p>
                      <p className="text-[11px] text-muted-foreground">Digital Challan &amp; Gate Pass</p>
                    </div>
                  </div>
                </div>

                {/* Direct CTA under image */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    size="lg"
                    onClick={() => handleRequestDemo("Factory Management")}
                    className="brand-btn-primary rounded-full px-6 gap-2 h-11 text-xs sm:text-sm font-semibold cursor-pointer shadow-md"
                  >
                    <Calendar className="h-4 w-4" />
                    Request a Factory ERP Demo
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleEnquiry("Factory Management")}
                    className="brand-btn-secondary rounded-full px-6 gap-2 h-11 text-xs sm:text-sm font-semibold cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Plant Workflow Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Architecture & Value Highlights */}
        <section className="py-12 border-t border-border/60 bg-muted/20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 p-5 rounded-2xl border border-[#E0EEE0] dark:border-border bg-card">
                <div className="h-10 w-10 rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Turnkey & Rapid Deployment</h3>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Pre-engineered software stacks ready for instant setup, reducing onboarding time from months to days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl border border-[#E0EEE0] dark:border-border bg-card">
                <div className="h-10 w-10 rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] flex items-center justify-center flex-shrink-0">
                  <Cloud className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Reliable Cloud Infrastructure</h3>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Hosted on secure cloud environments with multi-tenant data isolation and high uptime guarantees.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl border border-[#E0EEE0] dark:border-border bg-card">
                <div className="h-10 w-10 rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Continuous SLA & Updates</h3>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Ongoing platform maintenance, security patches, and direct developer support for uninterrupted operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* White-Label & Enterprise Customization Banner */}
        <section className="py-16 border-y border-[#E0EEE0] dark:border-border bg-gradient-to-b from-[#E0EEE0]/30 to-background dark:from-[#228B22]/10 dark:to-background">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-3.5 py-1 text-xs font-semibold text-[#185e18] dark:text-[#8ce68c] mb-4">
              <Sparkles className="h-3.5 w-3.5 text-[#228B22]" />
              Custom Enterprise Deployment
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Need a custom white-label deployment for{" "}
              <span className="text-[#228B22] dark:text-[#3cd43c]">your brand?</span>
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground max-w-xl mx-auto">
              Every INWORA product can be rebranded with your company logo, configured with your custom domain, integrated with your existing ERP/CRM databases, and deployed on dedicated infrastructure.
            </p>
            <div className="mt-8 flex justify-center">
              <Button size="lg" onClick={handleWhiteLabelEnquiry} className="brand-btn-primary rounded-full px-8 h-12 gap-2 text-sm font-semibold cursor-pointer">
                Contact sales for white-label
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
      <WhatsAppButton />

      <ProductDetailsDialog
        product={activeProduct}
        open={activeProduct !== null}
        onOpenChange={(open) => !open && setActiveProduct(null)}
      />
    </div>
  );
}
