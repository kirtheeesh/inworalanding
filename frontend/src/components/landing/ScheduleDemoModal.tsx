import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScheduleDemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setError("");
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

    const msg = `Hello INWORA! I would like to schedule a demo on ${formattedDate} at ${time}.`;
    window.open(`https://wa.me/919047370027?text=${encodeURIComponent(msg)}`, "_blank");
    setIsOpen(false);
  };

  const inputCls =
    "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

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
            className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-7 shadow-xl"
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Schedule a demo</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Pick your preferred date and time. Submitting confirms your slot via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  Date
                </label>
                <input type="date" min={todayStr} value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  Time
                </label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-3 pt-1">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1 rounded-lg">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 rounded-lg">
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
