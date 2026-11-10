import { motion } from "framer-motion";
import {
  Smartphone, Lightbulb, RefreshCw, Briefcase,
  Layout, GitBranch, CheckCircle2, Sparkles,
} from "lucide-react";
import { SectionHeading, fadeUpDelay } from "./_shared";

interface AdvantageItem {
  icon: any;
  category: string;
  title: string;
  desc: string;
  features: string[];
  metric: string;
}

const advantages: AdvantageItem[] = [
  {
    icon: Smartphone,
    category: "Mobile & Native",
    title: "Mobile-First Expertise",
    desc: "Every product is architected touch-first. We engineer responsive, fluid applications optimized for the handheld devices your users rely on daily.",
    features: [
      "Android & iOS native performance",
      "Offline data caching & sync",
      "Fluid 60fps gesture interactions",
    ],
    metric: "Sub-100ms Touch Response",
  },
  {
    icon: Lightbulb,
    category: "Product Strategy",
    title: "Product-Focused Innovation",
    desc: "We don't just write lines of code — we think in market-viable products. Every screen and feature is designed to solve real operational bottlenecks.",
    features: [
      "User funnel & retention mapping",
      "Commercial ROI-driven scoping",
      "Rapid prototype-to-production cycles",
    ],
    metric: "Zero Disposable Code",
  },
  {
    icon: RefreshCw,
    category: "Monetization",
    title: "Subscription-Ready Platforms",
    desc: "Turn your business idea into a predictable recurring revenue engine with built-in multi-tier billing, entitlement gating, and invoice automation.",
    features: [
      "Automated recurring payments",
      "Feature gating & tier management",
      "Stripe, Razorpay & global gateways",
    ],
    metric: "Day-1 Monetization Engine",
  },
  {
    icon: Briefcase,
    category: "Domain Expertise",
    title: "Business-Oriented Solutions",
    desc: "From live gold-rate feeds and restaurant KOTs to complex factory floor monitoring, we understand industry operations and build software that works.",
    features: [
      "Role-based access control (RBAC)",
      "Live WebSocket telemetry & sync",
      "POS, ERP & custom workflow tools",
    ],
    metric: "Eliminates Manual Overhead",
  },
  {
    icon: Layout,
    category: "Design System",
    title: "Modern UI, Reliable Tech",
    desc: "High-converting design paired with strictly-typed modern frameworks (React, TypeScript, Tailwind). Clean code that your team can maintain long-term.",
    features: [
      "Component-driven design systems",
      "Dark & light theme support",
      "WCAG compliant accessibility",
    ],
    metric: "Pixel-Perfect Standards",
  },
  {
    icon: GitBranch,
    category: "Infrastructure",
    title: "Architecture Built to Scale",
    desc: "Stateless micro-layers, optimized database schemas, and cloud deployment pipelines designed to grow seamlessly from 10 users to 100,000+.",
    features: [
      "Horizontally scalable cloud APIs",
      "Query caching & optimized SQL",
      "Automated CI/CD zero-downtime releases",
    ],
    metric: "99.8% Uptime SLA Guarantee",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <SectionHeading
          eyebrow="Our Advantage"
          title="Why businesses build with INWORA"
          subtitle="We combine commercial product strategy with disciplined full-stack engineering to deliver competitive advantages that last."
        />

        {/* 3-Column Structured Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUpDelay(i)}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#E0EEE0] dark:border-border bg-card p-6 sm:p-7 shadow-xs hover:border-[#228B22]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              data-testid={`card-why-${i}`}
            >
              <div>
                {/* Header: Icon & Category tag */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] group-hover:scale-105 transition-all duration-200">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-[#185e18] dark:text-[#8ce68c] uppercase">
                    {item.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-[#228B22] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                  {item.desc}
                </p>

                {/* Tangible Feature Checklist */}
                <ul className="space-y-2.5 mb-6 border-t border-border/70 pt-5">
                  {item.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/90 font-medium"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#228B22] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Outcome Metric */}
              <div className="pt-4 border-t border-border/70 flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">Key Outcome</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-[#228B22]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {item.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
