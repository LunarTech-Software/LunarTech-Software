"use client";

import { useLanguage } from "@/lib/language-context";

/**
 * Explanatory figures and covers for the Insights articles. All values are made up for illustration and the
 * figures say so. They are built in HTML so they stay sharp, translate, and read well on a phone.
 */

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";

function Caption({ children }: { children: React.ReactNode }) {
  return <figcaption className={`${mono} mt-3 text-[#17191E]/55`}>{children}</figcaption>;
}

function ErpFigure() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const slip = (who: string, line: string, bad?: boolean) => (
    <div className={`rounded-[4px] border bg-white p-3 ${bad ? "border-[#E98459]" : "border-[#17191E]/20"}`}>
      <div className={`${mono} text-[#17191E]/50`}>{who}</div>
      <div className="mt-1 font-mono text-[13px]">{line}</div>
    </div>
  );
  return (
    <figure className="my-12">
      <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div>
          <p className={`${mono} mb-3 text-[#17191E]/70`}>{en ? "Three copies of one order" : "Tiga salinan satu pesanan"}</p>
          <div className="space-y-2">
            {slip(en ? "Sales sheet" : "Lembar penjualan", "Order 0412 · 120 pcs")}
            {slip(en ? "Warehouse sheet" : "Lembar gudang", "PO-412 · 118 pcs shipped", true)}
            {slip(en ? "Finance sheet" : "Lembar keuangan", "Inv 0412 · 120 pcs billed")}
          </div>
          <p className="mt-2 font-mono text-[11px] text-[#c4562a]">{en ? "118 ≠ 120, and nobody is told" : "118 ≠ 120, dan tidak ada yang diberi tahu"}</p>
        </div>
        <div aria-hidden className="hidden font-display text-[2.4rem] text-[#17191E]/50 md:block">→</div>
        <div>
          <p className={`${mono} mb-3 text-[#17191E]/70`}>{en ? "One record" : "Satu catatan"}</p>
          <div className="rounded-[4px] border-2 border-[#17191E] bg-white p-4">
            <div className="font-mono text-[13px] font-medium">Order 0412</div>
            <dl className="mt-3 grid grid-cols-[1fr_auto] gap-y-1.5 font-mono text-[13px]">
              <dt className="text-[#17191E]/60">{en ? "Ordered" : "Dipesan"}</dt>
              <dd>120</dd>
              <dt className="text-[#17191E]/60">{en ? "Shipped" : "Dikirim"}</dt>
              <dd>118</dd>
              <dt className="text-[#17191E]/60">{en ? "Invoiced" : "Ditagih"}</dt>
              <dd>120</dd>
            </dl>
            <div className="mt-3 rounded-[3px] bg-[#E98459]/15 px-2 py-1.5 text-[12px] text-[#8c3a17]">{en ? "2 pcs short: flagged for follow-up" : "Kurang 2 pcs: ditandai untuk ditindaklanjuti"}</div>
          </div>
        </div>
      </div>
      <Caption>{en ? "Illustration with made-up figures" : "Ilustrasi dengan angka rekaan"}</Caption>
    </figure>
  );
}

