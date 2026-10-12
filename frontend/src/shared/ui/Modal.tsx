import { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/cn'

type Size = 'sm' | 'md' | 'lg' | 'xl'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  /** id of the element labelling the dialog (falls back to `title`) */
  labelledBy?: string
  title?: ReactNode
  size?: Size
  /** raise above default for stacked dialogs (e.g. confirm over modal) */
  zIndex?: number
  /** hide the top-right close button */
  hideClose?: boolean
  /** disable closing via backdrop / Escape (e.g. while a mutation runs) */
  locked?: boolean
  className?: string
}

const sizeClasses: Record<Size, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Shared dialog shell: portal, blurred backdrop, slide-up entry, Escape +
 * backdrop close, focus trap, focus restore. All app dialogs should use this.
 */
export function Modal({
  isOpen,
  onClose,
  children,
  labelledBy,
  title,
  size = 'md',
  zIndex = 1000,
  hideClose = false,
  locked = false,
  className,
}: ModalProps) {
  const { t } = useTranslation()
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    previouslyFocused.current = document.activeElement as HTMLElement | null

    const timer = setTimeout(() => {
      const panel = panelRef.current
      if (!panel) return
      const first = panel.querySelector<HTMLElement>('[data-autofocus]') ?? panel.querySelector<HTMLElement>(FOCUSABLE)
      ;(first ?? panel).focus()
    }, 50)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !locked) {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'Tab') {
        const panel = panelRef.current
        if (!panel) return
        const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => el.offsetParent !== null,
        )
        if (focusables.length === 0) {
          e.preventDefault()
          return
        }
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement as HTMLElement | null
        if (e.shiftKey && (active === first || !panel.contains(active))) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && (active === last || !panel.contains(active))) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKeyDown)
      previouslyFocused.current?.focus?.()
    }
  }, [isOpen, onClose, locked])

  if (!isOpen) return null

  const headingId = labelledBy ?? (title ? 'modal-title' : undefined)

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 dark:bg-black/60 backdrop-blur-sm"
      style={{ zIndex }}
      onClick={locked ? undefined : onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          'relative w-full bg-white dark:bg-slate-800 rounded-2xl shadow-elevation-lg',
          'border border-slate-100 dark:border-slate-700/50 p-6 animate-slide-up',
          'max-h-[calc(100vh-2rem)] overflow-y-auto focus:outline-none',
          sizeClasses[size],
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title != null && (
          <h2 id={headingId} className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 pr-10">
            {title}
          </h2>
        )}
        {!hideClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={locked}
            aria-label={t('common.close')}
            className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50"
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  )
}
