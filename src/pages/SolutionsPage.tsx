import { Container, Section } from "../components/Section";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SolutionCard from "../components/SolutionCard";
import CTABand from "../components/CTABand";
import StarfieldBackdrop from "../components/StarfieldBackdrop";
import { solutions, scopingNote } from "../lib/site";

export default function SolutionsPage() {
  return (
    <div>
      <StarfieldBackdrop />
      <PageHero
        kicker="Solutions"
        title="Seven ways we bring clarity to your operation."
        subtitle="From your website to your factory floor — practical systems, built around how you actually work."
      />

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

      <CTABand
        heading="Not sure which fits? Start with your operation."
        body="Tell us how you work today and we'll point to what earns its place first."
      />
    </div>
  );
}
