import { Container, Section, Kicker, Heading } from "../components/Section";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CTABand from "../components/CTABand";
import TechLogoMarquee from "../components/clients/TechLogoMarquee";
import { clientSegments } from "../lib/site";

export default function ClientsPage() {
  return (
    <div>
      <PageHero
        kicker="Clients"
        title="Built for real operating environments."
        subtitle="LUNAR is early. We're not going to show you fake logos or invented testimonials — here's who we build for."
      />

      <Section>
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <Kicker>Client segments</Kicker>
            <Heading className="text-3xl md:text-4xl">Every project starts with your operation, not a case study.</Heading>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clientSegments.map((label, i) => (
              <Reveal key={label} delay={i * 0.04}>
                <div className="flex h-full items-center rounded-xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-md">
                  <span className="font-medium text-soft-white">{label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-white/8 bg-deep-space/40">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Kicker>A note on honesty</Kicker>
            <p className="text-lg leading-relaxed text-muted-silver">
              As real client work is delivered, this page will show logos, industries, and results — with
              permission, and only work we actually did. Until then, we'd rather show you nothing than show
              you something invented.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Reveal className="mb-10 text-center">
          <Kicker>Technology we work with</Kicker>
          <Heading className="text-2xl md:text-3xl">Built with modern tools.</Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <TechLogoMarquee />
        </Reveal>
      </Section>

      <CTABand heading="Be one of the first." body="Early clients get closer attention and a system shaped from scratch around their operation." />
    </div>
  );
}
