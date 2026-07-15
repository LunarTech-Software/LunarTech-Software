import type { CSSProperties } from "react";

interface LivePreviewFrameProps {
  url: string;
  className?: string;
  /** Where the crop centers on the page. "top" (default) shows the top of
   * the page, e.g. a hero section — good for full marketing pages. "center"
   * centers on the middle of the page — better for something like a login
   * screen, where the meaningful content sits in the middle of a mostly-
   * empty background. */
  focus?: "top" | "center";
  /** Extra zoom, cropping in tighter around the focus point. 1 = whole page
   * visible (default). Increase for pages where the meaningful content is
   * small relative to the full viewport, e.g. try 1.5–2 for a login form. */
  zoom?: number;
}

// Shows a real, scaled-down peek of a live site inside a card — instead of
// a generic mockup graphic. Works by rendering the page at full size inside
// an oversized wrapper, then shrinking that wrapper with a CSS transform so
// it fits the card. The iframe itself is not interactive (pointer-events
// disabled) since this is a preview, not a live browsing surface.
//
// Note: this only works if the target site allows being embedded in an
// iframe (no X-Frame-Options / CSP frame-ancestors restriction). Netlify
// and Render sites don't block this by default, so LUMARA, the ERP demo,
// and future projects hosted there should work here without extra config.
//
// The wrapper is intentionally a little wider than the visible crop
// (420% instead of a plain 400%). The embedded page's own scrollbar sits
// right at its content's edge — cross-origin, we can't reach in and hide
// it with CSS — so the extra width pushes that scrollbar strip just past
// the visible crop boundary, where the outer overflow-hidden clips it off.
export default function LivePreviewFrame({ url, className = "", focus = "top", zoom = 1 }: LivePreviewFrameProps) {
  const scale = 0.25 * zoom;

  const wrapperStyle: CSSProperties =
    focus === "center"
      ? {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "420%",
          height: "400%",
          transform: `translate(-50%, -50%) scale(${scale})`,
        }
      : {
          position: "absolute",
          left: 0,
          top: 0,
          width: "420%",
          height: "400%",
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        };

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-panel to-void ${className}`}
    >
      <div style={wrapperStyle}>
        <iframe
          src={url}
          title="Live site preview"
          className="h-full w-full pointer-events-none select-none border-0"
          loading="lazy"
          tabIndex={-1}
          scrolling="no"
        />
      </div>
      {/* Transparent overlay so clicks on the card go to the card link, not into the iframe */}
      <div className="absolute inset-0" aria-hidden />
    </div>
  );
}
