"use client";

import { useEffect, useRef } from "react";

/**
 * The supplied restaurant photograph, with the real Hidang screen placed on the tablet.
 * The photo shows a different app on the tablet, so a portrait crop of a real Hidang capture is mapped
 * onto the screen with a perspective transform (a homography from the screen's four corners).
 * Corner positions are fractions of the photo, so the overlay stays locked to the tablet at any size.
 */

export const PHOTO_W = 941;
export const PHOTO_H = 1672;
const SRC_W = 860;
const SRC_H = 1125;

// TL, TR, BR, BL of the tablet screen, as fractions of the photo
const QUAD: [number, number][] = [
  [253 / PHOTO_W, 766 / PHOTO_H],
  [668 / PHOTO_W, 637 / PHOTO_H],
  [897 / PHOTO_W, 1178 / PHOTO_H],
  [447 / PHOTO_W, 1330 / PHOTO_H],
];

function matrix(w: number, h: number, q: [number, number][]) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const sx = x0 - x1 + x2 - x3;
  const sy = y0 - y1 + y2 - y3;
  const dx1 = x1 - x2;
  const dx2 = x3 - x2;
  const dy1 = y1 - y2;
  const dy2 = y3 - y2;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (sx * dy2 - dx2 * sy) / den;
  const hh = (dx1 * sy - sx * dy1) / den;
  const a = x1 - x0 + g * x1;
  const b = x3 - x0 + hh * x3;
  const d = y1 - y0 + g * y1;
  const e = y3 - y0 + hh * y3;
  return `matrix3d(${a / w},${d / w},0,${g / w},${b / h},${e / h},0,${hh / h},0,0,1,0,${x0},${y0},0,1)`;
}

export default function TabletPhoto({ className = "", alt }: { className?: string; alt: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const screen = screenRef.current;
    if (!box || !screen) return;
    const place = () => {
      const W = box.clientWidth;
      const H = box.clientHeight;
      const q = QUAD.map(([x, y]) => [x * W, y * H]) as [number, number][];
      screen.style.transform = matrix(SRC_W, SRC_H, q);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={boxRef} className={`relative ${className}`} style={{ aspectRatio: `${PHOTO_W} / ${PHOTO_H}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/products/hidang-tablet.webp" alt={alt} width={PHOTO_W} height={PHOTO_H} className="absolute inset-0 h-full w-full" />
      <div ref={screenRef} className="absolute left-0 top-0 overflow-hidden rounded-[18px] bg-[#0C0E13]" style={{ width: SRC_W, height: SRC_H, transformOrigin: "0 0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/products/hidang-pos-portrait.webp" alt="" width={SRC_W} height={SRC_H} className="block h-full w-full" style={{ filter: "brightness(0.92) saturate(0.95)" }} />
        {/* the room's light across the glass */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/25" />
      </div>
    </div>
  );
}
