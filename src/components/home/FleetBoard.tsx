"use client";

import { useLanguage } from "@/lib/language-context";

/**
 * Fleet & vehicle rental: a readable workflow concept (availability board + rental timeline +
 * maintenance queue). It is a designed illustration with placeholder unit codes, not a screenshot
 * and not live data, and it is labelled that way.
 */

type S = "ready" | "rented" | "service";
const UNITS: { code: string; type: [string, string]; s: S; bar: [number, number][] }[] = [
  { code: "UNIT-01", type: ["Pickup", "Pickup"], s: "rented", bar: [[0, 5]] },
  { code: "UNIT-02", type: ["Minibus", "Minibus"], s: "ready", bar: [[4, 7]] },
  { code: "UNIT-03", type: ["Truck", "Truk"], s: "rented", bar: [[1, 6]] },
  { code: "UNIT-04", type: ["Van", "Van"], s: "service", bar: [[2, 4]] },
  { code: "UNIT-05", type: ["SUV", "SUV"], s: "ready", bar: [[0, 2], [5, 7]] },
];

const LABEL: Record<S, { en: string; id: string; c: string }> = {
  ready: { en: "Available", id: "Tersedia", c: "#F0EAE0" },
  rented: { en: "On rental", id: "Disewa", c: "#E98459" },
  service: { en: "In workshop", id: "Di bengkel", c: "#C18D6B" },
};
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function FleetBoard() {
  const { lang } = useLanguage();
  const t = (en: string, id: string) => (lang === "en" ? en : id);
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-[10px] border border-[#F0EAE0]/25 bg-[#171A1F] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-1.5 border-b border-[#F0EAE0]/15 px-4 py-2.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-[#F0EAE0]/35" />
          ))}
          <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#F0EAE0]/70">{t("Fleet board", "Papan armada")}</span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-[#F0EAE0]/15 border-b border-[#F0EAE0]/15">
          {[
            { n: "3", l: t("Available", "Tersedia"), c: "#F0EAE0" },
            { n: "2", l: t("On rental", "Disewa"), c: "#E98459" },
            { n: "1", l: t("In workshop", "Di bengkel"), c: "#C18D6B" },
          ].map((k) => (
            <div key={k.l} className="px-4 py-3">
              <div className="font-display text-[clamp(1.6rem,2.6vw,2.6rem)] font-medium leading-none" style={{ color: k.c }}>
                {k.n}
              </div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[#F0EAE0]/65">{k.l}</div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3">
          <div className="mb-2 grid grid-cols-[84px_1fr] items-center gap-3 font-mono text-[9px] uppercase tracking-[0.1em] text-[#F0EAE0]/55">
            <span>{t("Unit", "Unit")}</span>
            <div className="grid grid-cols-7 text-center">
              {DAYS.map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
          </div>
          {UNITS.map((u) => (
            <div key={u.code} className="grid grid-cols-[84px_1fr] items-center gap-3 border-t border-[#F0EAE0]/10 py-2.5">
              <div>
                <div className="font-mono text-[11px] tracking-[0.04em] text-[#F0EAE0]">{u.code}</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-[#F0EAE0]/70">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: LABEL[u.s].c }} />
                  {t(LABEL[u.s].en, LABEL[u.s].id)}
                </div>
              </div>
              <div className="relative h-5 rounded-[3px] bg-[#F0EAE0]/[0.07]">
                {u.bar.map(([a, b], i) => (
                  <span
                    key={i}
                    className="absolute top-0 h-full rounded-[3px]"
                    style={{ left: `${(a / 7) * 100}%`, width: `${((b - a) / 7) * 100}%`, background: u.s === "service" ? "#C18D6B" : u.s === "rented" ? "#E98459" : "#F0EAE0", opacity: u.s === "ready" ? 0.55 : 0.95 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-[#F0EAE0]/15 px-4 py-2.5 text-[11px] text-[#F0EAE0]/80">
          <span>{t("Next service due: UNIT-04", "Servis berikutnya: UNIT-04")}</span>
          <span className="rounded-full border border-[#C18D6B] px-2 py-[2px] font-mono text-[9px] uppercase tracking-[0.08em] text-[#C18D6B]">{t("Maintenance", "Perawatan")}</span>
        </div>
      </div>
      <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-[#F0EAE0]/60">{t("Workflow concept with placeholder units, not a screenshot", "Konsep alur kerja dengan unit contoh, bukan tangkapan layar")}</p>
    </div>
  );
}
