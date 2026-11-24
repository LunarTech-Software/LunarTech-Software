"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { projects } from "@/lib/content";
import { statusMeta, work, workCats, type WorkCat, type WorkItem } from "@/lib/work";
import Reveal from "@/components/ui/Reveal";

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";

export function StatusChip({ s, light }: { s: WorkItem["status"]; light?: boolean }) {
  const { lang } = useLanguage();
  return (
    <span title={statusMeta[s].note[lang]} className={`rounded-full border px-2.5 py-[3px] font-mono text-[9px] uppercase tracking-[0.08em] ${light ? "border-[#17191E]/40 text-[#17191E]/75" : "border-[#F0EAE0]/40 text-[#F0EAE0]/80"}`}>
      {statusMeta[s].label[lang]}
    </span>
  );
}

/** A link whose "View project" tag follows the pointer on devices with a mouse. */
function Hoverable({ href, label, className = "", children }: { href: string; label: string; className?: string; children: React.ReactNode }) {
  const tag = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse" || !tag.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    tag.current.style.transform = `translate(${e.clientX - r.left + 14}px, ${e.clientY - r.top + 14}px)`;
    tag.current.style.opacity = "1";
  };
  const leave = () => {
    if (tag.current) tag.current.style.opacity = "0";
  };
  return (
    <Link href={href} onPointerMove={move} onPointerLeave={leave} className={`group relative block ${className}`}>
      {children}
      <span ref={tag} aria-hidden className="pointer-events-none absolute left-0 top-0 z-20 rounded-full bg-[#F0EAE0] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#090A0E] opacity-0 transition-opacity duration-200 max-md:hidden">
        {label}
      </span>
    </Link>
  );
}

function Meta({ w, dark = true }: { w: WorkItem; dark?: boolean }) {
  const { lang } = useLanguage();
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${mono} ${dark ? "text-[#F0EAE0]/65" : "text-[#17191E]/65"}`}>
      <span className="text-[#E98459]">{w.num}</span>
      <span>{w.kicker[lang]}</span>
      <StatusChip s={w.status} light={!dark} />
    </div>
  );
}

function Headline({ w, size = "lg", dark = true }: { w: WorkItem; size?: "xl" | "lg"; dark?: boolean }) {
  const { lang } = useLanguage();
  return (
    <h2 className={`${size === "xl" ? "text-[clamp(2.8rem,8.4vw,8.8rem)]" : "text-[clamp(2.2rem,5vw,5rem)]"} font-medium normal-case leading-[0.93] tracking-[-0.045em] ${dark ? "" : "text-[#17191E]"}`}>
      <span className="block">{w.headline[0][lang]}</span>
      <span className="block text-[#E98459]">{w.headline[1][lang]}</span>
    </h2>
  );
}

function Caps({ w, dark = true }: { w: WorkItem; dark?: boolean }) {
  const { lang } = useLanguage();
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-1 text-[13px] ${dark ? "text-[#F0EAE0]/75" : "text-[#17191E]/75"}`}>
      {w.caps.map((c) => (
        <li key={c.en} className="flex items-center gap-2">
          <span aria-hidden className="h-px w-3 bg-[#C18D6B]" />
          {c[lang]}
        </li>
      ))}
    </ul>
  );
}

function Name({ w, dark = true }: { w: WorkItem; dark?: boolean }) {
  return <p className={`${mono} ${dark ? "text-[#F0EAE0]" : "text-[#17191E]"}`}>{w.name}</p>;
}

function Frame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[6px] border border-white/10 bg-[#0C0E13] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="block w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.025]" />
    </div>
  );
}

