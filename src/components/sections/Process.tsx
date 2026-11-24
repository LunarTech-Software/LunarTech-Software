"use client";

import { useLanguage } from "@/lib/language-context";
import { processSteps } from "@/lib/content";
import { Container, Section, Kicker } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function Process() {
  const { t, lang } = useLanguage();
  return (
    <Section number="07" id="process">
      <Container>
        <Reveal className="mb-12 max-w-2xl">
          <Kicker>{lang === "en" ? "How engagement works" : "Bagaimana kami bekerja"}</Kicker>
          <h2 className="lunar-h2">
            {lang === "en" ? "We understand your operation before we build anything." : "Kami memahami operasi Anda sebelum membangun apa pun."}
          </h2>
        </Reveal>

        <ol className="mx-auto grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {processSteps.map((step, i) => (
            <Reveal key={step.title.en} delay={i * 0.04}>
              <li className="flex gap-5 border-t border-line pt-5">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-medium text-foreground">{t(step.title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(step.body)}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
