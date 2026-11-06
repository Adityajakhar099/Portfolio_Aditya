import {
  Cpu,
  Database,
  GitBranch,
  Layout,
  Server,
  Terminal,
} from 'lucide-react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { useRef, useState } from 'react'
import { CINEMATIC_EASE } from '../../animations'
import { InfiniteMarquee, SectionHeader } from '../../components/UI'
import {
  marqueeStripPrimary,
  marqueeStripSecondary,
  type SkillCategory,
  skillCategories,
} from '../../data/skills'
import { cn } from '../../utils'

function CategoryIcon({ id, isActive }: { id: string; isActive: boolean }) {
  const cls = cn(
    'h-4 w-4 transition-colors duration-300',
    isActive ? 'text-crimson-primary' : 'text-text-muted group-hover:text-crimson-primary',
  )
  switch (id) {
    case 'programming':
      return <Terminal className={cls} aria-hidden="true" />
    case 'frontend':
      return <Layout className={cls} aria-hidden="true" />
    case 'backend':
      return <Server className={cls} aria-hidden="true" />
    case 'database':
      return <Database className={cls} aria-hidden="true" />
    case 'ai-ml':
      return <Cpu className={cls} aria-hidden="true" />
    default:
      return <GitBranch className={cls} aria-hidden="true" />
  }
}

/**
 * Interactive ecosystem card adapted from 21st.dev Spotlight Card (#2220),
 * bound strictly to locked #141418 card surface & rgba(229, 9, 37, 0.13) crimson glow.
 */
function SkillEcosystemCard({
  category,
  index,
  isHighlighted,
  onActivate,
  reducedMotion,
}: {
  category: SkillCategory
  index: number
  isHighlighted: boolean
  onActivate: () => void
  reducedMotion: boolean
}) {
  const cardRef = useRef<HTMLElement>(null)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.article
      ref={cardRef}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.56,
        delay: index * 0.055,
        ease: CINEMATIC_EASE,
      }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        setHovered(true)
        onActivate()
      }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={onActivate}
      className={cn(
        'group relative flex flex-col justify-between gap-6 overflow-hidden rounded-xl border p-6 sm:p-7 transition-editorial',
        isHighlighted
          ? 'border-border-red bg-surface-card shadow-[0_24px_56px_-20px_rgba(0,0,0,0.92)]'
          : 'border-border-subtle bg-surface-card hover:border-border-red hover:bg-surface-hover',
      )}
    >
      {/* Subtle Cursor-Tracked Crimson Spotlight */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(280px circle at ${pointer.x}px ${pointer.y}px, rgba(229, 9, 37, 0.13), transparent 75%)`,
          }}
        />
      )}

      {/* Top Active Hairline */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-[1.5px] origin-left bg-crimson-primary transition-transform duration-300',
          isHighlighted ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
        )}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="font-mono text-xs font-semibold tracking-[0.14em] text-crimson-primary">
            {category.index}
          </span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border-subtle bg-surface-elevated">
            <CategoryIcon id={category.id} isActive={isHighlighted} />
          </span>
        </div>

        <h3 className="type-card-display">{category.title}</h3>
        <p className="mt-2.5 type-body text-sm">{category.subtitle}</p>
      </div>

      <ul
        aria-label={`${category.title} technologies`}
        className="relative z-10 flex flex-wrap gap-2 border-t border-border-subtle pt-4"
      >
        {category.skills.map((skill) => (
          <li
            key={skill}
            className={cn(
              'rounded-md border px-2.5 py-1 font-mono text-[0.72rem] font-medium tracking-[0.03em] transition-editorial',
              isHighlighted
                ? 'border-border-red bg-black-pure text-text-primary'
                : 'border-border-subtle bg-surface-elevated text-text-secondary group-hover:text-text-primary',
            )}
          >
            {skill}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

/**
 * SECTION 04 (INDEXED) — TECHNICAL ECOSYSTEM
 * Black background (#080808), directional typographic marquees, and 6 neutral obsidian
 * ecosystem modules with subtle cursor-tracked crimson emphasis.
 */
export function SkillsSection() {
  const prefersReducedMotion = Boolean(useReducedMotion())
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState<string>('ai-ml')

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const glowX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-labelledby="skills-heading"
      className="relative isolate overflow-hidden border-b border-border-subtle bg-bg-primary pt-14 pb-24 sm:pb-32 editorial-grid-lines"
    >
      {/* Opposite-Direction Dual Infinite Marquee Strips */}
      <div className="flex flex-col gap-2.5 mb-16 sm:mb-20">
        <InfiniteMarquee
          items={marqueeStripPrimary}
          direction="left"
          variant="filled"
        />
        <InfiniteMarquee
          items={marqueeStripSecondary}
          direction="right"
          variant="outlined"
        />
      </div>

      {/* Subtle Scroll-Linked Crimson Atmosphere */}
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { x: glowX }}
        className="pointer-events-none absolute left-1/3 top-1/2 -z-10 h-96 w-[38rem] -translate-y-1/2 rounded-full"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229, 9, 37, 0.12) 0%, rgba(163, 13, 34, 0.04) 48%, transparent 72%)',
          }}
        />
      </motion.div>

      <div className="editorial-container">
        <SectionHeader
          index="04"
          eyebrow="TECHNICAL ECOSYSTEM"
          title="ENGINEERING"
          accentTitle="STACK"
          headingId="skills-heading"
          description="Core languages, full-stack frameworks, databases, and applied AI tooling used to architect and ship reliable software."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, idx) => (
            <SkillEcosystemCard
              key={category.id}
              category={category}
              index={idx}
              isHighlighted={activeCategory === category.id}
              onActivate={() => setActiveCategory(category.id)}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
