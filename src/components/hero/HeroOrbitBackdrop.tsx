/**
 * Cinematic dark-space backdrop for the hero: radial teal/navy glow (adapted
 * from the aceternity Spotlight technique) plus concentric SVG orbit rings
 * and faint system-line accents. Pure decoration — sits behind the Spline canvas.
 */
export default function HeroOrbitBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* radial glow, spotlight-style */}
      <div
        className="absolute right-[-10%] top-1/2 h-[80vmin] w-[80vmin] max-h-[820px] max-w-[820px] -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #39547B 0%, transparent 70%)" }}
      />

      {/* orbit rings */}
      <svg viewBox="0 0 800 800" className="absolute right-[-8%] top-1/2 h-[90vmin] w-[90vmin] max-h-[900px] max-w-[900px] -translate-y-1/2">
        <ellipse cx="400" cy="400" rx="360" ry="150" fill="none" stroke="#6A9AA8" strokeWidth="1" opacity="0.25" className="animate-orbit-spin-slow" style={{ transformOrigin: "400px 400px" }} transform="rotate(-18 400 400)" />
        <ellipse cx="400" cy="400" rx="280" ry="115" fill="none" stroke="#5C88A0" strokeWidth="1" opacity="0.2" className="animate-orbit-spin-reverse" style={{ transformOrigin: "400px 400px" }} transform="rotate(12 400 400)" />
        <ellipse cx="400" cy="400" rx="200" ry="82" fill="none" stroke="#4E7393" strokeWidth="1" opacity="0.18" className="animate-orbit-spin" style={{ transformOrigin: "400px 400px" }} transform="rotate(-6 400 400)" />
        <circle cx="400" cy="400" r="3" fill="#6A9AA8" opacity="0.5" />
      </svg>

      {/* faint system lines */}
      <div className="absolute left-0 top-[28%] h-px w-2/5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-0 top-[72%] h-px w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
