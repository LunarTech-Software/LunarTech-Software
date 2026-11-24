"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductTabs } from "./ProductPage";
import TabletPhoto from "./TabletPhoto";
import { useLanguage } from "@/lib/language-context";

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";

export default function ProductsView() {
  const { lang } = useLanguage();
  const en = lang === "en";
  return (
    <>
      <section className="theme-light bg-[#F0EAE0] pb-16 pt-40 text-[#17191E] lg:pb-24 lg:pt-48">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <span className={`${mono} text-technical`}>{en ? "Products" : "Produk"}</span>
          <h1 className="mt-5 max-w-[14ch] text-[clamp(2.8rem,8.4vw,8.4rem)] font-medium normal-case leading-[0.92] tracking-[-0.05em]">{en ? "Ready to start. Built to adapt." : "Siap dimulai. Dibangun untuk menyesuaikan."}</h1>
          <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-[#17191E]/70">
            {en
              ? "Software platforms LUNAR has built and keeps improving. How far each can be customized depends on the product, technical feasibility, your requirements and a commercial agreement."
              : "Platform perangkat lunak yang dibuat dan terus ditingkatkan LUNAR. Seberapa jauh masing-masing dapat disesuaikan bergantung pada produk, kelayakan teknis, kebutuhan Anda, dan kesepakatan komersial."}
          </p>
          <div className="mt-8">
            <ProductTabs current="/products" />
          </div>
        </div>
      </section>

      <section className="bg-[#F0EAE0] pb-24 text-[#17191E]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Link href="/products/hidang" className="group relative block min-h-[78svh] overflow-hidden rounded-[6px] bg-[#140E09] text-[#F6EEE2]">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_85%,#6b4126_0%,#3a2315_40%,#140E09_78%)]" />
            <div aria-hidden className="absolute inset-0 opacity-[0.14] [background-image:repeating-linear-gradient(100deg,transparent_0,transparent_46px,rgba(255,255,255,0.35)_47px,transparent_48px)]" />
            <div aria-hidden className="pointer-events-none absolute overflow-visible" style={{ width: "max(52vw, 50svh)", right: "-2%", top: "calc(52% - 0.6 * max(52vw, 50svh) * 1.7769)" }}>
              <TabletPhoto alt="" className="w-full transition-transform duration-700 group-hover:scale-[1.02]" />
            </div>
            <div aria-hidden className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-[#140E09]/90 to-transparent" />
            <div className="relative p-7 sm:p-10 lg:p-14">
              <span className={`${mono} text-[#C18D6B]`}>01 / {en ? "A product by LUNAR / F&B and hospitality" : "Produk LUNAR / F&B dan perhotelan"}</span>
              <h2 className="mt-4 font-[family-name:var(--font-instrument-serif)] text-[clamp(4rem,10vw,9rem)] font-normal normal-case leading-[0.9]">Hidang</h2>
              <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-[#F6EEE2]/85">
                {en ? "Restaurant operations on one record: touch-first POS, tables, kitchen display, inventory with recipes, customers, staff and reports." : "Operasi restoran dalam satu catatan: POS layar sentuh, meja, layar dapur, persediaan dengan resep, pelanggan, staf, dan laporan."}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2 text-[12px]">
                {[en ? "9 modules" : "9 modul", "Multi-outlet", "Bahasa Indonesia + English"].map((x) => (
                  <li key={x} className="rounded-full border border-[#F6EEE2]/30 px-3 py-1">{x}</li>
                ))}
              </ul>
              <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F6EEE2] px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#140E09] transition-colors group-hover:bg-[#E98459]">
                {en ? "Explore Hidang" : "Jelajahi Hidang"} <ArrowUpRight size={14} />
              </span>
              <p className={`${mono} mt-6 text-[#F6EEE2]/55`}>{en ? "Real screen, built-in demo data" : "Layar asli, data demo bawaan"}</p>
            </div>
          </Link>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              { href: "/products/ocr", img: "/images/products/ocr-scan.webp", pos: "50% 64%", n: "02", k: en ? "Document OCR" : "OCR Dokumen", t: en ? "Paperwork that reads itself." : "Kertas yang membaca dirinya sendiri.", b: en ? "Photographed tickets and documents become structured data a person reviews and saves." : "Tiket dan dokumen yang difoto menjadi data terstruktur yang ditinjau dan disimpan oleh manusia." },
              { href: "/products/face-attendance", img: "/images/products/face-attendance.webp", pos: "50% 62%", n: "03", k: en ? "Face attendance" : "Absensi wajah", t: en ? "Attendance that logs itself." : "Absensi yang mencatat dirinya sendiri.", b: en ? "Recognition-based check-in with location and schedule checks, deployed with consent." : "Check-in berbasis pengenalan wajah dengan pemeriksaan lokasi dan jadwal, diterapkan dengan persetujuan." },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group relative block min-h-[460px] overflow-hidden rounded-[6px] bg-[#14100C] text-[#F6EEE2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt="" aria-hidden width={941} height={1672} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" style={{ objectPosition: c.pos }} loading="lazy" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#14100C]/90 via-[#14100C]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <span className={`${mono} text-[#E98459]`}>{c.n} / {c.k}</span>
                  <h3 className="mt-3 font-[family-name:var(--font-instrument-serif)] text-[clamp(2.2rem,4vw,3.6rem)] font-normal normal-case leading-[0.98]">{c.t}</h3>
                  <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#F6EEE2]/80">{c.b}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#E98459]">
                    {en ? "Explore" : "Jelajahi"} <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 grid gap-10 border-t border-[#17191E]/80 pt-5 lg:grid-cols-12">
            <span className={`${mono} lg:col-span-3`}>{en ? "Other systems" : "Sistem lain"}</span>
            <div className="lg:col-span-6">
              <p className="font-display text-[clamp(1.4rem,2.4vw,2.2rem)] font-medium leading-tight tracking-[-0.02em]">
                {en ? "Three products, one way of working." : "Tiga produk, satu cara kerja."}
              </p>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#17191E]/70">
                {en
                  ? "Our hauling and insurance systems were built for clients, so they sit under Our Work and Solutions. If you run a similar business, ask us what could be reused; that depends on the agreement with the original client."
                  : "Sistem hauling dan asuransi kami dibuat untuk klien, sehingga berada di Karya Kami dan Solusi, bukan di sini. Jika bisnis Anda serupa, tanyakan apa yang dapat dipakai ulang; itu bergantung pada kesepakatan dengan klien awal."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/solutions" className="rounded-full border border-[#17191E]/40 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors hover:border-[#17191E]">{en ? "See solutions" : "Lihat solusi"}</Link>
                <Link href="/contact" className="rounded-full bg-[#17191E] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.06em] text-[#F0EAE0] transition-colors hover:bg-[#E98459]">{en ? "Talk to us" : "Hubungi kami"}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
