import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, Package, Palette, Cpu, Cloud, Layers,
  Users, UserCheck, Database, Sliders, ShoppingBag, Globe,
  GraduationCap, Calculator, Sparkles, Receipt, Activity,
  Factory, Compass, HardHat 
} from "lucide-react";

const categories = [
  { id: "all", label: "All Solutions" },
  { id: "saas", label: "Enterprise & SaaS" },
  { id: "custom", label: "Web & Custom Dev" },
  { id: "automation", label: "Smart Automation" },
];

const services = [
  // Core Capabilities & Existing Services
  {
    icon: Smartphone,
    title: "Custom Mobile App Development",
    desc: "End-to-end Android and iOS development tailored to your business goals. From concept to launch with beautiful, performant apps.",
    color: "text-primary dark:text-blue-500",
    bg: "bg-primary/10 dark:bg-blue-500/10",
    border: "hover:border-primary/40 dark:hover:border-blue-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-blue-500/10",
    gradient: "from-primary to-primary/70 dark:from-blue-500 dark:to-blue-600",
    category: "custom",
  },
  {
    icon: Package,
    title: "SaaS Product Development",
    desc: "Subscription-based software platforms built for scale. We architect multi-tenant, revenue-generating products from the ground up.",
    color: "text-primary dark:text-indigo-500",
    bg: "bg-primary/10 dark:bg-indigo-500/10",
    border: "hover:border-primary/40 dark:hover:border-indigo-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-indigo-500/10",
    gradient: "from-primary to-primary/70 dark:from-indigo-500 dark:to-indigo-600",
    category: "saas",
  },
  {
    icon: Palette,
    title: "UI/UX Design for Apps",
    desc: "Interfaces that users love — intuitive, visually premium, and conversion-optimized. Every pixel has a purpose.",
    color: "text-primary dark:text-purple-500",
    bg: "bg-primary/10 dark:bg-purple-500/10",
    border: "hover:border-primary/40 dark:hover:border-purple-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-purple-500/10",
    gradient: "from-primary to-primary/70 dark:from-purple-500 dark:to-purple-600",
    category: "custom",
  },
  {
    icon: Cpu,
    title: "Business Automation Solutions",
    desc: "Streamline operations with intelligent workflows. Reduce manual effort, eliminate errors, and let software run your business logic.",
    color: "text-primary dark:text-teal-500",
    bg: "bg-primary/10 dark:bg-teal-500/10",
    border: "hover:border-primary/40 dark:hover:border-teal-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-teal-500/10",
    gradient: "from-primary to-primary/70 dark:from-teal-500 dark:to-teal-600",
    category: "automation",
  },
  {
    icon: Cloud,
    title: "Cloud-Ready App Deployment",
    desc: "Infrastructure that scales with you. Deploy with confidence on modern cloud platforms with CI/CD, monitoring, and zero-downtime releases.",
    color: "text-primary dark:text-cyan-500",
    bg: "bg-primary/10 dark:bg-cyan-500/10",
    border: "hover:border-primary/40 dark:hover:border-cyan-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-cyan-500/10",
    gradient: "from-primary to-primary/70 dark:from-cyan-500 dark:to-cyan-600",
    category: "custom",
  },
  {
    icon: Layers,
    title: "Subscription Product Architecture",
    desc: "Design and implement scalable subscription systems — billing, plan management, feature gating, and growth-ready product infrastructure.",
    color: "text-primary dark:text-emerald-500",
    bg: "bg-primary/10 dark:bg-emerald-500/10",
    border: "hover:border-primary/40 dark:hover:border-emerald-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-emerald-500/10",
    gradient: "from-primary to-primary/70 dark:from-emerald-500 dark:to-emerald-600",
    category: "custom",
  },

  // New Services & Applications
  {
    icon: Users,
    title: "CRM Solutions",
    desc: "Manage customer relationships, sales pipelines, and sales teams efficiently with custom CRM solutions built to fit your exact workflow.",
    color: "text-primary dark:text-rose-500",
    bg: "bg-primary/10 dark:bg-rose-500/10",
    border: "hover:border-primary/40 dark:hover:border-rose-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-rose-500/10",
    gradient: "from-primary to-primary/70 dark:from-rose-500 dark:to-rose-600",
    category: "saas",
  },
  {
    icon: UserCheck,
    title: "LMS (Lead Management System)",
    desc: "Track, capture, and nurture leads from acquisition to conversion. Optimise your sales funnel and empower your team with intelligent tracking.",
    color: "text-primary dark:text-violet-500",
    bg: "bg-primary/10 dark:bg-violet-500/10",
    border: "hover:border-primary/40 dark:hover:border-violet-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-violet-500/10",
    gradient: "from-primary to-primary/70 dark:from-violet-500 dark:to-violet-600",
    category: "saas",
  },
  {
    icon: Database,
    title: "ERP Systems",
    desc: "Integrate all facets of your business — from inventory and production planning to HR and operations — into a unified, powerful enterprise portal.",
    color: "text-primary dark:text-orange-500",
    bg: "bg-primary/10 dark:bg-orange-500/10",
    border: "hover:border-primary/40 dark:hover:border-orange-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-orange-500/10",
    gradient: "from-primary to-primary/70 dark:from-orange-500 dark:to-orange-600",
    category: "saas",
  },
  {
    icon: Sliders,
    title: "CMS (Admin Customisable Website)",
    desc: "Take absolute control of your web content. Empower non-technical admins to easily update, publish, and manage website content on the fly.",
    color: "text-primary dark:text-sky-500",
    bg: "bg-primary/10 dark:bg-sky-500/10",
    border: "hover:border-primary/40 dark:hover:border-sky-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-sky-500/10",
    gradient: "from-primary to-primary/70 dark:from-sky-500 dark:to-sky-600",
    category: "custom",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce Platforms",
    desc: "Launch high-converting online storefronts equipped with catalogs, cart management, secure gateway integrations, and seamless user checkouts.",
    color: "text-primary dark:text-emerald-500",
    bg: "bg-primary/10 dark:bg-emerald-500/10",
    border: "hover:border-primary/40 dark:hover:border-emerald-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-emerald-500/10",
    gradient: "from-primary to-primary/70 dark:from-emerald-500 dark:to-emerald-600",
    category: "custom",
  },
  {
    icon: Globe,
    title: "Websites (All Types)",
    desc: "Stunning corporate sites, high-impact landing pages, and bespoke web apps designed and developed to elevate your brand presence globally.",
    color: "text-primary dark:text-indigo-500",
    bg: "bg-primary/10 dark:bg-indigo-500/10",
    border: "hover:border-primary/40 dark:hover:border-indigo-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-indigo-500/10",
    gradient: "from-primary to-primary/70 dark:from-indigo-500 dark:to-indigo-600",
    category: "custom",
  },
  {
    icon: GraduationCap,
    title: "SCROM (LMS Learning Management)",
    desc: "SCORM-compliant e-learning platforms for universities, corporate training, and schools. Deliver standardized, trackable courses.",
    color: "text-primary dark:text-pink-500",
    bg: "bg-primary/10 dark:bg-pink-500/10",
    border: "hover:border-primary/40 dark:hover:border-pink-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-pink-500/10",
    gradient: "from-primary to-primary/70 dark:from-pink-500 dark:to-pink-600",
    category: "saas",
  },
  {
    icon: Calculator,
    title: "AMS (Accounts Management)",
    desc: "Track income, expenses, invoices, general ledgers, and tax compliance. Maintain clean financial clarity with secure custom tools.",
    color: "text-primary dark:text-amber-500",
    bg: "bg-primary/10 dark:bg-amber-500/10",
    border: "hover:border-primary/40 dark:hover:border-amber-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-amber-500/10",
    gradient: "from-primary to-primary/70 dark:from-amber-500 dark:to-amber-600",
    category: "saas",
  },
  {
    icon: Sparkles,
    title: "Automated Gold Poster App",
    desc: "Auto-generate beautiful gold-themed promotional posters for jewelry shops and retailers in real-time with automatic pricing updates.",
    color: "text-primary dark:text-yellow-500",
    bg: "bg-primary/10 dark:bg-yellow-500/10",
    border: "hover:border-primary/40 dark:hover:border-yellow-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-yellow-500/10",
    gradient: "from-primary to-primary/70 dark:from-yellow-500 dark:to-yellow-600",
    category: "automation",
  },
  {
    icon: Receipt,
    title: "POS & KOT for Restaurants",
    desc: "Point-of-Sale billing coupled with real-time Kitchen Order Ticket displays. Engineered to streamline operations for dining and kitchen staff.",
    color: "text-primary dark:text-red-500",
    bg: "bg-primary/10 dark:bg-red-500/10",
    border: "hover:border-primary/40 dark:hover:border-red-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-red-500/10",
    gradient: "from-primary to-primary/70 dark:from-red-500 dark:to-red-600",
    category: "automation",
  },
  {
    icon: Activity,
    title: "Hospital Management App",
    desc: "Bespoke healthcare systems to manage patient records, appointments, doctors' schedules, billing, and pharmacy inventory.",
    color: "text-primary dark:text-teal-500",
    bg: "bg-primary/10 dark:bg-teal-500/10",
    border: "hover:border-primary/40 dark:hover:border-teal-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-teal-500/10",
    gradient: "from-primary to-primary/70 dark:from-teal-500 dark:to-teal-600",
    category: "automation",
  },
  {
    icon: Factory,
    title: "Automated Factory App",
    desc: "Automate manufacturing workflows. Monitor machinery data, run quality checks, track orders, and coordinate factory floors digitally.",
    color: "text-primary dark:text-zinc-500",
    bg: "bg-primary/10 dark:bg-zinc-500/10",
    border: "hover:border-primary/40 dark:hover:border-zinc-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-zinc-500/10",
    gradient: "from-primary to-primary/70 dark:from-zinc-500 dark:to-zinc-600",
    category: "automation",
  },
  {
    icon: Compass,
    title: "Travel Budget Application",
    desc: "Manage itineraries, log multi-currency travel expenses, and optimize budget limits. Perfect for corporate travel tracking.",
    color: "text-primary dark:text-cyan-500",
    bg: "bg-primary/10 dark:bg-cyan-500/10",
    border: "hover:border-primary/40 dark:hover:border-cyan-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-cyan-500/10",
    gradient: "from-primary to-primary/70 dark:from-cyan-500 dark:to-cyan-600",
    category: "automation",
  },
  {
    icon: HardHat,
    title: "Construction CRM",
    desc: "Tailored CRM for contractors and builders. Manage client bids, project sites, material procurement, and site updates in one hub.",
    color: "text-primary dark:text-lime-500",
    bg: "bg-primary/10 dark:bg-lime-500/10",
    border: "hover:border-primary/40 dark:hover:border-lime-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-lime-500/10",
    gradient: "from-primary to-primary/70 dark:from-lime-500 dark:to-lime-600",
    category: "saas",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.2 } 
  }
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = services.filter(
    (service) => activeCategory === "all" || service.category === activeCategory
  );

  return (
    <section id="services" className="relative overflow-hidden py-24 md:py-32">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4"
          >
            Our Expertise
          </motion.span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground"
            style={{ fontFamily: "var(--app-font-display)" }}
          >
            What We Do
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            From modern SaaS systems and enterprise portals to intelligent automation applications — we build software that drives real growth.
          </p>
        </motion.div>

        {/* Category Tabs Filter */}
        <div className="flex flex-row md:flex-wrap overflow-x-auto md:overflow-x-visible no-scrollbar justify-start md:justify-center gap-2 md:gap-3 mb-12 pb-3 md:pb-0 px-4 md:px-0 max-w-full">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 flex-shrink-0 ${
                  isActive
                    ? "text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground border border-border bg-card hover:text-foreground hover:border-muted-foreground/30"
                }`}
                style={{ fontFamily: "var(--app-font-display)" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                key={service.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 25px 50px -12px rgba(var(--primary), 0.15)",
                  borderColor: "rgba(var(--primary), 0.3)" 
                }}
                className={`group relative flex flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-500 overflow-hidden ${service.glow}`}
                data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {/* Decorative background circle */}
                <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full ${service.bg} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500`} />

                {/* Icon */}
                <motion.div 
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${service.bg} transition-all duration-500 shadow-sm group-hover:shadow-md`}
                >
                  <service.icon className={`h-7 w-7 ${service.color}`} />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "var(--app-font-display)" }}>
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 group-hover:text-foreground/80 transition-colors duration-300">
                  {service.desc}
                </p>

                {/* Arrow link */}
                <div className={`mt-6 flex items-center gap-2 text-sm font-bold ${service.color} opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300`}>
                  See our approach
                  <span className="transition-transform group-hover:translate-x-1.5 duration-300">→</span>
                </div>

                {/* Vertical accent bar */}
                <div className={`absolute top-0 left-0 bottom-0 w-[4px] bg-gradient-to-b ${service.gradient} scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
