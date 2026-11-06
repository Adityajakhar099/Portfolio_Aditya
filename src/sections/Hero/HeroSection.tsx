import { useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef } from 'react'
import {
  GSAP_MEDIA_QUERIES,
  gsap,
  ScrollTrigger,
  useGSAP,
} from '../../animations'
import { heroIdentity } from '../../data/experience'
import { BackgroundTypography } from './BackgroundTypography'
import { EditorialAnnotations } from './EditorialAnnotations'
import { ForegroundTypography } from './ForegroundTypography'
import { PanelLayer } from './PanelLayer'
import { StationaryPortrait } from './StationaryPortrait'

interface MaskAmbientState {
  introBase: number
  scrollBase: number
}

/**
 * Synchronizes the three live architectural panel rectangles (`[data-panel-enter="1..3"]`)
 * into CSS custom properties (`--r1-*`, `--r2-*`, `--r3-*`) on `[data-stationary-mask-stage]`.
 *
 * Because the underlying `<img data-stationary-portrait-img>` is NEVER transformed,
 * updating only these screen-space mask apertures guarantees that all moving panels
 * reveal the exact same stationary photographic coordinate space (Δx = 0, Δy = 0).
 */
function syncStationaryMaskApertures(
  root: HTMLElement | null,
  ambient: MaskAmbientState,
) {
  if (!root) return
  const maskStage = root.querySelector<HTMLElement>(
    '[data-stationary-mask-stage]',
  )
  if (!maskStage) return

  const stageRect = maskStage.getBoundingClientRect()
  if (stageRect.width <= 0 || stageRect.height <= 0) return

  const combinedBase = Math.min(
    1,
    Math.max(0, ambient.introBase, ambient.scrollBase),
  )
  maskStage.style.setProperty('--mask-base', combinedBase.toFixed(3))

  for (const id of ['1', '2', '3'] as const) {
    const panelEl = root.querySelector<HTMLElement>(`[data-panel-enter="${id}"]`)
    if (!panelEl) {
      maskStage.style.setProperty(`--r${id}-w`, '0px')
      maskStage.style.setProperty(`--r${id}-h`, '0px')
      continue
    }

    const panelOpacity = Number(gsap.getProperty(panelEl, 'opacity') ?? 1)
    const rect = panelEl.getBoundingClientRect()

    if (panelOpacity < 0.02 || rect.width <= 0.5 || rect.height <= 0.5) {
      maskStage.style.setProperty(`--r${id}-w`, '0px')
      maskStage.style.setProperty(`--r${id}-h`, '0px')
      continue
    }

    const x = Math.max(0, rect.left - stageRect.left)
    const y = Math.max(0, rect.top - stageRect.top)
    const right = Math.min(stageRect.width, rect.right - stageRect.left)
    const bottom = Math.min(stageRect.height, rect.bottom - stageRect.top)
    const w = Math.max(0, right - x)
    const h = Math.max(0, bottom - y)

    maskStage.style.setProperty(`--r${id}-x`, `${x.toFixed(1)}px`)
    maskStage.style.setProperty(`--r${id}-y`, `${y.toFixed(1)}px`)
    maskStage.style.setProperty(`--r${id}-w`, `${w.toFixed(1)}px`)
    maskStage.style.setProperty(`--r${id}-h`, `${h.toFixed(1)}px`)
  }
}

/**
 * TIMELINE 1 — INITIAL 7-STEP DIRECTIONAL ENTRANCE SEQUENCE (`0.0s -> 1.75s`)
 *
 * Strictly targets `*-enter` inner wrappers and ambient mask opacity so it never
 * collides with ScrollTrigger's `*-scroll` wrappers. Portrait x/y stays untouched.
 *
 * Sequence:
 * 1. `0.00s`: Pure `#030303` black canvas
 * 2. `0.22s`: Stationary portrait emerges with controlled `#E50925` studio rim glow
 * 3. `0.42s`: Panels `P.01` (top), `P.02` (bottom), `P.03` (right) slide into architectural positions
 * 4. `0.94s`: `ADITYA` reveals cleanly from the left (`xPercent: -106 -> 0`)
 * 5. `1.10s`: `JAKHAR.` reveals cleanly from the right (`xPercent: 106 -> 0`)
 * 6. `1.32s`: Personal statement & safe-area editorial metadata enter
 * 7. `1.75s`: Composition settles into a unified gallery-grade frame
 */
