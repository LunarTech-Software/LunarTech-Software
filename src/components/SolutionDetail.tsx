"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { solutions, solutionDetailCopy, scopingNote } from "@/lib/content";
import { Container, Kicker } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import type { Solution } from "@/types/content";

export default function SolutionDetail({ solution }: { solution: Solution }) {
  const { t, lang } = useLanguage();
  const otherSolutions = solutions.filter((s) => s.slug !== solution.slug);

  return (
    <div className="pt-32">
      <Container>
        <Reveal className="max-w-2xl">
          <Kicker>{t(solution.name)}</Kicker>
          <h1 className="text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl">{t(solution.promise)}</h1>
          <p className="mt-4 text-lg text-muted">{t(solution.description)}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted">
            <span className="text-technical">{t(solutionDetailCopy.whoFor)}:</span> {t(solution.whoFor)}
          </div>
        </Reveal>

        <Reveal className="mt-16 max-w-2xl border-t border-line pt-12">
          <span className="font-mono text-xs text-technical">(01)</span>
          <h2 className="mt-3 text-2xl font-medium text-foreground sm:text-3xl">{t(solutionDetailCopy.problems)}</h2>
          <ul className="mt-6 space-y-4">
            {t(solution.problems).map((problem) => (
              <li key={problem} className="flex gap-3 border-t border-line pt-4 text-muted first:border-t-0 first:pt-0">
                <span className="text-accent">—</span>
                {problem}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 border-t border-line pt-12">
          <span className="font-mono text-xs text-technical">(02)</span>
          <h2 className="mt-3 max-w-2xl text-2xl font-medium text-foreground sm:text-3xl">{t(solutionDetailCopy.whatWeBuild)}</h2>

          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line/40 bg-line/40 sm:grid-cols-2">
            {t(solution.whatWeBuild).map((item, i) => (
              <Reveal key={item} delay={Math.min(i * 0.03, 0.2)} className="bg-foreground p-7">
                <span className="font-mono text-xs text-void/50">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-xl font-medium leading-snug text-void sm:text-2xl">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <p className="mt-12 max-w-2xl border-t border-line pt-8 text-sm leading-relaxed text-technical">{t(scopingNote)}</p>
        </Reveal>

        <div className="mt-16 border-t border-line pt-10 pb-6">
          <Kicker>{t(solutionDetailCopy.exploreOther)}</Kicker>
          <div className="mt-4 flex flex-wrap gap-2">
            {otherSolutions.map((s) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-accent"
              >
                {t(s.name)}
              </Link>
            ))}
          </div>
        </div>
      </Container>

      <section className="lunar-section border-t border-line">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">{t(solutionDetailCopy.ctaHeading)}</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">{t(solutionDetailCopy.ctaBody)}</p>
            <div className="mt-8 flex justify-center">
              <Button href={`/contact?intent=${solution.slug}`} variant="primary">
                {lang === "en" ? "Book a Consultation" : "Jadwalkan Konsultasi"} <ArrowUpRight size={16} />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
