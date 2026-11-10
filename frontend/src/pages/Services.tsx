import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench, Code2, Users, ShieldCheck, Database, Server,
  Globe, Cpu, CheckCircle2, ArrowRight, MessageCircle,
  Calendar, Terminal, ChevronDown, ChevronUp, Check,
  Layers, GitBranch, RefreshCw, Sparkles, Building2,
  HardHat, Store, Smartphone, Laptop, Zap, CheckCheck
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "919025728998";
const waLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

// ── Service Categories Filter Tabs ─────────────────────────────
type FilterCategory = "all" | "core-dev" | "maintenance-qa" | "systems-ops";

interface ServiceItem {
  id: string;
  icon: typeof Wrench;
  title: string;
  badge: string;
  category: FilterCategory;
  desc: string;
  ctaText: string;
  ctaQuery: string;
  toolBadge?: string;
  disclaimer?: string;
  keyCapabilities: string[];
  additionalCapabilities: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: "maintenance-support",
    icon: Wrench,
    title: "Application Maintenance & Support Services",
    badge: "Ongoing Reliability",
    category: "maintenance-qa",
    desc: "Keep your existing applications reliable, secure and up to date with ongoing technical support, bug fixes and continuous improvements.",
    ctaText: "Discuss Maintenance Requirements",
    ctaQuery: "Hello INWORA! I would like to discuss Application Maintenance & Support requirements for our software. Please share details on process and maintenance plans.",
    keyCapabilities: [
      "Bug fixing and issue resolution",
      "Application troubleshooting",
      "Dependency and security updates",
      "Performance optimization",
    ],
    additionalCapabilities: [
      "Database maintenance",
      "Feature enhancements",
      "Technical documentation",
      "Ongoing maintenance and support plans",
    ],
  },
  {
    id: "custom-software",
    icon: Code2,
    title: "Custom Software Development Services",
    badge: "Bespoke Engineering",
    category: "core-dev",
    desc: "Build and extend software applications tailored to your business workflows, product requirements and technical architecture.",
    ctaText: "Discuss Your Project",
    ctaQuery: "Hello INWORA! I would like to discuss a custom software development project. Please let me know how we can schedule an initial discovery call.",
    keyCapabilities: [
      "Web application development",
      "Frontend and backend development",
      "Admin panels and dashboards",
      "New modules and product features",
    ],
    additionalCapabilities: [
      "Database-driven applications",
      "Business process automation",
      "Application enhancements",
      "Responsive web interfaces",
    ],
  },
  {
    id: "it-outsourcing",
    icon: Users,
    title: "IT Outsourcing & Developer Augmentation Services",
    badge: "Capacity Augmentation",
    category: "core-dev",
    desc: "Extend your existing engineering capacity with flexible development support for specific projects, product enhancements and ongoing technical tasks.",
    ctaText: "Discuss Outsourcing Requirements",
    ctaQuery: "Hello INWORA! I would like to discuss IT outsourcing and developer augmentation requirements for our team.",
    disclaimer: "Engagements are subject to resource availability and confirmed project scope.",
    keyCapabilities: [
      "Project-based development",
      "Developer augmentation",
      "Remote development support",
      "Feature and module development",
    ],
    additionalCapabilities: [
      "Additional engineering capacity",
      "Technical collaboration with existing teams",
      "Defined-scope delivery engagements",
    ],
  },
  {
    id: "qa-test-automation",
    icon: ShieldCheck,
    title: "QA & Test Automation Services",
    badge: "Reliability & Quality",
    category: "maintenance-qa",
    desc: "Improve software reliability and release confidence through structured testing, automated checks and clear defect reporting.",
    ctaText: "Discuss Testing Requirements",
    ctaQuery: "Hello INWORA! I would like to discuss QA and test automation requirements for our web application.",
    toolBadge: "Includes DoSmokeTest CLI — our in-house automated smoke testing & regression check tool",
    keyCapabilities: [
      "Manual functional testing",
      "Regression testing",
      "Browser compatibility testing",
      "Website smoke testing",
    ],
    additionalCapabilities: [
      "Broken-link and navigation checks",
      "API and network response checks",
      "JavaScript error detection",
      "Test reports and release validation",
      "CI/CD test integration where supported",
    ],
  },
  {
    id: "api-database-integration",
    icon: Database,
    title: "API, Database & Integration Services",
    badge: "Connectivity & Data",
    category: "systems-ops",
    desc: "Connect applications, streamline data exchange and maintain reliable communication between your software systems.",
    ctaText: "Discuss Integration Requirements",
    ctaQuery: "Hello INWORA! I would like to discuss API development and database integration requirements for our platform.",
    keyCapabilities: [
      "REST API development",
      "API integration and maintenance",
      "Third-party service integration",
      "Payment gateway integration",
    ],
    additionalCapabilities: [
      "Webhook implementation",
      "Database design and optimization",
      "Data migration and import/export",
      "Authentication and access-control integration",
      "Reporting and data-processing workflows",
    ],
  },
  {
    id: "deployment-tech-ops",
    icon: Server,
    title: "Deployment & Technical Operations",
    badge: "Release & DevOps",
    category: "systems-ops",
    desc: "Support application releases and routine technical operations to help keep your software environments properly configured and maintainable.",
    ctaText: "Discuss Deployment Support",
    ctaQuery: "Hello INWORA! I would like to discuss application deployment and technical operations support for our stack.",
    disclaimer: "Standard deployment, hosting maintenance, CI/CD setup and release documentation for your production stack.",
    keyCapabilities: [
      "Application deployment",
      "Hosting and environment configuration",
      "Domain and SSL configuration",
      "Deployment troubleshooting",
    ],
    additionalCapabilities: [
      "CI/CD pipeline setup",
      "Application logs and monitoring",
      "Database backup configuration",
      "Release and environment documentation",
    ],
  },
  {
    id: "website-cms-ecommerce",
    icon: Globe,
    title: "Website, CMS & E-commerce Development",
    badge: "Web Platforms",
    category: "core-dev",
    desc: "Develop professional websites and online business platforms with responsive interfaces and manageable content.",
    ctaText: "Discuss Website Requirements",
    ctaQuery: "Hello INWORA! I would like to discuss website and CMS/e-commerce development requirements.",
    keyCapabilities: [
      "Corporate and business websites",
      "Landing pages",
      "CMS and admin-editable content",
      "Blog and content management",
    ],
    additionalCapabilities: [
      "E-commerce applications",
      "Website redesign and modernization",
      "Forms and lead-generation workflows",
      "Website maintenance and updates",
    ],
  },
  {
    id: "crm-erp-automation",
    icon: Cpu,
    title: "CRM, ERP & Business Automation",
    badge: "Business Systems",
    category: "systems-ops",
    desc: "Simplify business operations with custom business applications, integrated workflows and centralized management systems.",
    ctaText: "Discuss Business Automation",
    ctaQuery: "Hello INWORA! I would like to discuss CRM, ERP and business automation solutions for our operations.",
    keyCapabilities: [
      "CRM customization",
      "Lead and customer management",
      "ERP and business workflow customization",
      "Billing and inventory applications",
    ],
    additionalCapabilities: [
      "Business dashboards and reporting",
      "Notification and messaging integrations",
      "Workflow automation",
      "Custom internal business tools",
    ],
  },
];

