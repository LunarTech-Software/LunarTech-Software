import { Thermometer, Cog, Droplets, Activity, type LucideProps } from "lucide-react";
import { useLanguage } from "../../lib/i18n/LanguageContext";

interface Tile {
  icon: (p: LucideProps) => React.ReactNode;
  label: string;
  value: string;
  status: "ok" | "watch" | "alert";
  meta: string;
}

const tilesByLang: Record<"en" | "id", Tile[]> = {
  en: [
    { icon: Thermometer, label: "Cold storage", value: "3.4°C", status: "ok", meta: "within range" },
    { icon: Cog, label: "Line 2 uptime", value: "99.1%", status: "ok", meta: "nominal" },
    { icon: Droplets, label: "Field moisture", value: "41%", status: "watch", meta: "trending dry" },
    { icon: Activity, label: "Pump vibration", value: "High", status: "alert", meta: "inspect today" },
  ],
  id: [
    { icon: Thermometer, label: "Cold storage", value: "3.4°C", status: "ok", meta: "dalam batas normal" },
    { icon: Cog, label: "Uptime Line 2", value: "99.1%", status: "ok", meta: "normal" },
    { icon: Droplets, label: "Kelembapan lahan", value: "41%", status: "watch", meta: "cenderung kering" },
    { icon: Activity, label: "Getaran pompa", value: "Tinggi", status: "alert", meta: "periksa hari ini" },
  ],
};

const statusColor: Record<Tile["status"], string> = {
  ok: "text-emerald-400",
  watch: "text-amber-400",
  alert: "text-red-400",
};

const statusDot: Record<Tile["status"], string> = {
  ok: "bg-emerald-400",
  watch: "bg-amber-400",
  alert: "bg-red-400",
};

/** Live-status tiles with a quiet pulse — color always paired with a label. */
export default function LiveTiles({ className = "" }: { className?: string }) {
  const { lang } = useLanguage();
  const tiles = tilesByLang[lang];
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${className}`}>
      {tiles.map((t) => {
        const Icon = t.icon;
        return (
          <div key={t.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5">
            <div className="flex items-center justify-between">
              <Icon size={18} className="text-lunar-teal" />
              <span className={`h-2 w-2 rounded-full animate-node-pulse ${statusDot[t.status]}`} />
            </div>
            <p className="mt-4 text-2xl font-semibold tabular-nums text-soft-white">{t.value}</p>
            <p className="mt-1 text-[13px] text-muted-silver">{t.label}</p>
            <p className={`mt-0.5 text-[11px] ${statusColor[t.status]}`}>{t.meta}</p>
          </div>
        );
      })}
    </div>
  );
}
