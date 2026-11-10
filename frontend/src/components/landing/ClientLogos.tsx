const clients = [
  "Nexora",
  "Auric Jewels",
  "SpiceRoute Café",
  "GoldCraft",
  "TechBridge",
  "QuickBite",
  "RetailEdge",
  "BizPulse",
  "FreshMart",
  "CraftGold",
];

export default function ClientLogos() {
  return (
    <section className="py-14 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#228B22]/40" />
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#228B22] dark:text-[#8ce68c]">
            Trusted by businesses across industries
          </p>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#228B22]/40" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-4xl mx-auto">
          {clients.map((name) => (
            <span
              key={name}
              className="inline-flex items-center px-4 py-2 rounded-full border border-[#E0EEE0] dark:border-border/60 bg-card/70 text-xs sm:text-sm font-semibold tracking-tight text-foreground/80 transition-all duration-200 hover:text-[#228B22] hover:border-[#228B22]/40 hover:bg-[#E0EEE0]/30 shadow-2xs cursor-default"
              style={{ fontFamily: "var(--app-font-display)" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
