"use client";

import { Info, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { projects, ourWorkPage } from "@/lib/content";
import { Container, Kicker } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import LivePreviewFrame from "@/components/ui/LivePreviewFrame";
import InDevelopmentPanel from "@/components/ui/InDevelopmentPanel";
import Button from "@/components/ui/Button";

const labelStyle: Record<string, string> = {
  Demo: "border-line text-muted",
  "In Progress": "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

const labelText: Record<"en" | "id", Record<string, string>> = {
  en: { Demo: "Demo", "In Progress": "In Progress" },
  id: { Demo: "Demo", "In Progress": "Dalam Proses" },
};

export default function OurWorkPage() {
  const { t, lang } = useLanguage();

  return (
    <div className="pt-32">
      <Container>
        <Reveal className="max-w-2xl">
          <Kicker>{t(ourWorkPage.kicker)}</Kicker>
          <h1 className="text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl">{t(ourWorkPage.heading)}</h1>
          <p className="mt-4 text-lg text-muted">{t(ourWorkPage.subhead)}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-line bg-panel/40 p-4 md:p-5">
            <Info size={18} className="mt-0.5 shrink-0 text-accent" />
            <p className="text-sm leading-relaxed text-muted">{t(ourWorkPage.honesty)}</p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-20 pb-24 md:mt-20">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i * 0.03, 0.2)}>
              <article className="grid gap-8 border-t border-line pt-10 lg:grid-cols-2 lg:items-center lg:gap-14">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  {p.liveUrl ? <LivePreviewFrame url={p.liveUrl} /> : <InDevelopmentPanel />}
                  <div className="rounded-b-2xl border border-t-0 border-line px-5 py-3">
                    {p.liveUrl ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-foreground"
                      >
                        {lang === "en" ? "Visit site" : "Kunjungi situs"} <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="text-sm text-technical">{lang === "en" ? "Not yet live" : "Belum live"}</span>
                    )}
                  </div>
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="font-mono text-xs text-technical">{String(i + 1).padStart(2, "0")}</span>
                  <div className="mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.08em] text-technical">
                    <span>{t(p.category)}</span>
                    <span className={`rounded-full border px-2.5 py-0.5 ${labelStyle[p.label]}`}>{labelText[lang][p.label]}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-medium text-foreground sm:text-3xl">{t(p.title)}</h2>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">{t(p.description)}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="lunar-section border-t border-line">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">{t(ourWorkPage.ctaHeading)}</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">{t(ourWorkPage.ctaBody)}</p>
            <div className="mt-8 flex justify-center">
              <Button href="/contact" variant="primary">
                {lang === "en" ? "Book a Consultation" : "Jadwalkan Konsultasi"}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
