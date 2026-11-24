"use client";

import { useLanguage } from "@/lib/language-context";
import { solutions } from "@/lib/content";

export default function Marquee() {
  const { t } = useLanguage();
  const items = solutions.map((s) => t(s.name));
  const track = [...items, ...items];

  return (
    <div className="theme-light marquee-viewport overflow-hidden border-y border-line py-5">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {[...track, ...track].map((label, i) => (
          <span key={i} className="flex items-center gap-12 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            {label}
            <span aria-hidden className="text-accent">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
