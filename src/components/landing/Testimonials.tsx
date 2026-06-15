import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "INWORA delivered our jewelry promotion app in record time. The gold poster generation feature has transformed how we create marketing materials — what used to take hours now takes minutes. Our sales team loves it.",
    name: "Rajan Mehta",
    role: "Managing Director",
    company: "Mehta Jewellers",
    initials: "RM",
    avatarBg: "bg-primary dark:bg-gradient-to-br dark:from-amber-500 dark:to-yellow-600",
    rating: 5,
  },
  {
    quote:
      "The POS and KOT system INWORA built for our restaurant chain is phenomenal. Orders flow seamlessly from front of house to the kitchen display. We've cut order errors by 80% since switching. The subscription model makes it easy to scale to new locations.",
    name: "Priya Sharma",
    role: "Operations Head",
    company: "Spice Route Restaurants",
    initials: "PS",
    avatarBg: "bg-primary dark:bg-gradient-to-br dark:from-blue-500 dark:to-indigo-600",
    rating: 5,
  },
  {
    quote:
      "We came to INWORA with just an idea. They built our entire mobile app from scratch — design, development, and launch. The result exceeded our expectations. Six months post-launch, we have over 10,000 active users. Professional, fast, and genuinely invested in our success.",
    name: "Arjun Nair",
    role: "Founder & CEO",
    company: "QuickServ Technologies",
    initials: "AN",
    avatarBg: "bg-primary dark:bg-gradient-to-br dark:from-teal-500 dark:to-emerald-600",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-muted/20 py-24 md:py-32">
      <div className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Client Voices
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground"
            style={{ fontFamily: "var(--app-font-display)" }}
          >
            What Our Clients Say
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Real businesses. Real results. Our work speaks through the growth of our clients.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.13, ease: [0.22, 0.61, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative flex flex-col rounded-3xl border border-border bg-card p-7 transition-all duration-300"
              data-testid={`card-testimonial-${i}`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary dark:fill-amber-400 dark:text-amber-400" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="h-8 w-8 text-primary/20 mb-3" />

              {/* Quote text */}
              <p className="flex-1 text-sm text-muted-foreground leading-relaxed italic mb-6">
                "{t.quote}"
              </p>

              {/* Divider */}
              <div className="h-px bg-border mb-5" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${t.avatarBg} text-white text-sm font-bold`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} — {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
