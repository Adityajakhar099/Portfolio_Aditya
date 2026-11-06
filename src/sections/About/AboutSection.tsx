import { ArrowDownRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import {
  CINEMATIC_EASE,
  GSAP_MEDIA_QUERIES,
  gsap,
  useGSAP,
} from '../../animations'
import { aboutContent } from '../../data/experience'

/**
 * SECTION 02 (INDEXED) — ABOUT ADITYA JAKHAR
 * Asymmetric pure-black editorial split:
 * - Intact architectural darkroom engineering frame with pin-aware GSAP inner image parallax
 * - Line-by-line staggered heading hierarchy & concise LNMIIT Computer Science narrative
 * - Crisp #141418 technical specification cells & subtle crimson line accents
 */
export function AboutSection() {
  const prefersReducedMotion = Boolean(useReducedMotion())
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const watermarkRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion) return
      const section = sectionRef.current
      if (!section) return

      const mm = gsap.matchMedia()

      mm.add(GSAP_MEDIA_QUERIES.motionAllowed, () => {
        if (imageRef.current) {
          gsap.fromTo(
            imageRef.current,
            { scale: 1.09, yPercent: -3 },
            {
              scale: 1,
              yPercent: 3,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.45,
                refreshPriority: 2,
                invalidateOnRefresh: true,
              },
            },
          )
        }

        if (watermarkRef.current) {
          gsap.fromTo(
            watermarkRef.current,
            { yPercent: -12 },
            {
              yPercent: 14,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.45,
                refreshPriority: 2,
                invalidateOnRefresh: true,
              },
            },
          )
        }
      })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  )

  const handleScrollToProjects = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    const target = document.getElementById('projects')
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden border-b border-border-subtle bg-bg-primary py-24 sm:py-32 editorial-grid-lines"
    >
      {/* Parallax Background Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-16 -z-10 select-none font-display text-[17vw] leading-none tracking-[0.04em] uppercase text-text-primary/[0.025] will-change-transform"
      >
        LNMIIT · CSE
      </div>

      <div className="editorial-container">
        {/* Top Section Rule */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3">
            <span className="font-mono text-xs font-semibold tracking-[0.14em] text-crimson-primary">
              {aboutContent.index}
            </span>
            <span
              className="h-[1px] w-7 bg-crimson-primary"
              aria-hidden="true"
            />
            <span className="type-eyebrow">{aboutContent.eyebrow}</span>
          </div>
          <span className="hidden sm:inline font-mono text-xs tracking-[0.16em] uppercase text-text-muted">
            COMPUTER SCIENCE · FULL-STACK · AI/ML
          </span>
        </div>

        {/* Asymmetric 12-Column Editorial Composition */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* LEFT: Visually Dominant Editorial Darkroom Frame (5 cols — Never Clipped) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: CINEMATIC_EASE }}
            className="lg:col-span-5"
          >
            <figure className="relative aspect-[3/3.85] w-full overflow-hidden rounded-xl border border-border-subtle bg-black-pure shadow-[0_32px_80px_-20px_rgba(0,0,0,0.96)]">
              {/* Top Crimson Hairline */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] bg-crimson-primary"
              />

              <img
                ref={imageRef}
                src={aboutContent.placeholderImageUrl}
                alt="Darkroom software engineering studio craft"
                width={900}
                height={1155}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover object-center will-change-transform"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(3,3,3,0.06) 0%, rgba(3,3,3,0) 54%, rgba(3,3,3,0.92) 100%)',
                }}
              />

              <figcaption className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-between gap-2 border-t border-border-subtle pt-3">
                <span className="font-body text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-text-primary">
                  LNMIIT · SOFTWARE ENGINEERING
                </span>
                <span className="font-mono text-xs font-semibold text-crimson-primary">
                  {aboutContent.index}
                </span>
              </figcaption>
            </figure>
          </motion.div>

          {/* RIGHT: Editorial Heading, Concise Introduction & Technical Ledger (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8 lg:pt-2">
            <motion.h2
              id="about-heading"
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.085 } },
              }}
              className="type-section-display flex flex-col gap-1"
            >
              {aboutContent.headlineLines.map((line, index) => (
                <span key={line} className="reveal-mask block">
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, y: 28 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.65, ease: CINEMATIC_EASE },
                      },
                    }}
                    className={
                      index === 1
                        ? 'inline-block text-crimson-primary'
                        : 'inline-block text-text-primary'
                    }
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            {/* Concise Personal Introduction with Red Line Accent */}
            <div className="flex flex-col gap-5 max-w-2xl border-l-2 border-crimson-primary pl-5 sm:pl-6">
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.58, delay: 0.08, ease: CINEMATIC_EASE }}
                className="type-body-lg"
              >
                {aboutContent.leadParagraph}
              </motion.p>

              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.58, delay: 0.16, ease: CINEMATIC_EASE }}
                className="type-body"
              >
                {aboutContent.secondaryParagraph}
              </motion.p>
            </div>

            {/* Crisp Neutral Obsidian Technical Details Grid */}
            <motion.dl
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2, ease: CINEMATIC_EASE }}
              className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 border-y border-border-subtle py-6"
            >
              {aboutContent.technicalLedger.map((entry) => (
                <div
                  key={entry.label}
                  className="rounded-lg border border-border-subtle bg-surface-card p-4 hover:border-border-red transition-editorial"
                >
                  <dt className="font-mono text-[0.6875rem] font-semibold tracking-[0.14em] uppercase text-crimson-primary mb-1">
                    {entry.label}
                  </dt>
                  <dd className="font-body text-sm font-medium text-text-primary">
                    {entry.value}
                  </dd>
                </div>
              ))}
            </motion.dl>

            {/* Signature & Transition Action */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-text-muted block mb-1">
                  SIGNED
                </span>
                <p className="type-script text-2xl text-text-primary">
                  {aboutContent.signature}
                </p>
              </div>

              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="group inline-flex items-center gap-2.5 rounded-full border border-border-subtle bg-surface-elevated px-5 py-2.5 font-body text-xs font-semibold tracking-[0.13em] uppercase text-text-primary hover:border-crimson-primary hover:bg-surface-hover transition-editorial"
              >
                <span>Selected Work</span>
                <ArrowDownRight
                  className="h-4 w-4 text-crimson-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