function buildInitialEntranceTimeline(
  ambient: MaskAmbientState,
  onFrameSync: () => void,
) {
  ambient.introBase = 0

  gsap.set('[data-stationary-glow]', { opacity: 0, scale: 0.96 })
  gsap.set('[data-panel-enter="1"]', { yPercent: -108, opacity: 0 })
  gsap.set('[data-panel-enter="2"]', { yPercent: 108, opacity: 0 })
  gsap.set('[data-panel-enter="3"]', { xPercent: 112, opacity: 0 })
  gsap.set('[data-fg-greeting-enter]', { opacity: 0, y: 10 })
  gsap.set('[data-name-aditya-enter]', { xPercent: -106, opacity: 0 })
  gsap.set('[data-name-jakhar-enter]', { xPercent: 106, opacity: 0 })
  gsap.set('[data-fg-support-enter]', { opacity: 0, y: 14 })
  gsap.set('[data-fg-rule]', { scaleX: 0 })
  gsap.set('[data-meta-enter]', { opacity: 0, y: 8 })

  onFrameSync()

  const entranceTl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onUpdate: onFrameSync,
    onComplete: onFrameSync,
  })

  entranceTl
    // Step 2 (0.22s): Portrait reveals softly with controlled crimson studio rim
    .to(
      ambient,
      { introBase: 0.42, duration: 0.46, ease: 'power2.out' },
      0.22,
    )
    .to(
      '[data-stationary-glow]',
      { opacity: 0.88, scale: 1, duration: 0.72, ease: 'power2.out' },
      0.22,
    )
    // Step 3 (0.42s – 0.74s): Three differentiated panels slide into architectural alignment
    .to(
      '[data-panel-enter="1"]',
      { yPercent: 0, opacity: 1, duration: 0.76 },
      0.42,
    )
    .to(
      '[data-panel-enter="2"]',
      { yPercent: 0, opacity: 1, duration: 0.78 },
      0.56,
    )
    .to(
      '[data-panel-enter="3"]',
      { xPercent: 0, opacity: 1, duration: 0.74 },
      0.7,
    )
    .to(
      ambient,
      { introBase: 0, duration: 0.5, ease: 'sine.inOut' },
      0.86,
    )
    // Step 4 (0.94s): Greeting + ADITYA reveals from the left
    .to(
      '[data-fg-greeting-enter]',
      { opacity: 1, y: 0, duration: 0.48, ease: 'power2.out' },
      0.9,
    )
    .to(
      '[data-name-aditya-enter]',
      { xPercent: 0, opacity: 1, duration: 0.72, ease: 'power3.out' },
      0.94,
    )
    // Step 5 (1.10s): JAKHAR. reveals from the opposite direction (right)
    .to(
      '[data-name-jakhar-enter]',
      { xPercent: 0, opacity: 1, duration: 0.72, ease: 'power3.out' },
      1.1,
    )
    // Step 6 (1.32s): Personal statement + distilled safe-area metadata enter
    .to(
      '[data-fg-rule]',
      { scaleX: 1, duration: 0.58, ease: 'power3.out' },
      1.28,
    )
    .to(
      '[data-fg-support-enter]',
      { opacity: 1, y: 0, duration: 0.56, ease: 'power2.out' },
      1.32,
    )
    .to(
      '[data-meta-enter]',
      {
        opacity: 1,
        y: 0,
        duration: 0.48,
        stagger: 0.04,
        ease: 'power2.out',
      },
      1.38,
    )

  return entranceTl
}

/**
 * SECTION 01 — EDITORIAL STACKED-IDENTITY & STATIONARY-PORTRAIT INDEX HERO
 *
 * Architecture:
 * - Stationary right-center studio portrait (`StationaryPortrait`, z-20 — Δx = 0, Δy = 0)
 * - Three differentiated moving vertical panels (`PanelLayer`, z-30 — 2 panels on <768px)
 * - Stacked `ADITYA` / `JAKHAR.` monolith + concise personal statement (`ForegroundTypography`, z-40)
 * - `40%–60%` backdrop transformation + `60%–80%` masked `ENGINEERING IDEAS. / BUILDING IMPACT.` (`BackgroundTypography`)
 * - Distilled safe-area editorial metadata (`EditorialAnnotations`, z-[45])
 */
