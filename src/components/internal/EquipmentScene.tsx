"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

/**
 * The equipment sequence on one photorealistic concept image (a motor-driven pump with a sensor on the
 * motor and a gateway panel). A single "camera" moves across the still as scroll advances: wide, in on the
 * sensor, over to the gateway, back out, then back on the sensor for the alert. It is a concept visual,
 * not a photograph of a LUNAR installation, and the page says so.
 */

const IW = 1672;
const IH = 752;
// where things are in the image, in image pixels
const SENSOR = { x: 668, y: 292 };
const LED = { x: 672, y: 276 };
const GATEWAY = { x: 1478, y: 336 };

type K = { at: number; fx: number; fy: number; z: number };
const KEYS: K[] = [
  { at: 0.0, fx: 836, fy: 376, z: 1 },
  { at: 0.2, fx: 836, fy: 376, z: 1 },
  { at: 0.4, fx: SENSOR.x + 60, fy: SENSOR.y + 10, z: 1.9 },
  { at: 0.6, fx: GATEWAY.x - 40, fy: GATEWAY.y, z: 1.8 },
  { at: 0.8, fx: 836, fy: 376, z: 1 },
  { at: 1.0, fx: SENSOR.x + 140, fy: SENSOR.y + 20, z: 1.5 },
];

const sm = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function cam(p: number) {
  let i = 0;
  while (i < KEYS.length - 2 && p > KEYS[i + 1].at) i++;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const t = sm(a.at, b.at, p);
  return { fx: a.fx + (b.fx - a.fx) * t, fy: a.fy + (b.fy - a.fy) * t, z: a.z + (b.z - a.z) * t };
}

export default function EquipmentScene({ pRef, onLabel }: { pRef: MutableRefObject<number>; onLabel: (x: number, y: number, show: boolean) => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const ledRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const world = worldRef.current;
    const led = ledRef.current;
    if (!host || !world || !led) return;
    let raf = 0;
    let shown = false;
    const draw = (time: number) => {
      const W = host.clientWidth;
      const H = host.clientHeight;
      // wide frames fit the width; tall (phone) frames fit most of the height so the machine stays large
      const base = Math.max(W / IW, (H * 0.5) / IH);
      const p = pRef.current;
      const c = cam(p);
      const s = base * c.z;
      const cy = H * 0.46;
      const tx = W / 2 - c.fx * s;
      const ty = cy - c.fy * s;
      world.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;

      const alert = p > 0.82;
      led.style.opacity = alert ? String(0.75 + 0.25 * Math.sin(time / 160)) : "0";
      const near = p > 0.28 && p < 0.52;
      if (near) {
        onLabel(tx + SENSOR.x * s, ty + (SENSOR.y - 40) * s, true);
        shown = true;
      } else if (shown) {
        onLabel(0, 0, false);
        shown = false;
      }
    };
    // position the camera immediately so the picture is framed on first paint, then keep it in step with scroll
    draw(0);
    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pRef, onLabel]);

  return (
    <div ref={hostRef} className="absolute inset-0 overflow-hidden bg-[#0B0F15]" aria-hidden>
      <div ref={worldRef} className="absolute left-0 top-0 will-change-transform" style={{ width: IW, height: IH, transformOrigin: "0 0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/scenes/pump@2x.webp" alt="" width={IW} height={IH} className="block h-full w-full max-w-none" />
        {/* the sensor's status light turns amber when the limit is crossed */}
        <span ref={ledRef} className="absolute block rounded-full bg-[#E98459] opacity-0" style={{ left: LED.x - 9, top: LED.y - 7, width: 18, height: 14, boxShadow: "0 0 24px 10px rgba(233,132,89,0.6)" }} />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-[#0E1114] to-transparent" />
    </div>
  );
}