// ── Section 3: How We Work (5 Steps) ───────────────────────────
const workflowSteps = [
  {
    step: "01",
    title: "Understand",
    summary: "Identify your application, business needs and technical challenges.",
    details: "We start by analyzing your application architecture, operational bottlenecks, sprint priorities and desired business outcomes.",
  },
  {
    step: "02",
    title: "Scope",
    summary: "Define deliverables, priorities, timelines and responsibilities.",
    details: "Together we establish transparent milestone scopes, deliverables, communication channels, and milestone review gates.",
  },
  {
    step: "03",
    title: "Execute",
    summary: "Develop, maintain, integrate or test the agreed solution.",
    details: "Our engineers build, test and optimize according to clean architectural practices, using version-controlled commits and regular updates.",
  },
  {
    step: "04",
    title: "Validate",
    summary: "Verify the work and address identified issues.",
    details: "Rigorous quality checks, automated smoke tests with DoSmokeTest CLI, code reviews and issue resolution ensure release stability.",
  },
  {
    step: "05",
    title: "Support",
    summary: "Provide agreed handover, documentation and ongoing assistance.",
    details: "Complete code handover, environment documentation, and ongoing maintenance retainers to keep your systems operating smoothly.",
  },
];

// ── Section 4: Flexible Engagement Models (4 Models) ───────────
const engagementOptions = [
  {
    id: "fixed-scope",
    badge: "Milestone-Driven",
    title: "Fixed-Scope Projects",
    desc: "Ideal for clearly defined deliverables, new product features, system integrations or greenfield applications.",
    points: [
      "Transparent milestone deliverables and agreed timeline",
      "Defined budget with structured approval gates",
      "Bi-weekly progress demos and incremental reviews",
      "100% intellectual property & source code handover",
    ],
    ctaText: "Enquire for Fixed-Scope",
    query: "Hello INWORA! I would like to discuss a Fixed-Scope Project engagement.",
  },
  {
    id: "application-maintenance",
    badge: "Ongoing Care",
    title: "Monthly Application Maintenance",
    desc: "Ideal for existing web applications and portals needing consistent maintenance, security patches, bug fixes and routine tuning.",
    points: [
      "Bug fixing, issue resolution and error troubleshooting",
      "Dependency, framework, and security patch upkeep",
      "Database maintenance, indexing and backup verification",
      "Allocated monthly hours for minor feature enhancements",
    ],
    ctaText: "Enquire for Maintenance",
    query: "Hello INWORA! I would like to discuss Monthly Application Maintenance plans.",
  },
  {
    id: "developer-augmentation",
    badge: "Capacity Augmentation",
    title: "Developer Augmentation",
    desc: "Extend your engineering capacity with flexible development support for specific projects, technical tasks, or tight deadlines.",
    points: [
      "Remote engineering support integrated with your team",
      "Direct technical collaboration with your tech lead or PM",
      "Focus on feature delivery, refactoring, or backlog clearance",
      "Engagements confirmed based on scope and resource availability",
    ],
    ctaText: "Enquire for Augmentation",
    query: "Hello INWORA! I would like to enquire about Developer Augmentation.",
  },
  {
    id: "qa-testing",
    badge: "Release Validation",
    title: "QA & Testing Assignments",
    desc: "Structured quality assurance cycles to test functional flows, verify releases, and detect regressions before production launch.",
    points: [
      "Manual functional testing across core user journeys",
      "Automated website smoke testing with DoSmokeTest CLI",
      "Cross-browser and viewport compatibility checks",
      "Clear defect reports, reproduction steps & release sign-offs",
    ],
    ctaText: "Enquire for QA & Testing",
    query: "Hello INWORA! I would like to discuss QA & Testing Assignments.",
  },
];

