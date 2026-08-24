"use client";

import { useLanguage } from "@/lib/language-context";
import { support } from "@/lib/content";
import { Container, Section, Kicker } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function Support() {
  const { t } = useLanguage();
  return (
    <Section number="05">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker className="mx-auto w-fit">{t(support.kicker)}</Kicker>
          <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">{t(support.heading)}</h2>
          <p className="mt-4 leading-relaxed text-muted">{t(support.body)}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
