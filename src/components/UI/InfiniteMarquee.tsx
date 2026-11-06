import { cn } from '../../utils'

export interface InfiniteMarqueeProps {
  items: readonly string[]
  direction?: 'left' | 'right'
  variant?: 'filled' | 'outlined'
  className?: string
}

/**
 * GPU-composited opposite-direction typographic marquee on pure obsidian bands.
 * Repeats 4x so ultra-wide 1920px–2560px viewports never expose seam gaps.
 */
export function InfiniteMarquee({
  items,
  direction = 'left',
  variant = 'filled',
  className,
}: InfiniteMarqueeProps) {
  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div
      className={cn(
        'marquee-group relative w-full overflow-hidden border-y border-border-subtle bg-bg-secondary py-3.5 select-none',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-max items-center gap-8',
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right',
        )}
      >
        {repeated.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            aria-hidden={idx >= items.length ? 'true' : undefined}
            className="inline-flex items-center gap-8"
          >
            <span
              className={cn(
                'font-display text-[1.95rem] sm:text-[2.45rem] leading-none tracking-[0.05em] uppercase',
                variant === 'filled' ? 'text-text-primary' : 'type-stroke-ivory',
              )}
            >
              {item}
            </span>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rotate-45 bg-crimson-primary shrink-0"
            />
          </span>
        ))}
      </div>
    </div>
  )
}
