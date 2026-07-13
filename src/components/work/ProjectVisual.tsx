import { Gauge, Thermometer, MapPin, Factory as FactoryIcon, Monitor, GraduationCap, CalendarCheck, Camera, Construction } from "lucide-react";
import type { ProjectVisualKind } from "../../lib/site";

/** Code-rendered mockup visual per project category — no external image assets required. */
export default function ProjectVisual({ kind, className = "" }: { kind: ProjectVisualKind; className?: string }) {
  return (
    <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-panel to-void ${className}`}>
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl"
        style={{ background: "radial-gradient(circle, #5C88A0 0%, transparent 70%)" }}
        aria-hidden
      />
      {kind === "dashboard" && <DashboardVisual />}
      {kind === "sensor" && <SensorVisual />}
      {kind === "map" && <MapVisual />}
      {kind === "floor" && <FloorVisual />}
      {kind === "devices" && <DevicesVisual />}
      {kind === "portal" && <PortalVisual />}
      {kind === "booking" && <BookingVisual />}
      {kind === "camera" && <CameraVisual />}
      {kind === "wip" && <WipVisual />}
    </div>
  );
}

function WipVisual() {
  return (
    <div className="relative z-10 flex w-[75%] flex-col items-center gap-3">
      <Construction size={26} className="text-amber-400" strokeWidth={1.5} />
      <div className="w-full space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-white/10">
          <div className="h-1.5 w-1/3 rounded-full bg-amber-400/70" />
        </div>
        <p className="text-center text-[10px] text-muted-silver">In development</p>
      </div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="relative z-10 w-[80%]">
      <div className="mb-2 flex items-center gap-1.5">
        <Gauge size={12} className="text-lunar-teal" />
        <span className="text-[9px] uppercase tracking-wide text-technical-grey">Live stock levels</span>
      </div>
      <div className="flex h-16 items-end gap-1.5">
        {[40, 65, 30, 80, 55, 90, 45, 70].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm bg-lunar-teal/50" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function SensorVisual() {
  return (
    <div className="relative z-10 flex w-[75%] flex-col items-center gap-3">
      <Thermometer size={28} className="text-lunar-teal" strokeWidth={1.5} />
      <div className="w-full space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-white/10">
          <div className="h-1.5 w-2/3 rounded-full bg-lunar-teal animate-node-pulse" />
        </div>
        <p className="text-center text-[10px] text-muted-silver">3.4°C · within range</p>
      </div>
    </div>
  );
}

function MapVisual() {
  return (
    <div className="relative z-10 h-20 w-[80%] rounded-lg border border-white/10 bg-void/40">
      <MapPin size={16} className="absolute left-[20%] top-[30%] text-lunar-teal" />
      <MapPin size={16} className="absolute left-[55%] top-[55%] text-steel-teal" />
      <MapPin size={16} className="absolute left-[75%] top-[25%] text-orbital-blue" />
      <div className="absolute inset-3 rounded border border-dashed border-white/10" />
    </div>
  );
}

function FloorVisual() {
  return (
    <div className="relative z-10 grid w-[80%] grid-cols-3 gap-2">
      {["ok", "ok", "watch", "ok", "alert", "ok"].map((s, i) => (
        <div key={i} className="flex flex-col items-center gap-1 rounded-md border border-white/10 bg-white/5 p-2">
          <FactoryIcon size={12} className="text-lunar-teal" />
          <span
            className={`h-1.5 w-1.5 rounded-full ${s === "ok" ? "bg-emerald-400" : s === "watch" ? "bg-amber-400" : "bg-red-400"}`}
          />
        </div>
      ))}
    </div>
  );
}

function DevicesVisual() {
  return (
    <div className="relative z-10 flex items-end gap-3">
      <div className="h-20 w-14 rounded-md border border-white/15 bg-white/5" />
      <div className="h-24 w-16 rounded-md border border-white/15 bg-white/5" />
      <Monitor size={20} className="mb-2 text-lunar-teal" />
    </div>
  );
}

function PortalVisual() {
  return (
    <div className="relative z-10 flex w-[75%] flex-col items-center gap-3">
      <GraduationCap size={26} className="text-lunar-teal" strokeWidth={1.5} />
      <div className="flex w-full items-center gap-1.5">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className={`h-1.5 flex-1 rounded-full ${n <= 2 ? "bg-lunar-teal" : "bg-white/10"}`} />
        ))}
      </div>
      <p className="text-[10px] text-muted-silver">Milestone 2 of 4</p>
    </div>
  );
}

function BookingVisual() {
  return (
    <div className="relative z-10 w-[78%] space-y-1.5">
      <div className="mb-2 flex items-center gap-1.5">
        <CalendarCheck size={14} className="text-lunar-teal" />
        <span className="text-[9px] uppercase tracking-wide text-technical-grey">Upcoming bookings</span>
      </div>
      {["09:00 · Consultation", "11:30 · Follow-up", "14:00 · New client"].map((row) => (
        <div key={row} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] text-muted-silver">
          {row}
        </div>
      ))}
    </div>
  );
}

function CameraVisual() {
  return (
    <div className="relative z-10 grid w-[80%] grid-cols-2 gap-2">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="relative flex aspect-video items-center justify-center rounded-md border border-white/10 bg-void/50">
          <Camera size={14} className="text-lunar-teal" strokeWidth={1.5} />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-node-pulse" />
        </div>
      ))}
    </div>
  );
}
