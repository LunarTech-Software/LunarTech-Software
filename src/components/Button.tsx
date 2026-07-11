import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "link";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** internal route */
  to?: string;
  /** external / file href */
  href?: string;
  onClick?: () => void;
  newTab?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit";
}

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-lunar-teal focus-visible:ring-offset-2 focus-visible:ring-offset-void";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-steel-teal to-lunar-teal text-void rounded-full px-6 py-3 text-[14px] shadow-lg shadow-lunar-teal/20 hover:shadow-lunar-teal/40 hover:brightness-110",
  secondary:
    "border border-white/20 text-soft-white hover:border-lunar-teal/60 hover:bg-white/5 rounded-full px-6 py-3 text-[14px]",
  link: "text-lunar-teal hover:text-soft-white text-[14px] underline underline-offset-4 decoration-white/30 hover:decoration-lunar-teal",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  to,
  href,
  onClick,
  newTab,
  ariaLabel,
  type = "button",
}: BaseProps) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
