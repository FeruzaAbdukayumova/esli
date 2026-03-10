import { useState, useEffect, useRef, FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { useCreatePromoCode } from '@/features/admin/promoAdminHooks'

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
  const [closing, setClosing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      onClose()
      setClosing(false)
      setCode('')
      setTier('pro')
      setDurationDays('30')
      setMaxRedemptions('-1')
      setValidFrom('')
      setValidUntil('')
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

  useEffect(() => {
    if (isOpen && !closing) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen, closing])

  if (!isOpen) return null

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

  return createPortal(
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center min-h-screen p-4 bg-black/50 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-promo-title"
    >
      <div
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700/50 max-w-md w-full p-6 max-h-[90vh] overflow-y-auto transition-all duration-300 ${closing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0 animate-slide-up'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 id="create-promo-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
              {t('admin.promo.createTitle')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('admin.promo.createSubtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 shrink-0"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Code */}
          <div>
            <label htmlFor="promo-code" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t('admin.promo.codeLabel')}
            </label>
            <input
              ref={inputRef}
              id="promo-code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 50))}
              required
              minLength={3}
              maxLength={50}
              disabled={isPending}
              className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-all duration-200 font-mono tracking-wider"
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
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium ${
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
              className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-all duration-200"
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
              className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-all duration-200"
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
              className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-all duration-200"
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
              className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-all duration-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all duration-200 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              disabled={isPending || code.trim().length < 3}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              {isPending ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden />
                  {t('admin.promo.creating')}
                </>
              ) : (
                t('admin.promo.createCode')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}
