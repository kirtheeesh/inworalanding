import { useParams, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  ArrowLeft, Download, ExternalLink, PlayCircle, Check, FileText,
  Monitor, Smartphone, ChevronDown, ChevronLeft, ChevronRight,
  Layers, Cpu, ShieldCheck, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ApiError, fetchProject } from "@/lib/api";
import { BannerSlider } from "@/components/ui/banner-slider";
import { cn } from "@/lib/utils";

const mobileSlideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
  }),
};

/** Phone mockup gallery shown when Mobile View is active. */
function MobileGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 py-20 text-sm text-muted-foreground">
        No mobile screenshots uploaded yet.
      </div>
    );
  }

  const goPrev = () => {
    setDirection(-1);
    setActive((curr) => (curr - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setDirection(1);
    setActive((curr) => (curr + 1) % images.length);
  };

  const goTo = (i: number) => {
    if (i === active) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 45) {
      goPrev();
    } else if (diff < -45) {
      goNext();
    }
    touchStartX.current = null;
  };

  return (
    <div className="py-2">
      {/* Phone carousel with flanking Previous and Next arrow buttons */}
      <div className="relative flex items-center justify-center gap-3 sm:gap-8">
        {images.length > 1 && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous screenshot"
            className="group flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-lg backdrop-blur transition-all duration-200 hover:scale-110 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex-shrink-0 cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:-translate-x-0.5" />
          </button>
        )}

        {/* Large phone frame */}
        <div
          className="relative w-[260px] sm:w-[280px] rounded-[3rem] border-[6px] border-foreground/85 bg-foreground/85 shadow-2xl select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Speaker / Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 h-2.5 w-14 rounded-full bg-background/50 z-10" />

          {/* Screen content with slide animation */}
          <div className="overflow-hidden rounded-[2.4rem] bg-black mt-1 h-[480px] sm:h-[520px] relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={active}
                src={images[active]}
                custom={direction}
                variants={mobileSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeInOut" }}
                alt={`${alt} — screenshot ${active + 1} of ${images.length}`}
                className="h-full w-full object-cover object-top select-none pointer-events-none"
                draggable={false}
              />
            </AnimatePresence>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center py-2.5">
            <div className="h-1.5 w-12 rounded-full bg-background/60" />
          </div>

          {/* Counter badge */}
          {images.length > 1 && (
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground shadow-md">
              {active + 1} / {images.length}
            </span>
          )}
        </div>

        {images.length > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Next screenshot"
            className="group flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-lg backdrop-blur transition-all duration-200 hover:scale-110 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex-shrink-0 cursor-pointer"
          >
            <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {/* Dot indicators below */}
      {images.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to screenshot ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                i === active
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-border hover:bg-muted-foreground/40"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Dropdown to switch between Web View and Mobile View. */
function ViewToggle({
  views,
  active,
  onChange,
}: {
  views: Array<{ key: "web" | "mobile"; label: string; icon: React.ReactNode }>;
  active: "web" | "mobile";
  onChange: (v: "web" | "mobile") => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = views.find((v) => v.key === active)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (views.length <= 1) return null;

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        id="view-toggle-btn"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted/60 focus:outline-none cursor-pointer"
      >
        {current.icon}
        {current.label}
        <ChevronDown
          className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-20 mt-1.5 min-w-[180px] overflow-hidden rounded-xl border border-border bg-popover shadow-lg"
          >
            {views.map((v) => (
              <button
                key={v.key}
                type="button"
                onClick={() => { onChange(v.key); setOpen(false); }}
                className={cn(
                  "flex w-full items-center gap-2.5 px-4 py-3 text-sm transition hover:bg-muted/60 cursor-pointer",
                  v.key === active && "bg-primary/10 font-semibold text-primary"
                )}
              >
                {v.icon}
                {v.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [activeView, setActiveView] = useState<"web" | "mobile">("web");

  const { data: project, isPending, isError, error } = useQuery({
    queryKey: ["projects", id],
    queryFn: () => fetchProject(id!),
    enabled: Boolean(id),
    retry: (failureCount, err) =>
      !(err instanceof ApiError && err.status === 404) && failureCount < 2,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Dynamic SEO meta tags for project case study
  useEffect(() => {
    if (!project) return;
    const originalTitle = document.title;
    document.title = `${project.title} — Case Study | Inwora Technologies`;

    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc?.getAttribute("content") ?? "";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        project.desc || `${project.title} technical case study, architecture, and engineering overview by Inwora Technologies.`
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
    canonical.setAttribute("href", `https://inwora.com/portfolio/${project.id}`);

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
  }, [project]);

  // Auto-select the first available view when project loads.
  useEffect(() => {
    if (!project) return;
    if (project.showWebView) {
      setActiveView("web");
    } else if (project.showMobileView) {
      setActiveView("mobile");
    }
  }, [project]);

  const handleRequestQuote = () => {
    if (!project) return;
    const msg = `Hello INWORA! I am interested in a custom solution similar to the "${project.title}" case study. I'd like to request a quote.`;
    window.open(`https://wa.me/919025728998?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1 pt-28 md:pt-36 pb-20">
          <div className="container mx-auto px-4 md:px-8 space-y-6">
            <div className="h-6 w-48 rounded bg-muted animate-pulse" />
            <div className="h-[38vh] w-full rounded-2xl bg-muted animate-pulse" />
            <div className="h-9 w-2/3 rounded bg-muted animate-pulse" />
            <div className="h-4 w-full rounded bg-muted animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    const notFound = error instanceof ApiError && error.status === 404;

    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <div className="flex flex-1 items-center justify-center px-6 py-28">
          <div className="text-center max-w-md">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h1 className="text-2xl font-bold text-foreground">
              {notFound ? "Case Study Not Found" : "We couldn't load this project"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {notFound
                ? "The requested portfolio case study might have been relocated or updated."
                : error.message}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button onClick={() => setLocation("/portfolio")} className="rounded-full brand-btn-primary h-10 px-6 text-sm">
                Return to Portfolio
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Build the available views list from project flags.
  const availableViews = [
    project.showWebView && {
      key: "web" as const,
      label: "Web View",
      icon: <Monitor className="h-4 w-4" />,
    },
    project.showMobileView && {
      key: "mobile" as const,
      label: "Mobile View",
      icon: <Smartphone className="h-4 w-4" />,
    },
  ].filter(Boolean) as Array<{ key: "web" | "mobile"; label: string; icon: React.ReactNode }>;

  const hasMultipleViews = availableViews.length > 1;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <button
              onClick={() => setLocation("/")}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-muted-foreground/60">/</span>
            <button
              onClick={() => setLocation("/portfolio")}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Portfolio
            </button>
            <span className="text-muted-foreground/60">/</span>
            <span className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-md">
              {project.title}
            </span>
          </nav>

          {/* Back Action */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              className="-ml-2 h-9 gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => setLocation("/portfolio")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to portfolio
            </Button>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#185e18] dark:text-[#8ce68c] hover:underline"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#228B22] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#228B22]" />
                </span>
                Active Production Deployment
              </a>
            )}
          </div>

          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-b border-border/60 pb-8"
          >
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-3 py-1 text-xs font-semibold text-[#185e18] dark:text-[#8ce68c]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#228B22]" />
                {project.category}
              </span>
              {project.liveUrl && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#228B22]/30 bg-background px-2.5 py-0.5 text-[11px] font-medium text-[#185e18] dark:text-[#8ce68c]">
                  Live System
                </span>
              )}
            </div>

            <h1 className="max-w-3xl text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.08] tracking-tight text-foreground">
              {project.title}
            </h1>

            {project.desc && (
              <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                {project.desc}
              </p>
            )}

            {project.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">
                  Stack:
                </span>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[#E0EEE0] dark:border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground/80 shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* View toggle + preview banner */}
          {availableViews.length > 0 && (
            <div className="mt-8 space-y-5">
              {/* Toggle header row */}
              {hasMultipleViews && (
                <div className="flex items-center gap-3">
                  <ViewToggle
                    views={availableViews}
                    active={activeView}
                    onChange={setActiveView}
                  />
                  <span className="text-xs text-muted-foreground">
                    {activeView === "web" ? "Desktop view & banner gallery" : "Mobile device UI walkthrough"}
                  </span>
                </div>
              )}

              {/* View content */}
              <AnimatePresence mode="wait">
                {activeView === "web" && project.showWebView && (
                  <motion.div
                    key="web"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BannerSlider
                      images={project.banners?.length ? project.banners : [project.banner]}
                      alt={project.title}
                      className="aspect-[16/10] sm:aspect-[16/9] rounded-2xl shadow-md border border-[#E0EEE0] dark:border-border"
                    />
                  </motion.div>
                )}

                {activeView === "mobile" && project.showMobileView && (
                  <motion.div
                    key="mobile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center"
                  >
                    <div className="w-full max-w-3xl">
                      <MobileGallery images={project.mobileBanners} alt={project.title} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Main Content Layout */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Left Column (Overview, Features, Demo) */}
            <div className="lg:col-span-2 space-y-12">
              {/* Project Overview */}
              <section>
                <div className="brand-structure-bar mb-4">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">Project Overview</h2>
                </div>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                    {project.fullDesc || project.desc}
                  </p>
                </div>
              </section>

              {/* Technology Stack & Architecture Details */}
              {project.tags.length > 0 && (
                <section>
                  <div className="brand-structure-bar mb-5">
                    <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
                      <Cpu className="h-5 w-5 text-[#228B22]" />
                      Technology Stack
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {project.tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-2.5 rounded-xl border border-[#E0EEE0] dark:border-border/60 bg-card p-3 shadow-2xs"
                      >
                        <div className="h-2 w-2 rounded-full bg-[#228B22]" />
                        <span className="text-sm font-medium text-foreground">{tag}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Key Features */}
              {project.features.length > 0 && (
                <section>
                  <div className="brand-structure-bar mb-5">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      Key Capabilities & Deliverables
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {project.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 rounded-xl border border-[#E0EEE0] dark:border-border/60 bg-card p-4 shadow-2xs hover:border-[#228B22]/40 transition-colors"
                      >
                        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] mt-0.5">
                          <Check className="h-3 w-3 stroke-[2.5]" />
                        </div>
                        <span className="text-sm font-medium text-foreground/90 leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Video Demo (if available) */}
              {((project.videoType === "youtube" && project.videoUrl) ||
                (project.videoType === "upload" && project.videoFileUrl)) && (
                <section>
                  <div className="brand-structure-bar mb-5">
                    <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
                      <PlayCircle className="h-5 w-5 text-[#228B22]" />
                      Working Demo
                    </h2>
                  </div>
                  <div className="aspect-video w-full overflow-hidden rounded-2xl border border-[#E0EEE0] dark:border-border bg-muted shadow-md">
                    {project.videoType === "youtube" ? (
                      <iframe
                        className="h-full w-full"
                        src={project.videoUrl!}
                        title={`${project.title} demo`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        className="h-full w-full"
                        src={project.videoFileUrl!}
                        controls
                        playsInline
                        preload="metadata"
                      />
                    )}
                  </div>
                </section>
              )}

              {/* Cross-link to Portfolio */}
              <div className="rounded-2xl border border-[#E0EEE0] dark:border-border bg-gradient-to-r from-[#E0EEE0]/30 to-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-foreground">Explore more technical solutions</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Discover how Inwora builds bespoke software for varied industry domains.
                  </p>
                </div>
                <Button
                  onClick={() => setLocation("/portfolio")}
                  variant="outline"
                  className="rounded-full brand-btn-secondary gap-2 text-xs font-semibold h-10 px-5 flex-shrink-0 cursor-pointer"
                >
                  View all projects
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Right Column (Sticky Technical Sidebar) */}
            <div>
              <div className="sticky top-24 space-y-5">
                {/* Live System Card */}
                {project.liveUrl && (
                  <div className="rounded-2xl bg-gradient-to-br from-[#228B22] via-[#1d7b1d] to-[#155e15] p-6 text-white shadow-lg shadow-[#228B22]/15">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                      </span>
                      <span className="text-xs uppercase font-bold tracking-wider text-white/90">
                        Live Production
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">Experience it live</h3>
                    <p className="mt-1.5 text-sm text-white/85 leading-relaxed">
                      Interact with the live application deployment in real time.
                    </p>
                    <Button
                      variant="secondary"
                      className="mt-5 w-full rounded-full bg-[#E0EEE0] hover:bg-white text-[#165b16] font-semibold h-11 cursor-pointer transition-colors shadow-sm"
                      onClick={() => window.open(project.liveUrl!, "_blank")}
                    >
                      Visit live system
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* PDF Presentation Card */}
                {project.pdfUrl && (
                  <button
                    onClick={() => window.open(project.pdfUrl!, "_blank")}
                    className="group w-full rounded-2xl border border-[#E0EEE0] dark:border-border bg-card p-6 text-left transition-all hover:border-[#228B22]/50 hover:shadow-md cursor-pointer"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22]">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">Project presentation</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      Download the technical specifications, architectural diagrams, and project deck.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#228B22]">
                      Download PDF deck
                      <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    </span>
                  </button>
                )}

                {/* Engineering Consultation Card */}
                <div className="rounded-2xl border border-[#E0EEE0] dark:border-border bg-card p-6 shadow-2xs">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] mb-3">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">Discuss a similar solution</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    Looking to build an enterprise platform or automate your operations with modern architecture?
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-foreground/85 border-t border-border/60 pt-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-[#228B22]" />
                      Full code & IP ownership
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-[#228B22]" />
                      Confidential NDA protection
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-[#228B22]" />
                      Direct senior developer consultation
                    </li>
                  </ul>

                  <Button
                    onClick={handleRequestQuote}
                    className="mt-5 w-full brand-btn-primary rounded-full h-11 font-semibold text-xs sm:text-sm cursor-pointer"
                  >
                    Request technical estimate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

