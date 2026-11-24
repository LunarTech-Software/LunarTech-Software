"use client";

import { useLanguage } from "@/lib/language-context";
import { position } from "@/lib/content";
import { Container, Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function Position() {
  const { t } = useLanguage();
  const words = t(position.heading).split(" ");
  const last = words.pop();
  return (
    <Section number="01" id="position" theme="light" border={false}>
      <Container>
        <span className="lunar-kicker mb-8 block">{t(position.kicker)}</span>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="lunar-statement">
              <span className="dim">{words.join(" ")} </span>
              <span>{last}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted">
              {t(position.body)}
              <span className="mt-5 block font-display text-xl font-medium uppercase leading-tight tracking-tight text-foreground">
                {t(position.highlight)}
              </span>
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
