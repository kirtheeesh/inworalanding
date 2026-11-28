import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Check } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const perks = ["Free consultation", "On-time delivery", "Dedicated project manager"];

export default function FinalCTA() {
  const handleContactSales = () => {
    const msg = "Hello INWORA! I am interested in your custom development/enterprise plans and would like to connect with your sales team.";
    openWhatsApp(`https://wa.me/919025728998?text=${encodeURIComponent(msg)}`, "Final CTA: Contact sales");
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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B4F3E] to-[#083A2E] px-6 py-14 text-center md:px-12 md:py-20 shadow-2xl"
        >
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(245,124,0,0.28),transparent_65%)]" />
          {/* Subtle highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: "radial-gradient(circle, #F6EBD3 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse 70% 70% at 50% 0%, #000, transparent)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 0%, #000, transparent)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="inline-block rounded-full bg-white/20 border border-white/25 px-4 py-1 text-xs font-semibold text-white tracking-wide">
              Get Started Today
            </span>

            <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Build Smarter Digital Products{" "}
              <span className="text-[#F6EBD3] block sm:inline">with Inwora</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base md:text-lg leading-relaxed text-white/90">
              Whether you need a mobile app, a subscription platform, custom CRM, or white-collar dedicated developers — INWORA brings your vision to life.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Button
                onClick={handleContactSales}
                size="lg"
                className="brand-btn-accent rounded-full px-7 h-11 text-sm font-bold cursor-pointer"
                data-testid="button-contact-sales"
              >
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={handleScheduleDemo}
                size="lg"
                variant="outline"
                className="rounded-full border border-white/40 bg-white/10 text-white hover:bg-white/20 px-6 h-11 text-sm font-semibold cursor-pointer"
                data-testid="button-schedule-demo"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Demo
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2 text-xs sm:text-sm text-white/90 font-medium">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-white">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </div>
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
