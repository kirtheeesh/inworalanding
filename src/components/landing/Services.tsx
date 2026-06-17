import { motion } from "framer-motion";
import { Smartphone, Package, Palette, Cpu, Cloud, Layers } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Custom Mobile App Development",
    desc: "End-to-end Android and iOS development tailored to your business goals. From concept to launch with beautiful, performant apps.",
    color: "text-primary dark:text-blue-500",
    bg: "bg-primary/10 dark:bg-blue-500/10",
    border: "hover:border-primary/40 dark:hover:border-blue-500/40",
    glow: "hover:shadow-primary/10 dark:hover:shadow-blue-500/10",
    gradient: "from-primary to-primary/70 dark:from-blue-500 dark:to-blue-600",
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
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const cardVariants: any = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] } },
};

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />

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
            What We Build
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            From mobile applications to subscription platforms — we deliver software that drives real business growth.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
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
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 group-hover:text-foreground/80 transition-colors duration-300">{service.desc}</p>

              {/* Arrow link */}
              <div className={`mt-6 flex items-center gap-2 text-sm font-bold ${service.color} opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300`}>
                See our approach
                <span className="transition-transform group-hover:translate-x-1.5 duration-300">→</span>
              </div>

              {/* Vertical accent bar */}
              <div className={`absolute top-0 left-0 bottom-0 w-[4px] bg-gradient-to-b ${service.gradient} scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
