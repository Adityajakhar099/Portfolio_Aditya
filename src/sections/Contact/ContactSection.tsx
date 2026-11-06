import { ArrowUp, ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { CINEMATIC_EASE } from '../../animations'
import { MagneticButton } from '../../components/Buttons'
import { GitHubIcon } from '../../components/Icons'
import { heroIdentity, siteNavigation } from '../../data/experience'

const CURRENT_YEAR = new Date().getFullYear()

/**
 * SECTION 07 (INDEXED) — CONTACT FINALE & MINIMAL EDITORIAL COLOPHON
 * Pure #030303 background, oversized LET'S BUILD / SOMETHING / GREAT. display type,
 * one dominant pure-crimson architectural CTA block, and verified contact channels only.
 */
export function ContactSection() {
  const prefersReducedMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    }
  }, [])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(heroIdentity.links.emailAddress)
      setCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = heroIdentity.links.email
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <>
      <section
        id="contact"
        aria-labelledby="contact-finale-heading"
        className="relative isolate overflow-hidden border-b border-border-subtle bg-black-pure py-24 sm:py-32"
      >
        {/* Subtle Crimson Finale Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[36rem]"
          style={{
            background:
              'radial-gradient(ellipse 55% 48% at 72% 78%, rgba(229, 9, 37, 0.16) 0%, rgba(163, 13, 34, 0.06) 44%, rgba(3, 3, 3, 0) 76%)',
          }}
        />

        <div className="editorial-container">
          {/* Top Eyebrow */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.14em] text-crimson-primary">
                07
              </span>
              <span className="h-[1px] w-7 bg-crimson-primary" aria-hidden="true" />
              <span className="type-eyebrow">CONTACT & COLLABORATION</span>
            </div>
            <span className="hidden sm:inline font-mono text-xs tracking-[0.16em] uppercase text-text-muted">
              OPEN FOR SOFTWARE ENGINEERING ROLES & BUILDS
            </span>
          </div>

          {/* Finale Grid: Monumental Typography + One Dominant Crimson Monolith */}
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            {/* LEFT: Oversized LET'S BUILD SOMETHING GREAT. + Verified Direct Links (7 cols) */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.68, ease: CINEMATIC_EASE }}
              className="lg:col-span-7 flex flex-col justify-between gap-8"
            >
              <div>
                <p className="type-script text-text-secondary mb-3">
                  Have an engineering role or ambitious project in mind?
                </p>
                <h2 id="contact-finale-heading" className="type-finale-display">
                  <span className="block text-text-primary">LET&apos;S BUILD</span>
                  <span className="block text-crimson-primary">SOMETHING</span>
                  <span className="block text-text-primary">GREAT.</span>
                </h2>
              </div>

              {/* Real Verified Contact Channels Only */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {/* Direct Email + One-Click Copy */}
                <div className="flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface-card p-4 hover:border-border-red transition-editorial">
                  <a
                    href={heroIdentity.links.email}
                    className="min-w-0 flex-1 group"
                  >
                    <span className="font-mono text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-crimson-primary block mb-1">
                      DIRECT EMAIL
                    </span>
                    <span className="block truncate font-body text-sm font-medium text-text-primary group-hover:text-crimson-primary transition-colors">
                      {heroIdentity.links.emailAddress}
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={copied ? 'Email copied' : 'Copy email address'}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-surface-elevated text-text-secondary hover:border-crimson-primary hover:text-text-primary transition-editorial cursor-pointer"
                  >
                    {copied ? (
                      <Check
                        className="h-4 w-4 text-crimson-primary"
                        aria-hidden="true"
                      />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>

                {/* Verified GitHub Profile */}
                <a
                  href={heroIdentity.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface-card p-4 hover:border-crimson-primary hover:bg-surface-hover transition-editorial"
                >
                  <div className="inline-flex items-center gap-3 min-w-0">
                    <GitHubIcon className="h-5 w-5 shrink-0 text-text-primary" />
                    <div className="min-w-0">
                      <span className="font-mono text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-crimson-primary block mb-1">
                        GITHUB REPOSITORIES
                      </span>
                      <span className="block truncate font-body text-sm font-medium text-text-primary">
                        {heroIdentity.links.githubDisplay}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-text-muted group-hover:text-crimson-primary transition-colors"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </motion.div>

            {/* RIGHT: One Dominant Pure-Crimson Architectural Element (5 cols) */}
            <motion.div
              initial={
                prefersReducedMotion ? false : { opacity: 0, y: 28, scale: 0.985 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.72, delay: 0.08, ease: CINEMATIC_EASE }}
              className="lg:col-span-5 flex"
            >
              <div
                className="relative flex w-full flex-col justify-between overflow-hidden rounded-xl border border-white/15 p-7 sm:p-9 shadow-[0_36px_90px_-24px_rgba(229,9,37,0.5)]"
                style={{
                  background:
                    'linear-gradient(155deg, #F21D35 0%, #E50925 48%, #8F071A 100%)',
                }}
              >
                {/* Crisp Geometric Ring */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/20"
                />

                <div className="relative z-10">
                  <span className="inline-block rounded-full border border-white/25 bg-black-pure/30 px-3.5 py-1 font-mono text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-text-primary">
                    START A CONVERSATION
                  </span>

                  <h3 className="mt-6 font-display text-4xl sm:text-5xl leading-[0.92] tracking-[0.025em] uppercase text-text-primary">
                    ENGINEERING IDEAS INTO PRODUCTION SOFTWARE.
                  </h3>

                  <p className="mt-4 font-body text-sm sm:text-base leading-relaxed text-text-primary/90">
                    Available for software engineering opportunities, full-stack
                    systems architecture, and applied AI collaborations.
                  </p>
                </div>

                <div className="relative z-10 mt-8 flex flex-col gap-3">
                  <MagneticButton
                    href={heroIdentity.links.email}
                    variant="outline"
                    size="lg"
                    className="w-full justify-between border-white/20 bg-black-pure text-text-primary hover:bg-bg-secondary hover:border-white px-6"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Mail
                        className="h-4 w-4 text-red-signal"
                        aria-hidden="true"
                      />
                      <span>Send an Email</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </MagneticButton>

                  <p className="text-center font-mono text-[0.68rem] tracking-[0.14em] uppercase text-text-primary/85">
                    LNMIIT · JAIPUR, INDIA · IST (UTC+5:30)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clean, Minimal Editorial Footer */}
      <footer className="bg-black-pure py-10">
        <div className="editorial-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl leading-none tracking-[0.04em] text-text-primary">
                {heroIdentity.monogram}
                <span className="text-crimson-primary">.</span>
              </span>
              <span className="h-3.5 w-[1px] bg-border-subtle" aria-hidden="true" />
              <span className="font-body text-xs text-text-muted">
                {heroIdentity.fullName} — Software Engineer
              </span>
            </div>

            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {siteNavigation.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="font-body text-xs font-medium tracking-[0.1em] uppercase text-text-muted hover:text-text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex h-9 items-center gap-2 self-start md:self-auto rounded-full border border-border-subtle bg-surface-elevated px-4 font-mono text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-text-secondary hover:border-crimson-primary hover:text-text-primary transition-editorial cursor-pointer"
            >
              <span>Top</span>
              <ArrowUp
                className="h-3.5 w-3.5 text-crimson-primary"
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-border-subtle/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-xs text-text-muted">
              © {CURRENT_YEAR} {heroIdentity.fullName}. All rights reserved.
            </p>
            <p className="type-script text-lg text-text-muted">
              Engineering Ideas. Building Impact.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
