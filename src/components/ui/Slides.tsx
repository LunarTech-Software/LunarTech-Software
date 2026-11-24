"use client";

import { useEffect, useRef, type RefObject } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

/**
 * Click, arrow-key and swipe navigation for the slide-style sections that used to be driven by long pinned
 * scrolling. No scroll distance is reserved, so the page scrolls normally and nothing lags.
 * Keys only act while the section is on screen; swipe only counts when it is mostly horizontal.
 */
export function useSlideNav(ref: RefObject<HTMLElement | null>, step: (d: 1 | -1) => void) {
  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // measured at the moment of the key press, so there is no stale "is it on screen" state to get out of step
    const onScreen = () => {
      const r = el.getBoundingClientRect();
      const shown = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
      return shown > Math.min(r.height, window.innerHeight) * 0.5;
    };
    const onKey = (e: KeyboardEvent) => {
      if (!onScreen() || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        stepRef.current(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepRef.current(-1);
      }
    };
    let x0 = 0;
    let y0 = 0;
    const down = (e: TouchEvent) => {
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    };
    const up = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) stepRef.current(dx < 0 ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    el.addEventListener("touchstart", down, { passive: true });
    el.addEventListener("touchend", up, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      el.removeEventListener("touchstart", down);
      el.removeEventListener("touchend", up);
    };
  }, [ref]);
}

export function SlideControls({ idx, n, onStep, className = "", tone = "#F0EAE0" }: { idx: number; n: number; onStep: (d: 1 | -1) => void; className?: string; tone?: string }) {
  const { lang } = useLanguage();
  const en = lang === "en";
  const btn = "flex h-12 w-12 items-center justify-center rounded-full border transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  return (
    <div className={`flex items-center gap-4 ${className}`} style={{ color: tone }}>
      <span className="font-mono text-[11px] tracking-[0.08em]" aria-live="polite">
        {String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
      </span>
      <button type="button" onClick={() => onStep(-1)} aria-label={en ? "Previous" : "Sebelumnya"} className={btn} style={{ borderColor: "currentColor", outlineColor: tone }}>
        <ArrowLeft size={18} />
      </button>
      <button type="button" onClick={() => onStep(1)} aria-label={en ? "Next" : "Berikutnya"} className={btn} style={{ borderColor: "currentColor", outlineColor: tone }}>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
