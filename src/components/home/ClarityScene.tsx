"use client";

import { useCallback, useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { lerp, smooth, useStage } from "./useStage";

/**
 * SCENE 01: complexity engineered into clarity.
 * Ten routes start as tangled, crossing paths. As you scroll they straighten, one by one, into
 * parallel orthogonal lanes with right-angle elbows: the same data, now legible. The headline
 * resolves with them. Nothing here is decoration: every line is the same line, in two states.
 */

const W = 1440;
const H = 900;
const LANES = 10;
const STEPS = 6;

function rand(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = [number, number];

// Build each lane twice with the same vertex count: tangled (A) and orthogonal (B).
const lanes = Array.from({ length: LANES }, (_, i) => {
  const r = rand(40 + i * 7);
  const baseY = 110 + i * 72;
  const xs = Array.from({ length: STEPS }, (_, k) => ((k + 1) / (STEPS + 1)) * W + (r() - 0.5) * 40);
  const A: Pt[] = [];
  const B: Pt[] = [];
  let yb = baseY;
  A.push([-40, 120 + r() * 660]);
  B.push([-40, yb]);
  xs.forEach((x, k) => {
    const next = k === STEPS - 1 ? baseY : baseY + Math.round((r() - 0.5) * 3) * 36;
    const ya1 = 60 + r() * 780;
    const ya2 = 60 + r() * 780;
    A.push([x + (r() - 0.5) * 220, ya1]);
    A.push([x + (r() - 0.5) * 220, ya2]);
    B.push([x, yb]);
    B.push([x, next]);
    yb = next;
  });
  A.push([W + 40, 120 + r() * 660]);
  B.push([W + 40, yb]);
  return { A, B, accent: i === 3 ? "copper" : i === 7 ? "solar" : "ink" };
});

const toPath = (pts: Pt[]) => pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");

export default function ClarityScene() {
  const { lang } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const nodeRef = useRef<SVGGElement>(null);

  const onProgress = useCallback((p: number) => {
    lanes.forEach((ln, i) => {
      // each lane resolves slightly later than the one before it
      const t = smooth(0.1 + i * 0.045, 0.62 + i * 0.03, p);
      const d = toPath(ln.A.map((a, k) => [lerp(a[0], ln.B[k][0], t), lerp(a[1], ln.B[k][1], t)] as Pt));
      pathRefs.current[i]?.setAttribute("d", d);
    });
    nodeRef.current?.style.setProperty("opacity", String(smooth(0.78, 0.95, p)));
  }, []);
  useStage(wrapRef, onProgress);

  const lines = lang === "en" ? ["COMPLEXITY.", "ENGINEERED INTO", "CLARITY."] : ["KOMPLEKSITAS.", "DIREKAYASA MENJADI", "KEJELASAN."];
  // CSS-only reveals driven by --p
  const reveal = (start: number, end: number) => ({
    opacity: `clamp(0, calc((var(--p) - ${start}) * ${1 / (end - start)}), 1)`,
    transform: `translateY(calc((1 - clamp(0, calc((var(--p) - ${start}) * ${1 / (end - start)}), 1)) * 60px))`,
  });

  return (
    <section aria-label={lines.join(" ")} ref={wrapRef} className="stage-wrap theme-light relative" style={{ height: "230svh" }}>
      <div className="stage-sticky sticky top-0 h-[100svh] overflow-hidden">
        <svg aria-hidden viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          {lanes.map((ln, i) => (
            <path
              key={i}
              ref={(el) => {
                pathRefs.current[i] = el;
              }}
              d={toPath(ln.A)}
              fill="none"
              stroke={ln.accent === "copper" ? "#C18D6B" : ln.accent === "solar" ? "#E98459" : "#17191E"}
              strokeOpacity={ln.accent === "ink" ? 0.2 : 0.85}
              strokeWidth={ln.accent === "ink" ? 1.1 : 1.8}
              strokeLinejoin="round"
            />
          ))}
          <g ref={nodeRef} opacity={0}>
            {lanes.map((ln, i) =>
              ln.B.filter((_, k) => k > 0 && k < ln.B.length - 1 && k % 2 === 1).map((pt, k) => (
                <circle key={`${i}-${k}`} cx={pt[0]} cy={ln.B[1 + k * 2 + 1]?.[1] ?? pt[1]} r={3} fill={ln.accent === "solar" ? "#E98459" : "#17191E"} opacity={0.7} />
              )),
            )}
          </g>
        </svg>
        {/* keep the headline readable over the lines */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-[#F0EAE0] via-[#F0EAE0]/92 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-5 sm:px-8">
          <span className="mb-6 font-mono text-[10px] uppercase tracking-[0.1em] text-technical" style={reveal(0, 0.1)}>
            {lang === "en" ? "From complexity to connected intelligence" : "Dari kompleksitas menuju kecerdasan terhubung"}
          </span>
          <h2 className="font-display text-[clamp(2.6rem,9.2vw,9.5rem)] font-medium uppercase leading-[0.92] tracking-[-0.045em] text-foreground">
            <span className="block text-technical" style={reveal(0.02, 0.2)}>{lines[0]}</span>
            <span className="block" style={reveal(0.16, 0.34)}>{lines[1]}</span>
            <span className="block" style={reveal(0.3, 0.5)}>
              <span className="relative inline-block">
                {lines[2]}
                <span aria-hidden className="absolute -bottom-[0.02em] left-0 h-[0.06em] bg-copper" style={{ width: "calc(clamp(0, calc((var(--p) - 0.5) * 3), 1) * 100%)" }} />
              </span>
            </span>
          </h2>
          <p className="mt-9 max-w-md text-[17px] leading-relaxed text-muted" style={reveal(0.5, 0.7)}>
            {lang === "en"
              ? "Disconnected workflows, scattered data, and complicated operations don't have to stay that way. We engineer systems that bring everything together."
              : "Alur kerja yang terpisah, data yang tersebar, dan operasi yang rumit tidak harus tetap seperti itu. Kami merekayasa sistem yang menyatukan semuanya."}
          </p>
        </div>
      </div>
    </section>
  );
}
