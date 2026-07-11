/** Compact orbit-ring + glow backdrop for inner-page heroes — same visual language as the Home hero, smaller footprint. */
export default function PageHeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -right-24 -top-32 h-[60vmin] w-[60vmin] max-h-[560px] max-w-[560px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #39547B 0%, transparent 70%)" }}
      />
      <svg viewBox="0 0 500 500" className="absolute -right-16 -top-20 h-[55vmin] w-[55vmin] max-h-[520px] max-w-[520px]">
        <ellipse cx="250" cy="250" rx="220" ry="90" fill="none" stroke="#6A9AA8" strokeWidth="1" opacity="0.2" className="animate-orbit-spin-slow" style={{ transformOrigin: "250px 250px" }} transform="rotate(-16 250 250)" />
        <ellipse cx="250" cy="250" rx="160" ry="65" fill="none" stroke="#5C88A0" strokeWidth="1" opacity="0.16" className="animate-orbit-spin-reverse" style={{ transformOrigin: "250px 250px" }} transform="rotate(10 250 250)" />
      </svg>
      <div className="absolute left-0 top-[60%] h-px w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
