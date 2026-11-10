import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, X, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";

const AVAILABLE_PRODUCTS = [
  "Unified Business ERP",
  "POS & KOT Software",
  "Inwora Daily Gold",
  "Construction Management",
  "Factory Management",
  "Custom Software Development",
];

export default function ScheduleDemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState("Unified Business ERP");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleOpen = (e: any) => {
      setIsOpen(true);
      setError("");
      if (e?.detail?.productName) {
        setProduct(e.detail.productName);
      }
    };
    window.addEventListener("open-schedule-demo", handleOpen);
    return () => window.removeEventListener("open-schedule-demo", handleOpen);
  }, []);

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
      setError("Please select both a date and a preferred time.");
      return;
    }
    setError("");

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const msg = `Hello INWORA! I would like to schedule a product demo for "${product}" on ${formattedDate} at ${time}. Could you please confirm the slot?`;
    window.open(`https://wa.me/919025728998?text=${encodeURIComponent(msg)}`, "_blank");
    setIsOpen(false);
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md rounded-3xl border border-[#E0EEE0] dark:border-border bg-card p-6 sm:p-7 shadow-2xl"
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22]">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight text-foreground">
                Request a Product Demo
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Schedule a 1-on-1 walkthrough tailored to your business workflows. Confirmed instantly via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Boxes className="h-3.5 w-3.5 text-[#228B22]" />
                  Product of Interest
                </label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className={inputCls}
                >
                  {AVAILABLE_PRODUCTS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-[#228B22]" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-[#228B22]" />
                  Preferred Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={inputCls}
                />
              </div>

              {error && <p className="text-xs text-destructive font-medium">{error}</p>}

              <div className="flex gap-3 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-full brand-btn-secondary h-11 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-full brand-btn-primary h-11 text-xs font-semibold cursor-pointer"
                >
                  Confirm on WhatsApp
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
