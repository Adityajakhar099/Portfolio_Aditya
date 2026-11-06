import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let isRegistered = false

/**
 * Registers GSAP plugins once and configures ScrollTrigger for stable mobile/tablet behavior.
 * Always use gsap.matchMedia() to guard animations with prefers-reduced-motion.
 */
export function registerGSAPPlugins(): void {
  if (isRegistered || typeof window === 'undefined') return
  gsap.registerPlugin(useGSAP, ScrollTrigger)
  ScrollTrigger.config({ ignoreMobileResize: true })
  isRegistered = true
}

export const GSAP_MEDIA_QUERIES = {
  motionAllowed: '(prefers-reduced-motion: no-preference)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1024px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  mobile: '(max-width: 1023px)',
  smallMobile: '(max-width: 767px)',
} as const

export { gsap, ScrollTrigger, useGSAP }
