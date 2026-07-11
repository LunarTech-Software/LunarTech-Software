import { motion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** vertical offset the element rises from */
  y?: number;
}

/**
 * Shared scroll-in wrapper. Content is fully rendered by default; the reveal
 * only enhances an already-visible element, and is neutralised by the global
 * prefers-reduced-motion rule.
 */
export default function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
