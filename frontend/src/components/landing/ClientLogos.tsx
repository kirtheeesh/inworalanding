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
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Trusted by businesses across industries
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {clients.map((name) => (
            <span
              key={name}
              className="text-base font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
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
