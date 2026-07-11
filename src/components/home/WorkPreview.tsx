import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import { Container, Section, Kicker, Heading } from "../Section";

const workPreview = [
  { title: "Inventory Dashboard", label: "Placeholder", kind: "Business System", body: "Live stock and low-stock alerts replacing fragile spreadsheets." },
  { title: "Cold Storage Guardian", label: "Placeholder", kind: "Temperature Monitoring", body: "Continuous cold-chain monitoring with instant threshold alerts." },
  { title: "Farm Watch Pilot", label: "Placeholder", kind: "IoT Monitoring", body: "Field sensors streaming conditions with early-warning alerts." },
  { title: "Factory Visibility Board", label: "Placeholder", kind: "Facility Monitoring", body: "One-screen view of equipment status and downtime across the floor." },
];

export default function WorkPreview() {
  return (
    <Section>
      <Container>
        <Reveal className="mb-10 flex max-w-full flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Kicker>Selected work</Kicker>
            <Heading className="text-3xl md:text-5xl">
              Proof we build real, working systems.
            </Heading>
          </div>
          <Link to="/our-work" className="inline-flex items-center gap-1.5 text-lunar-teal transition-colors hover:text-soft-white">
            See our work <ArrowRight size={15} />
          </Link>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {workPreview.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-technical-grey">{item.kind}</span>
                  <span className="rounded-full border border-lunar-teal/30 bg-lunar-teal/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-lunar-teal">
                    {item.label}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-soft-white">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-silver">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 text-xs text-technical-grey">
            Placeholder, demo, and prototype work is clearly labelled and never presented as client delivery.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
