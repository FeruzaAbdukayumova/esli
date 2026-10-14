import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function SubscriptionCanceledPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="sheet max-w-md w-full text-center p-6 sm:p-8">
        <div className="sticker mx-auto mb-5 flex h-16 w-16 items-center justify-center bg-white rotate-3">
          <X className="h-8 w-8 text-ink" strokeWidth={3} aria-hidden />
        </div>
        <h1 className="font-display text-[1.75rem] leading-[1.1] text-fg mb-2 [text-wrap:balance]">
          {t('subscription.canceledTitle')}
        </h1>
        <p className="text-base text-muted mb-6">
          {t('subscription.canceledMessage')}
        </p>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <Link to="/dashboard" className="btn-quiet min-h-[48px] px-5 text-[15px]">
            {t('subscription.goToDashboard')}
          </Link>
          <Link to="/pricing" className="btn-brand min-h-[48px] px-5 text-[15px]">
            {t('subscription.viewPlans')}
          </Link>
        </div>
      </div>
    </div>
  )
}
