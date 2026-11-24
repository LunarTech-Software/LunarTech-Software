"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { processSteps } from "@/lib/content";
import { SlideControls, useSlideNav } from "@/components/ui/Slides";

/**
 * SCENE 07: how we work. Concept: engineering editorial.
 * Three chapters, three different compositions, the same seven real steps.
 *  01 Understand  a quiet, typographic index (steps 1-2): no illustration, the words do the work.
 *  02 Engineer    a pinned frame of Hidang, our own product, shown with real screens (steps 3-5).
 *                 One frame stays put; the screen inside it is replaced by a clip wipe as the step changes.
 *  03 Evolve      a plain closing statement (steps 6-7) that leads into contact.
 * No decorative diagrams. The only imagery is real product screens, captioned as such.
 */

const SHOTS = [
  { src: "/images/work/hidang-tables.webp", cap: { en: "Floor plan and table states", id: "Denah dan status meja" } },
  { src: "/images/work/hidang-pos.webp", cap: { en: "Cashier POS", id: "POS kasir" } },
  { src: "/images/work/hidang-kds.webp", cap: { en: "Kitchen display", id: "Layar dapur" } },
];

const rule = "border-t border-foreground/80";

function Chapter({ no, name, children }: { no: string; name: string; children?: React.ReactNode }) {
  return (
    <div className={`${rule} pt-3`}>
      <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-foreground">
        <span>{no}</span>
        <span>{name}</span>
      </div>
      {children}
    </div>
  );
}

function Step({ n, title, body, big }: { n: number; title: string; body: string; big?: boolean }) {
  return (
    <li className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-t border-foreground/15 py-5 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-x-6">
      <span className="pt-1 font-mono text-[10px] tracking-[0.08em] text-technical">{String(n).padStart(2, "0")}</span>
      <h4 className={`font-display font-medium leading-tight tracking-[-0.02em] text-foreground ${big ? "text-[clamp(1.5rem,2.6vw,2.4rem)]" : "text-[clamp(1.25rem,2vw,1.8rem)]"}`}>{title}</h4>
      <p className="col-start-2 mt-2 max-w-md text-[15px] leading-relaxed text-muted sm:col-start-3 sm:mt-1">{body}</p>
    </li>
  );
}

