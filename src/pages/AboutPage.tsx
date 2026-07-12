import { Container, Section, Kicker, Heading } from "../components/Section";
import PageHero from "../components/PageHero";
import StarfieldBackdrop from "../components/StarfieldBackdrop";
import Reveal from "../components/Reveal";
import CTABand from "../components/CTABand";
import IndustryStrip from "../components/home/IndustryStrip";
import { differentiators } from "../lib/site";

const principles = [
  { title: "Understand first.", body: "We learn how your operation really runs before we build anything." },
  { title: "Built to fit.", body: "Systems shaped around your workflow, not a template forced on top." },
  { title: "Engineering discipline.", body: "The reliability of engineering with the speed of modern software." },
  { title: "Honest and clear.", body: "We label demos as demos, ship a working first phase, and keep improving." },
];

export default function AboutPage() {
  return (
    <div>
      <StarfieldBackdrop />
      <PageHero
        kicker="who we are"
        title="The orbit your operations organize around."
        subtitle="LUNAR is a digital engineering and automation company that builds the systems which real businesses run on."
      />

      {/* The name */}
      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <Reveal>
              <Kicker>The name</Kicker>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xl leading-relaxed text-soft-white md:text-2xl">
                LUNAR is an orbit: a stable path everything organizes itself around. It's what we build —
                the structure a business operates from. Precision, visibility, and control, engineered into
                how you work.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Why we exist */}
      <Section className="border-y border-white/8 bg-deep-space/40">
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <Kicker>Why we exist</Kicker>
            <div className="space-y-5 text-lg leading-relaxed text-muted-silver">
              <p>
                Most businesses don't struggle for lack of effort. They lose time, money, and clarity to
                work spread across spreadsheets, paper, group chats, and manual checking. Everyone is busy,
                yet no one can see the whole picture.
              </p>
              <p>
                LUNAR exists to change that. We're a digital engineering company that builds the systems a
                business actually runs on — custom software, dashboards, automation, and IoT monitoring,
                each shaped around how your operation truly works rather than forced on top of it.
              </p>
              <p>
                We sit where software, engineering, business systems, and real-time monitoring meet. We
                understand the operation on the ground, map where it breaks, then design and build systems
                that give you visibility and control. The result isn't just technology — it's a clearer,
                calmer, more capable business.
              </p>
              <p className="text-soft-white">
                That's what our name means: an orbit, the stable path everything turns around. LUNAR is the
                orbit your operations organize themselves around.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* How we think */}
      <Section>
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <Kicker>How we think</Kicker>
            <Heading className="text-3xl md:text-4xl">Four principles we build by.</Heading>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <h3 className="text-lg font-medium text-soft-white">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-silver">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* What makes us different */}
      <Section className="border-y border-white/8 bg-deep-space/40">
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <Kicker>What makes us different</Kicker>
            <Heading className="text-3xl md:text-4xl">Five reasons clients trust the build.</Heading>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <span className="text-sm font-semibold tabular-nums text-lunar-teal">0{i + 1}</span>
                  <h3 className="mt-3 font-medium text-soft-white">{d.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-silver">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <IndustryStrip />

      <CTABand
        heading="Let's map your operation."
        body="Start with a conversation about how your business really runs today."
      />
    </div>
  );
}
