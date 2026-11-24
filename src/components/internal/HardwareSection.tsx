"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { statusMeta, type CapStatus, type L } from "@/lib/solutionsHub";
import { useStage } from "@/components/home/useStage";
import EquipmentScene from "./EquipmentScene";

/**
 * Hardware and automation. One introduction, then one pinned sequence on a single concept image of a
 * motor-driven pump (equipment, sensor, data capture, software, outcome), then the capability areas and a
 * concise statement of scope. The sequence is state-driven and its picture is in the first paint, so if the
 * scroll animation ever fails the section still shows its content. The section must not have an
 * overflow-hidden ancestor: that would stop the sticky stage from sticking and leave a blank scroll area.
 */

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";
const l = (en: string, id: string): L => ({ en, id });

const AREAS: { name: L; body: L; items: L[]; status: CapStatus }[] = [
  {
    name: l("IoT & connected monitoring", "IoT & pemantauan terhubung"),
    body: l("Readings from the floor reach a dashboard and raise an alert when a limit is crossed.", "Pembacaan dari lapangan sampai ke dasbor dan memicu peringatan saat batas terlewati."),
    items: [l("Temperature and environmental sensing", "Sensor suhu dan lingkungan"), l("Equipment condition monitoring", "Pemantauan kondisi peralatan"), l("Threshold alerts and remote dashboards", "Peringatan ambang batas dan dasbor jarak jauh")],
    status: "proposed",
  },
  {
    name: l("Embedded & device integration", "Embedded & integrasi perangkat"),
    body: l("The link between a device and your software: gateways, data acquisition and control screens.", "Penghubung antara perangkat dan perangkat lunak Anda: gateway, akuisisi data, dan layar kontrol."),
    items: [l("Microcontroller-based devices, sensors and actuators", "Perangkat berbasis mikrokontroler, sensor, dan aktuator"), l("Gateway and device communication", "Gateway dan komunikasi perangkat"), l("Custom control interfaces", "Antarmuka kontrol khusus")],
    status: "bespoke",
  },
  {
    name: l("Machine vision & documents", "Machine vision & dokumen"),
    body: l("Turning images and paper into data your systems can use.", "Mengubah gambar dan kertas menjadi data yang dapat dipakai sistem Anda."),
    items: [l("OCR and document processing", "OCR dan pemrosesan dokumen"), l("Camera-based monitoring and inspection", "Pemantauan dan inspeksi berbasis kamera"), l("Image-based workflow steps", "Langkah alur kerja berbasis gambar")],
    status: "bespoke",
  },
  {
    name: l("Industrial automation", "Otomasi industri"),
    body: l("Connecting equipment data and control systems to the rest of the business software.", "Menghubungkan data peralatan dan sistem kontrol ke perangkat lunak bisnis lainnya."),
    items: [l("PLC-related system integration", "Integrasi sistem terkait PLC"), l("Sensor-triggered workflows", "Alur kerja yang dipicu sensor"), l("Operational data integration", "Integrasi data operasional")],
    status: "bespoke",
  },
];

const STAGES: { title: L; body: L }[] = [
  { title: l("The equipment", "Peralatan"), body: l("It starts with equipment doing real work: a motor driving a pump.", "Semuanya dimulai dari peralatan yang bekerja: motor yang menggerakkan pompa.") },
  { title: l("The sensor", "Sensor"), body: l("A sensor on the motor housing measures vibration and temperature, two signals that show how a machine is behaving.", "Sensor pada rumah motor mengukur getaran dan suhu, dua sinyal yang menunjukkan bagaimana mesin berperilaku.") },
  { title: l("Data capture", "Akuisisi data"), body: l("A controller or gateway collects each reading and sends it over the network.", "Pengendali atau gateway mengumpulkan setiap pembacaan dan mengirimnya lewat jaringan.") },
  { title: l("Software integration", "Integrasi perangkat lunak"), body: l("The software stores each measurement, draws the trend and compares it with limits set in advance.", "Perangkat lunak menyimpan setiap pengukuran, menggambar tren, dan membandingkannya dengan batas yang ditetapkan sebelumnya.") },
  { title: l("The outcome", "Hasilnya"), body: l("Operators see equipment status, get an alert when a limit is crossed, and the response is recorded.", "Operator melihat status peralatan, mendapat peringatan saat batas terlewati, dan tanggapannya dicatat.") },
];

const INK = "#F0EAE0";
const OR = "#E98459";
const mono2 = { fontFamily: "var(--font-jetbrains-mono), monospace", letterSpacing: 1.5 } as const;

