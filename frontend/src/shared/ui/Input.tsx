import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react'
import { cn } from '@/shared/lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  error?: string | null
  /** show the valid (green) border state */
  valid?: boolean
  hint?: ReactNode
}

export const inputBase = 'field'

export const inputError = '!border-again'
export const inputValid = '!border-grass'
export const inputDefault = ''

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, valid, hint, className, id, ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`

  return (
    <div>
      {label != null && (
        <label htmlFor={inputId} className="block text-sm font-bold text-fg mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(error && errorId, hint != null && hintId) || undefined}
        className={cn(inputBase, error ? inputError : valid ? inputValid : inputDefault, className)}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm font-medium text-again">
          {error}
        </p>
      )}
      {!error && hint != null && (
        <p id={hintId} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
    </div>
  )
})
