import {
  Code2,
  Compass,
  Layers,
  Map as MapIcon,
  Rocket,
  ShieldCheck,
} from 'lucide-react'
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
import { developmentProcess, type ProcessStep } from '../../data/process'
import { cn } from '../../utils'

function ProcessIcon({
  name,
  isActive,
}: {
  name: ProcessStep['iconName']
  isActive: boolean
}) {
  const iconClass = cn(
    'h-4 w-4 transition-transform duration-300',
    isActive ? 'scale-110 text-text-primary' : 'text-crimson-primary',
  )

  switch (name) {
    case 'compass':
      return <Compass className={iconClass} aria-hidden="true" />
    case 'map':
      return <MapIcon className={iconClass} aria-hidden="true" />
    case 'layers':
      return <Layers className={iconClass} aria-hidden="true" />
    case 'code':
      return <Code2 className={iconClass} aria-hidden="true" />
    case 'shield-check':
      return <ShieldCheck className={iconClass} aria-hidden="true" />
    case 'rocket':
      return <Rocket className={iconClass} aria-hidden="true" />
  }
}

/**
 * SECTION 06 (INDEXED) — DEVELOPMENT PROCESS
 * Discover → Plan → Architect → Develop → Test → Deliver.
 * Scroll-synchronized active step + interactive rail selector on #080808 black canvas.
 */
export function ProcessSection() {
  const prefersReducedMotion = Boolean(useReducedMotion())
  const gridRef = useRef<HTMLDivElement>(null)
  const manualOverrideRef = useRef(false)
  const [activeStep, setActiveStep] = useState<string>('01')

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start 82%', 'end 55%'],
  })

  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 28,
    restDelta: 0.001,
  })

  // Synchronize active step directly with the scroll progress rail
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (manualOverrideRef.current) return
    const idx = Math.min(
      developmentProcess.length - 1,
      Math.max(0, Math.round(latest * (developmentProcess.length - 1))),
    )
    const stepNumber = developmentProcess[idx]?.number
    if (stepNumber) {
      setActiveStep((prev) => (prev === stepNumber ? prev : stepNumber))
    }
  })

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative isolate overflow-hidden border-b border-border-subtle bg-bg-primary py-24 sm:py-32 editorial-grid-lines"
    >
      <div className="editorial-container">
        <SectionHeader
          index="06"
          eyebrow="ENGINEERING WORKFLOW"
          title="DEVELOPMENT"
          accentTitle="PROCESS"
          headingId="process-heading"
          description="A structured six-stage lifecycle translating raw problem statements into tested, maintainable software systems."
        />

        {/* Desktop Connecting Progress Rail */}
        <div className="mt-12 hidden lg:block">
          <div className="relative flex items-center justify-between px-4 py-3">
            <div
              aria-hidden="true"
              className="absolute inset-x-4 top-1/2 h-[1px] -translate-y-1/2 bg-border-subtle"
            />
            <motion.div
              aria-hidden="true"
              style={{
                scaleX: prefersReducedMotion ? 1 : progressScaleX,
              }}
              className="absolute inset-x-4 top-1/2 h-[1.5px] -translate-y-1/2 origin-left bg-gradient-to-r from-crimson-dark via-crimson-primary to-red-signal will-change-transform"
            />

            {developmentProcess.map((step) => {
              const isSelected = activeStep === step.number
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => {
                    manualOverrideRef.current = true
                    setActiveStep(step.number)
                    setTimeout(() => {
                      manualOverrideRef.current = false
                    }, 1200)
                  }}
                  aria-current={isSelected ? 'step' : undefined}
                  aria-label={`Step ${step.number}: ${step.title}`}
                  className={cn(
                    'relative z-10 inline-flex h-9 items-center gap-2 rounded-full border px-4 font-mono text-[0.7rem] font-semibold tracking-[0.12em] uppercase transition-editorial cursor-pointer',
                    isSelected
                      ? 'border-crimson-primary bg-crimson-primary text-text-primary shadow-[0_0_24px_rgba(229,9,37,0.45)]'
                      : 'border-border-subtle bg-surface-elevated text-text-muted hover:border-crimson-primary hover:text-text-primary',
                  )}
                >
                  <span>{step.number}</span>
                  <span>{step.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 6 Numbered Engineering Sequence Cards */}
        <div
          ref={gridRef}
          className="mt-8 lg:mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {developmentProcess.map((step, idx) => {
            const isActive = activeStep === step.number
            return (
              <motion.article
                key={step.number}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.05,
                  ease: CINEMATIC_EASE,
                }}
                onPointerEnter={() => setActiveStep(step.number)}
                className={cn(
                  'group relative flex flex-col justify-between gap-6 rounded-xl border p-6 sm:p-7 transition-editorial',
                  isActive
                    ? 'border-border-red bg-surface-card shadow-[0_24px_56px_-20px_rgba(0,0,0,0.92)]'
                    : 'border-border-subtle bg-surface-elevated hover:border-border-red hover:bg-surface-card',
                )}
              >
                {/* Top Active Step Hairline */}
                <div
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-0 top-0 h-[1.5px] origin-left bg-crimson-primary transition-transform duration-300',
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="font-display text-4xl leading-none tracking-[0.04em] text-text-primary">
                      {step.number}
                    </span>
                    <span
                      className={cn(
                        'inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-editorial',
                        isActive
                          ? 'border-crimson-primary bg-crimson-primary'
                          : 'border-border-subtle bg-black-pure group-hover:border-crimson-primary',
                      )}
                    >
                      <ProcessIcon name={step.iconName} isActive={isActive} />
                    </span>
                  </div>

                  <h3 className="type-card-display">{step.title}</h3>
                  <p className="mt-1 font-body text-xs font-semibold text-crimson-primary">
                    {step.subtitle}
                  </p>
                  <p className="mt-3.5 type-body text-sm">{step.description}</p>
                </div>

                <div className="border-t border-border-subtle pt-4 flex items-center justify-between gap-2">
                  <span className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-text-muted">
                    DELIVERABLE
                  </span>
                  <span className="font-body text-xs font-medium text-text-primary">
                    {step.deliverable}
                  </span>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
