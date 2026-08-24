"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { solutions } from "@/lib/content";
import { Container, Section, Kicker } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function Solutions() {
  const { t, lang } = useLanguage();
  return (
    <Section number="04" id="solutions">
      <Container>
        <Reveal className="mb-12 max-w-2xl">
          <Kicker>{lang === "en" ? "Solutions" : "Solusi"}</Kicker>
          <h2 className="text-[1.75rem] font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-[2.25rem] lg:text-[2.85rem]">
            {lang === "en" ? "Seven ways we bring clarity to your operation." : "Tujuh cara kami membawa kejelasan ke operasi Anda."}
          </h2>
        </Reveal>

        <div className="border-t border-line">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.03}>
              <Link
                href={`/contact?intent=${s.slug}`}
                className="group grid items-center gap-3 border-b border-line py-9 transition-colors hover:border-accent/40 sm:grid-cols-[3rem_1fr_auto] sm:gap-7"
              >
                <span className="font-mono text-xs text-technical">S/{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <span className="text-lg font-medium text-foreground sm:text-xl">{t(s.name)}</span>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">{t(s.description)}</p>
                  <span className="mt-2 block text-xs uppercase tracking-[0.08em] text-accent">{t(s.promise)}</span>
                </div>
                <ArrowUpRight
                  size={20}
                  className="hidden shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent sm:block"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
