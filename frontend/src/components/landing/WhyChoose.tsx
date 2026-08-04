import { motion } from "framer-motion";
import { Smartphone, Lightbulb, RefreshCw, Briefcase, Layout, GitBranch } from "lucide-react";

const reasons = [
  {
    icon: Smartphone,
    title: "Mobile-First Expertise",
    desc: "Every product and service we build starts with mobile in mind — optimized experiences for the devices your customers actually use.",
    span: "lg:col-span-2",
    iconColor: "text-primary dark:text-blue-500",
    iconBg: "bg-primary/10 dark:bg-blue-500/10",
  },
  {
    icon: Lightbulb,
    title: "Product-Focused Innovation",
    desc: "We don't just write code — we think in products. Each solution is designed to create real value and competitive advantage.",
    span: "",
    iconColor: "text-primary dark:text-amber-500",
    iconBg: "bg-primary/10 dark:bg-amber-500/10",
  },
  {
    icon: RefreshCw,
    title: "Subscription-Ready Platforms",
    desc: "Built-in billing, plan management, and subscription infrastructure so your product can generate recurring revenue from day one.",
    span: "",
    iconColor: "text-primary dark:text-indigo-500",
    iconBg: "bg-primary/10 dark:bg-indigo-500/10",
  },
  {
    icon: Briefcase,
    title: "Business-Oriented Software Solutions",
    desc: "We understand business operations deeply — from POS systems to promotional tools, we build software that solves real business problems.",
    span: "lg:col-span-2",
    iconColor: "text-primary dark:text-teal-500",
    iconBg: "bg-primary/10 dark:bg-teal-500/10",
  },
  {
    icon: Layout,
    title: "Modern UI and Reliable Technology",
    desc: "Beautiful interfaces paired with battle-tested technology stacks. Your users get premium experiences, your team gets maintainable code.",
    span: "lg:col-span-1",
    iconColor: "text-primary dark:text-purple-500",
    iconBg: "bg-primary/10 dark:bg-purple-500/10",
  },
  {
    icon: GitBranch,
    title: "Scalable Architecture for Future Growth",
    desc: "Systems designed to grow with your business — from 10 users to 10,000, our architecture handles scale without rewrites.",
    span: "lg:col-span-2",
    iconColor: "text-primary dark:text-emerald-500",
    iconBg: "bg-primary/10 dark:bg-emerald-500/10",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-muted/20 py-24 md:py-32">
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Our Advantage
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground"
            style={{ fontFamily: "var(--app-font-display)" }}
          >
            Why Choose INWORA
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine deep technical expertise with product intuition to build software that stands out.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30, rotateY: i % 2 === 0 ? 10 : -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.1, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ 
                y: -10, 
                rotateX: 2,
                rotateY: -2,
                z: 20,
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
                borderColor: "rgba(var(--primary), 0.2)"
              }}
              className={`group flex flex-col rounded-3xl border border-border bg-card p-8 transition-all duration-500 shadow-sm overflow-hidden relative ${reason.span}`}
              data-testid={`card-why-${i}`}
            >
              {/* Decorative background number/letter */}
              <div className="absolute -right-4 -bottom-6 text-9xl font-black text-primary/5 select-none transition-transform group-hover:scale-110 group-hover:-translate-y-4 duration-700">
                {i + 1}
              </div>

              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${reason.iconBg} shadow-inner transition-all duration-500 group-hover:shadow-lg`}
              >
                <reason.icon className={`h-7 w-7 ${reason.iconColor}`} />
              </motion.div>
              <h3 className="text-lg font-black text-foreground mb-3 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "var(--app-font-display)" }}>
                {reason.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium group-hover:text-foreground/80 transition-colors duration-300">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
