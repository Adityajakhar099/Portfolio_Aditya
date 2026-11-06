import { motion, useReducedMotion, useSpring } from 'motion/react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils'
import { type ButtonVariantProps, buttonVariants } from './variants'

const SPRING_CONFIG = { stiffness: 210, damping: 17, mass: 0.12 }

interface BaseProps extends ButtonVariantProps {
  children: ReactNode
  className?: string
  strength?: number
}

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> & {
    href: string
  }

type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps | 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> & {
    href?: undefined
  }

export type MagneticButtonProps = AnchorProps | NativeButtonProps

/**
 * Tactile magnetic CTA button/link grounded in 21st.dev MagneticButton pattern,
 * styled strictly with locked portfolio design tokens and reduced-motion respect.
 */
export function MagneticButton(props: MagneticButtonProps) {
  const {
    children,
    className,
    variant = 'primary',
    size = 'md',
    strength = 0.24,
    ...rest
  } = props

  const prefersReducedMotion = useReducedMotion()
  const x = useSpring(0, SPRING_CONFIG)
  const y = useSpring(0, SPRING_CONFIG)

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const deltaX = event.clientX - (rect.left + rect.width / 2)
    const deltaY = event.clientY - (rect.top + rect.height / 2)
    x.set(deltaX * strength)
    y.set(deltaY * strength)
  }

  const handlePointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  const mergedClassName = cn(buttonVariants({ variant, size }), className)

  if ('href' in rest && typeof rest.href === 'string') {
    const { href, ...anchorRest } = rest
    return (
      <motion.a
        href={href}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ x, y }}
        className={mergedClassName}
        {...anchorRest}
      >
        {children}
      </motion.a>
    )
  }

  const buttonRest = rest as Omit<NativeButtonProps, keyof BaseProps>
  return (
    <motion.button
      type={buttonRest.type ?? 'button'}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x, y }}
      className={mergedClassName}
      {...buttonRest}
    >
      {children}
    </motion.button>
  )
}
