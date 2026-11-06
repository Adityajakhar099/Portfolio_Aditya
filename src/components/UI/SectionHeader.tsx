import { motion, useReducedMotion } from 'motion/react'
import { CINEMATIC_EASE } from '../../animations'
import { cn } from '../../utils'

export interface SectionHeaderProps {
  index: string
  eyebrow: string
  title: string
  accentTitle?: string
  description?: string
  headingId?: string
  align?: 'left' | 'split'
  className?: string
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  accentTitle,
  description,
  headingId,
  align = 'split',
  className,
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.62, ease: CINEMATIC_EASE }}
      className={cn(
        'flex flex-col gap-5 pb-10 sm:pb-12 border-b border-border-subtle',
        align === 'split' &&
          'lg:flex-row lg:items-end lg:justify-between lg:gap-12',
        className,
      )}
    >
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="font-mono text-xs font-semibold tracking-[0.14em] text-crimson-primary">
            {index}
          </span>
          <span className="h-[1px] w-7 bg-crimson-primary" aria-hidden="true" />
          <span className="type-eyebrow">{eyebrow}</span>
        </div>

        <h2 id={headingId} className="type-section-display">
          <span>{title}</span>
          {accentTitle && (
            <>
              {' '}
              <span className="text-crimson-primary">{accentTitle}</span>
            </>
          )}
        </h2>
      </div>

      {description && (
        <p className="type-body max-w-md lg:pb-1">{description}</p>
      )}
    </motion.div>
  )
}
