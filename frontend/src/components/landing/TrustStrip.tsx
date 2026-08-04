import { motion } from "framer-motion";
import { Smartphone, RefreshCw, ShoppingBag, Lock, Globe, Cpu } from "lucide-react";

const items = [
  { icon: Smartphone, label: "Mobile-First Solutions" },
  { icon: RefreshCw, label: "Subscription Business Model" },
  { icon: ShoppingBag, label: "Retail & Restaurant Friendly" },
  { icon: Lock, label: "Secure & Scalable" },
  { icon: Globe, label: "Cloud-Ready Platform" },
  { icon: Cpu, label: "Modern Tech Stack" },
];

export default function TrustStrip() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-muted/30 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex">
        <motion.div
          className="flex flex-shrink-0 items-center gap-12 px-8"
          animate={{ x: [0, -1 * (items.length * 220)] }}
          transition={{
            x: { repeat: Infinity, duration: 22, ease: "linear" },
          }}
        >
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex flex-shrink-0 items-center gap-3 text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="whitespace-nowrap text-sm font-semibold">{item.label}</span>
              <span className="h-1 w-1 rounded-full bg-border flex-shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
