import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface UpgradePromptProps {
  feature: string
  currentLimit?: string
  className?: string
}

export function UpgradePrompt({ feature, currentLimit, className = '' }: UpgradePromptProps) {
  const { t } = useTranslation()

  return (
    <div className={`rounded-[18px] border-[2.5px] border-ink bg-sun p-4 text-ink shadow-sticker-sm ${className}`}>
      <p className="text-sm font-extrabold">
        {t('subscription.upgradeRequired')}
      </p>
      <p className="text-sm font-medium text-ink/80 mt-1">
        {currentLimit
          ? t('subscription.limitReachedWithDetail', { feature, limit: currentLimit })
          : t('subscription.limitReached', { feature })
        }
      </p>
      <Link
        to="/pricing"
        className="inline-flex items-center gap-1 mt-2 text-sm font-bold text-ink underline decoration-2 underline-offset-4 hover:decoration-ink/50 active:opacity-70 transition-opacity duration-150 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        {t('subscription.viewPlans')}
      </Link>
    </div>
  )
}
