"use client";

import { useEffect, useRef, useState } from "react";

/** 5x7 dot-matrix glyphs, drawn from scratch for the LUNAR wordmark. */
const GLYPHS: Record<string, string[]> = {
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
};

const WORD = "LUNAR";
const COLS = WORD.length * 5 + (WORD.length - 1); // 29
const ROWS = 7;

/**
 * Signature footer wordmark: LUNAR as a precise dot matrix. The apex dot of the "A" is
 * Solar Orange, echoing the node inside the A of the brand mark.
 */
export default function DotWordmark({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dots: React.ReactElement[] = [];
  WORD.split("").forEach((ch, li) => {
    const g = GLYPHS[ch];
    g.forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        const col = li * 6 + x;
        const on = cell === "1";
        const apex = ch === "A" && y === 0 && x === 2;
        dots.push(
          <circle
            key={`${li}-${y}-${x}`}
            cx={col * 10 + 5}
            cy={y * 10 + 5}
            r={on ? 3.6 : 0.9}
            fill={apex ? "#E98459" : "#17191E"}
            opacity={on ? (shown ? 1 : 0) : 0.14}
            style={{ transition: `opacity 600ms ease ${on ? col * 28 + y * 14 : 0}ms` }}
          />,
        );
      });
    });
  });

  return (
    <svg ref={ref} role="img" aria-label="LUNAR" viewBox={`0 0 ${COLS * 10} ${ROWS * 10}`} className={className} preserveAspectRatio="xMidYMid meet">
      {dots}
    </svg>
  );
}
