"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { L, VisualKey } from "@/lib/solutionsHub";
import SolutionVisual from "@/components/internal/SolutionVisual";
import { useStage } from "./useStage";

/**
 * SCENE 05: the systems behind the work.
 * Hidang is LUNAR's own F&B product, shown with its real screens (built-in demo data).
 * Client platforms are described without naming the client and without screenshots until the
 * client approves: the visuals for those are labelled schematics. Nothing here is a fabricated result.
 */

interface Project {
  key: string;
  word: string;
  title: L;
  kind: L;
  body: L;
  annotations?: L[];
  tag: L;
  accent: string;
  real?: boolean;
  shots?: [string, string];
  visual?: VisualKey;
  href?: string;
}

const PROJECTS: Project[] = [
  {
    key: "hidang",
    word: "HIDANG",
    title: { en: "Hidang: F&B POS & Restaurant Management", id: "Hidang: POS F&B & Manajemen Restoran" },
    kind: { en: "Our own product", id: "Produk kami sendiri" },
    body: {
      en: "A touch-first cashier POS and back office on one visual identity: orders board, floor plan, kitchen display, inventory with recipes and costing, staff and reports. Indonesian by default, English optional.",
      id: "POS kasir layar sentuh dan back office dalam satu identitas visual: papan pesanan, denah meja, layar dapur, persediaan dengan resep dan biaya, staf, dan laporan. Bahasa Indonesia secara bawaan, Inggris opsional.",
    },
    annotations: [
      { en: "Totals are computed on the server, never trusted from the screen", id: "Total dihitung di server, tidak dipercaya dari layar" },
      { en: "Offline mode accepts cash only; queued orders sync once", id: "Mode offline hanya menerima tunai; pesanan antrean disinkronkan sekali" },
    ],
    tag: { en: "Real screens · built-in demo data", id: "Layar asli · data demo bawaan" },
    accent: "#B89A62",
    real: true,
    shots: ["/images/work/hidang-pos.webp", "/images/work/hidang-tables.webp"],
  },
  {
    key: "hauling",
    word: "HAULING",
    title: { en: "VPL: hauling & logistics operations platform", id: "VPL: platform operasional hauling & logistik" },
    kind: { en: "Client work", id: "Karya klien" },
    body: {
      en: "Trips, dump trucks, drivers, routes, fuel and repairs on shared records, with tonnage reconciliation, purchasing, inventory, payroll and monthly settlement.",
      id: "Trip, dump truck, pengemudi, rute, BBM, dan perbaikan pada catatan bersama, dengan rekonsiliasi tonase, pembelian, persediaan, penggajian, dan penyelesaian bulanan.",
    },
    tag: { en: "Real interface · test environment", id: "Antarmuka asli · lingkungan uji" },
    accent: "#E98459",
    href: "/our-work/vpl",
    real: true,
    shots: ["/images/work/vpl-dashboard.webp", "/images/work/vpl-overview.webp"],
  },
  {
    key: "insurance",
    word: "POLICY",
    title: { en: "Insurance policy & renewal management", id: "Manajemen polis & renewal asuransi" },
    kind: { en: "Client work · name withheld", id: "Karya klien · nama dirahasiakan" },
    body: {
      en: "A web system that replaces the Excel policy-account and renewal sheets: every column kept, renewals watched by end date, with premiums, customers, reports, and Excel import and export.",
      id: "Sistem web yang menggantikan lembar Excel account polis dan renewal: semua kolom dipertahankan, renewal dipantau berdasarkan tanggal berakhir, dengan premi, nasabah, laporan, serta impor dan ekspor Excel.",
    },
    annotations: [
      { en: "Premium is a calculated suggestion, always editable by hand", id: "Premi berupa saran hitungan, selalu bisa diedit manual" },
      { en: "A renewal opens a linked new policy; the old one is never changed", id: "Renewal membuka polis baru yang terhubung; polis lama tidak pernah diubah" },
    ],
    tag: { en: "Real interface · fictional names and data", id: "Antarmuka asli · nama dan data fiktif" },
    accent: "#C18D6B",
    real: true,
    shots: ["/images/work/insurance-dashboard.webp", "/images/work/insurance-renewal.webp"],
  },
  {
    key: "rental",
    word: "RENTAL",
    title: { en: "Equipment rental operations", id: "Operasi rental alat" },
    kind: { en: "In design · not delivered", id: "Dalam perancangan · belum diserahkan" },
    body: {
      en: "A designed workflow for machine availability, operating-hour timesheets, operators and rental invoicing. A proposal, shown as a schematic, not as a finished product.",
      id: "Alur kerja yang dirancang untuk ketersediaan mesin, timesheet jam operasi, operator, dan faktur sewa. Sebuah usulan, ditampilkan sebagai skema, bukan produk jadi.",
    },
    tag: { en: "Workflow proposal", id: "Usulan alur kerja" },
    accent: "#C18D6B",
    visual: "equipment",
  },
];

