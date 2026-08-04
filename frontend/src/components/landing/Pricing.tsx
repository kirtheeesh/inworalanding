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
  const handlePlanClick = (planName: string) => {
    let msg = "";
    if (planName === "Starter") {
      msg = "Hello INWORA! I would like to get a quote/book a demo for the Starter Plan.";
    } else if (planName === "Growth") {
      msg = "Hello INWORA! I would like to get a quote/book a demo for the Growth Plan.";
    } else if (planName === "Enterprise") {
      msg = "Hello INWORA! I am interested in custom integrations and would like to contact sales for the Enterprise Plan.";
    }
    window.open(`https://wa.me/919047370027?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="pricing" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4"
          >
            Pricing
          </motion.span>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch perspective-1000">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.15, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ 
                y: -15, 
                rotateY: i === 0 ? 5 : i === 2 ? -5 : 0,
                scale: plan.popular ? 1.05 : 1.03,
                boxShadow: "0 25px 60px -15px rgba(0,0,0,0.1)"
              }}
              className={`relative flex flex-col rounded-[2.5rem] border-2 shadow-sm ${plan.border} ${
                plan.popular
                  ? "bg-gradient-to-br from-primary via-primary to-primary/90 text-white z-10"
                  : "bg-card hover:border-primary/30"
              } p-8 lg:p-10 transition-all duration-500`}
              data-testid={`card-pricing-${plan.name.toLowerCase()}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <motion.div 
                  initial={{ rotate: -5 }}
                  animate={{ rotate: [5, -5, 5] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-5 left-1/2 -translate-x-1/2 z-20"
                >
                  <span className="rounded-full bg-foreground px-6 py-2 text-[10px] font-black uppercase tracking-tighter text-background whitespace-nowrap shadow-xl block">
                    🌟 Most Popular Choose
                  </span>
                </motion.div>
              )}

              {/* Icon */}
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${plan.iconBg} shadow-inner transition-colors`}
              >
                <plan.icon className="h-7 w-7" />
              </motion.div>

              {/* Name */}
              <h3
                className="text-2xl font-black mb-1 group-hover:text-primary transition-colors"
                style={{ fontFamily: "var(--app-font-display)" }}
              >
                {plan.name}
              </h3>
              <p className={`text-sm mb-4 font-bold ${plan.popular ? "text-white/80" : "text-primary"}`}>
                {plan.tagline}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className={`text-sm ml-2 font-semibold ${plan.popular ? "text-white/60" : "text-muted-foreground"}`}>
                    / enterprise project
                  </span>
                )}
              </div>

              <p className={`text-sm leading-relaxed mb-8 flex-1 font-medium ${plan.popular ? "text-white/90" : "text-muted-foreground"}`}>
                {plan.desc}
              </p>

              {/* Features */}
              <motion.ul 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
                className="space-y-4 mb-10"
              >
                {plan.features.map((f) => (
                  <motion.li 
                    key={f} 
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="flex items-center gap-3 text-sm font-semibold"
                  >
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full ${plan.popular ? "bg-white/20" : "bg-primary/10"}`}>
                      <Check className={`h-3 w-3 ${plan.popular ? "text-white" : "text-primary"}`} />
                    </div>
                    <span className={plan.popular ? "text-white" : "text-foreground"}>{f}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => handlePlanClick(plan.name)}
                  variant={plan.popular ? "secondary" : plan.variant}
                  size="lg"
                  className={`w-full rounded-2xl py-7 text-base font-black transition-all shadow-xl shadow-black/10 ${
                    plan.popular 
                      ? "bg-white text-primary hover:bg-secondary" 
                      : "border-primary/20 hover:bg-primary hover:text-white"
                  }`}
                  data-testid={`button-pricing-${plan.name.toLowerCase()}`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
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
