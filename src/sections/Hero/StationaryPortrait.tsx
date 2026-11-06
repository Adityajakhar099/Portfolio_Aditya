import { useEffect, useRef } from 'react'

export interface StationaryPortraitProps {
  portraitUrl: string | null
  fallbackUrl?: string
  fullName: string
  onImageReady?: () => void
}

/**
 * STATIONARY PORTRAIT LAYER (z-20)
 *
 * Non-Negotiable Spatial Contract:
 * - Renders ONE single shared <img> element (`[data-stationary-portrait-img]`) in the entire hero.
 * - Positioned on the right-center architectural focal axis on desktop/tablet (`63.5%`) and
 *   upper-center on mobile (`53%`), NEVER animated in x, y, or scale (Δx = 0, Δy = 0).
 * - High-contrast cinematic black-and-white treatment with deep #030303 shadows and controlled
 *   #E50925 crimson studio rim lighting.
 * - Masked via GPU-composited screen-space aperture variables (`--r1-*`, `--r2-*`, `--r3-*`,
 *   `--mask-base`) synced 1:1 with the moving panels.
 */
export function StationaryPortrait({
  portraitUrl,
  fallbackUrl = '/images/hero-stationary-portrait.jpg',
  fullName,
  onImageReady,
}: StationaryPortraitProps) {
  const activeSrc = portraitUrl ?? fallbackUrl
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

  const multiApertureMask = [
    'linear-gradient(rgba(255,255,255,var(--mask-base,0)), rgba(255,255,255,var(--mask-base,0)))',
    'linear-gradient(#ffffff, #ffffff)',
    'linear-gradient(#ffffff, #ffffff)',
    'linear-gradient(#ffffff, #ffffff)',
  ].join(', ')

  const multiAperturePosition = [
    '0px 0px',
    'var(--r1-x, 0px) var(--r1-y, 0px)',
    'var(--r2-x, 0px) var(--r2-y, 0px)',
    'var(--r3-x, 0px) var(--r3-y, 0px)',
  ].join(', ')

  const multiApertureSize = [
    '100% 100%',
    'var(--r1-w, 0px) var(--r1-h, 0px)',
    'var(--r2-w, 0px) var(--r2-h, 0px)',
    'var(--r3-w, 0px) var(--r3-h, 0px)',
  ].join(', ')

  return (
    <>
      {/* Controlled Crimson Studio Rim Backlight Behind Portrait Stage (z-[12]) */}
      <div
        aria-hidden="true"
        data-stationary-glow
        className="pointer-events-none absolute top-[11%] h-[44%] md:top-[10%] md:bottom-[8%] md:h-auto left-[54%] md:left-[65.5%] lg:left-[64.5%] z-[12] w-[min(84vw,28rem)] md:w-[min(58vw,42rem)] -translate-x-1/2 opacity-0 will-change-[opacity,transform]"
        style={{
          background:
            'radial-gradient(ellipse 46% 48% at 50% 42%, rgba(229, 9, 37, 0.20) 0%, rgba(143, 7, 26, 0.08) 46%, rgba(3, 3, 3, 0) 74%)',
        }}
      />

      {/* Single Shared Stationary Portrait Masked by Live Architectural Panel Apertures (z-20) */}
      <div
        data-stationary-mask-stage
        className="pointer-events-none absolute inset-0 z-20 select-none"
        style={{
          WebkitMaskImage: multiApertureMask,
          maskImage: multiApertureMask,
          WebkitMaskPosition: multiAperturePosition,
          maskPosition: multiAperturePosition,
          WebkitMaskSize: multiApertureSize,
          maskSize: multiApertureSize,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskComposite: 'source-over',
          maskComposite: 'add',
        }}
      >
        <figure
          data-stationary-portrait
          className="pointer-events-none absolute top-[11.5%] h-[43%] w-[19.5rem] left-[calc(54%_-_9.75rem)] md:top-[9.5%] md:bottom-[7%] md:h-auto md:w-[27rem] md:left-[calc(65.5%_-_13.5rem)] lg:top-[8.5%] lg:bottom-[5%] lg:w-[clamp(33rem,45vw,45rem)] lg:left-[calc(64.5%_-_clamp(16.5rem,22.5vw,22.5rem))]"
        >
          <div
            className="relative h-full w-full overflow-hidden bg-black-pure"
            style={{
              WebkitMaskImage:
                'radial-gradient(ellipse 50% 49% at 50% 46%, black 52%, rgba(0,0,0,0.64) 72%, transparent 96%)',
              maskImage:
                'radial-gradient(ellipse 50% 49% at 50% 46%, black 52%, rgba(0,0,0,0.64) 72%, transparent 96%)',
            }}
          >
            <img
              ref={imgRef}
              data-stationary-portrait-img
              src={activeSrc}
              alt={`${fullName} — Studio portrait`}
              width={1080}
              height={1440}
              fetchPriority="high"
              decoding="async"
              onLoad={() => {
                if (!notifiedRef.current) {
                  notifiedRef.current = true
                  onImageReady?.()
                }
              }}
              className="h-full w-full object-cover object-[50%_14%] grayscale-[0.22] contrast-[1.16] brightness-[0.94]"
            />

            {/* Controlled Crimson Rim Lighting Along Jawline & Right Studio Contour */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-screen opacity-45"
              style={{
                background:
                  'radial-gradient(ellipse 52% 48% at 56% 35%, rgba(229, 9, 37, 0.28) 0%, rgba(229, 9, 37, 0) 66%)',
              }}
            />

            {/* Deep #030303 Studio Shadow Feathering */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  'linear-gradient(90deg, #030303 0%, rgba(3,3,3,0) 15%, rgba(3,3,3,0) 85%, #030303 100%)',
                  'linear-gradient(180deg, #030303 0%, rgba(3,3,3,0) 10%, rgba(3,3,3,0) 54%, rgba(3,3,3,0.76) 88%, #030303 100%)',
                ].join(', '),
              }}
            />
          </div>
        </figure>
      </div>
    </>
  )
}
