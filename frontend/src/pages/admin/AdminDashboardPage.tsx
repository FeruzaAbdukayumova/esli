import { useTranslation } from 'react-i18next'
import { Users, Layers, CreditCard, TrendingUp, MessageSquare, Activity } from 'lucide-react'
import { useAdminStats } from '@/features/admin/adminHooks'
import { usePageMeta } from '@/shared/lib/usePageMeta'

const STAT_COLORS: Record<string, { bg: string; text: string }> = {
  primary: { bg: 'bg-primary-100 dark:bg-primary-900/30', text: 'text-primary-600 dark:text-primary-400' },
  slate: { bg: 'bg-slate-100 dark:bg-slate-700/50', text: 'text-slate-600 dark:text-slate-400' },
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400' },
  amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400' },
  red: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400' },
}

export function AdminDashboardPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('admin.nav.overview', 'Admin Overview'), noIndex: true })
  const { data: stats, isLoading } = useAdminStats()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="inline-block w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const statCards = [
    { label: t('admin.overview.totalUsers'), value: stats?.total_users ?? 0, icon: Users, color: 'primary' },
    { label: t('admin.overview.totalDecks'), value: stats?.total_decks ?? 0, icon: Layers, color: 'slate' },
    { label: t('admin.overview.totalCards'), value: stats?.total_cards ?? 0, icon: CreditCard, color: 'emerald' },
    { label: t('admin.overview.totalReviews'), value: stats?.total_reviews ?? 0, icon: TrendingUp, color: 'amber' },
    { label: t('admin.overview.newUsersWeek'), value: stats?.new_users_this_week ?? 0, icon: Users, color: 'amber' },
    { label: t('admin.overview.newUsersMonth'), value: stats?.new_users_this_month ?? 0, icon: Users, color: 'emerald' },
    { label: t('admin.overview.activeSessions'), value: stats?.active_sessions_today ?? 0, icon: Activity, color: 'slate' },
    { label: t('admin.overview.openTickets'), value: stats?.open_support_tickets ?? 0, icon: MessageSquare, color: 'red' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {t('admin.overview.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {t('admin.overview.subtitle')}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon
          const colors = STAT_COLORS[card.color]
          return (
            <div
              key={card.label}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-elevation-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{card.label}</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {card.value.toLocaleString()}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${colors.bg}`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Users by tier */}
      {stats?.users_by_tier && Object.keys(stats.users_by_tier).length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
            {t('admin.overview.usersByTier')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(stats.users_by_tier).map(([tier, count]) => (
              <div
                key={tier}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50"
              >
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                  {tier}
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
