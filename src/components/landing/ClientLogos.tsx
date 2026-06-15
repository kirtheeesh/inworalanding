import { motion } from "framer-motion";

const clients = [
  { name: "Nexora", initial: "N", color: "bg-primary/10 text-primary dark:bg-blue-500/15 dark:text-blue-400 border-primary/20 dark:border-blue-500/20" },
  { name: "Auric Jewels", initial: "AJ", color: "bg-primary/10 text-primary dark:bg-amber-500/15 dark:text-amber-400 border-primary/20 dark:border-amber-500/20" },
  { name: "SpiceRoute Café", initial: "SR", color: "bg-primary/10 text-primary dark:bg-orange-500/15 dark:text-orange-400 border-primary/20 dark:border-orange-500/20" },
  { name: "GoldCraft", initial: "GC", color: "bg-primary/10 text-primary dark:bg-yellow-500/15 dark:text-yellow-400 border-primary/20 dark:border-yellow-500/20" },
  { name: "TechBridge", initial: "TB", color: "bg-primary/10 text-primary dark:bg-indigo-500/15 dark:text-indigo-400 border-primary/20 dark:border-indigo-500/20" },
  { name: "QuickBite", initial: "QB", color: "bg-primary/10 text-primary dark:bg-rose-500/15 dark:text-rose-400 border-primary/20 dark:border-rose-500/20" },
  { name: "RetailEdge", initial: "RE", color: "bg-primary/10 text-primary dark:bg-teal-500/15 dark:text-teal-400 border-primary/20 dark:border-teal-500/20" },
  { name: "BizPulse", initial: "BP", color: "bg-primary/10 text-primary dark:bg-purple-500/15 dark:text-purple-400 border-primary/20 dark:border-purple-500/20" },
  { name: "FreshMart", initial: "FM", color: "bg-primary/10 text-primary dark:bg-emerald-500/15 dark:text-emerald-400 border-primary/20 dark:border-emerald-500/20" },
  { name: "CraftGold", initial: "CG", color: "bg-primary/10 text-primary dark:bg-amber-600/15 dark:text-amber-300 border-primary/20 dark:border-amber-600/20" },
];

const rowA = [...clients, ...clients];
const rowB = [...clients.slice(5), ...clients.slice(0, 5), ...clients.slice(5), ...clients.slice(0, 5)];

function LogoPill({ name, initial, color }: { name: string; initial: string; color: string }) {
  return (
    <div className={`flex flex-shrink-0 items-center gap-2.5 rounded-xl border px-4 py-2.5 ${color}`}>
      <span
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-current/10 text-xs font-extrabold"
        style={{ fontFamily: "var(--app-font-display)" }}
      >
        {initial}
      </span>
      <span className="whitespace-nowrap text-sm font-bold" style={{ fontFamily: "var(--app-font-display)" }}>
        {name}
      </span>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section className="relative overflow-hidden border-y border-border/50 bg-muted/20 py-12">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      {/* Header */}
      <div className="container relative z-10 mx-auto mb-8 px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by businesses across industries
        </p>
      </div>

      {/* Row A — scrolls left */}
      <div className="flex overflow-hidden mb-4">
        <motion.div
          className="flex gap-4 px-4"
          animate={{ x: [0, -(clients.length * 192)] }}
          transition={{ x: { repeat: Infinity, duration: 28, ease: "linear" } }}
        >
          {rowA.map((c, i) => (
            <LogoPill key={i} {...c} />
          ))}
        </motion.div>
      </div>

      {/* Row B — scrolls right */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-4 px-4"
          animate={{ x: [-(clients.length * 192), 0] }}
          transition={{ x: { repeat: Infinity, duration: 32, ease: "linear" } }}
        >
          {rowB.map((c, i) => (
            <LogoPill key={i} {...c} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
