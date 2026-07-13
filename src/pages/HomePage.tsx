import Hero from "../components/hero/Hero";
import Credibility from "../components/home/Credibility";
import Problem from "../components/home/Problem";
import SolutionOverview from "../components/home/SolutionOverview";
import PillarGrid from "../components/home/PillarGrid";
import AutomationHighlight from "../components/home/AutomationHighlight";
import DashboardPreview from "../components/home/DashboardPreview";
import IndustryStrip from "../components/home/IndustryStrip";
import WorkPreview from "../components/home/WorkPreview";
import ClientSegments from "../components/home/ClientSegments";
import ProcessPreview from "../components/home/ProcessPreview";
import CTABand from "../components/CTABand";
import { useLanguage } from "../lib/i18n/LanguageContext";

const copy = {
  en: {
    heading: "Ready to enter the orbit?",
    body: "Explore the LUNAR catalogue, or tell us about your operation and we'll scope the right starting point.",
  },
  id: {
    heading: "Siap memasuki orbit?",
    body: "Jelajahi katalog LUNAR, atau ceritakan tentang operasi Anda dan kami akan menentukan titik awal yang tepat.",
  },
};

export default function HomePage() {
  const { lang } = useLanguage();
  const t = copy[lang];
  return (
    <div>
      <Hero />
      <Credibility />
      <Problem />
      <SolutionOverview />
      <PillarGrid />
      <AutomationHighlight />
      <DashboardPreview />
      <IndustryStrip />
      <WorkPreview />
      <ClientSegments />
      <ProcessPreview />
      <CTABand heading={t.heading} body={t.body} />
    </div>
  );
}
