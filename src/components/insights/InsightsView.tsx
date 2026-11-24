"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { catLabel, categories, fmtDate, sorted, type Article, type Cat } from "@/lib/insights";
import { Cover } from "./Figures";

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";
const serif = "font-[family-name:var(--font-instrument-serif)]";
const PAGE = 6;

/** A cover that leans a few degrees toward the pointer. Restrained, and off when motion is reduced. */
function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`transition-transform duration-300 ease-out will-change-transform ${className}`}>
      {children}
    </div>
  );
}

function Meta({ a, dark }: { a: Article; dark?: boolean }) {
  const { lang } = useLanguage();
  return (
    <p className={`${mono} flex flex-wrap items-center gap-x-3 gap-y-1 ${dark ? "text-[#F0EAE0]/65" : "text-[#17191E]/60"}`}>
      <span className="text-[#E98459]">{catLabel(a.category)[lang]}</span>
      <span>{fmtDate(a.date, lang)}</span>
      <span>
        {a.readMin} {lang === "en" ? "min read" : "menit baca"}
      </span>
    </p>
  );
}

function Featured({ a }: { a: Article }) {
  const { lang } = useLanguage();
  const en = lang === "en";
  return (
    <section className="bg-[#090A0E] pb-20 text-[#F0EAE0] lg:pb-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Link href={`/insights/${a.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Tilt className="lg:col-span-7">
            <Cover kind={a.cover} className="aspect-[16/11] w-full rounded-[4px] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]" />
          </Tilt>
          <div className="lg:col-span-5">
            <p className={`${mono} mb-4 text-[#C18D6B]`}>{en ? "Cover story" : "Cerita utama"}</p>
            <Meta a={a} dark />
            <h2 className={`${serif} mt-4 text-[clamp(2.2rem,4.4vw,4.2rem)] font-normal normal-case leading-[1.02] tracking-[-0.01em]`}>
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">{a.title[lang]}</span>
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#F0EAE0]/75">{a.dek[lang]}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#E98459]">
              {en ? "Read the article" : "Baca artikel"} <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function Large({ a }: { a: Article }) {
  const { lang } = useLanguage();
  return (
    <Link href={`/insights/${a.slug}`} className="group grid gap-6 border-t border-[#17191E]/80 py-8 lg:grid-cols-12 lg:gap-10">
      <Tilt className="lg:col-span-7">
        <Cover kind={a.cover} className="aspect-[16/10] w-full rounded-[3px]" />
      </Tilt>
      <div className="lg:col-span-5">
        <Meta a={a} />
        <h3 className={`${serif} mt-3 text-[clamp(1.9rem,3.2vw,3rem)] font-normal normal-case leading-[1.04]`}>
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">{a.title[lang]}</span>
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#17191E]/70">{a.description[lang]}</p>
      </div>
    </Link>
  );
}

function Medium({ a }: { a: Article }) {
  const { lang } = useLanguage();
  return (
    <Link href={`/insights/${a.slug}`} className="group block border-t border-[#17191E]/80 pt-6">
      <Tilt>
        <Cover kind={a.cover} className="aspect-[4/3] w-full rounded-[3px]" />
      </Tilt>
      <div className="mt-4">
        <Meta a={a} />
        <h3 className={`${serif} mt-2 text-[clamp(1.6rem,2.4vw,2.3rem)] font-normal normal-case leading-[1.05]`}>
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">{a.title[lang]}</span>
        </h3>
      </div>
    </Link>
  );
}

function Row({ a, i }: { a: Article; i: number }) {
  const { lang } = useLanguage();
  return (
    <Link href={`/insights/${a.slug}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-t border-[#17191E]/25 py-4 transition-colors hover:bg-[#17191E]/[0.03]">
      <span className="font-mono text-[10px] text-[#9a6a4a]">{String(i).padStart(2, "0")}</span>
      <span>
        <span className="font-display text-[clamp(1.1rem,1.8vw,1.5rem)] font-medium leading-tight tracking-[-0.02em]">{a.title[lang]}</span>
        <span className="mt-1 block text-[13px] text-[#17191E]/60">{catLabel(a.category)[lang]}</span>
      </span>
      <ArrowUpRight size={16} className="text-[#17191E]/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

export default function InsightsView() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const [cat, setCat] = useState<Cat | "all">("all");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);
  const all = useMemo(() => sorted(), []);
  const featured = all[0];

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return all.filter((a) => (cat === "all" || a.category === cat) && (!needle || `${a.title[lang]} ${a.dek[lang]} ${a.tags.join(" ")}`.toLowerCase().includes(needle)));
  }, [all, cat, q, lang]);
  const list = results.slice(0, shown);
  const filtering = cat !== "all" || q.trim() !== "";
  const pool = filtering ? list : list.filter((a) => a.slug !== featured.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-[#090A0E] pb-16 pt-40 text-[#F0EAE0] lg:pb-20 lg:pt-52">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <span className={`${mono} text-[#C18D6B]`}>Insights</span>
          <h1 className={`${serif} mt-5 max-w-[11ch] text-[clamp(3.6rem,11vw,10.5rem)] font-normal normal-case leading-[0.88] tracking-[-0.025em]`}>{en ? "Ideas that move business forward." : "Gagasan yang menggerakkan bisnis."}</h1>
          <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-[#F0EAE0]/75">
            {en ? "Perspectives on business technology, intelligent systems, automation, and building a more connected operation." : "Perspektif tentang teknologi bisnis, sistem cerdas, otomasi, dan membangun operasi yang lebih terhubung."}
          </p>
        </div>
      </section>

      <Featured a={featured} />

      <section id="articles" className="theme-light bg-[#F0EAE0] text-[#17191E]">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div role="tablist" aria-label={en ? "Categories" : "Kategori"} className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={cat === c.key}
                  onClick={() => {
                    setCat(c.key);
                    setShown(PAGE);
                  }}
                  className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${cat === c.key ? "border-[#17191E] bg-[#17191E] text-[#F0EAE0]" : "border-[#17191E]/30 hover:border-[#17191E]"}`}
                >
                  {c.label[lang]}
                </button>
              ))}
            </div>
            <label className="relative block lg:w-72">
              <span className="sr-only">{en ? "Search articles" : "Cari artikel"}</span>
              <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#17191E]/50" />
              <input
                type="search"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setShown(PAGE);
                }}
                placeholder={en ? "Search articles" : "Cari artikel"}
                className="w-full rounded-full border border-[#17191E]/30 bg-transparent py-2.5 pl-10 pr-4 text-[14px] outline-none transition-colors placeholder:text-[#17191E]/45 focus:border-[#17191E]"
              />
            </label>
          </div>

          <div className="mt-10" aria-live="polite">
            {pool.length === 0 ? (
              <p className="border-t border-[#17191E]/80 py-10 text-[15px] text-[#17191E]/70">{en ? "No articles match that yet." : "Belum ada artikel yang cocok."}</p>
            ) : (
              <>
                {pool[0] && <Large a={pool[0]} />}
                {pool.length > 1 && (
                  <div className="mt-6 grid gap-8 md:grid-cols-2">
                    {pool.slice(1, 3).map((a) => (
                      <Medium key={a.slug} a={a} />
                    ))}
                  </div>
                )}
                {pool.length > 3 && (
                  <div className="mt-10">
                    {pool.slice(3).map((a, i) => (
                      <Row key={a.slug} a={a} i={i + 4} />
                    ))}
                    <div className="border-t border-[#17191E]/25" />
                  </div>
                )}
              </>
            )}
          </div>

          {results.length > shown && (
            <button onClick={() => setShown((n) => n + PAGE)} className="mt-10 rounded-full border border-[#17191E]/40 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors hover:border-[#17191E]">
              {en ? "Load more" : "Muat lagi"}
            </button>
          )}
        </div>
      </section>

      <section className="bg-[#090A0E] text-[#F0EAE0]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-24">
          <h2 className="max-w-[16ch] text-[clamp(2rem,5vw,4.6rem)] font-medium normal-case leading-[0.98] tracking-[-0.04em]">{en ? "Have a problem to think through?" : "Punya masalah untuk dipikirkan bersama?"}</h2>
          <Link href="/contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F0EAE0] px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#090A0E] transition-colors hover:bg-[#E98459]">
            {en ? "Start a project" : "Mulai proyek"} <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
