import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Shared building blocks for the landing sections, so every section uses the
 * same restrained motion, spacing and heading treatment.
 */

/** Subtle fade-up used consistently across sections. Spread onto a motion element. */
export const fadeUp: any = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
};

/** Same as fadeUp but staggered by index for grids/lists. */
export const fadeUpDelay = (i: number): any => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay: Math.min(i * 0.06, 0.4), ease: [0.22, 0.61, 0.36, 1] },
});

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";

  return (
    <motion.div
      {...fadeUp}
      className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
