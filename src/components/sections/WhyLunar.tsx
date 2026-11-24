"use client";

import { useLanguage } from "@/lib/language-context";
import { differentiators } from "@/lib/content";
import { Container, Section, Kicker } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function WhyLunar() {
  const { t, lang } = useLanguage();
  return (
    <Section number="03" theme="light">
      <Container>
        <Reveal className="mb-12 max-w-2xl">
          <Kicker>{lang === "en" ? "Why companies work with us" : "Mengapa perusahaan memilih kami"}</Kicker>
          <h2 className="lunar-h2">
            {lang === "en" ? (
              <>
                Understand first. <em className="font-serif italic text-accent-2">Then</em> engineer.
              </>
            ) : (
              "Memahami dahulu. Baru merekayasa."
            )}
          </h2>
        </Reveal>

        <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {differentiators.map((d, i) => (
            <Reveal key={d.title.en} delay={i * 0.05} className="border-b border-r border-line p-6">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-medium text-foreground">{t(d.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(d.body)}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
