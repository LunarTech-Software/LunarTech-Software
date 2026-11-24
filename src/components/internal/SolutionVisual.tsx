import type { ReactElement } from "react";
import type { VisualKey } from "@/lib/solutionsHub";

/**
 * Original interface schematics, drawn in SVG. They are NOT screenshots and are always
 * captioned as illustrative: real client screens are only shown once a client approves them.
 */

const INK = "#F0EAE0";
const COPPER = "#C18D6B";
const SOLAR = "#E98459";
const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" } as const;

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <rect x="1" y="1" width="478" height="298" rx="4" fill="#0C0E13" stroke={INK} strokeOpacity="0.16" />
      <line x1="1" y1="26" x2="479" y2="26" stroke={INK} strokeOpacity="0.12" />
      {[14, 24, 34].map((x, i) => (
        <circle key={x} cx={x} cy="13.5" r="2.4" fill={i === 0 ? SOLAR : INK} opacity={i === 0 ? 0.9 : 0.3} />
      ))}
      <text x="52" y="17" fill={INK} opacity="0.5" fontSize="8" letterSpacing="1" style={mono}>
        {title}
      </text>
      {children}
    </>
  );
}

const T = ({ x, y, children, o = 0.55, s = 7.5, fill = INK, anchor = "start" as const }: { x: number; y: number; children: React.ReactNode; o?: number; s?: number; fill?: string; anchor?: "start" | "end" | "middle" }) => (
  <text x={x} y={y} fill={fill} opacity={o} fontSize={s} textAnchor={anchor} style={mono}>
    {children}
  </text>
);

function Rows({ x, y, w, n, gap = 24, accent = [] as number[] }: { x: number; y: number; w: number; n: number; gap?: number; accent?: number[] }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <line x1={x} y1={y + i * gap} x2={x + w} y2={y + i * gap} stroke={INK} strokeOpacity="0.1" />
          <rect x={x + 6} y={y + i * gap + 8} width={26 + ((i * 13) % 22)} height="5" rx="2" fill={INK} opacity="0.55" />
          <rect x={x + 62} y={y + i * gap + 8} width={50 + ((i * 29) % 40)} height="5" rx="2" fill={INK} opacity="0.2" />
          <circle cx={x + w - 16} cy={y + i * gap + 10.5} r="3" fill={accent.includes(i) ? SOLAR : COPPER} opacity={accent.includes(i) ? 1 : 0.7} />
        </g>
      ))}
    </>
  );
}

