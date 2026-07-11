import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import { Container, Section, Kicker, Heading } from "../Section";
import Button from "../Button";
import LiveTiles from "./LiveTiles";

export default function AutomationHighlight() {
  return (
    <Section className="border-y border-white/8 bg-deep-space/50">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Kicker>Automation & IoT</Kicker>
            <Heading className="text-3xl md:text-5xl">
              Monitoring that prevents costly problems.
            </Heading>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-silver">
              LUNAR connects sensors, dashboards, and alerts so farms, factories, cold storage, and
              facilities can see problems before they become losses.
            </p>
            <div className="mt-8">
              <Button to="/contact" variant="primary">
                Discuss a Project <ArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <LiveTiles />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
