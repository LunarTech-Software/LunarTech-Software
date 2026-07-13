import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { contact, whatsappForService } from "../../lib/site";
import { useLanguage } from "../../lib/i18n/LanguageContext";

/** value = stable English key used for WhatsApp message lookup; label = displayed, localized text. */
const OPTIONS = [
  { value: "Website", en: "Website", id: "Website" },
  { value: "Business System", en: "Business System", id: "Sistem Bisnis" },
  { value: "Automation / IoT", en: "Automation / IoT", id: "Otomasi / IoT" },
  { value: "Farm / Plantation", en: "Farm / Plantation", id: "Pertanian / Perkebunan" },
  { value: "Factory / Facility", en: "Factory / Facility", id: "Pabrik / Fasilitas" },
  { value: "Education / STEM", en: "Education / STEM", id: "Pendidikan / STEM" },
  { value: "Service Sector", en: "Service Sector", id: "Sektor Jasa" },
  { value: "Other", en: "Other", id: "Lainnya" },
];

const copy = {
  en: { startingPoint: "Choose your starting point", readyToScope: "Ready to scope:", startEnquiry: "Start Enquiry" },
  id: { startingPoint: "Pilih titik awal Anda", readyToScope: "Siap untuk dibahas:", startEnquiry: "Mulai Pertanyaan" },
};

/** Hero single-select: pick a starting point, get a "ready to scope" WhatsApp prompt. */
export default function ServiceSelector() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const [active, setActive] = useState<string | null>(null);
  const activeOption = OPTIONS.find((o) => o.value === active);

  const waLink = active ? whatsappForService(active) : contact.whatsappText;

  return (
    <div className="mt-10 w-full max-w-xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-silver/70">{t.startingPoint}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {OPTIONS.map((opt) => {
          const isActive = active === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setActive(isActive ? null : opt.value)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 ${
                isActive
                  ? "border-lunar-teal bg-lunar-teal/15 text-soft-white"
                  : "border-white/15 text-muted-silver hover:border-lunar-teal/60 hover:text-soft-white"
              }`}
            >
              {opt[lang]}
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
                {t.readyToScope} <span className="font-medium text-soft-white">{activeOption?.[lang]}</span>
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-lunar-teal transition-colors hover:text-soft-white"
              >
                {t.startEnquiry} <ArrowRight size={13} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
