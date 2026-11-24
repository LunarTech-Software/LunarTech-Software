"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/language-context";
import type { L } from "@/lib/solutionsHub";
import { clamp01, lerp, smooth } from "./useStage";

/**
 * SCENE 02: every system, working together.
 *
 * Six business systems sit in a ring around one central record. They start dim and inactive.
 * A copper signal travels the engineering pathway; the camera follows it and eases in on each
 * system as it activates, revealing what that system holds. Each connection then lights toward
 * the hub and carries data packets. When all six are connected the camera pulls back and the hub
 * becomes one connected operation, with a plain statement of the benefit.
 *
 * One ScrollTrigger scrub drives everything, so the whole sequence reverses when you scroll up.
 * Labels are conceptual: no live-looking numbers are shown.
 */

const WW = 1600;
const WH = 1000;
const HUB = { x: 800, y: 500 };
const LINE_LEN = 1300;

interface NodeDef {
  en: string;
  id: string;
  x: number;
  y: number;
  line: L;
  chips: L[];
}

const l = (en: string, id: string): L => ({ en, id });

const NODES: NodeDef[] = [
  { en: "OPERATIONS", id: "OPERASIONAL", x: 800, y: 170, line: l("Jobs, trips and assignments, recorded once.", "Pekerjaan, trip, dan penugasan, dicatat sekali."), chips: [l("Trips", "Trip"), l("Assignments", "Penugasan"), l("Reports", "Laporan")] },
  { en: "INVENTORY", id: "PERSEDIAAN", x: 1250, y: 335, line: l("Stock moves as the work happens.", "Stok bergerak seiring pekerjaan berjalan."), chips: [l("Stock", "Stok"), l("Transfers", "Transfer"), l("Stock opname", "Stock opname")] },
  { en: "FINANCE", id: "KEUANGAN", x: 1250, y: 665, line: l("Costs and invoices follow the same record.", "Biaya dan faktur mengikuti catatan yang sama."), chips: [l("Invoices", "Faktur"), l("Budgets", "Anggaran")] },
  { en: "HUMAN RESOURCES", id: "SDM", x: 800, y: 830, line: l("People and payroll tied to the work they do.", "Orang dan penggajian terkait pekerjaan mereka."), chips: [l("Attendance", "Absensi"), l("Leave", "Cuti"), l("Payroll", "Penggajian")] },
  { en: "ANALYTICS", id: "ANALITIK", x: 350, y: 665, line: l("Live views built from the shared record.", "Tampilan langsung dari catatan bersama."), chips: [l("Dashboards", "Dasbor"), l("Reports", "Laporan")] },
  { en: "AUTOMATION", id: "OTOMASI", x: 350, y: 335, line: l("Routine steps handled by rules, checked by people.", "Langkah rutin ditangani aturan, diperiksa manusia."), chips: [l("Notifications", "Notifikasi"), l("Intake", "Penerimaan"), l("Rules", "Aturan")] },
];

// The pathway is a rectangle that passes through every node, then closes back on the start.
type Pt = [number, number];
const route: Pt[] = [[560, 170], [800, 170], [1250, 170], [1250, 335], [1250, 665], [1250, 830], [800, 830], [350, 830], [350, 665], [350, 335], [350, 170], [560, 170]];
const nodeVertex = [1, 3, 4, 6, 8, 9];
const segLen = route.slice(1).map((p, i) => Math.abs(p[0] - route[i][0]) + Math.abs(p[1] - route[i][1]));
const cum = segLen.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s], [0]);
const total = segLen.reduce((a, b) => a + b, 0);
const nodeAt = nodeVertex.map((v) => cum[v]);
const D = route.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");

