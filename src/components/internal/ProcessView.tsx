"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useStage } from "@/components/home/useStage";

/**
 * Process: six stages told through one pinned "project file". The window stays put and gains a tab for each
 * stage; its contents wipe from one artifact to the next, so the work visibly evolves from questions to a
 * running system. Artifacts for the first three stages are labelled examples. Stages four to six show real
 * screens (Hidang, our own product, and a client platform captured from a test environment) and a real
 * test list from Hidang. Reduced motion collapses the pinned sequence into a normal stacked page.
 */

type L = { en: string; id: string };
const l = (en: string, id: string): L => ({ en, id });
const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";

const STAGES: { key: string; name: L; what: L; out: L; face: string }[] = [
  { key: "discover", name: l("Discover", "Temukan"), what: l("Understand the business, its goals, current processes, and challenges.", "Memahami bisnis, tujuannya, proses saat ini, dan tantangannya."), out: l("Initial scope and documented requirements.", "Cakupan awal dan kebutuhan yang terdokumentasi."), face: "font-[family-name:var(--font-instrument-serif)] italic font-normal tracking-[-0.01em]" },
  { key: "define", name: l("Define", "Tentukan"), what: l("Translate business problems into clear functional and technical requirements.", "Menerjemahkan masalah bisnis menjadi kebutuhan fungsional dan teknis yang jelas."), out: l("Agreed scope, feature requirements, and implementation plan.", "Cakupan yang disepakati, kebutuhan fitur, dan rencana implementasi."), face: "font-mono font-medium uppercase tracking-[-0.04em]" },
  { key: "design", name: l("Design", "Rancang"), what: l("Develop the system architecture, user experience, interfaces, and integration requirements.", "Mengembangkan arsitektur sistem, pengalaman pengguna, antarmuka, dan kebutuhan integrasi."), out: l("Approved design and technical specifications.", "Rancangan yang disetujui dan spesifikasi teknis."), face: "font-display font-bold tracking-[-0.05em]" },
  { key: "develop", name: l("Develop", "Kembangkan"), what: l("Build the software, database, integrations, and relevant hardware connections.", "Membangun perangkat lunak, basis data, integrasi, dan sambungan perangkat keras yang relevan."), out: l("A working implementation ready for validation.", "Implementasi yang berfungsi dan siap divalidasi."), face: "font-display font-medium tracking-[-0.03em]" },
  { key: "validate", name: l("Validate", "Validasi"), what: l("Test the system against its requirements, refine workflows, and address identified problems.", "Menguji sistem terhadap kebutuhannya, menyempurnakan alur kerja, dan menangani masalah yang ditemukan."), out: l("Validated system and agreed acceptance results.", "Sistem tervalidasi dan hasil penerimaan yang disepakati."), face: "font-[family-name:var(--font-instrument-serif)] font-normal tracking-[-0.01em]" },
  { key: "deploy", name: l("Deploy & evolve", "Terapkan & kembangkan"), what: l("Deploy the solution, train relevant users, and provide agreed support.", "Menerapkan solusi, melatih pengguna terkait, dan memberikan dukungan yang disepakati."), out: l("Deployed system, training and handover, and agreed ongoing support.", "Sistem terpasang, pelatihan dan serah terima, serta dukungan berkelanjutan yang disepakati."), face: "font-display font-light tracking-[-0.045em]" },
];

