import type { Transition, Variants } from 'motion/react'

/**
 * Shared cinematic easing curves aligned with src/styles/tokens.css
 */
export const CINEMATIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EDITORIAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const defaultTransition: Transition = {
  duration: 0.68,
  ease: CINEMATIC_EASE,
}

/**
 * Page transition variants for route changes
 */
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: CINEMATIC_EASE },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.32, ease: EDITORIAL_EASE },
  },
}

/**
 * Scroll-reveal variants for editorial blocks and cards
 */
export const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
}

/**
 * Staggered container & line/word child variants for oversized typography
 */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

export const staggerTextVariants: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.72, ease: CINEMATIC_EASE },
  },
}

/**
 * Interactive project card hover variants
 */
export const cardHoverVariants: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.005,
    transition: { duration: 0.34, ease: CINEMATIC_EASE },
  },
}
