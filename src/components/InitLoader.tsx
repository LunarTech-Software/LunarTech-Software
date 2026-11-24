"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/lib/language-context";
import { industries, solutions } from "@/lib/content";

export default function InitLoader() {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (done) return;
    const start = performance.now();
    const duration = 1400;
    let raf: number;
    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [done]);

  // Light up one more line of each column as progress climbs.
  const lit = (list: number) => Math.ceil((progress / 100) * list);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-void px-5 py-6 font-mono text-[10px] uppercase tracking-[0.08em] sm:px-8"
        >
          <div className="flex items-start justify-between">
            <span className="font-display text-xl tracking-[0.04em] text-foreground">LUNAR</span>
            <span className="text-foreground tabular-nums">{String(progress).padStart(2, "0")}%</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <ul className="space-y-1.5">
              {industries.slice(0, 9).map((item, i) => (
                <li key={item.en} className={i < lit(9) ? "text-foreground" : "text-technical/40"}>
                  {t(item)}
                </li>
              ))}
            </ul>
            <ul className="hidden space-y-1.5 text-right sm:block">
              {solutions.map((s, i) => (
                <li key={s.slug} className={i < lit(solutions.length) ? "text-foreground" : "text-technical/40"}>
                  {t(s.name)}
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px w-full bg-line">
            <div className="h-px bg-accent" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