function Artifact({ i }: { i: number }) {
  const { lang } = useLanguage();
  const en = lang === "en";
  const note = (txt: string) => <p className={`${mono} absolute bottom-3 left-4 right-4 text-[#17191E]/55`}>{txt}</p>;
  const box = "absolute inset-0 overflow-hidden bg-[#F8F4EC] p-5 sm:p-7";
  if (i === 0)
    return (
      <div className={box}>
        <p className={`${mono} text-[#9a6a4a]`}>{en ? "Discovery notes" : "Catatan penemuan"}</p>
        <ul className="mt-4 space-y-3 font-mono text-[clamp(11px,1.15vw,14px)] leading-snug text-[#17191E]/85">
          {(en ? ["How does an order move through the business today?", "Where is the same thing typed more than once?", "What do you check by hand every day?", "What would you stop doing if you could?", "Who needs to see what, and when?"] : ["Bagaimana pesanan bergerak di bisnis saat ini?", "Di mana hal yang sama diketik lebih dari sekali?", "Apa yang Anda periksa manual setiap hari?", "Apa yang ingin Anda hentikan jika bisa?", "Siapa yang perlu melihat apa, dan kapan?"]).map((q, n) => (
            <li key={q} className="grid grid-cols-[1.5rem_1fr] gap-2 border-b border-dashed border-[#17191E]/20 pb-2">
              <span className="text-[#c4562a]">{n + 1}.</span>
              {q}
            </li>
          ))}
        </ul>
        {note(en ? "Example questions, not a client document" : "Contoh pertanyaan, bukan dokumen klien")}
      </div>
    );
  if (i === 1)
    return (
      <div className={box}>
        <p className={`${mono} text-[#9a6a4a]`}>{en ? "Process map" : "Peta proses"}</p>
        <ol className="mt-6 grid grid-cols-4 gap-2">
          {(en ? ["Order in", "Prepare", "Deliver", "Invoice"] : ["Pesanan masuk", "Siapkan", "Kirim", "Tagih"]).map((s, n) => (
            <li key={s} className="relative">
              <div className="rounded-[3px] border border-[#17191E]/40 bg-white p-2.5 font-mono text-[clamp(9px,1vw,13px)]">{s}</div>
              {(n === 1 || n === 3) && <span className="absolute -bottom-6 left-0 font-mono text-[clamp(8px,0.9vw,11px)] text-[#c4562a]">{en ? "retyped here" : "diketik ulang"}</span>}
            </li>
          ))}
        </ol>
        <div className="mt-14 space-y-2 font-mono text-[clamp(10px,1.05vw,13px)] text-[#17191E]/80">
          {(en ? ["REQ-01  One order record, entered once", "REQ-02  Stock updates when an order ships", "REQ-03  Invoice drawn from the same record"] : ["REQ-01  Satu catatan pesanan, dimasukkan sekali", "REQ-02  Stok berubah saat pesanan dikirim", "REQ-03  Faktur diambil dari catatan yang sama"]).map((r) => (
            <div key={r} className="border-l-2 border-[#E98459] pl-3">{r}</div>
          ))}
        </div>
        {note(en ? "Illustrative map and requirements" : "Peta dan kebutuhan ilustratif")}
      </div>
    );
  if (i === 2)
    return (
      <div className={box}>
        <p className={`${mono} text-[#9a6a4a]`}>{en ? "System design" : "Rancangan sistem"}</p>
        <div className="mt-4 grid grid-cols-[1.4fr_1fr] gap-4">
          <div className="rounded-[4px] border border-[#17191E]/30 bg-white p-3">
            <div className="h-2 w-1/4 rounded-full bg-[#17191E]/20" />
            <div className="mt-3 grid grid-cols-[1fr_2fr] gap-2">
              <div className="space-y-2">{[0, 1, 2, 3].map((k) => <div key={k} className="h-3 rounded-[2px] bg-[#17191E]/12" />)}</div>
              <div className="space-y-2">
                <div className="h-5 w-2/3 rounded-[2px] bg-[#17191E]/75" />
                <div className="h-14 rounded-[2px] bg-[#17191E]/10" />
                <div className="h-5 w-1/3 rounded-[2px] bg-[#E98459]" />
              </div>
            </div>
          </div>
          <div className="space-y-2 font-mono text-[clamp(9px,1vw,12px)]">
            {[[en ? "Screens" : "Layar", "Orders · Stock · Invoices"], [en ? "Data" : "Data", "Order, Item, Customer"], [en ? "Integrations" : "Integrasi", "Email · Excel export"]].map(([a, b]) => (
              <div key={a} className="border-t border-[#17191E]/30 pt-1.5"><div className="text-[#9a6a4a]">{a}</div>{b}</div>
            ))}
          </div>
        </div>
        {note(en ? "Illustrative wireframe and architecture" : "Wireframe dan arsitektur ilustratif")}
      </div>
    );
  if (i === 3)
    return (
      <div className="absolute inset-0 bg-[#0C0E13]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/work/hidang-pos.webp" alt={en ? "Hidang POS, built and running" : "Hidang POS, sudah dibangun dan berjalan"} width={1800} height={1125} loading="lazy" className="h-full w-full object-cover object-top" />
        <p className={`${mono} absolute bottom-3 left-4 rounded bg-[#0C0E13]/80 px-2 py-1 text-[#F0EAE0]/80`}>{en ? "Real screen: Hidang POS, our own product" : "Layar asli: Hidang POS, produk kami sendiri"}</p>
      </div>
    );
  if (i === 4)
    return (
      <div className={box}>
        <p className={`${mono} text-[#9a6a4a]`}>{en ? "Validation checklist" : "Daftar validasi"}</p>
        <ul className="mt-4 space-y-2.5 text-[clamp(13px,1.3vw,16px)]">
          {(en ? ["An order reaches the kitchen", "A payment is recorded once", "Stock comes off by recipe", "A refund can restock", "Split, merge and void behave", "Inventory counts reconcile"] : ["Pesanan sampai ke dapur", "Pembayaran tercatat sekali", "Stok berkurang menurut resep", "Refund dapat mengembalikan stok", "Pisah, gabung, dan batal berfungsi", "Hitungan persediaan cocok"]).map((t) => (
            <li key={t} className="flex items-center gap-3 border-b border-[#17191E]/12 pb-2">
              <span aria-hidden className="flex h-5 w-5 items-center justify-center rounded-full border border-[#2f6b4f] text-[11px] text-[#2f6b4f]">✓</span>
              {t}
            </li>
          ))}
        </ul>
        {note(en ? "From Hidang's own automated test list" : "Dari daftar uji otomatis Hidang sendiri")}
      </div>
    );
  return (
    <div className="absolute inset-0 bg-[#0C0E13]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/work/vpl-today.webp" alt={en ? "A client platform in use" : "Platform klien yang digunakan"} width={2000} height={1099} loading="lazy" className="h-full w-full object-cover object-top" />
      <p className={`${mono} absolute bottom-3 left-4 rounded bg-[#0C0E13]/80 px-2 py-1 text-[#F0EAE0]/80`}>{en ? "Real screen: a client platform, test environment" : "Layar asli: platform klien, lingkungan uji"}</p>
    </div>
  );
}

