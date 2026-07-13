import Reveal from "../Reveal";
import { Container, Section, Kicker, Heading } from "../Section";
import SolutionCard from "../SolutionCard";
import { useSiteData } from "../../lib/useSiteData";
import { useLanguage } from "../../lib/i18n/LanguageContext";

const copy = {
  en: { kicker: "What we build", heading: "Seven ways we bring clarity to your operation." },
  id: { kicker: "Apa yang kami bangun", heading: "Tujuh cara kami membawa kejelasan ke operasi Anda." },
};

export default function PillarGrid() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const { solutions } = useSiteData();
  return (
    <Section>
      <Container>
        <Reveal className="max-w-2xl">
          <Kicker>{t.kicker}</Kicker>
          <Heading className="text-3xl md:text-5xl">{t.heading}</Heading>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <SolutionCard solution={s} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
