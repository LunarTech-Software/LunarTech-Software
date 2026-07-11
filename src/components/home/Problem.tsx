import Reveal from "../Reveal";
import { Container, Section, Heading } from "../Section";

export default function Problem() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <Heading className="text-3xl md:text-5xl">
              Most operations are still run on hope.
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted-silver">
              Stock is guessed, not counted. Tanks are checked when someone remembers. Reports get built by
              hand, after the fact, once it's too late to act on them.
              <span className="mt-4 block text-soft-white">
                LUNAR replaces the guessing with systems that watch, log, and alert.
              </span>
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
