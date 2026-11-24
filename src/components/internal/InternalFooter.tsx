"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { contact, footerCopyright, footerScopingNote } from "@/lib/content";
import { hubSolutions } from "@/lib/solutionsHub";
import { internalNav } from "./nav";
import DotWordmark from "./DotWordmark";

export default function InternalFooter() {
  const { lang, setLang, t } = useLanguage();
  const mono = "font-mono text-[10px] uppercase tracking-[0.1em] text-technical";
  return (
    <footer data-nav-light="true" className="theme-light relative border-t border-line">
      <div className="mx-auto w-full max-w-[1400px] px-5 pb-8 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr_1.3fr_1fr]">
          <div>
            <span className={mono}>{lang === "en" ? "Contact" : "Kontak"}</span>
            <a href={contact.mailto} className="mt-4 block text-lg text-foreground underline decoration-line underline-offset-4 transition-colors hover:text-accent">
              {contact.email}
            </a>
            <a
              href={contact.whatsapp("Hello LUNAR, I would like to enquire about your digital engineering and automation solutions.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
            <p className="mt-3 text-sm text-technical">{contact.location}</p>
          </div>

          <div>
            <span className={mono}>{lang === "en" ? "Company" : "Perusahaan"}</span>
            <ul className="mt-4 space-y-2.5 text-[15px] text-foreground">
              {internalNav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-accent">
                    {t(n.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className={mono}>{lang === "en" ? "Solutions" : "Solusi"}</span>
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 text-[15px] text-foreground sm:grid-cols-2">
              {hubSolutions.map((s) => (
                <li key={s.slug}>
                  <Link href={`/solutions/${s.slug}`} className="transition-colors hover:text-accent">
                    {t(s.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className={mono}>{lang === "en" ? "Language" : "Bahasa"}</span>
            <div className="mt-4 flex gap-2 font-mono text-[11px] uppercase tracking-[0.08em]">
              {(["en", "id"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full border px-4 py-2 transition-colors ${lang === l ? "border-foreground bg-foreground text-void" : "border-line text-muted hover:border-foreground hover:text-foreground"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.08em] text-technical sm:flex-row">
          <span>{t(footerCopyright)}</span>
          <span className="sm:text-right">{t(footerScopingNote)}</span>
        </div>

        <DotWordmark className="mt-10 h-auto w-full" />
      </div>
    </footer>
  );
}
