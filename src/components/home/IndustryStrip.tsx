import Reveal from "../Reveal";
import { Container, Section, Kicker, Heading } from "../Section";
import { useSiteData } from "../../lib/useSiteData";
import { useLanguage } from "../../lib/i18n/LanguageContext";

const copy = {
  en: { kicker: "Who we serve", heading: "Built for operations that keep the real world running." },
  id: { kicker: "Siapa yang kami layani", heading: "Dibangun untuk operasi yang menjalankan dunia nyata." },
};

export default function IndustryStrip() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const { industries } = useSiteData();
  return (
    <Section className="border-y border-white/8 bg-deep-space/40">
      <Container>
        <Reveal className="mb-8 max-w-2xl">
          <Kicker>{t.kicker}</Kicker>
          <Heading className="text-2xl md:text-3xl">{t.heading}</Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2.5">
            {industries.map((name) => (
              <span key={name} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] text-muted-silver backdrop-blur-md">
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
