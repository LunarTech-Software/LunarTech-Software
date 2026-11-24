"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { L } from "@/lib/solutionsHub";
import { useStage } from "@/components/home/useStage";
import { sitePhotos } from "@/lib/photos";

/**
 * VPL showcase. The only image used is the real VPL dashboard (captured from a test environment, so its
 * figures are empty rather than invented). The zoom regions below are measured from that screenshot, and every
 * caption describes only what is visible in the region it points at. Nothing is redrawn.
 */

const IW = 2000;
const IH = 1106;
const SRC = "/images/work/vpl-dashboard.webp";
const OR = "#E8793A";
const l = (en: string, id: string): L => ({ en, id });
const CALLOUTS: { x: number; y: number; t: L }[] = [
  { x: 530, y: 850, t: l("Vehicle and driver assignment", "Kendaraan dan penugasan pengemudi") },
  { x: 930, y: 600, t: l("Tonnage against the 14-day average", "Tonase terhadap rata-rata 14 hari") },
  { x: 1500, y: 690, t: l("Fleet utilisation", "Utilisasi armada") },
  { x: 1610, y: 870, t: l("Fuel and loads this month", "BBM dan muatan bulan ini") },
];

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";

type R = { x: number; y: number; w: number; h: number };
const IMGS = {
  dash: { src: "/images/work/vpl-dashboard.webp", w: 2000, h: 1106 },
  today: { src: "/images/work/vpl-today.webp", w: 2000, h: 1099 },
  unit: { src: "/images/work/vpl-unit.webp", w: 2000, h: 1089 },
  report: { src: "/images/work/vpl-report.webp", w: 2000, h: 1089 },
} as const;
type ImgKey = keyof typeof IMGS;
type Step = { img: ImgKey; r: R; m?: R; fill?: number; anchor?: [number, number]; big?: boolean; callouts?: boolean; cta?: boolean; kicker: L; title: L; body: L };
const FULL: R = { x: 0, y: 0, w: IW, h: IH };
const STEPS: Step[] = [
  {
    img: "dash", r: FULL, fill: 0.6, anchor: [0.7, 0.55], big: true,
    kicker: l("The operation", "Operasinya"),
    title: l("Every load. Every vehicle. One connected operation.", "Setiap muatan. Setiap kendaraan. Satu operasi terhubung."),
    body: l("Trucks, trips, fuel and tonnage, recorded as the work happens.", "Truk, trip, BBM, dan tonase, dicatat saat pekerjaan berjalan."),
  },
  {
    img: "dash", r: FULL, fill: 0.9, callouts: true,
    kicker: l("Into the software", "Masuk ke perangkat lunak"),
    title: l("What happens on the road lands on one screen.", "Yang terjadi di jalan masuk ke satu layar."),
    body: l("The real VPL dashboard. Each marked area is a part of the operation that is recorded here.", "Dasbor VPL asli. Setiap area bertanda adalah bagian operasi yang dicatat di sini."),
  },
  {
    img: "dash", r: { x: 0, y: 40, w: 330, h: 1010 },
    kicker: l("Navigation", "Navigasi"),
    title: l("Ten areas of the business, one menu.", "Sepuluh area bisnis, satu menu."),
    body: l("Operations, fleet, inventory, HR, purchasing, master data, logistics, operational and logistics reports, administration.", "Operasional, armada, inventori, SDM, pembelian, master data, logistik, laporan operasional dan logistik, administrasi."),
  },
  {
    img: "today", r: { x: 0, y: 0, w: 2000, h: 1099 }, m: { x: 370, y: 500, w: 640, h: 225 }, fill: 0.9,
    kicker: l("Today", "Hari ini"),
    title: l("Tonnage, trips, fuel and fleet readiness.", "Tonase, ritase, BBM, dan kesiapan armada."),
    body: l("Four headline figures with yesterday's comparison, quick actions for fuel, goods issue, handover and new staff, and the month's OPEX.", "Empat angka utama dengan pembanding kemarin, aksi cepat untuk solar, pengeluaran barang, serah terima, dan karyawan baru, serta OPEX bulan ini."),
  },
  {
    img: "unit", r: { x: 375, y: 245, w: 1597, h: 595 }, m: { x: 375, y: 245, w: 900, h: 460 },
    kicker: l("Unit detail", "Detail unit"),
    title: l("One dump truck, its driver, fuel and loads.", "Satu dump truck, pengemudi, BBM, dan muatannya."),
    body: l("Vehicle and plate, assigned driver, 14-day tonnage, fuel used this month and loads moved, with every unit one tap away.", "Kendaraan dan nomor polisi, pengemudi yang ditugaskan, tonase 14 hari, solar bulan ini, dan muatan, dengan setiap unit satu ketukan."),
  },
  {
    img: "report", r: { x: 370, y: 190, w: 1600, h: 185 }, m: { x: 370, y: 190, w: 790, h: 185 },
    kicker: l("Hauling records", "Catatan hauling"),
    title: l("Production, reconciliation, fleet and fuel for any filter.", "Produksi, rekonsiliasi, armada, dan BBM untuk setiap filter."),
    body: l("Total trips, ticket weight against final weight, what is still to be reconciled, units operating and fuel used.", "Total ritase, berat tiket terhadap berat final, yang belum direkonsiliasi, unit beroperasi, dan solar terpakai."),
  },
  {
    img: "report", r: { x: 370, y: 400, w: 1600, h: 680 }, m: { x: 370, y: 620, w: 1000, h: 400 },
    kicker: l("Hauling records", "Catatan hauling"),
    title: l("Every trip, searchable, exportable, ready for payroll period.", "Setiap trip, dapat dicari, diekspor, siap untuk periode gaji."),
    body: l("Search by trip, driver, unit or ticket; filter by date and month; bulk actions; export to Excel or print the table.", "Cari menurut trip, pengemudi, unit, atau tiket; saring menurut tanggal dan bulan; aksi massal; ekspor ke Excel atau cetak tabel."),
  },
  {
    img: "dash", r: FULL, fill: 0.88, cta: true,
    kicker: l("The complete picture", "Gambaran lengkap"),
    title: l("Hauling operations, under control.", "Operasi hauling, terkendali."),
    body: l("Hauling records, fuel, fleet utilisation and reporting in one platform. Tell us how your operation runs and we will talk about a system built around it.", "Catatan hauling, BBM, utilisasi armada, dan pelaporan dalam satu platform. Ceritakan bagaimana operasi Anda berjalan dan kita bahas sistem yang dibangun di sekitarnya."),
  },
];

