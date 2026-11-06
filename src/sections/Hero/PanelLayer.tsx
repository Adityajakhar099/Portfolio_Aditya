import { cn } from '../../utils'

interface ArchitecturalWindowPanelProps {
  panelId: '1' | '2' | '3'
  indexCode: string
  crimsonEdge: 'left' | 'right' | 'top-right'
  tagPosition: 'top-left' | 'top-right' | 'bottom-right'
  positionClassName: string
}

function ArchitecturalWindowPanel({
  panelId,
  indexCode,
  crimsonEdge,
  tagPosition,
  positionClassName,
}: ArchitecturalWindowPanelProps) {
  return (
    <div
      aria-hidden="true"
      data-panel-scroll={panelId}
      className={cn(
        'pointer-events-none absolute z-30 will-change-transform',
        positionClassName,
      )}
    >
      {/* Inner wrapper exclusively controlled by Initial Entrance Timeline */}
      <div
        data-panel-enter={panelId}
        className="relative h-full w-full will-change-[transform,opacity]"
      >
        {/* Thin Neutral #29292F Architectural Perimeter & Subtle #101013 Glass Framing */}
        <div
          data-panel-perimeter
          className="pointer-events-none absolute inset-0 border border-border-subtle/90"
          style={{
            background:
              'linear-gradient(180deg, rgba(16, 16, 19, 0.2) 0%, rgba(16, 16, 19, 0.02) 38%, rgba(16, 16, 19, 0.04) 68%, rgba(16, 16, 19, 0.24) 100%)',
          }}
        >
          {crimsonEdge === 'top-right' && (
            <span className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-crimson-primary/70 to-crimson-primary/30" />
          )}
        </div>

        {/* Subtle Crimson Vertical Architectural Seam (Persists as Thin Line on Scroll) */}
        {(crimsonEdge === 'right' || crimsonEdge === 'top-right') && (
          <span
            data-panel-line
            className="pointer-events-none absolute inset-y-0 right-0 w-[1px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(229, 9, 37, 0.12) 0%, rgba(229, 9, 37, 0.72) 45%, rgba(245, 244, 242, 0.28) 74%, rgba(229, 9, 37, 0.12) 100%)',
            }}
          />
        )}

        {crimsonEdge === 'left' && (
          <span
            data-panel-line
            className="pointer-events-none absolute inset-y-0 left-0 w-[1px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(245, 244, 242, 0.1) 0%, rgba(229, 9, 37, 0.65) 48%, rgba(245, 244, 242, 0.22) 76%, rgba(229, 9, 37, 0.1) 100%)',
            }}
          />
        )}

        {/* Minimal P.01 / P.02 / P.03 Architectural Coordinate */}
        <span
          data-panel-tag
          className={cn(
            'pointer-events-none absolute font-mono text-[0.5rem] tracking-[0.2em] uppercase text-text-muted/70 select-none',
            tagPosition === 'top-left' && 'top-2.5 left-2.5',
            tagPosition === 'top-right' && 'top-2.5 right-2.5',
            tagPosition === 'bottom-right' && 'bottom-2.5 right-2.5',
          )}
        >
          {indexCode}
        </span>
      </div>
    </div>
  )
}

/**
 * PANEL LAYER (z-30) — THREE DIFFERENTIATED ARCHITECTURAL PANELS
 *
 * Distinct Widths, Heights & Clean Separation Channels:
 * - P.01 (Left):   Medium width (`clamp(7.5rem, 9.8vw, 10rem)`), intermediate height (`69%`), offset upwards (`top: 14%`).
 * - P.02 (Center): Widest & tallest dominant portrait spine (`clamp(9.25rem, 12.2vw, 12.25rem)`, height `81%`, `top: 7.5%`),
 *                  framing the eyes, nose, mouth & jawline without a vertical seam cutting across the face.
 * - P.03 (Right):  Narrower architectural wing (`clamp(7.25rem, 9.2vw, 9.5rem)`), shorter height (`60%`), offset downwards (`top: 20.5%`).
 *                  Hidden below `768px` so Mobile uses two simplified panels with full portrait clarity.
 */
export function PanelLayer() {
  return (
    <div
      aria-hidden="true"
      data-hero-panel-layer
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
    >
      {/* P.01 — Left Medium-Width Offset Panel */}
      <ArchitecturalWindowPanel
        panelId="1"
        indexCode="P.01"
        crimsonEdge="right"
        tagPosition="top-left"
        positionClassName={cn(
          'top-[16.5%] h-[33%] w-[5.25rem] left-[calc(54%_-_7.75rem)]',
          'md:top-[16.5%] md:h-[60%] md:w-[5.5rem] md:left-[calc(65.5%_-_3.75rem_-_0.55rem_-_5.5rem)]',
          'lg:top-[15.5%] lg:h-[66%] lg:w-[clamp(6.75rem,9.5vw,10rem)] lg:left-[calc(64.5%_-_clamp(4.25rem,5.9vw,6.125rem)_-_0.85rem_-_clamp(6.75rem,9.5vw,10rem))]',
        )}
      />

      {/* P.02 — Central Dominant Portrait Spine (Widest & Tallest) */}
      <ArchitecturalWindowPanel
        panelId="2"
        indexCode="P.02"
        crimsonEdge="top-right"
        tagPosition="top-right"
        positionClassName={cn(
          'top-[13%] h-[39.5%] w-[9.75rem] left-[calc(54%_-_1.95rem)]',
          'md:top-[11%] md:h-[71%] md:w-[7.5rem] md:left-[calc(65.5%_-_3.75rem)]',
          'lg:top-[10%] lg:h-[77.5%] lg:w-[clamp(8.5rem,11.8vw,12.25rem)] lg:left-[calc(64.5%_-_clamp(4.25rem,5.9vw,6.125rem))]',
        )}
      />

      {/* P.03 — Right Narrower Stepped Panel (Desktop & Tablet >= 768px) */}
      <ArchitecturalWindowPanel
        panelId="3"
        indexCode="P.03"
        crimsonEdge="left"
        tagPosition="bottom-right"
        positionClassName={cn(
          'hidden md:block',
          'md:top-[23%] md:h-[51%] md:w-[5.25rem] md:left-[calc(65.5%_+_3.75rem_+_0.55rem)]',
          'lg:top-[22%] lg:h-[57%] lg:w-[clamp(6.5rem,9vw,9.5rem)] lg:left-[calc(64.5%_+_clamp(4.25rem,5.9vw,6.125rem)_+_0.85rem)]',
        )}
      />
    </div>
  )
}
