import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  Target, Award, Users, ShieldCheck, HeartHandshake,
  Lightbulb, Sparkles, ArrowRight, CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import FinalCTA from "@/components/landing/FinalCTA";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Award, value: 80, suffix: "+", label: "Projects delivered across Tamil Nadu" },
  { icon: Target, value: 3, suffix: "", label: "Subscription products built" },
  { icon: Users, value: 12, suffix: "", label: "Industry verticals served" },
  { icon: ShieldCheck, value: 99, suffix: ".8%", label: "System uptime & reliability" },
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

const values = [
  {
    icon: Target,
    title: "Commercial Purpose First",
    desc: "Every architecture decision, UI interaction, and database query must contribute directly to revenue, efficiency, or user delight.",
  },
  {
    icon: Lightbulb,
    title: "Craftsmanship in Every Line",
    desc: "We write clean, strictly-typed, scalable code built for high concurrency. No brittle hacks or unmaintainable dependencies.",
  },
  {
    icon: ShieldCheck,
    title: "Radical Transparency",
    desc: "Zero surprises. You have direct access to our engineers, bi-weekly live sprint demos, and real-time project progress tracking.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Growth Partnership",
    desc: "Launch is only day one. We stay beside you with dedicated post-release telemetry, ongoing feature iterations, and operational SLA support.",
  },
];

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* About Hero */}
        <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 border-b border-border bg-gradient-to-b from-[#E0EEE0]/35 via-background to-background dark:from-[#228B22]/10 dark:via-background dark:to-background">
          {/* Organic Mint Wave Accents */}
          <svg
            aria-hidden
            className="pointer-events-none absolute -top-12 -left-12 w-80 md:w-[28rem] text-[#E0EEE0]/80 dark:text-[#228B22]/10 z-0 opacity-80"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-50 -50 C120 -20 190 70 170 180 C150 290 80 340 -50 370 Z"
              fill="currentColor"
            />
          </svg>
          <svg
            aria-hidden
            className="pointer-events-none absolute -top-12 -right-12 w-80 md:w-[28rem] text-[#E0EEE0]/75 dark:text-[#228B22]/10 z-0 opacity-75"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M450 -50 C280 -20 210 70 230 180 C250 290 320 340 450 370 Z"
              fill="currentColor"
            />
          </svg>

          <div className="container relative z-10 mx-auto px-4 md:px-8 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#228B22]/20 bg-[#E0EEE0]/80 dark:bg-[#228B22]/15 px-3.5 py-1 text-xs font-semibold text-[#185e18] dark:text-[#8ce68c] mb-6"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#228B22]" />
              About INWORA
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08]"
            >
              Built on innovation,{" "}
              <span className="text-[#228B22] dark:text-[#3cd43c] block sm:inline">
                driven by purpose
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto"
            >
              INWORA is a premium IT product brand built by engineers, designers, and business strategists united by a single mission: build software that transforms businesses.
            </motion.p>
          </div>
        </section>

        {/* Story & Mission Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left narrative */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Who We Are</span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  We don't build disposable tools — we engineer competitive advantages.
                </h2>

                <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    Most IT service agencies prioritize billing hours over building enduring software. They use off-the-shelf templates that break as soon as your business scales.
                  </p>
                  <p>
                    Started in 2023, INWORA was created to be different. We are a specialized software product studio engineering custom mobile applications, enterprise SaaS platforms, and intelligent automation systems tailored to the exact workflows of businesses across Tamil Nadu.
                  </p>
                  <p>
                    Our philosophy is simple: software should be beautiful, reliable, and commercially impactful. From jewelry showroom automation to hospital electronic health records and restaurant kitchen displays, our products deliver tangible efficiency and measurable revenue.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="h-10 w-1 bg-primary rounded-full" />
                  <div>
                    <p className="text-sm font-bold text-foreground">"Innovate, Automate, Scale"</p>
                    <p className="text-xs text-muted-foreground">The foundational motto behind every line of code we ship.</p>
                  </div>
                </div>
              </div>

              {/* Right: Stats Counter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/40 transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-snug">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Core Values */}
        <section className="py-20 md:py-28 border-t border-border bg-muted/20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Core Principles</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                The standards that guide our work
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                We measure our success not by the number of projects completed, but by the business metrics our software delivers for our clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-border bg-card p-7 shadow-xs hover:border-primary/40 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Link to Process Table & Services */}
        <section className="py-16 border-t border-border bg-card">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-foreground">Curious how we execute?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Explore our six-phase engineering framework or browse our live project portfolio.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link href="/services">
                <Button variant="outline" className="rounded-lg">
                  Explore Services
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button className="rounded-lg gap-1.5">
                  View Portfolio
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
