import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Gift, Loader2, Sparkles } from 'lucide-react'
import { useRedeemPromo } from '../hooks'
import { useTier } from '../useTier'

interface PromoCodeInputProps {
  className?: string
}

export function PromoCodeInput({ className = '' }: PromoCodeInputProps) {
  const { t } = useTranslation()
  const { hasActivePromo, promoTier, promoExpiresAt } = useTier()
  const redeemMutation = useRedeemPromo()
  const [code, setCode] = useState('')

  const tierLabel = (tierValue: string) =>
    tierValue === 'premium'
      ? t('tier.premium', 'Premium')
      : tierValue === 'pro'
        ? t('tier.pro', 'Pro')
        : t('tier.free', 'Free')

  const handleRedeem = () => {
    if (!code.trim()) return
    redeemMutation.mutate(code.trim(), {
      onSuccess: (data) => {
        toast.success(
          t('promo.redeemSuccess', {
            tier: tierLabel(data.promo_tier),
            date: new Date(data.promo_expires_at).toLocaleDateString(),
          }),
        )
        setCode('')
      },
      onError: (err) => {
        const message =
          err instanceof Error
            ? err.message
            : t('promo.invalidCode')
        toast.error(message)
      },
    })
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-3">
        <Gift className="w-4 h-4 text-primary-500" />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {t('promo.title')}
        </span>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
        {t('promo.description')}
      </p>

      {hasActivePromo && promoTier && promoExpiresAt && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 mb-3">
          <Sparkles className="w-4 h-4 text-primary-500 shrink-0" />
          <span className="text-sm text-primary-700 dark:text-primary-300">
            {t('promo.activePromo', {
              tier: tierLabel(promoTier),
              date: new Date(promoExpiresAt).toLocaleDateString(),
            })}
          </span>
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && handleRedeem()}
          placeholder={t('promo.enterCode')}
          aria-label={t('promo.enterCode')}
          maxLength={50}
          className="flex-1 px-3 py-2 min-h-[40px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500 transition-colors"
        />
        <button
          type="button"
          onClick={handleRedeem}
          disabled={!code.trim() || redeemMutation.isPending}
          className="px-4 py-2 min-h-[40px] rounded-lg text-sm font-medium bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {redeemMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            t('promo.redeem')
          )}
        </button>
      </div>
    </div>
  )
}
