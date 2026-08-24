"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { faq } from "@/lib/content";
import { Container, Section, Kicker } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function FAQ() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section number="08">
      <Container>
        <Reveal className="mb-10 max-w-2xl">
          <Kicker>{lang === "en" ? "Questions, answered" : "Pertanyaan, terjawab"}</Kicker>
          <h2 className="text-[1.75rem] font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-[2.25rem] lg:text-[2.85rem]">
            {lang === "en" ? "Frequently asked." : "Yang sering ditanyakan."}
          </h2>
        </Reveal>

        <div className="mx-auto max-w-3xl border-t border-line">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q.en} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-foreground sm:text-lg">{t(item.q)}</span>
                  <Plus size={18} className={`shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                </button>
                <div
                  className="grid overflow-hidden transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="pb-6 leading-relaxed text-muted">{t(item.a)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
