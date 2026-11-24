import { cn } from "@/lib/utils";

/**
 * Kinetic rollover label. Every character lives in a masked cell with two copies stacked:
 * on hover the visible copy rolls up and out while its twin rolls in from below, letter by
 * letter. The nearest ancestor must carry `group/roll`. Decorative copies are hidden from
 * assistive tech: give the parent link an aria-label.
 */
export default function RollText({ text, className, stagger = 22 }: { text: string; className?: string; stagger?: number }) {
  const chars = Array.from(text);
  return (
    <span aria-hidden className={cn("relative inline-flex overflow-hidden whitespace-pre align-bottom leading-[1.3]", className)}>
      {chars.map((ch, i) => {
        const delay = { transitionDelay: `${i * stagger}ms` };
        return (
          <span key={i} className="relative inline-block">
            <span
              style={delay}
              className="inline-block transition-transform duration-[460ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/roll:-translate-y-full group-focus-visible/roll:-translate-y-full"
            >
              {ch === " " ? "\u00a0" : ch}
            </span>
            <span
              style={delay}
              className="absolute inset-0 inline-block translate-y-full text-foreground transition-transform duration-[460ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/roll:translate-y-0 group-focus-visible/roll:translate-y-0"
            >
              {ch === " " ? "\u00a0" : ch}
            </span>
          </span>
        );
      })}
    </span>
  );
}
