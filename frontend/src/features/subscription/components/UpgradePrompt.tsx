import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface UpgradePromptProps {
  feature: string
  currentLimit?: string
  className?: string
}

export function UpgradePrompt({ feature, currentLimit, className = '' }: UpgradePromptProps) {
  const { t } = useTranslation()

  return (
    <div className={`rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
            {t('subscription.upgradeRequired')}
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
            {currentLimit
              ? t('subscription.limitReachedWithDetail', { feature, limit: currentLimit })
              : t('subscription.limitReached', { feature })
            }
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 underline rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {t('subscription.viewPlans')}
          </Link>
        </div>
      </div>
    </div>
  )
}
