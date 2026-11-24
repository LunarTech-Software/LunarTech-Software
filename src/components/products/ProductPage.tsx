"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { L } from "@/lib/solutionsHub";
import { moduleStatusMeta, type ModuleStatus } from "@/lib/products";

/**
 * A shared layout for LUNAR's other products (document OCR, face attendance). Each page supplies its own
 * photograph, copy, capability list with statuses, and a plain "before you deploy" note.
 */

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";

export interface ProductContent {
  kicker: L;
  headline: L;
  lead: L;
  photo: string;
  photoPos: string;
  imageNote: L;
  accent: string;
  capabilities: { label: L; status: ModuleStatus }[];
  notes: { title: L; body: L }[];
}

export const productTabs: { href: string; label: L }[] = [
  { href: "/products/hidang", label: { en: "Hidang POS", id: "Hidang POS" } },
  { href: "/products/ocr", label: { en: "Document OCR", id: "OCR Dokumen" } },
  { href: "/products/face-attendance", label: { en: "Face attendance", id: "Absensi wajah" } },
];

export function ProductTabs({ current, dark }: { current?: string; dark?: boolean }) {
  const { lang } = useLanguage();
  return (
    <nav aria-label={lang === "en" ? "Products" : "Produk"} className="flex flex-wrap gap-2">
      <Link href="/products" aria-current={current === "/products" ? "page" : undefined} className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${current === "/products" ? (dark ? "border-[#F0EAE0] bg-[#F0EAE0] text-[#090A0E]" : "border-[#17191E] bg-[#17191E] text-[#F0EAE0]") : dark ? "border-[#F0EAE0]/35 text-[#F0EAE0]/80 hover:border-[#F0EAE0]" : "border-[#17191E]/30 text-[#17191E] hover:border-[#17191E]"}`}>
        {lang === "en" ? "All products" : "Semua produk"}
      </Link>
      {productTabs.map((t) => {
        const on = current === t.href;
        return (
          <Link key={t.href} href={t.href} aria-current={on ? "page" : undefined} className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${on ? (dark ? "border-[#F0EAE0] bg-[#F0EAE0] text-[#090A0E]" : "border-[#17191E] bg-[#17191E] text-[#F0EAE0]") : dark ? "border-[#F0EAE0]/35 text-[#F0EAE0]/80 hover:border-[#F0EAE0]" : "border-[#17191E]/30 text-[#17191E] hover:border-[#17191E]"}`}>
            {t.label[lang]}
          </Link>
        );
      })}
    </nav>
  );
}

export default function ProductPage({ c, path }: { c: ProductContent; path: string }) {
  const { lang } = useLanguage();
  const en = lang === "en";
  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#14100C] text-[#F6EEE2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.photo} alt="" aria-hidden width={941} height={1672} className="absolute inset-y-0 right-0 h-full w-full object-cover lg:w-[62%]" style={{ objectPosition: c.photoPos }} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#14100C] via-[#14100C]/55 to-transparent lg:from-[#14100C] lg:via-[#14100C] lg:via-[38%] lg:to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#14100C]/85 to-transparent" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-[7vh] pt-28 sm:px-8">
          <span className={mono} style={{ color: c.accent }}>
            {c.kicker[lang]}
          </span>
          <h1 className="mt-5 max-w-[12ch] font-[family-name:var(--font-instrument-serif)] text-[clamp(2.8rem,min(8vw,14svh),8.2rem)] font-normal normal-case leading-[0.92] tracking-[-0.02em]">{c.headline[lang]}</h1>
          <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-[#F6EEE2]/85">{c.lead[lang]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-[#F6EEE2] px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#14100C] transition-colors hover:bg-[#E98459]">
              {en ? "Request a demo" : "Minta demo"}
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#F6EEE2]/40 px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] transition-colors hover:border-[#F6EEE2]">
              {en ? "Discuss your requirements" : "Bahas kebutuhan Anda"} <ArrowUpRight size={14} />
            </Link>
          </div>
          <p className={`${mono} mt-6 text-[#F6EEE2]/55`}>{c.imageNote[lang]}</p>
        </div>
      </section>

      <section className="theme-light bg-[#F6EEE2] text-[#17191E]">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
          <ProductTabs current={path} />
        </div>
        <div className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className={`${mono} text-[#9a6a4a]`}>{en ? "What it does" : "Fungsinya"}</span>
              <h2 className="mt-4 font-[family-name:var(--font-instrument-serif)] text-[clamp(2.4rem,5vw,4.6rem)] font-normal normal-case leading-[0.97] tracking-[-0.02em]">{en ? "Each point, with its status." : "Setiap poin, dengan statusnya."}</h2>
            </div>
            <ul className="lg:col-span-7">
              {c.capabilities.map((x) => (
                <li key={x.label.en} className="flex items-start justify-between gap-4 border-t border-[#17191E]/20 py-3.5 text-[15px]">
                  <span>{x.label[lang]}</span>
                  <span title={moduleStatusMeta[x.status].hint[lang]} className="shrink-0 whitespace-nowrap rounded-full border border-[#17191E]/40 px-2 py-[2px] font-mono text-[9px] uppercase tracking-[0.08em] text-[#17191E]/70">
                    {moduleStatusMeta[x.status].label[lang]}
                  </span>
                </li>
              ))}
              <li className="border-t border-[#17191E]/20" />
            </ul>
          </div>

          <div className="mt-16 grid gap-10 border-t border-[#17191E]/80 pt-5 lg:grid-cols-12">
            <span className={`${mono} lg:col-span-3`}>{en ? "Before you deploy" : "Sebelum diterapkan"}</span>
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-9">
              {c.notes.map((n) => (
                <div key={n.title.en}>
                  <h3 className="font-display text-[clamp(1.2rem,1.8vw,1.6rem)] font-medium leading-tight tracking-[-0.02em]">{n.title[lang]}</h3>
                  <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[#17191E]/70">{n.body[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