const AREAS: L[] = [
  l("Hauling trip reports and driver assignments", "Laporan trip hauling dan penugasan pengemudi"),
  l("Fuel usage and goods issue", "Pemakaian solar dan pengeluaran barang"),
  l("Dump trucks, positions, handover (BAST) and workshop repairs", "Dump truck, posisi, serah terima (BAST), dan perbaikan bengkel"),
  l("Opening and closing vouchers", "Voucher buka dan tutup"),
  l("Employees, attendance, driver schedules, BPJS, payroll", "Karyawan, absensi, jadwal driver, BPJS, penggajian"),
  l("Purchasing, master data, logistics and operational reports", "Pembelian, master data, logistik, dan laporan operasional"),
];

function Hero() {
  const { lang } = useLanguage();
  const en = lang === "en";
  return (
    <section className="relative overflow-hidden bg-[#F2EFEB] text-[#17171A]">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-36 sm:px-8 lg:pt-44">
        <span className={`${mono} flex items-center gap-3 text-[#6e6a66]`}>
          <span className="h-2 w-2 rounded-full" style={{ background: OR }} />
          {en ? "Client platform / hauling operations" : "Platform klien / operasi hauling"}
        </span>
        <h1 className="mt-6 max-w-[12ch] text-[clamp(3.4rem,10.5vw,10.5rem)] font-semibold normal-case leading-[0.88] tracking-[-0.055em]">
          {en ? "Operations. Under control." : "Operasi. Terkendali."}
        </h1>
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <p className="max-w-lg text-[16px] leading-relaxed text-[#17171A]/70 lg:col-span-5">
            {en
              ? "An integrated management platform that brings hauling operations, fleet management, fuel monitoring, reporting and operational oversight into one connected environment."
              : "Platform manajemen terpadu yang menyatukan operasi hauling, manajemen armada, pemantauan BBM, pelaporan, dan pengawasan operasional dalam satu lingkungan terhubung."}
          </p>
          <div className="flex flex-wrap items-start gap-3 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <a href="#screens" className="rounded-full px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-white transition-transform hover:-translate-y-0.5" style={{ background: OR }}>
              {en ? "See the screens" : "Lihat layarnya"}
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#17171A]/30 px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] transition-colors hover:border-[#17171A]">
              {en ? "Discuss a similar system" : "Bahas sistem serupa"} <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
      <div className="relative mx-auto max-w-[1400px] px-5 pb-20 sm:px-8">
        <div className="[perspective:2200px]">
          <div className="overflow-hidden rounded-[12px] border border-[#17171A]/15 bg-white shadow-[0_70px_120px_-50px_rgba(23,23,26,0.55),0_30px_60px_-30px_rgba(232,121,58,0.25)]" style={{ transform: "rotateX(4deg)", transformOrigin: "50% 100%" }}>
            <div className="flex items-center gap-1.5 border-b border-[#17171A]/10 bg-[#fafafa] px-4 py-2.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#17171A]/15" />
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SRC} alt={en ? "The VPL hauling operations dashboard" : "Dasbor operasi hauling VPL"} width={IW} height={IH} className="block w-full" />
          </div>
        </div>
        <p className={`${mono} mt-4 text-[#6e6a66]`}>
          {en ? "Real VPL screen, captured from a test environment: the figures are empty, not invented" : "Layar VPL asli, diambil dari lingkungan uji: angkanya kosong, bukan karangan"}
        </p>
      </div>
    </section>
  );
}

