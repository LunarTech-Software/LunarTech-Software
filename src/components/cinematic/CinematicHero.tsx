"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/language-context";
import { contact } from "@/lib/content";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";
import { createMoonScene, type MoonScene } from "./moonScene";

const copy = {
  kicker: { en: "Digital Engineering & Automation", id: "Rekayasa Digital & Otomasi" },
  heroLines: {
    en: ["WE ENGINEER", "WHAT'S NEXT."],
    id: ["KAMI REKAYASA", "MASA DEPAN."],
  },
  heroBody: {
    en: "Custom software, intelligent systems, and automation built around how your business actually works.",
    id: "Perangkat lunak khusus, sistem cerdas, dan otomasi yang dibangun sesuai cara bisnis Anda benar-benar bekerja.",
  },
  scroll: { en: "Scroll", id: "Gulir" },
  overview: { en: "Overview", id: "Ikhtisar" },
  storyLines: {
    en: ["DISCONNECTED SYSTEMS.", "ONE INTELLIGENT OPERATION."],
    id: ["SISTEM TERPISAH.", "SATU OPERASI CERDAS."],
  },
  storyBody: {
    en: "From business software and automation to AI and connected operations, LUNAR engineers technology that works together.",
    id: "Dari perangkat lunak bisnis dan otomasi hingga AI dan operasi terhubung, LUNAR merekayasa teknologi yang bekerja bersama.",
  },
  storyCta: { en: "Explore solutions", id: "Jelajahi solusi" },
  catalogue: { en: "Request Catalogue", id: "Minta Katalog" },
  whatsapp: { en: "Chat on WhatsApp", id: "Chat di WhatsApp" },
};

/** Each headline line sits in an overflow mask so it can wipe in and out. */
function MaskedLines({ lines, attr }: { lines: string[]; attr: string }) {
  return (
    <>
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <span {...{ [attr]: "" }} className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </>
  );
}

