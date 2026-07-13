import Reveal from "../Reveal";
import { Container } from "../Section";
import { useLanguage } from "../../lib/i18n/LanguageContext";

const copy = {
  en: { lead: "Engineering digital systems for real-world operations —", highlight: "not templates." },
  id: { lead: "Merekayasa sistem digital untuk operasi dunia nyata —", highlight: "bukan template." },
};

export default function Credibility() {
  const { lang } = useLanguage();
  const t = copy[lang];
  return (
    <section className="border-y border-white/8 bg-deep-space/60">
      <Container className="py-8">
        <Reveal>
          <p className="text-center text-base text-muted-silver md:text-lg">
            {t.lead} <span className="text-soft-white">{t.highlight}</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
