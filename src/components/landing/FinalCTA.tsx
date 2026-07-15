import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";

const perks = [
  "Free consultation for all new clients",
  "Delivery on time, every time",
  "Dedicated project manager",
];

export default function FinalCTA() {
  const handleContactSales = () => {
    const msg = "Hello INWORA! I am interested in your custom development/enterprise plans and would like to connect with your sales team.";
    window.open(`https://wa.me/919047370027?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleScheduleDemo = () => {
    window.dispatchEvent(new CustomEvent("open-schedule-demo"));
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36">
      {/* Animated gradient background - Updated to theme green */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: "linear-gradient(135deg, hsl(120,61%,25%), hsl(140,38%,35%), hsl(120,61%,34%), hsl(140,38%,20%))",
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
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white mb-6 backdrop-blur"
          >
            Get Started Today
          </motion.span>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6"
            style={{ fontFamily: "var(--app-font-display)" }}
          >
            Build smarter digital products with{" "}
            <span className="text-secondary drop-shadow-md">INWORA</span>
          </h2>

          <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-xl mx-auto font-medium">
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
                onClick={handleContactSales}
                size="lg"
                className="rounded-full bg-white text-primary hover:bg-secondary transition-all px-8 py-7 text-base font-bold shadow-2xl shadow-black/20"
                data-testid="button-contact-sales"
              >
                Contact Sales
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleScheduleDemo}
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 text-white bg-white/10 hover:bg-white/20 px-8 py-7 text-base font-bold backdrop-blur transition-all"
                data-testid="button-schedule-demo"
              >
                <Calendar className="mr-2 h-5 w-5" />
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
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {perks.map((perk, i) => (
              <motion.div
                key={perk}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 text-sm font-bold text-white/90"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                  <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
                </div>
                {perk}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
