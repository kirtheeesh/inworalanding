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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50, rotateX: 5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.15, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ 
                y: -10, 
                rotateY: i % 2 === 0 ? 3 : -3,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(var(--primary), 0.12)",
                borderColor: "rgba(var(--primary), 0.2)"
              }}
              className="group relative flex flex-col rounded-[2.5rem] border border-border bg-card p-10 transition-all duration-500 shadow-sm"
              data-testid={`card-testimonial-${i}`}
            >
              {/* Quote icon floating */}
              <div className="absolute -top-4 -right-2 text-primary opacity-5 group-hover:opacity-10 group-hover:-translate-y-2 transition-all duration-700">
                <Quote className="h-24 w-24 fill-current" />
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${t.avatarBg} text-white text-sm font-black shadow-lg shadow-primary/20`}
                >
                  {t.initials}
                </motion.div>
                <div>
                  <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">{t.name}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    {t.role} — {t.company}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1.5 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote text */}
              <p className="flex-1 text-sm text-muted-foreground leading-relaxed italic mb-8 relative z-10 transition-colors group-hover:text-foreground/90">
                "{t.quote}"
              </p>

              {/* Divider accent */}
              <div className="h-1 w-12 bg-primary/20 rounded-full group-hover:w-24 group-hover:bg-primary/40 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
