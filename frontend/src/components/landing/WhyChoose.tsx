import { motion } from "framer-motion";
import { Smartphone, Lightbulb, RefreshCw, Briefcase, Layout, GitBranch } from "lucide-react";
import { SectionHeading, fadeUpDelay } from "./_shared";

const reasons = [
  {
    icon: Smartphone,
    title: "Mobile-first expertise",
    desc: "Every product we build starts with mobile in mind — optimized experiences for the devices your customers actually use.",
    span: "lg:col-span-2",
  },
  {
    icon: Lightbulb,
    title: "Product-focused innovation",
    desc: "We don't just write code — we think in products. Each solution is designed to create real value.",
    span: "",
  },
  {
    icon: RefreshCw,
    title: "Subscription-ready platforms",
    desc: "Built-in billing, plan management, and subscription infrastructure so your product earns recurring revenue from day one.",
    span: "",
  },
  {
    icon: Briefcase,
    title: "Business-oriented solutions",
    desc: "From POS systems to promotional tools, we understand operations deeply and build software that solves real problems.",
    span: "lg:col-span-2",
  },
  {
    icon: Layout,
    title: "Modern UI, reliable tech",
    desc: "Beautiful interfaces paired with battle-tested technology. Premium experiences on maintainable code.",
    span: "lg:col-span-1",
  },
  {
    icon: GitBranch,
    title: "Architecture built to scale",
    desc: "Systems designed to grow with your business — from 10 users to 10,000, without rewrites.",
    span: "lg:col-span-2",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Our advantage"
          title="Why teams choose INWORA"
          subtitle="We combine deep technical expertise with product intuition to build software that stands out."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              {...fadeUpDelay(i)}
              className={`flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30 ${reason.span}`}
              data-testid={`card-why-${i}`}
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <reason.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
