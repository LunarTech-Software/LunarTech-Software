import type { HubSolution } from "@/lib/solutionsHub";
import SolutionVisual from "./SolutionVisual";

/** Shows a real screenshot when a solution has one (e.g. Hidang), otherwise the labelled schematic. */
export default function HubVisual({ s, className, alt }: { s: HubSolution; className?: string; alt?: string }) {
  if (s.shot) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={s.shot} alt={alt ?? s.name.en} width={1800} height={1125} className={`${className ?? ""} object-cover object-top`} loading="lazy" />;
  }
  return <SolutionVisual kind={s.visual} className={className} />;
}
