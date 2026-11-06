import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import { AboutSection } from '../../sections/About'
import { ContactSection } from '../../sections/Contact'
import { ExperienceSection } from '../../sections/Experience'
import { HeroSection } from '../../sections/Hero'
import { ProcessSection } from '../../sections/Process'
import { ProjectsSection } from '../../sections/Projects'
import { SkillsSection } from '../../sections/Skills'
import { TypographyStorySection } from '../../sections/Storytelling'

/**
 * Complete Pure-Black & Crimson Cinematic Developer Portfolio Homepage
 */
export function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const targetId = hash.slice(1)
    const timer = window.setTimeout(() => {
      const target = document.getElementById(targetId)
      target?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }, 80)
    return () => window.clearTimeout(timer)
  }, [hash])

  return (
    <div className="min-h-dvh bg-bg-primary text-text-primary">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-red-signal focus:px-4 focus:py-2 focus:font-body focus:text-xs focus:font-bold focus:uppercase focus:text-text-primary"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <TypographyStorySection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ProcessSection />
        <ContactSection />
      </main>
    </div>
  )
}