function Web({ w }: { w: WorkItem }) {
  const { lang } = useLanguage();
  const en = lang === "en";
  return (
    <section className="bg-[#090A0E] pb-24 text-[#F0EAE0]">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <Hoverable href={w.href} label={en ? "View project" : "Lihat proyek"}>
          <div className="relative">
            <Frame src={w.images.main!} alt={w.images.alt} className="w-full" />
            {w.images.mobile && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={w.images.mobile} alt="" aria-hidden loading="lazy" className="absolute -bottom-10 right-[4%] hidden w-[15%] rounded-[1.4rem] border-[6px] border-[#0b0b0c] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] transition-transform duration-700 group-hover:-translate-y-2 md:block" />
            )}
          </div>
        </Hoverable>
        <Reveal className="mt-16">
          <Meta w={w} />
          <div className="mt-5 max-w-[14ch]">
            <Headline w={w} size="xl" />
          </div>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Name w={w} />
          </div>
          <p className="max-w-lg text-[17px] leading-relaxed text-[#F0EAE0]/80 lg:col-span-5">{w.blurb[lang]}</p>
          <div className="lg:col-span-3">
            <Caps w={w} />
            <Link href={w.href} className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#E98459]">
              {en ? "Case study" : "Studi kasus"} <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dashboard({ w }: { w: WorkItem }) {
  const { lang } = useLanguage();
  const en = lang === "en";
  return (
    <section className="border-t border-[#F0EAE0]/15 bg-[#17110D] py-20 text-[#F0EAE0] lg:py-28">
      <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Meta w={w} />
          <div className="mt-5">
            <Headline w={w} />
          </div>
          <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-[#F0EAE0]/75">{w.blurb[lang]}</p>
          <div className="mt-6">
            <Caps w={w} />
          </div>
          <Link href={w.href} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#E98459] px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#17110D] transition-transform hover:-translate-y-0.5">
            {en ? "View the case study" : "Lihat studi kasus"} <ArrowUpRight size={14} />
          </Link>
        </Reveal>
        <div className="lg:col-span-8">
          <Hoverable href={w.href} label={en ? "View project" : "Lihat proyek"}>
            <Frame src={w.images.main!} alt={w.images.alt} className="[transform:perspective(2400px)_rotateY(-6deg)_rotateX(1.5deg)] origin-left" />
          </Hoverable>
          {w.imageNote && <p className={`${mono} mt-4 text-[#F0EAE0]/55`}>{w.imageNote[lang]}</p>}
        </div>
      </div>
    </section>
  );
}

function Screens({ w, flip }: { w: WorkItem; flip?: boolean }) {
  const { lang } = useLanguage();
  const en = lang === "en";
  return (
    <section className="border-t border-[#F0EAE0]/15 bg-[#090A0E] py-20 text-[#F0EAE0] lg:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <Hoverable href={w.href} label={en ? "View project" : "Lihat proyek"}>
          <div className={`grid items-start gap-6 lg:grid-cols-12 ${flip ? "" : ""}`}>
            <Frame src={w.images.main!} alt={w.images.alt} className={`lg:col-span-8 ${flip ? "lg:order-2" : ""}`} />
            {w.images.second && <Frame src={w.images.second} alt="" className={`lg:col-span-4 lg:mt-24 ${flip ? "lg:order-1" : ""}`} />}
          </div>
        </Hoverable>
        {w.imageNote && <p className={`${mono} mt-4 text-[#F0EAE0]/55`}>{w.imageNote[lang]}</p>}
        <Reveal className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Meta w={w} />
            <div className="mt-5">
              <Headline w={w} />
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Name w={w} />
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-[#F0EAE0]/75">{w.blurb[lang]}</p>
            <div className="mt-5">
              <Caps w={w} />
            </div>
            <Link href={w.href} className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#E98459]">
              {w.href.startsWith("/products") ? (en ? "Open the product page" : "Buka halaman produk") : en ? "Case study" : "Studi kasus"} <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TypeLed({ w }: { w: WorkItem }) {
  const { lang } = useLanguage();
  const en = lang === "en";
  return (
    <section className="theme-light bg-[#F0EAE0] py-20 text-[#17191E] lg:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <Link href={w.href} className="group grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Meta w={w} dark={false} />
            <div className="mt-6">
              <Headline w={w} size="xl" dark={false} />
            </div>
          </div>
          <div className="lg:col-span-4">
            <Name w={w} dark={false} />
            <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-[#17191E]/75">{w.blurb[lang]}</p>
            <div className="mt-5">
              <Caps w={w} dark={false} />
            </div>
            <span className="mt-6 inline-flex items-center gap-2 border-b border-[#17191E] pb-1 font-mono text-[11px] uppercase tracking-[0.06em]">
              {en ? "Case study" : "Studi kasus"} <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default function WorkView() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const [cat, setCat] = useState<WorkCat | "all">("all");
  const cats = workCats.filter((c) => c.key === "all" || work.some((w) => w.cat === c.key));
  const list = useMemo(() => work.filter((w) => cat === "all" || w.cat === cat), [cat]);
  const wip = projects.filter((p) => p.label === "In Progress" && p.slug !== "automation-iot-wip");

  return (
    <>
      <section className="bg-[#090A0E] pb-14 pt-40 text-[#F0EAE0] lg:pb-20 lg:pt-52">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <span className={`${mono} text-[#C18D6B]`}>{en ? "Selected work" : "Karya pilihan"}</span>
          <h1 className="mt-6 text-[clamp(3.2rem,10vw,10.6rem)] font-medium normal-case leading-[0.9] tracking-[-0.05em]">
            {en ? (
              <>
                Built to work.
                <br />
                <span className="text-[#E98459]">Designed to matter.</span>
              </>
            ) : (
              <>
                Dibangun untuk bekerja.
                <br />
                <span className="text-[#E98459]">Dirancang untuk berarti.</span>
              </>
            )}
          </h1>
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="max-w-xl text-[17px] leading-relaxed text-[#F0EAE0]/75 lg:col-span-6">
              {en ? "A selection of digital experiences, operational platforms, and engineered solutions created by LUNAR." : "Pilihan pengalaman digital, platform operasional, dan solusi rekayasa yang dibuat oleh LUNAR."}
            </p>
            <div role="tablist" aria-label={en ? "Filter work" : "Saring karya"} className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-6 lg:justify-end">
              {cats.map((c) => (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={cat === c.key}
                  onClick={() => setCat(c.key)}
                  className={`border-b pb-1 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${cat === c.key ? "border-[#E98459] text-[#F0EAE0]" : "border-transparent text-[#F0EAE0]/50 hover:text-[#F0EAE0]"}`}
                >
                  {c.label[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div aria-live="polite">
        {list.map((w, i) => {
          if (w.layout === "web") return <Web key={w.slug} w={w} />;
          if (w.layout === "dashboard") return <Dashboard key={w.slug} w={w} />;
          if (w.layout === "screens") return <Screens key={w.slug} w={w} flip={i % 2 === 1} />;
          return <TypeLed key={w.slug} w={w} />;
        })}
      </div>

      {cat === "all" && wip.length > 0 && (
        <section className="bg-[#090A0E] py-16 text-[#F0EAE0] lg:py-24">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
            <p className={`${mono} text-[#C18D6B]`}>{en ? "Also in development" : "Juga dalam pengembangan"}</p>
            <ul className="mt-5">
              {wip.map((p) => (
                <li key={p.slug} className="grid gap-2 border-t border-[#F0EAE0]/25 py-4 md:grid-cols-[1fr_2fr] md:gap-8">
                  <span className="font-display text-[clamp(1.2rem,2vw,1.7rem)] font-medium tracking-[-0.02em]">{p.title[lang]}</span>
                  <span className="text-[14px] text-[#F0EAE0]/65">{p.description[lang]}</span>
                </li>
              ))}
              <li className="border-t border-[#F0EAE0]/25" />
            </ul>
          </div>
        </section>
      )}

      <section className="bg-[#17191E] text-[#F0EAE0]">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-20 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-28">
          <h2 className="max-w-[14ch] text-[clamp(2.4rem,6.4vw,6.4rem)] font-medium normal-case leading-[0.94] tracking-[-0.045em]">{en ? "Have something to build?" : "Punya sesuatu untuk dibangun?"}</h2>
          <Link href="/contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F0EAE0] px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#090A0E] transition-colors hover:bg-[#E98459]">
            {en ? "Start a project" : "Mulai proyek"} <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
