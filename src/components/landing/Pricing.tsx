import { motion } from "framer-motion";
import { Check, Zap, Sparkles, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    icon: Zap,
    name: "Starter",
    price: "Get Quote",
    tagline: "Perfect for small businesses",
    desc: "Launch fast with the essentials. Ideal for startups and small teams getting started with digital products.",
    features: [
      "1 Product or App",
      "Basic subscription access",
      "Standard support",
      "Core feature set",
      "Monthly reporting",
      "App Store deployment",
    ],
    cta: "Start Free Trial",
    variant: "outline" as const,
    popular: false,
    iconBg: "bg-primary/10 text-primary",
    border: "border-border",
  },
  {
    icon: Sparkles,
    name: "Growth",
    price: "Get Quote",
    tagline: "Most chosen by scaling teams",
    desc: "Everything in Starter, plus advanced tools and priority support for businesses ready to scale fast.",
    features: [
      "Up to 3 Products or Apps",
      "Priority subscription support",
      "Advanced analytics",
      "Custom UI/UX design",
      "Multi-user access",
      "Dedicated onboarding",
    ],
    cta: "Start Subscription",
    variant: "default" as const,
    popular: true,
    iconBg: "bg-white/20 text-white",
    border: "border-primary",
  },
  {
    icon: Building,
    name: "Enterprise",
    price: "Custom",
    tagline: "Tailored for large organizations",
    desc: "Full-stack custom development with white-label options, SLAs, and enterprise-grade integrations.",
    features: [
      "Unlimited products & apps",
      "White-label solutions",
      "Dedicated account manager",
      "Custom integrations & API",
      "SLA guarantee",
      "24/7 priority support",
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
    popular: false,
    iconBg: "bg-primary/10 text-primary",
    border: "border-border",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

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
            Pricing
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground"
            style={{ fontFamily: "var(--app-font-display)" }}
          >
            Simple Subscription Plans
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for every stage of your business. All plans are fully customizable to your specific needs.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 0.61, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative flex flex-col rounded-3xl border-2 ${plan.border} ${
                plan.popular
                  ? "bg-gradient-to-b from-primary to-primary/80 text-white scale-[1.03]"
                  : "bg-card"
              } p-8 transition-all duration-300`}
              data-testid={`card-pricing-${plan.name.toLowerCase()}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-foreground px-5 py-1.5 text-xs font-extrabold text-background dark:bg-amber-400 dark:text-amber-900">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${plan.iconBg}`}>
                <plan.icon className="h-6 w-6" />
              </div>

              {/* Name */}
              <h3
                className="text-2xl font-extrabold mb-1"
                style={{ fontFamily: "var(--app-font-display)" }}
              >
                {plan.name}
              </h3>
              <p className={`text-sm mb-2 ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>
                {plan.tagline}
              </p>

              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl font-extrabold">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className={`text-sm ml-1 ${plan.popular ? "text-white/60" : "text-muted-foreground"}`}>
                    / project
                  </span>
                )}
              </div>

              <p className={`text-sm leading-relaxed mb-6 ${plan.popular ? "text-white/80" : "text-muted-foreground"}`}>
                {plan.desc}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className={`h-4 w-4 flex-shrink-0 ${plan.popular ? "text-white" : "text-primary"}`} />
                    <span className={plan.popular ? "text-white/90" : "text-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? "secondary" : plan.variant}
                size="lg"
                className={`w-full rounded-xl font-semibold ${plan.popular ? "bg-white text-primary hover:bg-white/90" : ""}`}
                data-testid={`button-pricing-${plan.name.toLowerCase()}`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-sm text-muted-foreground"
        >
          All plans are fully customizable based on your business size, scope, and specific needs.
          <a href="#contact" className="ml-1 font-semibold text-primary hover:underline">
            Talk to our team
          </a>{" "}
          for a personalized quote.
        </motion.p>
      </div>
    </section>
  );
}
