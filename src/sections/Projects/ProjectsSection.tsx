import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import {
  CINEMATIC_EASE,
  GSAP_MEDIA_QUERIES,
  gsap,
  ScrollTrigger,
  useGSAP,
} from '../../animations'
import { ProjectExhibitionCard } from '../../components/ProjectCard'
import { featuredProjects } from '../../data/projects'
import { cn } from '../../utils'

/**
 * SECTION 03 (INDEXED) — SELECTED PROJECTS EXHIBITION
 *
 * Desktop (>= 1024px & motion allowed):
 * - Sticky GSAP ScrollTrigger horizontal exhibition with linear scrubbing,
 *   clickable 01–04 slide controls, and keyboard focus synchronization.
 * - Free of recursive resize/refresh listeners or forced wheel-hijacking snap.
 *
 * Mobile / Tablet (< 1024px) or Reduced Motion:
 * - Single-tree vertical exhibition cards with full screenshots, descriptions, and CTAs.
 */
export function ProjectsSection() {
  const prefersReducedMotion = Boolean(useReducedMotion())
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1024px)').matches
      : true,
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const useHorizontalGallery = isDesktop && !prefersReducedMotion

  const pinWrapperRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const activeSlideRef = useRef(1)

  const [activeSlide, setActiveSlide] = useState(1)

  useGSAP(
    () => {
      if (!useHorizontalGallery) return

      const mm = gsap.matchMedia()

      mm.add(
        `${GSAP_MEDIA_QUERIES.desktop} and ${GSAP_MEDIA_QUERIES.motionAllowed}`,
        () => {
          const wrapper = pinWrapperRef.current
          const viewport = viewportRef.current
          const track = trackRef.current
          if (!wrapper || !viewport || !track) return

          const totalSlides = featuredProjects.length
          const maxIndex = Math.max(1, totalSlides - 1)

          const getScrollDistance = () =>
            Math.max(0, track.scrollWidth - viewport.clientWidth)

          const tween = gsap.to(track, {
            x: () => -getScrollDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              pin: true,
              anticipatePin: 1,
              refreshPriority: 1,
              scrub: 0.45,
              start: 'top top',
              end: () => `+=${getScrollDistance()}`,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progressBarRef.current) {
                  progressBarRef.current.style.transform = `scaleX(${self.progress})`
                }

                const nextIndex = Math.min(
                  totalSlides,
                  Math.max(1, Math.round(self.progress * maxIndex) + 1),
                )
                if (activeSlideRef.current !== nextIndex) {
                  activeSlideRef.current = nextIndex
                  setActiveSlide(nextIndex)
                }
              },
            },
          })

          scrollTriggerRef.current = tween.scrollTrigger ?? null

          if (document.fonts?.ready) {
            document.fonts.ready.then(() => {
              ScrollTrigger.refresh()
            })
          }

          return () => {
            scrollTriggerRef.current = null
            tween.scrollTrigger?.kill()
            tween.kill()
          }
        },
      )

      return () => mm.revert()
    },
    { scope: pinWrapperRef, dependencies: [useHorizontalGallery] },
  )

  const scrollToSlide = (slideIndexZeroBased: number) => {
    const st = scrollTriggerRef.current
    if (!st || featuredProjects.length <= 1) return
    const ratio = slideIndexZeroBased / (featuredProjects.length - 1)
    const targetY = Math.round(st.start + (st.end - st.start) * ratio)
    window.scrollTo({
      top: targetY,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-x-clip border-b border-border-subtle bg-bg-secondary"
    >
      {useHorizontalGallery ? (
        /* DESKTOP STICKY HORIZONTAL EXHIBITION (Single Rendered Tree) */
        <div
          ref={pinWrapperRef}
          className="flex h-[100svh] flex-col justify-between overflow-hidden pt-20 pb-5"
        >
          <div className="editorial-container">
            <div className="flex items-end justify-between gap-8 border-b border-border-subtle pb-4">
              <div>
                <div className="mb-2 inline-flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold tracking-[0.14em] text-crimson-primary">
                    03
                  </span>
                  <span
                    className="h-[1px] w-7 bg-crimson-primary"
                    aria-hidden="true"
                  />
                  <span className="type-eyebrow">
                    SELECTED ENGINEERING WORK // 01 — 0{featuredProjects.length}
                  </span>
                </div>
                <h2 id="projects-heading" className="type-section-display">
                  FEATURED <span className="text-crimson-primary">PROJECTS</span>
                </h2>
              </div>

              {/* Interactive Slide Selector (01–04) + Scrubbed Progress Bar */}
              <div className="flex flex-col items-end gap-2.5">
                <div
                  className="flex items-center gap-2"
                  role="group"
                  aria-label="Jump to project slide"
                >
                  {featuredProjects.map((proj, idx) => {
                    const slideNum = idx + 1
                    const isCurrent = activeSlide === slideNum
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => scrollToSlide(idx)}
                        aria-label={`Jump to project ${proj.index}: ${proj.title}`}
                        aria-current={isCurrent ? 'step' : undefined}
                        className={cn(
                          'inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 font-mono text-xs font-semibold transition-editorial cursor-pointer',
                          isCurrent
                            ? 'border-crimson-primary bg-crimson-primary text-text-primary'
                            : 'border-border-subtle bg-surface-elevated text-text-muted hover:border-crimson-primary hover:text-text-primary',
                        )}
                      >
                        <span>{proj.index}</span>
                        <span className="hidden xl:inline text-[0.65rem] font-medium tracking-[0.04em]">
                          {proj.title}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="h-[2px] w-56 overflow-hidden rounded-full bg-border-subtle">
                  <div
                    ref={progressBarRef}
                    className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-crimson-dark via-crimson-primary to-red-signal"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Exhibition Track Aligned with Editorial Container Gutter */}
          <div
            ref={viewportRef}
            className="flex min-h-0 w-full flex-1 items-center overflow-hidden py-3.5"
          >
            <div
              ref={trackRef}
              className="flex h-full max-h-[45rem] w-max items-stretch gap-8 pl-[max(var(--space-gutter-x),calc((100vw_-_var(--container-max))_/_2_+_var(--space-gutter-x)))] pr-[clamp(2rem,8vw,7rem)] will-change-transform"
            >
              {featuredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  onFocusCapture={() => {
                    if (activeSlideRef.current !== idx + 1) {
                      scrollToSlide(idx)
                    }
                  }}
                  className="h-full min-h-0 w-[90vw] max-w-[77rem] shrink-0 xl:w-[83vw]"
                >
                  <ProjectExhibitionCard
                    project={project}
                    className="h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* MOBILE, TABLET & REDUCED-MOTION VERTICAL EXHIBITION */
        <div className="py-20 sm:py-28 editorial-container">
          <div className="mb-10 border-b border-border-subtle pb-8">
            <div className="mb-2.5 inline-flex items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.14em] text-crimson-primary">
                03
              </span>
              <span
                className="h-[1px] w-7 bg-crimson-primary"
                aria-hidden="true"
              />
              <span className="type-eyebrow">
                SELECTED ENGINEERING WORK // 01 — 0{featuredProjects.length}
              </span>
            </div>
            <h2 id="projects-heading" className="type-section-display">
              FEATURED <span className="text-crimson-primary">PROJECTS</span>
            </h2>
            <p className="mt-3 max-w-xl type-body">
              Full-stack and AI-powered systems engineered around real-world
              financial, statutory, healthcare, and university workflows.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:gap-10">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.05,
                  ease: CINEMATIC_EASE,
                }}
              >
                <ProjectExhibitionCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
