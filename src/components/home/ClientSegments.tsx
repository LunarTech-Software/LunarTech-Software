import Reveal from "../Reveal";
import { Container, Section, Kicker, Heading } from "../Section";
import { clientSegments } from "../../lib/site";

export default function ClientSegments() {
  return (
    <Section className="border-y border-white/8 bg-deep-space/50">
      <Container>
        <Reveal className="mb-10 max-w-2xl">
          <Kicker>Clients</Kicker>
          <Heading className="text-3xl md:text-4xl">Built for real operating environments.</Heading>
          <p className="mt-4 text-base leading-relaxed text-muted-silver">
            LUNAR is early — we're not going to show you fake logos or invented testimonials. Here's who we
            build for.
          </p>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {clientSegments.map((label, i) => (
            <Reveal key={label} delay={i * 0.04}>
              <div className="flex h-full items-center rounded-xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md">
                <span className="text-sm font-medium text-soft-white/90">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
