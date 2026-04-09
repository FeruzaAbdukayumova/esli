import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Shield } from 'lucide-react'
import { PromoCodesTable } from './components/PromoCodesTable'
import { CreatePromoModal } from './components/CreatePromoModal'
import { usePageMeta } from '@/shared/lib/usePageMeta'

export function AdminPromoPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('admin.nav.promo', 'Promo Codes'), noIndex: true })
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {t('admin.promo.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {t('admin.promo.subtitle')}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {t('admin.promo.codesTitle', t('admin.promo.title'))}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 shrink-0"
          >
            <Plus className="w-4 h-4" />
            {t('admin.promo.createCode')}
          </button>
        </div>

        <PromoCodesTable />
      </div>

      <CreatePromoModal isOpen={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  )
}
