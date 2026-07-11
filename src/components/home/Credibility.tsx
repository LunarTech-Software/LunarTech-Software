import Reveal from "../Reveal";
import { Container } from "../Section";

export default function Credibility() {
  return (
    <section className="border-y border-white/8 bg-deep-space/60">
      <Container className="py-8">
        <Reveal>
          <p className="text-center text-base text-muted-silver md:text-lg">
            Engineering digital systems for real-world operations —{" "}
            <span className="text-soft-white">not templates.</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
