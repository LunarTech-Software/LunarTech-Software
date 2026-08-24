"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { finalCta, contact } from "@/lib/content";
import { Container } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function FinalCta() {
  const { t, lang } = useLanguage();
  return (
    <section className="lunar-section relative overflow-hidden border-t border-line">
      <Image
        src="/images/cinematic/final-cta-space.png"
        alt=""
        fill
        aria-hidden
        className="object-cover opacity-80"
        sizes="100vw"
      />
      <div aria-hidden className="absolute inset-0 bg-void/60" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="lunar-kicker mx-auto mb-6 block w-fit">{lang === "en" ? "Start a project" : "Mulai proyek"}</span>
          <h2 className="text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t(finalCta.heading)}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted">{t(finalCta.body)}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <a href={contact.mailto} className="text-lg text-foreground underline decoration-line underline-offset-8 transition-colors hover:text-accent hover:decoration-accent">
              {contact.email}
            </a>
            <a href="/contact" className="text-lg text-muted transition-colors hover:text-foreground">
              {lang === "en" ? "Or start a project →" : "Atau mulai proyek →"}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