function StoryContent({ lang, attrPrefix }: { lang: "en" | "id"; attrPrefix: string }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col justify-between px-5 pb-[7vh] pt-32 sm:px-8">
      <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-technical">
        <span data-story-meta>{copy.overview[lang]}</span>
        <span data-story-meta>LUNAR</span>
      </div>
      <div>
        <h2 className="text-[clamp(2.1rem,5.6vw,6.4rem)] font-medium leading-[0.96] tracking-[-0.035em] text-foreground">
          <MaskedLines lines={copy.storyLines[lang]} attr={`data-${attrPrefix}-line`} />
        </h2>
        <div data-story-copy className="mt-8 grid gap-6 border-t border-line pt-6 md:grid-cols-2 md:gap-16 md:pt-8">
          <p className="max-w-md text-lg leading-relaxed text-muted">{copy.storyBody[lang]}</p>
          <div className="md:justify-self-end">
            <Button href="/#solutions" variant="primary" className="!px-6 !py-3.5">
              <AnimatedText text={copy.storyCta[lang]} />
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function CinematicHero() {
  const { lang } = useLanguage();
  const [mode, setMode] = useState<"static" | "cinematic">("static");
  const [ready, setReady] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);

  // Decide once on mount. First paint is always the static hero, so content never waits on 3D.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && webglAvailable()) setMode("cinematic");
  }, []);

  useEffect(() => {
    if (mode !== "cinematic") return;
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    const story = storyRef.current;
    const shade = shadeRef.current;
    if (!wrap || !stage || !canvas || !hero || !story || !shade) return;

    gsap.registerPlugin(ScrollTrigger);

    let scene: MoonScene;
    try {
      scene = createMoonScene(canvas, { mobile: window.innerWidth < 768 });
    } catch {
      setMode("static");
      return;
    }

    const progress = { v: 0 };
    let visible = true;
    let frame = 0;
    let first = true;

    const size = () => scene.resize(stage.clientWidth, stage.clientHeight);
    size();
    const ro = new ResizeObserver(() => {
      size();
      ScrollTrigger.refresh();
    });
    ro.observe(stage);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "100px" });
    io.observe(stage);

    const onLost = (e: Event) => {
      e.preventDefault();
      setMode("static");
    };
    canvas.addEventListener("webglcontextlost", onLost);

    const tick = (time: number) => {
      if (!visible && !first) return;
      scene.update(progress.v, time);
      frame++;
      if (first) {
        first = false;
        setReady(true);
      }
    };
    gsap.ticker.add(tick);

    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (ctx) => {
      const isMobile = !!ctx.conditions?.mobile;
      const length = () => window.innerHeight * (isMobile ? 3.4 : 4.2);

      const heroLines = hero.querySelectorAll("[data-hero-line]");
      const heroCopy = hero.querySelectorAll("[data-hero-copy]");
      const heroKicker = hero.querySelectorAll("[data-hero-kicker]");
      const scrollHint = hero.querySelectorAll("[data-hero-hint]");
      const storyLines = story.querySelectorAll("[data-story-line]");
      const storyCopy = story.querySelectorAll("[data-story-copy]");
      const storyMeta = story.querySelectorAll("[data-story-meta]");

      gsap.set(story, { autoAlpha: 0 });
      gsap.set(storyLines, { yPercent: 112 });
      gsap.set(storyCopy, { autoAlpha: 0, y: 30 });
      gsap.set(storyMeta, { autoAlpha: 0 });

      // ONE master timeline, duration 1 === scroll progress 0..1. The 3D scene reads `progress.v`;
      // the type layers are scrubbed by the same clock, so nothing runs on its own schedule.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${length()}`,
          pin: stage,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const light = self.progress > 0.82 ? "true" : "false";
            if (stage.dataset.navLight !== light) {
              stage.dataset.navLight = light;
              window.dispatchEvent(new Event("lunar:nav")); // header re-samples what is under it
            }
          },
        },
      });

      tl.to(progress, { v: 1, duration: 1 }, 0);
      // the legibility shade belongs to the dark opening only; it leaves with the dark
      tl.to(shade, { opacity: 0, duration: 0.3 }, 0.18);

      // Headline travels at its own depth (faster than the scene), then wipes out through its mask.
      tl.to(hero, { y: () => -window.innerHeight * 0.22, duration: 0.4 }, 0);
      tl.to(heroKicker, { autoAlpha: 0, duration: 0.08 }, 0.1);
      tl.to(scrollHint, { autoAlpha: 0, duration: 0.05 }, 0.02);
      tl.to(heroCopy, { autoAlpha: 0, y: -30, duration: 0.12 }, 0.14);
      tl.to(heroLines, { yPercent: -112, duration: 0.14, stagger: 0.04, ease: "power2.in" }, 0.24);
      tl.set(hero, { autoAlpha: 0 }, 0.42);

      // Story resolves only after the dawn has covered the frame, so it is readable the moment it appears.
      tl.set(story, { autoAlpha: 1 }, 0.8);
      tl.to(storyMeta, { autoAlpha: 1, duration: 0.06 }, 0.84);
      tl.to(storyLines, { yPercent: 0, duration: 0.12, stagger: 0.04, ease: "power3.out" }, 0.84);
      tl.to(storyCopy, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.92);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([hero, story, shade, ...heroLines, ...storyLines, ...heroCopy, ...storyCopy, ...heroKicker, ...scrollHint, ...storyMeta], { clearProps: "all" });
      };
    });

    // Anchors on this page (e.g. /#position) are measured before the pin exists; re-seat them once it does.
    if (window.location.hash) {
      ScrollTrigger.refresh();
      document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    }

    // Expose for diagnostics / visual testing.
    (window as unknown as { __lunarHero?: object }).__lunarHero = { progress, frames: () => frame };

    return () => {
      gsap.ticker.remove(tick);
      mm.revert();
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      scene.dispose();
      delete (window as unknown as { __lunarHero?: object }).__lunarHero;
      setReady(false);
    };
  }, [mode]);

  const cinematic = mode === "cinematic";

  return (
    <>
      <div ref={wrapRef} className="relative">
        <div
          ref={stageRef}
          data-nav-light="false"
          className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#090A0E] text-foreground"
        >
          {/* Static Moon: first paint, reduced-motion and no-WebGL fallback. Hidden once WebGL has drawn. */}
          <div
            aria-hidden
            className={`absolute inset-0 transition-opacity duration-700 ${cinematic && ready ? "opacity-0" : "opacity-100"}`}
            style={{
              background:
                "radial-gradient(circle at 78% 62%, #8a8782 0%, #5a5754 38%, #17181c 62%, transparent 63%), radial-gradient(circle at 78% 62%, rgba(255,154,92,0.28) 0%, rgba(255,154,92,0) 55%)",
            }}
          />
          {cinematic && (
            <canvas
              ref={canvasRef}
              aria-hidden
              className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
            />
          )}
          <div
            ref={shadeRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#090A0E]/80 via-[#090A0E]/20 to-transparent"
            style={{ opacity: cinematic ? 0.55 : 1 }}
          />

          {/* Layer A: the hero */}
          <div ref={heroRef} className="absolute inset-0 z-10 will-change-transform">
            <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col justify-end px-5 pb-[9vh] pt-32 sm:px-8">
              <span data-hero-kicker className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-foreground/80">
                <span className="h-px w-8 bg-accent" />
                {copy.kicker[lang]}
              </span>
              <h1 className="text-[clamp(2.7rem,9.4vw,10rem)] font-medium leading-[0.92] tracking-[-0.04em] text-foreground">
                <MaskedLines lines={copy.heroLines[lang]} attr="data-hero-line" />
              </h1>
              <div data-hero-copy className="mt-7 max-w-xl">
                <p className="text-base font-light leading-relaxed text-foreground/75 lg:text-lg">{copy.heroBody[lang]}</p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Button href="/contact" variant="primary" className="!px-7 !py-3.5">
                    <AnimatedText text={copy.catalogue[lang]} />
                    <ArrowRight size={16} />
                  </Button>
                  <Button
                    href={contact.whatsapp("Hello LUNAR, I would like to enquire about your digital engineering and automation solutions.")}
                    newTab
                    variant="secondary"
                    className="border-white/30 bg-black/30 !px-7 !py-3.5 backdrop-blur-md hover:bg-white/10"
                  >
                    <MessageCircle size={16} />
                    <AnimatedText text={copy.whatsapp[lang]} />
                  </Button>
                </div>
              </div>
              <span data-hero-hint className="mt-8 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-technical sm:flex">
                <span className="h-px w-10 bg-line" />
                {copy.scroll[lang]}
              </span>
            </div>
          </div>

          {/* Layer B: the story, inside the same stage so there is no cut. */}
          {cinematic && (
            <div ref={storyRef} className="theme-vars-light absolute inset-0 z-10 text-foreground">
              <StoryContent lang={lang} attrPrefix="story" />
            </div>
          )}
        </div>
      </div>

      {/* Static mode: the story follows as an ordinary section. */}
      {!cinematic && (
        <section data-nav-light="true" className="theme-light relative min-h-[80svh]">
          <StoryContent lang={lang} attrPrefix="static" />
        </section>
      )}
    </>
  );
}
