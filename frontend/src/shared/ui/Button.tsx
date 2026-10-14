import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
import { cn } from '@/shared/lib/cn'
import { Spinner } from './Spinner'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}

// Sticker buttons (DESIGN.md). primary = the one sun action per screen.
const variants: Record<Variant, string> = {
  primary: 'btn-brand',
  secondary: 'btn-quiet',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
}

const sizes: Record<Size, string> = {
  sm: 'min-h-[38px] px-3.5 text-sm',
  md: 'min-h-[46px] px-5 text-[15px]',
  lg: 'min-h-[52px] px-7 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant = 'primary', size = 'md', loading = false, fullWidth = false, className, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={props.type ?? 'button'}
      disabled={disabled || loading}
      className={cn(variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...props}
    >
      {loading && <Spinner size="sm" className="text-current" />}
      {children}
    </button>
  )
})
