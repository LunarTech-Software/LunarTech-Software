"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { hero, position, differentiators, clientSegments, honestyStatement, tagline } from "@/lib/content";
import { hubSolutions } from "@/lib/solutionsHub";
import RollText from "@/components/nav/RollText";
import Reveal from "@/components/ui/Reveal";
import MoonArt from "./MoonArt";

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";

export default function AboutView() {
  const { lang, t } = useLanguage();
  const lines = lang === "en" ? ["ENGINEERING", "BEYOND THE", "ORDINARY."] : ["REKAYASA", "MELAMPAUI", "YANG BIASA."];

  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#090A0E] text-[#F0EAE0]">
        <MoonArt className="pointer-events-none absolute -right-[14vw] top-1/2 h-[min(104vh,980px)] w-[min(104vh,980px)] -translate-y-1/2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#090A0E] via-[#090A0E]/55 to-transparent" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-[9vh] pt-40 sm:px-8">
          <span className={`${mono} mb-5 flex items-center gap-3 text-[#F0EAE0]/70`}>
            <span className="h-px w-8 bg-copper" />
            {lang === "en" ? "About" : "Tentang"}
          </span>
          <h1 className="text-[clamp(2.7rem,8.6vw,9rem)] font-medium leading-[0.92] tracking-[-0.04em]">
            {lines.map((l) => (
              <span key={l} className="block overflow-hidden pb-[0.05em]">
                <span className="int-rise">{l}</span>
              </span>
            ))}
          </h1>
          <p className="int-fade mt-7 max-w-xl text-base font-light leading-relaxed text-[#F0EAE0]/75 lg:text-lg" style={{ animationDelay: "250ms" }}>
            {t(hero.subhead)}
          </p>
        </div>
      </section>

      <section className="theme-light relative" data-nav-light="true">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 lg:py-32">
          <span className={`${mono} text-technical`}>(01) {lang === "en" ? "Who we are" : "Siapa kami"}</span>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <Reveal>
              <h2 className="lunar-statement">
                <span className="dim">{t(position.heading).split(" ").slice(0, -1).join(" ")} </span>
                <span>{t(position.heading).split(" ").slice(-1)}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-muted">{t(position.body)}</p>
              <p className="mt-5 font-display text-xl font-medium uppercase leading-tight tracking-tight text-foreground">{t(position.highlight)}</p>
            </Reveal>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1400px] border-t border-line px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
            <div>
              <span className={`${mono} text-technical`}>(02) {lang === "en" ? "How we work" : "Cara kami bekerja"}</span>
              <p className="mt-4 text-sm text-muted">{tagline}</p>
            </div>
            <ol className="border-t border-line">
              {differentiators.map((d, i) => (
                <Reveal key={d.title.en} delay={i * 0.04}>
                  <li className="grid gap-2 border-b border-line py-6 sm:grid-cols-[3rem_1fr_1.2fr] sm:gap-6">
                    <span className="font-mono text-[11px] tracking-[0.1em] text-copper">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-xl font-medium uppercase leading-tight tracking-[-0.02em] text-foreground">{t(d.title)}</h3>
                    <p className="text-[15px] leading-relaxed text-muted">{t(d.body)}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1400px] border-t border-line px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
            <span className={`${mono} text-technical`}>(03) {lang === "en" ? "What we build" : "Yang kami bangun"}</span>
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {hubSolutions.map((s) => (
                <li key={s.slug} className="border-b border-line">
                  <Link href={`/solutions/${s.slug}`} aria-label={s.name[lang]} className="group/roll flex items-center justify-between py-4">
                    <RollText text={s.name[lang].toUpperCase()} className="font-mono text-[12px] tracking-[0.04em] text-foreground" />
                    <ArrowUpRight aria-hidden size={16} className="text-muted transition-all group-hover/roll:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
            <span className={`${mono} text-technical`}>(04) {lang === "en" ? "Who we build for" : "Untuk siapa kami membangun"}</span>
            <ul className="flex flex-wrap gap-2">
              {clientSegments.map((c) => (
                <li key={c.en} className="rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">
                  {t(c)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative bg-[#090A0E] text-[#F0EAE0]">
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20 lg:py-28">
          <span className={`${mono} text-copper`}>{t(honestyStatement.kicker)}</span>
          <div>
            <p className="max-w-3xl text-[clamp(1.4rem,2.6vw,2.2rem)] font-light leading-snug text-[#F0EAE0]/85">{t(honestyStatement.body)}</p>
            <Link href="/process" className="group/roll mt-9 inline-flex items-center gap-2 rounded-full bg-[#F0EAE0] px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#090A0E] transition-colors hover:bg-solar">
              <RollText text={lang === "en" ? "See how we work" : "Lihat cara kami bekerja"} className="[&_span>span:last-child]:!text-[#090A0E]" />
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
