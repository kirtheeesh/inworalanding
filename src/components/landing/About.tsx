import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Award, Users } from "lucide-react";

const stats = [
  { icon: Award, value: 80, suffix: "+", label: "Projects Delivered", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: Target, value: 3, suffix: "", label: "Subscription Products", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: Users, value: 15, suffix: "+", label: "Business Categories Served", color: "text-teal-500", bg: "bg-teal-500/10" },
];

function AnimatedCounter({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-5">
              About INWORA
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-6"
              style={{ fontFamily: "var(--app-font-display)" }}
            >
              Built on Innovation,{" "}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Driven by Purpose
              </span>
            </h2>

            {/* Parent company callout */}
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
              <div className="h-8 w-1 flex-shrink-0 rounded-full bg-gradient-to-b from-primary to-blue-400" />
              <p className="text-sm text-foreground">
                INWORA is a product of{" "}
                <a
                  href="https://www.aimstorm.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  Aim Storm
                </a>
                {" "}— our parent company.{" "}
                <a
                  href="https://www.aimstorm.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-xs"
                >
                  www.aimstorm.in
                </a>
              </p>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                INWORA is a flagship IT product brand under{" "}
                <a
                  href="https://www.aimstorm.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  Aim Storm
                </a>
                {" "}— a technology company built by engineers, designers, and business strategists united by a single mission: build software that transforms businesses.
              </p>
              <p>
                We specialize in mobile application development, subscription-based SaaS products, and business automation solutions. From gold poster generation platforms for jewelry brands to POS systems for restaurants, every product we ship is engineered with precision and purpose.
              </p>
              <p>
                Our philosophy is simple: software should be beautiful, reliable, and commercially impactful. We don't build tools — we build competitive advantages for businesses that are serious about growth.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-1 w-12 rounded-full bg-primary" />
              <p className="text-sm font-semibold text-foreground italic">
                "Your Growth... Our Mission."
              </p>
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 0.61, 0.36, 1] }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6 transition-all duration-300"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`h-7 w-7 ${stat.color}`} />
                </div>
                <div>
                  <p
                    className={`text-4xl font-extrabold ${stat.color}`}
                    style={{ fontFamily: "var(--app-font-display)" }}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}

            {/* Parent company badge */}
            <a
              href="https://www.aimstorm.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-primary/20 bg-muted/50 p-5 text-center block hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
              data-testid="link-aimstorm"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Parent Company</p>
              <p
                className="text-xl font-extrabold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity"
                style={{ fontFamily: "var(--app-font-display)" }}
              >
                Aim Storm
              </p>
              <p className="text-xs text-muted-foreground mt-1">Your Growth... Our Mission!</p>
              <p className="text-xs text-primary/60 group-hover:text-primary mt-1 transition-colors font-medium">
                www.aimstorm.in ↗
              </p>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
