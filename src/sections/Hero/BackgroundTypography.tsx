/**
 * BACKGROUND & SCROLL-REVEAL TYPOGRAPHY LAYER
 *
 * 1. Architectural Studio Backdrop Plane (`z-[11]`, Active During `40%–60%` Scroll):
 *    - Ultra-restrained `1px` architectural stroke watermark behind the stationary
 *      portrait that shifts horizontally as the foreground identity clears and the
 *      portrait becomes the undisputed focal centerpiece.
 *
 * 2. Art-Directed Two-Line Engineering Statement (`z-[36]`, Active During `60%–80%` Scroll):
 *    - Replaces the previous chest-level translucent bar entirely.
 *    - Positioned inside the left editorial safe column (`>= 768px`) beside the
 *      stationary portrait and in the lower safe stage on mobile (`< 768px`),
 *      never crossing or obscuring the portrait's face.
 *    - `ENGINEERING IDEAS.` reveals first, followed by `BUILDING IMPACT.` with
 *      masked vertical emergence, outlined-to-solid `clip-path` fill sweep, and
 *      differential horizontal scroll glide.
 */
export function BackgroundTypography() {
  return (
    <>
      {/* 1. 40%–60% Subtle Architectural Backdrop Watermark Behind Stationary Portrait (z-[11]) */}
      <div
        aria-hidden="true"
        data-bg-watermark
        className="pointer-events-none absolute inset-x-0 top-[44%] md:top-[46%] z-[11] flex justify-center overflow-hidden opacity-0 select-none will-change-[transform,opacity]"
      >
        <span
          className="font-display text-[clamp(4.5rem,15vw,14.5rem)] leading-none tracking-[0.08em] uppercase whitespace-nowrap text-transparent"
          style={{
            WebkitTextStroke: '1px rgba(245, 244, 242, 0.075)',
          }}
        >
          SYSTEMS // ARCHITECTURE
        </span>
      </div>

      {/* 2. 60%–80% Masked Outlined-to-Solid Engineering Statement (z-[36]) */}
      <div
        aria-hidden="true"
        data-stmt-stage
        className="pointer-events-none invisible absolute inset-x-0 top-[55.5%] md:top-1/2 md:-translate-y-1/2 md:pt-4 z-[36] select-none will-change-[transform,opacity]"
      >
        <div className="editorial-container">
          <div className="max-w-[21.5rem] md:max-w-[21rem] lg:max-w-[39rem]">
            {/* Eyebrow Coordinate */}
            <div className="mb-2.5 overflow-hidden">
              <span
                data-stmt-eyebrow
                className="inline-flex items-center gap-2.5 font-mono text-[0.58rem] font-semibold tracking-[0.24em] uppercase text-crimson-primary will-change-[transform,opacity]"
              >
                <span className="h-[1px] w-5 bg-crimson-primary" />
                <span>01 // ENGINEERING THESIS</span>
              </span>
            </div>

            {/* Line 1: ENGINEERING IDEAS. (Reveals First — Outlined-to-Solid + Masked Lift) */}
            <div className="overflow-hidden py-0.5">
              <div
                data-stmt-line-1
                className="relative inline-block font-display text-[clamp(2.35rem,10.2vw,3rem)] md:text-[2.85rem] lg:text-[clamp(3.6rem,5.5vw,5.6rem)] leading-[0.88] tracking-[0.03em] uppercase whitespace-nowrap will-change-[transform,opacity]"
              >
                <span
                  className="block text-transparent"
                  style={{
                    WebkitTextStroke: '1px rgba(245, 244, 242, 0.42)',
                  }}
                >
                  ENGINEERING IDEAS.
                </span>
                <span
                  data-stmt-fill-1
                  className="pointer-events-none absolute inset-0 block text-text-primary will-change-[clip-path]"
                  style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                >
                  ENGINEERING IDEAS<span className="text-crimson-primary">.</span>
                </span>
              </div>
            </div>

            {/* Line 2: BUILDING IMPACT. (Follows Staggered — Outlined-to-Solid + Offset Glide) */}
            <div className="mt-1 overflow-hidden py-0.5 pl-[0.2em] sm:pl-[0.48em]">
              <div
                data-stmt-line-2
                className="relative inline-block font-display text-[clamp(2.35rem,10.2vw,3rem)] md:text-[2.85rem] lg:text-[clamp(3.6rem,5.5vw,5.6rem)] leading-[0.88] tracking-[0.03em] uppercase whitespace-nowrap will-change-[transform,opacity]"
              >
                <span
                  className="block text-transparent"
                  style={{
                    WebkitTextStroke: '1px rgba(229, 9, 37, 0.48)',
                  }}
                >
                  BUILDING IMPACT.
                </span>
                <span
                  data-stmt-fill-2
                  className="pointer-events-none absolute inset-0 block will-change-[clip-path]"
                  style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                >
                  <span className="text-text-primary">BUILDING </span>
                  <span className="text-crimson-primary">IMPACT.</span>
                </span>
              </div>
            </div>

            {/* Quiet Architectural Sub-Caption */}
            <p
              data-stmt-caption
              className="mt-3 sm:mt-4 max-w-[20rem] md:max-w-[18.5rem] lg:max-w-[25rem] border-l border-crimson-primary/70 pl-3 font-body text-[0.76rem] sm:text-[0.82rem] leading-[1.55] text-text-muted will-change-[transform,opacity]"
            >
              Designing scalable full-stack web applications, grounded LLM
              retrieval workflows, and resilient backend systems.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
