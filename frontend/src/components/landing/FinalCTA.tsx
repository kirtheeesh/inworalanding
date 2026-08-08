import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Check } from "lucide-react";

const perks = ["Free consultation", "On-time delivery", "Dedicated project manager"];

export default function FinalCTA() {
  const handleContactSales = () => {
    const msg = "Hello INWORA! I am interested in your custom development/enterprise plans and would like to connect with your sales team.";
    window.open(`https://wa.me/919047370027?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleScheduleDemo = () => {
    window.dispatchEvent(new CustomEvent("open-schedule-demo"));
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl bg-primary px-6 py-14 text-center md:px-12 md:py-20"
        >
          {/* Subtle highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage: "radial-gradient(ellipse 70% 70% at 50% 0%, #000, transparent)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 0%, #000, transparent)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
              Get started today
            </span>

            <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              Build smarter digital products with INWORA
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base md:text-lg leading-relaxed text-white/80">
              Whether you need a mobile app, a subscription platform, or business software — INWORA has the expertise to
              bring your vision to life.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={handleContactSales}
                size="lg"
                variant="secondary"
                className="rounded-lg bg-white text-primary hover:bg-white/90"
                data-testid="button-contact-sales"
              >
                Contact sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={handleScheduleDemo}
                size="lg"
                variant="outline"
                className="rounded-lg border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                data-testid="button-schedule-demo"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule demo
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2 text-sm text-white/85">
                  <Check className="h-4 w-4 text-white" />
                  {perk}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
