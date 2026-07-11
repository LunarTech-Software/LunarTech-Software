import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Container, Section, Kicker, Heading } from "../components/Section";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CTABand from "../components/CTABand";
import ProjectVisual from "../components/work/ProjectVisual";
import { projects } from "../lib/site";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/our-work" replace />;

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div>
      <PageHero kicker={`${project.category} · ${project.label}`} title={project.title} subtitle={project.solutionText} />

      <Section>
        <Container>
          <div className="mb-10">
            <Link to="/our-work" className="inline-flex items-center gap-1.5 text-sm text-technical-grey transition-colors hover:text-muted-silver">
              <ArrowLeft size={14} /> All work
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <ProjectVisual kind={project.visual} className="aspect-auto h-full min-h-64" />
            </Reveal>

            <div className="space-y-8">
              <Reveal>
                <Kicker>Challenge</Kicker>
                <p className="text-lg leading-relaxed text-muted-silver">{project.problem}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <Kicker>What we built</Kicker>
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
                  <Kicker>Value</Kicker>
                  <p className="text-soft-white">{project.value}</p>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal className="mt-16">
            <Heading className="mb-6 text-xl md:text-2xl">Related projects</Heading>
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

      <CTABand heading="Discuss a Similar Project." body="Tell us what you're trying to see or control, and we'll scope it around your operation." catalogue={false} />
    </div>
  );
}
