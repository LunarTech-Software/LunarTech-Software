"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { useLanguage } from "@/lib/language-context";
import { navLinks, solutions } from "@/lib/content";
import { hubSolutions } from "@/lib/solutionsHub";
import { internalNav } from "@/components/internal/nav";

/**
 * Orbital page transition.
 *
 *   IDLE -> LEAVING_PAGE -> ROUTE_CHANGING -> ENTERING_PAGE -> COMPLETE -> IDLE
 *
 * A circular mask grows from the click point and covers the page, a precise orbit diagram
 * rides its edge, the real Next.js route changes underneath, and the same orbit opens a hole
 * to reveal the destination. Links stay real <a href>: every internal click is intercepted
 * once, at the document, so existing components need no changes and work without JS.
 */

export type TransitionState = "IDLE" | "LEAVING_PAGE" | "ROUTE_CHANGING" | "ENTERING_PAGE" | "COMPLETE";

interface Ctx {
  state: TransitionState;
  navigate: (href: string, origin?: { x: number; y: number }, label?: string) => void;
}

const TransitionContext = createContext<Ctx>({ state: "IDLE", navigate: () => {} });
export const useTransition = () => useContext(TransitionContext);

const RING_RADII = [90, 170, 270, 400, 580, 800];
const COVER_S = 0.46;
const REVEAL_S = 0.5;

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const frames = (n = 2) => new Promise<void>((res) => { const step = (k: number) => (k <= 0 ? res() : requestAnimationFrame(() => step(k - 1))); step(n); });
const wait = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));
/** GSAP timelines are thenable, so never `await` one directly. */
const play = (tl: gsap.core.Timeline | gsap.core.Tween) => new Promise<void>((res) => { tl.eventCallback("onComplete", () => res()); });

