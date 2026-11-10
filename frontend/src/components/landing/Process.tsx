import { motion } from "framer-motion";

interface ProcessColumn {
  step: string;
  title: string;
  desc: string;
}

const columns: ProcessColumn[] = [
  {
    step: "01 · Architecture",
    title: "Tailored architecture & scoping",
    desc: "Our engineers analyze your operational workflows, user journeys, and technical dependencies before writing code. Data models, API contracts, and milestone timelines are mapped specifically around how your business runs.",
  },
  {
    step: "02 · Development",
    title: "100% custom, zero templates",
    desc: "We engineer bespoke Android, iOS, and cloud SaaS platforms built entirely around your business logic. Agile two-week development sprints with bi-weekly live demos let you test and validate real working software at every step.",
  },
  {
    step: "03 · Quality Assurance",
    title: "Multi-stage QA & security gates",
    desc: "Every release undergoes rigorous performance profiling, cross-device responsiveness checks, and security audits. Your team receives private staging access to test and approve features before anything reaches production.",
  },
  {
    step: "04 · Delivery",
    title: "Production launch & full IP transfer",
    desc: "We manage complete deployment to Google Play, Apple App Store, and cloud infrastructure. On handover, you receive complete source code, repository credentials, and technical documentation with 100% IP ownership.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 md:py-28 border-y border-border bg-[#E0EEE0]/15 dark:bg-muted/10">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Header matching reference structure */}
        <div className="max-w-3xl mb-12 md:mb-14">
          <div className="brand-structure-bar mb-3">
            <p className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#228B22]">
              {"// How INWORA Builds"}
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-foreground leading-[1.15]">
            Milestone-driven engineering is standard practice here,{" "}
            <span className="text-[#228B22] dark:text-[#3cd43c]">not an afterthought</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            Guided by our motto — <strong className="text-foreground font-semibold">"Innovate, Automate, Scale"</strong> — our in-house engineering team applies this disciplined framework across every client build and proprietary product. What follows is our exact delivery mechanism — from architecture to launch.
          </p>
        </div>

        {/* 4-column connected box structure */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-[#E0EEE0] dark:border-border bg-card shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
            {columns.map((col) => (
              <div key={col.step} className="p-6 sm:p-7 flex flex-col justify-start">
                <span className="font-mono text-xs font-bold text-[#228B22] tracking-wider">
                  {col.step}
                </span>
                <h3 className="mt-3.5 mb-3 text-base sm:text-lg font-bold text-foreground leading-snug">
                  {col.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {col.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* The bottom callout card matching reference structure */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-6 rounded-2xl border border-[#E0EEE0] dark:border-border bg-card p-6 sm:p-8 border-l-4 border-l-[#228B22] shadow-sm"
        >
          <h3 className="text-base sm:text-lg font-bold text-foreground mb-4">
            The INWORA standard, stated plainly
          </h3>

          <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            <p>
              <strong className="font-semibold text-foreground">We deliver:</strong> 100% custom-engineered code, full intellectual property and repository ownership, bi-weekly live sprint demos, comprehensive API documentation, and dedicated post-launch support.
            </p>

            <p>
              <strong className="font-semibold text-foreground">We never do:</strong> Resell generic templates, lock clients into proprietary ecosystems, outsource core development to unverified freelancers, or deliver unmaintained code. Our dedicated in-house engineers remain accountable for every line shipped.
            </p>

            <p className="pt-1 text-muted-foreground/90">
              We publish this standard because software should be an enduring commercial asset, not a technical liability. Over 80+ shipped projects and 3 proprietary subscription products, building reliable, scalable systems across Tamil Nadu is how we ensure your business grows.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
