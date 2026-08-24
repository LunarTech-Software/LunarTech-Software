"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function InitLoader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (done) return;
    const start = performance.now();
    const duration = 900;
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 150);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
        >
          <span className="lunar-kicker mb-3">LUNAR</span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted">System Initialising</span>
          <span className="mt-6 font-mono text-2xl tabular-nums text-foreground">{progress}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
