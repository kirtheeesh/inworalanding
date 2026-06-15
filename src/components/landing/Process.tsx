import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Map, PenTool, Code2, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    desc: "We deeply understand your business goals, target audience, technical requirements, and competitive landscape.",
    gradient: "from-blue-500 to-blue-700",
    glow: "shadow-blue-500/40",
    border: "border-blue-500/25",
    bg: "bg-blue-500/8",
    pill: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    icon: Map,
    number: "02",
    title: "Planning",
    desc: "Architecture, timeline, and feature roadmap are defined. Every detail is scoped before a single line of code is written.",
    gradient: "from-indigo-500 to-indigo-700",
    glow: "shadow-indigo-500/40",
    border: "border-indigo-500/25",
    bg: "bg-indigo-500/8",
    pill: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  },
  {
    icon: PenTool,
    number: "03",
    title: "Design",
    desc: "Premium UI/UX with real user flows. Interactive prototypes reviewed and approved before development begins.",
    gradient: "from-purple-500 to-purple-700",
    glow: "shadow-purple-500/40",
    border: "border-purple-500/25",
    bg: "bg-purple-500/8",
    pill: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  {
    icon: Code2,
    number: "04",
    title: "Development",
    desc: "Clean, scalable code by senior engineers. Agile sprints with regular demos keep you in the loop throughout.",
    gradient: "from-teal-500 to-teal-700",
    glow: "shadow-teal-500/40",
    border: "border-teal-500/25",
    bg: "bg-teal-500/8",
    pill: "bg-teal-500/10 text-teal-500 border-teal-500/20",
  },
  {
    icon: Rocket,
    number: "05",
    title: "Launch",
    desc: "Thorough QA testing, performance optimization, and smooth deployment. Your product ships on time, every time.",
    gradient: "from-emerald-500 to-emerald-700",
    glow: "shadow-emerald-500/40",
    border: "border-emerald-500/25",
    bg: "bg-emerald-500/8",
    pill: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  {
    icon: TrendingUp,
    number: "06",
    title: "Growth Support",
    desc: "Post-launch monitoring, feature iterations, and strategic guidance to keep your product growing.",
    gradient: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/40",
    border: "border-amber-500/25",
    bg: "bg-amber-500/8",
    pill: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
];

function StepCard({
  step,
  direction,
  index,
}: {
  step: (typeof steps)[0];
  direction: "left" | "right";
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`group relative rounded-2xl border ${step.border} ${step.bg} p-6 transition-all duration-300 overflow-hidden`}
      data-testid={`step-card-${index + 1}`}
    >
      {/* Large background number watermark */}
      <span
        className="pointer-events-none absolute -right-3 -top-4 select-none text-8xl font-black opacity-[0.04] dark:opacity-[0.06]"
        style={{ fontFamily: "var(--app-font-display)" }}
      >
        {step.number}
      </span>

      {/* Icon + number pill */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} shadow-md ${step.glow} transition-transform group-hover:scale-110`}
        >
          <step.icon className="h-6 w-6 text-white" />
        </div>
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${step.pill}`}>
          Step {step.number}
        </span>
      </div>

      {/* Content */}
      <h3
        className="text-lg font-extrabold text-foreground mb-2"
        style={{ fontFamily: "var(--app-font-display)" }}
      >
        {step.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>

      {/* Bottom accent bar */}
      <div className={`mt-5 h-0.5 w-0 rounded-full bg-gradient-to-r ${step.gradient} transition-all duration-500 group-hover:w-full`} />
    </motion.div>
  );
}

function MobileStepRow({ step, index }: { step: (typeof steps)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative flex gap-5"
      data-testid={`step-mobile-${index + 1}`}
    >
      {/* Left indicator */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 + 0.1, type: "spring", bounce: 0.5 }}
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg ${step.glow} z-10`}
        >
          <step.icon className="h-6 w-6 text-white" />
        </motion.div>
        {index < steps.length - 1 && (
          <div className="mt-2 flex-1 w-0.5 bg-gradient-to-b from-border to-transparent min-h-[32px]" />
        )}
      </div>

      {/* Card */}
      <div className={`flex-1 rounded-2xl border ${step.border} ${step.bg} p-5 mb-4 overflow-hidden relative`}>
        <span
          className="pointer-events-none absolute -right-2 -top-2 select-none text-6xl font-black opacity-[0.04] dark:opacity-[0.06]"
          style={{ fontFamily: "var(--app-font-display)" }}
        >
          {step.number}
        </span>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-bold uppercase tracking-wider ${step.pill} rounded-full border px-2 py-0.5`}>
            Step {step.number}
          </span>
        </div>
        <h3 className="text-base font-extrabold text-foreground mb-1.5" style={{ fontFamily: "var(--app-font-display)" }}>
          {step.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden py-24 md:py-36 bg-muted/10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] animate-glow-breathe" />
        <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-teal-500/4 blur-[100px] animate-glow-breathe" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-20 text-center"
        >
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-5">
            Our Process
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground"
            style={{ fontFamily: "var(--app-font-display)" }}
          >
            How We{" "}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Turn Your Vision
            </span>{" "}
            Into Reality
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven 6-step process that delivers world-class digital products — on time, on budget, with zero surprises.
          </p>

          {/* Step dots preview */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mt-8 flex items-center justify-center gap-2"
          >
            {steps.map((s, i) => (
              <div
                key={s.number}
                className={`h-2 rounded-full bg-gradient-to-r ${s.gradient} transition-all`}
                style={{ width: i === 0 || i === 5 ? 32 : 16 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* ── DESKTOP: Alternating timeline ── */}
        <div ref={containerRef} className="hidden lg:block relative">
          {/* Vertical spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-border/40 overflow-hidden rounded-full">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 via-teal-500 to-amber-500 origin-top rounded-full"
              style={{ scaleY: lineScaleY, height: "100%" }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-14">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.title}
                  className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-0"
                >
                  {/* Left card or spacer */}
                  <div className={`pr-12 ${isLeft ? "flex justify-end" : ""}`}>
                    {isLeft && <div className="w-full max-w-sm"><StepCard step={step} direction="left" index={i} /></div>}
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 flex items-center justify-center px-0">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.1, type: "spring", bounce: 0.55 }}
                      className={`flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-xl ${step.glow} border-4 border-background`}
                    >
                      <step.icon className="h-6 w-6 text-white" />
                      <span className="text-[10px] font-black text-white/80 mt-0.5">{step.number}</span>
                    </motion.div>
                  </div>

                  {/* Right card or spacer */}
                  <div className={`pl-12 ${!isLeft ? "flex justify-start" : ""}`}>
                    {!isLeft && <div className="w-full max-w-sm"><StepCard step={step} direction="right" index={i} /></div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE: Vertical list ── */}
        <div className="block lg:hidden">
          {steps.map((step, i) => (
            <MobileStepRow key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
