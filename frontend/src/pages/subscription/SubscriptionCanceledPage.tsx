import { Link } from 'react-router-dom'
import { XCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function SubscriptionCanceledPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-surface-base grain px-4">
      <div className="max-w-md w-full text-center bg-white dark:bg-slate-800 rounded-2xl shadow-elevation-md border border-slate-100 dark:border-slate-700/50 p-8">
        <XCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-100 mb-2">
          {t('subscription.canceledTitle')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {t('subscription.canceledMessage')}
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/pricing"
            className="px-6 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
          >
            {t('subscription.viewPlans')}
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
          >
            {t('subscription.goToDashboard')}
          </Link>
        </div>
      </div>
    </div>
  )
}
