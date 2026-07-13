import { Container, Section } from "../components/Section";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CTABand from "../components/CTABand";
import StarfieldBackdrop from "../components/StarfieldBackdrop";
import { useSiteData } from "../lib/useSiteData";
import { useLanguage } from "../lib/i18n/LanguageContext";

const copy = {
  en: {
    kicker: "How we work",
    title: "We understand your operation before we build anything.",
    subtitle: "A clear, honest path from how you work today to a system your team actually runs.",
    ctaHeading: "Ready when you are.",
    ctaBody: "Book a consultation and we'll start by understanding how your business really runs.",
  },
  id: {
    kicker: "Bagaimana kami bekerja",
    title: "Kami memahami operasi Anda sebelum membangun apa pun.",
    subtitle: "Jalur yang jelas dan jujur dari cara kerja Anda hari ini menuju sistem yang benar-benar dijalankan tim Anda.",
    ctaHeading: "Siap kapan pun Anda siap.",
    ctaBody: "Jadwalkan konsultasi dan kami akan mulai dengan memahami bagaimana bisnis Anda sebenarnya berjalan.",
  },
};

export default function ProcessPage() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const { processSteps, scopingNote } = useSiteData();

  return (
    <div>
      <StarfieldBackdrop />
      <PageHero kicker={t.kicker} title={t.title} subtitle={t.subtitle} />

      <Section>
        <Container>
          <ol className="relative mx-auto max-w-3xl">
            <span className="absolute bottom-2 left-[15px] top-2 w-px bg-white/10" aria-hidden="true" />
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.04}>
                <li className="relative flex gap-6 pb-10 last:pb-0">
                  <span className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-lunar-teal/40 bg-void text-[13px] font-semibold tabular-nums text-lunar-teal">
                    {i + 1}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="text-lg font-medium text-soft-white md:text-xl">{step.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted-silver">{step.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-technical-grey">{scopingNote}</p>
          </Reveal>
        </Container>
      </Section>

      <CTABand heading={t.ctaHeading} body={t.ctaBody} catalogue={false} />
    </div>
  );
}
