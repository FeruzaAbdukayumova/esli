import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { useDeletePromoCode } from '@/features/admin/promoAdminHooks'
import type { PromoCode } from '@/features/admin/promoAdminApi'

interface DeletePromoModalProps {
  isOpen: boolean
  promo: PromoCode | null
  onClose: () => void
}

export function DeletePromoModal({ isOpen, promo, onClose }: DeletePromoModalProps) {
  const { t } = useTranslation()
  const deleteMutation = useDeletePromoCode()
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

  if (!isOpen || !promo) return null

  const handleConfirm = () => {
    deleteMutation.mutate(promo.id, { onSuccess: onClose })
  }

  const isPending = deleteMutation.isPending

  return createPortal(
    <div
      className="fixed inset-0 z-[1001] flex items-center justify-center p-4 bg-black/50 dark:bg-black/60 backdrop-blur-sm transition-colors duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-promo-title"
      aria-describedby="delete-promo-desc"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700/50 max-w-md w-full p-6 transition-colors duration-200 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="delete-promo-title" className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          {t('admin.promo.deleteTitle')}
        </h2>
        <p id="delete-promo-desc" className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          {t('admin.promo.deleteWarning', { code: promo.code })}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-offset-slate-800"
          >
            {t('common.cancel')}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            {isPending ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden />
                {t('admin.promo.deleting')}
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
