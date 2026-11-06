import { Pause, Play } from 'lucide-react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { CINEMATIC_EASE } from '../../animations'
import { cn } from '../../utils'

export interface EditorialTextRevealProps {
  phrases: readonly string[]
  holdDurationMs?: number
  className?: string
}

function buildCrimsonSweepGradient(): string {
  return 'linear-gradient(90deg, #F5F4F2 0%, #F5F4F2 38%, #F21D35 48%, #E50925 55%, #8F071A 62%, rgba(245, 244, 242, 0.16) 72%, rgba(245, 244, 242, 0.08) 100%)'
}

/**
 * Refined multi-phrase pure-crimson & ivory sweep reveal.
 * Separates phrase entrance animation from pause state so hovering/focusing never flashes opacity,
 * and avoids continuous aria-live announcements while keeping full screen-reader & keyboard access.
 */
export function EditorialTextReveal({
  phrases,
  holdDurationMs = 3000,
  className,
}: EditorialTextRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isUserPaused, setIsUserPaused] = useState(false)
  const [isPointerPaused, setIsPointerPaused] = useState(false)

  const sweep = useMotionValue(100)
  const textOpacity = useMotionValue(1)
  const backgroundPosition = useTransform(sweep, (value) => `${value}% 50%`)

  const fadeOutControlsRef = useRef<ReturnType<typeof animate> | null>(null)
  const isPaused =
    Boolean(prefersReducedMotion) || isUserPaused || isPointerPaused

  // Effect 1: Animate phrase sweep ONLY when activeIndex changes
  useEffect(() => {
    fadeOutControlsRef.current?.stop()

    if (prefersReducedMotion || phrases.length <= 1) {
      sweep.set(0)
      textOpacity.set(1)
      return
    }

    sweep.set(100)
    textOpacity.set(0.2)

    const sweepControls = animate(sweep, 0, {
      duration: 0.9,
      ease: CINEMATIC_EASE,
    })
    const fadeControls = animate(textOpacity, 1, {
      duration: 0.58,
      ease: CINEMATIC_EASE,
    })

    return () => {
      sweepControls.stop()
      fadeControls.stop()
    }
  }, [activeIndex, phrases.length, prefersReducedMotion, sweep, textOpacity])

  // Effect 2: Manage rotation timer independently so hover/pause never resets opacity
  const cancelledRef = useRef(false)
  useEffect(() => {
    if (isPaused || phrases.length <= 1) return

    cancelledRef.current = false
    const timerId = setTimeout(() => {
      fadeOutControlsRef.current = animate(textOpacity, 0, {
        duration: 0.3,
        ease: 'easeInOut',
        onComplete: () => {
          if (!cancelledRef.current) {
            setActiveIndex((prev) => (prev + 1) % phrases.length)
          }
        },
      })
    }, holdDurationMs)

    return () => {
      cancelledRef.current = true
      clearTimeout(timerId)
      fadeOutControlsRef.current?.stop()
      // Restore full opacity if user hovered/paused mid-fade-out
      textOpacity.set(1)
    }
  }, [activeIndex, holdDurationMs, isPaused, phrases.length, textOpacity])

  const currentPhrase = phrases[activeIndex] ?? phrases[0] ?? ''
  const formattedIndex = String(activeIndex + 1).padStart(2, '0')
  const formattedTotal = String(phrases.length).padStart(2, '0')

  return (
    <div
      className={cn('flex flex-col gap-3', className)}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setIsPointerPaused(true)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setIsPointerPaused(false)
      }}
      onFocusCapture={() => setIsPointerPaused(true)}
      onBlurCapture={() => setIsPointerPaused(false)}
    >
      {/* Screen-reader static summary (avoids disruptive auto-rotating aria-live chatter) */}
      <span className="sr-only">
        Focus areas: {phrases.join(', ')}.
      </span>

      <div className="min-h-[3.25rem] sm:min-h-[3.5rem] flex items-center">
        <motion.p
          aria-hidden="true"
          className="type-reveal-statement bg-clip-text"
          style={
            prefersReducedMotion
              ? { color: '#F5F4F2' }
              : {
                  color: '#F5F4F2',
                  WebkitTextFillColor: 'transparent',
                  backgroundImage: buildCrimsonSweepGradient(),
                  backgroundSize: '280% 100%',
                  backgroundPosition,
                  opacity: textOpacity,
                }
          }
        >
          {currentPhrase}
        </motion.p>
      </div>

      {/* Accessible progress buttons (>= 24x24 target size) + pause/resume toggle */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-border-subtle">
        <div className="flex items-center gap-1" role="group" aria-label="Select positioning statement">
          {phrases.map((phrase, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={phrase}
                type="button"
                aria-pressed={isActive}
                aria-label={`Statement ${idx + 1}: ${phrase}`}
                onClick={() => setActiveIndex(idx)}
                className="group inline-flex min-h-7 min-w-7 items-center justify-center px-1 cursor-pointer"
              >
                <span
                  className={cn(
                    'block h-[2px] transition-editorial rounded-full',
                    isActive
                      ? 'w-6 bg-crimson-primary'
                      : 'w-3.5 bg-border-subtle group-hover:bg-text-secondary',
                  )}
                />
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-muted tabular-nums">
            {formattedIndex} / {formattedTotal}
          </span>
          {!prefersReducedMotion && phrases.length > 1 && (
            <button
              type="button"
              onClick={() => setIsUserPaused((prev) => !prev)}
              aria-label={
                isUserPaused
                  ? 'Resume rotating statements'
                  : 'Pause rotating statements'
              }
              aria-pressed={isUserPaused}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border-subtle bg-surface-elevated text-text-secondary hover:border-crimson-primary hover:text-text-primary transition-editorial cursor-pointer"
            >
              {isUserPaused ? (
                <Play className="h-3 w-3" aria-hidden="true" />
              ) : (
                <Pause className="h-3 w-3" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
