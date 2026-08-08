import { motion } from "framer-motion";
import { Search, Map, PenTool, Code2, Rocket, TrendingUp } from "lucide-react";
import { SectionHeading, fadeUpDelay } from "./_shared";

const steps = [
  { icon: Search, number: "01", title: "Discovery", desc: "We understand your business goals, target audience, technical requirements, and competitive landscape." },
  { icon: Map, number: "02", title: "Planning", desc: "Architecture, timeline, and feature roadmap are defined. Every detail is scoped before code is written." },
  { icon: PenTool, number: "03", title: "Design", desc: "Premium UI/UX with real user flows. Interactive prototypes reviewed and approved before development." },
  { icon: Code2, number: "04", title: "Development", desc: "Clean, scalable code by senior engineers. Agile sprints with regular demos keep you in the loop." },
  { icon: Rocket, number: "05", title: "Launch", desc: "Thorough QA, performance optimization, and smooth deployment. Your product ships on time." },
  { icon: TrendingUp, number: "06", title: "Growth support", desc: "Post-launch monitoring, feature iterations, and strategic guidance to keep your product growing." },
];

export default function Process() {
  return (
    <section id="process" className="border-y border-border bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Our process"
          title="From vision to launch"
          subtitle="A proven six-step process that delivers world-class digital products — on time, on budget, with zero surprises."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              {...fadeUpDelay(i)}
              className="relative flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <step.icon className="h-5 w-5" />
                </div>
                <span
                  className="text-2xl font-bold text-muted-foreground/25"
                  style={{ fontFamily: "var(--app-font-display)" }}
                >
                  {step.number}
                </span>
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
