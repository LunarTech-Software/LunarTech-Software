import { useMemo } from "react";
import type { CSSProperties } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Star {
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  minOpacity: number;
  maxOpacity: number;
  color: string;
}

interface Streak {
  top: number;
  left: number;
  length: number;
  duration: number;
  delay: number;
  color: string;
}

const STAR_COLORS = ["#F4F7FA", "#D7E6EA", "#A7B4C2", "#6A9AA8"];
const STREAK_COLORS = ["#D7E6EA", "#6A9AA8", "#F4F7FA"];

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() < 0.85 ? 1 : 2,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 6,
    minOpacity: 0.15 + Math.random() * 0.15,
    maxOpacity: 0.6 + Math.random() * 0.35,
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
  }));
}

function makeStreaks(count: number): Streak[] {
  return Array.from({ length: count }, (_, i) => ({
    top: Math.random() * 40,
    left: 55 + Math.random() * 45,
    length: 90 + Math.random() * 60,
    duration: 9 + Math.random() * 10,
    delay: i * 3.5 + Math.random() * 3,
    color: STREAK_COLORS[Math.floor(Math.random() * STREAK_COLORS.length)],
  }));
}

/**
 * Subtle deep-space backdrop: scattered twinkling star particles plus a few
 * intermittent shooting-star streaks. Fixed to the viewport so it reads as an
 * ambient atmosphere behind the page rather than content that scrolls away.
 */
export default function StarfieldBackdrop() {
  const reducedMotion = useReducedMotion();
  const stars = useMemo(() => makeStars(70), []);
  const streaks = useMemo(() => makeStreaks(4), []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${reducedMotion ? "" : "animate-star-twinkle"}`}
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              backgroundColor: s.color,
              opacity: reducedMotion ? s.minOpacity : undefined,
              "--star-duration": `${s.duration}s`,
              "--star-delay": `${s.delay}s`,
              "--star-min-opacity": s.minOpacity,
              "--star-max-opacity": s.maxOpacity,
            } as CSSProperties
          }
        />
      ))}

      {!reducedMotion &&
        streaks.map((s, i) => (
          <span
            key={i}
            className="animate-shooting-star absolute h-px rounded-full"
            style={
              {
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.length,
                background: `linear-gradient(90deg, transparent, ${s.color})`,
                "--shoot-duration": `${s.duration}s`,
                "--shoot-delay": `${s.delay}s`,
              } as CSSProperties
            }
          />
        ))}
    </div>
  );
}
