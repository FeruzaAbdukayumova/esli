import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button'
import { Plant } from '@/pages/dashboard/components/WordGarden'

export const NotFoundPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="sheet w-full max-w-md p-6 sm:p-8 text-center">
        <div className="sticker mx-auto mb-5 flex w-fit items-end gap-1 bg-mint px-5 pt-3 -rotate-2">
          <span className="font-display text-5xl leading-none text-ink pb-4">404</span>
          <Plant stage={1} mood="thirsty" className="h-24 w-20" />
        </div>
        <h1 className="font-display text-[1.75rem] leading-[1.1] text-fg mb-2 [text-wrap:balance]">
          {t('common.pageNotFound')}
        </h1>
        <p className="text-base text-muted mb-6 mx-auto max-w-sm">
          {t('common.pageNotFoundMessage')}
        </p>
        <Button size="lg" fullWidth onClick={() => navigate('/dashboard')}>
          {t('notFound.backHome', 'Back to home')}
        </Button>
      </div>
    </div>
  )
}
