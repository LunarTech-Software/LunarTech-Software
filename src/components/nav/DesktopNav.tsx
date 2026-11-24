"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { navLinks, projects, processSteps, contact, position } from "@/lib/content";
import { hubSolutions } from "@/lib/solutionsHub";
import RollText from "./RollText";

const now = () => performance.now();

type Key = "position" | "solutions" | "products" | "insights" | "work" | "process" | "contact";

const keyFor = (href: string): Key => {
  if (href.includes("about") || href.includes("position")) return "position";
  if (href.includes("solutions")) return "solutions";
  if (href.includes("products")) return "products";
  if (href.includes("insights")) return "insights";
  if (href.includes("our-work")) return "work";
  if (href.includes("process")) return "process";
  return "contact";
};

/* ------------------------------------------------------------------ scenes */
/* Small, purposeful SVG scenes: one idea each, drawn in the nav's own ink. */

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1 } as const;

function SceneMoon() {
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full">
      <ellipse cx="80" cy="80" rx="68" ry="26" transform="rotate(-24 80 80)" {...stroke} className="text-copper" opacity="0.8" />
      <circle cx="80" cy="80" r="30" fill="currentColor" opacity="0.12" />
      <circle cx="80" cy="80" r="30" {...stroke} opacity="0.8" />
      <circle cx="70" cy="72" r="6" {...stroke} opacity="0.5" />
      <circle cx="90" cy="88" r="4" {...stroke} opacity="0.5" />
      <circle cx="84" cy="68" r="2.5" {...stroke} opacity="0.5" />
      <circle r="3.5" className="fill-solar">
        <animateMotion dur="5s" repeatCount="indefinite" path="M 142,80 A 68,26 0 1,1 18,80 A 68,26 0 1,1 142,80" rotate="0" />
      </circle>
    </svg>
  );
}

function SceneSystems() {
  const nodes = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return { x: 80 + Math.cos(a) * 54, y: 80 + Math.sin(a) * 54 };
  });
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full">
      {nodes.map((n, i) => (
        <g key={i}>
          <line x1="80" y1="80" x2={n.x} y2={n.y} {...stroke} className="text-copper" opacity="0.7" style={{ ["--len" as string]: 60, strokeDasharray: 60, animation: `orbit-draw 600ms ${i * 70}ms both ease-out` }} />
          <line x1={n.x} y1={n.y} x2={nodes[(i + 1) % 6].x} y2={nodes[(i + 1) % 6].y} {...stroke} opacity="0.25" />
          <circle cx={n.x} cy={n.y} r="4" fill="currentColor" style={{ animation: `orbit-pulse 2.4s ${i * 0.3}s infinite` }} />
        </g>
      ))}
      <circle cx="80" cy="80" r="9" className="fill-solar" />
    </svg>
  );
}

function SceneWork() {
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full">
      <rect x="22" y="38" width="116" height="84" rx="6" {...stroke} opacity="0.8" />
      <line x1="22" y1="54" x2="138" y2="54" {...stroke} opacity="0.5" />
      {[30, 38, 46].map((x, i) => (
        <circle key={x} cx={x} cy="46" r="2" className={i === 0 ? "fill-solar" : ""} fill={i === 0 ? undefined : "currentColor"} opacity={i === 0 ? 1 : 0.5} />
      ))}
      <rect x="32" y="64" width="54" height="8" rx="2" fill="currentColor" opacity="0.7" />
      <rect x="32" y="78" width="80" height="4" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="32" y="88" width="68" height="4" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="32" y="102" width="30" height="10" rx="5" className="fill-copper" />
      <rect x="100" y="98" width="30" height="16" rx="3" {...stroke} className="text-copper" />
    </svg>
  );
}

