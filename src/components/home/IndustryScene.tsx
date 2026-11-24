"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { statusMeta, type CapStatus, type L, type VisualKey } from "@/lib/solutionsHub";
import SolutionVisual from "@/components/internal/SolutionVisual";
import FleetBoard from "./FleetBoard";
import { SlideControls, useSlideNav } from "@/components/ui/Slides";

/**
 * SCENE 04: technology for real-world operations.
 * Five industries, each with its own palette and composition. Claims are tied to verified status:
 * "Built" means it exists in a system we have built; "Proposed" is a designed workflow only.
 * Photography is deliberately absent: no stock imagery stands in for real work.
 */

interface Industry {
  slug: string;
  name: L;
  head: [L, L];
  body: L;
  caps: { label: L; status: CapStatus }[];
  bg: string;
  ink: string;
  accent: string;
  layout: "right" | "left" | "bleed" | "haul";
  visual?: VisualKey;
  shot?: { main: string; side: string; label: string; chrome: string };
  note?: L;
}

const l = (en: string, id: string) => ({ en, id });
const c = (en: string, id: string, status: CapStatus) => ({ label: { en, id }, status });

const INDUSTRIES: Industry[] = [
  {
    slug: "fleet-management",
    name: { en: "Fleet & Vehicle Rental", id: "Armada & Rental Kendaraan" },
    head: [{ en: "EVERY VEHICLE.", id: "SETIAP KENDARAAN." }, { en: "ONE VIEW.", id: "SATU TAMPILAN." }],
    body: { en: "Vehicle allocation, fleet availability, rental scheduling, operational monitoring and maintenance workflows.", id: "Alokasi kendaraan, ketersediaan armada, penjadwalan sewa, pemantauan operasional, dan alur perawatan." },
    caps: [c("Vehicle master data and documents", "Data induk dan dokumen kendaraan", "built"), c("Maintenance and workshop records", "Catatan perawatan dan bengkel", "built"), c("Rental scheduling and contracts", "Penjadwalan dan kontrak sewa", "bespoke")],
    bg: "#0E1114", ink: "#F0EAE0", accent: "#C18D6B", layout: "right", visual: "fleet",
  },
  {
    slug: "hauling-management",
    name: { en: "Hauling Management", id: "Manajemen Hauling" },
    head: [{ en: "EVERY LOAD. EVERY VEHICLE.", id: "SETIAP MUATAN. SETIAP KENDARAAN." }, { en: "ONE CONNECTED OPERATION.", id: "SATU OPERASI TERHUBUNG." }],
    body: { en: "Dump truck management, hauling trips, tonnage, fuel consumption, driver assignments and operational reporting.", id: "Manajemen dump truck, trip hauling, tonase, konsumsi BBM, penugasan pengemudi, dan pelaporan operasional." },
    caps: [c("Hauling trip records and tonnage reconciliation", "Catatan trip hauling dan rekonsiliasi tonase", "built"), c("Fuel issue records", "Catatan pengeluaran BBM", "built"), c("Driver assignments and reports", "Penugasan pengemudi dan laporan", "built")],
    bg: "#17110D", ink: "#F0EAE0", accent: "#E98459", layout: "haul",
    shot: { main: "/images/work/vpl-dashboard.webp", side: "", label: "VPL / hauling operations", chrome: "#120e0b" },
    note: { en: "Real VPL screens, captured from a test environment.", id: "Layar VPL asli, diambil dari lingkungan uji." },
  },
  {
    slug: "heavy-equipment-rental",
    name: { en: "Heavy Equipment Rental", id: "Rental Alat Berat" },
    head: [{ en: "EVERY ASSET.", id: "SETIAP ASET." }, { en: "EVERY HOUR.", id: "SETIAP JAM." }],
    body: { en: "Equipment availability, rental contracts, operating hours, maintenance schedules, mobilisation and billing workflows.", id: "Ketersediaan alat, kontrak sewa, jam operasi, jadwal perawatan, mobilisasi, dan alur penagihan." },
    caps: [c("Equipment inventory and availability", "Inventaris dan ketersediaan alat", "proposed"), c("Operating-hour timesheets", "Timesheet jam operasi", "proposed"), c("Rental invoices", "Faktur sewa", "proposed")],
    bg: "#101214", ink: "#F0EAE0", accent: "#F0EAE0", layout: "bleed", visual: "equipment",
    note: { en: "Workflow proposal. No delivered rental product is claimed.", id: "Usulan alur kerja. Tidak ada klaim produk rental yang sudah diserahkan." },
  },
  {
    slug: "erp",
    name: { en: "ERP & Enterprise Operations", id: "ERP & Operasi Perusahaan" },
    head: [{ en: "ONE RECORD", id: "SATU CATATAN" }, { en: "OF THE BUSINESS.", id: "BISNIS." }],
    body: { en: "Procurement, inventory, finance, personnel, document management, approvals and operational workflows.", id: "Pengadaan, persediaan, keuangan, personalia, manajemen dokumen, persetujuan, dan alur kerja operasional." },
    caps: [c("Procurement, inventory and stock opname", "Pengadaan, persediaan, dan stock opname", "built"), c("Payroll, attendance and approvals", "Penggajian, absensi, dan persetujuan", "built"), c("Accounting integration", "Integrasi akuntansi", "bespoke")],
    bg: "#0D1011", ink: "#F0EAE0", accent: "#88898C", layout: "right", visual: "erp",
  },
  {
    slug: "insurance-policy-management",
    name: { en: "Insurance & Policy Management", id: "Asuransi & Manajemen Polis" },
    head: [{ en: "EVERY POLICY.", id: "SETIAP POLIS." }, { en: "EVERY RENEWAL.", id: "SETIAP PERPANJANGAN." }],
    body: { en: "Policy accounts, renewal monitoring, premiums, customers and reports, in place of the spreadsheet.", id: "Account polis, pemantauan renewal, premi, nasabah, dan laporan, menggantikan spreadsheet." },
    caps: [c("Policy account with every column, searchable and exportable", "Account polis dengan semua kolom, dapat dicari dan diekspor", "built"), c("Renewal queue by end date, with status and notes", "Antrean renewal berdasarkan tanggal berakhir, dengan status dan catatan", "built"), c("Reports by insurer and agent, receivables and payables", "Laporan per asuransi dan agen, piutang dan hutang", "built")],
    bg: "#1A130E", ink: "#F0EAE0", accent: "#D9A66B", layout: "left",
    shot: { main: "/images/work/insurance-dashboard.webp", side: "/images/work/insurance-renewal.webp", label: "Policy accounts", chrome: "#17110c" },
    note: { en: "Real interface, shown with fictional companies and data. Client not named.", id: "Antarmuka asli, ditampilkan dengan perusahaan dan data fiktif. Klien tidak disebutkan." },
  },
  {
    slug: "fnb-hospitality",
    name: { en: "F&B & Hospitality Systems", id: "Sistem F&B & Perhotelan" },
    head: [{ en: "FROM THE TABLE", id: "DARI MEJA" }, { en: "TO THE KITCHEN.", id: "KE DAPUR." }],
    body: { en: "POS, kitchen operations, inventory, menu costing and business reporting, in Hidang, our own F&B product.", id: "POS, operasional dapur, persediaan, perhitungan biaya menu, dan pelaporan bisnis, dalam Hidang, produk F&B kami sendiri." },
    caps: [c("Cashier POS, orders board and floor plan", "POS kasir, papan pesanan, dan denah meja", "built"), c("Kitchen display and stock by recipe", "Layar dapur dan stok berdasarkan resep", "built"), c("Menu costing and reports", "Biaya menu dan laporan", "built")],
    bg: "#12251C", ink: "#F6F2EA", accent: "#B89A62", layout: "right",
    shot: { main: "/images/work/hidang-pos.webp", side: "/images/work/hidang-tables.webp", label: "Hidang · POS", chrome: "#0c1912" },
    note: { en: "Real Hidang screens, shown with its built-in demo data.", id: "Layar Hidang asli, ditampilkan dengan data demo bawaannya." },
  },
];


