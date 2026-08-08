import { useState } from "react";
import { motion } from "framer-motion";
import {
  Smartphone, Package, Palette, Cpu, Cloud, Layers,
  Users, UserCheck, Database, Sliders, ShoppingBag, Globe,
  GraduationCap, Calculator, Sparkles, Receipt, Activity,
  Factory, Compass, HardHat, ArrowRight,
} from "lucide-react";
import { SectionHeading } from "./_shared";

const categories = [
  { id: "all", label: "All solutions" },
  { id: "saas", label: "Enterprise & SaaS" },
  { id: "custom", label: "Web & custom dev" },
  { id: "automation", label: "Smart automation" },
];

const services = [
  { icon: Smartphone, title: "Custom Mobile App Development", desc: "End-to-end Android and iOS development tailored to your business goals — from concept to launch.", category: "custom" },
  { icon: Package, title: "SaaS Product Development", desc: "Subscription-based software platforms built for scale. Multi-tenant, revenue-generating products from the ground up.", category: "saas" },
  { icon: Palette, title: "UI/UX Design for Apps", desc: "Interfaces that users love — intuitive, visually premium, and conversion-optimized. Every pixel has a purpose.", category: "custom" },
  { icon: Cpu, title: "Business Automation Solutions", desc: "Streamline operations with intelligent workflows. Reduce manual effort and let software run your business logic.", category: "automation" },
  { icon: Cloud, title: "Cloud-Ready App Deployment", desc: "Infrastructure that scales with you — CI/CD, monitoring, and zero-downtime releases on modern cloud platforms.", category: "custom" },
  { icon: Layers, title: "Subscription Product Architecture", desc: "Billing, plan management, feature gating, and growth-ready product infrastructure, designed and implemented.", category: "custom" },
  { icon: Users, title: "CRM Solutions", desc: "Manage customer relationships, sales pipelines, and teams efficiently with a CRM built to fit your workflow.", category: "saas" },
  { icon: UserCheck, title: "Lead Management System", desc: "Track, capture, and nurture leads from acquisition to conversion. Optimise your sales funnel end to end.", category: "saas" },
  { icon: Database, title: "ERP Systems", desc: "Integrate inventory, production, HR, and operations into a unified, powerful enterprise portal.", category: "saas" },
  { icon: Sliders, title: "CMS (Customisable Website)", desc: "Empower non-technical admins to easily update, publish, and manage website content on the fly.", category: "custom" },
  { icon: ShoppingBag, title: "E-Commerce Platforms", desc: "High-converting storefronts with catalogs, cart management, secure gateways, and seamless checkouts.", category: "custom" },
  { icon: Globe, title: "Websites (All Types)", desc: "Corporate sites, high-impact landing pages, and bespoke web apps that elevate your brand presence.", category: "custom" },
  { icon: GraduationCap, title: "SCORM LMS", desc: "SCORM-compliant e-learning platforms for universities, corporate training, and schools.", category: "saas" },
  { icon: Calculator, title: "Accounts Management", desc: "Track income, expenses, invoices, ledgers, and tax compliance with secure, custom tools.", category: "saas" },
  { icon: Sparkles, title: "Inwora Daily Gold App", desc: "Auto-generate gold & silver daily-rate promotional posters for jewelry shops. Available on Google Play.", category: "automation" },
  { icon: Receipt, title: "POS & KOT for Restaurants", desc: "Point-of-Sale billing with real-time Kitchen Order Ticket displays for dining and kitchen staff.", category: "automation" },
  { icon: Activity, title: "Hospital Management App", desc: "Manage patient records, appointments, doctor schedules, billing, and pharmacy inventory.", category: "automation" },
  { icon: Factory, title: "Automated Factory App", desc: "Monitor machinery data, run quality checks, track orders, and coordinate factory floors digitally.", category: "automation" },
  { icon: Compass, title: "Travel Budget Application", desc: "Manage itineraries, log multi-currency travel expenses, and optimize budgets for corporate travel.", category: "automation" },
  { icon: HardHat, title: "Construction CRM", desc: "Manage client bids, project sites, material procurement, and site updates in one hub for builders.", category: "saas" },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = services.filter((s) => activeCategory === "all" || s.category === activeCategory);

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Software that drives real growth"
          subtitle="From modern SaaS systems and enterprise portals to intelligent automation apps — a full-stack product studio under one roof."
        />

        {/* Filter tabs */}
        <div className="mt-10 mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/20"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((service, i) => (
            <motion.div
              layout
              key={service.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
              data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{service.title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
              <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Learn more
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