function SceneProcess() {
  const n = 7;
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full">
      <path d="M 20,120 L 50,120 L 50,90 L 80,90 L 80,60 L 110,60 L 110,40 L 140,40" {...stroke} opacity="0.3" />
      {Array.from({ length: n }, (_, i) => {
        const pts = [[20, 120], [50, 120], [50, 90], [80, 90], [80, 60], [110, 60], [140, 40]];
        const [x, y] = pts[i];
        return (
          <g key={i} style={{ animation: `orbit-pulse 2.8s ${i * 0.28}s infinite` }}>
            <rect x={x - 6} y={y - 6} width="12" height="12" rx="2" {...stroke} className="text-copper" />
            <rect x={x - 2} y={y - 2} width="4" height="4" fill="currentColor" />
          </g>
        );
      })}
    </svg>
  );
}

function SceneContact() {
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full">
      {[62, 46, 30, 14].map((r, i) => (
        <circle key={r} cx="80" cy="80" r={r} {...stroke} className="text-copper" opacity={0.25 + i * 0.18}>
          <animate attributeName="r" values={`${r + 14};${r};${r + 14}`} dur="4s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
        </circle>
      ))}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <line key={i} x1={80 + Math.cos(a) * 70} y1={80 + Math.sin(a) * 70} x2={80 + Math.cos(a) * 20} y2={80 + Math.sin(a) * 20} {...stroke} opacity="0.35" />;
      })}
      <circle cx="80" cy="80" r="5" className="fill-solar" />
    </svg>
  );
}

const scenes: Record<Key, () => React.ReactElement> = {
  position: SceneMoon,
  solutions: SceneSystems,
  products: SceneSystems,
  insights: SceneWork,
  work: SceneWork,
  process: SceneProcess,
  contact: SceneContact,
};

/* ------------------------------------------------------------------- panel */

