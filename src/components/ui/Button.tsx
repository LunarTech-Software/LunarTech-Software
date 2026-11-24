import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "link";
  className?: string;
}

type ButtonProps = BaseProps &
  (
    | { href: string; newTab?: boolean; onClick?: () => void }
    | { href?: undefined; newTab?: undefined; onClick?: () => void }
  );

const variants = {
  primary: "bg-foreground text-void hover:bg-accent hover:text-void",
  secondary: "border border-line text-foreground hover:border-accent/60 hover:text-accent",
  link: "text-foreground hover:text-accent px-0",
};

export default function Button({ children, variant = "primary", className, href, newTab, onClick }: ButtonProps) {
  const base = cn(
    "group inline-flex items-center gap-2 rounded-full px-5 py-[11px] font-mono text-[11px] font-medium uppercase tracking-[0.06em] transition-all duration-[340ms] ease-in-out",
    variant !== "link" && variants[variant],
    variant === "link" && variants.link,
    className,
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={href} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined} onClick={onClick} className={base}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {children}
    </button>
  );
}