function pointAt(len: number): Pt {
  let rest = Math.min(Math.max(len, 0), total);
  for (let i = 0; i < segLen.length; i++) {
    if (rest <= segLen[i]) {
      const t = segLen[i] ? rest / segLen[i] : 0;
      return [lerp(route[i][0], route[i + 1][0], t), lerp(route[i][1], route[i + 1][1], t)];
    }
    rest -= segLen[i];
  }
  return route[route.length - 1];
}

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function JourneyScene() {
  const { lang } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    const world = worldRef.current;
    const head = headRef.current;
    if (!wrap || !stage || !tilt || !world || !head) return;
    gsap.registerPlugin(ScrollTrigger);

    const q = <T extends Element>(sel: string) => Array.from(stage.querySelectorAll<T>(sel));
    const cards = q<HTMLElement>("[data-card]");
    const hubLines = q<SVGPathElement>("[data-hubline]");
    const packets = q<SVGGElement>("[data-packets]");
    const trail = stage.querySelector<SVGPathElement>("[data-trail]")!;
    const comet = stage.querySelector<SVGPathElement>("[data-comet]")!;
    const head2 = stage.querySelector<SVGGElement>("[data-signal]")!;
    const hubRing = stage.querySelector<SVGCircleElement>("[data-hubring]")!;
    const caption = stage.querySelector<HTMLElement>("[data-caption]")!;

    const apply = (p: number) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const narrow = vw < 700;
      const fit = Math.min(vw / WW, vh / WH) * (narrow ? 1 : 0.94);

      /* 1. the dark circle opens, then the headline resolves and settles into a title */
      const maxR = Math.hypot(vw / 2, vh / 2) + 40;
      stage.style.setProperty("--r", `${smooth(0, 0.1, p) * maxR}px`);
      stage.style.setProperty("--h", String(smooth(0.05, 0.2, p)));
      const shrink = smooth(0.2, 0.32, p);
      head.style.transform = `translateY(${lerp(vh * 0.3, 0, shrink)}px) scale(${lerp(1, narrow ? 0.5 : 0.4, shrink)})`;
      // the title steps back while the signal travels, so it never competes with the systems
      head.style.opacity = String(lerp(lerp(1, 0.38, smooth(0.28, 0.36, p)), 0.9, smooth(0.82, 0.9, p)));

      /* 2. the signal travels the pathway */
      const travel = clamp01((p - 0.3) / 0.52);
      const L = travel * total;
      const [sx, sy] = pointAt(L);
      trail.setAttribute("stroke-dasharray", `${L} ${total + 10}`);
      const cl = Math.min(L, 150);
      comet.setAttribute("stroke-dasharray", `${cl} ${total + 10}`);
      comet.setAttribute("stroke-dashoffset", String(-(L - cl)));
      head2.setAttribute("transform", `translate(${sx} ${sy})`);
      head2.setAttribute("opacity", String(smooth(0.28, 0.32, p) * (1 - smooth(0.82, 0.86, p))));

      /* 3. systems activate as the signal reaches them; connections light toward the hub */
      const allDone = p >= 0.84;
      let pulse = 0;
      let focus: Pt = [sx, sy];
      let connected = 0;
      NODES.forEach((n, i) => {
        const d = Math.abs(L - nodeAt[i]);
        const traveling = p > 0.3 && p < 0.84;
        const active = traveling && d < 130;
        const done = allDone || (p > 0.3 && L > nodeAt[i] + 130);
        cards[i].dataset.state = active ? "active" : done ? "done" : "idle";
        const near = traveling ? smooth(0, 1, 1 - d / 300) : 0;
        if (near > pulse) {
          pulse = near;
          focus = [lerp(sx, n.x, 0.55), lerp(sy, n.y, 0.55)];
        }
        const f = allDone ? 1 : clamp01((L - nodeAt[i]) / 170);
        hubLines[i].setAttribute("stroke-dashoffset", String(LINE_LEN * (1 - f)));
        packets[i].setAttribute("opacity", f > 0.98 ? "1" : "0");
        if (f > 0.98) connected++;
      });
      hubRing.setAttribute("stroke-width", String(3 + connected * 0.8));

      /* 4. the camera: whole ring first, then in on the signal, then back out */
      const kIn = smooth(0.12, 0.3, p);
      const kOut = smooth(0.82, 0.9, p);
      const zFollow = (narrow ? 3.1 : 1.45) + (narrow ? 0.5 : 0.4) * pulse;
      const zEnd = narrow ? 1.7 : 1;
      const z = lerp(lerp(1, zFollow, kIn), zEnd, kOut);
      const toward: Pt = [lerp(HUB.x, focus[0], kIn), lerp(HUB.y, focus[1], kIn)];
      const F: Pt = [lerp(toward[0], HUB.x, kOut), lerp(toward[1], HUB.y, kOut)];
      const S = fit * z;
      world.style.transform = `translate(${vw / 2 - F[0] * S}px, ${vh / 2 - F[1] * S}px) scale(${S})`;
      // a restrained sense of depth: a slight sway while travelling, level at rest
      const sway = Math.sin(travel * Math.PI * 2) * 3.2 * (1 - kOut) * kIn;
      tilt.style.transform = `perspective(1900px) rotateX(${lerp(0, 5, kIn) * (1 - kOut)}deg) rotateY(${sway}deg)`;

      /* 5. resolved: every system lit and connected to one record, with a plain statement of the benefit */
      const k = smooth(0.9, 0.985, p);
      caption.style.opacity = String(smooth(0.92, 0.99, p));
      hubRing.setAttribute("r", String(lerp(70, 78, k)));
      cards.forEach((c) => (c.style.opacity = c.dataset.state === "idle" ? String(0.32) : c.dataset.state === "active" ? "1" : String(lerp(0.8, 1, k))));
    };

    if (reducedMotion()) {
      apply(1);
      return;
    }
    const proxy = { p: 0 };
    const tl = gsap.timeline({ scrollTrigger: { trigger: wrap, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true } });
    tl.to(proxy, { p: 1, ease: "none", duration: 1, onUpdate: () => apply(proxy.p) });
    apply(0);
    const onResize = () => apply(proxy.p);
    window.addEventListener("resize", onResize);
    // the hero pins after mount and other scenes load images: re-measure whenever the page height changes
    let settle = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        ScrollTrigger.sort(); // triggers above (the hero's pin) must be measured before this one
        ScrollTrigger.refresh();
        apply(proxy.p);
      }, 120);
    });
    ro.observe(document.body);
    return () => {
      window.clearTimeout(settle);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const title = lang === "en" ? ["EVERY SYSTEM.", "WORKING TOGETHER."] : ["SETIAP SISTEM.", "BEKERJA BERSAMA."];
  let ci = 0;

  return (
    <section ref={wrapRef} aria-label={title.join(" ")} className="stage-wrap relative" style={{ height: "560svh" }}>
      <p className="sr-only">
        {lang === "en" ? "Operations, inventory, finance, human resources, analytics and automation, connected to one shared record." : "Operasional, persediaan, keuangan, SDM, analitik, dan otomasi, terhubung ke satu catatan bersama."}
      </p>
      <div ref={stageRef} className="stage-sticky theme-light sticky top-0 h-[100svh] overflow-hidden" style={{ ["--r" as string]: "0px", ["--h" as string]: 0 }}>
        <div className="absolute inset-0 bg-[#090A0E] text-[#F0EAE0]" style={{ clipPath: "circle(var(--r) at 50% 50%)" }}>
          <div aria-hidden ref={tiltRef} className="absolute inset-0 will-change-transform">
            <div ref={worldRef} className="absolute left-0 top-0 origin-[0_0] will-change-transform" style={{ width: WW, height: WH }}>
              {/* pathway, hub connections, hub */}
              <svg viewBox={`0 0 ${WW} ${WH}`} className="absolute inset-0 h-full w-full overflow-visible">
                <path d={D} fill="none" stroke="#F0EAE0" strokeOpacity={0.16} strokeWidth={2.5} strokeLinejoin="round" />
                <path data-trail d={D} fill="none" stroke="#C18D6B" strokeWidth={4} strokeLinejoin="round" strokeDasharray={`0 ${total}`} />
                {NODES.map((n, i) => (
                  <path key={i} data-hubline d={`M${n.x} ${n.y} L${HUB.x} ${HUB.y}`} fill="none" stroke="#E98459" strokeOpacity={0.75} strokeWidth={2.2} strokeDasharray={LINE_LEN} strokeDashoffset={LINE_LEN} />
                ))}
                <circle cx={HUB.x} cy={HUB.y} r={96} fill="none" stroke="#F0EAE0" strokeOpacity={0.18} strokeDasharray="2 9" />
                <circle data-hubring cx={HUB.x} cy={HUB.y} r={70} fill="#090A0E" stroke="#E98459" strokeWidth={3} />
                <text x={HUB.x} y={HUB.y - 4} textAnchor="middle" fill="#F0EAE0" fontSize={17} style={{ fontFamily: "var(--font-jetbrains-mono), monospace", letterSpacing: 2 }}>
                  {lang === "en" ? "ONE" : "SATU"}
                </text>
                <text x={HUB.x} y={HUB.y + 20} textAnchor="middle" fill="#F0EAE0" fontSize={17} style={{ fontFamily: "var(--font-jetbrains-mono), monospace", letterSpacing: 2 }}>
                  {lang === "en" ? "RECORD" : "CATATAN"}
                </text>
              </svg>

              {/* the systems: what each one holds is revealed when the signal reaches it */}
              {NODES.map((n) => (
                <div key={n.en} data-card data-state="idle" className="jcard" style={{ left: n.x - 165, top: n.y - 70, width: 330 }}>
                  <div className="jcard-hd">
                    <span className="jcard-dot" />
                    <span>{lang === "en" ? n.en : n.id}</span>
                  </div>
                  <div className="jcard-body">
                    <p>{n.line[lang]}</p>
                    <ul>
                      {n.chips.map((c) => (
                        <li key={c.en}>{c[lang]}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* signal and data packets sit above the cards */}
              <svg viewBox={`0 0 ${WW} ${WH}`} className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                <defs>
                  <radialGradient id="sig" r="50%">
                    <stop offset="0%" stopColor="#E98459" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#E98459" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {NODES.map((n, i) => (
                  <g key={i} data-packets opacity={0}>
                    {[0, 1].map((k) => (
                      <rect key={k} x={-6} y={-6} width={12} height={12} rx={2} fill="#F0EAE0">
                        <animateMotion dur="2.6s" begin={`${k * 1.3}s`} repeatCount="indefinite" path={`M${n.x} ${n.y} L${HUB.x} ${HUB.y}`} />
                      </rect>
                    ))}
                  </g>
                ))}
                <path data-comet d={D} fill="none" stroke="#FFD9BD" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`0 ${total}`} />
                <g data-signal opacity={0}>
                  <circle r={34} fill="url(#sig)" />
                  <circle r={9} fill="#E98459" />
                  <circle r={4} fill="#FFF1E4" />
                </g>
              </svg>
            </div>
          </div>

          <p data-caption className="absolute bottom-6 left-1/2 w-[90%] -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-[#F0EAE0]/75 sm:bottom-8" style={{ opacity: 0 }}>
            {lang === "en" ? "Disconnected workflows, one connected operation, one clear view" : "Alur kerja terpisah, satu operasi terhubung, satu pandangan jelas"}
          </p>

          {/* the headline: kinetic reveal, then it settles into a title */}
          <div className="pointer-events-none absolute inset-x-0 top-[88px] px-5 sm:px-8">
            <h2 ref={headRef} className="origin-top-left font-display text-[clamp(2.4rem,8.6vw,9rem)] font-medium uppercase leading-[0.93] tracking-[-0.04em] will-change-transform">
              {title.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.07em]">
                  {Array.from(line).map((ch) => {
                    const i = ci++;
                    return (
                      <span
                        key={i}
                        className="inline-block whitespace-pre"
                        style={{ transform: `translateY(calc((1 - clamp(0, calc((var(--h) - ${(i * 0.011).toFixed(3)}) * 7), 1)) * 108%))` }}
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
