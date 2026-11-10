import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  ArrowRight, Briefcase, Rocket, Layout, LayoutGrid,
  Search, X, ExternalLink, CheckCircle2, ShieldCheck,
  Layers, Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { resolveIcon, FALLBACK_PROJECTS, type Project } from "@/lib/portfolio-data";
import { fetchProjects } from "@/lib/api";
import { cn } from "@/lib/utils";

const ALL_CATEGORY = "All Projects";

const CATEGORY_ORDER = [
  "All Projects",
  "Business Software",
  "E-commerce & Retail",
  "Food & Beverage",
  "Jewellery",
  "Hospitality",
  "Business Websites",
];

const portfolioPillars = [
  {
    icon: Rocket,
    title: "Architectural Rigor",
    desc: "Clean, strictly-typed codebases engineered for performance, maintainability, and enterprise scalability.",
  },
  {
    icon: Briefcase,
    title: "Business Value Driven",
    desc: "Every system, screen, and database schema is crafted to solve real operational bottlenecks and create measurable advantages.",
  },
  {
    icon: ShieldCheck,
    title: "Production Reliability",
    desc: "Thorough testing, automated smoke verification, and production-tested architectures built for high availability.",
  },
];

export default function Portfolio() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const projects = data && data.length > 0 ? data : FALLBACK_PROJECTS;

  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo(0, 0);

    // Primary SEO Metadata
    document.title = "Our Work & Technical Expertise | Inwora Portfolio";

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://inwora.com/portfolio");

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Explore selected projects across Business Software, E-commerce, Food & Beverage, Jewellery, Hospitality, and Business Websites demonstrating Inwora's software engineering expertise."
      );
    }
  }, []);

  // Compute categories from distinct values in the actual project records in defined order
  const categories = useMemo(() => {
    if (!projects) return [];
    const counts = new Map<string, number>();
    for (const p of projects) {
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    }
    const list = [
      { name: ALL_CATEGORY, count: projects.length },
      ...Array.from(counts, ([name, count]) => ({ name, count })),
    ];
    return list.sort((a, b) => {
      const idxA = CATEGORY_ORDER.indexOf(a.name);
      const idxB = CATEGORY_ORDER.indexOf(b.name);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [projects]);

  // Combined Category + Search Filter
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORY || p.category === activeCategory;

      const matchesSearch =
        query === "" ||
        p.title.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleClearFilters = () => {
    setActiveCategory(ALL_CATEGORY);
    setSearchQuery("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-28 md:pt-36 pb-24">
        <div className="container mx-auto px-4 md:px-8">
          {/* Organic Mint Wave Accents */}
          <div className="relative">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -left-12 w-80 md:w-[28rem] text-[#E0EEE0]/80 dark:text-[#228B22]/10 z-0 opacity-80"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-50 -50 C120 -20 190 70 170 180 C150 290 80 340 -50 370 Z"
                fill="currentColor"
              />
            </svg>

            {/* Page Header Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl relative z-10"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#228B22]/20 bg-[#E0EEE0]/80 dark:bg-[#228B22]/15 px-3.5 py-1 text-xs font-semibold text-[#185e18] dark:text-[#8ce68c] mb-4">
                <Code2 className="h-3.5 w-3.5 text-[#228B22]" />
                Selected Case Studies &amp; Technical Work
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-foreground">
                Our Work &amp;{" "}
                <span className="text-[#228B22] dark:text-[#3cd43c]">Technical Expertise</span>
              </h1>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                Explore selected projects that demonstrate our approach to software development, business applications, automation and technology solutions.
              </p>
            </motion.div>
          </div>

          {/* Pillars Strip */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioPillars.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-[#E0EEE0] dark:border-border/60 bg-card p-6 shadow-2xs hover:shadow-md hover:border-[#228B22]/40 transition-all duration-200"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22]">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 text-base font-bold text-foreground">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Portfolio Listing Header */}
          <div className="mt-20">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/80 pb-5">
              <div className="brand-structure-bar">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                  Featured Projects
                </h2>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mt-0.5">
                  Production Systems &amp; Bespoke Builds
                </p>
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects or technologies..."
                  className="w-full rounded-full border border-[#E0EEE0] dark:border-border bg-card pl-10 pr-9 py-2 text-xs sm:text-sm text-foreground outline-none transition-colors focus:border-[#228B22] focus:ring-2 focus:ring-[#228B22]/20"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Chips */}
            {categories.length > 1 && (
              <div className="mb-10 -mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
                <div className="flex items-center gap-2 md:flex-wrap">
                  {categories.map(({ name, count }) => {
                    const active = activeCategory === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setActiveCategory(name)}
                        aria-pressed={active}
                        className={cn(
                          "inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all cursor-pointer",
                          active
                            ? "brand-btn-primary shadow-md"
                            : "border border-[#E0EEE0] dark:border-border bg-card text-muted-foreground hover:border-[#228B22]/40 hover:text-foreground"
                        )}
                      >
                        {name === ALL_CATEGORY && <LayoutGrid className="h-3.5 w-3.5" />}
                        {name}
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[11px] font-semibold leading-none",
                            active
                              ? "bg-white/20 text-white"
                              : "bg-[#E0EEE0] dark:bg-muted text-[#165b16] dark:text-muted-foreground"
                          )}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Loading skeleton */}
            {isPending && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-[#E0EEE0] dark:border-border bg-card overflow-hidden"
                  >
                    <div className="aspect-[16/9] w-full bg-muted animate-pulse" />
                    <div className="p-6 space-y-4">
                      <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                      <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
                      <div className="h-4 w-full rounded bg-muted animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error state */}
            {isError && projects.length === 0 && (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-10 text-center">
                <h3 className="mb-1 text-lg font-semibold text-foreground">
                  We couldn't load the portfolio
                </h3>
                <p className="text-sm text-muted-foreground">{error.message}</p>
              </div>
            )}

            {/* Empty state — no projects in category or matching query */}
            {!isPending && filteredProjects.length === 0 && (
              <div className="rounded-2xl border border-border bg-card p-12 text-center max-w-lg mx-auto">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">No matching projects found</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {searchQuery
                    ? `No projects found matching "${searchQuery}". Try a different search term or reset your filters.`
                    : `No projects found in category "${activeCategory}".`}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full brand-btn-secondary"
                  onClick={handleClearFilters}
                >
                  Show all projects
                </Button>
              </div>
            )}

            {/* Projects Grid */}
            {!isPending && filteredProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((project, i) => {
                  const Icon = resolveIcon(project.icon);
                  const hasImgError = imageErrors[project.id];
                  const hasBanner = Boolean(project.banner) && !hasImgError;

                  return (
                    <Link key={project.id} href={`/portfolio/${project.id}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.25) }}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E0EEE0] dark:border-border/70 bg-card transition-all duration-300 hover:border-[#228B22]/50 hover:shadow-xl hover:shadow-[#228B22]/5 hover:-translate-y-1 cursor-pointer"
                        data-testid={`portfolio-card-${project.id}`}
                      >
                        {/* Cover Image or Branded Graphical Placeholder */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                          {hasBanner ? (
                            <img
                              src={project.banner}
                              alt={`${project.title} cover image`}
                              loading="lazy"
                              onError={() => handleImageError(project.id)}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#E0EEE0]/60 via-background to-[#E0EEE0]/30 p-6 text-center">
                              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E0EEE0] text-[#228B22] mb-3 shadow-xs">
                                <Icon className="h-7 w-7" />
                              </div>
                              <span className="text-xs font-semibold uppercase tracking-wider text-[#165b16]">
                                {project.category}
                              </span>
                              <span className="text-sm font-bold text-foreground mt-1 max-w-xs">
                                {project.title}
                              </span>
                            </div>
                          )}

                          {/* Category Badge overlay on top-right */}
                          <div className="absolute top-3 right-3">
                            <span className="rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold tracking-wide text-foreground shadow-2xs border border-border/70">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="flex flex-1 flex-col p-6 sm:p-7">
                          <div className="mb-4 flex items-start justify-between gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] group-hover:scale-105 transition-transform">
                              <Icon className="h-5 w-5" />
                            </div>
                            {project.liveUrl && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#E0EEE0]/60 px-2.5 py-0.5 text-[10px] font-semibold text-[#185e18]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#228B22]" />
                                Live System
                              </span>
                            )}
                          </div>

                          <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-[#228B22]">
                            {project.title}
                          </h3>
                          <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted-foreground flex-1">
                            {project.desc}
                          </p>

                          {/* Technologies & CTA Bar */}
                          <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/60">
                            <div className="flex flex-wrap gap-1.5">
                              {project.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-md border border-[#E0EEE0] dark:border-border bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 3 && (
                                <span className="text-[10px] font-medium text-muted-foreground self-center pl-0.5">
                                  +{project.tags.length - 3}
                                </span>
                              )}
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#228B22] group-hover:translate-x-1 transition-transform">
                              View Project <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom CTA Box */}
          <div className="relative overflow-hidden mt-24 rounded-3xl border border-[#228B22]/30 bg-gradient-to-br from-[#228B22] via-[#1d7b1d] to-[#155e15] p-10 md:p-14 text-center text-white shadow-xl shadow-[#228B22]/15">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-sm mb-4">
                Let's Build Together
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Have a vision for your next project?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/85 text-base md:text-lg leading-relaxed">
                Let's collaborate to engineer something extraordinary. Our team is ready to turn your ideas into market-leading digital products with transparent milestone delivery.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <Button
                  size="lg"
                  className="rounded-full bg-[#E0EEE0] hover:bg-white text-[#165b16] font-semibold px-8 h-12 shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://wa.me/919025728998?text=Hello%20INWORA!%20I%20have%20a%20project%20in%20mind%20and%20would%20like%20to%20discuss%20requirements.",
                      "_blank"
                    )
                  }
                  data-testid="portfolio-cta-btn"
                >
                  Start a Conversation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
