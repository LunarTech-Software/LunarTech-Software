"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

/** Branded 404: says what happened, and offers the routes people actually want. */
export default function NotFound() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const links = [
    { href: "/solutions", label: en ? "Solutions" : "Solusi" },
    { href: "/products", label: en ? "Products" : "Produk" },
    { href: "/our-work", label: en ? "Selected work" : "Karya pilihan" },
    { href: "/insights", label: "Insights" },
    { href: "/contact", label: en ? "Start a project" : "Mulai proyek" },
  ];
  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-[100svh] flex-1 flex-col justify-between bg-[#090A0E] px-5 pb-12 pt-8 text-[#F0EAE0] outline-none sm:px-8">
      <Link href="/" className="font-display text-[22px] tracking-[-0.02em]">LUNAR</Link>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#C18D6B]">404</p>
        <h1 className="mt-5 max-w-[12ch] text-[clamp(3rem,10vw,9.6rem)] font-medium normal-case leading-[0.9] tracking-[-0.05em]">{en ? "This page is out of orbit." : "Halaman ini keluar dari orbit."}</h1>
        <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#F0EAE0]/75">{en ? "The address may be mistyped, or the page may have moved. These are the places most people are looking for." : "Alamatnya mungkin salah ketik, atau halaman sudah dipindah. Berikut tempat yang paling sering dicari."}</p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex items-center gap-2 rounded-full border border-[#F0EAE0]/40 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors hover:border-[#F0EAE0] hover:bg-[#F0EAE0] hover:text-[#090A0E]">
                {l.label} <ArrowUpRight size={13} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
