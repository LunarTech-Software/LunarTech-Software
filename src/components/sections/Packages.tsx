"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { solutions, scopingNote } from "@/lib/content";
import { Container, Section, Kicker } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function Packages() {
  const { t, lang } = useLanguage();
  return (
    <Section number="06">
      <Container>
        <Reveal className="mb-4 max-w-2xl">
          <Kicker>{lang === "en" ? "Packages" : "Paket"}</Kicker>
          <h2 className="text-[1.75rem] font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-[2.25rem] lg:text-[2.85rem]">
            {lang === "en" ? "Scoped to your operation, not a price list." : "Disesuaikan operasi Anda, bukan daftar harga."}
          </h2>
          <p className="mt-4 text-muted">{t(scopingNote)}</p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.03}>
              <Link
                href={`/contact?intent=${s.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-line p-6 transition-colors hover:border-accent/50"
              >
                <div>
                  <span className="font-mono text-xs text-technical">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-medium text-foreground">{t(s.name)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t(s.promise)}</p>
                </div>
                <span className="mt-6 text-xs uppercase tracking-[0.08em] text-accent transition-colors group-hover:text-foreground">
                  {lang === "en" ? "Start a conversation →" : "Mulai percakapan →"}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
