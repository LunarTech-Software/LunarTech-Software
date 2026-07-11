import {
  siVercel,
  siAstro,
  siFigma,
  siNextdotjs,
  siReact,
  siShadcnui,
  siSupabase,
  siTailwindcss,
  siNodedotjs,
  siPostgresql,
} from "simple-icons";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const logos = [
  siVercel,
  siAstro,
  siFigma,
  siNextdotjs,
  siReact,
  siShadcnui,
  siSupabase,
  siTailwindcss,
  siNodedotjs,
  siPostgresql,
];

function LogoItem({ icon }: { icon: (typeof logos)[number] }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 px-7 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-muted-silver transition-colors duration-300" aria-hidden>
        <path d={icon.path} />
      </svg>
      <span className="whitespace-nowrap text-sm font-medium text-muted-silver">{icon.title}</span>
    </div>
  );
}

/** Auto-scrolling marquee of technology logos — labelled honestly as tools, not clients. */
export default function TechLogoMarquee() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6">
        {logos.map((icon) => (
          <LogoItem key={icon.slug} icon={icon} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="marquee-viewport relative overflow-hidden"
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="marquee-track flex w-max items-center">
        {[...logos, ...logos].map((icon, i) => (
          <LogoItem key={`${icon.slug}-${i}`} icon={icon} />
        ))}
      </div>
    </div>
  );
}
