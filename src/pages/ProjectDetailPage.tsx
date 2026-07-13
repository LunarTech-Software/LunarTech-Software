import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Container, Section, Kicker, Heading } from "../components/Section";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CTABand from "../components/CTABand";
import ProjectVisual from "../components/work/ProjectVisual";
import type { WorkLabel } from "../lib/site";
import { useSiteData } from "../lib/useSiteData";
import { useLanguage } from "../lib/i18n/LanguageContext";

const labelText: Record<"en" | "id", Record<WorkLabel, string>> = {
  en: { Platform: "Platform", Demo: "Demo", Prototype: "Prototype", Concept: "Concept" },
  id: { Platform: "Platform", Demo: "Demo", Prototype: "Prototipe", Concept: "Konsep" },
};

const copy = {
  en: {
    allWork: "All work",
    challenge: "Challenge",
    whatWeBuilt: "What we built",
    value: "Value",
    relatedProjects: "Related projects",
    ctaHeading: "Discuss a Similar Project.",
    ctaBody: "Tell us what you're trying to see or control, and we'll scope it around your operation.",
  },
  id: {
    allWork: "Semua karya",
    challenge: "Tantangan",
    whatWeBuilt: "Apa yang kami bangun",
    value: "Nilai",
    relatedProjects: "Proyek terkait",
    ctaHeading: "Diskusikan Proyek Serupa.",
    ctaBody: "Ceritakan apa yang ingin Anda lihat atau kendalikan, dan kami akan menyusun rencananya sesuai operasi Anda.",
  },
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const t = copy[lang];
  const { projects } = useSiteData();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/our-work" replace />;

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div>
      <PageHero
        kicker={`${project.category} · ${labelText[lang][project.label]}`}
        title={project.title}
        subtitle={project.solutionText}
      />

      <Section>
        <Container>
          <div className="mb-10">
            <Link to="/our-work" className="inline-flex items-center gap-1.5 text-sm text-technical-grey transition-colors hover:text-muted-silver">
              <ArrowLeft size={14} /> {t.allWork}
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <ProjectVisual kind={project.visual} className="aspect-auto h-full min-h-64" />
            </Reveal>

            <div className="space-y-8">
              <Reveal>
                <Kicker>{t.challenge}</Kicker>
                <p className="text-lg leading-relaxed text-muted-silver">{project.problem}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <Kicker>{t.whatWeBuilt}</Kicker>
                <ul className="space-y-3">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-soft-white">
                      <Check size={16} className="mt-0.5 shrink-0 text-lunar-teal" />
                      <span className="text-[15px] leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                  <Kicker>{t.value}</Kicker>
                  <p className="text-soft-white">{project.value}</p>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal className="mt-16">
            <Heading className="mb-6 text-xl md:text-2xl">{t.relatedProjects}</Heading>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/our-work/${p.slug}`}
                  className="group rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors hover:border-white/25"
                >
                  <ProjectVisual kind={p.visual} className="aspect-video" />
                  <h3 className="mt-3 text-sm font-medium text-soft-white">{p.title}</h3>
                  <p className="mt-1 text-xs text-technical-grey">{p.category}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABand heading={t.ctaHeading} body={t.ctaBody} catalogue={false} />
    </div>
  );
}