export default function ProcessView() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const wrapRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const n = STAGES.length;
  const onProgress = useCallback((p: number) => setIdx(Math.min(n - 1, Math.floor(p * n))), [n]);
  useStage(wrapRef, onProgress);
  const s = STAGES[idx];

  const jump = (i: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / n) * travel, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <>
      <section className="bg-[#090A0E] pb-16 pt-40 text-[#F0EAE0] lg:pb-24 lg:pt-52">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <span className={`${mono} text-[#C18D6B]`}>{en ? "Process" : "Proses"}</span>
          <h1 className="mt-5 max-w-[12ch] text-[clamp(3.2rem,9.4vw,9.4rem)] font-medium normal-case leading-[0.9] tracking-[-0.05em]">{en ? "Great systems don't happen by accident." : "Sistem hebat tidak terjadi secara kebetulan."}</h1>
          <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-[#F0EAE0]/75">
            {en
              ? "Every project begins with understanding the business. From identifying operational challenges to engineering and implementing the right solution, we build technology around the way you work."
              : "Setiap proyek dimulai dengan memahami bisnis. Dari mengenali tantangan operasional hingga merekayasa dan menerapkan solusi yang tepat, kami membangun teknologi di sekitar cara Anda bekerja."}
          </p>
        </div>
      </section>

      <section aria-label={en ? "The six stages" : "Enam tahap"} className="theme-light bg-[#F0EAE0] text-[#17191E]">
        <div ref={wrapRef} className="stage-wrap" style={{ height: `calc(100svh + ${n * 70}svh)` }}>
          <div className="stage-sticky sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-5 pb-6 pt-24 sm:px-8">
            <div className="mx-auto grid w-full max-w-[1400px] items-center gap-6 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-4">
                  <ol className="flex gap-1.5" aria-label={en ? "Stages" : "Tahap"}>
                    {STAGES.map((st, i) => (
                      <li key={st.key}>
                        <button type="button" onClick={() => jump(i)} aria-label={st.name[lang]} aria-current={i === idx ? "step" : undefined} className={`h-[3px] rounded-full transition-all duration-500 ${i === idx ? "w-10 bg-[#E98459]" : i < idx ? "w-6 bg-[#17191E]" : "w-6 bg-[#17191E]/20"}`} />
                      </li>
                    ))}
                  </ol>
                  <span className={`${mono} text-[#17191E]/60`}>
                    {String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                  </span>
                </div>
                <div key={idx} className="int-fade">
                  <h2 className={`mt-5 text-[clamp(2.6rem,6.4vw,6.4rem)] normal-case leading-[0.95] ${s.face}`}>{s.name[lang]}</h2>
                  <p className="mt-4 max-w-md text-[clamp(15px,1.3vw,18px)] leading-relaxed text-[#17191E]/80">{s.what[lang]}</p>
                  <div className="mt-5 max-w-md border-t border-[#17191E]/80 pt-3">
                    <p className={`${mono} text-[#9a6a4a]`}>{en ? "Deliverable" : "Hasil"}</p>
                    <p className="mt-1 text-[15px]">{s.out[lang]}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="overflow-hidden rounded-[8px] border border-[#17191E]/30 bg-[#17191E] shadow-[0_40px_90px_-40px_rgba(23,25,30,0.6)]">
                  <div className="flex items-center gap-1 overflow-x-auto border-b border-[#F0EAE0]/15 px-3 py-2">
                    {STAGES.map((st, i) => (
                      <span key={st.key} className={`shrink-0 rounded px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] transition-colors duration-500 ${i === idx ? "bg-[#F0EAE0] text-[#17191E]" : i < idx ? "text-[#F0EAE0]/80" : "text-[#F0EAE0]/25"}`}>
                        {String(i + 1).padStart(2, "0")} {st.name[lang].split(" ")[0]}
                      </span>
                    ))}
                  </div>
                  <div className="relative aspect-[16/10] w-full">
                    {STAGES.map((st, i) => (
                      <div key={st.key} aria-hidden={i !== idx} className="absolute inset-0 transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]" style={{ zIndex: i, clipPath: i <= idx ? "inset(0 0 0 0)" : "inset(0 0 0 100%)" }}>
                        <Artifact i={i} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#090A0E] text-[#F0EAE0]">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-32">
          <h2 className="max-w-[10ch] text-[clamp(3rem,8vw,8rem)] font-medium normal-case leading-[0.9] tracking-[-0.05em] lg:col-span-7">{en ? "From an idea to something real." : "Dari gagasan menjadi nyata."}</h2>
          <div className="lg:col-span-5 lg:self-end">
            <p className="max-w-md text-[16px] leading-relaxed text-[#F0EAE0]/75">
              {en
                ? "Whether you're building your first business system or improving an existing operation, we help turn requirements into technology your team can actually use."
                : "Baik Anda membangun sistem bisnis pertama maupun memperbaiki operasi yang ada, kami membantu mengubah kebutuhan menjadi teknologi yang benar-benar dapat dipakai tim Anda."}
            </p>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F0EAE0] px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#090A0E] transition-colors hover:bg-[#E98459]">
              {en ? "Start your project" : "Mulai proyek Anda"} <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
