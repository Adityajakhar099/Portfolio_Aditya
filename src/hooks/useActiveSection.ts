import { useEffect, useState } from 'react'

/**
 * Tracks which homepage section is currently active at the upper-third reading line.
 * Works reliably across both normal flow sections and GSAP-pinned scroll containers.
 */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? 'hero')

  useEffect(() => {
    let rafId: number | null = null

    const updateActive = () => {
      rafId = null
      const triggerLine = window.innerHeight * 0.34
      let current = sectionIds[0] ?? 'hero'

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (!element) continue
        const rect = element.getBoundingClientRect()
        if (rect.top <= triggerLine) {
          current = id
        }
      }

      setActiveId((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(updateActive)
    }

    updateActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionIds])

  return activeId
}

