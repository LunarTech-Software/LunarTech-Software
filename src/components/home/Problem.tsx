import Reveal from "../Reveal";
import { Container, Section, Heading } from "../Section";
import { useLanguage } from "../../lib/i18n/LanguageContext";

const copy = {
  en: {
    heading: "Most operations are still run on hope.",
    body: "Stock is guessed, not counted. Tanks are checked when someone remembers. Reports get built by hand, after the fact, once it's too late to act on them.",
    highlight: "LUNAR replaces the guessing with systems that watch, log, and alert.",
  },
  id: {
    heading: "Sebagian besar operasi masih berjalan mengandalkan harapan.",
    body: "Stok diperkirakan, bukan dihitung. Tangki diperiksa hanya jika ada yang ingat. Laporan dibuat manual, belakangan, setelah terlambat untuk ditindaklanjuti.",
    highlight: "LUNAR menggantikan tebakan dengan sistem yang memantau, mencatat, dan memberi notifikasi.",
  },
};

export default function Problem() {
  const { lang } = useLanguage();
  const t = copy[lang];
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <Heading className="text-3xl md:text-5xl">{t.heading}</Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted-silver">
              {t.body}
              <span className="mt-4 block text-soft-white">{t.highlight}</span>
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