function Visual({ ind }: { ind: Industry }) {
  if (ind.shot) {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-0 flex items-center">
          <div className="relative w-[92%] overflow-hidden rounded-[10px] border border-white/10 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]" style={{ background: ind.shot.chrome }}>
            <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-2 w-2 rounded-full bg-white/20" />
              ))}
              <span className="ml-3 font-mono text-[9px] uppercase tracking-[0.1em] text-white/40">{ind.shot.label}</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ind.shot.main} alt={ind.shot.label} width={1800} height={1125} className="block w-full" loading="lazy" />
          </div>
          {ind.shot.side && (
          <div className="absolute -bottom-2 right-0 w-[46%] overflow-hidden rounded-[8px] border border-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)]" style={{ background: ind.shot.chrome }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ind.shot.side} alt={ind.shot.label} width={1800} height={1125} className="block w-full" loading="lazy" />
          </div>
          )}
        </div>
      </div>
    );
  }
  if (ind.visual === "fleet") {
    return (
      <div className="relative flex h-full w-full items-center">
        <FleetBoard />
      </div>
    );
  }
  return (
    <div className="relative flex h-full w-full items-center">
      <div className="w-full overflow-hidden rounded-[3px] border border-white/10">
        <SolutionVisual kind={ind.visual!} className="block w-full" />
      </div>
    </div>
  );
}

