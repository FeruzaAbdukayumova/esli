import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

interface DeleteDeckModalProps {
  isOpen: boolean
  isPending: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteDeckModal({ isOpen, isPending, onClose, onConfirm }: DeleteDeckModalProps) {
  const { t } = useTranslation()
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => cancelRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[1001] flex items-center justify-center p-4 bg-black/50 dark:bg-black/60 backdrop-blur-sm transition-colors duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-deck-title"
      aria-describedby="delete-deck-desc"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-elevation-md border border-slate-100 dark:border-slate-700/50 max-w-md w-full p-6 transition-colors duration-200 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="delete-deck-title" className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t('deck.deleteDeckConfirm')}</h2>
        <p id="delete-deck-desc" className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          {t('deck.deleteDeckWarning')}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-offset-slate-800"
            aria-label={t('deck.cancelAndKeep')}
          >
            {t('common.cancel')}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            aria-label={t('deck.deletePermanently')}
          >
            {isPending ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden />
                {t('deck.deleting')}
              </>
            ) : (
              t('common.delete')
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
