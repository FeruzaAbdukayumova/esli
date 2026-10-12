import { useState, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useCreatePromoCode } from '@/features/admin/promoAdminHooks'
import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'

interface CreatePromoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreatePromoModal({ isOpen, onClose }: CreatePromoModalProps) {
  const { t } = useTranslation()
  const createMutation = useCreatePromoCode()
  const [code, setCode] = useState('')
  const [tier, setTier] = useState<'pro' | 'premium'>('pro')
  const [durationDays, setDurationDays] = useState('30')
  const [maxRedemptions, setMaxRedemptions] = useState('-1')
  const [validFrom, setValidFrom] = useState('')
  const [validUntil, setValidUntil] = useState('')

  const handleClose = () => {
    onClose()
    setCode('')
    setTier('pro')
    setDurationDays('30')
    setMaxRedemptions('-1')
    setValidFrom('')
    setValidUntil('')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmedCode = code.trim().toUpperCase()
    if (!trimmedCode || trimmedCode.length < 3) return

    createMutation.mutate(
      {
        code: trimmedCode,
        tier,
        duration_days: Math.max(1, Math.min(365, parseInt(durationDays) || 30)),
        max_redemptions: parseInt(maxRedemptions) || -1,
        valid_from: validFrom ? new Date(validFrom).toISOString() : undefined,
        valid_until: validUntil ? new Date(validUntil).toISOString() : undefined,
      },
      { onSuccess: handleClose },
    )
  }

  const isPending = createMutation.isPending

  return (
    <Modal isOpen={isOpen} onClose={handleClose} labelledBy="create-promo-title" size="sm" locked={isPending}>
      <div className="mb-6 pr-10">
        <h2 id="create-promo-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          {t('admin.promo.createTitle')}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {t('admin.promo.createSubtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Code */}
        <div>
          <label htmlFor="promo-code" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {t('admin.promo.codeLabel')}
          </label>
          <input
            id="promo-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 50))}
            required
            minLength={3}
            maxLength={50}
            disabled={isPending}
            data-autofocus
            className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-colors duration-200 font-mono tracking-wider"
            placeholder={t('admin.promo.codePlaceholder')}
          />
        </div>

        {/* Tier */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {t('admin.promo.tierLabel')}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['pro', 'premium'] as const).map((t_tier) => (
              <button
                key={t_tier}
                type="button"
                onClick={() => setTier(t_tier)}
                disabled={isPending}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                  tier === t_tier
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
              >
                {t_tier.charAt(0).toUpperCase() + t_tier.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="promo-duration" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {t('admin.promo.durationLabel')}
          </label>
          <input
            id="promo-duration"
            type="number"
            min={1}
            max={365}
            value={durationDays}
            onChange={(e) => setDurationDays(e.target.value)}
            disabled={isPending}
            className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-colors duration-200"
          />
        </div>

        {/* Max Redemptions */}
        <div>
          <label htmlFor="promo-max" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {t('admin.promo.maxRedemptionsLabel')}
          </label>
          <input
            id="promo-max"
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
          <label htmlFor="promo-valid-from" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {t('admin.promo.validFromLabel')}
          </label>
          <input
            id="promo-valid-from"
            type="datetime-local"
            value={validFrom}
            onChange={(e) => setValidFrom(e.target.value)}
            disabled={isPending}
            className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-colors duration-200"
          />
        </div>

        {/* Valid Until */}
        <div>
          <label htmlFor="promo-valid-until" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {t('admin.promo.validUntilLabel')}
          </label>
          <input
            id="promo-valid-until"
            type="datetime-local"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
            disabled={isPending}
            className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-colors duration-200"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={handleClose} disabled={isPending}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" loading={isPending} disabled={isPending || code.trim().length < 3}>
            {isPending ? t('admin.promo.creating') : t('admin.promo.createCode')}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
