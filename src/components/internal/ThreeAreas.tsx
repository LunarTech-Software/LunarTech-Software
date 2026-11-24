"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { L } from "@/lib/solutionsHub";

/**
 * Solutions overview: the three ways LUNAR works, before the detailed explorer.
 * Software and digital systems, configurable products, hardware and automation.
 * Each links to where the detail lives; nothing here claims more than those pages do.
 */

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";
const l = (en: string, id: string): L => ({ en, id });

const AREAS: { key: string; name: L; line: L; body: L; items: L[]; cta: L; href: string }[] = [
  {
    key: "software",
    name: l("Software & digital systems", "Perangkat lunak & sistem digital"),
    line: l("Built for your business, not the other way around.", "Dibangun untuk bisnis Anda, bukan sebaliknya."),
    body: l("We develop software around your processes, from single business tools to integrated management platforms. These are capabilities you commission, adapted to your operation.", "Kami mengembangkan perangkat lunak di sekitar proses Anda, dari alat bisnis tunggal hingga platform manajemen terpadu. Ini kemampuan yang Anda pesan, disesuaikan dengan operasi Anda."),
    items: [l("Custom business applications and ERP", "Aplikasi bisnis khusus dan ERP"), l("Fleet, hauling and equipment rental systems", "Sistem armada, hauling, dan rental alat"), l("Websites, web applications and dashboards", "Situs web, aplikasi web, dan dasbor"), l("AI-assisted workflows, OCR and integrations", "Alur kerja berbantuan AI, OCR, dan integrasi")],
    cta: l("Explore the solutions", "Jelajahi solusi"),
    href: "#selector",
  },
  {
    key: "products",
    name: l("Products & modular platforms", "Produk & platform modular"),
    line: l("Ready to start. Built to adapt.", "Siap dimulai. Dibangun untuk menyesuaikan."),
    body: l("Software we have already built, offered as a foundation you can configure and extend. Hidang, our F&B point of sale, is the product available today.", "Perangkat lunak yang sudah kami bangun, ditawarkan sebagai fondasi yang dapat dikonfigurasi dan diperluas. Hidang, POS F&B kami, adalah produk yang tersedia saat ini."),
    items: [l("Hidang: POS, kitchen display, inventory, back office", "Hidang: POS, layar dapur, persediaan, back office"), l("Module list with honest status", "Daftar modul dengan status yang jujur"), l("Configuration planner for your first conversation", "Perencana konfigurasi untuk pembicaraan pertama")],
    cta: l("See products", "Lihat produk"),
    href: "/products",
  },
  {
    key: "hardware",
    name: l("Hardware & intelligent automation", "Perangkat keras & otomasi cerdas"),
    line: l("When software meets the physical world.", "Saat perangkat lunak bertemu dunia fisik."),
    body: l("Sensors, devices and equipment connected to the software that manages them. This is engineering we scope site by site; we do not sell our own hardware.", "Sensor, perangkat, dan peralatan yang terhubung ke perangkat lunak yang mengelolanya. Ini rekayasa yang kami rancang per lokasi; kami tidak menjual perangkat keras sendiri."),
    items: [l("IoT and connected monitoring", "IoT dan pemantauan terhubung"), l("Embedded and device integration", "Embedded dan integrasi perangkat"), l("Machine vision and document processing", "Machine vision dan pemrosesan dokumen"), l("Industrial automation integration", "Integrasi otomasi industri")],
    cta: l("See the sensor-to-screen story", "Lihat kisah sensor ke layar"),
    href: "#hardware",
  },
];

export default function ThreeAreas() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const [k, setK] = useState(AREAS[0].key);
  const a = AREAS.find((x) => x.key === k)!;
  return (
    <section aria-label={en ? "Three areas of work" : "Tiga area pekerjaan"} className="theme-light bg-[#F0EAE0] text-[#17191E]">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <span className={`${mono} text-technical`}>{en ? "Three ways we work" : "Tiga cara kami bekerja"}</span>
        <h2 className="mt-5 max-w-[18ch] text-[clamp(2.4rem,6.6vw,6.6rem)] font-medium normal-case leading-[0.94] tracking-[-0.045em]">{en ? "Software. Hardware. Engineered together." : "Perangkat lunak. Perangkat keras. Direkayasa bersama."}</h2>
        <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-[#17191E]/70">
          {en ? "Each can stand alone or be combined into one integrated solution." : "Masing-masing dapat berdiri sendiri atau digabung menjadi satu solusi terpadu."}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div role="tablist" aria-label={en ? "Areas" : "Area"} className="lg:col-span-5">
            {AREAS.map((x, i) => (
              <button
                key={x.key}
                role="tab"
                aria-selected={x.key === k}
                onClick={() => setK(x.key)}
                className={`flex w-full items-baseline gap-4 border-t border-[#17191E]/80 py-5 text-left transition-colors ${x.key === k ? "text-[#17191E]" : "text-[#17191E]/45 hover:text-[#17191E]"}`}
              >
                <span className="font-mono text-[10px] tracking-[0.08em] text-[#9a6a4a]">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[clamp(1.5rem,2.6vw,2.5rem)] font-medium leading-tight tracking-[-0.03em]">{x.name[lang]}</span>
              </button>
            ))}
            <div className="border-t border-[#17191E]/80" />
          </div>
          <div role="tabpanel" key={a.key} className="int-fade lg:col-span-7">
            <p className="font-display text-[clamp(1.6rem,3vw,2.8rem)] font-medium leading-[1.04] tracking-[-0.03em]">{a.line[lang]}</p>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#17191E]/70">{a.body[lang]}</p>
            <ul className="mt-6 max-w-lg">
              {a.items.map((x) => (
                <li key={x.en} className="border-t border-[#17191E]/15 py-2.5 text-[14px]">
                  {x[lang]}
                </li>
              ))}
            </ul>
            <Link href={a.href} className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#17191E] px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#F0EAE0] transition-colors hover:bg-[#E98459]">
              {a.cta[lang]}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
