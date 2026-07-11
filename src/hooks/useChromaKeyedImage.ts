import { useEffect, useState } from "react";
import { getChromaKeyedImage } from "../lib/chromaKey";

/** Returns a transparent-background data URL for `src` once processed, or null while pending/on failure. */
export function useChromaKeyedImage(src: string, threshold = 24) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getChromaKeyedImage(src, threshold)
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [src, threshold]);

  return dataUrl;
}
