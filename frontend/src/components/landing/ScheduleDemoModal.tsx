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
    
    // Format message
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-[2.5rem] border border-border bg-card p-8 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted/20 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Calendar className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black text-foreground" style={{ fontFamily: "var(--app-font-display)" }}>
                Schedule Demo
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Select your preferred date and time. Submitting will confirm your slot via WhatsApp.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  Select Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm font-semibold text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all"
                  style={{ fontFamily: "var(--app-font-display)" }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  Select Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm font-semibold text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all"
                  style={{ fontFamily: "var(--app-font-display)" }}
                />
              </div>

              {error && (
                <p className="text-xs font-bold text-destructive text-center">
                  ⚠️ {error}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-2xl py-6 font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-2xl py-6 font-bold shadow-lg shadow-primary/20"
                >
                  Schedule in WhatsApp
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