export default function IndustryScene() {
  const { lang } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const n = INDUSTRIES.length;
  const step = (d: 1 | -1) => setIdx((i) => (i + d + n) % n);
  const jump = (i: number) => setIdx(i);
  useSlideNav(rootRef, step);

  const title = lang === "en" ? ["TECHNOLOGY FOR", "REAL-WORLD OPERATIONS."] : ["TEKNOLOGI UNTUK", "OPERASI DUNIA NYATA."];
  const cur = INDUSTRIES[idx];

  const text = (ind: Industry) => (
    <div className="relative z-10">
      <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: ind.accent }}>
        {ind.name[lang]}
      </span>
      <h3 className="mt-3 font-display text-[clamp(2rem,4.4vw,4.6rem)] font-medium uppercase leading-[0.95] tracking-[-0.035em]">
        {ind.head.map((l) => (
          <span key={l.en} className="block">
            {l[lang]}
          </span>
        ))}
      </h3>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed opacity-75">{ind.body[lang]}</p>
      <ul className="mt-5 max-w-md divide-y divide-white/10 border-y border-white/10">
        {ind.caps.map((cap) => (
          <li key={cap.label.en} className="flex items-center justify-between gap-3 py-2 text-[13px]">
            <span className="opacity-90">{cap.label[lang]}</span>
            <span title={statusMeta[cap.status].hint[lang]} className="shrink-0 rounded-full border px-2 py-[2px] font-mono text-[9px] uppercase tracking-[0.08em]" style={{ borderColor: cap.status === "built" ? ind.accent : "rgba(255,255,255,0.25)", color: cap.status === "built" ? ind.accent : "rgba(240,234,224,0.6)" }}>
              {statusMeta[cap.status].label[lang]}
            </span>
          </li>
        ))}
      </ul>
      {ind.note && <p className="mt-3 max-w-md font-mono text-[10px] uppercase tracking-[0.08em] opacity-50">{ind.note[lang]}</p>}
      <Link href={`/solutions/${ind.slug}`} className="group mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#090A0E] transition-transform hover:-translate-y-0.5" style={{ background: ind.accent }}>
        {lang === "en" ? "Explore solution" : "Jelajahi solusi"}
        <ArrowUpRight size={14} />
      </Link>
    </div>
  );

  return (
    <section id="industries" aria-label={title.join(" ")} className="relative z-10 bg-[#090A0E] text-[#F0EAE0]">
      <div className="hidden lg:block">
        <div ref={rootRef} className="relative h-[100svh] overflow-hidden">
          {INDUSTRIES.map((ind, i) => {
            const on = i === idx;
            return (
              <div
                key={ind.slug}
                aria-hidden={!on}
                className="absolute inset-0 transition-[clip-path] duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
                style={{ background: ind.bg, color: ind.ink, clipPath: on ? "inset(0 0 0 0)" : i < idx ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)", zIndex: i }}
              >
                {/* giant name, set behind the composition */}
                <span aria-hidden className="pointer-events-none absolute -bottom-[3vh] left-[3vw] select-none whitespace-nowrap font-display text-[15vw] font-medium uppercase leading-none tracking-[-0.05em] opacity-[0.045]">
                  {ind.name.en.split(" ")[0]}
                </span>
                {ind.layout === "haul" ? (
                  <div className="relative h-full overflow-hidden">
                    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_70%_at_12%_105%,rgba(233,132,89,0.30),transparent_62%)]" />
                    {/* one large, real dashboard: tilted toward the reader and bleeding off the edge */}
                    <div className="absolute top-[17vh] [perspective:2400px]" style={{ right: "-9vw", width: "72vw" }}>
                      <div className="relative" style={{ transform: "rotateY(-10deg) rotateX(2deg)", transformOrigin: "100% 50%" }}>
                        <div className="overflow-hidden rounded-[10px] border border-white/15 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.85),0_0_90px_-30px_rgba(233,132,89,0.35)]" style={{ background: ind.shot!.chrome }}>
                          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                            {[0, 1, 2].map((k) => (
                              <span key={k} className="h-2 w-2 rounded-full bg-white/20" />
                            ))}
                            <span className="ml-3 font-mono text-[9px] uppercase tracking-[0.1em] text-white/45">{ind.shot!.label}</span>
                          </div>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={ind.shot!.main} alt={ind.shot!.label} width={2000} height={1106} className="block w-full" loading="lazy" />
                        </div>
                        {[
                          { x: 26.5, y: 77, t: l("Vehicle and driver", "Kendaraan dan pengemudi") },
                          { x: 46.5, y: 54, t: l("Tonnage vs average", "Tonase vs rata-rata") },
                          { x: 75, y: 63, flip: true, t: l("Fleet utilisation", "Utilisasi armada") },
                          { x: 80.5, y: 79, flip: true, t: l("Fuel this month", "BBM bulan ini") },
                        ].map((cl) => (
                          <div key={cl.t.en} aria-hidden className={`absolute flex items-center gap-2 ${"flip" in cl ? "-translate-x-full flex-row-reverse" : ""}`} style={{ left: `${cl.x}%`, top: `${cl.y}%` }}>
                            <span className={`h-3 w-3 rounded-full border-2 border-[#E98459] bg-[#17110D] ${"flip" in cl ? "translate-x-1/2" : "-translate-x-1/2"}`} />
                            <span className="h-px w-6 bg-[#E98459]" />
                            <span className="whitespace-nowrap rounded-[3px] bg-[#17110D]/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em]">{cl.t[lang]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${ind.bg} 24%, transparent 50%)` }} />
                    <div className="absolute left-8 top-[19vh] w-[34vw]">{on && text(ind)}</div>
                  </div>
                ) : ind.layout === "bleed" ? (
                  <div className="relative h-full">
                    <div className="absolute inset-0 flex items-center justify-end pr-[4vw] pt-24 opacity-90">
                      <div className="w-[64vw]">
                        <Visual ind={ind} />
                      </div>
                    </div>
                    <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${ind.bg} 18%, transparent 62%)` }} />
                    <div className="absolute left-8 top-28 w-[38vw]">{on && text(ind)}</div>
                    {/* technical spec overlay */}
                    <dl className="absolute bottom-10 right-72 grid grid-cols-3 gap-x-8 font-mono text-[10px] uppercase tracking-[0.08em] opacity-70">
                      {[["Hours", "Logged"], ["Rental", "Contract"], ["Mobilisation", "Tracked"]].map(([a, b]) => (
                        <div key={a}>
                          <dt className="opacity-60">{a}</dt>
                          <dd>{b}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : (
                  <div className={`relative grid h-full items-center gap-10 px-8 pb-10 pt-28 ${ind.layout === "left" ? "grid-cols-[1.2fr_1fr]" : "grid-cols-[1fr_1.2fr]"}`}>
                    {ind.layout === "left" ? (
                      <>
                        <div className="h-[56vh]"><Visual ind={ind} /></div>
                        {on && text(ind)}
                      </>
                    ) : (
                      <>
                        {on && text(ind)}
                        <div className="h-[56vh]"><Visual ind={ind} /></div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <SlideControls idx={idx} n={n} onStep={step} tone={cur.ink} className="absolute bottom-8 right-8 z-30" />

          {/* persistent chrome: section title + selector, above every slide */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-8 pt-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] opacity-60">
              {title[0]} {title[1]}
            </p>
            <ol className="pointer-events-auto flex items-center gap-2" aria-label={lang === "en" ? "Industries" : "Industri"}>
              {INDUSTRIES.map((ind, i) => (
                <li key={ind.slug}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-label={ind.name[lang]}
                    aria-current={i === idx ? "true" : undefined}
                    className="group flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors"
                    style={{ borderColor: i === idx ? cur.accent : "rgba(255,255,255,0.18)", color: i === idx ? cur.accent : "rgba(240,234,224,0.55)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                    <span className={i === idx ? "inline" : "hidden xl:inline"}>{ind.name[lang].split(" ")[0]}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* mobile / tablet */}
      <div className="px-5 py-20 lg:hidden">
        <h2 className="font-display text-[clamp(1.8rem,7vw,2.6rem)] font-medium uppercase leading-[0.98] tracking-[-0.03em]">
          {title.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h2>
        <div className="mt-10 space-y-14">
          {INDUSTRIES.map((ind) => (
            <article key={ind.slug} style={{ color: ind.ink }} className="rounded-[3px] p-5">
              <div style={{ background: ind.bg }} className="-m-5 p-5">
                <div className="mb-5">
                  <Visual ind={ind} />
                </div>
                {text(ind)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
