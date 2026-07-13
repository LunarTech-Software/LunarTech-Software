import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import { Container, Section, Kicker, Heading } from "../Section";
import Button from "../Button";
import LiveTiles from "./LiveTiles";
import { useLanguage } from "../../lib/i18n/LanguageContext";

const copy = {
  en: {
    kicker: "Automation & IoT",
    heading: "Monitoring that prevents costly problems.",
    body: "LUNAR connects sensors, dashboards, and alerts so farms, factories, cold storage, and facilities can see problems before they become losses.",
    cta: "Discuss a Project",
  },
  id: {
    kicker: "Otomasi & IoT",
    heading: "Monitoring yang mencegah masalah berbiaya besar.",
    body: "LUNAR menghubungkan sensor, dasbor, dan notifikasi sehingga pertanian, pabrik, cold storage, dan fasilitas dapat melihat masalah sebelum menjadi kerugian.",
    cta: "Diskusikan Proyek",
  },
};

export default function AutomationHighlight() {
  const { lang } = useLanguage();
  const t = copy[lang];
  return (
    <Section className="border-y border-white/8 bg-deep-space/50">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Kicker>{t.kicker}</Kicker>
            <Heading className="text-3xl md:text-5xl">{t.heading}</Heading>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-silver">{t.body}</p>
            <div className="mt-8">
              <Button to="/contact" variant="primary">
                {t.cta} <ArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <LiveTiles />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
