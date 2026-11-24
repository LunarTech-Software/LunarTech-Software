"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { contact } from "@/lib/content";
import { useStage } from "./useStage";

/**
 * SCENE 09: the closing scene.
 * Quiet and deliberate: the crescent-Moon-and-star mark returns, large and cropped at the right,
 * and settles as you scroll (a slight turn and scale, nothing else moves). Headline and both
 * actions sit left. The picture is the only artwork; no extra marks or orbits compete with the type.
 */

export default function FinalScene() {
  const { lang } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  useStage(wrapRef, (p) => {
    const a = Math.min(1, Math.max(0, (p - 0.04) / 0.7));
    stageRef.current?.style.setProperty("--a", String(a * a * (3 - 2 * a)));
  });

  const title = lang === "en" ? ["LET'S BUILD", "WHAT'S NEXT."] : ["MARI BANGUN", "YANG BERIKUTNYA."];

  return (
    <section ref={wrapRef} aria-label={title.join(" ")} className="stage-wrap relative z-10 -mt-[9vw] bg-[#090A0E] text-[#F0EAE0]" style={{ height: "230svh", borderRadius: "50% 50% 0 0 / 9vw 9vw 0 0" }}>
      <div ref={stageRef} className="stage-sticky sticky top-0 h-[100svh] overflow-hidden" style={{ ["--a" as string]: 0 }}>
        {/* the mark, large and cropped; it turns slightly and settles with scroll */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/space/moon-mark.webp"
          alt=""
          aria-hidden
          width={1100}
          height={1100}
          className="pointer-events-none absolute right-[-12vw] top-[12vh] h-[80vw] w-[80vw] max-w-none select-none [--ty:0px] sm:right-[-10vw] sm:top-1/2 sm:h-[min(98vh,64vw)] sm:w-[min(98vh,64vw)] sm:[--ty:-50%]"
          style={{
            transform: "translateY(var(--ty)) scale(calc(0.86 + (0.14 * var(--a)))) rotate(calc((1 - var(--a)) * -9deg))",
            opacity: "calc(0.3 + (0.7 * var(--a)))",
          }}
        />
        {/* protect the type on the left */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-[#090A0E] via-[#090A0E]/80 to-transparent sm:block" />

        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-20 sm:justify-center sm:px-8 sm:pb-0">
          <span className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-copper">
            <span className="h-px w-8 bg-copper" />
            {lang === "en" ? "Start a project" : "Mulai proyek"}
          </span>
          <h2 className="font-display text-[clamp(2.7rem,7.6vw,8.4rem)] font-medium uppercase leading-[0.93] tracking-[-0.045em]">
            {title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="mt-8 max-w-md text-[17px] leading-relaxed text-[#F0EAE0]/75">
            {lang === "en" ? "Tell us what your business needs. We'll engineer the right solution together." : "Ceritakan apa yang dibutuhkan bisnis Anda. Kami akan merekayasa solusi yang tepat bersama."}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-[#F0EAE0] px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#090A0E] transition-colors hover:bg-solar">
              {lang === "en" ? "Start a project" : "Mulai proyek"}
              <ArrowUpRight size={14} />
            </Link>
            <a href={contact.mailto} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#F0EAE0] transition-colors hover:bg-white/10">
              {lang === "en" ? "Contact us" : "Hubungi kami"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
