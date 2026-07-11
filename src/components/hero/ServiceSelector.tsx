import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { contact } from "../../lib/site";

const OPTIONS = [
  "Website",
  "Business System",
  "Dashboard",
  "Automation / IoT",
  "Monitoring",
  "Farm / Plantation",
  "Factory / Facility",
  "Education / STEM",
  "Other",
];

/** Hero single-select: pick a starting point, get a "ready to scope" WhatsApp prompt. */
export default function ServiceSelector() {
  const [active, setActive] = useState<string | null>(null);

  const waLink = active
    ? `${contact.whatsapp}?text=${encodeURIComponent(`Hi LUNAR, I'd like to scope: ${active}.`)}`
    : contact.whatsappText;

  return (
    <div className="mt-10 w-full max-w-xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-silver/70">
        Choose your starting point
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {OPTIONS.map((opt) => {
          const isActive = active === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setActive(isActive ? null : opt)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 ${
                isActive
                  ? "border-lunar-teal bg-lunar-teal/15 text-soft-white"
                  : "border-white/15 text-muted-silver hover:border-lunar-teal/60 hover:text-soft-white"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-4 overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <p className="text-sm text-muted-silver">
                Ready to scope: <span className="font-medium text-soft-white">{active}</span>
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-lunar-teal transition-colors hover:text-soft-white"
              >
                Start Enquiry <ArrowRight size={13} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
