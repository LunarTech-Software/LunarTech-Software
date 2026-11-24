"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { hubSolutions, overviewAreas, statusMeta, type CapStatus } from "@/lib/solutionsHub";
import RollText from "@/components/nav/RollText";
import Reveal from "@/components/ui/Reveal";
import SolutionVisual from "./SolutionVisual";
import SolutionsSelector from "./SolutionsSelector";
import HardwareSection from "./HardwareSection";
import ThreeAreas from "./ThreeAreas";

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";

function LightChip({ status }: { status: CapStatus }) {
  const { lang } = useLanguage();
  const tone = status === "built" ? "border-copper text-[#9a6a4a]" : status === "proposed" ? "border-[#17191E]/40 text-[#17191E]/70" : "border-[#17191E]/20 text-[#17191E]/50";
  return (
    <span title={statusMeta[status].hint[lang]} className={`shrink-0 rounded-full border px-2 py-[2px] font-mono text-[9px] uppercase tracking-[0.08em] ${tone}`}>
      {statusMeta[status].label[lang]}
    </span>
  );
}

function Hero() {
  const { lang } = useLanguage();
  const lines = lang === "en" ? ["TECHNOLOGY BUILT", "AROUND YOUR BUSINESS."] : ["TEKNOLOGI DIBANGUN", "SESUAI BISNIS ANDA."];
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#090A0E] text-[#F0EAE0]">
      {/* Saturn and the Moon: the orbit the whole identity is named for */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <svg viewBox="-400 -400 800 800" className="absolute -right-[16vw] top-[46%] h-[100vh] w-[100vh] -translate-y-1/2">
          {[170, 260, 350].map((r, i) => (
            <circle key={r} r={r} fill="none" stroke="#C18D6B" strokeWidth={0.8} opacity={0.24 - i * 0.05} />
          ))}
          <circle r={260} fill="none" stroke="#F0EAE0" strokeWidth={5} strokeDasharray="1 18.7" opacity={0.14} />
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/space/saturn-cutout.webp"
          alt=""
          width={920}
          height={540}
          className="int-float absolute -right-[8%] top-[16%] w-[62vw] max-w-[1000px] rotate-[-6deg] drop-shadow-[0_30px_80px_rgba(233,132,89,0.18)]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/space/moon-cutout.webp"
          alt=""
          width={900}
          height={900}
          className="int-float absolute bottom-[14%] right-[6%] hidden w-[14vw] max-w-[220px] opacity-90 sm:block"
          style={{ animationDelay: "-3s" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090A0E] via-[#090A0E]/75 to-transparent lg:via-[#090A0E]/55" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#090A0E] to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-[9vh] pt-40 sm:px-8">
        <span className={`${mono} mb-5 flex items-center gap-3 text-[#F0EAE0]/70`}>
          <span className="h-px w-8 bg-copper" />
          {lang === "en" ? "Solutions" : "Solusi"}
        </span>
        <h1 className="text-[clamp(2.5rem,7.6vw,8rem)] font-medium leading-[0.93] tracking-[-0.04em]">
          {lines.map((l) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]">
              <span className="int-rise">{l}</span>
            </span>
          ))}
        </h1>
        <p className="int-fade mt-7 max-w-xl text-base font-light leading-relaxed text-[#F0EAE0]/75 lg:text-lg" style={{ animationDelay: "250ms" }}>
          {lang === "en"
            ? "From custom enterprise systems to intelligent automation, we develop digital solutions around the way your business actually operates."
            : "Dari sistem perusahaan kustom hingga otomasi cerdas, kami mengembangkan solusi digital sesuai cara bisnis Anda benar-benar beroperasi."}
        </p>
      </div>
    </section>
  );
}

