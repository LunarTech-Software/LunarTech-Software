import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import { Container, Section, Kicker, Heading } from "../Section";
import Button from "../Button";
import { processSteps } from "../../lib/site";

export default function ProcessPreview() {
  return (
    <Section>
      <Container>
        <Reveal className="mb-10 max-w-2xl">
          <Kicker>How we work</Kicker>
          <Heading className="text-3xl md:text-5xl">
            We understand your operation before we build anything.
          </Heading>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.slice(0, 4).map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <span className="text-sm font-semibold tabular-nums text-lunar-teal">0{i + 1}</span>
                <h3 className="mt-3 font-medium text-soft-white">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted-silver">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/process" variant="secondary">
              See the full process <ArrowRight size={15} />
            </Button>
            <Button to="/contact" variant="link">
              Book a Consultation
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
