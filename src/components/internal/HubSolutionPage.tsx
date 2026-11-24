"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { hubSolutions, statusMeta, type HubSolution, type CapStatus } from "@/lib/solutionsHub";
import { projects, contact } from "@/lib/content";
import RollText from "@/components/nav/RollText";
import Reveal from "@/components/ui/Reveal";
import HubVisual from "./HubVisual";

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";

function Chip({ status, dark }: { status: CapStatus; dark?: boolean }) {
  const { lang } = useLanguage();
  const tone = dark
    ? status === "built" ? "border-copper/60 text-copper" : status === "proposed" ? "border-white/30 text-[#F0EAE0]/70" : "border-white/15 text-[#F0EAE0]/45"
    : status === "built" ? "border-copper text-[#9a6a4a]" : status === "proposed" ? "border-[#17191E]/40 text-[#17191E]/70" : "border-[#17191E]/20 text-[#17191E]/50";
  return (
    <span title={statusMeta[status].hint[lang]} className={`shrink-0 rounded-full border px-2 py-[2px] font-mono text-[9px] uppercase tracking-[0.08em] ${tone}`}>
      {statusMeta[status].label[lang]}
    </span>
  );
}

export default function HubSolutionPage({ solution: s }: { solution: HubSolution }) {
  const { lang } = useLanguage();
  const idx = hubSolutions.findIndex((x) => x.slug === s.slug);
  const prev = hubSolutions[(idx - 1 + hubSolutions.length) % hubSolutions.length];
  const next = hubSolutions[(idx + 1) % hubSolutions.length];
  const related = s.relatedProject ? projects.find((p) => p.slug === s.relatedProject) : undefined;
  const built = s.capabilities.filter((c) => c.status === "built").length;

  return (
    <>
      {/* editorial hero */}
      <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-[#090A0E] text-[#F0EAE0]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-[4%] top-[18%] hidden w-[52vw] max-w-[820px] lg:block">
            <HubVisual s={s} className="w-full rounded-[4px] border border-white/10" />
          </div>
          <svg viewBox="-400 -400 800 800" className="absolute -right-[20vw] top-1/2 h-[95vh] w-[95vh] -translate-y-1/2">
            {[170, 270, 370].map((r, i) => (
              <circle key={r} r={r} fill="none" stroke="#C18D6B" strokeWidth={0.9} opacity={0.2 - i * 0.04} />
            ))}
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0E] via-[#090A0E]/60 to-transparent lg:via-[#090A0E]/35" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#090A0E] to-transparent" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-[8vh] pt-40 sm:px-8">
          <nav aria-label="Breadcrumb" className={`${mono} mb-6 flex items-center gap-3 text-[#F0EAE0]/60`}>
            <Link href="/solutions" className="transition-colors hover:text-[#F0EAE0]">{lang === "en" ? "Solutions" : "Solusi"}</Link>
            <span aria-hidden className="h-px w-6 bg-copper" />
            <span className="text-[#F0EAE0]">{s.name[lang]}</span>
          </nav>
          <h1 className="max-w-[18ch] text-[clamp(2.3rem,6.6vw,7rem)] font-medium leading-[0.94] tracking-[-0.04em] lg:max-w-[14ch]">
            {s.headline.map((l) => (
              <span key={l.en} className="block overflow-hidden pb-[0.06em]">
                <span className="int-rise">{l[lang]}</span>
              </span>
            ))}
          </h1>
          <p className="int-fade mt-7 max-w-xl text-base font-light leading-relaxed text-[#F0EAE0]/75 lg:text-lg" style={{ animationDelay: "250ms" }}>
            {s.statement[lang]}
          </p>
          <div className="int-fade mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "340ms" }}>
            <Link href="/contact" className="group/roll inline-flex items-center gap-2 rounded-full bg-[#F0EAE0] px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#090A0E] transition-colors hover:bg-solar">
              <RollText text={lang === "en" ? "Start a project" : "Mulai proyek"} className="[&_span>span:last-child]:!text-[#090A0E]" />
              <ArrowUpRight size={14} />
            </Link>
            <span className={`${mono} text-[#F0EAE0]/45`}>{s.shot ? (s.shotCaption?.[lang] ?? "") : lang === "en" ? "Illustrative interface, not a client screenshot" : "Ilustrasi antarmuka, bukan tangkapan layar klien"}</span>
          </div>
        </div>
      </section>

      {/* the business problem */}
      <section className="theme-light relative" data-nav-light="true">
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20 lg:py-28">
          <span className={`${mono} text-technical`}>(01) {lang === "en" ? "The business problem" : "Masalah bisnis"}</span>
          <div>
            <Reveal>
              <p className="lunar-statement !text-[clamp(1.6rem,3.2vw,3rem)]">
                <span className="dim">{s.problem[lang]}</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{s.body[lang]}</p>
            </Reveal>
          </div>
        </div>

        {/* capabilities, with honest status */}
        <div className="mx-auto w-full max-w-[1400px] border-t border-line px-5 pb-24 pt-16 sm:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className={`${mono} text-technical`}>(02) {lang === "en" ? "Capabilities" : "Kapabilitas"}</span>
              <h2 className="lunar-h2 mt-4">{lang === "en" ? "What the system covers." : "Yang dicakup sistem."}</h2>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-muted" aria-label={lang === "en" ? "Status legend" : "Legenda status"}>
              {(["built", "proposed", "bespoke"] as const).map((st) => (
                <li key={st} className="flex items-center gap-2">
                  <Chip status={st} />
                  <span>{statusMeta[st].hint[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
          <ul className="mt-10 grid gap-x-12 border-t border-line lg:grid-cols-2">
            {s.capabilities.map((cap, i) => (
              <li key={cap.label.en} className="flex items-center gap-4 border-b border-line py-4">
                <span className="w-6 font-mono text-[10px] tracking-[0.1em] text-copper">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-[15px] text-foreground">{cap.label[lang]}</span>
                <Chip status={cap.status} />
              </li>
            ))}
          </ul>
          {s.note && <p className="mt-8 max-w-2xl border-l-2 border-copper pl-4 text-[14px] leading-relaxed text-foreground/80">{s.note[lang]}</p>}
          <p className={`${mono} mt-4 text-technical`}>
            {built} / {s.capabilities.length} {lang === "en" ? "capabilities already exist in systems LUNAR has built" : "kapabilitas sudah ada dalam sistem yang telah dibangun LUNAR"}
          </p>
        </div>
      </section>

      {/* example workflow */}
      <section className="relative bg-[#090A0E] text-[#F0EAE0]">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
          <span className={`${mono} text-copper`}>(03) {lang === "en" ? "Example workflow" : "Contoh alur kerja"}</span>
          <h2 className="mt-4 max-w-3xl text-[clamp(1.8rem,4vw,3.4rem)] font-medium uppercase leading-[0.98] tracking-[-0.03em]">
            {lang === "en" ? "From the first record to the finished report." : "Dari catatan pertama hingga laporan akhir."}
          </h2>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/15 md:block" />
            {s.workflow.map((w, i) => (
              <li key={w.title.en} className="relative">
                <span aria-hidden className="relative z-10 block h-[15px] w-[15px] rounded-full border border-copper bg-[#090A0E]">
                  <span className="absolute inset-[3px] rounded-full bg-solar" />
                </span>
                <span className="mt-5 block font-mono text-[10px] tracking-[0.1em] text-copper">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-2xl font-medium uppercase tracking-[-0.02em]">{w.title[lang]}</h3>
                <p className="mt-2 max-w-[26ch] text-[14px] leading-relaxed text-[#F0EAE0]/65">{w.detail[lang]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* related project + enquiry */}
      <section className="theme-light relative" data-nav-light="true">
        <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
          <div>
            <span className={`${mono} text-technical`}>(04) {lang === "en" ? "Related work" : "Karya terkait"}</span>
            {s.ownProduct ? (
              <>
                <h2 className="lunar-h2 mt-4">{s.ownProduct.name}</h2>
                <p className="mt-4 max-w-md text-muted">{s.ownProduct.body[lang]}</p>
                <Link href="/our-work" className="group/roll mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">
                  <RollText text={lang === "en" ? "See it in Our Work" : "Lihat di Karya Kami"} />
                  <ArrowUpRight size={14} className="text-copper" />
                </Link>
              </>
            ) : related ? (
              <>
                <h2 className="lunar-h2 mt-4">{related.title[lang]}</h2>
                <p className="mt-4 max-w-md text-muted">{related.description[lang]}</p>
                <Link href="/our-work" className="group/roll mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">
                  <RollText text={lang === "en" ? "See it in Our Work" : "Lihat di Karya Kami"} />
                  <ArrowUpRight size={14} className="text-copper" />
                </Link>
              </>
            ) : (
              <>
                <h2 className="lunar-h2 mt-4">{lang === "en" ? "Reference on request." : "Referensi atas permintaan."}</h2>
                <p className="mt-4 max-w-md text-muted">
                  {lang === "en"
                    ? "Client work in this area is shared in conversation, with the client's permission. We do not publish client names, screens or figures without approval."
                    : "Pekerjaan klien di bidang ini dibagikan dalam percakapan, dengan izin klien. Kami tidak mempublikasikan nama, layar, atau angka klien tanpa persetujuan."}
                </p>
              </>
            )}
          </div>
          <div className="lg:border-l lg:border-line lg:pl-12">
            <span className={`${mono} text-technical`}>(05) {lang === "en" ? "Enquire" : "Hubungi"}</span>
            <h2 className="lunar-h2 mt-4">{lang === "en" ? "Tell us how it runs today." : "Ceritakan bagaimana berjalan saat ini."}</h2>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="group/roll inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-void transition-colors hover:bg-accent">
                <RollText text={lang === "en" ? "Start a project" : "Mulai proyek"} className="[&_span>span:last-child]:!text-void" />
                <ArrowUpRight size={14} />
              </Link>
              <a href={contact.mailto} className="text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-foreground">
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-2 px-5 sm:px-8">
            {[
              { s: prev, dir: lang === "en" ? "Previous" : "Sebelumnya" },
              { s: next, dir: lang === "en" ? "Next" : "Berikutnya" },
            ].map(({ s: n, dir }, i) => (
              <Link key={n.slug} href={`/solutions/${n.slug}`} aria-label={`${dir}: ${n.name[lang]}`} className={`group/roll py-8 ${i ? "border-l border-line pl-6 text-right sm:pl-10" : "pr-6 sm:pr-10"}`}>
                <span className={`${mono} text-technical`}>{dir}</span>
                <span className="mt-2 block font-display text-[clamp(1.2rem,2.6vw,2.2rem)] font-medium uppercase tracking-[-0.02em] text-foreground transition-colors group-hover/roll:text-accent">{n.name[lang]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
