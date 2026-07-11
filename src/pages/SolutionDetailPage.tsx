import { useParams, Navigate, Link } from "react-router-dom";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Container, Section, Kicker, Heading } from "../components/Section";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CTABand from "../components/CTABand";
import SolutionIcon from "../components/SolutionIcon";
import StarfieldBackdrop from "../components/StarfieldBackdrop";
import { solutions, scopingNote } from "../lib/site";

export default function SolutionDetailPage() {
  const { slug } = useParams();
  const solution = solutions.find((s) => s.slug === slug);

  if (!solution) return <Navigate to="/solutions" replace />;

  return (
    <div>
      <StarfieldBackdrop />
      <PageHero kicker={solution.name} title={solution.promise} subtitle={solution.whatItIs} />

      <Section>
        <Container>
          <div className="mb-10">
            <Link to="/solutions" className="inline-flex items-center gap-1.5 text-sm text-technical-grey transition-colors hover:text-muted-silver">
              <ArrowLeft size={14} /> All solutions
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="space-y-10">
              <Reveal>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-lunar-teal/20 bg-lunar-teal/10 text-lunar-teal">
                  <SolutionIcon name={solution.icon} size={22} strokeWidth={1.75} />
                </span>
              </Reveal>

              <Reveal>
                <Kicker>Who it's for</Kicker>
                <p className="text-lg leading-relaxed text-muted-silver">{solution.whoFor}</p>
              </Reveal>

              <Reveal>
                <Kicker>Problems it solves</Kicker>
                <ul className="space-y-3">
                  {solution.problems.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-muted-silver">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lunar-teal" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div>
              <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md md:p-8">
                <Kicker>What we build</Kicker>
                <ul className="mt-2 space-y-3.5">
                  {solution.whatWeBuild.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-soft-white">
                      <Check size={18} className="mt-0.5 shrink-0 text-lunar-teal" />
                      <span className="text-[15px] leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 border-t border-white/8 pt-5">
                  <p className="text-xs leading-relaxed text-technical-grey">
                    <span className="text-muted-silver">Visual direction — </span>
                    {solution.visual}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal>
            <p className="mt-12 max-w-2xl text-sm leading-relaxed text-technical-grey">{scopingNote}</p>
          </Reveal>

          <Reveal className="mt-16">
            <Heading className="mb-6 text-xl md:text-2xl">Explore other solutions</Heading>
            <div className="flex flex-wrap gap-2.5">
              {solutions
                .filter((s) => s.slug !== solution.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    to={`/solutions/${s.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] text-muted-silver backdrop-blur-md transition-colors hover:border-white/25 hover:text-soft-white"
                  >
                    {s.name}
                    <ArrowRight size={13} />
                  </Link>
                ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABand heading="Discuss a project." body="Every build starts by understanding your operation. Let's map it." catalogue={false} />
    </div>
  );
}
