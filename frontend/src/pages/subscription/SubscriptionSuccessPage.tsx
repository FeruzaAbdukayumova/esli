import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { subscriptionKeys } from '@/features/subscription/hooks'

export function SubscriptionSuccessPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: subscriptionKeys.info })
    queryClient.invalidateQueries({ queryKey: ['me'] })
  }, [queryClient])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="relative max-w-md w-full">
        <span className="tape bg-sun/80 -top-3 left-1/2 -translate-x-1/2 rotate-2" aria-hidden />
        <div className="sheet text-center p-6 sm:p-8">
          <div className="sticker mx-auto mb-5 flex h-16 w-16 items-center justify-center bg-mint -rotate-3">
            <Check className="h-8 w-8 text-ink" strokeWidth={3} aria-hidden />
          </div>
          <h1 className="font-display text-[1.75rem] leading-[1.1] text-fg mb-2 [text-wrap:balance]">
            {t('subscription.successTitle')}
          </h1>
          <p className="text-base text-muted mb-6">
            {t('subscription.successMessage')}
          </p>
          <Link to="/dashboard" className="btn-brand w-full min-h-[52px] px-5 text-base">
            {t('subscription.goToDashboard')}
          </Link>
        </div>
      </div>
    </div>
  )
}
