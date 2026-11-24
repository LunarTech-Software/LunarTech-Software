"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TabletPhoto from "./TabletPhoto";
import { ProductTabs } from "./ProductPage";
import { useLanguage } from "@/lib/language-context";
import { businessTypes, hidangModules, hidangNotIncluded, moduleStatusMeta, type ModuleStatus } from "@/lib/products";

/**
 * Hidang product page. Hidang is LUNAR's own F&B product, so it keeps its own warm identity
 * (serif headline, copper and green) inside the wider LUNAR site. Every screen is a real capture
 * with the app's built-in demo data; module statuses come from the Hidang codebase.
 */

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";
const serif = "font-[family-name:var(--font-instrument-serif)]";

function Chip({ s, dark }: { s: ModuleStatus; dark?: boolean }) {
  const { lang } = useLanguage();
  const tone =
    s === "implemented" ? (dark ? "border-[#C18D6B] text-[#C18D6B]" : "border-[#9a6a4a] text-[#9a6a4a]") : s === "configurable" ? (dark ? "border-[#9DC3A9] text-[#9DC3A9]" : "border-[#2f6b4f] text-[#2f6b4f]") : s === "integration" ? (dark ? "border-[#F0EAE0]/50 text-[#F0EAE0]/70" : "border-[#17191E]/40 text-[#17191E]/70") : dark ? "border-[#F0EAE0]/25 text-[#F0EAE0]/50" : "border-[#17191E]/25 text-[#17191E]/55";
  return (
    <span title={moduleStatusMeta[s].hint[lang]} className={`shrink-0 whitespace-nowrap rounded-full border px-2 py-[2px] font-mono text-[9px] uppercase tracking-[0.08em] ${tone}`}>
      {moduleStatusMeta[s].label[lang]}
    </span>
  );
}

