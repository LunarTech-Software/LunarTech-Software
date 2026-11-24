"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

/**
 * SCENE: products and hardware, between the industries and the selected work.
 * Hidang is shown with a real screen; hardware is a plain statement linking to the sequence on Solutions.
 */

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";

export default function ProductsScene() {
  const { lang } = useLanguage();
  const en = lang === "en";
  return (
    <section id="products" aria-label={en ? "Products and hardware" : "Produk dan perangkat keras"} className="relative z-10 bg-[#090A0E] text-[#F0EAE0]">
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <span className={`${mono} text-copper`}>{en ? "Products" : "Produk"}</span>
        <h2 className="mt-5 max-w-[16ch] text-[clamp(2.4rem,7vw,7rem)] font-medium normal-case leading-[0.94] tracking-[-0.045em]">{en ? "Ready to start. Built to adapt." : "Siap dimulai. Dibangun untuk menyesuaikan."}</h2>

        <Link href="/products/hidang" className="group mt-12 grid overflow-hidden rounded-[6px] bg-[#140E09] lg:grid-cols-12">
          <div className="p-7 sm:p-10 lg:col-span-5 lg:p-12">
            <span className={`${mono} text-[#C18D6B]`}>{en ? "Our own product" : "Produk kami sendiri"}</span>
            <h3 className="mt-4 font-[family-name:var(--font-instrument-serif)] text-[clamp(3rem,6vw,5.6rem)] font-normal normal-case leading-[0.95] text-[#F6EEE2]">Hidang</h3>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#F6EEE2]/80">
              {en ? "F&B point of sale and restaurant management: orders, tables, kitchen display, inventory, staff and reports, configured to each business." : "POS F&B dan manajemen restoran: pesanan, meja, layar dapur, persediaan, staf, dan laporan, disesuaikan dengan setiap bisnis."}
            </p>
            <span className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#E98459]">
              {en ? "Explore Hidang" : "Jelajahi Hidang"} <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
          <div className="relative min-h-[240px] bg-[radial-gradient(120%_90%_at_70%_80%,#6b4126_0%,#3a2315_45%,#140E09_80%)] lg:col-span-7">
            <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/work/hidang-tables.webp" alt="Hidang" width={1800} height={1125} className="w-full max-w-[640px] rounded-[10px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-[1.02]" loading="lazy" />
            </div>
            <p className={`${mono} absolute bottom-3 left-6 text-[#F6EEE2]/55`}>{en ? "Real screen, built-in demo data" : "Layar asli, data demo bawaan"}</p>
          </div>
        </Link>

        <div className="mt-16 grid gap-8 border-t border-[#F0EAE0]/60 pt-6 lg:grid-cols-12">
          <span className={`${mono} text-[#F0EAE0]/70 lg:col-span-3`}>{en ? "Hardware & intelligent systems" : "Perangkat keras & sistem cerdas"}</span>
          <div className="lg:col-span-7">
            <p className="font-display text-[clamp(1.8rem,3.6vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.035em]">{en ? "When software meets the physical world." : "Saat perangkat lunak bertemu dunia fisik."}</p>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#F0EAE0]/70">
              {en ? "Sensors, devices and equipment connected to the software that manages them, scoped site by site." : "Sensor, perangkat, dan peralatan yang terhubung ke perangkat lunak yang mengelolanya, dirancang per lokasi."}
            </p>
            <Link href="/solutions#hardware" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F0EAE0] px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#090A0E] transition-colors hover:bg-solar">
              {en ? "From the machine to the screen" : "Dari mesin ke layar"} <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
