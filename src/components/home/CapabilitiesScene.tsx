"use client";

import { useCallback, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { hubBySlug, type L, type VisualKey } from "@/lib/solutionsHub";
import SolutionVisual from "@/components/internal/SolutionVisual";
import { useStage } from "./useStage";

/**
 * SCENE 03: what we engineer.
 * Six capabilities, scroll-linked and directly selectable. An oversized numeral sits behind the
 * conceptual visual (asymmetry, not a grid of cards). Visuals are labelled as conceptual
 * illustrations, never screenshots.
 */

interface Cap {
  n: string;
  visual: VisualKey;
  name: L;
  line: L;
  points: L[];
}

const fromHub = (slug: string, n: string, name: L): Cap => {
  const h = hubBySlug(slug)!;
  return { n, visual: h.visual, name, line: h.statement, points: h.capabilities.slice(0, 3).map((c) => c.label) };
};

const CAPS: Cap[] = [
  fromHub("custom-business-systems", "01", { en: "Custom Business Systems", id: "Sistem Bisnis Kustom" }),
  fromHub("erp", "02", { en: "ERP & Operational Platforms", id: "ERP & Platform Operasional" }),
  fromHub("websites-platforms", "03", { en: "Websites & Applications", id: "Website & Aplikasi" }),
  fromHub("ai-automation", "04", { en: "AI & Workflow Automation", id: "AI & Otomasi Alur Kerja" }),
  fromHub("iot-integration", "05", { en: "IoT & Monitoring", id: "IoT & Pemantauan" }),
  {
    n: "06",
    visual: "integration",
    name: { en: "System Integration", id: "Integrasi Sistem" },
    line: {
      en: "Your systems talking to each other, through interfaces and data exchange scoped to each project.",
      id: "Sistem Anda saling berkomunikasi, melalui antarmuka dan pertukaran data yang disesuaikan dengan setiap proyek.",
    },
    points: [
      { en: "Connect to the tools you already use", id: "Terhubung dengan alat yang sudah Anda pakai" },
      { en: "Import from spreadsheets", id: "Impor dari spreadsheet" },
      { en: "Mapped and checked data flows", id: "Alur data yang dipetakan dan diperiksa" },
    ],
  },
];

const STEP = 0.55;

export default function CapabilitiesScene() {
  const { lang } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const n = CAPS.length;

  const onProgress = useCallback((p: number) => setIdx(Math.min(n - 1, Math.floor(p * n))), [n]);
  useStage(wrapRef, onProgress);

  const jump = (i: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / n) * travel, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const active = hover ?? idx;
  const cap = CAPS[active];
  const title = lang === "en" ? ["BUILT FOR THE WAY", "BUSINESS ACTUALLY WORKS."] : ["DIBANGUN SESUAI CARA", "BISNIS BENAR-BENAR BEKERJA."];

  return (
    <section
      id="capabilities"
      className="theme-light relative z-10 -mt-[9vw]"
      style={{ borderRadius: "50% 50% 0 0 / 9vw 9vw 0 0" }}
      aria-label={title.join(" ")}
    >
      {/* desktop: sticky explorer */}
      <div ref={wrapRef} className="stage-wrap hidden lg:block" style={{ height: `calc(100svh + ${n * STEP * 100}svh)` }}>
        <div className="stage-sticky sticky top-0 grid h-[100svh] grid-cols-[0.9fr_1.5fr] gap-10 overflow-hidden px-8 pb-10 pt-28">
          {/* giant numeral behind the visual */}
          <span aria-hidden className="pointer-events-none absolute -right-[2vw] bottom-[2vh] select-none font-display text-[34vw] font-medium leading-none tracking-[-0.06em] text-foreground/[0.06]">
            {cap.n}
          </span>

          <div className="relative flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-technical">{lang === "en" ? "What we engineer" : "Yang kami rekayasa"}</span>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,3vw,3.2rem)] font-medium uppercase leading-[0.98] tracking-[-0.03em] text-foreground">
                {title.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </h2>
            </div>
            <ul className="border-t border-line" onMouseLeave={() => setHover(null)}>
              {CAPS.map((c, i) => (
                <li key={c.n} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    onMouseEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                    aria-current={i === active ? "true" : undefined}
                    className="group flex w-full items-center gap-4 py-[1.2vh] text-left"
                  >
                    <span className={`font-mono text-[11px] tracking-[0.1em] transition-colors duration-500 ${i === active ? "text-accent" : "text-technical"}`}>{c.n}</span>
                    <span className={`font-display text-[clamp(1rem,1.7vw,1.7rem)] font-medium uppercase tracking-[-0.02em] transition-all duration-500 ${i === active ? "translate-x-2 text-foreground" : "text-foreground/35"}`}>
                      {c.name[lang]}
                    </span>
                    <span aria-hidden className={`ml-auto h-px bg-copper transition-all duration-500 ${i === active ? "w-10" : "w-0"}`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex flex-col justify-center">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[3px] bg-[#090A0E] shadow-[0_40px_80px_-30px_rgba(23,25,30,0.45)]">
              {CAPS.map((c, i) => (
                <div
                  key={c.n}
                  aria-hidden={i !== active}
                  className="absolute inset-0 transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
                  style={{ clipPath: i === active ? "inset(0 0 0 0)" : i < active ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)" }}
                >
                  <SolutionVisual kind={c.visual} className="h-full w-full" />
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-technical">{lang === "en" ? "Conceptual illustration, not a client screenshot" : "Ilustrasi konseptual, bukan tangkapan layar klien"}</p>
            <div key={active} className="relative mt-5 grid gap-6 xl:grid-cols-[1.1fr_1fr]">
              <p className="int-fade max-w-md text-[17px] leading-relaxed text-foreground">{cap.line[lang]}</p>
              <ul className="space-y-1.5">
                {cap.points.map((pt, i) => (
                  <li key={pt.en} className="int-fade flex items-center gap-2 text-[13px] text-muted" style={{ animationDelay: `${120 + i * 70}ms` }}>
                    <span aria-hidden className="h-px w-3 bg-copper" />
                    {pt[lang]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* mobile / tablet: stacked */}
      <div className="px-5 pb-16 pt-24 lg:hidden">
        <h2 className="font-display text-[clamp(1.8rem,7vw,2.6rem)] font-medium uppercase leading-[0.98] tracking-[-0.03em] text-foreground">
          {title.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h2>
        <ul className="mt-10 space-y-12">
          {CAPS.map((c) => (
            <li key={c.n}>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] tracking-[0.1em] text-accent">{c.n}</span>
                <h3 className="font-display text-2xl font-medium uppercase tracking-[-0.02em] text-foreground">{c.name[lang]}</h3>
              </div>
              <div className="mt-4 overflow-hidden rounded-[3px] bg-[#090A0E]">
                <SolutionVisual kind={c.visual} className="aspect-[16/10] w-full" />
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{c.line[lang]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
