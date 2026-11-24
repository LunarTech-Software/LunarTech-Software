/**
 * About-page planet artwork: the Mars picture, held by the same fine orbit lines and travelling
 * node as the rest of the identity. (Filename kept for the existing import.)
 */
export default function MoonArt({ className }: { className?: string }) {
  return (
    <svg viewBox="-340 -340 680 680" className={className} aria-hidden>
      {[260, 310, 335].map((r, i) => (
        <circle key={r} r={r} fill="none" stroke="#C18D6B" strokeWidth="0.7" opacity={0.35 - i * 0.08} />
      ))}
      <ellipse rx="300" ry="96" transform="rotate(-24)" fill="none" stroke="#F0EAE0" strokeWidth="0.7" opacity="0.4" />
      <image href="/images/space/mars-cutout.webp" x="-236" y="-236" width="472" height="472" />
      <circle r="4" fill="#E98459">
        <animateMotion dur="14s" repeatCount="indefinite" path="M300,0 A300,96 0 1,1 -300,0 A300,96 0 1,1 300,0" rotate="0" />
      </circle>
    </svg>
  );
}