export default function HardwareSection() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const wrapRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const pRef = useRef(0);
  const labelRef = useRef<HTMLDivElement>(null);
  const onProgress = useCallback((p: number) => {
    pRef.current = p;
    setIdx(Math.min(STAGES.length - 1, Math.floor(p * STAGES.length)));
  }, []);
  const onLabel = useCallback((x: number, y: number, show: boolean) => {
    const el = labelRef.current;
    if (!el) return;
    el.style.display = show ? "flex" : "none";
    if (show) {
      el.style.left = `${x + 24}px`;
      el.style.top = `${y}px`;
    }
  }, []);
  useStage(wrapRef, onProgress);
  const s = STAGES[idx];
  const reading = [38, 41, 44, 52, 71][idx];

  return (
    <section id="hardware" aria-label={en ? "Hardware and automation" : "Perangkat keras dan otomasi"} className="bg-[#0E1114] text-[#F0EAE0]">
      {/* introduction */}
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 pb-16 pt-24 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-32">
        <div className="lg:col-span-8">
          <span className={`${mono} text-copper`}>{en ? "Hardware & automation" : "Perangkat keras & otomasi"}</span>
          <h2 className="mt-6 text-[clamp(2.5rem,6vw,6.4rem)] font-medium normal-case leading-[0.94] tracking-[-0.05em]">
            {en ? (
              <>
                When software meets
                <br />
                the physical world.
              </>
            ) : (
              <>
                Saat perangkat lunak
                <br />
                bertemu dunia fisik.
              </>
            )}
          </h2>
        </div>
        <div className="lg:col-span-4 lg:self-end">
          <p className="max-w-sm text-[17px] leading-relaxed text-[#F0EAE0]/80">
            {en
              ? "We connect digital systems to devices, sensors, equipment and automated processes, so real-world readings reach the people who manage the operation."
              : "Kami menghubungkan sistem digital dengan perangkat, sensor, peralatan, dan proses otomatis, sehingga pembacaan dunia nyata sampai ke orang yang mengelola operasi."}
          </p>
          <a href="#hardware-scope" className={`${mono} mt-6 inline-block border-b border-[#F0EAE0]/40 pb-1 text-[#F0EAE0]/75 transition-colors hover:text-[#F0EAE0]`}>
            {en ? "What we do and don't do ↓" : "Yang kami kerjakan dan tidak ↓"}
          </a>
        </div>
      </div>

      {/* the pinned sequence: equipment, sensor, data capture, software, outcome */}
      <div ref={wrapRef} className="stage-wrap" style={{ height: "calc(100svh + 300svh)" }}>
        <div className="stage-sticky sticky top-0 h-[100svh] overflow-hidden">
          <EquipmentScene pRef={pRef} onLabel={onLabel} />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_45%,transparent,rgba(14,17,20,0.5))]" />
          <h3 className="absolute left-0 top-[88px] z-10 w-full max-w-[1400px] px-5 text-[clamp(1.8rem,4.2vw,4.2rem)] font-medium normal-case leading-[0.98] tracking-[-0.04em] sm:px-8 lg:left-1/2 lg:-translate-x-1/2">
            <span className="block max-w-[18ch]">{en ? "From physical operations to digital intelligence." : "Dari operasi fisik ke kecerdasan digital."}</span>
          </h3>

          <div ref={labelRef} className="pointer-events-none absolute z-10 -translate-y-1/2 items-center gap-3 motion-reduce:hidden" style={{ display: "none" }}>
            <span className="h-px w-10 bg-[#E98459]" />
            <span className="rounded-[3px] border border-[#E98459] bg-[#0E1114]/80 px-3 py-2 font-mono text-[10px] uppercase leading-snug tracking-[0.08em] text-[#F0EAE0]">
              {en ? "Sensor on the motor housing" : "Sensor pada rumah motor"}
              <br />
              <span className="text-[#F0EAE0]/60">{en ? "Measures vibration and temperature" : "Mengukur getaran dan suhu"}</span>
            </span>
          </div>

          <div
            className="absolute right-5 top-[30%] z-10 w-[min(88vw,500px)] rounded-[8px] border border-[#F0EAE0]/30 bg-[#12161B]/95 p-4 transition-[opacity,transform] duration-700 sm:right-8"
            style={{ opacity: idx >= 3 ? 1 : 0, transform: idx >= 3 ? "none" : "translateY(16px)", pointerEvents: "none" }}
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-[#F0EAE0]/70">
              <span>{en ? "Equipment monitor" : "Monitor peralatan"}</span>
              <span>{en ? "concept" : "konsep"}</span>
            </div>
            <svg viewBox="0 0 600 190" className="mt-3 w-full" role="img" aria-label="Temperature trend">
              {[0, 1, 2].map((i) => (
                <line key={i} x1="0" x2="600" y1={26 + i * 56} y2={26 + i * 56} stroke={INK} strokeOpacity="0.12" />
              ))}
              <line x1="0" x2="600" y1="58" y2="58" stroke={OR} strokeDasharray="5 5" />
              <text x="6" y="52" fill={OR} fontSize="10" style={mono2}>LIMIT</text>
              <polyline points="0,140 60,132 120,136 180,124 240,128 300,116 360,112 420,98 480,82 540,64 600,36" fill="none" stroke={INK} strokeWidth="2.4" />
            </svg>
            <div className="mt-3 rounded-[4px] border px-3 py-2 text-[13px] transition-colors duration-500" style={{ borderColor: idx === 4 ? OR : "rgba(240,234,224,0.25)", color: idx === 4 ? INK : "rgba(240,234,224,0.7)" }}>
              {idx === 4 ? (en ? "Alert: temperature over the limit set for this pump. Operator notified; action recorded." : "Peringatan: suhu melewati batas yang ditetapkan untuk pompa ini. Operator diberi tahu; tindakan dicatat.") : en ? "All readings within limits." : "Semua pembacaan dalam batas."}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0E1114] via-[#0E1114]/90 to-transparent px-5 pb-8 pt-16 sm:px-8">
            <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6">
              <div key={idx} className="int-fade max-w-md">
                <span className={`${mono} text-copper`}>
                  {String(idx + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
                </span>
                <h4 className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-tight tracking-[-0.02em]">{s.title[lang]}</h4>
                <p className="mt-2 text-[14px] leading-relaxed text-[#F0EAE0]/75">{s.body[lang]}</p>
                {idx === STAGES.length - 1 && (
                  <div className="pointer-events-auto mt-4 flex flex-wrap gap-3">
                    <Link href="/contact?topic=iot" className="rounded-full bg-[#F0EAE0] px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#090A0E] transition-colors hover:bg-solar">
                      {en ? "Discuss a hardware project" : "Bahas proyek perangkat keras"}
                    </Link>
                    <Link href="/solutions/iot-integration" className="inline-flex items-center gap-2 rounded-full border border-[#F0EAE0]/40 px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.06em] transition-colors hover:border-[#F0EAE0]">
                      {en ? "IoT in detail" : "IoT secara rinci"} <ArrowUpRight size={13} />
                    </Link>
                  </div>
                )}
              </div>
              <div className="hidden text-right sm:block">
                <div className={`${mono} text-[#F0EAE0]/55`}>{en ? "Example reading" : "Contoh pembacaan"}</div>
                <div className="font-display text-[clamp(2rem,4vw,3.6rem)] font-medium leading-none tracking-[-0.03em]" style={{ color: idx === 4 ? OR : INK }}>
                  {reading}
                  <span className="ml-1 text-[0.4em]">°C</span>
                </div>
              </div>
            </div>
            <p className={`${mono} mx-auto mt-4 max-w-[1400px] text-[#F0EAE0]/45`}>
              {en ? "Concept visual with example values. Not a photograph of a LUNAR installation, and not a delivered product" : "Visual konsep dengan nilai contoh. Bukan foto instalasi LUNAR, dan bukan produk yang telah diserahkan"}
            </p>
          </div>
        </div>
      </div>

      {/* capabilities and scope, after the story rather than in front of it */}
      <div id="hardware-scope" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pb-24 pt-20 sm:px-8 lg:pt-28">
        <div className="grid gap-x-10 lg:grid-cols-2">
          {AREAS.map((a, i) => (
            <div key={a.name.en} className="border-t border-[#F0EAE0]/60 py-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[clamp(1.4rem,2.2vw,2rem)] font-medium leading-tight tracking-[-0.02em]">
                  <span className="mr-3 font-mono text-[10px] tracking-[0.08em] text-copper">{String(i + 1).padStart(2, "0")}</span>
                  {a.name[lang]}
                </h3>
                <span title={statusMeta[a.status].hint[lang]} className="shrink-0 rounded-full border border-[#F0EAE0]/40 px-2 py-[2px] font-mono text-[9px] uppercase tracking-[0.08em] text-[#F0EAE0]/75">
                  {statusMeta[a.status].label[lang]}
                </span>
              </div>
              <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[#F0EAE0]/70">{a.body[lang]}</p>
              <ul className="mt-3 text-[13px] text-[#F0EAE0]/90">
                {a.items.map((x) => (
                  <li key={x.en} className="border-t border-[#F0EAE0]/12 py-2">{x[lang]}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-[#F0EAE0]/60 pt-6 md:grid-cols-3">
          {[
            { k: l("In real systems", "Dalam sistem nyata"), v: l("Document OCR running in a hauling system. Everything else on this page is engineering we take on, or a concept.", "OCR dokumen yang berjalan di sistem hauling. Hal lain di halaman ini adalah rekayasa yang kami kerjakan, atau konsep.") },
            { k: l("Engineering service", "Layanan rekayasa"), v: l("Sensors, gateways and integrations, scoped and built site by site. We do not sell our own robots or hardware.", "Sensor, gateway, dan integrasi, dirancang dan dibangun per lokasi. Kami tidak menjual robot atau perangkat keras sendiri.") },
            { k: l("Concept demonstration", "Demonstrasi konsep"), v: l("The pump sequence above, and any recognition use, until proven in a pilot. Face-based features also need consent, access controls and legal review.", "Urutan pompa di atas, dan penggunaan pengenalan apa pun, sampai terbukti dalam uji coba. Fitur berbasis wajah juga memerlukan persetujuan, kontrol akses, dan tinjauan hukum.") },
          ].map((x) => (
            <div key={x.k.en}>
              <p className={`${mono} text-copper`}>{x.k[lang]}</p>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-[#F0EAE0]/75">{x.v[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
