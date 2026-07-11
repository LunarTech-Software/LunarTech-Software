import Reveal from "../Reveal";
import { Container, Section, Kicker, Heading } from "../Section";
import SolutionCard from "../SolutionCard";
import { solutions } from "../../lib/site";

export default function PillarGrid() {
  return (
    <Section>
      <Container>
        <Reveal className="max-w-2xl">
          <Kicker>What we build</Kicker>
          <Heading className="text-3xl md:text-5xl">
            Seven ways we bring clarity to your operation.
          </Heading>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <SolutionCard solution={s} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
