import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Info } from "lucide-react";
import { Container, Section } from "../components/Section";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CTABand from "../components/CTABand";
import ProjectVisual from "../components/work/ProjectVisual";
import { projects, workFilters, type WorkLabel } from "../lib/site";

const labelStyle: Record<WorkLabel, string> = {
  Platform: "border-lunar-teal/40 bg-lunar-teal/15 text-lunar-teal",
  Demo: "border-white/15 bg-white/5 text-muted-silver",
  Prototype: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  Concept: "border-white/15 bg-white/5 text-muted-silver",
};

export default function OurWorkPage() {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <div>
      <PageHero
        kicker="Selected work"
        title="Systems, prototypes & working concepts."
        subtitle="Proof we build real, working systems — not just talk."
      />

      <Section>
        <Container>
          <Reveal>
            <div className="mb-10 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md md:p-5">
              <Info size={18} className="mt-0.5 shrink-0 text-lunar-teal" />
              <p className="text-sm leading-relaxed text-muted-silver">
                Demo, prototype, and concept work is clearly labelled and never presented as client
                delivery. Real, scoped client systems are shared on request.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mb-8 flex flex-wrap gap-2">
              {workFilters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setActive(f.value)}
                  className={`rounded-full px-3.5 py-1.5 text-[12px] transition-colors ${
                    active === f.value
                      ? "bg-lunar-teal text-void"
                      : "border border-white/10 bg-white/5 text-muted-silver hover:text-soft-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link
                    to={`/our-work/${p.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors hover:border-white/20"
                  >
                    <ProjectVisual kind={p.visual} />
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-[11px] uppercase tracking-[0.14em] text-technical-grey">{p.category}</span>
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wide ${labelStyle[p.label]}`}>
                        {p.label}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-medium text-soft-white">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-silver">{p.solutionText}</p>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Section>

      <CTABand heading="Discuss a similar project." body="Tell us what you're trying to see or control, and we'll scope it around your operation." catalogue={false} />
    </div>
  );
}
