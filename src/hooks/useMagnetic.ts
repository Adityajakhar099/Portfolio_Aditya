import { type RefObject, useCallback, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export interface MagneticOffset {
  x: number
  y: number
}

/**
 * Computes subtle magnetic pull coordinates for interactive buttons and links.
 */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  strength = 0.25,
) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [offset, setOffset] = useState<MagneticOffset>({ x: 0, y: 0 })

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (prefersReducedMotion || !ref.current) return
      const bounds = ref.current.getBoundingClientRect()
      const centerX = bounds.left + bounds.width / 2
      const centerY = bounds.top + bounds.height / 2
      setOffset({
        x: (event.clientX - centerX) * strength,
        y: (event.clientY - centerY) * strength,
      })
    },
    [prefersReducedMotion, ref, strength],
  )

  const handlePointerLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 })
  }, [])

  return { offset, handlePointerMove, handlePointerLeave }
}
