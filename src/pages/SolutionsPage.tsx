import { Container, Section } from "../components/Section";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SolutionCard from "../components/SolutionCard";
import CTABand from "../components/CTABand";
import StarfieldBackdrop from "../components/StarfieldBackdrop";
import { useSiteData } from "../lib/useSiteData";
import { useLanguage } from "../lib/i18n/LanguageContext";

const copy = {
  en: {
    kicker: "Solutions",
    title: "Seven ways we bring clarity to your operation.",
    subtitle: "From your website to your factory floor — practical systems, built around how you actually work.",
    ctaHeading: "Not sure which fits? Start with your operation.",
    ctaBody: "Tell us how you work today and we'll point to what earns its place first.",
  },
  id: {
    kicker: "Solusi",
    title: "Tujuh cara kami membawa kejelasan ke operasi Anda.",
    subtitle: "Dari website hingga lantai pabrik Anda — sistem praktis, dibangun sesuai cara kerja Anda yang sesungguhnya.",
    ctaHeading: "Belum yakin yang mana? Mulai dari operasi Anda.",
    ctaBody: "Ceritakan bagaimana Anda bekerja hari ini dan kami akan menunjukkan mana yang paling relevan lebih dulu.",
  },
};

export default function SolutionsPage() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const { solutions, scopingNote } = useSiteData();

  return (
    <div>
      <StarfieldBackdrop />
      <PageHero kicker={t.kicker} title={t.title} subtitle={t.subtitle} />

      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <SolutionCard solution={s} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-technical-grey">{scopingNote}</p>
          </Reveal>
        </Container>
      </Section>

      <CTABand heading={t.ctaHeading} body={t.ctaBody} />
    </div>
  );
}
