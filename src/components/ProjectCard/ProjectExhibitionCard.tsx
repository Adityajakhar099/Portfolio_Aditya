import { ArrowUpRight, ExternalLink, Layers } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { ProjectItem } from '../../data/projects'
import { cn } from '../../utils'
import { GitHubIcon } from '../Icons'

export interface ProjectExhibitionCardProps {
  project: ProjectItem
  className?: string
  onImageLoad?: () => void
}

/**
 * Large visual exhibition stage for each featured project:
 * - Frames authentic deployed application screenshots inside a pure-black (#030303) studio window
 *   with surgical crimson accents, interactive module switcher tabs (when multiple views exist),
 *   subtle scroll parallax hook, and tactile hover zoom.
 */
function ProjectVisualStage({
  project,
  onImageLoad,
}: {
  project: ProjectItem
  onImageLoad?: () => void
}) {
  const [activeShotIdx, setActiveShotIdx] = useState(0)
  const gallery = project.gallery
  const activeShot = gallery[activeShotIdx] ?? gallery[0]
  const imageSrc = activeShot?.src ?? project.thumbnail
  const imageAlt = activeShot?.alt ?? project.altText

  const displayHost = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : project.githubUrl?.replace(/^https?:\/\//, '') ?? project.slug

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-black-pure p-3.5 sm:p-5">
      {/* Subtle Pure Crimson Rim Backlight Behind Studio Frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-75 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 62% 22%, rgba(229, 9, 37, 0.15) 0%, rgba(163, 13, 34, 0.05) 45%, rgba(3, 3, 3, 0) 76%)',
        }}
      />

      {/* Studio Browser / Live Deployment Window */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border-subtle bg-bg-secondary shadow-[0_26px_64px_rgba(0,0,0,0.94)] transition-colors duration-500 group-hover:border-crimson-primary/45">
        {/* Minimal Window Chrome Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-border-subtle bg-black-pure/95 px-3.5 py-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-crimson-primary" />
            <span className="h-2 w-2 rounded-full bg-border-subtle" />
            <span className="h-2 w-2 rounded-full bg-border-subtle" />
          </div>

          <span className="truncate font-mono text-[0.65rem] tracking-[0.07em] text-text-muted">
            {displayHost}
          </span>

          <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[0.58rem] font-semibold tracking-[0.14em] uppercase text-crimson-primary">
            <span
              className="h-1.5 w-1.5 rounded-full bg-crimson-primary"
              aria-hidden="true"
            />
            {project.liveUrl ? 'LIVE DEPLOY' : 'VERIFIED'}
          </span>
        </div>

        {/* Interactive Multi-Screen Module Switcher (when multiple live screens exist) */}
        {gallery.length > 1 && (
          <div
            role="tablist"
            aria-label={`${project.title} live interface views`}
            className="flex items-center gap-1.5 overflow-x-auto border-b border-border-subtle bg-surface-elevated/95 px-3 py-1.5"
          >
            {gallery.map((shot, idx) => {
              const isSelected = idx === activeShotIdx
              return (
                <button
                  key={shot.src}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveShotIdx(idx)}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-1.5 rounded px-2.5 py-1 font-mono text-[0.625rem] font-semibold tracking-[0.08em] uppercase transition-editorial cursor-pointer',
                    isSelected
                      ? 'bg-crimson-primary text-text-primary'
                      : 'bg-black-pure/60 text-text-muted hover:text-text-primary',
                  )}
                >
                  <span className="opacity-75">0{idx + 1}</span>
                  <span>{shot.label}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* Primary Dashboard Screenshot Stage (Clickable to Case Study) */}
        <Link
          to={`/projects/${project.slug}`}
          aria-label={`Inspect ${project.title} case study and full-resolution screenshots`}
          className="group/stage relative block min-h-[13.5rem] sm:min-h-[17rem] lg:min-h-0 flex-1 overflow-hidden bg-black-pure focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-crimson-primary"
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            width={1440}
            height={1000}
            loading="eager"
            decoding="async"
            onLoad={onImageLoad}
            className="h-full w-full object-cover object-top brightness-[0.97] contrast-[1.02] transition-transform duration-700 ease-out group-hover/stage:scale-[1.02] group-hover/stage:brightness-100"
          />

          {/* Subtle Editorial Bottom Vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black-pure/65 via-transparent to-black-pure/10 transition-opacity duration-500 group-hover:opacity-35"
          />

          {/* Case Study Hover Pill */}
          <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-crimson-primary/60 bg-black-pure/90 px-3 py-1 font-mono text-[0.625rem] font-semibold tracking-[0.12em] uppercase text-text-primary opacity-0 translate-y-1 transition-all duration-300 group-hover/stage:opacity-100 group-hover/stage:translate-y-0 group-focus-visible/stage:opacity-100">
            <span>Inspect Case Study</span>
            <ArrowUpRight className="h-3 w-3 text-crimson-primary" aria-hidden="true" />
          </span>
        </Link>
      </div>

      {/* Compact System Architecture Pipeline Strip */}
      <div className="relative z-10 mt-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {project.architecture.layers.map((layer, idx) => (
          <div
            key={layer}
            className="flex items-center gap-1.5 rounded-md border border-border-subtle bg-surface-elevated/90 px-2.5 py-1.5"
          >
            <span className="font-mono text-[0.6rem] font-semibold text-crimson-primary">
              0{idx + 1}
            </span>
            <span className="truncate font-body text-[0.68rem] font-medium text-text-secondary">
              {layer}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProjectExhibitionCard({
  project,
  className,
  onImageLoad,
}: ProjectExhibitionCardProps) {
  return (
    <article
      className={cn(
        'group relative grid grid-cols-1 overflow-hidden rounded-xl border border-border-subtle bg-surface-card shadow-[0_34px_84px_-24px_rgba(0,0,0,0.96)] hover:border-crimson-primary/60 transition-editorial lg:grid-cols-12',
        className,
      )}
    >
      {/* Top Crimson Hairline Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] bg-gradient-to-r from-crimson-primary via-red-signal to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* LARGE DEPLOYED SCREENSHOT STAGE (7 of 12 columns on desktop, top on mobile) */}
      <div className="min-h-0 border-b border-border-subtle lg:col-span-7 lg:border-b-0 lg:border-r">
        <ProjectVisualStage project={project} onImageLoad={onImageLoad} />
      </div>

      {/* ASYMMETRIC EDITORIAL PROJECT MONOGRAPH (5 of 12 columns on desktop) */}
      <div className="flex min-h-0 flex-col justify-between gap-4 p-5 sm:p-7 lg:col-span-5 lg:p-5 xl:gap-5 xl:p-7">
        <div>
          <div className="mb-2 xl:mb-3.5 flex items-center justify-between gap-3">
            <div className="inline-flex min-w-0 items-baseline gap-2.5">
              <span className="font-display text-3xl sm:text-4xl xl:text-[2.75rem] leading-none tracking-[0.03em] text-crimson-primary">
                {project.index}
              </span>
              <span className="h-3.5 w-[1px] shrink-0 bg-border-subtle" aria-hidden="true" />
              <span className="truncate font-mono text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-text-muted">
                {project.category}
              </span>
            </div>

            <Layers
              className="h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-crimson-primary"
              aria-hidden="true"
            />
          </div>

          <h3 className="font-display text-[clamp(2.15rem,3.5vw,3.75rem)] leading-[0.88] tracking-[0.025em] uppercase text-text-primary">
            <Link
              to={`/projects/${project.slug}`}
              className="hover:text-crimson-primary transition-colors"
            >
              {project.title}
            </Link>
          </h3>

          <p className="mt-1.5 font-body text-xs xl:text-[0.84375rem] font-semibold leading-snug text-text-primary/90">
            {project.subtitle}
          </p>

          <p className="mt-2.5 xl:mt-3.5 type-body text-[0.825rem] xl:text-[0.9rem] leading-[1.55] xl:leading-[1.64]">
            {project.description}
          </p>
        </div>

        {/* Technology Stack + Conditional Actions */}
        <div className="flex flex-col gap-3.5 border-t border-border-subtle pt-3.5 xl:gap-4 xl:pt-4">
          <ul
            aria-label={`${project.title} technology stack`}
            className="flex flex-wrap gap-1.5"
          >
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border-subtle bg-surface-elevated px-2.5 py-0.5 font-mono text-[0.65rem] font-medium tracking-[0.04em] text-text-secondary"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-red-signal px-4.5 py-2 font-body text-[0.72rem] font-bold tracking-[0.11em] uppercase text-text-primary hover:bg-crimson-primary transition-editorial"
              >
                <span>View Live Project</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : (
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-red-signal px-4.5 py-2 font-body text-[0.72rem] font-bold tracking-[0.11em] uppercase text-text-primary hover:bg-crimson-primary transition-editorial"
              >
                <span>View Case Study</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border-subtle bg-surface-elevated px-4 py-2 font-body text-[0.72rem] font-semibold tracking-[0.11em] uppercase text-text-primary hover:border-crimson-primary hover:bg-surface-hover transition-editorial"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-crimson-primary"
                  aria-hidden="true"
                />
              </a>
            )}

            {project.liveUrl && (
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex min-h-10 items-center gap-1 px-2 py-2 font-mono text-[0.675rem] font-semibold tracking-[0.12em] uppercase text-text-secondary hover:text-text-primary transition-colors"
              >
                <span>Case Study</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-crimson-primary"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
