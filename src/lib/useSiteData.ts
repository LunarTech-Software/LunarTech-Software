import { useLanguage } from "./i18n/LanguageContext";
import * as en from "./site";
import * as id from "./site.id";

/** Returns the language-appropriate copy for solutions, projects, industries, etc. */
export function useSiteData() {
  const { lang } = useLanguage();
  const data = lang === "id" ? id : en;
  return {
    tagline: data.tagline,
    navLinks: data.navLinks,
    industries: data.industries,
    solutions: data.solutions,
    processSteps: data.processSteps,
    scopingNote: data.scopingNote,
    differentiators: data.differentiators,
    clientSegments: data.clientSegments,
    projects: data.projects,
    workFilters: data.workFilters,
  };
}
