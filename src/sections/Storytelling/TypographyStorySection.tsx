import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { useRef } from 'react'
import { CINEMATIC_EASE } from '../../animations'

interface OutlineToSolidWordProps {
  text: string
  progress: MotionValue<number>
  range: [number, number]
  tone: 'ivory' | 'crimson'
  reducedMotion: boolean
}

/**
 * Renders hollow editorial stroke typography that progressively fills solid
 * from left to right as scroll progresses through the specified range.
 */
function OutlineToSolidWord({
  text,
  progress,
  range,
  tone,
  reducedMotion,
}: OutlineToSolidWordProps) {
  const fillClip = useTransform(
    progress,
    range,
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
  )

  const strokeClass =
    tone === 'crimson' ? 'type-stroke-crimson' : 'type-stroke-ivory'
  const solidClass =
    tone === 'crimson' ? 'text-crimson-primary' : 'text-text-primary'

  if (reducedMotion) {
    return <span className={solidClass}>{text}</span>
  }

  return (
    <span className="relative inline-block">
      <span className={strokeClass}>{text}</span>
      <motion.span
        aria-hidden="true"
        style={{ clipPath: fillClip }}
        className={`pointer-events-none absolute inset-0 select-none ${solidClass}`}
      >
        {text}
      </motion.span>
    </span>
  )
}

/**
 * SECTION 01B — ENGINEERING MANIFESTO (Seamless Handoff From Hero Scene 05)
 * Continues directly from the Hero's bottom pure-black horizon and vertical crimson
 * lead-thread, expanding the thesis into Aditya's core software architecture principles.
 */
