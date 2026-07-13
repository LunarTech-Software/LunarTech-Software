import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import { Container, Section, Kicker, Heading } from "../Section";
import Button from "../Button";
import { useSiteData } from "../../lib/useSiteData";
import { useLanguage } from "../../lib/i18n/LanguageContext";
import { useCommonStrings } from "../../lib/i18n/common";

const copy = {
  en: { kicker: "How we work", heading: "We understand your operation before we build anything.", fullProcess: "See the full process" },
  id: { kicker: "Bagaimana kami bekerja", heading: "Kami memahami operasi Anda sebelum membangun apa pun.", fullProcess: "Lihat proses lengkap" },
};

export default function ProcessPreview() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const c = useCommonStrings();
  const { processSteps } = useSiteData();
  return (
    <Section>
      <Container>
        <Reveal className="mb-10 max-w-2xl">
          <Kicker>{t.kicker}</Kicker>
          <Heading className="text-3xl md:text-5xl">{t.heading}</Heading>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.slice(0, 4).map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <span className="text-sm font-semibold tabular-nums text-lunar-teal">0{i + 1}</span>
                <h3 className="mt-3 font-medium text-soft-white">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted-silver">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/process" variant="secondary">
              {t.fullProcess} <ArrowRight size={15} />
            </Button>
            <Button to="/contact" variant="link">
              {c.bookConsultation}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
