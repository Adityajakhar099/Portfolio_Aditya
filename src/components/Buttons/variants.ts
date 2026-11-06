import { cva, type VariantProps } from 'class-variance-authority'

/**
 * CVA button recipe aligned with design-system.md tokens.
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2.5 rounded-full font-body font-semibold uppercase tracking-[0.1em] cursor-pointer select-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'btn-editorial-primary',
        outline: 'btn-editorial-outline',
        ghost:
          'min-h-11 px-3 py-2 text-xs text-text-muted hover:text-text-primary transition-editorial',
      },
      size: {
        sm: 'min-h-10 px-4 py-2 text-[0.75rem]',
        md: 'min-h-11 px-6 py-3 text-[0.8125rem]',
        lg: 'min-h-12 px-7 py-3.5 text-[0.84375rem]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
