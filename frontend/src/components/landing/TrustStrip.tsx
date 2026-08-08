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
    <section className="border-y border-border bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 md:justify-between">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <item.icon className="h-4 w-4 text-primary" />
              <span className="font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