const coverMask = (x: number, y: number, r: number) => `radial-gradient(circle at ${x}px ${y}px, #000 ${r}px, transparent ${r + 1.5}px)`;
const holeMask = (x: number, y: number, r: number) => `radial-gradient(circle at ${x}px ${y}px, transparent ${r}px, #000 ${r + 1.5}px)`;

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  const [state, setStateRaw] = useState<TransitionState>("IDLE");
  const stateRef = useRef<TransitionState>("IDLE");
  const setState = (s: TransitionState) => {
    stateRef.current = s;
    setStateRaw(s);
    document.documentElement.dataset.transition = s;
  };

  const overlayRef = useRef<HTMLDivElement>(null);
  const svgGroupRef = useRef<SVGGElement>(null);
  const ringsRef = useRef<SVGGElement>(null);
  const edgeRef = useRef<SVGCircleElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const moonImgRef = useRef<HTMLImageElement>(null);
  const satImgRef = useRef<HTMLImageElement>(null);

  const pathRef = useRef(pathname);
  const waiters = useRef(new Set<() => void>());
  const queued = useRef<{ href: string; origin?: { x: number; y: number }; label?: string } | null>(null);
  const tRef = useRef(t);
  tRef.current = t;

  useEffect(() => {
    ["moon-cutout", "saturn-cutout"].forEach((n) => {
      const img = new Image();
      img.src = `/images/space/${n}.webp`;
    });
  }, []);

  useEffect(() => {
    pathRef.current = pathname;
    waiters.current.forEach((fn) => fn());
  }, [pathname]);

  /* ---- scroll lock without layout shift: swallow input while a transition runs ---- */
  const lockHandler = useRef((e: Event) => e.preventDefault());
  const keyLock = useRef((e: KeyboardEvent) => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) e.preventDefault();
  });
  const lock = (on: boolean) => {
    const opts = { passive: false } as AddEventListenerOptions;
    if (on) {
      window.addEventListener("wheel", lockHandler.current, opts);
      window.addEventListener("touchmove", lockHandler.current, opts);
      window.addEventListener("keydown", keyLock.current);
    } else {
      window.removeEventListener("wheel", lockHandler.current, opts);
      window.removeEventListener("touchmove", lockHandler.current, opts);
      window.removeEventListener("keydown", keyLock.current);
    }
  };

  /* ---- overlay helpers ---- */
  const setMask = (css: string) => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.maskImage = css;
    el.style.webkitMaskImage = css;
  };
  const showOverlay = (x: number, y: number) => {
    const el = overlayRef.current!;
    el.style.visibility = "visible";
    el.style.pointerEvents = "auto";
    svgGroupRef.current?.setAttribute("transform", `translate(${x} ${y})`);
    edgeRef.current?.setAttribute("cx", String(x));
    edgeRef.current?.setAttribute("cy", String(y));
    gsap.set(ringsRef.current, { scale: 0.35, opacity: 0, svgOrigin: "0 0" });
  };
  const hideOverlay = () => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.visibility = "hidden";
    el.style.pointerEvents = "none";
    el.style.maskImage = "";
    el.style.webkitMaskImage = "";
    edgeRef.current?.setAttribute("r", "0");
    gsap.set([moonImgRef.current, satImgRef.current], { opacity: 0 });
  };
  const maxRadius = (x: number, y: number) => Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 60;

  const waitForPath = (target: string | null, timeout: number) =>
    new Promise<void>((res) => {
      const from = pathRef.current;
      const ok = () => (target === null ? pathRef.current !== from : pathRef.current === target);
      if (target !== null && ok()) return res();
      const timer = setTimeout(() => done(), timeout);
      const check = () => { if (ok()) done(); };
      const done = () => { clearTimeout(timer); waiters.current.delete(check); res(); };
      waiters.current.add(check);
    });

  const scrollToTarget = (hash: string) => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    else window.scrollTo(0, 0);
  };

  /** Anchors on the home page move while the hero pins; keep re-seating until the target stops moving. */
  const settleHash = async (hash: string, budget = 1300) => {
    const id = hash.slice(1);
    let last = -1;
    let steady = 0;
    for (let waited = 0; waited < budget && steady < 3; waited += 90) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
        const top = el.getBoundingClientRect().top + window.scrollY;
        steady = Math.abs(top - last) < 1 ? steady + 1 : 0;
        last = top;
      }
      await wait(90);
    }
  };

  const labelFor = (pathAndHash: string, path: string) => {
    const nav = navLinks.find((l) => l.href === pathAndHash) ?? navLinks.find((l) => l.href === path);
    if (nav) return tRef.current(nav.label);
    const slug = path.startsWith("/solutions/") ? path.split("/")[2] : null;
    const sol = slug ? solutions.find((s) => s.slug === slug) : null;
    if (sol) return tRef.current(sol.name);
    const hub = slug ? hubSolutions.find((s) => s.slug === slug) : null;
    if (hub) return tRef.current(hub.name);
    const internal = internalNav.find((n) => n.href === path);
    return internal ? tRef.current(internal.label) : "";
  };

  /* ---- the choreography ---- */
  const run = useCallback(async (href: string, origin: { x: number; y: number }, labelOverride?: string, instantCover = false) => {
    const url = new URL(href, window.location.href);
    const samePath = url.pathname === window.location.pathname;
    const target = url.pathname + url.search + url.hash;
    const { x, y } = origin;
    const R = maxRadius(x, y);
    const label = labelOverride ?? labelFor(url.pathname + url.hash, url.pathname);

    try {
      lock(true);
      setState("LEAVING_PAGE");
      showOverlay(x, y);
      if (labelRef.current) {
        labelRef.current.textContent = label;
        gsap.set(labelRef.current, { yPercent: 115 });
      }

      // Saturn for the systems pages, the Moon everywhere else
      const planet = /^\/(solutions|process)/.test(url.pathname) ? satImgRef.current : moonImgRef.current;
      gsap.set([moonImgRef.current, satImgRef.current], { opacity: 0, scale: 0.6 });

      /* A: orbit appears and B/C: it expands into a mask that covers the page */
      const o = { r: 0 };
      if (instantCover) {
        o.r = R;
        setMask(coverMask(x, y, R));
        gsap.set(ringsRef.current, { scale: 1, opacity: 1 });
        gsap.set(planet, { opacity: 0.95, scale: 1 });
      } else {
        const cover = gsap.timeline();
        cover.to(o, {
          r: R,
          duration: COVER_S,
          ease: "power3.inOut",
          onUpdate: () => {
            setMask(coverMask(x, y, o.r));
            edgeRef.current?.setAttribute("r", String(Math.max(o.r - 1.5, 0)));
          },
        }, 0);
        cover.to(ringsRef.current, { scale: 1.15, opacity: 1, duration: COVER_S, ease: "power2.out", svgOrigin: "0 0" }, 0);
        cover.to(planet, { opacity: 0.95, scale: 1, duration: COVER_S + 0.12, ease: "power3.out" }, 0.1);
        await play(cover);
      }
      edgeRef.current?.setAttribute("r", "0");
      if (labelRef.current) gsap.to(labelRef.current, { yPercent: 0, duration: 0.4, ease: "power3.out" });

      /* D: change the real route while the page is hidden */
      setState("ROUTE_CHANGING");
      if (!instantCover && !samePath) router.push(target);
      if (instantCover) await waitForPath(null, 700);
      else if (!samePath) await waitForPath(url.pathname, 1800);
      await frames(2);
      scrollToTarget(url.hash);
      if (url.hash) await settleHash(url.hash);
      else await wait(instantCover ? 0 : 140);

      /* The same orbit opens a hole onto the destination */
      setState("ENTERING_PAGE");
      const h = { r: 0 };
      const reveal = gsap.timeline();
      reveal.to(h, {
        r: R,
        duration: REVEAL_S,
        ease: "power3.inOut",
        onUpdate: () => {
          setMask(holeMask(x, y, h.r));
          edgeRef.current?.setAttribute("r", String(h.r + 1.5));
        },
      }, 0);
      reveal.to(ringsRef.current, { scale: 1.9, opacity: 0, duration: REVEAL_S, ease: "power2.in", svgOrigin: "0 0" }, 0);
      if (labelRef.current) reveal.to(labelRef.current, { yPercent: -115, duration: 0.3, ease: "power2.in" }, 0);
      reveal.to(planet, { opacity: 0, scale: 1.3, duration: REVEAL_S * 0.85, ease: "power2.in" }, 0);

      // E: editorial heading reveal on pages other than the home shot (which has its own opening)
      if (url.pathname !== "/") {
        const h1 = document.querySelector<HTMLElement>("main h1");
        if (h1) {
          reveal.fromTo(
            h1,
            { clipPath: "inset(0 0 100% 0)", y: 26 },
            { clipPath: "inset(-10% -3% -10% -3%)", y: 0, duration: 0.85, ease: "power3.out", clearProps: "clipPath,transform" },
            0.22,
          );
        }
      }
      await play(reveal);
    } catch {
      /* fall through to cleanup: a failed animation must never strand the visitor */
    } finally {
      hideOverlay();
      lock(false);
      setState("COMPLETE");
      document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
      setState("IDLE");
      const next = queued.current;
      queued.current = null;
      if (next && next.href !== window.location.pathname + window.location.search + window.location.hash) {
        void run(next.href, next.origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 }, next.label);
      }
    }
  }, [router]);

  const navigate = useCallback<Ctx["navigate"]>(
    (href, origin, label) => {
      const o = origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      if (reduced()) {
        router.push(href);
        return;
      }
      if (stateRef.current !== "IDLE") {
        queued.current = { href, origin: o, label }; // deterministic: the latest click wins, after the current run finishes
        return;
      }
      void run(href, o, label);
    },
    [router, run],
  );

  /* ---- intercept internal link clicks once, at the document ---- */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || !/^https?:$/.test(url.protocol)) return;
      if (reduced()) return; // plain Next.js navigation, immediately

      e.preventDefault();
      const here = window.location.pathname + window.location.search + window.location.hash;
      const there = url.pathname + url.search + url.hash;
      if (there === here || (url.pathname === window.location.pathname && !url.hash && !url.search)) {
        if (stateRef.current === "IDLE") scrollToTarget(url.hash);
        return;
      }
      const rect = a.getBoundingClientRect();
      const fromKeyboard = e.detail === 0 || (e.clientX === 0 && e.clientY === 0);
      const origin = fromKeyboard ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : { x: e.clientX, y: e.clientY };
      navigate(there, origin);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  /* ---- browser Back / Forward: cover at once, wait for the route, then reveal ---- */
  useEffect(() => {
    const onPop = () => {
      if (reduced() || stateRef.current !== "IDLE") return;
      void run(window.location.href, { x: window.innerWidth / 2, y: window.innerHeight / 2 }, "", true);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [run]);

  const value = useMemo(() => ({ state, navigate }), [state, navigate]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none invisible fixed inset-0 z-[90] overflow-hidden bg-[#090A0E]"
        style={{ willChange: "mask-image" }}
      >
        <svg className="absolute inset-0 h-full w-full" width="100%" height="100%">
          <g ref={svgGroupRef}>
            <g ref={ringsRef}>
              {/* concentric orbit paths, echoing the LUNAR mark */}
              {RING_RADII.map((r, i) => (
                <circle key={r} r={r} fill="none" stroke="#C18D6B" strokeWidth={i === 2 ? 1.2 : 0.8} opacity={0.18 + (i === 2 ? 0.25 : 0.08)} />
              ))}
              {/* radial index marks */}
              <circle r={270} fill="none" stroke="#F0EAE0" strokeWidth={6} strokeDasharray="1 17.7" opacity={0.35} />
              <circle r={580} fill="none" stroke="#C18D6B" strokeWidth={8} strokeDasharray="1 31.4" opacity={0.3} />
              {/* a tilted orbit with its node */}
              <g transform="rotate(-24)">
                <ellipse rx={340} ry={120} fill="none" stroke="#F0EAE0" strokeWidth={1} opacity={0.5} />
                <circle r={5} cx={340} cy={0} fill="#E98459">
                  <animateMotion dur="4s" repeatCount="indefinite" path="M340,0 A340,120 0 1,1 -340,0 A340,120 0 1,1 340,0" />
                </circle>
              </g>
            </g>
          </g>
          {/* the leading edge of the mask, a crisp copper orbit */}
          <circle ref={edgeRef} r={0} fill="none" stroke="#C18D6B" strokeWidth={1.5} />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={moonImgRef} src="/images/space/moon-cutout.webp" alt="" className="absolute w-[min(64vmin,540px)] opacity-0" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={satImgRef} src="/images/space/saturn-cutout.webp" alt="" className="absolute w-[min(92vmin,820px)] opacity-0" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <span className="block overflow-hidden pb-[0.08em]">
            <span ref={labelRef} className="block font-display text-[clamp(2.4rem,9vw,8rem)] font-medium uppercase leading-none tracking-[-0.03em] text-[#F0EAE0]" />
          </span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
