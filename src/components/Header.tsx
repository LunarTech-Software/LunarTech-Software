"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { navLinks, contact, solutions } from "@/lib/content";
import Button from "@/components/ui/Button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-colors duration-300 sm:px-8 sm:py-5 ${
          scrolled ? "border-b border-line bg-void/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <Link href="/" className="text-sm font-medium tracking-tight text-foreground">
          LUNAR
        </Link>

        <nav className="hidden items-center gap-7 text-[14px] text-muted lg:flex">
          {navLinks.map((link) =>
            link.href === "/#solutions" ? (
              <div
                key={link.href}
                ref={solutionsRef}
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setSolutionsOpen((v) => !v)}
                  aria-expanded={solutionsOpen}
                  className="flex items-center gap-1 transition-colors hover:text-foreground"
                >
                  {t(link.label)}
                  <ChevronDown size={13} className={`transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full z-10 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-line bg-void/95 p-2 shadow-2xl backdrop-blur-md"
                    >
                      {solutions.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/solutions/${s.slug}`}
                          onClick={() => setSolutionsOpen(false)}
                          className="block rounded-xl px-4 py-2.5 text-sm text-muted transition-colors hover:bg-accent-soft hover:text-accent"
                        >
                          {t(s.name)}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                {t(link.label)}
              </Link>
            ),
          )}
        </nav>

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
            {lang === "en" ? "Request Catalogue" : "Minta Katalog"}
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
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-void/98 backdrop-blur-sm lg:hidden"
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-7 py-28">
              {navLinks.map((link, i) =>
                link.href === "/#solutions" ? (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <button
                      type="button"
                      onClick={() => setMobileSolutionsOpen((v) => !v)}
                      aria-expanded={mobileSolutionsOpen}
                      className="flex items-center gap-2 text-3xl font-medium tracking-tight text-foreground"
                    >
                      {t(link.label)}
                      <ChevronDown size={22} className={`transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileSolutionsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-4 flex flex-col items-center gap-4 overflow-hidden"
                        >
                          {solutions.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/solutions/${s.slug}`}
                              onClick={() => setOpen(false)}
                              className="text-base text-muted transition-colors hover:text-accent"
                            >
                              {t(s.name)}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <Link href={link.href} onClick={() => setOpen(false)} className="text-3xl font-medium tracking-tight text-foreground">
                      {t(link.label)}
                    </Link>
                  </motion.div>
                ),
              )}
              <div className="mt-6 flex w-64 flex-col items-center gap-4">
                <Button href="/contact" variant="primary" className="w-full" onClick={() => setOpen(false)}>
                  {lang === "en" ? "Request Catalogue" : "Minta Katalog"}
                </Button>
                <Button href={contact.whatsapp("Hello LUNAR, I would like to enquire about your digital engineering and automation solutions.")} newTab variant="secondary" className="w-full">
                  <MessageCircle size={16} /> {lang === "en" ? "Chat on WhatsApp" : "Chat di WhatsApp"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
