"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { projects } from "@/lib/content";
import { Container, Section, Kicker } from "@/components/ui/Section";
import LivePreviewFrame from "@/components/ui/LivePreviewFrame";
import InDevelopmentPanel from "@/components/ui/InDevelopmentPanel";

const labelStyle: Record<string, string> = {
  Demo: "border-line text-muted",
  "In Progress": "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

const labelText: Record<"en" | "id", Record<string, string>> = {
  en: { Demo: "Demo", "In Progress": "In Progress" },
  id: { Demo: "Demo", "In Progress": "Dalam Proses" },
};

export default function Results() {
  const { t, lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const maxIndex = projects.length - 1;

  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <Section number="02" id="results">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Kicker>{lang === "en" ? "Results" : "Hasil"}</Kicker>
            <h2 className="text-[1.75rem] font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-[2.25rem] lg:text-[2.85rem]">
              {lang === "en" ? "Systems, prototypes & working concepts." : "Sistem, prototipe & konsep yang berfungsi."}
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              {lang === "en"
                ? "Demo, prototype, and in-progress work is clearly labelled and never presented as client delivery."
                : "Karya demo, prototipe, dan yang sedang dikerjakan diberi label jelas dan tidak pernah disajikan sebagai hasil kerja klien."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/our-work"
              className="hidden items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent sm:inline-flex"
            >
              {lang === "en" ? "All work" : "Semua karya"} <ArrowUpRight size={14} />
            </Link>
            <span className="font-mono text-sm text-muted">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={prev}
              disabled={index === 0}
              aria-label="Previous project"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-accent disabled:opacity-30"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={index === maxIndex}
              aria-label="Next project"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-accent disabled:opacity-30"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden border-t border-line pt-8">
          <div
            className="flex gap-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(calc(-${index} * (min(560px, 82vw) + 1.5rem)))` }}
          >
            {projects.map((p) => (
              <article key={p.slug} className="w-[min(560px,82vw)] shrink-0">
                {p.liveUrl ? <LivePreviewFrame url={p.liveUrl} /> : <InDevelopmentPanel />}
                <div className="rounded-b-2xl border border-line p-6">
                  <div className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.08em] text-technical">
                    <span>{t(p.category)}</span>
                    <span className={`rounded-full border px-2.5 py-0.5 ${labelStyle[p.label]}`}>{labelText[lang][p.label]}</span>
                  </div>
                  <h3 className="text-2xl font-medium text-foreground sm:text-3xl">{t(p.title)}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{t(p.description)}</p>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm text-accent transition-colors hover:text-foreground"
                    >
                      {lang === "en" ? "Visit site" : "Kunjungi situs"} <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
