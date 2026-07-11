/** Static gradient + orbit-ring + logo fallback for reduced-motion, coarse pointers, or Spline load failure. */
export default function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div
        className="h-[55vmin] w-[55vmin] max-h-[520px] max-w-[520px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, #4E7393 0%, transparent 70%)" }}
        aria-hidden
      />
      <svg viewBox="0 0 400 400" className="absolute h-[70vmin] w-[70vmin] max-h-[640px] max-w-[640px] opacity-30" aria-hidden>
        <ellipse cx="200" cy="200" rx="180" ry="70" fill="none" stroke="#6A9AA8" strokeWidth="1" transform="rotate(-20 200 200)" />
        <ellipse cx="200" cy="200" rx="140" ry="55" fill="none" stroke="#5C88A0" strokeWidth="1" transform="rotate(15 200 200)" />
      </svg>
      <img
        src="/logo/LunarBrandLogo.png"
        alt=""
        aria-hidden
        className="absolute h-16 w-auto opacity-90 sm:h-20"
      />
    </div>
  );
}
