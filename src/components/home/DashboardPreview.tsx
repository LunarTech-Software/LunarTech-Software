import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, TrendingDown, CircleCheck, TriangleAlert } from "lucide-react";
import Reveal from "../Reveal";
import { Container, Section, Kicker, Heading } from "../Section";
import { useLanguage } from "../../lib/i18n/LanguageContext";

const mockCopy = {
  en: {
    liveLabel: "Operations · Live (mockup)",
    updated: "Updated 12s ago",
    kpis: [
      { label: "Output today", value: "1,284", delta: "+6.2%", up: true },
      { label: "On-time", value: "97.4%", delta: "+1.1%", up: true },
      { label: "Downtime", value: "22m", delta: "-14%", up: false },
    ],
    throughput: "Throughput · 24h",
    unitsPerHr: "units / hr",
    rows: [
      { ok: true, label: "Cold storage A", meta: "3.4°C · in range" },
      { ok: true, label: "Line 2 · packaging", meta: "running" },
      { ok: false, label: "Sensor · warehouse 4", meta: "check required" },
    ],
  },
  id: {
    liveLabel: "Operasi · Live (mockup)",
    updated: "Diperbarui 12 detik lalu",
    kpis: [
      { label: "Output hari ini", value: "1.284", delta: "+6,2%", up: true },
      { label: "Tepat waktu", value: "97,4%", delta: "+1,1%", up: true },
      { label: "Downtime", value: "22m", delta: "-14%", up: false },
    ],
    throughput: "Throughput · 24 jam",
    unitsPerHr: "unit / jam",
    rows: [
      { ok: true, label: "Cold storage A", meta: "3,4°C · dalam batas normal" },
      { ok: true, label: "Line 2 · pengemasan", meta: "berjalan" },
      { ok: false, label: "Sensor · gudang 4", meta: "perlu diperiksa" },
    ],
  },
};

function DashboardMock() {
  const { lang } = useLanguage();
  const m = mockCopy[lang];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-md sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-lunar-teal animate-node-pulse" />
          <span className="text-[13px] text-muted-silver">{m.liveLabel}</span>
        </div>
        <span className="text-[11px] tracking-wide text-technical-grey">{m.updated}</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {m.kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-white/5 bg-panel/70 p-3">
            <p className="text-[11px] text-technical-grey">{k.label}</p>
            <p className="mt-1 text-xl font-semibold tabular-nums text-soft-white">{k.value}</p>
            <p className={`mt-1 inline-flex items-center gap-1 text-[11px] ${k.up ? "text-emerald-400" : "text-lunar-teal"}`}>
              {k.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {k.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-white/5 bg-panel/40 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[12px] text-muted-silver">{m.throughput}</p>
          <p className="text-[11px] text-technical-grey">{m.unitsPerHr}</p>
        </div>
        <svg viewBox="0 0 320 90" className="h-24 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6A9AA8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#6A9AA8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,70 L26,62 L52,66 L78,48 L104,54 L130,38 L156,44 L182,30 L208,36 L234,22 L260,30 L286,18 L320,24 L320,90 L0,90 Z"
            fill="url(#area)"
          />
          <path
            d="M0,70 L26,62 L52,66 L78,48 L104,54 L130,38 L156,44 L182,30 L208,36 L234,22 L260,30 L286,18 L320,24"
            fill="none"
            stroke="#6A9AA8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="mt-4 space-y-2">
        {m.rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between rounded-lg border border-white/5 bg-panel/50 px-3 py-2">
            <span className="flex items-center gap-2 text-[13px] text-soft-white">
              {row.ok ? <CircleCheck size={14} className="text-emerald-400" /> : <TriangleAlert size={14} className="text-amber-400" />}
              {row.label}
            </span>
            <span className="text-[11px] text-technical-grey">{row.meta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const copy = {
  en: {
    kicker: "Dashboards & reporting",
    heading: "See your whole operation in real time.",
    body: "Live figures replace manual checking and scattered files. KPIs, alerts, and status — clean, uncluttered, and always current.",
    link: "Explore dashboards & reporting",
  },
  id: {
    kicker: "Dasbor & pelaporan",
    heading: "Lihat seluruh operasi Anda secara real-time.",
    body: "Angka real-time menggantikan pengecekan manual dan file yang tersebar. KPI, notifikasi, dan status — rapi, jelas, dan selalu terkini.",
    link: "Jelajahi dasbor & pelaporan",
  },
};

export default function DashboardPreview() {
  const { lang } = useLanguage();
  const t = copy[lang];
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Kicker>{t.kicker}</Kicker>
            <Heading className="text-3xl md:text-5xl">{t.heading}</Heading>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-silver">{t.body}</p>
            <div className="mt-8">
              <Link to="/solutions/business-systems" className="inline-flex items-center gap-1.5 text-lunar-teal transition-colors hover:text-soft-white">
                {t.link} <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <DashboardMock />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
