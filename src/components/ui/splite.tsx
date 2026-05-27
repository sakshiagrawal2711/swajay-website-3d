import { Suspense, lazy, useRef, useCallback, useEffect } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Disconnect observer on unmount
  useEffect(() => () => { observerRef.current?.disconnect() }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLoad = useCallback((spline: any) => {
    // ── 1. Cap pixel ratio ────────────────────────────────────────────────
    // On a 2× Retina display, WebGL renders 4× the pixels by default.
    // 1.5 is the sweet spot — ~44 % pixel-work saving, zero visible difference
    // at full-width hero sizes (the canvas is never viewed at native DPR).
    try {
      spline.renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    } catch { /* renderer API may differ between Spline runtime versions */ }

    // ── 2. Pause render loop when canvas is fully off-screen ──────────────
    // The WebGL loop continues at 60 fps even while scrolled away. This
    // kills it the moment the element leaves the viewport and restarts it
    // when it re-enters — zero visual difference, big CPU/GPU saving.
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
    <div ref={wrapperRef} className={className ?? 'w-full h-full'}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin" />
          </div>
        }
      >
        <Spline scene={scene} onLoad={handleLoad} className="w-full h-full" />
      </Suspense>
    </div>
  )
}
