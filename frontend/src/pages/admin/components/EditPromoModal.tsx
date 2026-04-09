import { useState, useEffect, FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { useUpdatePromoCode } from '@/features/admin/promoAdminHooks'
import type { PromoCode } from '@/features/admin/promoAdminApi'

interface EditPromoModalProps {
  isOpen: boolean
  promo: PromoCode | null
  onClose: () => void
}

function toLocalInput(iso: string | null): string {
  if (!iso) return ''
  try {
    return new Date(iso).toISOString().slice(0, 16)
  } catch {
    return ''
  }
}

export function EditPromoModal({ isOpen, promo, onClose }: EditPromoModalProps) {
  const { t } = useTranslation()
  const updateMutation = useUpdatePromoCode()
  const [isActive, setIsActive] = useState(true)
  const [maxRedemptions, setMaxRedemptions] = useState('-1')
  const [validFrom, setValidFrom] = useState('')
  const [validUntil, setValidUntil] = useState('')
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (promo) {
      setIsActive(promo.is_active)
      setMaxRedemptions(String(promo.max_redemptions))
      setValidFrom(toLocalInput(promo.valid_from))
      setValidUntil(toLocalInput(promo.valid_until))
    }
  }, [promo])

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      onClose()
      setClosing(false)
    }, 300)
  }

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  if (!isOpen || !promo) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    updateMutation.mutate(
      {
        id: promo.id,
        data: {
          is_active: isActive,
          max_redemptions: parseInt(maxRedemptions) || -1,
          valid_from: validFrom ? new Date(validFrom).toISOString() : null,
          valid_until: validUntil ? new Date(validUntil).toISOString() : null,
        },
      },
      { onSuccess: handleClose },
    )
  }

  const isPending = updateMutation.isPending

  return createPortal(
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center min-h-screen p-4 bg-black/50 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-promo-title"
    >
      <div
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700/50 max-w-md w-full p-6 max-h-[90vh] overflow-y-auto transition-[transform,opacity] duration-300 ${closing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0 animate-slide-up'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 id="edit-promo-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
              {t('admin.promo.editTitle')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('admin.promo.editSubtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 shrink-0"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
        </div>

        {/* Read-only info */}
        <div className="mb-6 space-y-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">{t('admin.promo.code')}</span>
            <span className="font-mono font-medium text-slate-800 dark:text-slate-100">{promo.code}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">{t('admin.promo.tier')}</span>
            <span className="font-medium text-slate-800 dark:text-slate-100">{promo.tier.charAt(0).toUpperCase() + promo.tier.slice(1)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">{t('admin.promo.duration')}</span>
            <span className="font-medium text-slate-800 dark:text-slate-100">{t('admin.promo.durationDays', { count: promo.duration_days })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">{t('admin.promo.redemptions')}</span>
            <span className="font-medium text-slate-800 dark:text-slate-100">{promo.current_redemptions}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Active toggle */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t('admin.promo.status')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsActive(true)}
                disabled={isPending}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
              >
                {t('admin.promo.active')}
              </button>
              <button
                type="button"
                onClick={() => setIsActive(false)}
                disabled={isPending}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                  !isActive
                    ? 'border-slate-500 bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300'
                    : 'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
              >
                {t('admin.promo.inactive')}
              </button>
            </div>
          </div>

          {/* Max Redemptions */}
          <div>
            <label htmlFor="edit-promo-max" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t('admin.promo.maxRedemptionsLabel')}
            </label>
            <input
              id="edit-promo-max"
              type="number"
              min={-1}
              value={maxRedemptions}
              onChange={(e) => setMaxRedemptions(e.target.value)}
              disabled={isPending}
              className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-colors duration-200"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t('admin.promo.maxRedemptionsHelp')}</p>
          </div>

          {/* Valid From */}
          <div>
            <label htmlFor="edit-promo-valid-from" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t('admin.promo.validFromLabel')}
            </label>
            <input
              id="edit-promo-valid-from"
              type="datetime-local"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              disabled={isPending}
              className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-colors duration-200"
            />
          </div>

          {/* Valid Until */}
          <div>
            <label htmlFor="edit-promo-valid-until" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t('admin.promo.validUntilLabel')}
            </label>
            <input
              id="edit-promo-valid-until"
              type="datetime-local"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              disabled={isPending}
              className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-colors duration-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors duration-200 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              {isPending ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden />
                  {t('admin.promo.saving')}
                </>
              ) : (
                t('common.save')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}
