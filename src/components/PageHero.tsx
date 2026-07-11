import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Container } from "./Section";
import PageHeroBackdrop from "./PageHeroBackdrop";

interface PageHeroProps {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
}

/** Shared inner-page hero: teal kicker, large confident heading, muted subtitle, orbit backdrop. */
export default function PageHero({ kicker, title, subtitle }: PageHeroProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/8 pb-14 pt-36 md:pb-20 md:pt-44">
      <PageHeroBackdrop />
      <Container className="relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 text-xs uppercase tracking-[0.24em] text-lunar-teal"
        >
          {kicker}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight text-soft-white md:text-6xl"
          style={{ textWrap: "balance" }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-silver md:text-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </Container>
    </header>
  );
}
