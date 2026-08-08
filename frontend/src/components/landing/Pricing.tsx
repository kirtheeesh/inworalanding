import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SectionHeading, fadeUpDelay } from "./_shared";

const plans = [
  {
    name: "Starter",
    price: "Get quote",
    tagline: "For small businesses",
    desc: "Launch fast with the essentials. Ideal for startups and small teams getting started with digital products.",
    features: [
      "1 product or app",
      "Basic subscription access",
      "Standard support",
      "Core feature set",
      "App Store deployment",
    ],
    cta: "Start free trial",
    popular: false,
  },
  {
    name: "Growth",
    price: "Get quote",
    tagline: "For scaling teams",
    desc: "Everything in Starter, plus advanced tools and priority support for businesses ready to scale fast.",
    features: [
      "Up to 3 products or apps",
      "Priority subscription support",
      "Advanced analytics",
      "Custom UI/UX design",
      "Dedicated onboarding",
    ],
    cta: "Start subscription",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    tagline: "For large organizations",
    desc: "Full-stack custom development with white-label options, SLAs, and enterprise-grade integrations.",
    features: [
      "Unlimited products & apps",
      "White-label solutions",
      "Dedicated account manager",
      "Custom integrations & API",
      "24/7 priority support & SLA",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

export default function Pricing() {
  const handlePlanClick = (planName: string) => {
    const msg =
      planName === "Enterprise"
        ? "Hello INWORA! I am interested in custom integrations and would like to contact sales for the Enterprise Plan."
        : `Hello INWORA! I would like to get a quote/book a demo for the ${planName} Plan.`;
    window.open(`https://wa.me/919047370027?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple subscription plans"
          subtitle="Transparent pricing for every stage of your business. Every plan is fully customizable to your specific needs."
        />

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              {...fadeUpDelay(i)}
              className={`relative flex flex-col rounded-xl border bg-card p-7 ${
                plan.popular ? "border-primary/50 ring-1 ring-primary/15 md:-mt-2 md:pb-9" : "border-border"
              }`}
              data-testid={`card-pricing-${plan.name.toLowerCase()}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="text-3xl font-bold tracking-tight text-foreground">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-sm text-muted-foreground">/ project</span>}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{plan.desc}</p>

              <ul className="mt-6 mb-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePlanClick(plan.name)}
                variant={plan.popular ? "default" : "outline"}
                size="lg"
                className="mt-auto w-full rounded-lg"
                data-testid={`button-pricing-${plan.name.toLowerCase()}`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          All plans are fully customizable to your business.{" "}
          <a href="#contact" className="font-medium text-primary hover:underline">
            Talk to our team
          </a>{" "}
          for a personalized quote.
        </p>
      </div>
    </section>
  );
}
