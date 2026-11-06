import { ArrowUpRight, Menu, X } from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CINEMATIC_EASE } from '../../animations'
import { heroIdentity, siteNavigation } from '../../data/experience'
import { useActiveSection } from '../../hooks'
import { cn } from '../../utils'
import { GitHubIcon } from '../Icons'

/**
 * Minimal Pure-Black & Crimson Editorial Navigation:
 * - Transparent-to-obsidian transition on scroll with subtle #29292F bottom border
 * - Compact AJ. personal brand mark
 * - Clean indexed typography with crimson numbering, hover underline, and spring active baseline
 * - Full-screen #030303 mobile navigation drawer with scroll lock & keyboard Escape/focus support
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const sectionIds = useMemo(() => siteNavigation.map((item) => item.id), [])
  const activeSection = useActiveSection(sectionIds)

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 190,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock document scroll & set <main> inert while full-screen mobile drawer is open
  useEffect(() => {
    const mainEl = document.getElementById('main-content')
    if (!mobileOpen) {
      document.body.style.overflow = ''
      if (mainEl) mainEl.inert = false
      return
    }

    document.body.style.overflow = 'hidden'
    if (mainEl) mainEl.inert = true

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        toggleButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      if (mainEl) mainEl.inert = false
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  const handleSmoothNav = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith('#')) return
    const target = document.getElementById(href.slice(1))
    if (!target) return
    event.preventDefault()

    if (mobileOpen) {
      document.body.style.overflow = ''
      setMobileOpen(false)
    }

    window.requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        mobileOpen
          ? 'border-border-subtle bg-black-pure'
          : isScrolled
            ? 'border-border-subtle bg-black-pure/92 backdrop-blur-md'
            : 'border-border-subtle/60 bg-black-pure/65',
      )}
    >
      {/* Top Crimson Scroll Progress Hairline */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] origin-left bg-gradient-to-r from-crimson-dark via-crimson-primary to-red-signal"
        style={{ scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress }}
      />

      <div className="editorial-container flex h-16 items-center justify-between gap-6">
        {/* Compact Personal Brand Mark */}
        <a
          href="#hero"
          onClick={(e) => handleSmoothNav(e, '#hero')}
          className="group inline-flex items-center gap-3 py-1.5 shrink-0"
          aria-label={`${heroIdentity.fullName} — Top of page`}
        >
          <span className="font-display text-2xl leading-none tracking-[0.04em] text-text-primary">
            {heroIdentity.monogram}
            <span className="text-crimson-primary">.</span>
          </span>
          <span className="h-3.5 w-[1px] bg-border-subtle" aria-hidden="true" />
          <span className="font-body text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-text-secondary group-hover:text-text-primary transition-colors">
            {heroIdentity.fullName}
          </span>
        </a>

        {/* Desktop Minimal Editorial Navigation */}
        <nav
          aria-label="Primary section navigation"
          className="hidden xl:flex items-center gap-7"
        >
          {siteNavigation.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleSmoothNav(e, item.href)}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'nav-link-underline relative inline-flex items-baseline gap-1.5 py-2 font-body text-[0.74rem] font-medium tracking-[0.12em] uppercase transition-colors duration-200',
                  isActive
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary',
                )}
              >
                <span className="font-mono text-[0.65rem] font-semibold text-crimson-primary">
                  {item.index}
                </span>
                <span>{item.label}</span>

                {isActive && (
                  <motion.span
                    layoutId="active-nav-baseline"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    className="pointer-events-none absolute inset-x-0 -bottom-[2px] h-[1.5px] bg-crimson-primary"
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right Utility Actions */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={heroIdentity.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aditya Jakhar on GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface-elevated text-text-secondary hover:border-crimson-primary hover:text-text-primary transition-editorial"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>

          <a
            href={heroIdentity.links.contact}
            onClick={(e) => handleSmoothNav(e, heroIdentity.links.contact)}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-red-signal px-4 font-body text-[0.72rem] font-bold tracking-[0.12em] uppercase text-text-primary hover:bg-crimson-primary transition-editorial"
          >
            <span>Contact</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile / Tablet Minimal Menu Trigger */}
        <button
          ref={toggleButtonRef}
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-editorial-drawer"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex xl:hidden h-10 w-10 items-center justify-center rounded-md border border-border-subtle bg-surface-elevated text-text-primary hover:border-crimson-primary transition-editorial cursor-pointer"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Full-Screen Pure-Black Mobile / Tablet Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-editorial-drawer"
            aria-label="Mobile navigation"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: CINEMATIC_EASE }}
            className="xl:hidden fixed inset-x-0 top-16 bottom-0 z-[60] flex flex-col justify-between overflow-y-auto bg-black-pure editorial-grid-lines px-6 py-8"
          >
            <div className="mx-auto flex w-full max-w-xl flex-col divide-y divide-border-subtle">
              {siteNavigation.map((item, idx) => {
                const isActive = activeSection === item.id
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleSmoothNav(e, item.href)}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.32,
                      delay: idx * 0.035,
                      ease: CINEMATIC_EASE,
                    }}
                    className="group flex items-baseline justify-between py-4"
                  >
                    <span className="inline-flex items-baseline gap-4">
                      <span className="font-mono text-xs font-semibold tracking-[0.14em] text-crimson-primary">
                        {item.index}
                      </span>
                      <span
                        className={cn(
                          'font-display text-4xl sm:text-5xl tracking-[0.03em] uppercase transition-colors',
                          isActive
                            ? 'text-crimson-primary'
                            : 'text-text-primary group-hover:text-crimson-primary',
                        )}
                      >
                        {item.label}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-text-muted group-hover:text-crimson-primary transition-colors"
                      aria-hidden="true"
                    />
                  </motion.a>
                )
              })}
            </div>

            <div className="mx-auto mt-8 flex w-full max-w-xl flex-col gap-3 border-t border-border-subtle pt-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={heroIdentity.links.contact}
                  onClick={(e) => handleSmoothNav(e, heroIdentity.links.contact)}
                  className="btn-editorial-primary w-full justify-between"
                >
                  <span>Start a Conversation</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href={heroIdentity.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-outline w-full justify-between"
                >
                  <span className="inline-flex items-center gap-2">
                    <GitHubIcon className="h-4 w-4" />
                    <span>GitHub Profile</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-crimson-primary" aria-hidden="true" />
                </a>
              </div>

              <p className="pt-2 text-center font-body text-xs text-text-muted">
                {heroIdentity.links.emailAddress}
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