function OcrFigure() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const steps = [
    { n: "01", t: en ? "Paper" : "Kertas", d: en ? "A printed invoice or ticket" : "Faktur atau tiket cetak" },
    { n: "02", t: en ? "Capture" : "Tangkap", d: en ? "A photo or scan" : "Foto atau pindai" },
    { n: "03", t: en ? "Extract" : "Ekstrak", d: en ? "Text read from the image" : "Teks dibaca dari gambar" },
    { n: "04", t: en ? "Validate" : "Validasi", d: en ? "A person checks what is unsure" : "Manusia memeriksa yang meragukan" },
    { n: "05", t: en ? "Structured data" : "Data terstruktur", d: en ? "Fields your system can use" : "Kolom yang dapat dipakai sistem" },
  ];
  const fields: [string, string, boolean][] = [
    [en ? "Reference" : "Referensi", "INV-2026-0000", true],
    [en ? "Date" : "Tanggal", "22-09-2026", true],
    [en ? "Supplier" : "Pemasok", "Example Supplies", true],
    [en ? "Total" : "Total", "1.250.000", false],
  ];
  return (
    <figure className="my-12">
      <ol className="grid gap-px overflow-hidden rounded-[4px] border border-[#17191E]/20 bg-[#17191E]/20 sm:grid-cols-5">
        {steps.map((s) => (
          <li key={s.n} className="bg-[#F0EAE0] p-3">
            <div className="font-mono text-[10px] text-[#9a6a4a]">{s.n}</div>
            <div className="mt-1 font-display text-[15px] font-medium leading-tight">{s.t}</div>
            <div className="mt-1 text-[12px] leading-snug text-[#17191E]/65">{s.d}</div>
          </li>
        ))}
      </ol>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[4px] border border-[#17191E]/20 bg-white p-4">
          <div className={`${mono} text-[#17191E]/50`}>{en ? "What the extraction returns" : "Yang dikembalikan ekstraksi"}</div>
          <ul className="mt-3 space-y-2">
            {fields.map(([k, v, ok]) => (
              <li key={k} className="flex items-center justify-between gap-3 border-b border-[#17191E]/10 pb-2 font-mono text-[13px]">
                <span className="text-[#17191E]/60">{k}</span>
                <span className="flex items-center gap-2">
                  {v}
                  <span className={`rounded-full border px-2 py-[1px] text-[9px] uppercase tracking-[0.08em] ${ok ? "border-[#2f6b4f] text-[#2f6b4f]" : "border-[#E98459] text-[#c4562a]"}`}>{ok ? (en ? "looks right" : "tampak benar") : en ? "needs review" : "perlu ditinjau"}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[4px] border border-[#17191E]/20 p-4 text-[14px] leading-relaxed text-[#17191E]/75">
          {en
            ? "A system that shows which fields it is unsure about lets a person fix those and trust the rest. Silent guesses are the real risk."
            : "Sistem yang menunjukkan kolom mana yang meragukan memungkinkan manusia memperbaikinya dan mempercayai sisanya. Tebakan senyap adalah risiko sebenarnya."}
        </div>
      </div>
      <Caption>{en ? "Illustrative workflow with made-up values" : "Alur ilustratif dengan nilai rekaan"}</Caption>
    </figure>
  );
}

function Wire({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <div className={`rounded-[2px] bg-[#17191E]/12 ${className}`}>{children}</div>;
}

function WebFigure() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const path = en ? ["Home: what you do", "Services: how it helps", "Proof: real work", "Enquiry: one clear step"] : ["Beranda: apa yang Anda kerjakan", "Layanan: bagaimana membantu", "Bukti: karya nyata", "Permintaan: satu langkah jelas"];
  return (
    <figure className="my-12">
      <div className="grid items-end gap-6 sm:grid-cols-[2fr_1fr]">
        <div className="rounded-[6px] border border-[#17191E]/25 bg-white p-3">
          <div className="mb-3 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-[#17191E]/20" />
            ))}
          </div>
          <Wire className="h-3 w-1/4" />
          <Wire className="mt-4 h-6 w-3/4 !bg-[#17191E]/80" />
          <Wire className="mt-2 h-3 w-1/2" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Wire className="h-14" />
            <Wire className="h-14" />
            <Wire className="h-14" />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Wire className="h-7 w-28 !bg-[#E98459]" />
            <Wire className="h-3 w-24" />
          </div>
        </div>
        <div className="mx-auto w-[46%] rounded-[14px] border border-[#17191E]/25 bg-white p-2 sm:w-full">
          <Wire className="h-2 w-1/3" />
          <Wire className="mt-3 h-4 w-5/6 !bg-[#17191E]/80" />
          <Wire className="mt-2 h-2 w-2/3" />
          <Wire className="mt-3 h-10" />
          <Wire className="mt-2 h-10" />
          <Wire className="mt-3 h-6 !bg-[#E98459]" />
        </div>
      </div>
      <ol className="mt-5 grid gap-2 sm:grid-cols-4">
        {path.map((x, i) => (
          <li key={x} className="border-t border-[#17191E]/50 pt-2 text-[13px]">
            <span className="mr-2 font-mono text-[10px] text-[#9a6a4a]">{String(i + 1).padStart(2, "0")}</span>
            {x}
          </li>
        ))}
      </ol>
      <Caption>{en ? "Wireframe illustration: the same page order works on desktop and phone" : "Ilustrasi wireframe: urutan halaman yang sama berlaku di desktop dan ponsel"}</Caption>
    </figure>
  );
}

export function ArticleFigure({ fig }: { fig: "erp" | "ocr" | "web" }) {
  return fig === "erp" ? <ErpFigure /> : fig === "ocr" ? <OcrFigure /> : <WebFigure />;
}

/** Cover compositions: large, typographic, one idea each. */
export function Cover({ kind, className = "" }: { kind: "erp" | "ocr" | "web"; className?: string }) {
  const base = "relative overflow-hidden";
  if (kind === "erp")
    return (
      <div className={`${base} bg-[#17191E] text-[#F0EAE0] ${className}`} aria-hidden>
        <div className="absolute inset-0 p-[7%]">
          <div className="absolute left-[8%] top-[14%] w-[34%] -rotate-3 rounded-[3px] border border-[#F0EAE0]/30 p-3 font-mono text-[clamp(8px,1.1vw,13px)]">Order 0412 · 120</div>
          <div className="absolute left-[16%] top-[40%] w-[34%] rotate-2 rounded-[3px] border border-[#E98459] p-3 font-mono text-[clamp(8px,1.1vw,13px)]">PO-412 · 118</div>
          <div className="absolute left-[6%] top-[66%] w-[34%] -rotate-1 rounded-[3px] border border-[#F0EAE0]/30 p-3 font-mono text-[clamp(8px,1.1vw,13px)]">Inv 0412 · 120</div>
          <div className="absolute right-[7%] top-[24%] w-[36%] rounded-[3px] bg-[#F0EAE0] p-[4%] text-[#17191E]">
            <div className="font-display text-[clamp(1.2rem,3vw,3rem)] font-medium leading-none tracking-[-0.03em]">One record.</div>
            <div className="mt-2 font-mono text-[clamp(8px,1vw,12px)] text-[#17191E]/60">Order 0412</div>
          </div>
        </div>
      </div>
    );
  if (kind === "ocr")
    return (
      <div className={`${base} bg-[#E98459] text-[#17191E] ${className}`} aria-hidden>
        <div className="absolute inset-0 grid grid-cols-2 gap-[4%] p-[7%]">
          <div className="rotate-[-4deg] self-center rounded-[2px] bg-[#F0EAE0] p-[8%] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]">
            <div className="font-mono text-[clamp(7px,0.9vw,11px)] uppercase tracking-[0.1em]">Invoice</div>
            <div className="mt-2 space-y-1.5">
              {[90, 70, 85, 55, 75].map((w, i) => (
                <div key={i} className="h-[5px] rounded-full bg-[#17191E]/25" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
          <div className="self-center rounded-[2px] bg-[#17191E] p-[8%] text-[#F0EAE0]">
            {["Reference", "Date", "Supplier", "Total"].map((k, i) => (
              <div key={k} className="flex items-center justify-between border-b border-[#F0EAE0]/15 py-[3%] font-mono text-[clamp(7px,0.9vw,11px)]">
                <span className="text-[#F0EAE0]/60">{k}</span>
                <span className={i === 3 ? "text-[#E98459]" : ""}>{i === 3 ? "review" : "ok"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  return (
    <div className={`${base} bg-[#F0EAE0] text-[#17191E] ${className}`} aria-hidden>
      <div className="absolute inset-0 p-[7%]">
        <div className="absolute left-[7%] top-[14%] w-[62%] rounded-[4px] border border-[#17191E]/40 bg-white p-[3%] shadow-[0_24px_40px_-24px_rgba(23,25,30,0.5)]">
          <div className="h-[6px] w-1/4 rounded-full bg-[#17191E]/20" />
          <div className="mt-[6%] font-display text-[clamp(1rem,2.6vw,2.6rem)] font-medium leading-none tracking-[-0.03em]">Found. Trusted. Contacted.</div>
          <div className="mt-[6%] h-[18px] w-[30%] rounded-full bg-[#E98459]" />
        </div>
        <div className="absolute bottom-[10%] right-[9%] w-[22%] rounded-[12px] border border-[#17191E]/40 bg-white p-[2%] shadow-[0_24px_40px_-24px_rgba(23,25,30,0.5)]">
          <div className="h-[5px] w-1/2 rounded-full bg-[#17191E]/20" />
          <div className="mt-[10%] h-[34px] rounded-[2px] bg-[#17191E]/10" />
          <div className="mt-[8%] h-[12px] rounded-full bg-[#E98459]" />
        </div>
      </div>
    </div>
  );
}
