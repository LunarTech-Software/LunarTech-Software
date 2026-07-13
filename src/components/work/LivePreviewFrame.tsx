interface LivePreviewFrameProps {
  url: string;
  className?: string;
}

// Shows a real, scaled-down peek of a live site inside a card — instead of
// a generic mockup graphic. Works by rendering the page at full size inside
// an oversized wrapper, then shrinking that wrapper with a CSS transform so
// it fits the card. The iframe itself is not interactive (pointer-events
// disabled) since this is a preview, not a live browsing surface.
//
// Note: this only works if the target site allows being embedded in an
// iframe (no X-Frame-Options / CSP frame-ancestors restriction). Netlify
// sites don't block this by default, so LUMARA and future Netlify-hosted
// projects should work here without extra configuration.
export default function LivePreviewFrame({ url, className = "" }: LivePreviewFrameProps) {
  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-panel to-void ${className}`}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: "400%", height: "400%", transform: "scale(0.25)" }}
      >
        <iframe
          src={url}
          title="Live site preview"
          className="h-full w-full pointer-events-none select-none"
          loading="lazy"
          tabIndex={-1}
        />
      </div>
      {/* Transparent overlay so clicks on the card go to the card link, not into the iframe */}
      <div className="absolute inset-0" aria-hidden />
    </div>
  );
}
