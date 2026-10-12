import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react'
import { cn } from '@/shared/lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  error?: string | null
  /** show the valid (green) border state */
  valid?: boolean
  hint?: ReactNode
}

export const inputBase =
  'w-full px-4 py-2.5 min-h-[44px] rounded-lg border bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:shadow-focus-primary dark:focus:shadow-focus-primary-dark disabled:opacity-60 disabled:cursor-not-allowed hover:border-slate-400 dark:hover:border-slate-500'

export const inputError = 'border-red-500 dark:border-red-400'
export const inputValid = 'border-green-500 dark:border-green-400'
export const inputDefault = 'border-slate-300 dark:border-slate-600'

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
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
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
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      {!error && hint != null && (
        <p id={hintId} className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      )}
    </div>
  )
})