export function HeroSection() {
  const prefersReducedMotion = Boolean(useReducedMotion())

  const sectionRef = useRef<HTMLElement>(null)
  const compositionRef = useRef<HTMLDivElement>(null)
  const ctaClusterRef = useRef<HTMLDivElement>(null)
  const ctaInertRef = useRef(false)
  const ambientRef = useRef<MaskAmbientState>({ introBase: 0, scrollBase: 0 })

  const syncMask = useCallback(() => {
    syncStationaryMaskApertures(sectionRef.current, ambientRef.current)
  }, [])

  const handleImageReady = useCallback(() => {
    syncMask()
    ScrollTrigger.refresh()
  }, [syncMask])

  // Keep stationary portrait mask apertures aligned in reduced-motion or viewport resizes
  useEffect(() => {
    if (!prefersReducedMotion) return
    ambientRef.current.introBase = 0
    ambientRef.current.scrollBase = 0
    syncMask()

    window.addEventListener('resize', syncMask)
    return () => window.removeEventListener('resize', syncMask)
  }, [prefersReducedMotion, syncMask])

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section || prefersReducedMotion) return

      const ambient = ambientRef.current
      ambient.introBase = 0
      ambient.scrollBase = 0

      const resetCtaInteractivity = () => {
        ctaInertRef.current = false
        if (ctaClusterRef.current) {
          ctaClusterRef.current.inert = false
          ctaClusterRef.current.style.pointerEvents = 'auto'
        }
      }

      // 1. Initial 7-Step Directional Entrance Sequence
      const entranceTl = buildInitialEntranceTimeline(ambient, syncMask)

      const mm = gsap.matchMedia()

      /**
       * TIMELINE 2 — 5-BAND REVERSIBLE SCROLL CHOREOGRAPHY (`0% -> 100%`)
       * StationaryPortrait (`[data-stationary-portrait-img]`) is NEVER moved or scaled.
       */
      const buildScrollChoreography = (
        tier: 'desktop' | 'tablet' | 'mobile',
      ) => {
        const stage = compositionRef.current
        if (!stage) return

        const s = tier === 'desktop' ? 1 : tier === 'tablet' ? 0.68 : 0.42
        const runwayMultiplier =
          tier === 'desktop' ? 2.05 : tier === 'tablet' ? 1.6 : 1.3
        const scrubSmoothing =
          tier === 'desktop' ? 0.55 : tier === 'tablet' ? 0.45 : 0.38

        ambient.scrollBase = 0

        // Deterministic 0% scroll baseline across all `*-scroll` wrappers
        gsap.set(
          [
            '[data-panel-scroll="1"]',
            '[data-panel-scroll="2"]',
            '[data-panel-scroll="3"]',
          ],
          { x: 0, y: 0, opacity: 1 },
        )
        gsap.set(['[data-panel-perimeter]', '[data-panel-tag]'], { opacity: 1 })
        gsap.set('[data-panel-line]', { opacity: 1 })
        gsap.set(['[data-name-aditya-scroll]', '[data-name-jakhar-scroll]'], {
          x: 0,
          y: 0,
          opacity: 1,
        })
        gsap.set('[data-fg-support-scroll]', { y: 0, opacity: 1 })
        gsap.set('[data-meta-top-scroll]', { y: 0, opacity: 1 })
        gsap.set('[data-bottom-bar-scroll]', { y: 0, opacity: 1 })

        // 40%–60% Backdrop watermark & 60%–80% Engineering statement initial state
        gsap.set('[data-bg-watermark]', { xPercent: 5, opacity: 0 })
        gsap.set('[data-stmt-stage]', { autoAlpha: 0, y: 0 })
        gsap.set('[data-stmt-eyebrow]', { yPercent: 110, opacity: 0 })
        gsap.set('[data-stmt-line-1]', {
          yPercent: 108,
          x: -22 * s,
          opacity: 0,
        })
        gsap.set('[data-stmt-fill-1]', {
          clipPath: 'inset(0% 100% 0% 0%)',
        })
        gsap.set('[data-stmt-line-2]', {
          yPercent: 108,
          x: 28 * s,
          opacity: 0,
        })
        gsap.set('[data-stmt-fill-2]', {
          clipPath: 'inset(0% 100% 0% 0%)',
        })
        gsap.set('[data-stmt-caption]', { y: 14 * s, opacity: 0 })
        gsap.set('[data-hero-horizon-fade]', { opacity: 0 })
        gsap.set('[data-hero-handoff-line]', { scaleY: 0, opacity: 0 })

        syncMask()

        const scrollTl = gsap.timeline({
          defaults: { ease: 'none' },
          onUpdate: syncMask,
          scrollTrigger: {
            trigger: stage,
            pin: true,
            anticipatePin: 1,
            refreshPriority: 3,
            scrub: scrubSmoothing,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * runwayMultiplier)}`,
            invalidateOnRefresh: true,
            onRefresh: syncMask,
            onUpdate: (self) => {
              syncMask()

              const shouldDisableCta = self.progress > 0.8
              if (ctaInertRef.current !== shouldDisableCta) {
                ctaInertRef.current = shouldDisableCta
                if (ctaClusterRef.current) {
                  ctaClusterRef.current.inert = shouldDisableCta
                  ctaClusterRef.current.style.pointerEvents = shouldDisableCta
                    ? 'none'
                    : 'auto'
                }
              }
            },
          },
        })

        /* -------------------------------------------------------------------
           0% – 20%: Complete editorial portrait composition visible with
                     subtle initial differential tension across the 3 panels
           ------------------------------------------------------------------- */
        scrollTl
          .to(
            '[data-panel-scroll="1"]',
            { x: -18 * s, y: 5 * s, duration: 0.2, ease: 'sine.inOut' },
            0,
          )
          .to(
            '[data-panel-scroll="2"]',
            { y: -10 * s, duration: 0.2, ease: 'sine.inOut' },
            0,
          )
          .to(
            '[data-panel-scroll="3"]',
            { x: 20 * s, y: -5 * s, duration: 0.2, ease: 'sine.inOut' },
            0,
          )

        /* -------------------------------------------------------------------
           20% – 40%: Panels move apart independently; portrait stays stationary;
                      ADITYA & JAKHAR. transition into dynamic offset alignment
           ------------------------------------------------------------------- */
        scrollTl
          .to(
            '[data-panel-scroll="1"]',
            { x: -96 * s, y: 18 * s, duration: 0.2, ease: 'power1.inOut' },
            0.2,
          )
          .to(
            '[data-panel-scroll="2"]',
            { y: -28 * s, duration: 0.2, ease: 'power1.inOut' },
            0.2,
          )
          .to(
            '[data-panel-scroll="3"]',
            { x: 88 * s, y: -18 * s, duration: 0.2, ease: 'power1.inOut' },
            0.2,
          )
          .to(
            '[data-name-aditya-scroll]',
            { x: -16 * s, y: -4 * s, duration: 0.2, ease: 'power1.inOut' },
            0.2,
          )
          .to(
            '[data-name-jakhar-scroll]',
            { x: 36 * s, y: 4 * s, duration: 0.2, ease: 'power1.inOut' },
            0.2,
          )
          .to(
            '[data-fg-support-scroll]',
            { y: 10 * s, opacity: 0.45, duration: 0.2, ease: 'sine.inOut' },
            0.2,
          )

        /* -------------------------------------------------------------------
           40% – 60%: Portrait becomes the dominant focal point; supporting text
                      & primary name move away; background watermark transforms
           ------------------------------------------------------------------- */
        scrollTl
          .to(
            '[data-panel-scroll="1"]',
            { x: -178 * s, y: 24 * s, duration: 0.2, ease: 'power1.inOut' },
            0.4,
          )
          .to(
            '[data-panel-scroll="2"]',
            { y: -44 * s, duration: 0.2, ease: 'power1.inOut' },
            0.4,
          )
          .to(
            '[data-panel-scroll="3"]',
            { x: 142 * s, y: -24 * s, duration: 0.2, ease: 'power1.inOut' },
            0.4,
          )
          .to(
            ambient,
            { scrollBase: 0.94, duration: 0.18, ease: 'power2.out' },
            0.4,
          )
          .to(
            ['[data-panel-perimeter]', '[data-panel-tag]'],
            { opacity: 0.16, duration: 0.18, ease: 'power2.out' },
            0.42,
          )
          .to(
            '[data-fg-support-scroll]',
            { y: 24 * s, opacity: 0, duration: 0.1, ease: 'power2.inOut' },
            0.35,
          )
          .to(
            '[data-name-aditya-scroll]',
            {
              x: -48 * s,
              y: -16 * s,
              opacity: 0,
              duration: 0.11,
              ease: 'power2.inOut',
            },
            0.36,
          )
          .to(
            '[data-name-jakhar-scroll]',
            {
              x: 72 * s,
              y: 14 * s,
              opacity: 0,
              duration: 0.11,
              ease: 'power2.inOut',
            },
            0.37,
          )
          .to(
            '[data-bg-watermark]',
            { xPercent: -2, opacity: 1, duration: 0.2, ease: 'sine.inOut' },
            0.4,
          )

        /* -------------------------------------------------------------------
           60% – 80%: ENGINEERING IDEAS. reveals first, BUILDING IMPACT. follows
                      with masked typography, outlined-to-solid sweep & glide
           ------------------------------------------------------------------- */
        scrollTl
          .to(
            '[data-panel-scroll="1"]',
            { x: -245 * s, y: 14 * s, duration: 0.2, ease: 'power2.out' },
            0.6,
          )
          .to(
            '[data-panel-scroll="2"]',
            { y: -54 * s, duration: 0.2, ease: 'power2.out' },
            0.6,
          )
          .to(
            '[data-panel-scroll="3"]',
            { x: 175 * s, y: -14 * s, duration: 0.2, ease: 'power2.out' },
            0.6,
          )
          .to(
            ['[data-panel-perimeter]', '[data-panel-tag]'],
            { opacity: 0, duration: 0.14, ease: 'power2.out' },
            0.6,
          )
          .to(
            ambient,
            { scrollBase: 0.98, duration: 0.16, ease: 'sine.out' },
            0.6,
          )
          .to(
            '[data-bg-watermark]',
            { xPercent: -6, opacity: 0.35, duration: 0.2, ease: 'sine.out' },
            0.6,
          )
          .to('[data-stmt-stage]', { autoAlpha: 1, duration: 0.01 }, 0.59)
          .to(
            '[data-stmt-eyebrow]',
            { yPercent: 0, opacity: 1, duration: 0.09, ease: 'power2.out' },
            0.6,
          )
          // First line: ENGINEERING IDEAS.
          .to(
            '[data-stmt-line-1]',
            {
              yPercent: 0,
              x: 0,
              opacity: 1,
              duration: 0.1,
              ease: 'power3.out',
            },
            0.6,
          )
          .to(
            '[data-stmt-fill-1]',
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.09,
              ease: 'power2.inOut',
            },
            0.61,
          )
          // Second line follows staggered: BUILDING IMPACT.
          .to(
            '[data-stmt-line-2]',
            {
              yPercent: 0,
              x: 0,
              opacity: 1,
              duration: 0.1,
              ease: 'power3.out',
            },
            0.64,
          )
          .to(
            '[data-stmt-fill-2]',
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.09,
              ease: 'power2.inOut',
            },
            0.65,
          )
          .to(
            '[data-stmt-caption]',
            { y: 0, opacity: 1, duration: 0.1, ease: 'power2.out' },
            0.67,
          )

        /* -------------------------------------------------------------------
           80% – 100%: Composition dissolves smoothly into Section 02
                       (`#storytelling`) with zero blank scroll gap
           ------------------------------------------------------------------- */
        scrollTl
          .to(
            ambient,
            { scrollBase: 1, duration: 0.16, ease: 'sine.out' },
            0.8,
          )
          .to(
            '[data-panel-scroll="1"]',
            { x: -278 * s, opacity: 0.35, duration: 0.2, ease: 'power1.out' },
            0.8,
          )
          .to(
            '[data-panel-scroll="2"]',
            { opacity: 0.22, duration: 0.2, ease: 'power1.out' },
            0.8,
          )
          .to(
            '[data-panel-scroll="3"]',
            { x: 196 * s, opacity: 0.35, duration: 0.2, ease: 'power1.out' },
            0.8,
          )
          .to(
            '[data-stmt-line-1]',
            { x: 10 * s, duration: 0.2, ease: 'sine.inOut' },
            0.8,
          )
          .to(
            '[data-stmt-line-2]',
            { x: -10 * s, duration: 0.2, ease: 'sine.inOut' },
            0.8,
          )
          .to(
            '[data-stmt-stage]',
            {
              y: -18 * s,
              opacity: 0.18,
              duration: 0.18,
              ease: 'power2.inOut',
            },
            0.82,
          )
          .to(
            ['[data-meta-top-scroll]', '[data-bottom-bar-scroll]'],
            { opacity: 0, y: 8, duration: 0.14, ease: 'power2.in' },
            0.82,
          )
          .to(
            '[data-bg-watermark]',
            { opacity: 0, duration: 0.16, ease: 'power1.out' },
            0.82,
          )
          .to(
            '[data-hero-horizon-fade]',
            { opacity: 1, duration: 0.18, ease: 'power1.inOut' },
            0.82,
          )
          .to(
            '[data-hero-handoff-line]',
            { scaleY: 1, opacity: 1, duration: 0.18, ease: 'power2.out' },
            0.82,
          )

        return () => {
          resetCtaInteractivity()
          scrollTl.scrollTrigger?.kill()
          scrollTl.kill()
        }
      }

      // Desktop (>= 1024px): Full 3-panel cinematic composition
      mm.add(
        `${GSAP_MEDIA_QUERIES.desktop} and ${GSAP_MEDIA_QUERIES.motionAllowed}`,
        () => buildScrollChoreography('desktop'),
      )

      // Tablet (768px - 1023px): 3-panel composition with calibrated distances
      mm.add(
        `${GSAP_MEDIA_QUERIES.tablet} and ${GSAP_MEDIA_QUERIES.motionAllowed}`,
        () => buildScrollChoreography('tablet'),
      )

      // Mobile (< 768px): Simplified 2-panel composition with clear stacked identity
      mm.add(
        `${GSAP_MEDIA_QUERIES.smallMobile} and ${GSAP_MEDIA_QUERIES.motionAllowed}`,
        () => buildScrollChoreography('mobile'),
      )

      const handleResize = () => {
        syncMask()
      }
      window.addEventListener('resize', handleResize)

      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          syncMask()
          ScrollTrigger.refresh()
        })
      }

      return () => {
        window.removeEventListener('resize', handleResize)
        resetCtaInteractivity()
        entranceTl.kill()
        mm.revert()
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, syncMask] },
  )

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-display-heading"
      className="relative overflow-x-clip bg-black-pure"
    >
      {/* Screen-reader accessible summary */}
      <p className="sr-only">
        Aditya Jakhar — Computer Science Engineer, Full-Stack Developer, and
        AI/ML Systems Builder at LNMIIT Jaipur. Engineering Ideas. Building
        Impact.
      </p>

      {/* =====================================================================
          HERO EDITORIAL INDEX STAGE (`#030303` Negative Space Dominated)
          ===================================================================== */}
      <div
        ref={compositionRef}
        data-hero-composition
        className="relative isolate h-[100svh] min-h-[40rem] w-full overflow-hidden pt-16 bg-black-pure"
      >
        {/* 1. 40%–60% Backdrop Watermark & 60%–80% Masked Engineering Statement */}
        <BackgroundTypography />

        {/* 2. Single Shared Stationary Studio Portrait (z-20 — Δx = 0, Δy = 0) */}
        <StationaryPortrait
          portraitUrl={heroIdentity.portraitUrl}
          fullName={heroIdentity.fullName}
          onImageReady={handleImageReady}
        />

        {/* 3. Three Differentiated Moving Architectural Panels (z-30; 2 on Mobile) */}
        <PanelLayer />

        {/* 4. Stacked `ADITYA` / `JAKHAR.` Monolith & Personal Statement (z-40) */}
        <ForegroundTypography />

        {/* 5. Distilled Safe-Area Editorial Metadata & Scroll Indicator (z-[45]) */}
        <EditorialAnnotations ctaClusterRef={ctaClusterRef} />

        {/* 6. 80%–100% Obsidian Horizon Fade & Crimson Lead-Thread Handoff */}
        {!prefersReducedMotion && (
          <>
            <div
              aria-hidden="true"
              data-hero-horizon-fade
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[38] h-28 bg-gradient-to-t from-black-pure via-black-pure/85 to-transparent opacity-0"
            />
            <div
              aria-hidden="true"
              data-hero-handoff-line
              className="pointer-events-none absolute bottom-0 left-1/2 z-[46] h-12 w-[1px] -translate-x-1/2 origin-top bg-gradient-to-b from-crimson-primary to-red-signal opacity-0 will-change-transform"
            />
          </>
        )}
      </div>

      {/* Static Accessible Statement Band for Reduced-Motion Users */}
      {prefersReducedMotion && (
        <div className="border-t border-border-subtle bg-bg-primary py-12 text-center editorial-container">
          <p className="mb-2 font-mono text-xs font-semibold tracking-[0.18em] uppercase text-crimson-primary">
            01 // ENGINEERING THESIS
          </p>
          <p className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.88] tracking-[0.03em] uppercase text-text-primary">
            ENGINEERING <span className="text-crimson-primary">IDEAS.</span>{' '}
            BUILDING <span className="text-crimson-primary">IMPACT.</span>
          </p>
        </div>
      )}
    </section>
  )
}
