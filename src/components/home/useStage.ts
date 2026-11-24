"use client";

import { useEffect, useRef, type RefObject } from "react";

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Scroll-driven scene progress.
 *  - "sticky": a tall wrapper holding a sticky stage; p runs 0..1 while the stage is pinned.
 *  - "pass":   p runs 0..1 as the element travels through the viewport.
 * Writes `--p` on the element and calls onProgress. With reduced motion, p is fixed at 1
 * (every scene is designed so its final state is a complete, readable composition).
 */
export function useStage(ref: RefObject<HTMLElement | null>, onProgress?: (p: number) => void, mode: "sticky" | "pass" = "sticky") {
  const cb = useRef(onProgress);
  useEffect(() => {
    cb.current = onProgress;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (reduced) p = 1;
      else if (mode === "sticky") p = clamp01(-r.top / Math.max(r.height - vh, 1));
      else p = clamp01((vh - r.top) / (vh + r.height));
      el.style.setProperty("--p", String(p));
      cb.current?.(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, mode]);
}
