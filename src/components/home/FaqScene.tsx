"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { contact, scopingNote } from "@/lib/content";
import type { L } from "@/lib/solutionsHub";

/**
 * SCENE 08: frequently asked questions.
 * Answers only state what is true of LUNAR's work today. Anything not delivered is described as
 * scoped per project, and pricing follows the site's existing "no fixed prices" position.
 */

const QA: { q: L; a: L }[] = [
  {
    q: { en: "Can LUNAR build a custom system for my company?", id: "Apakah LUNAR dapat membangun sistem kustom untuk perusahaan saya?" },
    a: {
      en: "Yes. Custom business systems are the core of our work. We start from how your operation actually runs (your forms, approvals and reports) and engineer the system around it, with roles, permissions, records and dashboards.",
      id: "Ya. Sistem bisnis kustom adalah inti pekerjaan kami. Kami mulai dari cara operasi Anda benar-benar berjalan (formulir, persetujuan, dan laporan) lalu merekayasa sistem di sekitarnya, lengkap dengan peran, hak akses, catatan, dan dasbor.",
    },
  },
  {
    q: { en: "Do you offer fleet and rental management software?", id: "Apakah Anda menawarkan perangkat lunak manajemen armada dan rental?" },
    a: {
      en: "Fleet records (vehicles, documents, drivers, fuel and repairs) already exist in an operations platform we have built for transport work. Rental scheduling, contracts and billing are scoped to your business, and our equipment-rental workflow is a proposal rather than a finished product.",
      id: "Catatan armada (kendaraan, dokumen, pengemudi, BBM, dan perbaikan) sudah ada dalam platform operasional yang kami bangun untuk pekerjaan transportasi. Penjadwalan sewa, kontrak, dan penagihan disesuaikan dengan bisnis Anda, dan alur kerja rental alat kami masih berupa usulan, bukan produk jadi.",
    },
  },
  {
    q: { en: "Can you integrate with our existing systems?", id: "Dapatkah Anda berintegrasi dengan sistem kami yang sudah ada?" },
    a: {
      en: "Often, yes, where the other system can exchange data through an interface or an export. We assess this in the first conversation, because it depends on the specific tools involved.",
      id: "Sering kali bisa, selama sistem lain dapat bertukar data melalui antarmuka atau ekspor. Kami menilainya pada percakapan pertama, karena bergantung pada alat yang digunakan.",
    },
  },
  {
    q: { en: "How is project pricing determined?", id: "Bagaimana harga proyek ditentukan?" },
    a: { en: scopingNote.en, id: scopingNote.id },
  },
  {
    q: { en: "Do you provide training and maintenance?", id: "Apakah Anda menyediakan pelatihan dan pemeliharaan?" },
    a: {
      en: "Yes. Training and handover are part of the process, so your team can run the system, and the final step is ongoing support and improvement as your operation changes.",
      id: "Ya. Pelatihan dan serah terima adalah bagian dari proses, sehingga tim Anda dapat menjalankan sistem, dan langkah terakhir adalah dukungan dan pengembangan berkelanjutan seiring perubahan operasi Anda.",
    },
  },
  {
    q: { en: "Can the system support multiple business locations?", id: "Dapatkah sistem mendukung beberapa lokasi bisnis?" },
    a: {
      en: "Systems we have built handle several warehouses and several outlets under one record. How locations, users and permissions are arranged is decided with you during scoping.",
      id: "Sistem yang telah kami bangun menangani beberapa gudang dan beberapa outlet dalam satu catatan. Pengaturan lokasi, pengguna, dan hak akses ditentukan bersama Anda saat penentuan lingkup.",
    },
  },
  {
    q: { en: "How do we start a project?", id: "Bagaimana kami memulai proyek?" },
    a: {
      en: "Tell us how your business runs today through the enquiry form, WhatsApp or email. We take it from there and point to what earns its place first.",
      id: "Ceritakan bagaimana bisnis Anda berjalan saat ini melalui formulir, WhatsApp, atau email. Kami lanjutkan dari sana dan menunjuk apa yang layak dikerjakan lebih dulu.",
    },
  },
];

export default function FaqScene() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);
  const title = lang === "en" ? ["FREQUENTLY", "ASKED QUESTIONS."] : ["PERTANYAAN", "YANG SERING DIAJUKAN."];

  return (
    <section id="faq" aria-label={title.join(" ")} className="theme-light relative z-10 border-t border-line">
      <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.4fr_0.6fr] lg:gap-16 lg:py-36">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,5.2vw,5.4rem)] font-medium uppercase leading-[0.94] tracking-[-0.04em] text-foreground lg:sticky lg:top-28">
            {title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
        </div>

        <ol className="border-t border-line">
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q.en} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="group flex w-full items-baseline gap-5 py-6 text-left"
                  >
                    <span className="w-6 font-mono text-[10px] tracking-[0.1em] text-technical">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-[clamp(1rem,1.5vw,1.3rem)] font-medium text-foreground">{item.q[lang]}</span>
                    <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full transition-all duration-500 ${isOpen ? "scale-150 bg-accent" : "bg-technical group-hover:bg-foreground"}`} />
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-7 pl-11 text-[15px] leading-relaxed text-muted">{item.a[lang]}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <aside className="lg:pt-6">
          <p className="max-w-[16rem] text-[15px] leading-relaxed text-foreground">{lang === "en" ? "Still have questions? We're glad to talk it through." : "Masih ada pertanyaan? Kami senang membahasnya."}</p>
          <a href={contact.mailto} className="mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.08em] text-foreground underline decoration-line underline-offset-4 transition-colors hover:text-accent">
            {lang === "en" ? "Email us" : "Kirim email"}
          </a>
          <Link href="/contact" className="mt-3 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-foreground">
            {lang === "en" ? "Or send an enquiry" : "Atau kirim pertanyaan"}
          </Link>
        </aside>
      </div>
    </section>
  );
}
