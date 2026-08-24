"use client";

import { useLanguage } from "@/lib/language-context";
import { solutions } from "@/lib/content";

export default function Marquee() {
  const { t } = useLanguage();
  const items = solutions.map((s) => t(s.name));
  const track = [...items, ...items];

  return (
    <div className="marquee-viewport overflow-hidden border-y border-line bg-panel/40 py-5">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {[...track, ...track].map((label, i) => (
          <span key={i} className="flex items-center gap-12 text-sm text-muted">
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
