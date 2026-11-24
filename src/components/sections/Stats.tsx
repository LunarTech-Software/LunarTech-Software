"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useLanguage } from "@/lib/language-context";
import { solutions, projects, processSteps } from "@/lib/content";
import { Container, Section } from "@/components/ui/Section";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const duration = reduced ? 1 : 1200;
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{String(value).padStart(2, "0")}</span>;
}

/** Counters are derived from the real content arrays, never hard-coded claims. */
export default function Stats() {
  const { lang } = useLanguage();
  const items = [
    { n: solutions.length, label: lang === "en" ? "Solution areas" : "Area solusi" },
    { n: projects.length, label: lang === "en" ? "Projects shown, each clearly labelled" : "Proyek ditampilkan, masing-masing berlabel jelas" },
    { n: processSteps.length, label: lang === "en" ? "Steps from first call to launch" : "Langkah dari panggilan pertama hingga peluncuran" },
  ];
  return (
    <Section theme="light" border={false} className="!pt-0">
      <Container>
        <div className="grid border-t border-line sm:grid-cols-3">
          {items.map((item, i) => (
            <div key={item.label} className={`py-10 ${i > 0 ? "sm:border-l sm:border-line sm:pl-8" : ""} ${i < 2 ? "sm:pr-8" : ""} ${i > 0 ? "border-t border-line sm:border-t-0" : ""}`}>
              <div className="font-display text-[clamp(3.5rem,2rem+6vw,7rem)] font-medium leading-none tracking-[-0.04em] text-foreground">
                <Counter to={item.n} />
              </div>
              <p className="mt-4 max-w-[16rem] font-mono text-[11px] uppercase tracking-[0.06em] text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
