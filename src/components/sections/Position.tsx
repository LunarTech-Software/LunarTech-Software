"use client";

import { useLanguage } from "@/lib/language-context";
import { position } from "@/lib/content";
import { Container, Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function Position() {
  const { t } = useLanguage();
  return (
    <Section number="01" id="position">
      <Container>
        <span className="lunar-kicker mb-6 block">{t(position.kicker)}</span>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-[1.75rem] font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-[2.25rem] lg:text-[2.85rem]">
              {t(position.heading)}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted">
              {t(position.body)}
              <span className="mt-4 block text-foreground">{t(position.highlight)}</span>
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
