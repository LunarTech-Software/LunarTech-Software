import { useEffect, useState } from "react";

/** True on touch/coarse-pointer devices — used to skip heavy 3D on mobile. */
export function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)");
    setCoarse(mql.matches);
    const onChange = () => setCoarse(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return coarse;
}