function Intro() {
  const { lang } = useLanguage();
  return (
    <section className="theme-light relative" data-nav-light="true">
      <div className="mx-auto w-full max-w-[1400px] px-5 pb-20 pt-24 sm:px-8 lg:pt-32">
        <span className={`${mono} text-technical`}>(01) {lang === "en" ? "Introduction" : "Pengantar"}</span>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="lunar-statement">
              {lang === "en" ? (
                <>
                  <span>INTELLIGENT SYSTEMS</span> <span className="dim">FOR COMPLEX</span> <span>OPERATIONS.</span>
                </>
              ) : (
                <>
                  <span>SISTEM CERDAS</span> <span className="dim">UNTUK OPERASI</span> <span>YANG KOMPLEKS.</span>
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted">
              {lang === "en"
                ? "We design and develop integrated technology that simplifies workflows, improves visibility, and connects the operational systems businesses depend on."
                : "Kami merancang dan mengembangkan teknologi terpadu yang menyederhanakan alur kerja, meningkatkan visibilitas, dan menghubungkan sistem operasional yang menjadi tumpuan bisnis."}
            </p>
          </Reveal>
        </div>

        {/* overview of the six capability areas: a ruled index, not cards */}
        <ul className="mt-20 border-t border-line">
          {overviewAreas.map((a) => (
            <li key={a.num} className="border-b border-line">
              <Link href={`/solutions/${a.slug}`} aria-label={a.name[lang]} className="group/roll flex items-center gap-6 py-5 sm:gap-10 sm:py-6">
                <span className="w-8 font-mono text-[11px] tracking-[0.1em] text-copper">{a.num}</span>
                <RollText text={a.name[lang].toUpperCase()} className="font-display text-[clamp(1.3rem,3vw,2.5rem)] font-medium tracking-[-0.02em] text-foreground" />
                <ArrowUpRight aria-hidden size={22} className="ml-auto shrink-0 text-muted transition-all duration-300 group-hover/roll:-translate-y-1 group-hover/roll:translate-x-1 group-hover/roll:text-accent" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Business() {
  const { lang } = useLanguage();
  const blocks = ["fleet-management", "hauling-management", "heavy-equipment-rental", "erp"].map((slug) => hubSolutions.find((s) => s.slug === slug)!);
  return (
    <section className="theme-light relative border-t border-line" data-nav-light="true">
      <div className="mx-auto w-full max-w-[1400px] px-5 pb-24 pt-20 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className={`${mono} text-technical`}>(02) {lang === "en" ? "Business-specific solutions" : "Solusi khusus bisnis"}</span>
            <h2 className="lunar-h2 mt-4 max-w-3xl">
              {lang === "en" ? "Custom software, shaped for the operations behind it." : "Perangkat lunak kustom, dibentuk untuk operasi di baliknya."}
            </h2>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted" aria-label={lang === "en" ? "Status legend" : "Legenda status"}>
            {(["built", "proposed", "bespoke"] as const).map((s) => (
              <li key={s} className="flex items-center gap-2">
                <LightChip status={s} />
                <span className="normal-case tracking-normal">{statusMeta[s].hint[lang]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          {blocks.map((b, i) => (
            <Reveal key={b.slug}>
              <article className="grid gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
                <div className={`lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <span className="font-mono text-[11px] tracking-[0.1em] text-copper">{b.num}</span>
                  <h3 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,3.4rem)] font-medium uppercase leading-[0.97] tracking-[-0.03em] text-foreground">
                    {b.headline.map((l) => (
                      <span key={l.en} className="block">
                        {l[lang]}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">{b.body[lang]}</p>
                  {b.note && <p className="mt-4 border-l-2 border-copper pl-3 text-[13px] leading-relaxed text-foreground/80">{b.note[lang]}</p>}
                  <Link href={`/solutions/${b.slug}`} className="group/roll mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-void transition-colors hover:bg-accent">
                    <RollText text={lang === "en" ? "Explore solution" : "Jelajahi solusi"} className="[&_span>span:last-child]:!text-void" />
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
                <div className={`lg:col-span-7 ${i % 2 ? "lg:order-1" : ""}`}>
                  <div className="overflow-hidden rounded-[3px] bg-[#090A0E]">
                    <SolutionVisual kind={b.visual} className="aspect-[16/10] w-full" />
                  </div>
                  <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                    {b.capabilities.slice(0, 6).map((c) => (
                      <li key={c.label.en} className="flex items-center justify-between gap-3 border-b border-line py-2.5 text-[13px] text-foreground">
                        <span>{c.label[lang]}</span>
                        <LightChip status={c.status} />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  const { lang } = useLanguage();
  return (
    <section className="relative bg-[#090A0E] text-[#F0EAE0]">
      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-24 sm:px-8 lg:py-32">
        <span className={`${mono} text-copper`}>{lang === "en" ? "Start a project" : "Mulai proyek"}</span>
        <h2 className="mt-5 max-w-4xl text-[clamp(2.2rem,6vw,5.6rem)] font-medium leading-[0.96] tracking-[-0.035em]">
          {lang === "en" ? "TELL US HOW YOUR OPERATION RUNS TODAY." : "CERITAKAN BAGAIMANA OPERASI ANDA BERJALAN SAAT INI."}
        </h2>
        <Link href="/contact" className="group/roll mt-9 inline-flex items-center gap-2 rounded-full bg-[#F0EAE0] px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#090A0E] transition-colors hover:bg-solar">
          <RollText text={lang === "en" ? "Request a scoping call" : "Minta sesi pembahasan"} className="[&_span>span:last-child]:!text-[#090A0E]" />
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}

export default function SolutionsView() {
  return (
    <>
      <Hero />
      <Intro />
      <ThreeAreas />
      <Business />
      <SolutionsSelector />
      <HardwareSection />
      <Cta />
    </>
  );
}
