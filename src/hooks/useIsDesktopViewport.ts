import { useEffect, useState } from "react";

/** True at the Tailwind `lg` breakpoint (1024px) and above. */
export function useIsDesktopViewport() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setDesktop(mql.matches);
    const onChange = () => setDesktop(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return desktop;
}
