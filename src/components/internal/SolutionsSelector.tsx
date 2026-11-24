"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { hubSolutions, statusMeta, type HubSolution } from "@/lib/solutionsHub";
import { projects } from "@/lib/content";
import RollText from "@/components/nav/RollText";
import HubVisual from "./HubVisual";
import { SlideControls, useSlideNav } from "@/components/ui/Slides";

export function StatusChip({ status }: { status: keyof typeof statusMeta }) {
  const { lang } = useLanguage();
  const tone =
    status === "built" ? "border-copper/60 text-copper" : status === "proposed" ? "border-white/30 text-[#F0EAE0]/70" : "border-white/15 text-[#F0EAE0]/45";
  return (
    <span title={statusMeta[status].hint[lang]} className={`shrink-0 rounded-full border px-2 py-[2px] font-mono text-[9px] uppercase tracking-[0.08em] ${tone}`}>
      {statusMeta[status].label[lang]}
    </span>
  );
}

function Detail({ s, compact = false }: { s: HubSolution; compact?: boolean }) {
  const { lang } = useLanguage();
  const related = s.relatedProject ? projects.find((p) => p.slug === s.relatedProject) : undefined;
  const caps = s.capabilities.slice(0, compact ? 5 : 6);
  return (
    <div>
      <h3 className="font-display text-[clamp(1.7rem,2.6vw,2.7rem)] font-medium uppercase leading-[0.98] tracking-[-0.025em] text-[#F0EAE0]">
        {s.headline.map((l, i) => (
          <span key={i} className="block overflow-hidden pb-[0.05em]">
            <span className="int-rise" style={{ animationDelay: `${i * 90}ms` }}>
              {l[lang]}
            </span>
          </span>
        ))}
      </h3>
      <p className="int-fade mt-4 max-w-md text-[15px] leading-relaxed text-[#F0EAE0]/70" style={{ animationDelay: "180ms" }}>
        {s.statement[lang]}
      </p>
      <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
        {caps.map((cap, i) => (
          <li key={cap.label.en} className="int-fade flex items-center justify-between gap-3 py-2 text-[13px] text-[#F0EAE0]/85" style={{ animationDelay: `${240 + i * 45}ms` }}>
            <span>{cap.label[lang]}</span>
            <StatusChip status={cap.status} />
          </li>
        ))}
      </ul>
      {related && (
        <p className="int-fade mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-[#F0EAE0]/50" style={{ animationDelay: "520ms" }}>
          {lang === "en" ? "Related project" : "Proyek terkait"}: <Link href="/our-work" className="text-copper underline-offset-4 hover:underline">{related.title[lang]}</Link>
        </p>
      )}
      <Link href={`/solutions/${s.slug}`} aria-label={`${s.name[lang]}`} className="group/roll int-fade mt-5 inline-flex items-center gap-2 rounded-full bg-[#F0EAE0] px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#090A0E] transition-colors hover:bg-solar" style={{ animationDelay: "560ms" }}>
        <RollText text={lang === "en" ? "Explore solution" : "Jelajahi solusi"} className="[&_span>span:last-child]:!text-[#090A0E]" />
        <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}

export default function SolutionsSelector() {
  const { lang } = useLanguage();
  const [sel, setSel] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [open, setOpen] = useState(0); // mobile accordion
  const stageRef = useRef<HTMLDivElement>(null);
  const n = hubSolutions.length;
  const active = hoverIdx ?? sel;
  const step = (d: 1 | -1) => {
    setHoverIdx(null);
    setSel((i) => (i + d + n) % n);
  };
  useSlideNav(stageRef, step);

  const jumpTo = (i: number) => {
    setHoverIdx(null);
    setSel(i);
  };

  return (
    <section id="selector" aria-label={lang === "en" ? "Solutions explorer" : "Penjelajah solusi"} className="relative bg-[#090A0E] text-[#F0EAE0]">
      {/* ---------- desktop: three-zone explorer, advanced by arrows, keys, swipe or clicking a name ---------- */}
      <div className="relative hidden lg:block">
        <div ref={stageRef} className="relative h-[100svh] overflow-hidden" style={{ ["--ui" as string]: 1 }}>
          <div className="pointer-events-none relative grid h-full grid-cols-[0.9fr_1.35fr_1fr] gap-10 px-8 pb-10 pt-28">
          {/* LEFT: navigation */}
          <div className="pointer-events-auto flex flex-col justify-between" style={{ opacity: "var(--ui)" }} onMouseLeave={() => setHoverIdx(null)}>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#F0EAE0]/45">{lang === "en" ? "Business systems" : "Sistem bisnis"}</span>
              <ul className="mt-5">
                {hubSolutions.map((s, i) => {
                  const on = i === active;
                  return (
                    <li key={s.slug} className="border-b border-white/[0.07]">
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        onMouseEnter={() => setHoverIdx(i)}
                        onFocus={() => setHoverIdx(i)}
                        onBlur={() => setHoverIdx(null)}
                        aria-current={on ? "true" : undefined}
                        className="group/roll relative flex w-full items-center gap-3 py-[1.15vh] text-left"
                      >
                        <span aria-hidden className={`h-px bg-copper transition-all duration-500 ${on ? "w-6" : "w-0"}`} />
                        <span className={`font-mono text-[10px] tracking-[0.1em] transition-colors duration-500 ${on ? "text-copper" : "text-[#F0EAE0]/35"}`}>{s.num}</span>
                        <RollText
                          text={s.name[lang].toUpperCase()}
                          className={`font-mono text-[clamp(11px,1.05vw,14px)] uppercase tracking-[0.04em] transition-colors duration-500 ${on ? "text-[#F0EAE0]" : "text-[#F0EAE0]/40"}`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#F0EAE0]/40">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>

          {/* CENTER: visual showcase */}
          <div className="relative flex items-center">
            <div className="pointer-events-auto relative aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-white/10">
              {hubSolutions.map((s, i) => {
                const state = i === active ? "on" : i < active ? "before" : "after";
                return (
                  <div
                    key={s.slug}
                    aria-hidden={state !== "on"}
                    className="absolute inset-0 transition-[clip-path,opacity] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
                    style={{
                      clipPath: state === "on" ? "inset(0% 0% 0% 0%)" : state === "before" ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
                      opacity: state === "on" ? 1 : 0.4,
                    }}
                  >
                    <HubVisual s={s} className="h-full w-full transition-transform duration-[1400ms] ease-out" />
                  </div>
                );
              })}
            </div>
            {/* orbit detail that turns with the selection */}
            <svg aria-hidden viewBox="-100 -100 200 200" className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 transition-transform duration-[1200ms] ease-out" style={{ transform: `rotate(${active * 45}deg)` }}>
              <circle r="70" fill="none" stroke="#C18D6B" strokeWidth="0.6" opacity="0.6" />
              <circle r="46" fill="none" stroke="#F0EAE0" strokeWidth="0.5" opacity="0.3" />
              <circle cx="70" cy="0" r="3" fill="#E98459" />
            </svg>
            <p style={{ opacity: "var(--ui)" }} className="absolute -bottom-1 left-0 translate-y-full pt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-[#F0EAE0]/35">
              {hubSolutions[active].shot
                ? hubSolutions[active].shotCaption?.[lang] ?? ""
                : lang === "en" ? "Illustrative interface, not a client screenshot" : "Ilustrasi antarmuka, bukan tangkapan layar klien"}
            </p>
          </div>

          {/* RIGHT: description */}
          <div className="pointer-events-auto flex items-center overflow-hidden" style={{ opacity: "var(--ui)" }}>
            <div key={active} className="w-full">
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.1em] text-copper">{hubSolutions[active].name[lang]}</span>
              <Detail s={hubSolutions[active]} />
            </div>
          </div>
          </div>
          <SlideControls idx={active} n={n} onStep={step} className="absolute bottom-8 right-8 z-30" />
        </div>
      </div>

      {/* ---------- mobile / tablet: accessible accordion ---------- */}
      <div className="px-5 py-16 lg:hidden">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#F0EAE0]/45">{lang === "en" ? "Business systems" : "Sistem bisnis"}</span>
        <ul className="mt-4 border-t border-white/10">
          {hubSolutions.map((s, i) => {
            const isOpen = open === i;
            return (
              <li key={s.slug} className="border-b border-white/10">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`sol-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] tracking-[0.1em] text-copper">{s.num}</span>
                      <span className={`font-mono text-[13px] uppercase tracking-[0.04em] ${isOpen ? "text-[#F0EAE0]" : "text-[#F0EAE0]/60"}`}>{s.name[lang]}</span>
                    </span>
                    {isOpen ? <Minus size={16} aria-hidden /> : <Plus size={16} aria-hidden />}
                  </button>
                </h3>
                {isOpen && (
                  <div id={`sol-panel-${i}`} className="pb-8">
                    <div className="mb-5 overflow-hidden rounded-[3px] border border-white/10">
                      <HubVisual s={s} className="aspect-[16/10] w-full" />
                    </div>
                    <Detail s={s} compact />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
