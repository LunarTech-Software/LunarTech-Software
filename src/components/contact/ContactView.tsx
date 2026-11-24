"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check, Copy, Mail, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { contact, scopingNote } from "@/lib/content";

/**
 * Start a project. A three-step enquiry that builds a clear message for the team.
 * Honest about delivery: this site has no form backend, so "send" opens the visitor's own email app or WhatsApp
 * with the enquiry written out. Nothing is marked as sent until the visitor sends it from there, and the full text
 * can be copied if no email app opens.
 */

type L = { en: string; id: string };
const l = (en: string, id: string): L => ({ en, id });
const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";

const TOPICS: { key: string; label: L; hint: L }[] = [
  { key: "web", label: l("Website & digital presence", "Website & kehadiran digital"), hint: l("Company site, web application", "Situs perusahaan, aplikasi web") },
  { key: "erp", label: l("ERP & business management", "ERP & manajemen bisnis"), hint: l("Connected operations, finance, inventory", "Operasi terhubung, keuangan, persediaan") },
  { key: "fleet", label: l("Fleet & hauling systems", "Sistem armada & hauling"), hint: l("Vehicles, trips, fuel, tonnage", "Kendaraan, trip, BBM, tonase") },
  { key: "equip", label: l("Heavy equipment & rental systems", "Sistem alat berat & rental"), hint: l("Availability, hours, maintenance", "Ketersediaan, jam, perawatan") },
  { key: "hidang", label: l("Hidang POS / F&B systems", "Hidang POS / sistem F&B"), hint: l("Restaurant and café operations", "Operasi restoran dan kafe") },
  { key: "ai", label: l("AI, OCR & automation", "AI, OCR & otomasi"), hint: l("Documents, recognition, workflows", "Dokumen, pengenalan, alur kerja") },
  { key: "iot", label: l("IoT & hardware integration", "IoT & integrasi perangkat keras"), hint: l("Sensors, devices, monitoring", "Sensor, perangkat, pemantauan") },
  { key: "other", label: l("Something else", "Hal lain"), hint: l("Tell us what you have in mind", "Ceritakan apa yang Anda pikirkan") },
];

// links from other pages: ?intent=<solution slug> or ?topic=<key>
const FROM_SLUG: Record<string, string> = {
  "websites-platforms": "web",
  erp: "erp",
  "custom-business-systems": "erp",
  "fleet-management": "fleet",
  "hauling-management": "fleet",
  "heavy-equipment-rental": "equip",
  "fnb-hospitality": "hidang",
  "ai-automation": "ai",
  "iot-integration": "iot",
  "insurance-policy-management": "other",
};

const TIMELINES: L[] = [l("As soon as possible", "Secepatnya"), l("Within 3 months", "Dalam 3 bulan"), l("Within 6 months", "Dalam 6 bulan"), l("Just exploring", "Baru menjajaki")];
const BUDGETS: L[] = [l("Not sure yet", "Belum yakin"), l("Small, a focused first phase", "Kecil, fase pertama yang terfokus"), l("Medium", "Menengah"), l("Larger, an integrated system", "Lebih besar, sistem terpadu")];

type Form = { company: string; name: string; email: string; whatsapp: string; message: string; existing: string; timeline: string; budget: string };
const EMPTY: Form = { company: "", name: "", email: "", whatsapp: "", message: "", existing: "", timeline: "", budget: "" };

