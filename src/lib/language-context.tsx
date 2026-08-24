"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang, Localized } from "@/types/content";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <T>(entry: Localized<T>) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = <T,>(entry: Localized<T>) => entry[lang];
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