function Zoom() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [box, setBox] = useState({ w: 1200, h: 700 });
  const onProgress = useCallback((p: number) => setIdx(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length))), []);
  useStage(wrapRef, onProgress);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBox({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setBox({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const st = STEPS[idx];
  const narrow = box.w < 700;
  const reg = narrow && st.m ? st.m : st.r;
  const fill = st.fill ?? 0.8;
  // the caption sits over the lower third, so the zoomed region is framed in the space above it
  const top = 84;
  const availH = box.h * 0.64 - top;
  const s = Math.min(Math.min(box.w / reg.w, availH / reg.h) * fill, 1.5);
  const ax = st.anchor ? st.anchor[0] * box.w : box.w / 2;
  const ay = st.anchor ? st.anchor[1] * box.h : top + availH / 2;
  const tx = ax - (reg.x + reg.w / 2) * s;
  const ty = ay - (reg.y + reg.h / 2) * s;

  return (
    <section id="screens" aria-label={en ? "VPL screens" : "Layar VPL"} className="bg-[#17171A] text-[#F2EFEB]">
      <div ref={wrapRef} className="stage-wrap" style={{ height: `calc(100svh + ${STEPS.length * 75}svh)` }}>
        <div className="stage-sticky sticky top-0 h-[100svh] overflow-hidden">
          {/* the setting: a real photograph when one is supplied, otherwise a graded warm backdrop */}
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(90%_70%_at_18%_100%,rgba(232,121,58,0.28),transparent_60%),radial-gradient(70%_60%_at_85%_0%,rgba(242,239,235,0.07),transparent_60%)]" />
          {sitePhotos.vplWide && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={sitePhotos.vplWide} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms]" style={{ opacity: idx === 0 ? 0.85 : 0.18 }} />
          )}
          <div ref={stageRef} className="absolute inset-0">
            {(Object.keys(IMGS) as ImgKey[]).map((k) => {
              const im = IMGS[k];
              const home = STEPS.find((x) => x.img === k)!;
              const cur = st.img === k ? st : home;
              const rg = narrow && cur.m ? cur.m : cur.r;
              const f = cur.fill ?? 0.8;
              const sc = Math.min(Math.min(box.w / rg.w, availH / rg.h) * f, 1.5);
              const px = cur.anchor ? cur.anchor[0] * box.w : box.w / 2;
              const py = cur.anchor ? cur.anchor[1] * box.h : top + availH / 2;
              const x = px - (rg.x + rg.w / 2) * sc;
              const y = py - (rg.y + rg.h / 2) * sc;
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={k}
                  src={im.src}
                  alt={k === st.img ? (en ? "VPL screen, zoomed to the region described" : "Layar VPL, diperbesar ke area yang dijelaskan") : ""}
                  aria-hidden={k !== st.img}
                  width={im.w}
                  height={im.h}
                  className="absolute left-0 top-0 max-w-none rounded-[6px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.65,0,0.25,1)]"
                  style={{ width: im.w, height: im.h, transformOrigin: "0 0", transform: `translate(${x}px, ${y}px) scale(${sc})`, opacity: k === st.img ? 1 : 0 }}
                />
              );
            })}
          </div>
          {/* annotations pinned to the real dashboard while it is shown whole */}
          {CALLOUTS.map((c) => (
            <div key={c.t.en} aria-hidden={!st.callouts} className="pointer-events-none absolute z-10 flex items-center gap-2 transition-opacity duration-500" style={{ left: tx + c.x * s, top: ty + c.y * s, opacity: st.callouts && !narrow ? 1 : 0 }}>
              <span className="h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#E8793A] bg-[#17171A]" />
              <span className="h-px w-8 bg-[#E8793A]" />
              <span className="whitespace-nowrap rounded-[3px] bg-[#17171A]/90 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#F2EFEB]">{c.t[lang]}</span>
            </div>
          ))}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#17171A] via-[#17171A]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-8 sm:px-8">
            <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-6">
              <div key={idx} className="int-fade max-w-xl">
                <span className={mono} style={{ color: OR }}>
                  {String(idx + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")} · {st.kicker[lang]}
                </span>
                <h2 className={`mt-3 font-semibold normal-case leading-[1] tracking-[-0.035em] ${st.big ? "text-[clamp(2.2rem,5.4vw,5.4rem)]" : "text-[clamp(1.7rem,3.6vw,3.4rem)]"}`}>{st.title[lang]}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[#F2EFEB]/75">{st.body[lang]}</p>
                {st.cta && (
                  <div className="pointer-events-auto mt-5 flex flex-wrap gap-3">
                    <Link href="/solutions/hauling-management" className="rounded-full px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-white transition-transform hover:-translate-y-0.5" style={{ background: OR }}>
                      {en ? "Explore VPL" : "Jelajahi VPL"}
                    </Link>
                    <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#F2EFEB]/40 px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] transition-colors hover:border-[#F2EFEB]">
                      {en ? "Discuss a custom system" : "Bahas sistem khusus"} <ArrowUpRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
              <p className={`${mono} text-[#F2EFEB]/50`}>{en ? "Real screen, test environment" : "Layar asli, lingkungan uji"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Covers() {
  const { lang } = useLanguage();
  const en = lang === "en";
  return (
    <section className="bg-[#F2EFEB] text-[#17171A]">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className={`${mono} text-[#6e6a66]`}>{en ? "What the platform covers" : "Cakupan platform"}</span>
            <h2 className="mt-4 text-[clamp(2rem,4.6vw,4.4rem)] font-semibold normal-case leading-[0.96] tracking-[-0.045em]">{en ? "Built around a hauling business." : "Dibangun di sekitar bisnis hauling."}</h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#17171A]/70">
              {en ? "These areas are the ones visible in the platform's own menu. We describe only what the screen shows." : "Area ini adalah yang terlihat di menu platform sendiri. Kami hanya menjelaskan apa yang ditampilkan layar."}
            </p>
          </div>
          <ul className="lg:col-span-7">
            {AREAS.map((a, i) => (
              <li key={a.en} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-[#17171A]/20 py-4 text-[16px]">
                <span className="font-mono text-[10px] tracking-[0.08em]" style={{ color: OR }}>{String(i + 1).padStart(2, "0")}</span>
                {a[lang]}
              </li>
            ))}
            <li className="border-t border-[#17171A]/20" />
          </ul>
        </div>

        <div className="mt-16 flex flex-col gap-6 rounded-[10px] bg-[#17171A] p-8 text-[#F2EFEB] sm:p-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="max-w-[18ch] text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold normal-case leading-[1] tracking-[-0.035em]">{en ? "Running trucks, trips and fuel on spreadsheets?" : "Masih mengelola truk, trip, dan BBM di spreadsheet?"}</h3>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#F2EFEB]/70">
              {en ? "Tell us how your operation runs. Whether anything here can be reused for you depends on the agreement with the client it was built for." : "Ceritakan bagaimana operasi Anda berjalan. Apakah ada yang dapat dipakai ulang untuk Anda bergantung pada kesepakatan dengan klien tempat sistem ini dibuat."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-white transition-transform hover:-translate-y-0.5" style={{ background: OR }}>
              {en ? "Make an enquiry" : "Ajukan pertanyaan"}
            </Link>
            <Link href="/solutions/hauling-management" className="inline-flex items-center gap-2 rounded-full border border-[#F2EFEB]/40 px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] transition-colors hover:border-[#F2EFEB]">
              {en ? "Hauling solution" : "Solusi hauling"} <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function VplView() {
  return (
    <>
      <Hero />
      <Zoom />
      <Covers />
    </>
  );
}
