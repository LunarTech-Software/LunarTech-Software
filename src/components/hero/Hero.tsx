import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useIsCoarsePointer } from "../../hooks/useIsCoarsePointer";
import { useIsDesktopViewport } from "../../hooks/useIsDesktopViewport";
import { Kicker } from "../Section";
import Button from "../Button";
import HeroOrbitBackdrop from "./HeroOrbitBackdrop";
import { SplineScene } from "./SplineScene";
import HeroFallback from "./HeroFallback";
import DashboardFragments from "./DashboardFragments";
import ServiceSelector from "./ServiceSelector";
import { contact } from "../../lib/site";

const SPLINE_SCENE_URL = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

type Phase = "boot" | "forming" | "orbit";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const coarsePointer = useIsCoarsePointer();
  const isDesktop = useIsDesktopViewport();
  const useLite = reducedMotion || coarsePointer || !isDesktop;
  const [splineFailed, setSplineFailed] = useState(false);

  const [phase, setPhase] = useState<Phase>("boot");
  const [contentVisible, setContentVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!useLite) return;
    setPhase("orbit");
    setContentVisible(true);
  }, [useLite]);

  useEffect(() => {
    if (useLite) return;
    const bootTimer = setTimeout(() => {
      setPhase("forming");
      setContentVisible(true);
    }, 900);
    return () => clearTimeout(bootTimer);
  }, [useLite]);

  useEffect(() => {
    if (phase !== "forming") return;
    const toOrbit = setTimeout(() => setPhase("orbit"), 900);
    return () => clearTimeout(toOrbit);
  }, [phase]);

  // Subtle scroll-scrubbed parallax/fade on the orbit backdrop as the hero scrolls past.
  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current || !orbitRef.current) return;
      gsap.to(orbitRef.current, {
        yPercent: 15,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  const showSpline = !useLite && !splineFailed;

  return (
    <section ref={sectionRef} className="relative flex min-h-screen flex-col overflow-hidden bg-void pt-24">
      {/* On mobile/tablet/coarse-pointer/reduced-motion, showSpline is false and this
          renders HeroFallback full-bleed instead — the Spline canvas is never mounted
          there, not just visually hidden, so it never loads or spends GPU on those devices. */}
      <div ref={orbitRef} className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[45%]">
        <HeroOrbitBackdrop />
        {showSpline ? (
          <SplineScene scene={SPLINE_SCENE_URL} className="absolute inset-0" onError={() => setSplineFailed(true)} />
        ) : (
          <HeroFallback />
        )}
        <DashboardFragments visible={phase === "orbit"} />
      </div>

      {/* legibility scrim so the headline/CTA column stays readable over the 3D visual */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[70%]"
        style={{ background: "linear-gradient(to right, #030712 0%, #030712 50%, transparent 100%)" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-void lg:h-72"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 gap-10 px-6 pb-16 pt-10 lg:grid-cols-2 lg:px-10 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={contentVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center"
        >
          <Kicker>Digital Engineering & Automation</Kicker>
          <h1 className="text-4xl leading-[1.08] font-medium tracking-tight text-soft-white lg:text-6xl">
            Enter the orbit of intelligent operations.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-silver lg:text-lg">
            LUNAR builds custom websites, business systems, dashboards, automation, and IoT monitoring —
            engineered around how your operation actually works.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/catalogue" variant="primary">
              Request Catalogue <ArrowRight size={16} />
            </Button>
            <Button href={contact.whatsappText} newTab variant="secondary">
              <MessageCircle size={16} /> Chat on WhatsApp
            </Button>
            <Button href={contact.mailto} variant="link">
              <Mail size={15} /> Email Enquiry
            </Button>
          </div>

          <ServiceSelector />
        </motion.div>

        {/* right column intentionally empty on lg+ — the Spline canvas / orbit fills the background there */}
        <div className="hidden lg:block" aria-hidden />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={contentVisible ? { opacity: 0.6, y: [0, 6, 0] } : {}}
        transition={{
          opacity: { duration: 1, delay: 0.5 },
          y: { duration: 2.4, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative z-10 flex justify-center pb-6"
      >
        <ChevronDown size={20} className="text-muted-silver" />
      </motion.div>
    </section>
  );
}
