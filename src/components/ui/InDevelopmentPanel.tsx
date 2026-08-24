"use client";

import { Hammer } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function InDevelopmentPanel() {
  const { lang } = useLanguage();
  return (
    <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 rounded-t-2xl border border-b-0 border-line bg-panel">
      <Hammer size={22} className="text-technical" strokeWidth={1.5} />
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-technical">
        {lang === "en" ? "In development" : "Dalam pengembangan"}
      </span>
    </div>
  );
}
