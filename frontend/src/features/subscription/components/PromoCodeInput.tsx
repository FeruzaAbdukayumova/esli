import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Gift, Loader2 } from 'lucide-react'
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
      <div className="flex items-center gap-2 mb-1">
        <Gift className="w-4 h-4 text-fg" aria-hidden />
        <span className="text-sm font-bold text-fg">
          {t('promo.title')}
        </span>
      </div>

      <p className="text-sm text-muted mb-3">
        {t('promo.description')}
      </p>

      {hasActivePromo && promoTier && promoExpiresAt && (
        <div className="rounded-[14px] border-2 border-ink bg-mint px-3 py-2.5 mb-3">
          <span className="text-sm font-semibold text-ink">
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
          className="field min-w-0 flex-1 !w-auto font-bold tracking-wide"
        />
        <button
          type="button"
          onClick={handleRedeem}
          disabled={!code.trim() || redeemMutation.isPending}
          className="btn-quiet shrink-0 min-h-[48px] px-4 text-sm"
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
