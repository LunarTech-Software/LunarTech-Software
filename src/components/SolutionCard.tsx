import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SolutionIcon from "./SolutionIcon";
import type { Solution } from "../lib/site";

export default function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Link
      to={`/solutions/${solution.slug}`}
      className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:bg-white/[0.08] hover:border-white/20"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-lunar-teal/20 bg-lunar-teal/10 text-lunar-teal">
        <SolutionIcon name={solution.icon} size={20} strokeWidth={1.75} />
      </span>
      <h3 className="mt-5 text-lg font-medium text-soft-white">{solution.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-silver">{solution.oneLiner}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-lunar-teal transition-colors group-hover:text-soft-white">
        Learn more
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
