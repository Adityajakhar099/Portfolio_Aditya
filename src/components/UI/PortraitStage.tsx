import { useEffect, useRef } from 'react'
import { cn } from '../../utils'

export interface PortraitStageProps {
  portraitUrl: string | null
  placeholderUrl: string
  fullName: string
  onImageReady?: () => void
  className?: string
}

const FILM_GRAIN_SVG_URI =
  "data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"

/**
 * Dominant central portrait anchor in pure black (#030303) and surgical crimson studio rim lighting.
 * Engineered with 3D perspective hooks, dual-layer crimson aura, subtle film grain, controlled vignette,
 * and dedicated data-hero-* targets so GSAP ScrollTrigger drives silky layered transforms without Motion conflicts.
 */
export function PortraitStage({
  portraitUrl,
  placeholderUrl,
  fullName,
  onImageReady,
  className,
}: PortraitStageProps) {
  const activeSrc = portraitUrl ?? placeholderUrl
  const isStandIn = portraitUrl === null
  const imgRef = useRef<HTMLImageElement>(null)
  const notifiedRef = useRef(false)

  useEffect(() => {
    const img = imgRef.current
    if (!img || !onImageReady) return
    if (img.complete && !notifiedRef.current) {
      notifiedRef.current = true
      onImageReady()
    }
  }, [activeSrc, onImageReady])

  return (
    <figure
      data-hero-portrait-stage
      style={{ perspective: '1200px' }}
      className={cn(
        // Sized generously while respecting 768px laptop viewport height so 0% viewport never clips
        'relative mx-auto w-full max-w-[19.5rem] sm:max-w-[22.5rem] md:max-w-[23.5rem] lg:w-[min(25.5rem,calc((100svh_-_16.75rem)_*_0.85))] lg:max-w-none xl:w-[min(28.5rem,calc((100svh_-_16.5rem)_*_0.86))]',
        className,
      )}
    >
      {/* Layer 1: Deep Atmospheric Crimson Studio Halo */}
      <div
        aria-hidden="true"
        data-hero-portrait-glow
        className="pointer-events-none absolute -inset-x-16 -top-14 -bottom-12 -z-20 rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(229, 9, 37, 0.34) 0%, rgba(163, 13, 34, 0.16) 40%, rgba(3, 3, 3, 0) 73%)',
        }}
      />

      {/* Layer 2: Precision Orbital Crimson Hairline Ring */}
      <div
        aria-hidden="true"
        data-hero-portrait-ring
        className="pointer-events-none absolute left-1/2 top-3 -z-10 h-[106%] w-[108%] -translate-x-1/2 rounded-full border border-border-red opacity-65 will-change-transform"
        style={{
          maskImage:
            'radial-gradient(circle at 50% 35%, black 0%, rgba(0,0,0,0.6) 55%, transparent 82%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 35%, black 0%, rgba(0,0,0,0.6) 55%, transparent 82%)',
        }}
      />

      {/* Layer 3: Sculptural 3D Obsidian Portrait Monolith */}
      <div
        data-hero-portrait-card
        className="relative aspect-[4/4.65] w-full overflow-hidden rounded-2xl border border-border-subtle bg-black-pure shadow-[0_40px_110px_-20px_rgba(0,0,0,0.98),0_0_50px_-18px_rgba(229,9,37,0.28)] will-change-transform [transform-style:preserve-3d]"
      >
        {/* Top Surgical Crimson Rim Hairline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[1.5px] bg-gradient-to-r from-transparent via-crimson-primary to-transparent"
        />

        {/* Subtle Left & Right Crimson Studio Edge Catch-Lights */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[1px] bg-gradient-to-b from-crimson-primary/45 via-crimson-primary/15 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[1px] bg-gradient-to-b from-crimson-primary/35 via-transparent to-transparent"
        />

        {/* Precision Viewfinder Registration Marks */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-3.5 z-30">
          <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-text-primary/45" />
          <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-text-primary/45" />
          <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-text-primary/35" />
          <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-text-primary/35" />
        </div>

        {/* Photographic Subject Layer (Anchored object-top/center so face/crown never clips) */}
        <img
          ref={imgRef}
          data-hero-portrait-img
          src={activeSrc}
          alt={
            isStandIn
              ? `${fullName} — Editorial monochrome and crimson studio portrait stand-in`
              : `${fullName} — Portrait`
          }
          width={900}
          height={1125}
          fetchPriority="high"
          decoding="async"
          onLoad={() => {
            if (!notifiedRef.current) {
              notifiedRef.current = true
              onImageReady?.()
            }
          }}
          className="h-full w-full object-cover object-[50%_18%] will-change-transform select-none"
        />

        {/* Subtle Studio Film Grain Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage: `url("${FILM_GRAIN_SVG_URI}")`,
            backgroundSize: '160px 160px',
          }}
        />

        {/* Controlled Deep-Black Edge & Bottom Vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              'radial-gradient(ellipse 84% 82% at 50% 42%, rgba(3,3,3,0) 48%, rgba(3,3,3,0.72) 100%), linear-gradient(180deg, rgba(3,3,3,0.16) 0%, rgba(3,3,3,0) 46%, rgba(3,3,3,0.94) 100%)',
          }}
        />

        {/* Scene 04 Controlled Scrim (Deepens smoothly when foreground statement overlaps) */}
        <div
          aria-hidden="true"
          data-hero-portrait-scrim
          className="pointer-events-none absolute inset-0 z-20 bg-black-pure opacity-0 will-change-[opacity]"
        />

        {/* Intentional Studio Stand-In Plate (fades cleanly during deep scroll scenes) */}
        {isStandIn && (
          <figcaption
            data-hero-portrait-caption
            className="absolute inset-x-3.5 bottom-3.5 z-30 flex items-center justify-between gap-2 rounded-md border border-border-subtle bg-black-pure/88 px-3 py-1.5 backdrop-blur-xs"
          >
            <span className="inline-flex items-center gap-2 font-body text-[0.625rem] font-semibold tracking-[0.16em] uppercase text-text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson-primary" aria-hidden="true" />
              EDITORIAL STAND-IN
            </span>
            <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-text-muted">
              FRAME 01
            </span>
          </figcaption>
        )}
      </div>
    </figure>
  )
}
