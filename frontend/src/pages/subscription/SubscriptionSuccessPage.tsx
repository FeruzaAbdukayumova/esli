import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-surface-base grain px-4">
      <div className="max-w-md w-full text-center bg-white dark:bg-slate-800 rounded-2xl shadow-elevation-md border border-slate-100 dark:border-slate-700/50 p-8">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-100 mb-2">
          {t('subscription.successTitle')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {t('subscription.successMessage')}
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-6 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
        >
          {t('subscription.goToDashboard')}
        </Link>
      </div>
    </div>
  )
}
