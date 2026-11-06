import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Layers,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { pageTransitionVariants } from '../../animations'
import { GitHubIcon } from '../../components/Icons'
import { featuredProjects, projects, type ProjectItem } from '../../data/projects'
import { cn } from '../../utils'

function ProjectScreenshotShowcase({ project }: { project: ProjectItem }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const gallery = project.gallery
  const activeShot = gallery[activeIdx] ?? gallery[0]
  const displayHost = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : project.githubUrl?.replace(/^https?:\/\//, '') ?? project.slug

  if (!activeShot && !project.thumbnail) return null

  return (
    <section
      aria-label={`${project.title} visual showcase`}
      className="mt-10 flex flex-col gap-4"
    >
      {/* Primary Full-Width Studio Browser Frame */}
      <div className="overflow-hidden rounded-xl border border-border-subtle bg-black-pure shadow-[0_32px_86px_rgba(0,0,0,0.95)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-surface-elevated/95 px-4 py-3">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-crimson-primary" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-subtle" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-subtle" />
          </div>

          <span className="font-mono text-xs tracking-[0.08em] text-text-muted">
            {displayHost}
          </span>

          <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-crimson-primary">
            <span
              className="h-1.5 w-1.5 rounded-full bg-crimson-primary"
              aria-hidden="true"
            />
            {activeShot?.label ?? 'LIVE INTERFACE'}
          </span>
        </div>

        <div className="relative bg-black-pure">
          <img
            src={activeShot?.src ?? project.thumbnail}
            alt={activeShot?.alt ?? project.altText}
            width={1440}
            height={1000}
            className="h-auto w-full object-cover"
          />
        </div>

        {activeShot?.caption && (
          <div className="border-t border-border-subtle bg-surface-card px-5 py-3.5">
            <p className="font-mono text-xs tracking-[0.04em] text-text-secondary">
              {activeShot.caption}
            </p>
          </div>
        )}
      </div>

      {/* Interactive Multi-Screen Gallery Strip */}
      {gallery.length > 1 && (
        <div
          role="tablist"
          aria-label="Select application module screenshot"
          className="grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {gallery.map((shot, idx) => {
            const isSelected = idx === activeIdx
            return (
              <button
                key={shot.src}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  'group flex flex-col overflow-hidden rounded-lg border bg-surface-card text-left transition-editorial cursor-pointer',
                  isSelected
                    ? 'border-crimson-primary ring-1 ring-crimson-primary/40'
                    : 'border-border-subtle hover:border-crimson-primary/60',
                )}
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-black-pure">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      'h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]',
                      isSelected ? 'brightness-100' : 'brightness-85 group-hover:brightness-100',
                    )}
                  />
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-border-subtle px-3.5 py-2.5">
                  <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.08em] uppercase text-text-primary">
                    <span className="mr-1.5 text-crimson-primary">0{idx + 1}</span>
                    {shot.label}
                  </span>
                  {isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-crimson-primary" aria-hidden="true" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}

/**
 * Pure-Black & Crimson architectural case-study brief view for individual featured projects.
 */
export function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>()
  const projectIndex = projects.findIndex((item) => item.slug === slug)
  const project = projectIndex >= 0 ? projects[projectIndex] : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  if (!project) {
    return (
      <motion.main
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex min-h-dvh flex-col items-center justify-center bg-black-pure px-6 text-center text-text-primary"
      >
        <p className="mb-3 font-mono text-xs font-semibold tracking-[0.18em] uppercase text-crimson-primary">
          404 // PROJECT NOT FOUND
        </p>
        <h1 className="mb-6 type-section-display">UNKNOWN PROJECT SLUG</h1>
        <Link to="/" className="btn-editorial-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Return to Portfolio</span>
        </Link>
      </motion.main>
    )
  }

  const prevProject =
    featuredProjects[
      (projectIndex - 1 + featuredProjects.length) % featuredProjects.length
    ]
  const nextProject =
    featuredProjects[(projectIndex + 1) % featuredProjects.length]

  return (
    <motion.main
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-dvh bg-bg-primary py-12 sm:py-16 text-text-primary editorial-grid-lines"
    >
      <div className="editorial-container">
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-6">
          <Link
            to="/#projects"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border-subtle bg-surface-elevated px-5 py-2 font-body text-xs font-semibold tracking-[0.13em] uppercase text-text-primary hover:border-crimson-primary transition-editorial"
          >
            <ArrowLeft
              className="h-4 w-4 text-crimson-primary"
              aria-hidden="true"
            />
            <span>Back to Portfolio</span>
          </Link>

          <span className="font-mono text-xs tracking-[0.16em] uppercase text-text-muted">
            PROJECT {project.index} // {project.category}
          </span>
        </div>

        {/* Case Study Editorial Header */}
        <header className="mt-10 sm:mt-12 border-b border-border-subtle pb-10 sm:pb-12">
          <div className="inline-flex items-baseline gap-3">
            <span className="font-display text-5xl tracking-[0.04em] text-crimson-primary">
              {project.index}
            </span>
            <span className="h-4 w-[1px] bg-border-subtle" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold tracking-[0.14em] uppercase text-text-muted">
              {project.category}
            </span>
          </div>

          <h1 className="mt-2 type-hero-display">{project.title}</h1>
          <p className="mt-3 font-body text-base sm:text-lg font-semibold text-text-primary/90">
            {project.subtitle}
          </p>
          <p className="mt-4 max-w-3xl type-body-lg">{project.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-primary"
              >
                <span>Open Live Deployment</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  project.liveUrl
                    ? 'btn-editorial-outline'
                    : 'btn-editorial-primary'
                }
              >
                <GitHubIcon className="h-4 w-4" />
                <span>View Repository</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </header>

        {/* Keyed Multi-Screenshot Showcase */}
        <ProjectScreenshotShowcase key={project.id} project={project} />

        {/* Problem, Solution & System Architecture Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="rounded-xl border border-border-subtle bg-surface-card p-6 sm:p-7">
              <span className="mb-2 block font-mono text-xs font-semibold tracking-[0.14em] uppercase text-crimson-primary">
                PROBLEM CONTEXT
              </span>
              <p className="type-body-lg">{project.problem}</p>
            </div>

            <div className="rounded-xl border border-border-subtle bg-surface-card p-6 sm:p-7">
              <span className="mb-2 block font-mono text-xs font-semibold tracking-[0.14em] uppercase text-crimson-primary">
                ARCHITECTURAL SOLUTION & MODULES
              </span>
              <p className="type-body-lg">{project.solution}</p>
              <ul className="mt-6 flex flex-col gap-2.5 border-l-2 border-crimson-primary pl-4">
                {project.keyFeatures.map((feature) => (
                  <li key={feature} className="type-body text-text-primary/90">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-xl border border-border-subtle bg-surface-card p-6 sm:p-7">
              <div className="mb-3 flex items-center gap-2">
                <Layers
                  className="h-4 w-4 text-crimson-primary"
                  aria-hidden="true"
                />
                <span className="font-mono text-xs font-semibold tracking-[0.14em] uppercase text-text-primary">
                  SYSTEM PIPELINE
                </span>
              </div>
              <p className="mb-5 type-body">{project.architecture.summary}</p>
              <div className="flex flex-col gap-2">
                {project.architecture.layers.map((layer, idx) => (
                  <div
                    key={layer}
                    className="flex items-center gap-3 rounded-lg border border-border-subtle bg-surface-elevated px-3.5 py-2.5"
                  >
                    <span className="font-mono text-xs font-semibold text-crimson-primary">
                      0{idx + 1}
                    </span>
                    <span className="font-body text-sm font-medium text-text-primary">
                      {layer}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border-subtle bg-surface-card p-6 sm:p-7">
              <span className="mb-3 block font-mono text-xs font-semibold tracking-[0.14em] uppercase text-crimson-primary">
                TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border-subtle bg-surface-elevated px-3 py-1 font-mono text-xs font-medium text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Next / Previous Project Editorial Switcher */}
        {featuredProjects.length > 1 && prevProject && nextProject && (
          <nav
            aria-label="Adjacent case studies"
            className="mt-14 grid grid-cols-1 gap-4 border-t border-border-subtle pt-10 sm:grid-cols-2"
          >
            <Link
              to={`/projects/${prevProject.slug}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-border-subtle bg-surface-card p-5 hover:border-crimson-primary/60 transition-editorial"
            >
              <div className="flex items-center gap-3">
                <ArrowLeft
                  className="h-4 w-4 shrink-0 text-crimson-primary transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                <div>
                  <span className="block font-mono text-[0.65rem] tracking-[0.14em] uppercase text-text-muted">
                    PREVIOUS // {prevProject.index}
                  </span>
                  <span className="font-display text-2xl tracking-[0.03em] uppercase text-text-primary">
                    {prevProject.title}
                  </span>
                </div>
              </div>
            </Link>

            <Link
              to={`/projects/${nextProject.slug}`}
              className="group flex items-center justify-end gap-4 rounded-xl border border-border-subtle bg-surface-card p-5 text-right hover:border-crimson-primary/60 transition-editorial"
            >
              <div className="flex items-center gap-3">
                <div>
                  <span className="block font-mono text-[0.65rem] tracking-[0.14em] uppercase text-text-muted">
                    NEXT // {nextProject.index}
                  </span>
                  <span className="font-display text-2xl tracking-[0.03em] uppercase text-text-primary">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-crimson-primary transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </nav>
        )}
      </div>
    </motion.main>
  )
}
