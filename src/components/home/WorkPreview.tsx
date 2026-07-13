import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import { Container, Section, Kicker, Heading } from "../Section";
import { useSiteData } from "../../lib/useSiteData";
import { useLanguage } from "../../lib/i18n/LanguageContext";

const copy = {
  en: {
    kicker: "Selected work",
    heading: "Proof we build real, working systems.",
    seeWork: "See our work",
    note: "Placeholder, demo, and prototype work is clearly labelled and never presented as client delivery.",
  },
  id: {
    kicker: "Karya terpilih",
    heading: "Bukti bahwa kami membangun sistem nyata yang berfungsi.",
    seeWork: "Lihat karya kami",
    note: "Karya placeholder, demo, dan prototipe diberi label jelas dan tidak pernah disajikan sebagai hasil kerja klien.",
  },
};

export default function WorkPreview() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const { projects } = useSiteData();
  const preview = projects.slice(0, 4);

  return (
    <Section>
      <Container>
        <Reveal className="mb-10 flex max-w-full flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Kicker>{t.kicker}</Kicker>
            <Heading className="text-3xl md:text-5xl">{t.heading}</Heading>
          </div>
          <Link to="/our-work" className="inline-flex items-center gap-1.5 text-lunar-teal transition-colors hover:text-soft-white">
            {t.seeWork} <ArrowRight size={15} />
          </Link>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-technical-grey">{item.category}</span>
                  <span className="rounded-full border border-lunar-teal/30 bg-lunar-teal/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-lunar-teal">
                    {item.label}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-soft-white">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-silver">{item.solutionText}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 text-xs text-technical-grey">{t.note}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
