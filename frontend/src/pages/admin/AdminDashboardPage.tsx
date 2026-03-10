import { useTranslation } from 'react-i18next'
import { Users, Layers, CreditCard, TrendingUp, MessageSquare, Activity } from 'lucide-react'
import { useAdminStats } from '@/features/admin/adminHooks'
import { usePageMeta } from '@/shared/lib/usePageMeta'

const STAT_COLORS: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
  indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
  pink: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-600 dark:text-pink-400' },
  green: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
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
    { label: t('admin.overview.totalUsers'), value: stats?.total_users ?? 0, icon: Users, color: 'blue' },
    { label: t('admin.overview.totalDecks'), value: stats?.total_decks ?? 0, icon: Layers, color: 'indigo' },
    { label: t('admin.overview.totalCards'), value: stats?.total_cards ?? 0, icon: CreditCard, color: 'purple' },
    { label: t('admin.overview.totalReviews'), value: stats?.total_reviews ?? 0, icon: TrendingUp, color: 'pink' },
    { label: t('admin.overview.newUsersWeek'), value: stats?.new_users_this_week ?? 0, icon: Users, color: 'green' },
    { label: t('admin.overview.newUsersMonth'), value: stats?.new_users_this_month ?? 0, icon: Users, color: 'emerald' },
    { label: t('admin.overview.activeSessions'), value: stats?.active_sessions_today ?? 0, icon: Activity, color: 'amber' },
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
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
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
