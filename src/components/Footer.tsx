"use client";

import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { navLinks, solutions, contact, tagline, footerCopyright, footerScopingNote } from "@/lib/content";
import { Container } from "@/components/ui/Section";

export default function Footer() {
  const { t, lang } = useLanguage();
  return (
    <footer className="border-t border-line bg-panel/40">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-sm font-medium tracking-tight text-foreground">
              LUNAR
            </Link>
            <p className="mt-5 max-w-xs leading-relaxed text-muted">{tagline}</p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-muted">
              <a
                href={contact.whatsapp("Hello LUNAR, I would like to enquire about your digital engineering and automation solutions.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a href={contact.mailto} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                <Mail size={15} /> {contact.email}
              </a>
              <span className="text-technical">{contact.location}</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.14em] text-technical">{lang === "en" ? "Navigate" : "Navigasi"}</h4>
            <ul className="space-y-3 text-sm text-muted">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.14em] text-technical">{lang === "en" ? "Solutions" : "Solusi"}</h4>
            <ul className="space-y-3 text-sm text-muted">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link href={`/contact?intent=${s.slug}`} className="transition-colors hover:text-foreground">
                    {t(s.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-line pt-8 text-xs text-technical sm:flex-row">
          <span>{t(footerCopyright)}</span>
          <span>{t(footerScopingNote)}</span>
        </div>
      </Container>
    </footer>
  );
}
