export type Lang = "en" | "id";

export interface Localized<T = string> {
  en: T;
  id: T;
}

export interface Solution {
  slug: string;
  name: Localized;
  promise: Localized;
  description: Localized;
  whoFor: Localized;
  problems: Localized<string[]>;
  whatWeBuild: Localized<string[]>;
}

export type WorkLabel = "Demo" | "In Progress";

export interface Project {
  slug: string;
  category: Localized;
  label: WorkLabel;
  title: Localized;
  description: Localized;
  liveUrl?: string;
}

export interface Differentiator {
  title: Localized;
  body: Localized;
}

export interface ProcessStep {
  title: Localized;
  body: Localized;
}

export interface NavLink {
  label: Localized;
  href: string;
}
