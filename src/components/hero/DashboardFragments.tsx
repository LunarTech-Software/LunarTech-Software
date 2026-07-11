import type { CSSProperties } from "react";
import { LayoutDashboard, Radio, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type FragmentDef = {
  className: string;
  icon: LucideIcon;
  label: string;
  sublabel: string;
  kind: "dashboard" | "sensor" | "web";
  floatDuration: number;
};

const fragments: FragmentDef[] = [
  { className: "left-[6%] top-[16%]", icon: LayoutDashboard, label: "Live Dashboard", sublabel: "Operations overview", kind: "dashboard", floatDuration: 7 },
  { className: "right-[8%] top-[38%]", icon: Radio, label: "Sensor Alert", sublabel: "Status: nominal", kind: "sensor", floatDuration: 8.5 },
  { className: "left-[14%] bottom-[14%]", icon: Globe, label: "Web Platform", sublabel: "lunartech.my", kind: "web", floatDuration: 9.5 },
];

function FragmentCard({ def }: { def: FragmentDef }) {
  const Icon = def.icon;
  return (
    <div
      className={`absolute ${def.className} hidden lg:block w-44 animate-float rounded-xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-md`}
      style={{ "--float-duration": `${def.floatDuration}s` } as CSSProperties}
    >
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-lunar-teal" strokeWidth={1.5} />
        <span className="text-[11px] font-medium text-soft-white/90">{def.label}</span>
      </div>
      <div className="mt-2 text-[10px] text-muted-silver/80">{def.sublabel}</div>
      {def.kind === "dashboard" && (
        <div className="mt-2.5 flex h-8 items-end gap-1">
          {[6, 14, 9, 18, 12, 20].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-lunar-teal/40" style={{ height: `${h}px` }} />
          ))}
        </div>
      )}
      {def.kind === "sensor" && (
        <div className="mt-2.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-lunar-teal animate-node-pulse" />
          <div className="h-px flex-1 bg-gradient-to-r from-lunar-teal/60 to-transparent" />
        </div>
      )}
      {def.kind === "web" && (
        <div className="mt-2.5 space-y-1">
          <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
        </div>
      )}
    </div>
  );
}

export default function DashboardFragments({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <>
      {fragments.map((def) => (
        <FragmentCard key={def.label} def={def} />
      ))}
    </>
  );
}
