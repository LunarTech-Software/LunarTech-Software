import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("lunar-container", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  number,
  border = true,
  id,
}: {
  children: ReactNode;
  className?: string;
  number?: string;
  border?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={cn("lunar-section relative scroll-mt-24", border && "border-t border-line", className)}>
      {number && (
        <Container>
          <span className="lunar-chapter-number mb-6 block">({number})</span>
        </Container>
      )}
      {children}
    </section>
  );
}

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("lunar-kicker mb-4 block", className)}>{children}</span>;
}

export function Heading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "text-[1.75rem] font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-[2.25rem] lg:text-[2.85rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}
