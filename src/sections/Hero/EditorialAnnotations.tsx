import { ArrowDown } from 'lucide-react'
import type { RefObject } from 'react'
import { CrosshairStar } from '../../components/Icons'

export interface EditorialAnnotationsProps {
  ctaClusterRef: RefObject<HTMLDivElement | null>
}

/**
 * EDITORIAL ANNOTATIONS LAYER (z-[45] — Distilled Safe-Area Frame)
 *
 * Strictly retains ONLY the approved editorial metadata inside `.editorial-container`
 * with generous `#030303` negative space and consistent left/right alignment:
 * 1. Portfolio index (`01 // INDEX`)
 * 2. Software engineering identity (`COMPUTER SCIENCE ENGINEER`)
 * 3. Institution / location (`LNMIIT · JAIPUR, IN`)
 * 4. Core disciplines (`FULL-STACK · AI / ML · DISTRIBUTED SYSTEMS`)
 * 5. Scroll indicator (`SCROLL TO EXPLORE ↓`)
 */
export function EditorialAnnotations({
  ctaClusterRef,
}: EditorialAnnotationsProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-16 bottom-0 z-[45] flex flex-col justify-between py-3.5 sm:py-5">
      {/* =====================================================================
          TOP EDITORIAL SAFE BAR — INDEX, IDENTITY & INSTITUTION / LOCATION
          ===================================================================== */}
      <div
        aria-hidden="true"
        data-meta-top-scroll
        className="editorial-container flex items-center justify-between gap-3 will-change-[transform,opacity]"
      >
        {/* Top-Left: Portfolio Index + Software Engineering Identity */}
        <div
          data-meta-enter
          className="flex min-w-0 items-center gap-2 sm:gap-3 font-mono text-[0.55rem] sm:text-[0.6rem] tracking-[0.2em] uppercase will-change-[transform,opacity]"
        >
          <span className="shrink-0 font-semibold text-crimson-primary">
            01 // INDEX
          </span>
          <span className="h-[1px] w-3.5 sm:w-6 shrink-0 bg-border-subtle" />
          <span className="truncate text-text-muted">
            <span className="sm:hidden">CS ENGINEER</span>
            <span className="hidden sm:inline">COMPUTER SCIENCE ENGINEER</span>
          </span>
        </div>

        {/* Top-Right: Institution & Location (Consistently Right-Aligned) */}
        <div
          data-meta-enter
          className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2 text-right font-mono text-[0.55rem] sm:text-[0.6rem] tracking-[0.2em] uppercase text-text-muted will-change-[transform,opacity]"
        >
          <CrosshairStar className="h-2.5 w-2.5 shrink-0 text-crimson-primary" />
          <span>LNMIIT · JAIPUR, IN</span>
        </div>
      </div>

      {/* =====================================================================
          BOTTOM EDITORIAL SAFE BAR — CORE DISCIPLINES & SCROLL INDICATOR
          ===================================================================== */}
      <div
        data-bottom-bar-scroll
        className="editorial-container will-change-[transform,opacity]"
      >
        <div className="flex items-center justify-between gap-3 border-t border-border-subtle/55 pt-2.5 sm:pt-3.5">
          {/* Bottom-Left: Core Disciplines (Inside Safe Area — Zero Clipping) */}
          <div
            aria-hidden="true"
            data-meta-enter
            className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 font-mono text-[0.54rem] sm:text-[0.6rem] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-text-muted will-change-[transform,opacity]"
          >
            <span className="text-text-primary/90">FULL-STACK</span>
            <span className="text-crimson-primary">·</span>
            <span className="text-text-primary/90">AI / ML</span>
            <span className="text-crimson-primary">·</span>
            <span className="sm:hidden">SYSTEMS</span>
            <span className="hidden sm:inline">DISTRIBUTED SYSTEMS</span>
          </div>

          {/* Bottom-Right: Interactive Scroll Indicator (Consistently Right-Aligned) */}
          <div
            ref={ctaClusterRef}
            data-meta-enter
            className="pointer-events-auto shrink-0 text-right will-change-[transform,opacity]"
          >
            <a
              href="#storytelling"
              aria-label="Scroll to Engineering Narrative"
              className="group inline-flex items-center gap-2 py-0.5 font-mono text-[0.55rem] sm:text-[0.6rem] font-medium tracking-[0.2em] uppercase text-text-muted transition-colors hover:text-text-primary"
            >
              <span className="sm:hidden">SCROLL</span>
              <span className="hidden sm:inline">SCROLL TO EXPLORE</span>
              <ArrowDown
                className="h-3.5 w-3.5 text-crimson-primary transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