// ── Section 5: Technologies & Capabilities ──────────────────────
const techStackGroups = [
  {
    title: "Frontend Development",
    desc: "Modern, responsive and strictly typed web interfaces.",
    skills: ["React 19", "TypeScript", "JavaScript (ESNext)", "Tailwind CSS", "Vite", "HTML5 & CSS3"],
  },
  {
    title: "Backend & APIs",
    desc: "Maintainable business logic, robust services and integrations.",
    skills: ["PHP (8+)", "Node.js", "RESTful APIs", "Webhooks", "JSON Services", "Authentication"],
  },
  {
    title: "Databases & Storage",
    desc: "Structured storage, optimized queries and reliable data handling.",
    skills: ["MySQL", "MariaDB", "Relational Schema Design", "Query Optimization", "Data Migrations"],
  },
  {
    title: "Quality Assurance & Testing",
    desc: "Systematic release verification and automated smoke checking.",
    skills: ["DoSmokeTest CLI", "Playwright", "Automated Smoke Tests", "API Endpoint Verification", "Defect Logging"],
  },
  {
    title: "Deployment & Operations",
    desc: "Reliable environments, deployment troubleshooting and release workflows.",
    skills: ["Git & GitHub", "Linux (Apache / Nginx)", "cPanel & VPS", "SSL & Domain Setup", "Release Docs"],
  },
];

