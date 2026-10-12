import { useState, useEffect, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdatePromoCode } from '@/features/admin/promoAdminHooks'
import type { PromoCode } from '@/features/admin/promoAdminApi'
import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'

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

  useEffect(() => {
    if (promo) {
      setIsActive(promo.is_active)
      setMaxRedemptions(String(promo.max_redemptions))
      setValidFrom(toLocalInput(promo.valid_from))
      setValidUntil(toLocalInput(promo.valid_until))
    }
  }, [promo])

  if (!promo) return null

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
      { onSuccess: onClose },
    )
  }

  const isPending = updateMutation.isPending

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="edit-promo-title" size="sm" locked={isPending}>
      <div className="mb-6 pr-10">
        <h2 id="edit-promo-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          {t('admin.promo.editTitle')}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {t('admin.promo.editSubtitle')}
        </p>
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
          <Button variant="secondary" onClick={onClose} disabled={isPending}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" loading={isPending}>
            {isPending ? t('admin.promo.saving') : t('common.save')}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
