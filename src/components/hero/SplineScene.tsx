import { Suspense, lazy } from "react";
import HeroFallback from "./HeroFallback";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
  onError?: () => void;
}

/** Lazy-loaded Spline canvas with a branded fallback while the scene streams in. */
export function SplineScene({ scene, className, onError }: SplineSceneProps) {
  return (
    <Suspense fallback={<HeroFallback />}>
      <Spline scene={scene} className={className} onError={onError} />
    </Suspense>
  );
}