export function TypographyStorySection() {
  const prefersReducedMotion = Boolean(useReducedMotion())
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 90%', 'end 18%'],
  })

  const rowOneX = useTransform(scrollYProgress, [0, 1], ['-7%', '6%'])
  const rowTwoX = useTransform(scrollYProgress, [0, 1], ['7%', '-6%'])
  const rowThreeX = useTransform(scrollYProgress, [0, 1], ['-6%', '5%'])

  return (
    <section
      id="storytelling"
      ref={sectionRef}
      aria-labelledby="storytelling-heading"
      className="relative isolate overflow-hidden border-b border-border-subtle bg-gradient-to-b from-black-pure via-bg-primary to-black-pure pt-16 pb-24 sm:pt-20 sm:pb-28 lg:pb-32"
    >
      {/* Seamless Vertical Crimson Continuation Thread From Hero Scene 05 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center"
      >
        <div className="h-12 w-[1.5px] bg-gradient-to-b from-red-signal via-crimson-primary to-transparent" />
        <span className="h-1.5 w-1.5 rounded-full bg-crimson-primary shadow-[0_0_12px_rgba(229,9,37,0.85)]" />
      </div>

      {/* Subtle Controlled Crimson Center Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229, 9, 37, 0.11) 0%, rgba(163, 13, 34, 0.04) 45%, transparent 72%)',
        }}
      />

      <div className="editorial-container pt-4">
        <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-12 sm:mb-16">
          <span className="font-mono text-xs font-semibold tracking-[0.18em] uppercase text-crimson-primary">
            // ENGINEERING MANIFESTO
          </span>
          <span className="hidden sm:inline font-mono text-xs tracking-[0.16em] uppercase text-text-muted">
            ARCHITECTURE · SYSTEMS · INTELLIGENCE
          </span>
        </div>

        <h2 id="storytelling-heading" className="sr-only">
          Architecture First. Intelligent Systems. Built For Real Impact.
        </h2>

        {/* Monumental Kinetic Manifesto Stack */}
        <div
          aria-hidden="true"
          className="flex flex-col gap-7 sm:gap-9 lg:gap-11"
        >
          {/* Manifesto Line 1: ARCHITECTURE FIRST. */}
          <motion.div
            style={prefersReducedMotion ? undefined : { x: rowOneX }}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09 } },
            }}
            className="type-kinetic-giant flex flex-wrap items-baseline gap-x-4 sm:gap-x-7 will-change-transform"
          >
            <span className="reveal-mask">
              <motion.span
                variants={{
                  hidden: { y: '105%', opacity: 0 },
                  visible: {
                    y: '0%',
                    opacity: 1,
                    transition: { duration: 0.72, ease: CINEMATIC_EASE },
                  },
                }}
                className="inline-block text-text-primary"
              >
                ARCHITECTURE
              </motion.span>
            </span>

            <span className="reveal-mask">
              <motion.span
                variants={{
                  hidden: { y: '105%', opacity: 0 },
                  visible: {
                    y: '0%',
                    opacity: 1,
                    transition: { duration: 0.72, ease: CINEMATIC_EASE },
                  },
                }}
                className="inline-block"
              >
                <OutlineToSolidWord
                  text="FIRST."
                  progress={scrollYProgress}
                  range={[0.12, 0.42]}
                  tone="crimson"
                  reducedMotion={prefersReducedMotion}
                />
              </motion.span>
            </span>
          </motion.div>

          {/* Manifesto Line 2: INTELLIGENT SYSTEMS. */}
          <motion.div
            style={prefersReducedMotion ? undefined : { x: rowTwoX }}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.09, delayChildren: 0.05 },
              },
            }}
            className="type-kinetic-giant flex flex-wrap items-baseline gap-x-4 sm:gap-x-7 lg:self-end will-change-transform"
          >
            <span className="reveal-mask">
              <motion.span
                variants={{
                  hidden: { y: '105%', opacity: 0 },
                  visible: {
                    y: '0%',
                    opacity: 1,
                    transition: { duration: 0.72, ease: CINEMATIC_EASE },
                  },
                }}
                className="inline-block"
              >
                <OutlineToSolidWord
                  text="INTELLIGENT"
                  progress={scrollYProgress}
                  range={[0.28, 0.6]}
                  tone="ivory"
                  reducedMotion={prefersReducedMotion}
                />
              </motion.span>
            </span>

            <span className="reveal-mask">
              <motion.span
                variants={{
                  hidden: { y: '105%', opacity: 0 },
                  visible: {
                    y: '0%',
                    opacity: 1,
                    transition: { duration: 0.72, ease: CINEMATIC_EASE },
                  },
                }}
                className="inline-block text-crimson-primary"
              >
                SYSTEMS.
              </motion.span>
            </span>
          </motion.div>

          {/* Manifesto Line 3: BUILT FOR REAL IMPACT. */}
          <motion.div
            style={prefersReducedMotion ? undefined : { x: rowThreeX }}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.09, delayChildren: 0.1 },
              },
            }}
            className="type-kinetic-giant flex flex-wrap items-baseline gap-x-4 sm:gap-x-7 will-change-transform"
          >
            <span className="reveal-mask">
              <motion.span
                variants={{
                  hidden: { y: '105%', opacity: 0 },
                  visible: {
                    y: '0%',
                    opacity: 1,
                    transition: { duration: 0.72, ease: CINEMATIC_EASE },
                  },
                }}
                className="inline-block text-text-primary"
              >
                BUILT FOR
              </motion.span>
            </span>

            <span className="reveal-mask">
              <motion.span
                variants={{
                  hidden: { y: '105%', opacity: 0 },
                  visible: {
                    y: '0%',
                    opacity: 1,
                    transition: { duration: 0.72, ease: CINEMATIC_EASE },
                  },
                }}
                className="inline-block"
              >
                <OutlineToSolidWord
                  text="REAL IMPACT."
                  progress={scrollYProgress}
                  range={[0.46, 0.78]}
                  tone="crimson"
                  reducedMotion={prefersReducedMotion}
                />
              </motion.span>
            </span>
          </motion.div>
        </div>

        {/* Minimal Editorial Supporting Line */}
        <div className="mt-12 sm:mt-16 flex flex-col gap-4 border-t border-border-subtle pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-script text-text-secondary">
            Rigorous systems over surface-level noise.
          </p>
          <p className="type-body max-w-xl text-sm sm:text-base">
            Combining computer science fundamentals, full-stack architecture,
            and applied AI into software built for real-world use.
          </p>
        </div>
      </div>
    </section>
  )
}
