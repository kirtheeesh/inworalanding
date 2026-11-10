import { Smartphone, RefreshCw, ShoppingBag, Lock, Globe, Cpu } from "lucide-react";

const items = [
  { icon: Smartphone, label: "Mobile-first" },
  { icon: RefreshCw, label: "Subscription model" },
  { icon: ShoppingBag, label: "Retail & restaurant" },
  { icon: Lock, label: "Secure & scalable" },
  { icon: Globe, label: "Cloud-ready" },
  { icon: Cpu, label: "Modern stack" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-[#E0EEE0] dark:border-border/70 bg-[#E0EEE0]/25 dark:bg-muted/15">
      <div className="container mx-auto px-4 md:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 md:justify-between">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/85">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22]">
                <item.icon className="h-3.5 w-3.5 stroke-[2.2]" />
              </span>
              <span className="font-semibold">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