function Block({ p, i }: { p: Project; i: number }) {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  useStage(ref, undefined, "pass");
  const flip = i % 2 === 1;
  const win = "overflow-hidden rounded-[8px] border border-foreground/15 bg-[#111] shadow-[0_50px_100px_-40px_rgba(23,25,30,0.55)]";

  return (
    <div ref={ref} className="relative mx-auto grid min-h-[88svh] w-full max-w-[1400px] items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12">
      {/* oversized lettering, behind everything, drifting with scroll */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-[6%] -z-0 select-none whitespace-nowrap font-display text-[clamp(7rem,21vw,22rem)] font-medium leading-none tracking-[-0.06em]"
        style={{ color: `${p.accent}22`, transform: `translateX(calc((var(--p) - 0.5) * ${flip ? 16 : -16}vw))` }}
      >
        {p.word}
      </span>

      <div className={`relative z-10 lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: p.accent }}>
          0{i + 1} / {p.kind[lang]}
        </span>
        <h3 className="mt-3 font-display text-[clamp(1.7rem,3.2vw,3.1rem)] font-medium uppercase leading-[0.98] tracking-[-0.03em] text-foreground">{p.title[lang]}</h3>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">{p.body[lang]}</p>
        {p.annotations && (
          <ul className="mt-5 max-w-md space-y-2">
            {p.annotations.map((a) => (
              <li key={a.en} className="flex gap-3 text-[12px] leading-snug text-foreground/80">
                <span aria-hidden className="mt-[7px] h-px w-5 shrink-0" style={{ background: p.accent }} />
                {a[lang]}
              </li>
            ))}
          </ul>
        )}
        {p.href && (
          <Link href={p.href} className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-foreground underline-offset-4 hover:underline">
            {lang === "en" ? "See the full presentation" : "Lihat presentasi lengkap"} <ArrowUpRight size={14} />
          </Link>
        )}
        <p className="mt-5 block w-fit rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-technical">{p.tag[lang]}</p>
      </div>

      <div className={`relative z-10 lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
        {p.real ? (
          <div className="relative pb-[14%]">
            <div className={`${win} relative w-[88%]`} style={{ transform: "translateY(calc((0.5 - var(--p)) * 60px))" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.shots![0]} alt={p.title[lang]} width={1800} height={1125} className="block w-full" loading="lazy" />
            </div>
            <div className={`${win} absolute bottom-0 right-0 w-[56%]`} style={{ transform: "translateY(calc((var(--p) - 0.5) * 120px))" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.shots![1]} alt={p.title[lang]} width={1800} height={1125} className="block w-full" loading="lazy" />
            </div>
          </div>
        ) : (
          <div className="relative" style={{ transform: "translateY(calc((0.5 - var(--p)) * 50px))" }}>
            <div className="overflow-hidden rounded-[3px] bg-[#090A0E] shadow-[0_50px_100px_-40px_rgba(23,25,30,0.55)]">
              <SolutionVisual kind={p.visual!} className="block w-full" />
            </div>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-technical">{lang === "en" ? "Schematic, not a screenshot" : "Skema, bukan tangkapan layar"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WorkScene() {
  const { lang } = useLanguage();
  const title = lang === "en" ? ["IDEAS ENGINEERED", "INTO REAL SYSTEMS."] : ["IDE DIRANCANG", "MENJADI SISTEM NYATA."];
  return (
    <section id="work" aria-label={title.join(" ")} className="theme-light relative z-10 -mt-[9vw] overflow-hidden" style={{ borderRadius: "50% 50% 0 0 / 9vw 9vw 0 0" }}>
      <div className="mx-auto max-w-[1400px] px-5 pb-6 pt-[16vw] sm:px-8 lg:pt-[12vw]">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-technical">{lang === "en" ? "Selected software work" : "Karya perangkat lunak pilihan"}</span>
        <h2 className="mt-4 font-display text-[clamp(2.4rem,7.4vw,7.6rem)] font-medium uppercase leading-[0.93] tracking-[-0.04em] text-foreground">
          {title.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h2>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
          {lang === "en"
            ? "Explore the platforms, applications, and operational tools developed by Lunartech: our own product with its real screens, client work without client names, and designs that are still proposals."
            : "Jelajahi platform, aplikasi, dan alat operasional yang dikembangkan Lunartech: produk kami sendiri dengan layar aslinya, karya klien tanpa nama klien, dan rancangan yang masih berupa usulan."}
        </p>
      </div>
      {PROJECTS.map((p, i) => (
        <Block key={p.key} p={p} i={i} />
      ))}
      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-4 sm:px-8">
        <Link href="/our-work" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-void transition-colors hover:bg-accent">
          {lang === "en" ? "All work, clearly labelled" : "Semua karya, berlabel jelas"}
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}