function Flow() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const sp = useSearchParams();
  const [step, setStep] = useState(1);
  const [topics, setTopics] = useState<string[]>(() => {
    const t = sp.get("topic") ?? FROM_SLUG[sp.get("intent") ?? ""];
    return t && TOPICS.some((x) => x.key === t) ? [t] : [];
  });
  const [f, setF] = useState<Form>(EMPTY);
  const [more, setMore] = useState(false);
  const [errs, setErrs] = useState<Partial<Record<keyof Form | "topics", L>>>({});
  const [done, setDone] = useState<"email" | "whatsapp" | null>(null);
  const [copied, setCopied] = useState(false);
  const head = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    head.current?.focus({ preventScroll: true });
  }, [step]);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF((s) => ({ ...s, [k]: e.target.value }));
  const toggle = (k: string) => setTopics((t) => (t.includes(k) ? t.filter((x) => x !== k) : [...t, k]));
  const topicNames = topics.map((k) => TOPICS.find((x) => x.key === k)!.label.en);

  const text = useMemo(
    () =>
      [
        `Project enquiry`,
        `Interested in: ${topicNames.join(", ") || "-"}`,
        `Business: ${f.company || "-"}`,
        `Contact: ${f.name}`,
        `Email: ${f.email}`,
        f.whatsapp ? `WhatsApp: ${f.whatsapp}` : "",
        f.existing ? `Existing system: ${f.existing}` : "",
        f.timeline ? `Timeline: ${f.timeline}` : "",
        f.budget ? `Budget range: ${f.budget}` : "",
        ``,
        f.message,
      ]
        .filter((x, i, a) => x !== "" || a[i - 1] !== "")
        .join("\n"),
    [f, topicNames],
  );

  const validate1 = () => {
    if (topics.length === 0) {
      setErrs({ topics: l("Choose at least one, or pick \"Something else\".", "Pilih setidaknya satu, atau pilih \"Hal lain\".") });
      return false;
    }
    setErrs({});
    return true;
  };
  const validate2 = () => {
    const e: typeof errs = {};
    if (!f.name.trim()) e.name = l("Please enter your name.", "Mohon isi nama Anda.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = l("Please enter a valid email address.", "Mohon isi alamat email yang valid.");
    if (f.message.trim().length < 10) e.message = l("Please tell us a little about what you need (at least a sentence).", "Mohon ceritakan sedikit tentang kebutuhan Anda (setidaknya satu kalimat).");
    if (f.whatsapp && !/^[+\d][\d\s-]{6,}$/.test(f.whatsapp.trim())) e.whatsapp = l("That number looks incomplete.", "Nomor itu tampak belum lengkap.");
    setErrs(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      requestAnimationFrame(() => document.getElementById(`f-${first}`)?.focus());
    }
    return Object.keys(e).length === 0;
  };

  const sendEmail = () => {
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`LUNAR enquiry: ${topicNames.join(", ") || "General"}`)}&body=${encodeURIComponent(text)}`;
    setDone("email");
  };
  const sendWhatsapp = () => {
    window.open(contact.whatsapp(text), "_blank", "noopener,noreferrer");
    setDone("whatsapp");
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* the text is also shown on screen to select by hand */
    }
  };

  const field = "w-full border-0 border-b border-[#17191E]/35 bg-transparent px-0 py-3 text-[17px] outline-none transition-colors placeholder:text-[#17191E]/40 focus:border-[#17191E] aria-[invalid=true]:border-[#c4562a]";
  const label = `${mono} block text-[#17191E]/65`;
  const err = (k: keyof Form | "topics") =>
    errs[k] ? (
      <p id={`e-${k}`} className="mt-1.5 text-[13px] text-[#a93d14]">
        {errs[k]![lang]}
      </p>
    ) : null;

  const steps = [l("What", "Apa"), l("Details", "Detail"), l("Send", "Kirim")];

  return (
    <div>
      <ol className="mb-10 flex gap-6" aria-label={en ? "Progress" : "Kemajuan"}>
        {steps.map((s, i) => (
          <li key={s.en} aria-current={step === i + 1 ? "step" : undefined} className={`${mono} border-t-2 pt-2 transition-colors ${step === i + 1 ? "border-[#E98459] text-[#17191E]" : step > i + 1 ? "border-[#17191E] text-[#17191E]/70" : "border-[#17191E]/20 text-[#17191E]/40"}`} style={{ minWidth: 72 }}>
            {String(i + 1).padStart(2, "0")} {s[lang]}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <fieldset>
          <legend className="sr-only">{en ? "What are you looking for?" : "Apa yang Anda cari?"}</legend>
          <h2 ref={head} tabIndex={-1} className="font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-medium normal-case leading-[1.02] tracking-[-0.035em] outline-none">
            {en ? "What are you looking for?" : "Apa yang Anda cari?"}
          </h2>
          <p className="mt-2 text-[15px] text-[#17191E]/65">{en ? "Choose all that apply." : "Pilih semua yang sesuai."}</p>
          <ul className="mt-6" aria-describedby={errs.topics ? "e-topics" : undefined}>
            {TOPICS.map((t, i) => {
              const on = topics.includes(t.key);
              return (
                <li key={t.key} className="border-t border-[#17191E]/25">
                  <label className="group flex cursor-pointer items-center gap-4 py-3.5">
                    <input type="checkbox" checked={on} onChange={() => toggle(t.key)} className="peer sr-only" />
                    <span aria-hidden className="font-mono text-[10px] text-[#9a6a4a]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">
                      <span className={`block font-display text-[clamp(1.15rem,1.9vw,1.6rem)] font-medium leading-tight tracking-[-0.02em] transition-[padding,color] duration-300 ${on ? "pl-2 text-[#17191E]" : "text-[#17191E]/75 group-hover:pl-2 group-hover:text-[#17191E]"}`}>{t.label[lang]}</span>
                      <span className="block pl-0 text-[13px] text-[#17191E]/55 group-hover:pl-2 transition-[padding] duration-300">{t.hint[lang]}</span>
                    </span>
                    <span aria-hidden className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#E98459] ${on ? "border-[#E98459] bg-[#E98459] text-[#17191E]" : "border-[#17191E]/40"}`}>
                      {on && <Check size={13} />}
                    </span>
                  </label>
                </li>
              );
            })}
            <li className="border-t border-[#17191E]/25" />
          </ul>
          {err("topics")}
          <button type="button" onClick={() => validate1() && setStep(2)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17191E] px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#F0EAE0] transition-colors hover:bg-[#E98459] hover:text-[#17191E]">
            {en ? "Continue" : "Lanjut"} <ArrowUpRight size={14} />
          </button>
        </fieldset>
      )}

      {step === 2 && (
        <form noValidate onSubmit={(e) => { e.preventDefault(); if (validate2()) setStep(3); }}>
          <h2 ref={head} tabIndex={-1} className="font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-medium normal-case leading-[1.02] tracking-[-0.035em] outline-none">
            {en ? "Tell us about your project." : "Ceritakan proyek Anda."}
          </h2>
          {Object.keys(errs).length > 0 && (
            <p role="alert" className="mt-4 rounded-[3px] border border-[#c4562a] bg-[#c4562a]/10 px-4 py-3 text-[14px] text-[#8c3a17]">
              {en ? "A few details need your attention below." : "Beberapa isian perlu diperhatikan di bawah."}
            </p>
          )}
          <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="f-company" className={label}>{en ? "Business name" : "Nama bisnis"}</label>
              <input id="f-company" value={f.company} onChange={set("company")} autoComplete="organization" className={field} />
            </div>
            <div>
              <label htmlFor="f-name" className={label}>{en ? "Your name" : "Nama Anda"} *</label>
              <input id="f-name" value={f.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errs.name} aria-describedby={errs.name ? "e-name" : undefined} className={field} />
              {err("name")}
            </div>
            <div>
              <label htmlFor="f-email" className={label}>Email *</label>
              <input id="f-email" type="email" value={f.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errs.email} aria-describedby={errs.email ? "e-email" : undefined} className={field} />
              {err("email")}
            </div>
            <div>
              <label htmlFor="f-whatsapp" className={label}>WhatsApp ({en ? "optional" : "opsional"})</label>
              <input id="f-whatsapp" type="tel" value={f.whatsapp} onChange={set("whatsapp")} autoComplete="tel" aria-invalid={!!errs.whatsapp} aria-describedby={errs.whatsapp ? "e-whatsapp" : undefined} className={field} />
              {err("whatsapp")}
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="f-message" className={label}>{en ? "What do you need?" : "Apa yang Anda butuhkan?"} *</label>
            <textarea id="f-message" rows={4} value={f.message} onChange={set("message")} aria-invalid={!!errs.message} aria-describedby={errs.message ? "e-message" : undefined} placeholder={en ? "You don't need a full specification. Describe the problem you're facing." : "Tidak perlu spesifikasi lengkap. Jelaskan masalah yang Anda hadapi."} className={`${field} resize-y`} />
            {err("message")}
          </div>

          <button type="button" aria-expanded={more} onClick={() => setMore((m) => !m)} className={`${mono} mt-6 inline-flex items-center gap-2 text-[#17191E]/70 underline-offset-4 hover:underline`}>
            {more ? "− " : "+ "} {en ? "Add optional details" : "Tambah detail opsional"}
          </button>
          {more && (
            <div className="int-fade mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="f-existing" className={label}>{en ? "Existing system, if any" : "Sistem yang sudah ada, jika ada"}</label>
                <input id="f-existing" value={f.existing} onChange={set("existing")} className={field} />
              </div>
              <div>
                <label htmlFor="f-timeline" className={label}>{en ? "Expected timeline" : "Perkiraan waktu"}</label>
                <select id="f-timeline" value={f.timeline} onChange={set("timeline")} className={field}>
                  <option value="">{en ? "Skip" : "Lewati"}</option>
                  {TIMELINES.map((x) => <option key={x.en} value={x.en}>{x[lang]}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="f-budget" className={label}>{en ? "Budget range" : "Kisaran anggaran"}</label>
                <select id="f-budget" value={f.budget} onChange={set("budget")} className={field}>
                  <option value="">{en ? "Skip" : "Lewati"}</option>
                  {BUDGETS.map((x) => <option key={x.en} value={x.en}>{x[lang]}</option>)}
                </select>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => setStep(1)} className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#17191E]/65 underline-offset-4 hover:underline">{en ? "Back" : "Kembali"}</button>
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-[#17191E] px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#F0EAE0] transition-colors hover:bg-[#E98459] hover:text-[#17191E]">
              {en ? "Review enquiry" : "Tinjau permintaan"} <ArrowUpRight size={14} />
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div>
          <h2 ref={head} tabIndex={-1} className="font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-medium normal-case leading-[1.02] tracking-[-0.035em] outline-none">
            {en ? "Check and send." : "Periksa dan kirim."}
          </h2>
          <pre className="mt-6 whitespace-pre-wrap rounded-[4px] border border-[#17191E]/25 bg-white/60 p-5 font-mono text-[13px] leading-relaxed text-[#17191E]/85">{text}</pre>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button type="button" onClick={sendEmail} className="inline-flex items-center gap-2 rounded-full bg-[#17191E] px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#F0EAE0] transition-colors hover:bg-[#E98459] hover:text-[#17191E]">
              <Mail size={14} /> {en ? "Send project enquiry" : "Kirim permintaan proyek"}
            </button>
            <button type="button" onClick={sendWhatsapp} className="inline-flex items-center gap-2 rounded-full border border-[#17191E]/40 px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] transition-colors hover:border-[#17191E]">
              <MessageCircle size={14} /> {en ? "Contact via WhatsApp" : "Hubungi via WhatsApp"}
            </button>
            <button type="button" onClick={copy} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#17191E]/70 underline-offset-4 hover:underline">
              <Copy size={13} /> {copied ? (en ? "Copied" : "Tersalin") : en ? "Copy text" : "Salin teks"}
            </button>
          </div>
          <button type="button" onClick={() => setStep(2)} className="mt-5 font-mono text-[11px] uppercase tracking-[0.06em] text-[#17191E]/65 underline-offset-4 hover:underline">{en ? "Back and edit" : "Kembali dan ubah"}</button>
          {done && (
            <div role="status" className="mt-6 rounded-[4px] border border-[#17191E]/30 p-4 text-[14px] leading-relaxed text-[#17191E]/80">
              {done === "email"
                ? en
                  ? `Your email app should have opened with this enquiry ready. It is not sent until you press send there. If nothing opened, copy the text and email it to ${contact.email}.`
                  : `Aplikasi email Anda seharusnya terbuka dengan permintaan ini. Pesan belum terkirim sampai Anda menekan kirim di sana. Jika tidak terbuka, salin teks dan kirim ke ${contact.email}.`
                : en
                  ? "WhatsApp opened in a new tab with this message ready. It is not sent until you send it there."
                  : "WhatsApp terbuka di tab baru dengan pesan ini. Pesan belum terkirim sampai Anda mengirimnya di sana."}
            </div>
          )}
          <p className="mt-6 text-[12px] leading-relaxed text-[#17191E]/55">{en ? scopingNote.en : scopingNote.id}</p>
        </div>
      )}
    </div>
  );
}

export default function ContactView() {
  const { lang } = useLanguage();
  const en = lang === "en";
  return (
    <div className="grid min-h-[100svh] lg:grid-cols-12">
      <aside className="bg-[#090A0E] px-5 pb-12 pt-36 text-[#F0EAE0] sm:px-8 lg:col-span-5 lg:px-12 lg:pt-44">
        <div className="lg:sticky lg:top-40">
          <span className={`${mono} text-[#C18D6B]`}>{en ? "Start a project" : "Mulai proyek"}</span>
          <h1 className="mt-5 max-w-[9ch] text-[clamp(3.2rem,8vw,7.6rem)] font-medium normal-case leading-[0.9] tracking-[-0.05em]">{en ? "Let's build what's next." : "Mari bangun yang berikutnya."}</h1>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-[#F0EAE0]/75">
            {en
              ? "Tell us what you're trying to achieve. Whether it's a custom business system, software product, website, automation project, or hardware integration, let's explore what makes sense for your operation."
              : "Ceritakan apa yang ingin Anda capai. Baik sistem bisnis kustom, produk perangkat lunak, website, proyek otomasi, maupun integrasi perangkat keras, mari kita telusuri apa yang masuk akal untuk operasi Anda."}
          </p>

          <div className="mt-10 border-t border-[#F0EAE0]/30 pt-6">
            <p className="font-display text-[clamp(1.3rem,2vw,1.8rem)] font-medium leading-tight tracking-[-0.02em]">{en ? "Not sure where to start?" : "Belum yakin harus mulai dari mana?"}</p>
            <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-[#F0EAE0]/70">
              {en ? "You don't need a complete technical specification. Tell us the problem you're facing, and we'll help explore the possibilities." : "Anda tidak perlu spesifikasi teknis yang lengkap. Ceritakan masalah yang Anda hadapi, dan kami akan membantu menelusuri kemungkinannya."}
            </p>
            <ul className="mt-5 space-y-3 text-[14px]">
              <li>
                <a href={contact.whatsapp("Hello LUNAR, I would like to discuss a project.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 underline-offset-4 hover:underline">
                  <MessageCircle size={15} className="text-[#E98459]" /> {en ? "Talk on WhatsApp" : "Berbincang di WhatsApp"}
                </a>
              </li>
              <li>
                <a href={contact.mailto} className="inline-flex items-center gap-3 underline-offset-4 hover:underline">
                  <Mail size={15} className="text-[#E98459]" /> {contact.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-[#F0EAE0]/75">
                <MapPin size={15} className="text-[#E98459]" /> {contact.location}
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <section className="theme-light bg-[#F0EAE0] px-5 pb-20 pt-12 text-[#17191E] sm:px-8 lg:col-span-7 lg:px-14 lg:pt-44">
        <div className="max-w-2xl">
          <Suspense fallback={null}>
            <Flow />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