export default function ProcessScene() {
  const { lang, t } = useLanguage();
  const engRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const step = (d: 1 | -1) => setIdx((i) => (i + d + 3) % 3);
  useSlideNav(engRef, step);

  const S = processSteps;
  const en = lang === "en";

  return (
    <section id="process" aria-label={en ? "How we work" : "Cara kami bekerja"} className="theme-light relative z-10">
      {/* opening statement */}
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-24 sm:px-8 lg:pb-24 lg:pt-32">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-technical">{en ? "How we work" : "Cara kami bekerja"}</span>
        <h2 className="mt-5 max-w-[16ch] normal-case font-display text-[clamp(2.6rem,8vw,8.6rem)] font-medium leading-[0.92] tracking-[-0.05em] text-foreground">
          {en ? "From business complexity to working technology." : "Dari kompleksitas bisnis menjadi teknologi yang bekerja."}
        </h2>
        <p className="mt-8 max-w-lg text-[16px] leading-relaxed text-muted">
          {en ? "Seven steps in three chapters. We start by understanding how the work really happens, then engineer around it, then stay while it changes." : "Tujuh langkah dalam tiga bab. Kami mulai dari memahami bagaimana pekerjaan benar-benar berjalan, lalu merancang di sekitarnya, lalu tetap mendampingi saat berubah."}
        </p>
      </div>

      {/* 01: understand. Quiet, typographic. */}
      <div className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 lg:pb-28">
        <Chapter no="01" name={en ? "Understand" : "Pahami"} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <p className="font-display text-[clamp(1.8rem,3.8vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.035em] text-foreground lg:col-span-6">
            {en ? "We sit with the people who do the work before we draw anything." : "Kami duduk bersama orang yang mengerjakannya sebelum menggambar apa pun."}
          </p>
          <ol className="lg:col-span-6 lg:col-start-7">
            <Step n={1} title={t(S[0].title)} body={t(S[0].body)} />
            <Step n={2} title={t(S[1].title)} body={t(S[1].body)} />
          </ol>
        </div>
      </div>

      {/* 02: engineer. A pinned frame of real product screens. */}
      <div className="bg-[#17191E] text-[#F0EAE0]" style={{ ["--foreground" as string]: "#F0EAE0" }}>
        <div ref={engRef}>
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:py-24">
            <div className="mx-auto w-full max-w-[1400px]">
              <div className="border-t border-[#F0EAE0]/70 pt-3 font-mono text-[10px] uppercase tracking-[0.1em]">
                <div className="flex items-baseline justify-between">
                  <span>02</span>
                  <span>{en ? "Engineer" : "Rancang"}</span>
                </div>
              </div>
              <div className="mt-6 grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                  <h3 className="font-display text-[clamp(1.8rem,3.4vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.035em]">
                    {en ? "Design it, build it, then try to break it." : "Rancang, bangun, lalu coba merusaknya."}
                  </h3>
                  <ol className="mt-6">
                    {[2, 3, 4].map((si, i) => (
                      <li key={si} onClick={() => setIdx(i)} className={`grid cursor-pointer grid-cols-[2.5rem_1fr] gap-x-3 border-t border-[#F0EAE0]/20 py-3.5 transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-40 hover:opacity-70"}`}>
                        <span className="pt-1 font-mono text-[10px] tracking-[0.08em] text-[#C18D6B]">{String(si + 1).padStart(2, "0")}</span>
                        <div>
                          <h4 className="font-display text-[clamp(1.15rem,1.7vw,1.6rem)] font-medium leading-tight tracking-[-0.02em]">{t(S[si].title)}</h4>
                          <p className="mt-1 max-w-sm text-[14px] leading-relaxed text-[#F0EAE0]/75" style={{ display: i === idx ? "block" : "none" }}>
                            {t(S[si].body)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="lg:col-span-7">
                  <div className="overflow-hidden rounded-[6px] border border-[#F0EAE0]/20 bg-[#0C0E13] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
                    <div className="flex items-center gap-1.5 border-b border-[#F0EAE0]/10 px-3 py-2">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="h-2 w-2 rounded-full bg-[#F0EAE0]/25" />
                      ))}
                      <span className="ml-3 font-mono text-[9px] uppercase tracking-[0.1em] text-[#F0EAE0]/60">Hidang / {SHOTS[idx].cap[lang]}</span>
                    </div>
                    <div className="relative aspect-[1800/1125] w-full">
                      {SHOTS.map((s, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={s.src}
                          src={s.src}
                          alt={s.cap[lang]}
                          width={1800}
                          height={1125}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover object-top transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
                          style={{ zIndex: i, clipPath: i <= idx ? "inset(0 0 0 0)" : "inset(0 0 0 100%)" }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-[#F0EAE0]/65">
                    {en ? "Hidang is our own product. Real screens, built-in demo data." : "Hidang adalah produk kami sendiri. Layar asli, data demo bawaan."}
                  </p>
                  <SlideControls idx={idx} n={3} onStep={step} className="mt-5 justify-end" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 03: evolve. A plain statement that leads to contact. */}
      <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-20 sm:px-8 lg:pb-32 lg:pt-28">
        <Chapter no="03" name={en ? "Evolve" : "Berkembang"} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <ol className="order-2 lg:order-1 lg:col-span-6">
            <Step n={6} title={t(S[5].title)} body={t(S[5].body)} big />
            <Step n={7} title={t(S[6].title)} body={t(S[6].body)} big />
          </ol>
          <div className="order-1 lg:order-2 lg:col-span-6">
            <p className="font-display text-[clamp(1.8rem,3.8vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.035em] text-foreground">
              {en ? "The system is not finished when it ships. Businesses change, and it changes with them." : "Sistem belum selesai saat diserahkan. Bisnis berubah, dan sistem berubah bersamanya."}
            </p>
            <Link href="/contact" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-void transition-colors hover:bg-accent">
              {en ? "Talk about your project" : "Bicarakan proyek Anda"}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
