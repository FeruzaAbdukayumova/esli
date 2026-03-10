import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pencil, Trash2, ToggleLeft, ToggleRight, Ticket } from 'lucide-react'
import { usePromoCodes, useUpdatePromoCode } from '@/features/admin/promoAdminHooks'
import type { PromoCode } from '@/features/admin/promoAdminApi'
import { EditPromoModal } from './EditPromoModal'
import { DeletePromoModal } from './DeletePromoModal'

export function PromoCodesTable() {
  const { t } = useTranslation()
  const { data: promoCodes, isLoading } = usePromoCodes()
  const toggleMutation = useUpdatePromoCode()
  const [editPromo, setEditPromo] = useState<PromoCode | null>(null)
  const [deletePromo, setDeletePromo] = useState<PromoCode | null>(null)

  const formatDate = (iso: string | null) => {
    if (!iso) return t('admin.promo.notSet')
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const handleToggle = (promo: PromoCode) => {
    toggleMutation.mutate({ id: promo.id, data: { is_active: !promo.is_active } })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="inline-block w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!promoCodes || promoCodes.length === 0) {
    return (
      <div className="text-center py-12">
        <Ticket className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
        <p className="text-lg font-medium text-slate-600 dark:text-slate-400">{t('admin.promo.noCodesYet')}</p>
        <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">{t('admin.promo.noCodesDescription')}</p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-700/50">
              <th className="px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('admin.promo.code')}</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('admin.promo.tier')}</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('admin.promo.duration')}</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('admin.promo.redemptions')}</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">{t('admin.promo.validFrom')}</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">{t('admin.promo.validUntil')}</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('admin.promo.status')}</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('admin.promo.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {promoCodes.map((promo) => (
              <tr key={promo.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="px-4 py-3 text-sm font-mono font-medium text-slate-800 dark:text-slate-100 tracking-wider">
                  {promo.code}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                    promo.tier === 'premium'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                      : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  }`}>
                    {promo.tier.charAt(0).toUpperCase() + promo.tier.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                  {t('admin.promo.durationDays', { count: promo.duration_days })}
                </td>
                <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                  {promo.max_redemptions === -1
                    ? `${promo.current_redemptions} / ${t('admin.promo.unlimited')}`
                    : `${promo.current_redemptions} / ${promo.max_redemptions}`
                  }
                </td>
                <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 hidden md:table-cell">
                  {formatDate(promo.valid_from)}
                </td>
                <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 hidden md:table-cell">
                  {formatDate(promo.valid_until)}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                    promo.is_active
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-600 dark:text-slate-400'
                  }`}>
                    {promo.is_active ? t('admin.promo.active') : t('admin.promo.inactive')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setEditPromo(promo)}
                      className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                      title={t('admin.promo.editTitle')}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggle(promo)}
                      disabled={toggleMutation.isPending}
                      className={`min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg transition-all ${
                        promo.is_active
                          ? 'text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      title={promo.is_active ? t('admin.promo.inactive') : t('admin.promo.active')}
                    >
                      {promo.is_active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletePromo(promo)}
                      className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                      title={t('admin.promo.deleteTitle')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditPromoModal
        isOpen={!!editPromo}
        promo={editPromo}
        onClose={() => setEditPromo(null)}
      />
      <DeletePromoModal
        isOpen={!!deletePromo}
        promo={deletePromo}
        onClose={() => setDeletePromo(null)}
      />
    </>
  )
}
