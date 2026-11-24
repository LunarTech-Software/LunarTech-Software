"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { navLinks, contact } from "@/lib/content";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";
import { hubSolutions } from "@/lib/solutionsHub";
import DesktopNav from "@/components/nav/DesktopNav";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const solutionsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [activeIdx, setActiveIdx] = useState(0);
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    let raf = 0;
    const sample = () => {
      raf = 0;
      // Which surface is under the header? Light sections and the cinematic stage (once it turns ivory) flip the nav.
      const under = document.elementsFromPoint(window.innerWidth / 2, 44).find((el) => !headerRef.current?.contains(el));
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
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("a,button")?.focus({ preventScroll: true }));
    return () => {
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!solutionsOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [solutionsOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`${onLight && !open ? "theme-vars-light " : ""}fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "border-b border-line bg-void/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div
          className={`hidden items-center justify-between overflow-hidden border-b border-line-soft px-8 font-mono text-[10px] uppercase tracking-[0.08em] text-technical transition-all duration-300 sm:flex ${
            scrolled ? "max-h-0 border-transparent py-0 opacity-0" : "max-h-10 py-2 opacity-100"
          }`}
        >
          <span>
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent align-middle" />
            {lang === "en" ? "Taking on new projects" : "Menerima proyek baru"}
          </span>
          <span className="flex items-center gap-4">
            <Link href="/our-work" className="transition-colors hover:text-foreground">
              {lang === "en" ? "Our work" : "Karya kami"}
            </Link>
            <span aria-hidden>|</span>
            <a href={contact.mailto} className="transition-colors hover:text-foreground">
              {contact.email}
            </a>
          </span>
        </div>
        <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <Link href="/" aria-label="LUNAR" className="flex items-baseline font-display text-xl font-medium uppercase tracking-[0.04em] text-foreground">
          <span aria-hidden>L</span>
          <span
            aria-hidden
            className={`inline-block overflow-hidden transition-all duration-500 ease-in-out ${scrolled ? "max-w-0 opacity-0" : "max-w-[1.2em] opacity-100"}`}
          >
            U
          </span>
          <span aria-hidden>N</span>
          <span
            aria-hidden
            className={`inline-block overflow-hidden transition-all duration-500 ease-in-out ${scrolled ? "max-w-0 opacity-0" : "max-w-[1.2em] opacity-100"}`}
          >
            A
          </span>
          <span aria-hidden>R</span>
        </Link>

        <DesktopNav />

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-1 text-xs text-technical">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={lang === "en" ? "text-foreground" : "hover:text-foreground"}
            >
              en
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => setLang("id")}
              className={lang === "id" ? "text-foreground" : "hover:text-foreground"}
            >
              id
            </button>
          </div>
          <Button href="/contact" variant="primary" className="!px-5 !py-2.5 text-xs">
            <AnimatedText text={lang === "en" ? "Request Catalogue" : "Minta Katalog"} />
          </Button>
        </div>

        <button
          className="relative flex h-8 w-8 flex-col items-center justify-center gap-[6px] lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className={`h-[2px] w-6 bg-foreground transition-all duration-300 ${open ? "translate-y-[8px] rotate-45" : ""}`} />
          <span className={`h-[2px] w-6 bg-foreground transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-6 bg-foreground transition-all duration-300 ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
        </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={lang === "en" ? "Menu" : "Menu navigasi"}
            initial={{ clipPath: "circle(0% at calc(100% - 2rem) 2.4rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2rem) 2.4rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2rem) 2.4rem)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#090A0E] text-[#F0EAE0] lg:hidden"
          >
            {/* orbit artwork that turns toward the selected item */}
            <motion.div
              aria-hidden
              animate={{ rotate: activeIdx * 28 }}
              transition={{ type: "spring", stiffness: 40, damping: 14 }}
              className="pointer-events-none absolute -right-[38vw] top-[18vh] h-[110vw] w-[110vw] max-h-[780px] max-w-[780px]"
            >
              <svg viewBox="-200 -200 400 400" className="h-full w-full">
                {[60, 100, 140, 190].map((r, i) => (
                  <circle key={r} r={r} fill="none" stroke="#C18D6B" strokeWidth={0.6} opacity={0.2 + i * 0.07} />
                ))}
                <circle r={100} fill="none" stroke="#F0EAE0" strokeWidth={3} strokeDasharray="1 11.8" opacity={0.3} />
                <g transform="rotate(-24)">
                  <ellipse rx={170} ry={60} fill="none" stroke="#F0EAE0" strokeWidth={0.7} opacity={0.4} />
                  <circle r={3} fill="#E98459">
                    <animateMotion dur="6s" repeatCount="indefinite" path="M170,0 A170,60 0 1,1 -170,0 A170,60 0 1,1 170,0" />
                  </circle>
                </g>
              </svg>
            </motion.div>

            <nav aria-label="Menu" className="relative z-10 flex flex-1 flex-col justify-center gap-1 px-6 pb-8 pt-28">
              {navLinks.map((link, i) => {
                const current =
                  (link.href === "/our-work" && pathname.startsWith("/our-work")) ||
                  (link.href === "/contact" && pathname.startsWith("/contact")) ||
                  (link.href === "/solutions" && pathname.startsWith("/solutions")) ||
                  (link.href === "/about" && pathname.startsWith("/about"));
                const labelCls =
                  "relative block font-display text-[clamp(2.3rem,11.5vw,3.8rem)] font-medium uppercase leading-[1.02] tracking-[-0.03em] text-[#F0EAE0]";
                const row = (
                  <>
                    <span aria-hidden className="mb-1 mr-3 inline-block w-6 align-top font-mono text-[10px] tracking-[0.1em] text-[#C18D6B]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-block overflow-hidden align-bottom">
                      <motion.span
                        className="relative inline-block"
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.22 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {t(link.label)}
                      </motion.span>
                    </span>
                    {current && <span aria-hidden className="ml-3 inline-block h-2 w-2 rounded-full bg-[#E98459] align-middle" />}
                  </>
                );
                return link.href === "/solutions" ? (
                  <div key={link.href} onPointerEnter={() => setActiveIdx(i)}>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileSolutionsOpen((v) => !v);
                        setActiveIdx(i);
                      }}
                      aria-expanded={mobileSolutionsOpen}
                      className={`${labelCls} w-full py-1.5 text-left`}
                    >
                      {row}
                      <ChevronDown size={20} aria-hidden className={`ml-3 inline-block transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileSolutionsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <ul className="flex flex-col gap-1 border-l border-[#C18D6B]/40 py-2 pl-5">
                            <li>
                              <Link href="/solutions" onClick={() => setOpen(false)} className="block py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-[#F0EAE0]/70">
                                {lang === "en" ? "All solutions" : "Semua solusi"}
                              </Link>
                            </li>
                            {hubSolutions.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/solutions/${s.slug}`}
                                  onClick={() => setOpen(false)}
                                  className="block py-2 text-[15px] text-[#F0EAE0]/75 transition-colors active:text-[#E98459]"
                                >
                                  {t(s.name)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    onPointerEnter={() => setActiveIdx(i)}
                    onFocus={() => setActiveIdx(i)}
                    aria-current={current ? "page" : undefined}
                    className={`${labelCls} py-1.5`}
                  >
                    {row}
                  </Link>
                );
              })}
            </nav>

            <div className="relative z-10 flex flex-col gap-4 border-t border-white/10 px-6 pb-8 pt-6">
              <div className="flex gap-3">
                <Button href="/contact" variant="primary" className="flex-1 justify-center" onClick={() => setOpen(false)}>
                  {lang === "en" ? "Request Catalogue" : "Minta Katalog"}
                </Button>
                <Button href={contact.whatsapp("Hello LUNAR, I would like to enquire about your digital engineering and automation solutions.")} newTab variant="secondary" className="flex-1 justify-center border-white/25 text-[#F0EAE0]">
                  <MessageCircle size={15} /> WhatsApp
                </Button>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-[#F0EAE0]/60">
                <span>{contact.email}</span>
                <span className="flex gap-2">
                  <button type="button" onClick={() => setLang("en")} className={lang === "en" ? "text-[#F0EAE0]" : ""}>en</button>
                  <span>/</span>
                  <button type="button" onClick={() => setLang("id")} className={lang === "id" ? "text-[#F0EAE0]" : ""}>id</button>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
