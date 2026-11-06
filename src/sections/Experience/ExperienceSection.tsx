import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'
import { useRef, useState } from 'react'
import { CINEMATIC_EASE } from '../../animations'
import { SectionHeader } from '../../components/UI'
import { experiences } from '../../data/experience'
import { cn } from '../../utils'

/**
 * SECTION 05 (INDEXED) — EXPERIENCE AND JOURNEY
 * Preserves the signature vertical timeline & crimson scroll progress spine,
 * elevated onto neutral near-black (#141418) cards with synchronized active milestone tracking.
 */
export function ExperienceSection() {
  const prefersReducedMotion = Boolean(useReducedMotion())
  const timelineRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<string>(experiences[0]?.id ?? '')

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 60%'],
  })

  const spineScaleY = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  })

  // Keep active milestone synchronized with timeline scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (experiences.length === 0) return
    const idx = Math.min(
      experiences.length - 1,
      Math.max(0, Math.floor(latest * experiences.length)),
    )
    const nextId = experiences[idx]?.id
    if (nextId) {
      setActiveId((prev) => (prev === nextId ? prev : nextId))
    }
  })

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative isolate overflow-hidden border-b border-border-subtle bg-bg-secondary py-24 sm:py-32"
    >
      <div className="editorial-container">
        <SectionHeader
          index="05"
          eyebrow="EXPERIENCE & JOURNEY"
          title="ENGINEERING"
          accentTitle="TRAJECTORY"
          headingId="experience-heading"
          description="Industry internship experience at Celebal Technologies, Computer Science training at LNMIIT, and end-to-end software builds."
        />

        {/* Vertical Timeline Container */}
        <div
          ref={timelineRef}
          className="relative mt-14 sm:mt-16 pl-8 sm:pl-14 lg:pl-20"
        >
          {/* Neutral Structural Track Line */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-3 sm:left-5 lg:left-7 top-2 w-[2px] bg-border-subtle"
          />

          {/* Scroll-Controlled Crimson Progress Spine */}
          <motion.div
            aria-hidden="true"
            style={{
              scaleY: prefersReducedMotion ? 1 : spineScaleY,
            }}
            className="absolute bottom-4 left-3 sm:left-5 lg:left-7 top-2 w-[2px] origin-top bg-gradient-to-b from-red-signal via-crimson-primary to-crimson-dark will-change-transform"
          />

          <div className="flex flex-col gap-7 sm:gap-9">
            {experiences.map((milestone, idx) => {
              const isActive = activeId === milestone.id
              return (
                <motion.article
                  key={milestone.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.58,
                    delay: idx * 0.05,
                    ease: CINEMATIC_EASE,
                  }}
                  onPointerEnter={() => setActiveId(milestone.id)}
                  className="relative"
                >
                  {/* Timeline Node Marker */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -left-[1.62rem] sm:-left-[2.62rem] lg:-left-[3.62rem] top-7 flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300',
                      isActive
                        ? 'scale-125 border-red-signal bg-crimson-primary shadow-[0_0_20px_rgba(229,9,37,0.85)]'
                        : 'border-border-subtle bg-black-pure',
                    )}
                  />

                  {/* Neutral Near-Black Milestone Card */}
                  <div
                    className={cn(
                      'rounded-xl border p-6 sm:p-8 transition-editorial',
                      isActive
                        ? 'border-border-red bg-surface-card shadow-[0_28px_64px_-22px_rgba(0,0,0,0.94)]'
                        : 'border-border-subtle bg-surface-elevated hover:border-border-red hover:bg-surface-card',
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-4">
                      <div className="inline-flex items-center gap-3">
                        <span className="font-display text-2xl sm:text-3xl leading-none tracking-[0.04em] text-crimson-primary">
                          {milestone.index}
                        </span>
                        <span className="rounded-md border border-border-red bg-black-pure px-2.5 py-1 font-mono text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-crimson-primary">
                          {milestone.category}
                        </span>
                      </div>

                      <span className="font-mono text-xs font-medium tracking-[0.08em] text-text-muted">
                        {milestone.organization}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
                      <div className="lg:col-span-5">
                        <h3 className="type-card-display">{milestone.title}</h3>
                        <p className="mt-2 font-body text-sm font-medium text-text-secondary">
                          {milestone.organization}
                        </p>
                      </div>

                      <div className="lg:col-span-7 flex flex-col gap-4">
                        <p className="type-body">{milestone.summary}</p>

                        <ul className="flex flex-col gap-2 border-l-2 border-crimson-primary pl-4">
                          {milestone.highlights.map((point) => (
                            <li
                              key={point}
                              className="font-body text-sm text-text-primary/90"
                            >
                              {point}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {milestone.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md border border-border-subtle bg-black-pure px-2.5 py-1 font-mono text-[0.6875rem] text-text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
