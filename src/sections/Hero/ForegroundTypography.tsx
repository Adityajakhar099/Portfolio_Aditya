import { heroIdentity } from '../../data/experience'

/**
 * FOREGROUND TYPOGRAPHY LAYER (z-40 — Stacked Editorial Identity Monolith)
 *
 * Implements Composition Option B (Stacked Identity):
 * - Two bold, tightly stacked `Bebas Neue` lines (`ADITYA` / `JAKHAR.`) matched in
 *   visual block width via calibrated optical tracking (`0.048em` vs `0.016em`).
 * - Rendered at 100% solid `#F5F2EF` ivory with `#E50925` crimson reserved strictly
 *   for the intentional period accent after `JAKHAR.`.
 * - Positioned inside the left editorial safe column on desktop/tablet (`>= 768px`)
 *   and cleanly below the two-panel portrait stage on mobile (`< 768px`), leaving
 *   the portrait's eyes, nose, mouth, and jawline 100% unobstructed.
 */
export function ForegroundTypography() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[55%] md:top-1/2 md:-translate-y-1/2 md:pt-5 z-40 select-none">
      <div className="editorial-container">
        <div className="max-w-[21.5rem] md:max-w-[19.5rem] lg:max-w-[33rem]">
          {/* Subtle Handwritten Accent Greeting */}
          <div
            data-fg-support-scroll
            className="mb-1 sm:mb-1.5 will-change-[transform,opacity]"
          >
            <span
              data-fg-greeting-enter
              className="inline-block font-accent text-[1.2rem] sm:text-[1.45rem] leading-none text-text-muted/90 will-change-[transform,opacity]"
            >
              {heroIdentity.scriptIntro}
            </span>
          </div>

          {/* Primary Stacked Display Identity (`ADITYA` / `JAKHAR.`) */}
          <h1
            id="hero-display-heading"
            className="font-display text-[clamp(3.45rem,14.6vw,4.35rem)] md:text-[4.4rem] lg:text-[clamp(5rem,min(9.4vw,15.8svh),9.75rem)] leading-[0.82] uppercase text-text-primary"
          >
            {/* Line 1: ADITYA (Enters directionally from left; glides subtly left on 20%–40% scroll) */}
            <span
              data-name-aditya-scroll
              className="block will-change-[transform,opacity]"
            >
              <span className="block overflow-hidden pr-2">
                <span
                  data-name-aditya-enter
                  className="block tracking-[0.048em] will-change-[transform,opacity]"
                >
                  {heroIdentity.firstName}
                </span>
              </span>
            </span>

            {/* Line 2: JAKHAR. (Enters directionally from right; glides subtly right on 20%–40% scroll) */}
            <span
              data-name-jakhar-scroll
              className="mt-[0.02em] block will-change-[transform,opacity]"
            >
              <span className="block overflow-hidden pr-2">
                <span
                  data-name-jakhar-enter
                  className="block tracking-[0.016em] will-change-[transform,opacity]"
                >
                  {heroIdentity.lastName}
                  <span className="text-crimson-primary">.</span>
                </span>
              </span>
            </span>
          </h1>

          {/* Concise Personal Statement & Supporting Thesis Eyebrow */}
          <div
            data-fg-support-scroll
            className="mt-3.5 sm:mt-5 lg:mt-6 will-change-[transform,opacity]"
          >
            <div
              data-fg-support-enter
              className="will-change-[transform,opacity]"
            >
              {/* Architectural Divider Rule with Crimson Leading Accent */}
              <div
                aria-hidden="true"
                data-fg-rule
                className="mb-3 sm:mb-3.5 flex h-[1px] w-full max-w-[18.5rem] lg:max-w-[23rem] origin-left items-center bg-border-subtle will-change-transform"
              >
                <span className="h-[1px] w-8 bg-crimson-primary" />
              </div>

              <p className="font-display text-[1.08rem] sm:text-[1.22rem] lg:text-[1.42rem] leading-none tracking-[0.045em] uppercase text-text-primary">
                ENGINEERING IDEAS<span className="text-crimson-primary">.</span>{' '}
                <span className="text-text-muted">BUILDING IMPACT</span>
                <span className="text-crimson-primary">.</span>
              </p>

              <p className="mt-2 max-w-[20.5rem] md:max-w-[18.5rem] lg:max-w-[24.5rem] font-body text-[0.76rem] sm:text-[0.82rem] lg:text-[0.88rem] leading-[1.58] text-text-muted">
                Full-stack systems, retrieval-augmented AI pipelines, and clean
                software architecture built for real-world impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
