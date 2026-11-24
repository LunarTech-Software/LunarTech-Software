"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { statusMeta, work, workBySlug, workCats } from "@/lib/work";
import Reveal from "@/components/ui/Reveal";
import { StatusChip } from "./WorkView";

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="theme-light bg-[#F0EAE0] text-[#17191E]">
      <div className="mx-auto grid max-w-[1600px] gap-8 border-t border-[#17191E]/80 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-3">
          <p className={`${mono} text-[#9a6a4a]`}>{n}</p>
          <h2 className="mt-2 font-display text-[clamp(1.4rem,2.2vw,2rem)] font-medium normal-case leading-tight tracking-[-0.025em]">{title}</h2>
        </div>
        <div className="lg:col-span-8 lg:col-start-5">{children}</div>
      </div>
    </section>
  );
}

export default function CaseStudy({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const en = lang === "en";
  const w = workBySlug(slug)!;
  const idx = work.findIndex((x) => x.slug === slug);
  const next = work[(idx + 1) % work.length];
  const cat = workCats.find((c) => c.key === w.cat)!.label[lang];
  const p = (t: { en: string; id: string }) => <p className="max-w-[60ch] text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.65] text-[#17191E]/85">{t[lang]}</p>;

  let n = 1;
  const num = () => String(++n).padStart(2, "0");

  return (
    <article>
      {/* 01 hero */}
      <header className="bg-[#090A0E] pb-14 pt-36 text-[#F0EAE0] lg:pb-20 lg:pt-44">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Link href="/our-work" className={`${mono} inline-flex items-center gap-2 text-[#F0EAE0]/60 transition-colors hover:text-[#F0EAE0]`}>
            <ArrowLeft size={12} /> {en ? "Selected work" : "Karya pilihan"}
          </Link>
          <div className={`mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 ${mono} text-[#F0EAE0]/65`}>
            <span className="text-[#E98459]">{w.num}</span>
            <span>{cat}</span>
            <StatusChip s={w.status} />
          </div>
          <h1 className="mt-6 text-[clamp(3rem,9.4vw,9.8rem)] font-medium normal-case leading-[0.9] tracking-[-0.05em]">
            <span className="block">{w.headline[0][lang]}</span>
            <span className="block text-[#E98459]">{w.headline[1][lang]}</span>
          </h1>
          <p className={`${mono} mt-8 text-[#F0EAE0]`}>{w.name}</p>
          <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-[#F0EAE0]/75">{w.blurb[lang]}</p>
          {w.external && (
            <a href={w.external.url} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#F0EAE0]/40 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors hover:border-[#F0EAE0]">
              {w.external.label[lang]} <ExternalLink size={13} />
            </a>
          )}
        </div>
        {w.images.main && (
          <div className="mx-auto mt-14 max-w-[1600px] px-5 sm:px-8">
            <div className="relative">
              <div className="overflow-hidden rounded-[6px] border border-white/10 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.images.main} alt={w.images.alt} className="block w-full" />
              </div>
              {w.images.mobile && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={w.images.mobile} alt="" aria-hidden className="absolute -bottom-8 right-[5%] hidden w-[14%] rounded-[1.4rem] border-[6px] border-[#0b0b0c] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] md:block" />
              )}
            </div>
            {w.imageNote && <p className={`${mono} mt-4 text-[#F0EAE0]/55`}>{w.imageNote[lang]}</p>}
          </div>
        )}
      </header>

      {/* 02 overview */}
      <Section n="02" title={en ? "Project overview" : "Gambaran proyek"}>
        <Reveal>{p(w.overview)}</Reveal>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
          {w.caps.map((c) => (
            <li key={c.en} className="flex items-center gap-2">
              <span aria-hidden className="h-px w-3 bg-[#C18D6B]" />
              {c[lang]}
            </li>
          ))}
        </ul>
      </Section>

      {w.challenge && (
        <Section n={num()} title={en ? "The challenge" : "Tantangannya"}>
          {p(w.challenge)}
        </Section>
      )}

      <Section n={num()} title={en ? "The approach" : "Pendekatannya"}>
        {p(w.approach)}
      </Section>

      <Section n={num()} title={en ? "The solution" : "Solusinya"}>
        {p(w.solution)}
      </Section>

      {w.features.length > 0 && (
        <Section n={num()} title={en ? "Key capabilities" : "Kemampuan utama"}>
          <div className="space-y-12">
            {w.features.map((f) => (
              <Reveal key={f.title.en}>
                {f.img && (
                  <div className="overflow-hidden rounded-[6px] border border-[#17191E]/20 bg-[#0C0E13] shadow-[0_40px_80px_-40px_rgba(23,25,30,0.55)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.img} alt={f.title[lang]} loading="lazy" className={`block ${f.img.includes("mobile") ? "mx-auto max-h-[70vh] w-auto" : "w-full"}`} />
                  </div>
                )}
                <h3 className="mt-4 font-display text-[clamp(1.2rem,1.8vw,1.6rem)] font-medium tracking-[-0.02em]">{f.title[lang]}</h3>
                <p className="mt-1 max-w-[56ch] text-[15px] leading-relaxed text-[#17191E]/70">{f.body[lang]}</p>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {w.tech && (
        <Section n={num()} title={en ? "Technical highlights" : "Sorotan teknis"}>
          <ul className="space-y-2.5 text-[16px]">
            {w.tech.map((t) => (
              <li key={t.en} className="border-t border-[#17191E]/20 pt-2.5">{t[lang]}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section n={num()} title={en ? "Outcome and status" : "Hasil dan status"}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <StatusChip s={w.status} light />
          <span className="text-[13px] text-[#17191E]/60">{statusMeta[w.status].note[lang]}</span>
        </div>
        {p(w.outcome)}
      </Section>

      {/* next project */}
      <section className="bg-[#090A0E] text-[#F0EAE0]">
        <Link href={next.href} className="group relative block overflow-hidden">
          {next.images.main && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={next.images.main} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top opacity-25 transition-[transform,opacity] duration-[900ms] group-hover:scale-[1.03] group-hover:opacity-35" />
          )}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#090A0E] via-[#090A0E]/60 to-[#090A0E]/80" />
          <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:py-36">
            <p className={`${mono} text-[#C18D6B]`}>{en ? "Next project" : "Proyek berikutnya"} / {next.num}</p>
            <p className="mt-5 text-[clamp(2.8rem,9vw,9rem)] font-medium normal-case leading-[0.92] tracking-[-0.05em]">
              {next.headline[0][lang]}
              <br />
              <span className="text-[#E98459]">{next.headline[1][lang]}</span>
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em]">
              {next.name} <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </section>

      <section className="bg-[#17191E] text-[#F0EAE0]">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-24">
          <h2 className="max-w-[14ch] text-[clamp(2.2rem,5.6vw,5.4rem)] font-medium normal-case leading-[0.95] tracking-[-0.045em]">{en ? "Have something like this in mind?" : "Punya yang serupa dalam pikiran?"}</h2>
          <Link href={`/contact?topic=${w.cat === "websites" ? "web" : w.cat === "fleet" ? "fleet" : w.cat === "fnb" ? "hidang" : w.cat === "ai" ? "ai" : w.cat === "hardware" ? "iot" : "erp"}`} className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F0EAE0] px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#090A0E] transition-colors hover:bg-[#E98459]">
            {en ? "Start a project" : "Mulai proyek"} <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </article>
  );
}
