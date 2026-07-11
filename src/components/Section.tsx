import type { ReactNode } from "react";

/** Standard max-width container with section rhythm. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`max-w-7xl mx-auto px-6 lg:px-10 ${className}`}>{children}</div>;
}

/** Section wrapper with vertical rhythm. */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

/** Teal uppercase tracked kicker — used with intent, not on every section. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs tracking-[0.24em] uppercase text-lunar-teal mb-4">{children}</p>
  );
}

/** Section heading in soft white. */
export function Heading({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={`font-medium tracking-tight text-soft-white text-balance leading-[1.1] ${className}`}
      style={{ textWrap: "balance" }}
    >
      {children}
    </Tag>
  );
}
