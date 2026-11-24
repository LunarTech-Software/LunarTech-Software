"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Link2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { bySlug, catLabel, fmtDate, type Article } from "@/lib/insights";
import { contact } from "@/lib/content";
import { ArticleFigure, Cover } from "./Figures";

const mono = "font-mono text-[10px] uppercase tracking-[0.1em]";
const serif = "font-[family-name:var(--font-instrument-serif)]";

function Progress({ target }: { target: React.RefObject<HTMLElement | null> }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = target.current;
      if (!el || !bar.current) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const done = Math.min(1, Math.max(0, (window.innerHeight * 0.3 - r.top) / Math.max(total, 1)));
      bar.current.style.transform = `scaleX(${done})`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, [target]);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div ref={bar} className="h-full origin-left bg-[#E98459]" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

function Toc({ items, active }: { items: { key: string; label: string }[]; active: string }) {
  const { lang } = useLanguage();
  const en = lang === "en";
  const list = (
    <ol className="space-y-1">
      {items.map((it, i) => (
        <li key={it.key}>
          <a href={`#${it.key}`} aria-current={active === it.key ? "true" : undefined} className={`flex gap-3 border-l-2 py-1.5 pl-3 text-[13px] leading-snug transition-colors ${active === it.key ? "border-[#E98459] text-[#17191E]" : "border-[#17191E]/15 text-[#17191E]/55 hover:text-[#17191E]"}`}>
            <span className="font-mono text-[10px] text-[#9a6a4a]">{String(i + 1).padStart(2, "0")}</span>
            {it.label}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <details className="mb-8 rounded-[4px] border border-[#17191E]/25 p-4 lg:hidden">
        <summary className={`${mono} cursor-pointer`}>{en ? "In this article" : "Dalam artikel ini"}</summary>
        <div className="mt-3">{list}</div>
      </details>
      <nav aria-label={en ? "In this article" : "Dalam artikel ini"} className="sticky top-28 hidden lg:block">
        <p className={`${mono} mb-3 text-[#17191E]/60`}>{en ? "In this article" : "Dalam artikel ini"}</p>
        {list}
      </nav>
    </>
  );
}

function Share({ a }: { a: Article }) {
  const { lang } = useLanguage();
  const en = lang === "en";
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = a.title[lang];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard not available: the other links still work */
    }
  };
  const btn = "inline-flex items-center gap-2 rounded-full border border-[#17191E]/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors hover:border-[#17191E]";
  return (
    <div className="flex flex-wrap gap-2">
      <a className={btn} target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`}>
        WhatsApp
      </a>
      <a className={btn} target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>
        LinkedIn
      </a>
      <a className={btn} href={`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`}>
        Email
      </a>
      <button type="button" onClick={copy} className={btn}>
        {copied ? <Check size={12} /> : <Link2 size={12} />}
        {copied ? (en ? "Copied" : "Tersalin") : en ? "Copy link" : "Salin tautan"}
      </button>
    </div>
  );
}

export default function ArticleView({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const en = lang === "en";
  const a = bySlug(slug)!;
  const bodyRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState("");
  const toc = a.body.filter((b) => b.t === "h2").map((b) => ({ key: (b as { key: string }).key, label: (b as { en: string; id: string })[lang] }));

  useEffect(() => {
    const heads = Array.from(document.querySelectorAll<HTMLElement>("[data-h2]"));
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((x, y) => x.boundingClientRect.top - y.boundingClientRect.top)[0];
        if (vis) setActive((vis.target as HTMLElement).id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [lang, slug]);

  const related = (a.related ?? []).map((s) => bySlug(s)).filter(Boolean) as Article[];

  return (
    <article className="theme-light bg-[#F0EAE0] text-[#17191E]">
      <Progress target={bodyRef} />

      <header className="mx-auto max-w-[1400px] px-5 pb-10 pt-36 sm:px-8 lg:pt-44">
        <Link href="/insights" className={`${mono} inline-flex items-center gap-2 text-[#17191E]/60 transition-colors hover:text-[#17191E]`}>
          <ArrowLeft size={12} /> {en ? "Insights" : "Insights"}
        </Link>
        <p className={`${mono} mt-8 flex flex-wrap gap-x-4 gap-y-1 text-[#17191E]/60`}>
          <span className="text-[#c4562a]">{catLabel(a.category)[lang]}</span>
          <span>{fmtDate(a.date, lang)}</span>
          <span>
            {a.readMin} {en ? "min read" : "menit baca"}
          </span>
        </p>
        <h1 className={`${serif} mt-5 max-w-[18ch] text-[clamp(2.8rem,7.4vw,7rem)] font-normal normal-case leading-[0.95] tracking-[-0.02em]`}>{a.title[lang]}</h1>
        <p className="mt-8 max-w-2xl text-[clamp(1.1rem,1.6vw,1.4rem)] leading-relaxed text-[#17191E]/75">{a.dek[lang]}</p>
        <p className={`${mono} mt-6 text-[#17191E]/55`}>{en ? "By the LUNAR team" : "Oleh tim LUNAR"}</p>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Cover kind={a.cover} className="aspect-[21/9] w-full rounded-[4px]" />
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:pt-20">
        <aside className="lg:col-span-3">
          <Toc items={toc} active={active} />
        </aside>
        <div ref={bodyRef as React.RefObject<HTMLDivElement>} className="lg:col-span-7">
          {a.body.map((b, i) => {
            if (b.t === "h2")
              return (
                <h2 key={i} id={b.key} data-h2 className="mt-14 scroll-mt-28 font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-medium normal-case leading-[1.08] tracking-[-0.03em] first:mt-0">
                  <span className="mr-3 font-mono text-[11px] tracking-[0.08em] text-[#9a6a4a]">{String(toc.findIndex((t) => t.key === b.key) + 1).padStart(2, "0")}</span>
                  {b[lang]}
                </h2>
              );
            if (b.t === "p") return <p key={i} className="mt-5 max-w-[66ch] text-[18px] leading-[1.75] text-[#17191E]/85">{b[lang]}</p>;
            if (b.t === "ul")
              return (
                <ul key={i} className="mt-5 max-w-[66ch] space-y-2.5 text-[18px] leading-[1.65] text-[#17191E]/85">
                  {b.items.map((it) => (
                    <li key={it.en} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-[#C18D6B]" />
                      {it[lang]}
                    </li>
                  ))}
                </ul>
              );
            if (b.t === "ol")
              return (
                <ol key={i} className="mt-5 max-w-[66ch] space-y-3 text-[18px] leading-[1.65]">
                  {b.items.map((it, n) => (
                    <li key={it.en} className="grid grid-cols-[2rem_1fr] gap-2">
                      <span className="font-mono text-[12px] text-[#9a6a4a]">{String(n + 1).padStart(2, "0")}</span>
                      {it[lang]}
                    </li>
                  ))}
                </ol>
              );
            if (b.t === "quote")
              return (
                <blockquote key={i} className={`${serif} my-12 max-w-[24ch] border-l-2 border-[#E98459] pl-6 text-[clamp(1.8rem,3.2vw,2.8rem)] italic leading-[1.1]`}>
                  {b[lang]}
                </blockquote>
              );
            if (b.t === "note")
              return (
                <aside key={i} className="my-10 max-w-[66ch] rounded-[4px] border border-[#17191E]/25 bg-[#17191E]/[0.04] p-5 text-[15px] leading-relaxed text-[#17191E]/80">
                  <span className={`${mono} mb-2 block text-[#9a6a4a]`}>{en ? "A note" : "Catatan"}</span>
                  {b[lang]}
                </aside>
              );
            return <ArticleFigure key={i} fig={b.fig} />;
          })}

          <div className="mt-14 border-t border-[#17191E]/80 pt-6">
            <p className={`${mono} mb-3 text-[#17191E]/60`}>{en ? "Share" : "Bagikan"}</p>
            <Share a={a} />
          </div>
        </div>
      </div>

      <section className="bg-[#090A0E] text-[#F0EAE0]">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-6">
            <p className={`${mono} text-[#C18D6B]`}>{en ? "From reading to doing" : "Dari membaca ke bertindak"}</p>
            <h2 className="mt-4 max-w-[16ch] text-[clamp(1.9rem,4vw,3.6rem)] font-medium normal-case leading-[1] tracking-[-0.035em]">{en ? "Want to talk about your own operation?" : "Ingin membahas operasi Anda sendiri?"}</h2>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={a.cta.href} className="inline-flex items-center gap-2 rounded-full bg-[#F0EAE0] px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#090A0E] transition-colors hover:bg-[#E98459]">
                {a.cta.label[lang]} <ArrowUpRight size={14} />
              </Link>
              <a href={contact.whatsapp(`Hello LUNAR, I read "${a.title.en}" and would like to discuss it.`)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#F0EAE0]/40 px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] transition-colors hover:border-[#F0EAE0]">
                WhatsApp
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            <p className={`${mono} mb-4 text-[#F0EAE0]/60`}>{en ? "Keep reading" : "Lanjut membaca"}</p>
            {related.map((r, i) => (
              <Link key={r.slug} href={`/insights/${r.slug}`} className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-[#F0EAE0]/25 py-5">
                <span>
                  <span className={`${mono} text-[#F0EAE0]/55`}>
                    {String(i + 1).padStart(2, "0")} / {catLabel(r.category)[lang]}
                  </span>
                  <span className={`${serif} mt-1 block text-[clamp(1.5rem,2.4vw,2.2rem)] leading-[1.05]`}>
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">{r.title[lang]}</span>
                  </span>
                </span>
                <ArrowUpRight size={16} className="text-[#E98459]" />
              </Link>
            ))}
            <div className="border-t border-[#F0EAE0]/25" />
          </div>
        </div>
      </section>
    </article>
  );
}