function Hero() {
  const { lang } = useLanguage();
  const en = lang === "en";
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#140E09] text-[#F6EEE2]">
      {/* the supplied restaurant photograph, scaled so the tablet sits right of centre; the real Hidang screen is mapped onto it */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute" style={{ width: "max(70vw, 58svh)", left: "calc(66vw - 0.6 * max(70vw, 58svh))", top: "calc(54svh - 0.6 * max(70vw, 58svh) * 1.7769)" }}>
          <TabletPhoto alt="" className="w-full" />
        </div>
      </div>
      <div aria-hidden className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#140E09] to-transparent" />
      <div aria-hidden className="absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-[#140E09]/90 via-[#140E09]/60 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#140E09]/80 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-[7vh] pt-28 sm:px-8">
        <span className={`${mono} text-[#C18D6B]`}>{en ? "A product by LUNAR / F&B point of sale" : "Produk LUNAR / POS F&B"}</span>
        <h1 className={`${serif} mt-5 max-w-[12ch] text-[clamp(2.8rem,min(8vw,14svh),8.2rem)] font-normal normal-case leading-[0.92] tracking-[-0.02em]`}>
          {en ? "Meet Hidang. Your restaurant, your way." : "Kenali Hidang. Restoran Anda, cara Anda."}
        </h1>
        <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-[#F6EEE2]/85">
          {en
            ? "A configurable point-of-sale and restaurant management platform, designed to make daily service and operations easier to manage."
            : "Platform POS dan manajemen restoran yang dapat dikonfigurasi, dirancang agar layanan dan operasi harian lebih mudah dikelola."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#modules" className="rounded-full bg-[#F6EEE2] px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#140E09] transition-colors hover:bg-[#E98459]">
            {en ? "Explore Hidang" : "Jelajahi Hidang"}
          </a>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#F6EEE2]/40 px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] transition-colors hover:border-[#F6EEE2]">
            {en ? "Request a demo" : "Minta demo"} <ArrowUpRight size={14} />
          </Link>
        </div>
        <p className={`${mono} mt-6 text-[#F6EEE2]/55`}>{en ? "Real Hidang screen, shown with built-in demo data" : "Layar Hidang asli, dengan data demo bawaan"}</p>
      </div>
    </section>
  );
}

function Tabs() {
  return (
    <div className="bg-[#F6EEE2] text-[#17191E]">
      <div className="mx-auto max-w-[1400px] px-5 pt-12 sm:px-8">
        <ProductTabs current="/products/hidang" />
      </div>
    </div>
  );
}

function Answers() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const rows: { q: string; qi: string; a: string; ai: string }[] = [
    { q: "Who is it for?", qi: "Untuk siapa?", a: "Cafés and bakeries, full-service restaurants, delivery kitchens and small chains with a few outlets.", ai: "Kafe dan toko roti, restoran layanan penuh, dapur pengiriman, dan jaringan kecil dengan beberapa outlet." },
    { q: "What problem does it solve?", qi: "Masalah apa yang diselesaikan?", a: "A sale reaches the kitchen, the stock and the report without anyone retyping it. Ingredients come off stock by recipe, and margins come from the same recipes.", ai: "Penjualan sampai ke dapur, stok, dan laporan tanpa diketik ulang. Bahan berkurang menurut resep, dan margin berasal dari resep yang sama." },
    { q: "Can it run several outlets?", qi: "Bisakah menjalankan beberapa outlet?", a: "Yes: several outlets in one installation, each with its own operating mode. It uses a single-node database, which suits one site or a small chain.", ai: "Bisa: beberapa outlet dalam satu instalasi, masing-masing dengan mode operasi sendiri. Memakai database satu node, cocok untuk satu lokasi atau jaringan kecil." },
    { q: "What devices and integrations work today?", qi: "Perangkat dan integrasi apa yang berjalan saat ini?", a: "It runs in a browser on tablets, touch screens and PCs. Receipts print through the browser print dialog. QRIS and e-wallet need a Midtrans account and have not yet been tested against the Midtrans sandbox. No dedicated hardware is included.", ai: "Berjalan di browser pada tablet, layar sentuh, dan PC. Struk dicetak lewat dialog cetak browser. QRIS dan e-wallet memerlukan akun Midtrans dan belum diuji pada sandbox Midtrans. Tidak ada perangkat keras khusus yang disertakan." },
    { q: "How do I see it?", qi: "Bagaimana saya melihatnya?", a: "Request a demo and we will walk you through it. Pricing is not published; it is agreed per setup.", ai: "Minta demo dan kami akan memandu Anda. Harga tidak dipublikasikan; disepakati per pengaturan." },
  ];
  return (
    <section className="bg-[#F6EEE2] text-[#17191E]">
      <div className="mx-auto max-w-[1400px] px-5 pt-20 sm:px-8 lg:pt-28">
        <span className={`${mono} text-[#9a6a4a]`}>{en ? "The short answers" : "Jawaban singkat"}</span>
        <dl className="mt-6">
          {rows.map((r) => (
            <div key={r.q} className="grid gap-3 border-t border-[#17191E]/80 py-6 lg:grid-cols-12 lg:gap-10">
              <dt className={`${serif} text-[clamp(1.7rem,2.8vw,2.6rem)] leading-[1.05] lg:col-span-5`}>{en ? r.q : r.qi}</dt>
              <dd className="max-w-xl text-[15px] leading-relaxed text-[#17191E]/75 lg:col-span-6 lg:col-start-7">{en ? r.a : r.ai}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Modules() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const [k, setK] = useState(hidangModules[0].key);
  const m = hidangModules.find((x) => x.key === k)!;
  return (
    <section id="modules" className="bg-[#F6EEE2] text-[#17191E]">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <span className={`${mono} text-[#9a6a4a]`}>{en ? "Modules" : "Modul"}</span>
        <h2 className={`${serif} mt-4 max-w-[14ch] text-[clamp(2.6rem,6.4vw,6rem)] font-normal normal-case leading-[0.95] tracking-[-0.02em]`}>{en ? "Built from modules you can see." : "Dibangun dari modul yang bisa dilihat."}</h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#17191E]/70">
          {en
            ? "Each status below comes from the current Hidang build, not from a wish list. Select a module to see what it does and how far it goes."
            : "Setiap status di bawah berasal dari versi Hidang saat ini, bukan daftar keinginan. Pilih modul untuk melihat fungsinya dan sejauh mana."}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div role="tablist" aria-label={en ? "Hidang modules" : "Modul Hidang"} className="lg:col-span-4">
            {hidangModules.map((x, i) => (
              <button
                key={x.key}
                role="tab"
                aria-selected={x.key === k}
                onClick={() => setK(x.key)}
                className={`flex w-full items-baseline gap-3 border-t border-[#17191E]/15 py-3.5 text-left transition-colors ${x.key === k ? "text-[#17191E]" : "text-[#17191E]/50 hover:text-[#17191E]"}`}
              >
                <span className="font-mono text-[10px] tracking-[0.08em] text-[#9a6a4a]">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[clamp(1.2rem,1.8vw,1.7rem)] font-medium tracking-[-0.02em]">{x.name[lang]}</span>
              </button>
            ))}
            <div className="border-t border-[#17191E]/15" />
          </div>

          <div role="tabpanel" className="lg:col-span-8">
            <div className="grid gap-8 xl:grid-cols-2">
              <div>
                <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.2rem)] font-medium leading-tight tracking-[-0.02em]">{m.name[lang]}</h3>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-[#17191E]/70">{m.summary[lang]}</p>
                <ul className="mt-5">
                  {m.points.map((p) => (
                    <li key={p.label.en} className="flex items-start justify-between gap-3 border-t border-[#17191E]/12 py-2.5 text-[13px]">
                      <span>{p.label[lang]}</span>
                      <Chip s={p.status} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                {m.shot ? (
                  <figure key={m.key} className="int-fade">
                    <div className="overflow-hidden rounded-[8px] border border-[#17191E]/15 bg-[#0C0E13] shadow-[0_40px_80px_-40px_rgba(23,25,30,0.6)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.shot.src} alt={m.shot.cap[lang]} width={1800} height={1125} className="block w-full" loading="lazy" />
                    </div>
                    <figcaption className={`${mono} mt-3 text-[#17191E]/60`}>
                      {m.shot.cap[lang]} · {en ? "real screen, demo data" : "layar asli, data demo"}
                    </figcaption>
                  </figure>
                ) : (
                  <div className="flex aspect-[16/10] items-end rounded-[8px] border border-dashed border-[#17191E]/25 p-5">
                    <p className={`${mono} text-[#17191E]/60`}>{en ? "No screenshot published for this module yet. Ask for a demo to see it live." : "Belum ada tangkapan layar untuk modul ini. Minta demo untuk melihatnya langsung."}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-[#17191E]/80 pt-4">
          <span className={`${mono} text-[#17191E]`}>{en ? "Not in Hidang today" : "Belum ada di Hidang saat ini"}</span>
          <ul className="mt-3 grid gap-x-10 sm:grid-cols-2">
            {hidangNotIncluded.map((x) => (
              <li key={x.en} className="border-t border-[#17191E]/12 py-2.5 text-[13px] text-[#17191E]/75">
                {x[lang]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Configuration() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const [biz, setBiz] = useState(businessTypes[1].key);
  const [extra, setExtra] = useState<string[]>([]);
  const base = businessTypes.find((b) => b.key === biz)!.modules;
  const active = Array.from(new Set([...base, ...extra]));
  const toggle = (key: string) => setExtra((e) => (e.includes(key) ? e.filter((x) => x !== key) : [...e, key]));
  const custom = hidangModules.flatMap((m) => m.points.filter((p) => p.status === "custom" && active.includes(m.key)).map((p) => p.label[lang]));
  const needs = hidangModules.flatMap((m) => m.points.filter((p) => p.status === "integration" && active.includes(m.key)).map((p) => p.label[lang]));
  return (
    <section className="bg-[#1B120C] text-[#F6EEE2]">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <span className={`${mono} text-[#C18D6B]`}>{en ? "Customization" : "Kustomisasi"}</span>
        <h2 className={`${serif} mt-4 max-w-[12ch] text-[clamp(2.6rem,6.4vw,6rem)] font-normal normal-case leading-[0.95] tracking-[-0.02em]`}>{en ? "Your business. Your configuration." : "Bisnis Anda. Konfigurasi Anda."}</h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#F6EEE2]/75">
          {en
            ? "Sketch how a Hidang setup could look for you. This is a planning aid for the conversation: it does not create or provision anything."
            : "Gambarkan seperti apa pengaturan Hidang untuk Anda. Ini alat bantu perencanaan untuk pembicaraan: tidak membuat atau menyiapkan apa pun."}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className={`${mono} text-[#F6EEE2]/60`}>01 / {en ? "Business type" : "Jenis bisnis"}</p>
            <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={en ? "Business type" : "Jenis bisnis"}>
              {businessTypes.map((b) => (
                <button key={b.key} role="radio" aria-checked={b.key === biz} onClick={() => setBiz(b.key)} className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${b.key === biz ? "border-[#F6EEE2] bg-[#F6EEE2] text-[#140E09]" : "border-[#F6EEE2]/30 hover:border-[#F6EEE2]"}`}>
                  {b.label[lang]}
                </button>
              ))}
            </div>
            <p className={`${mono} mt-8 text-[#F6EEE2]/60`}>02 / {en ? "Modules to include" : "Modul yang disertakan"}</p>
            <ul className="mt-3">
              {hidangModules.map((m) => {
                const inBase = base.includes(m.key);
                const on = active.includes(m.key);
                return (
                  <li key={m.key} className="border-t border-[#F6EEE2]/15">
                    <label className={`flex cursor-pointer items-center justify-between gap-3 py-2.5 text-[14px] ${inBase ? "" : ""}`}>
                      <span className="flex items-center gap-3">
                        <input type="checkbox" checked={on} disabled={inBase} onChange={() => toggle(m.key)} className="h-4 w-4 accent-[#E98459]" />
                        <span className={on ? "" : "text-[#F6EEE2]/55"}>{m.name[lang]}</span>
                      </span>
                      {inBase && <span className={`${mono} text-[#F6EEE2]/45`}>{en ? "suggested" : "disarankan"}</span>}
                    </label>
                  </li>
                );
              })}
              <li className="border-t border-[#F6EEE2]/15" />
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[10px] border border-[#F6EEE2]/20 p-6 sm:p-8">
              <p className={`${mono} text-[#C18D6B]`}>{en ? "Starting point for the conversation" : "Titik awal untuk pembicaraan"}</p>
              <p className={`${serif} mt-3 text-[clamp(1.8rem,3vw,2.8rem)] leading-tight`}>
                {businessTypes.find((b) => b.key === biz)!.label[lang]}: {active.length} {en ? "of" : "dari"} {hidangModules.length} {en ? "modules" : "modul"}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {active.map((key) => (
                  <li key={key} className="rounded-full border border-[#F6EEE2]/30 px-3 py-1 text-[12px]">
                    {hidangModules.find((m) => m.key === key)!.name[lang]}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className={`${mono} text-[#9DC3A9]`}>{en ? "Set from settings" : "Diatur lewat pengaturan"}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#F6EEE2]/80">
                    {en ? "Brand (logo, colours, font, receipt), tax and service rules, order types, kitchen stations, payment methods, operating mode per outlet, POS layout, staff roles." : "Merek (logo, warna, font, struk), aturan pajak dan layanan, jenis pesanan, stasiun dapur, metode pembayaran, mode operasi per outlet, tata letak POS, peran staf."}
                  </p>
                </div>
                <div>
                  <p className={`${mono} text-[#F6EEE2]/70`}>{en ? "Needs a connection or custom work" : "Perlu koneksi atau pekerjaan khusus"}</p>
                  <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-[#F6EEE2]/80">
                    {[...needs, ...custom].length ? [...needs, ...custom].map((x) => <li key={x}>{x}</li>) : <li>{en ? "Nothing for the modules you picked." : "Tidak ada untuk modul yang dipilih."}</li>}
                    <li>{en ? "Anything beyond the product (extra workflows, hardware) is scoped and quoted separately." : "Apa pun di luar produk (alur tambahan, perangkat keras) dirancang dan ditawarkan terpisah."}</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="rounded-full bg-[#F6EEE2] px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#140E09] transition-colors hover:bg-[#E98459]">
                  {en ? "Discuss customization" : "Bahas kustomisasi"}
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#F6EEE2]/40 px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] transition-colors hover:border-[#F6EEE2]">
                  {en ? "Request a demo" : "Minta demo"} <ArrowUpRight size={14} />
                </Link>
              </div>
              <p className={`${mono} mt-4 text-[#F6EEE2]/45`}>{en ? "Contact goes to our team by email. There is no automatic booking yet." : "Kontak masuk ke tim kami lewat email. Belum ada pemesanan otomatis."}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HidangView() {
  return (
    <>
      <Hero />
      <Tabs />
      <Answers />
      <Modules />
      <Configuration />
    </>
  );
}
