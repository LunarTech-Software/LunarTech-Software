import { Link } from "react-router-dom";
import { useChromaKeyedImage } from "../hooks/useChromaKeyedImage";

interface LogoProps {
  className?: string;
  /** height in px of the wordmark */
  size?: number;
  linkTo?: string | null;
}

const RAW_LOGO_SRC = "/logo/LunarBrandLogo.png";

export default function Logo({ className = "", size = 28, linkTo = "/" }: LogoProps) {
  // The source PNG has an opaque black background baked in — key it out to true
  // transparency client-side so it blends into any dark surface (nav, footer, etc.)
  // without a residual box. Falls back to mix-blend-mode while processing/on failure.
  const transparentSrc = useChromaKeyedImage(RAW_LOGO_SRC);

  const mark = (
    <span
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      style={{ height: size }}
    >
      <img
        src={transparentSrc ?? RAW_LOGO_SRC}
        alt=""
        aria-hidden="true"
        style={transparentSrc ? { height: size } : { height: size, mixBlendMode: "screen" }}
        className="w-auto object-contain"
      />
    </span>
  );

  if (linkTo === null) return mark;

  return (
    <Link to={linkTo} aria-label="LUNAR home" className="inline-flex">
      {mark}
    </Link>
  );
}
