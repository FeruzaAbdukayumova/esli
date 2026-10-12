import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button'

export const NotFoundPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-slate-50 dark:bg-surface-base grain">
      <p className="text-7xl font-display font-bold tracking-tight text-primary-600 dark:text-primary-400 mb-4">404</p>
      <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
        {t('common.pageNotFound')}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-6 max-w-sm">
        {t('common.pageNotFoundMessage')}
      </p>
      <Button size="lg" onClick={() => navigate('/dashboard')}>
        {t('notFound.backHome', 'Back to home')}
      </Button>
    </div>
  )
}
