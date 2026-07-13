import { Cpu, MoveRight, Eye, ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import { Container, Section } from "../Section";
import { useLanguage } from "../../lib/i18n/LanguageContext";

const nodes = {
  en: [
    { icon: Cpu, title: "Your operation", body: "How you actually work today." },
    { icon: MoveRight, title: "A system built around it", body: "Shaped to your workflow, not a template." },
    { icon: Eye, title: "Clarity", body: "Real-time visibility and control." },
  ],
  id: [
    { icon: Cpu, title: "Operasi Anda", body: "Bagaimana Anda benar-benar bekerja saat ini." },
    { icon: MoveRight, title: "Sistem yang dibangun sesuai", body: "Dibentuk sesuai alur kerja Anda, bukan template." },
    { icon: Eye, title: "Kejelasan", body: "Visibilitas dan kontrol real-time." },
  ],
};

export default function SolutionOverview() {
  const { lang } = useLanguage();
  const list = nodes[lang];
  return (
    <Section className="border-y border-white/8 bg-deep-space/40">
      <Container>
        <Reveal className="mx-auto max-w-4xl">
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:gap-2">
            {list.map((node, i) => (
              <div key={node.title} className="flex flex-1 items-center gap-4">
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md">
                  <node.icon size={22} className="mx-auto text-lunar-teal" strokeWidth={1.75} />
                  <p className="mt-3 font-medium text-soft-white">{node.title}</p>
                  <p className="mt-1 text-sm text-muted-silver">{node.body}</p>
                </div>
                {i < list.length - 1 && (
                  <ArrowRight size={22} className="hidden shrink-0 text-lunar-teal/60 sm:block" />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
