import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";

const perks = [
  "Free consultation for all new clients",
  "Delivery on time, every time",
  "Dedicated project manager",
];

export default function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: "linear-gradient(135deg, hsl(235,80%,40%), hsl(250,75%,50%), hsl(200,80%,40%), hsl(235,80%,40%))",
        }}
      />

      {/* Orb overlays */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[450px] w-[450px] rounded-full bg-white/10 blur-[80px] animate-glow-breathe" />
        <div className="absolute -bottom-32 -right-32 h-[450px] w-[450px] rounded-full bg-white/10 blur-[80px] animate-glow-breathe" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-black/10 blur-[100px]" />

        {/* Spinning ring decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow">
          <div
            className="h-[500px] w-[500px] rounded-full border border-white/8"
            style={{ borderStyle: "dashed" }}
          />
        </div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
          style={{ animationDirection: "reverse", animationDuration: "18s" }}
        >
          <div
            className="h-[700px] w-[700px] rounded-full border border-white/5"
            style={{ borderStyle: "dashed" }}
          />
        </div>

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white mb-6 backdrop-blur"
          >
            Get Started Today
          </motion.span>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
            style={{ fontFamily: "var(--app-font-display)" }}
          >
            Build smarter digital products with{" "}
            <span className="text-amber-300 drop-shadow-lg">INWORA</span>
          </h2>

          <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you need a mobile app, a subscription platform, or a business software solution — INWORA has the expertise to bring your vision to life. Let's build something extraordinary together.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                className="rounded-full bg-white text-primary hover:bg-white/90 px-8 font-semibold transition-all"
                data-testid="button-contact-sales"
              >
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 text-white bg-white/10 hover:bg-white/20 px-8 font-semibold backdrop-blur"
                data-testid="button-schedule-demo"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            {perks.map((perk, i) => (
              <motion.div
                key={perk}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-300 flex-shrink-0" />
                {perk}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
