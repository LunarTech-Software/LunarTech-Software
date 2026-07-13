import { useLanguage } from "../lib/i18n/LanguageContext";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`inline-flex items-center rounded-full border border-white/15 p-0.5 text-xs font-medium ${className}`}>
      {(["en", "id"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors ${
            lang === code ? "bg-lunar-teal text-void" : "text-muted-silver hover:text-soft-white"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
