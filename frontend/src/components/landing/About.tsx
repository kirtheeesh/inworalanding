import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Award, Users } from "lucide-react";
import { Eyebrow } from "./_shared";

const stats = [
  { icon: Award, value: 369, suffix: "+", label: "Projects delivered" },
  { icon: Target, value: 9, suffix: "", label: "Subscription products" },
  { icon: Users, value: 69, suffix: "+", label: "Industries served" },
];

function AnimatedCounter({ target, suffix, duration = 1600 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, duration / steps);
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
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Eyebrow>About INWORA</Eyebrow>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Built on innovation, driven by purpose
            </h2>

            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                INWORA is a premium IT product brand built by engineers, designers, and business strategists united by a
                single mission: build software that transforms businesses.
              </p>
              <p>
                We specialize in mobile application development, subscription-based SaaS products, and business automation.
                From the Inwora Daily Gold poster app for jewelry brands to POS systems for restaurants, every product we
                ship is engineered with precision and purpose.
              </p>
              <p>
                Our philosophy is simple: software should be beautiful, reliable, and commercially impactful. We don't
                build tools — we build competitive advantages for businesses serious about growth.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <p className="text-sm font-medium text-foreground">"Your Growth… Our Mission."</p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-5 rounded-xl border border-border bg-card p-6"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold tracking-tight text-foreground">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