function PreviewBody({ k }: { k: Key }) {
  const { t, lang } = useLanguage();
  const Scene = scenes[k];
  const mono = "font-mono text-[10px] uppercase tracking-[0.1em] text-technical";
  const featured = projects[0];

  return (
    <div className="grid grid-cols-[132px_1fr] items-center gap-5 animate-fade-up">
      <div className="aspect-square text-foreground">
        <Scene />
      </div>
      <div className="min-w-0">
        {k === "position" && (
          <>
            <span className={mono}>{lang === "en" ? "About" : "Tentang"}</span>
            <p className="mt-2 font-display text-lg font-medium uppercase leading-[1.05] tracking-tight text-foreground">{t(position.heading)}</p>
          </>
        )}
        {k === "solutions" && (
          <>
            <span className={mono}>{lang === "en" ? "Eight solution areas" : "Delapan area solusi"}</span>
            <ul className="mt-2 grid grid-cols-1 gap-x-4 gap-y-0.5 sm:grid-cols-2">
              {hubSolutions.map((s) => (
                <li key={s.slug}>
                  <Link href={`/solutions/${s.slug}`} className="group/s flex items-center gap-1.5 py-0.5 text-[12px] text-muted transition-colors hover:text-foreground">
                    <span className="h-px w-2 bg-copper transition-all group-hover/s:w-4" />
                    <span className="truncate">{t(s.name)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        {k === "products" && (
          <>
            <span className={mono}>{lang === "en" ? "Software products" : "Produk perangkat lunak"}</span>
            <p className="mt-2 font-display text-lg font-medium uppercase leading-[1.05] tracking-tight text-foreground">Hidang POS</p>
            <p className="mt-1.5 line-clamp-2 text-[12px] leading-snug text-muted">
              {lang === "en" ? "F&B point of sale and restaurant management, configured to each business." : "POS F&B dan manajemen restoran, disesuaikan dengan setiap bisnis."}
            </p>
          </>
        )}
        {k === "insights" && (
          <>
            <span className={mono}>Insights</span>
            <p className="mt-2 font-display text-lg font-medium leading-[1.05] tracking-tight text-foreground">{lang === "en" ? "Business technology, explained plainly." : "Teknologi bisnis, dijelaskan dengan jelas."}</p>
            <p className="mt-1.5 text-[12px] leading-snug text-muted">{lang === "en" ? "Articles on connected systems, AI and OCR, and websites." : "Artikel tentang sistem terhubung, AI dan OCR, dan website."}</p>
          </>
        )}
        {k === "work" && (
          <>
            <span className={mono}>
              {t(featured.category)} · {featured.label === "Demo" ? "Demo" : lang === "en" ? "In Progress" : "Dalam Proses"}
            </span>
            <p className="mt-2 font-display text-lg font-medium uppercase leading-[1.05] tracking-tight text-foreground">{t(featured.title)}</p>
            <p className="mt-1.5 line-clamp-2 text-[12px] leading-snug text-muted">{t(featured.description)}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-copper">
              {projects.length} {lang === "en" ? "projects" : "proyek"} <ArrowUpRight size={12} />
            </span>
          </>
        )}
        {k === "process" && (
          <>
            <span className={mono}>
              {processSteps.length} {lang === "en" ? "steps" : "langkah"}
            </span>
            <ol className="mt-2 space-y-0.5">
              {processSteps.slice(0, 4).map((s, i) => (
                <li key={i} className="flex gap-2 text-[12px] text-muted">
                  <span className="font-mono text-copper">{String(i + 1).padStart(2, "0")}</span>
                  <span className="truncate">{t(s.title)}</span>
                </li>
              ))}
              <li className="font-mono text-[11px] text-technical">…</li>
            </ol>
          </>
        )}
        {k === "contact" && (
          <>
            <span className={mono}>{lang === "en" ? "Start a project" : "Mulai proyek"}</span>
            <p className="mt-2 font-display text-lg font-medium uppercase leading-[1.05] tracking-tight text-foreground">
              {lang === "en" ? "Every line leads here." : "Semua jalur menuju sini."}
            </p>
            <p className="mt-1.5 text-[12px] text-muted">{contact.email}</p>
          </>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- nav */

export default function DesktopNav() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [hover, setHover] = useState<Key | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const wrapRef = useRef<HTMLDivElement>(null);

  const suppressUntil = useRef(0);
  const open = (k: Key) => {
    // after a click the cursor still rests on the link; browsers re-fire mouseenter once the page changes
    if (now() < suppressUntil.current) return;
    clearTimeout(closeTimer.current);
    setHover(k);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setHover(null), 240);
  };

  // Escape or any click inside (a real navigation) closes the panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setHover(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative hidden lg:block"
      onMouseLeave={scheduleClose}
      onClick={() => {
        suppressUntil.current = now() + 1800;
        setHover(null);
      }}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) scheduleClose();
      }}
    >
      <nav aria-label="Primary" className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
        {navLinks.map((link) => {
          const k = keyFor(link.href);
          const label = t(link.label);
          const current =
            (k === "work" && pathname.startsWith("/our-work")) ||
            (k === "contact" && pathname.startsWith("/contact")) ||
            (k === "solutions" && pathname.startsWith("/solutions")) ||
            (k === "products" && pathname.startsWith("/products")) ||
            (k === "insights" && pathname.startsWith("/insights"));
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-label={label}
              aria-current={current ? "page" : undefined}
              onMouseEnter={() => open(k)}
              onFocus={() => open(k)}
              className="group/roll relative py-2 transition-colors hover:text-foreground focus-visible:text-foreground"
            >
              <RollText text={label} />
              {/* copper marker: draws in from the left, retracts to the right */}
              <span
                aria-hidden
                className={`absolute -bottom-0.5 left-0 h-px w-full bg-copper transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  current ? "origin-left scale-x-100" : "origin-right scale-x-0 group-hover/roll:origin-left group-hover/roll:scale-x-100 group-focus-visible/roll:origin-left group-focus-visible/roll:scale-x-100"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      <div
        role="presentation"
        onMouseEnter={() => hover && clearTimeout(closeTimer.current)}
        className={`absolute left-1/2 top-full z-10 w-[min(500px,90vw)] -translate-x-1/2 pt-4 transition-all duration-300 ease-out ${
          hover ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-line bg-void/95 p-5 shadow-2xl backdrop-blur-md">{hover && <PreviewBody key={hover} k={hover} />}</div>
      </div>
    </div>
  );
}
