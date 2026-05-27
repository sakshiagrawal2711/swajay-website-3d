'use client';

import { Suspense, lazy, useRef, useCallback, useEffect } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Disconnect observer on unmount
  useEffect(() => () => { observerRef.current?.disconnect() }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLoad = useCallback((spline: any) => {
    // ── 1. Cap pixel ratio ────────────────────────────────────────────────
    // Halves GPU pixel work on Retina displays — undetectable at hero sizes.
    try {
      spline.renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    } catch { /* renderer API may differ between Spline runtime versions */ }

    // ── 2. Pause render loop when canvas is fully off-screen ──────────────
    // The robot keeps rendering at 60 fps even when you scroll past the hero.
    // IntersectionObserver pauses it the moment it leaves the viewport and
    // restarts it when you scroll back — no visual change at all.
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        try {
          if (entry.isIntersecting) spline.play()
          else                      spline.stop()
        } catch { /* ignore if play/stop unavailable */ }
      },
      { threshold: 0 }
    )
    if (wrapperRef.current) observerRef.current.observe(wrapperRef.current)
  }, [])

  return (
    <div ref={wrapperRef} className={`w-full h-full ${className ?? ''}`}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-[#09090f]">
            <div className="relative flex items-center justify-center">
              {/* Outer ring */}
              <div className="absolute w-16 h-16 rounded-full border border-violet-500/20 animate-ping" />
              {/* Spinner */}
              <svg
                className="animate-spin h-8 w-8 text-violet-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-80"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"
                />
              </svg>
            </div>
          </div>
        }
      >
        <Spline scene={scene} onLoad={handleLoad} className="w-full h-full" />
      </Suspense>
    </div>
  )
}
