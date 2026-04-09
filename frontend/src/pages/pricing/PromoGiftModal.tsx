import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { X, Gift, Copy, Check, Sparkles, Crown, Loader2 } from 'lucide-react'
import { useRedeemPromo } from '@/features/subscription/hooks'
import toast from 'react-hot-toast'
const PROMO_CODES: Record<'pro' | 'premium', string> = {
  pro: 'FREEPRO',
  premium: 'FREEPREMIUM',
}

interface PromoGiftModalProps {
  isOpen: boolean
  tier: 'pro' | 'premium' | null
  onClose: () => void
}

export function PromoGiftModal({ isOpen, tier, onClose }: PromoGiftModalProps) {
  const { t } = useTranslation()
  const redeemMutation = useRedeemPromo()
  const [copied, setCopied] = useState(false)
  const [redeemed, setRedeemed] = useState(false)
  const [closing, setClosing] = useState(false)

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      onClose()
      setClosing(false)
      setCopied(false)
      setRedeemed(false)
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

  if (!isOpen || !tier) return null

  const code = PROMO_CODES[tier]
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1)
  const isPro = tier === 'pro'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy')
    }
  }

  const handleRedeem = () => {
    redeemMutation.mutate(code, {
      onSuccess: (data) => {
        setRedeemed(true)
        toast.success(
          t('promo.redeemSuccess', {
            tier: data.promo_tier.charAt(0).toUpperCase() + data.promo_tier.slice(1),
            date: new Date(data.promo_expires_at).toLocaleDateString(),
          }),
        )
      },
      onError: (err) => {
        const message = err instanceof Error ? err.message : t('promo.invalidCode')
        toast.error(message)
      },
    })
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center min-h-screen p-4 bg-black/50 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-gift-title"
    >
      <div
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700/50 max-w-md w-full p-6 transition-[transform,opacity] duration-300 ${closing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0 animate-slide-up'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={handleClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 shrink-0"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
        </div>

        {/* Icon + Header */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isPro ? 'bg-primary-100 dark:bg-primary-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
            <Gift className={`w-8 h-8 ${isPro ? 'text-primary-600 dark:text-primary-400' : 'text-amber-600 dark:text-amber-400'}`} />
          </div>
          <h2
            id="promo-gift-title"
            className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2"
          >
            {t('pricing.gift.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {t('pricing.gift.subtitle')}
          </p>
        </div>

        {/* Tier badge */}
        <div className={`flex items-center justify-center gap-2 mb-6 py-3 rounded-xl ${isPro ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800' : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'}`}>
          {isPro ? (
            <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          ) : (
            <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          )}
          <span className={`font-semibold ${isPro ? 'text-primary-700 dark:text-primary-300' : 'text-amber-700 dark:text-amber-300'}`}>
            {t('pricing.gift.tierAccess', { tier: tierLabel })}
          </span>
        </div>

        {redeemed ? (
          /* Success state */
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-3">
              <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
              {t('pricing.gift.activated')}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('pricing.gift.activatedDesc', { tier: tierLabel })}
            </p>
            <button
              type="button"
              onClick={handleClose}
              className={`mt-6 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors ${isPro ? 'bg-primary-600 hover:bg-primary-700' : 'bg-amber-500 hover:bg-amber-600'}`}
            >
              {t('common.done')}
            </button>
          </div>
        ) : (
          <>
            {/* Promo code display */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {t('pricing.gift.yourCode')}
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 font-mono text-lg font-bold text-slate-800 dark:text-slate-100 tracking-wider text-center select-all">
                  {code}
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label={t('pricing.gift.copy')}
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Info message */}
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 text-center">
              {t('pricing.gift.hint')}
            </p>

            {/* Redeem button */}
            <button
              type="button"
              onClick={handleRedeem}
              disabled={redeemMutation.isPending}
              className={`w-full px-4 py-3 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 ${isPro ? 'bg-primary-600 hover:bg-primary-700' : 'bg-amber-500 hover:bg-amber-600'}`}
            >
              {redeemMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('pricing.gift.activating')}
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4" />
                  {t('pricing.gift.redeemNow')}
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
