"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/lib/language-context";
import { contact } from "@/lib/content";
import RollText from "@/components/nav/RollText";
import { internalNav } from "./nav";

const isActive = (href: string, pathname: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

export default function InternalHeader() {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(1);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // flip the bar to dark ink whenever it sits over an ivory surface
  useEffect(() => {
    let raf = 0;
    const sample = () => {
      raf = 0;
      const under = document.elementsFromPoint(window.innerWidth / 2, 32).find((el) => !headerRef.current?.contains(el));
      setOnLight(!!under?.closest('.theme-light,[data-nav-light="true"]'));
    };
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (!raf) raf = requestAnimationFrame(sample);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("lunar:nav", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("lunar:nav", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // menu: lock scroll, Escape closes, focus moves in
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true }));
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
  }, [open]);

  const ink = onLight && !open;

  return (
    <>
      <header
        ref={headerRef}
        className={`${ink ? "theme-vars-light " : ""}fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled && !open ? "border-b border-line bg-void/85 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto grid max-w-[1800px] grid-cols-[1fr_auto_1fr] items-center px-5 py-4 sm:px-8 sm:py-5">
          <Link href="/" aria-label="LUNAR" className="justify-self-start font-display text-xl font-medium uppercase tracking-[0.04em] text-foreground">
            LUNAR
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="group/roll flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-foreground"
          >
            <span aria-hidden className="flex items-center gap-[3px]">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`h-[3px] w-[3px] rounded-full bg-copper transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? "scale-[1.6]" : "group-hover/roll:scale-[1.6]"}`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                />
              ))}
            </span>
            <span className="sr-only">{open ? (lang === "en" ? "Close menu" : "Tutup menu") : lang === "en" ? "Open menu" : "Buka menu"}</span>
            <RollText text={open ? (lang === "en" ? "Close" : "Tutup") : "Menu"} />
          </button>

          <div className="flex items-center gap-4 justify-self-end">
            <div className="hidden items-center gap-1 font-mono text-[11px] uppercase text-technical sm:flex">
              {(["en", "id"] as const).map((l, i) => (
                <span key={l} className="flex items-center gap-1">
                  {i > 0 && <span aria-hidden>/</span>}
                  <button type="button" onClick={() => setLang(l)} aria-pressed={lang === l} className={lang === l ? "text-foreground" : "transition-colors hover:text-foreground"}>
                    {l}
                  </button>
                </span>
              ))}
            </div>
            <Link
              href="/contact"
              className="group/roll hidden rounded-full bg-foreground px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-void transition-colors hover:bg-accent sm:inline-flex"
            >
              <RollText text={lang === "en" ? "Start a project" : "Mulai proyek"} className="[&_span>span:last-child]:!text-void" />
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label={lang === "en" ? "Site menu" : "Menu situs"}
            initial={{ clipPath: "circle(0% at 50% 2.5rem)" }}
            animate={{ clipPath: "circle(150% at 50% 2.5rem)" }}
            exit={{ clipPath: "circle(0% at 50% 2.5rem)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#090A0E] text-[#F0EAE0]"
          >
            {/* orbit geometry that turns toward the item under the pointer */}
            <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
            <motion.div
              animate={{ rotate: hoverIdx * 24 }}
              transition={{ type: "spring", stiffness: 36, damping: 14 }}
              className="absolute -right-[22vw] top-1/2 h-[min(120vh,980px)] w-[min(120vh,980px)] -translate-y-1/2"
            >
              <svg viewBox="-200 -200 400 400" className="h-full w-full">
                {[55, 95, 135, 190].map((r, i) => (
                  <circle key={r} r={r} fill="none" stroke="#C18D6B" strokeWidth={0.5} opacity={0.18 + i * 0.07} />
                ))}
                <circle r={95} fill="none" stroke="#F0EAE0" strokeWidth={3} strokeDasharray="1 11.9" opacity={0.28} />
                <g transform="rotate(-24)">
                  <ellipse rx={170} ry={60} fill="none" stroke="#F0EAE0" strokeWidth={0.6} opacity={0.4} />
                  <circle r={3} fill="#E98459">
                    <animateMotion dur="7s" repeatCount="indefinite" path="M170,0 A170,60 0 1,1 -170,0 A170,60 0 1,1 170,0" />
                  </circle>
                </g>
              </svg>
            </motion.div>
            </div>

            <nav aria-label="Primary" className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 pb-6 pt-28 sm:px-8">
              <ul>
                {internalNav.map((item, i) => {
                  const active = isActive(item.href, pathname);
                  return (
                    <li key={item.href} className="overflow-hidden border-b border-white/[0.07] last:border-b-0">
                      <motion.div
                        initial={{ y: "105%" }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 + i * 0.055, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          onPointerEnter={() => setHoverIdx(i)}
                          onFocus={() => setHoverIdx(i)}
                          aria-current={active ? "page" : undefined}
                          aria-label={t(item.label)}
                          className="group/roll flex items-center gap-4 py-2 sm:gap-8 sm:py-[0.6vh]"
                        >
                          <span aria-hidden className="w-8 font-mono text-[11px] tracking-[0.1em] text-copper">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <RollText
                            text={t(item.label).toUpperCase()}
                            stagger={26}
                            className={`font-display text-[clamp(2.2rem,min(9.2vh,12.5vw),7.5rem)] font-medium leading-[1.02] tracking-[-0.03em] ${active ? "text-[#F0EAE0]" : "text-[#F0EAE0]/60"}`}
                          />
                          {active && <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-solar" />}
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-4 border-t border-white/10 px-5 pb-8 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#F0EAE0]/50">
                {lang === "en" ? "Connect with us" : "Hubungi kami"}
                <a href={contact.mailto} className="mt-1 block text-base normal-case tracking-normal text-[#F0EAE0] transition-colors hover:text-solar">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-4 font-mono text-[11px] uppercase text-[#F0EAE0]/60">
                {(["en", "id"] as const).map((l) => (
                  <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l} className={lang === l ? "text-[#F0EAE0]" : "transition-colors hover:text-[#F0EAE0]"}>
                    {l}
                  </button>
                ))}
                <Link href="/contact" onClick={() => setOpen(false)} className="rounded-full border border-white/25 px-5 py-2.5 text-[#F0EAE0] transition-colors hover:bg-white/10 sm:hidden">
                  {lang === "en" ? "Start a project" : "Mulai proyek"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
