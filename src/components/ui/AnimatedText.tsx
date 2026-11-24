import { cn } from "@/lib/utils";

/**
 * Hover "roll-up" label. The nearest ancestor must carry the `group` class.
 * The visible copy slides up and out while an identical copy rolls in from below.
 */
export default function AnimatedText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("relative inline-flex overflow-hidden", className)}>
      <span className="whitespace-nowrap transition-transform duration-500 ease-in-out group-hover:-translate-y-[120%]">
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 flex translate-y-[120%] items-center justify-center whitespace-nowrap transition-transform duration-500 ease-in-out group-hover:translate-y-0"
      >
        {text}
      </span>
    </span>
  );
}