const scenes: Record<VisualKey, () => ReactElement> = {
  custom: () => (
    <Frame title="BUSINESS SYSTEM / OVERVIEW">
      <line x1="96" y1="26" x2="96" y2="299" stroke={INK} strokeOpacity="0.1" />
      {["Orders", "Approvals", "Records", "Reports", "Users"].map((l, i) => (
        <g key={l}>
          {i === 1 && <rect x="2" y={44 + i * 26 - 12} width="93" height="22" fill={COPPER} opacity="0.16" />}
          <T x={14} y={44 + i * 26} o={i === 1 ? 1 : 0.5}>{l}</T>
        </g>
      ))}
      <T x={112} y={46} o={0.9} s={10}>APPROVALS</T>
      <rect x="112" y="56" width="356" height="1" fill={INK} opacity="0.12" />
      <Rows x={112} y={62} w={356} n={6} accent={[1]} />
      <rect x="380" y="258" width="88" height="24" rx="12" fill={INK} />
      <T x={424} y={273} fill="#090A0E" o={1} s={8} anchor="middle">APPROVE</T>
    </Frame>
  ),
  fleet: () => (
    <Frame title="FLEET / VEHICLES">
      <T x={16} y={46} o={0.9} s={10}>VEHICLES</T>
      <rect x="16" y="54" width="296" height="1" fill={INK} opacity="0.12" />
      <Rows x={16} y={58} w={296} n={7} accent={[2, 5]} />
      <line x1="326" y1="26" x2="326" y2="299" stroke={INK} strokeOpacity="0.1" />
      <T x={340} y={46} o={0.7}>AVAILABILITY</T>
      {[["Available", 0.62, COPPER], ["Assigned", 0.3, INK], ["In service", 0.12, SOLAR]].map(([l, v, col], i) => (
        <g key={l as string}>
          <T x={340} y={72 + i * 34} o={0.5}>{l as string}</T>
          <rect x="340" y={78 + i * 34} width="124" height="5" rx="2" fill={INK} opacity="0.1" />
          <rect x="340" y={78 + i * 34} width={124 * (v as number)} height="5" rx="2" fill={col as string} opacity="0.9" />
        </g>
      ))}
      <T x={340} y={196} o={0.7}>DOCUMENTS</T>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="340" y={206 + i * 26} width="124" height="18" rx="2" fill="none" stroke={INK} strokeOpacity="0.16" />
          <rect x="344" y={212 + i * 26} width={50 + i * 20} height="5" rx="2" fill={i === 2 ? SOLAR : COPPER} opacity="0.8" />
        </g>
      ))}
    </Frame>
  ),
  hauling: () => (
    <Frame title="HAULING / TRIPS & ROUTES">
      <polyline points="26,230 70,190 112,208 158,142 208,160 250,96" fill="none" stroke={COPPER} strokeWidth="1.6" strokeDasharray="4 4" />
      {[[26, 230], [112, 208], [158, 142], [250, 96]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={i === 3 ? SOLAR : INK} opacity="0.9" />
      ))}
      <T x={26} y={50} o={0.8} s={9}>ROUTES</T>
      <line x1="272" y1="26" x2="272" y2="299" stroke={INK} strokeOpacity="0.1" />
      <T x={288} y={46} o={0.8} s={9}>TRIPS</T>
      <Rows x={288} y={54} w={180} n={4} accent={[1]} />
      <T x={288} y={170} o={0.55}>TONNAGE / DAY</T>
      {[28, 44, 36, 58, 50, 70, 62].map((h, i) => (
        <rect key={i} x={288 + i * 25} y={282 - h} width="16" height={h} fill={i === 5 ? SOLAR : COPPER} opacity={i === 5 ? 1 : 0.6} />
      ))}
    </Frame>
  ),
  equipment: () => (
    <Frame title="EQUIPMENT / SCHEDULE">
      {["EX-01", "EX-02", "DZ-01", "LD-01", "CR-01"].map((l, i) => (
        <g key={l}>
          <T x={16} y={60 + i * 40} o={0.7}>{l}</T>
          <line x1="64" y1={64 + i * 40} x2="468" y2={64 + i * 40} stroke={INK} strokeOpacity="0.1" />
          <rect x={72 + ((i * 47) % 120)} y={50 + i * 40} width={90 + ((i * 53) % 130)} height="14" rx="2" fill={i === 2 ? SOLAR : COPPER} opacity={i === 2 ? 0.95 : 0.65} />
        </g>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <line x1={72 + i * 50} y1="36" x2={72 + i * 50} y2="262" stroke={INK} strokeOpacity="0.06" />
          <T x={72 + i * 50} y={278} o={0.4} s={6.5}>D{i + 1}</T>
        </g>
      ))}
      <T x={468} y={46} o={0.8} anchor="end">HOURS LOGGED</T>
    </Frame>
  ),
  erp: () => {
    const mods = ["Procurement", "Inventory", "Payroll", "Finance", "Approvals", "Reports"];
    return (
      <Frame title="ERP / MODULES">
        {mods.map((m, i) => {
          const a = (i / mods.length) * Math.PI * 2 - Math.PI / 2;
          const x = 240 + Math.cos(a) * 150;
          const y = 164 + Math.sin(a) * 96;
          return (
            <g key={m}>
              <line x1="240" y1="164" x2={x} y2={y} stroke={COPPER} strokeOpacity="0.6" />
              <rect x={x - 38} y={y - 12} width="76" height="24" rx="3" fill="#0C0E13" stroke={INK} strokeOpacity="0.3" />
              <T x={x} y={y + 3} anchor="middle" o={0.85} s={7.5}>{m}</T>
            </g>
          );
        })}
        <circle cx="240" cy="164" r="28" fill={SOLAR} opacity="0.95" />
        <T x={240} y={167} anchor="middle" fill="#090A0E" o={1} s={8}>ONE RECORD</T>
      </Frame>
    );
  },
  web: () => (
    <Frame title="WEBSITE / HOME">
      <rect x="20" y="40" width="440" height="110" rx="2" fill={COPPER} opacity="0.13" />
      <rect x="36" y="64" width="190" height="12" rx="2" fill={INK} opacity="0.85" />
      <rect x="36" y="84" width="150" height="12" rx="2" fill={INK} opacity="0.85" />
      <rect x="36" y="112" width="120" height="6" rx="2" fill={INK} opacity="0.3" />
      <rect x="36" y="126" width="64" height="16" rx="8" fill={SOLAR} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={20 + i * 150} y="166" width="140" height="100" rx="2" fill="none" stroke={INK} strokeOpacity="0.16" />
          <rect x={30 + i * 150} y="178" width="60" height="6" rx="2" fill={INK} opacity="0.7" />
          <rect x={30 + i * 150} y="194" width="116" height="4" rx="2" fill={INK} opacity="0.2" />
          <rect x={30 + i * 150} y="204" width="96" height="4" rx="2" fill={INK} opacity="0.2" />
        </g>
      ))}
    </Frame>
  ),
  ai: () => {
    const steps = ["Document", "Read", "Check", "Record"];
    return (
      <Frame title="AUTOMATION / FLOW">
        {steps.map((s, i) => (
          <g key={s}>
            <rect x={24 + i * 112} y="116" width="88" height="48" rx="3" fill="#0C0E13" stroke={i === 2 ? SOLAR : INK} strokeOpacity={i === 2 ? 1 : 0.3} />
            <T x={68 + i * 112} y={144} anchor="middle" o={0.9} s={8}>{s}</T>
            {i < 3 && <line x1={112 + i * 112} y1="140" x2={136 + i * 112} y2="140" stroke={COPPER} strokeWidth="1.4" markerEnd="none" />}
          </g>
        ))}
        <T x={248} y={196} anchor="middle" o={0.55}>A PERSON CONFIRMS BEFORE IT IS RECORDED</T>
        <circle cx="248" cy="226" r="6" fill={SOLAR} />
      </Frame>
    );
  },
  integration: () => (
    <Frame title="INTEGRATION / DATA FLOW">
      {[["Your system", 70], ["Accounting", 140], ["Spreadsheets", 210]].map(([l, y]) => (
        <g key={l as string}>
          <rect x="24" y={(y as number) - 16} width="104" height="32" rx="3" fill="#0C0E13" stroke={INK} strokeOpacity="0.3" />
          <T x={76} y={(y as number) + 3} anchor="middle" o={0.85} s={8}>{l as string}</T>
          <line x1="128" y1={y as number} x2="196" y2="150" stroke={COPPER} strokeOpacity="0.8" strokeDasharray="3 3" />
        </g>
      ))}
      <rect x="196" y="120" width="88" height="60" rx="3" fill="#0C0E13" stroke={SOLAR} />
      <T x={240} y={146} anchor="middle" o={1} s={8}>INTERFACE</T>
      <T x={240} y={160} anchor="middle" o={0.5} s={6.5}>mapped + checked</T>
      <line x1="284" y1="150" x2="340" y2="150" stroke={COPPER} strokeWidth="1.4" />
      <rect x="340" y="96" width="116" height="108" rx="3" fill="none" stroke={INK} strokeOpacity="0.3" />
      <T x={398} y={118} anchor="middle" o={0.8} s={8}>LUNAR SYSTEM</T>
      <Rows x={348} y={126} w={100} n={3} gap={24} accent={[1]} />
    </Frame>
  ),
  iot: () => (
    <Frame title="MONITORING / SITE">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="50" cy={70 + i * 56} r="9" fill="none" stroke={COPPER} />
          <circle cx="50" cy={70 + i * 56} r="3" fill={SOLAR} opacity={i === 1 ? 1 : 0.6} />
          <line x1="59" y1={70 + i * 56} x2="150" y2="150" stroke={COPPER} strokeOpacity="0.5" strokeDasharray="3 3" />
        </g>
      ))}
      <rect x="150" y="128" width="46" height="44" rx="3" fill="#0C0E13" stroke={INK} strokeOpacity="0.35" />
      <T x={173} y={154} anchor="middle" o={0.8} s={7}>GATEWAY</T>
      <line x1="196" y1="150" x2="226" y2="150" stroke={COPPER} />
      <rect x="226" y="52" width="236" height="206" rx="3" fill="none" stroke={INK} strokeOpacity="0.2" />
      <polyline points="238,210 266,190 296,200 328,160 360,176 392,120 424,138 452,92" fill="none" stroke={SOLAR} strokeWidth="1.6" />
      <line x1="238" y1="150" x2="452" y2="150" stroke={INK} strokeOpacity="0.2" strokeDasharray="3 3" />
      <T x={238} y={70} o={0.7}>READINGS</T>
    </Frame>
  ),
};

export default function SolutionVisual({ kind, className }: { kind: VisualKey; className?: string }) {
  const Scene = scenes[kind];
  return (
    <svg viewBox="0 0 480 300" className={className} role="img" aria-label="Illustrative interface">
      <Scene />
    </svg>
  );
}