// ── Who We Serve Strip ──────────────────────────────────────────
const clientTypes = [
  {
    icon: Laptop,
    title: "Software & SaaS Companies",
    desc: "Feature sprints, routine maintenance, QA automation, and backlog resolution for active software products.",
  },
  {
    icon: Zap,
    title: "Startups & Emerging Ventures",
    desc: "Translating wireframes and business roadmaps into clean, production-ready web applications on realistic timelines.",
  },
  {
    icon: Layers,
    title: "Digital Agencies & Dev Teams",
    desc: "Flexible engineering collaboration and augmentation to meet client milestones with reliable technical execution.",
  },
  {
    icon: Building2,
    title: "Growing Businesses & SMEs",
    desc: "Digitizing manual operations, maintaining internal portals, and automating CRM/ERP business workflows.",
  },
];

// ── Structured Data Definitions for SEO (Schema.org) ────────────
const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://inwora.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://inwora.com/services"
    }
  ]
};

const servicesCatalogueStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Inwora Technologies — IT Services & Software Solutions",
  "description": "B2B software development, application maintenance, QA test automation, IT outsourcing and API integrations.",
  "url": "https://inwora.com/services",
  "itemListElement": servicesData.map((svc, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Service",
      "name": svc.title,
      "description": svc.desc,
      "provider": {
        "@type": "Organization",
        "name": "Inwora Technologies",
        "url": "https://inwora.com"
      },
      "areaServed": {
        "@type": "Country",
        "name": "India"
      }
    }
  }))
};

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo(0, 0);

    // ── Primary SEO Metadata ─────────────────────────────────────
    document.title = "IT Services & Software Development Company in India | Inwora";

    const setMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        if (isProperty) el.setAttribute("property", name);
        else el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Remove obsolete meta keywords if present (as it is not used by Google)
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) keywordsMeta.remove();

    // Concise, unique meta description
    setMeta(
      "description",
      "Explore Inwora's software development, application maintenance, QA automation, IT outsourcing and API integration services for businesses across Tamil Nadu."
    );

    // Canonical tag (ensuring no self-conflicting or duplicate canonical tags)
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", "https://inwora.com/services");

    // Open Graph Metadata
    setMeta("og:title", "IT Services & Software Development Company in Tamil Nadu | Inwora", true);
    setMeta("og:description", "Explore Inwora's software development, application maintenance, QA automation, IT outsourcing and API integration services for businesses across Tamil Nadu.", true);
    setMeta("og:url", "https://inwora.com/services", true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "Inwora Technologies", true);
    setMeta("og:locale", "en_IN", true);
    setMeta("og:image", "https://inwora.com/opengraph.jpg", true);

    // Twitter Card Metadata
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "IT Services & Software Development Company in Tamil Nadu | Inwora");
    setMeta("twitter:description", "Explore Inwora's software development, application maintenance, QA automation, IT outsourcing and API integration services for businesses across Tamil Nadu.");
    setMeta("twitter:image", "https://inwora.com/opengraph.jpg");

    // ── Structured Data Injection (JSON-LD) ──────────────────────
    const breadcrumbScriptId = "inwora-services-breadcrumb-jsonld";
    let breadcrumbScript = document.getElementById(breadcrumbScriptId) as HTMLScriptElement | null;
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement("script");
      breadcrumbScript.id = breadcrumbScriptId;
      breadcrumbScript.type = "application/ld+json";
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbStructuredData);

    const servicesScriptId = "inwora-services-catalogue-jsonld";
    let servicesScript = document.getElementById(servicesScriptId) as HTMLScriptElement | null;
    if (!servicesScript) {
      servicesScript = document.createElement("script");
      servicesScript.id = servicesScriptId;
      servicesScript.type = "application/ld+json";
      document.head.appendChild(servicesScript);
    }
    servicesScript.textContent = JSON.stringify(servicesCatalogueStructuredData);

    return () => {
      // Clean up injected structured data when navigating away
      document.getElementById(breadcrumbScriptId)?.remove();
      document.getElementById(servicesScriptId)?.remove();
    };
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenConsultation = (query: string) => {
    window.open(waLink(query), "_blank");
  };

  const handleScheduleDemo = () => {
    window.dispatchEvent(new CustomEvent("open-schedule-demo"));
  };

  const filteredServices = servicesData.filter((svc) => {
    if (activeFilter === "all") return true;
    return svc.category === activeFilter;
  });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* ── SECTION 1: SERVICES HERO & SEMANTIC H1 ───────────── */}
        <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 border-b border-border bg-gradient-to-b from-[#E0EEE0]/35 via-background to-background dark:from-[#228B22]/10 dark:via-background dark:to-background">
          {/* Organic Mint Wave Accents */}
          <svg
            aria-hidden="true"
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
            aria-hidden="true"
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
            aria-hidden="true"
            className="pointer-events-none absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#E0EEE0]/60 dark:bg-[#228B22]/10 blur-3xl -z-10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-40 right-10 w-80 h-80 rounded-full bg-[#E0EEE0]/50 dark:bg-[#228B22]/10 blur-3xl -z-10"
          />

          <div className="container relative z-10 mx-auto px-4 md:px-8 text-center max-w-4xl">
            {/* Semantic Positioning Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#228B22]/20 bg-[#E0EEE0]/80 dark:bg-[#228B22]/15 px-4 py-1.5 text-xs font-semibold text-[#185e18] dark:text-[#8ce68c] mb-6"
            >
              <Building2 className="h-3.5 w-3.5 text-[#228B22]" />
              Software Development, Application Maintenance &amp; IT Outsourcing Partner
            </motion.div>

            {/* Primary Semantic H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]"
            >
              IT Services, Software Development{" "}
              <span className="text-[#228B22] dark:text-[#3cd43c] block sm:inline">
                &amp; Application Support
              </span>
            </motion.h1>

            {/* Keyword-Rich, Natural Introductory Content */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto"
            >
              Inwora Technologies is a B2B IT services company in India providing custom software development, application maintenance and support services, software development outsourcing, and QA test automation for software product companies, SaaS businesses, startups, and growing enterprises. From developer augmentation and web application development services to API integration and technical operations, we help businesses build, stabilize, test, and scale their digital products with transparent milestone delivery.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
            >
              <Button
                size="lg"
                onClick={() => handleOpenConsultation("Hello INWORA! I would like to discuss our software development and IT service requirements.")}
                className="brand-btn-primary rounded-full px-7 gap-2 shadow-md h-12 text-sm font-semibold cursor-pointer"
                data-testid="hero-primary-cta"
              >
                <MessageCircle className="h-4 w-4" />
                Discuss a Project
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a href="#service-categories">
                <Button
                  size="lg"
                  variant="outline"
                  className="brand-btn-secondary rounded-full px-6 gap-2 h-12 text-sm font-semibold cursor-pointer"
                  data-testid="hero-secondary-cta"
                >
                  Explore Our Services
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </a>
            </motion.div>

            {/* Trust Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-8 border-t border-border/70 text-left"
            >
              <div className="flex items-center gap-2.5 rounded-xl bg-card p-3 border border-[#E0EEE0] dark:border-border shadow-2xs">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-foreground/90 leading-tight">100% Client Code &amp; IP Ownership</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-card p-3 border border-[#E0EEE0] dark:border-border shadow-2xs">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-foreground/90 leading-tight">Transparent Defined Scopes</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-card p-3 border border-[#E0EEE0] dark:border-border shadow-2xs">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-foreground/90 leading-tight">Structured QA &amp; Testing Checks</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-card p-3 border border-[#E0EEE0] dark:border-border shadow-2xs">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-foreground/90 leading-tight">Ongoing Support &amp; Retainers</span>
              </div>
            </motion.div>

            {/* Quick Section Jump Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs"
            >
              <span className="text-muted-foreground font-medium mr-1">Jump to section:</span>
              <a
                href="#service-categories"
                className="inline-flex items-center rounded-full border border-[#E0EEE0] dark:border-border bg-card px-3.5 py-1 font-medium text-foreground/85 hover:border-[#228B22] hover:text-[#228B22] transition-colors"
              >
                01. Services
              </a>
              <a
                href="#who-we-serve"
                className="inline-flex items-center rounded-full border border-[#E0EEE0] dark:border-border bg-card px-3.5 py-1 font-medium text-foreground/85 hover:border-[#228B22] hover:text-[#228B22] transition-colors"
              >
                02. Who We Help
              </a>
              <a
                href="#how-we-work"
                className="inline-flex items-center rounded-full border border-[#E0EEE0] dark:border-border bg-card px-3.5 py-1 font-medium text-foreground/85 hover:border-[#228B22] hover:text-[#228B22] transition-colors"
              >
                03. How We Work
              </a>
              <a
                href="#engagement-models"
                className="inline-flex items-center rounded-full border border-[#E0EEE0] dark:border-border bg-card px-3.5 py-1 font-medium text-foreground/85 hover:border-[#228B22] hover:text-[#228B22] transition-colors"
              >
                04. Engagement Models
              </a>
              <a
                href="#technologies"
                className="inline-flex items-center rounded-full border border-[#E0EEE0] dark:border-border bg-card px-3.5 py-1 font-medium text-foreground/85 hover:border-[#228B22] hover:text-[#228B22] transition-colors"
              >
                05. Technologies
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 2: SERVICE CATEGORIES (8 SERVICES) ───────── */}
        <section id="service-categories" className="py-20 md:py-28 border-b border-border scroll-mt-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#228B22]">Our Core Services</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Software Development, Maintenance &amp; <span className="text-[#228B22] dark:text-[#3cd43c]">IT Services</span>
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Explore our full spectrum of custom software development, application maintenance, quality assurance and technical operations capabilities tailored for modern businesses.
              </p>

              {/* Category Filter Pills */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                    activeFilter === "all"
                      ? "brand-btn-primary shadow-xs"
                      : "border border-[#E0EEE0] dark:border-border bg-card text-muted-foreground hover:text-foreground"
                  )}
                >
                  All Services (8)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("core-dev")}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                    activeFilter === "core-dev"
                      ? "brand-btn-primary shadow-xs"
                      : "border border-[#E0EEE0] dark:border-border bg-card text-muted-foreground hover:text-foreground"
                  )}
                >
                  Software &amp; Web Development
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("maintenance-qa")}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                    activeFilter === "maintenance-qa"
                      ? "brand-btn-primary shadow-xs"
                      : "border border-[#E0EEE0] dark:border-border bg-card text-muted-foreground hover:text-foreground"
                  )}
                >
                  Maintenance &amp; QA Testing
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("systems-ops")}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                    activeFilter === "systems-ops"
                      ? "brand-btn-primary shadow-xs"
                      : "border border-[#E0EEE0] dark:border-border bg-card text-muted-foreground hover:text-foreground"
                  )}
                >
                  APIs, Operations &amp; Automation
                </button>
              </div>
            </div>

            {/* 8 Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {filteredServices.map((service, idx) => {
                const isExpanded = !!expandedCards[service.id];
                return (
                  <motion.div
                    key={service.id}
                    id={service.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: (idx % 2) * 0.1 }}
                    className="group flex flex-col justify-between rounded-2xl border border-[#E0EEE0] dark:border-border bg-card p-6 sm:p-8 shadow-xs hover:border-[#228B22]/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] group-hover:scale-105 transition-all duration-200">
                          <service.icon className="h-6 w-6" />
                        </div>
                        <span className="rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-3 py-1 text-[11px] font-semibold text-[#185e18] dark:text-[#8ce68c]">
                          {service.badge}
                        </span>
                      </div>

                      {/* Semantic H3 */}
                      <h3 className="text-xl font-bold text-foreground mb-2.5 group-hover:text-[#228B22] transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-muted-foreground mb-5">
                        {service.desc}
                      </p>

                      {/* Tool Callout (e.g. DoSmokeTest CLI on QA card) */}
                      {service.toolBadge && (
                        <div className="mb-5 rounded-xl border border-[#228B22]/30 bg-[#E0EEE0]/50 dark:bg-primary/10 p-3 flex items-start gap-2.5 text-xs text-[#165b16] dark:text-[#8ce68c]">
                          <Terminal className="h-4 w-4 text-[#228B22] shrink-0 mt-0.5" />
                          <span className="font-medium leading-relaxed">{service.toolBadge}</span>
                        </div>
                      )}

                      {/* Disclaimer / Boundary Note */}
                      {service.disclaimer && (
                        <div className="mb-5 text-[11px] text-muted-foreground/90 italic bg-muted/40 rounded-lg px-3 py-2 border border-border/50">
                          Note: {service.disclaimer}
                        </div>
                      )}

                      {/* Visible Initial Capabilities (4 items) */}
                      <div className="border-t border-border/70 pt-4 mb-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-3">
                          Key Capabilities Included:
                        </p>
                        <ul className="space-y-2.5">
                          {service.keyCapabilities.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                              <CheckCircle2 className="h-4 w-4 text-[#228B22] flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expandable Additional Capabilities */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden mb-4"
                          >
                            <ul className="space-y-2.5 pt-1 border-t border-dashed border-border/60">
                              {service.additionalCapabilities.map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                                  <Check className="h-4 w-4 text-[#228B22] flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Expand Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleExpand(service.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#228B22] hover:text-[#176617] mb-5 cursor-pointer transition-colors"
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? (
                          <>
                            <span>Hide additional capabilities</span>
                            <ChevronUp className="h-3.5 w-3.5" />
                          </>
                        ) : (
                          <>
                            <span>View all capabilities (+{service.additionalCapabilities.length} more)</span>
                            <ChevronDown className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Card Action CTA */}
                    <div className="border-t border-border/70 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <Button
                        size="sm"
                        onClick={() => handleOpenConsultation(service.ctaQuery)}
                        className="brand-btn-primary rounded-full px-5 h-9 text-xs font-semibold gap-1.5 cursor-pointer shadow-xs w-full sm:w-auto"
                        data-testid={`btn-enquire-${service.id}`}
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        {service.ctaText}
                      </Button>
                      <button
                        type="button"
                        onClick={handleScheduleDemo}
                        className="text-xs text-muted-foreground hover:text-[#228B22] font-medium text-center transition-colors cursor-pointer"
                      >
                        Or schedule demo
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── WHO WE SERVE SECTION ─────────────────────────────── */}
        <section id="who-we-serve" className="py-20 md:py-24 bg-[#E0EEE0]/15 dark:bg-muted/10 border-b border-border scroll-mt-20">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#228B22]">Who We Partner With</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Who We Serve: <span className="text-[#228B22] dark:text-[#3cd43c]">Software Companies, Startups &amp; Growing Businesses</span>
              </h2>
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                We act as a practical extension to your technical leadership, product roadmaps and operational objectives.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {clientTypes.map((type) => (
                <div
                  key={type.title}
                  className="flex flex-col rounded-2xl border border-[#E0EEE0] dark:border-border bg-card p-6 shadow-xs hover:border-[#228B22]/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] mb-4">
                    <type.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{type.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {type.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: HOW WE WORK (5 STEPS) ──────────────────── */}
        <section id="how-we-work" className="py-20 md:py-28 border-b border-border scroll-mt-20">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#228B22]">Execution Process</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                How We Work: <span className="text-[#228B22] dark:text-[#3cd43c]">Structured Technical Delivery Process</span>
              </h2>
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                A simple, predictable five-step engineering workflow built on transparency, technical rigor and clear communication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-5">
              {workflowSteps.map((step) => (
                <div
                  key={step.step}
                  className="relative flex flex-col justify-between rounded-2xl border border-[#E0EEE0] dark:border-border bg-card p-6 shadow-xs hover:border-[#228B22]/50 hover:shadow-md transition-all duration-300"
                >
                  <div>
                    <span className="font-mono text-2xl font-black text-[#228B22] mb-3 block">
                      {step.step}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-xs font-semibold text-foreground/80 leading-relaxed mb-3">
                      {step.summary}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.details}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-1.5 text-[11px] font-medium text-[#228B22]">
                    <CheckCheck className="h-3.5 w-3.5" />
                    <span>Phase Milestone</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: FLEXIBLE ENGAGEMENT MODELS (4 MODELS) ─── */}
        <section id="engagement-models" className="py-20 md:py-28 bg-[#E0EEE0]/15 dark:bg-muted/10 border-b border-border scroll-mt-20">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#228B22]">Contractual Flexibility</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Flexible Engagement Models for <span className="text-[#228B22] dark:text-[#3cd43c]">Software &amp; IT Services</span>
              </h2>
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                Select the engagement structure that aligns with your timeline, budget constraints and technical roadmap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {engagementOptions.map((model) => (
                <div
                  key={model.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#E0EEE0] dark:border-border bg-card p-6 shadow-xs hover:border-[#228B22]/50 hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <span className="inline-block rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-3 py-1 text-[11px] font-semibold text-[#185e18] dark:text-[#8ce68c] mb-3">
                      {model.badge}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mb-2">{model.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                      {model.desc}
                    </p>

                    <div className="border-t border-border/70 pt-4 mb-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2.5">
                        Key Features
                      </p>
                      <ul className="space-y-2">
                        {model.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2 text-xs text-foreground/90 leading-tight">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#228B22] shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-border/70 pt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenConsultation(model.query)}
                      className="brand-btn-secondary w-full rounded-full gap-1.5 text-xs h-9 cursor-pointer"
                      data-testid={`btn-model-${model.id}`}
                    >
                      {model.ctaText}
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: TECHNOLOGIES & CAPABILITIES ───────────── */}
        <section id="technologies" className="py-20 md:py-28 border-b border-border scroll-mt-20">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#228B22]">Technical Competency</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Technologies &amp; <span className="text-[#228B22] dark:text-[#3cd43c]">Engineering Stack Supported</span>
              </h2>
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                We work strictly with robust, production-proven technologies that ensure long-term stability and maintainability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStackGroups.map((group) => (
                <div
                  key={group.title}
                  className="flex flex-col rounded-2xl border border-[#E0EEE0] dark:border-border bg-card p-6 shadow-xs hover:border-[#228B22]/50 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-base font-bold text-foreground mb-1">{group.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{group.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#E0EEE0] dark:border-border/80 bg-[#E0EEE0]/30 dark:bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground/90"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#228B22]" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: FINAL CTA ─────────────────────────────── */}
        <section id="contact-cta" className="py-20 md:py-28 bg-gradient-to-b from-background to-[#E0EEE0]/25 dark:to-muted/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#228B22] via-[#1a741a] to-[#124d12] px-6 py-14 text-center md:px-12 md:py-18 shadow-2xl text-white"
            >
              {/* Subtle background mesh */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.14]"
                style={{
                  backgroundImage: "radial-gradient(circle, #E0EEE0 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="relative z-10 mx-auto max-w-2xl">
                <span className="inline-block rounded-full bg-white/20 border border-white/25 px-4 py-1 text-xs font-semibold tracking-wide text-white mb-4">
                  Partner With Inwora
                </span>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
                  Looking for a Reliable IT Services Partner in India?
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-base md:text-lg leading-relaxed text-white/90">
                  Tell us about your application, project requirements or ongoing technical challenges. Let's explore how Inwora can help.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                  <Button
                    size="lg"
                    onClick={() => handleOpenConsultation("Hello INWORA! I would like to discuss our application requirements with your team.")}
                    className="rounded-full bg-[#E0EEE0] text-[#165b16] hover:bg-white hover:text-[#114b11] px-7 h-12 text-sm font-semibold shadow-md cursor-pointer transition-all"
                    data-testid="final-primary-cta"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Discuss Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleScheduleDemo}
                    className="rounded-full border border-white/40 bg-white/10 text-white hover:bg-white/20 px-6 h-12 text-sm font-semibold cursor-pointer"
                    data-testid="final-secondary-cta"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Contact Us
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-6 border-t border-white/15">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90 font-medium">
                    <Check className="h-4 w-4 text-[#E0EEE0]" />
                    Direct engineer consultation
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90 font-medium">
                    <Check className="h-4 w-4 text-[#E0EEE0]" />
                    Defined-scope delivery
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90 font-medium">
                    <Check className="h-4 w-4 text-[#E0EEE0]" />
                    100% intellectual property transfer
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
