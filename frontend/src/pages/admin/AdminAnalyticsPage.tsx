import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Users,
  BookOpen,
  Layers,
  CreditCard,
  MousePointerClick,
  Loader2,
  TrendingUp,
  Activity,
  Eye,
} from 'lucide-react'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import {
  useUserGrowth,
  useStudyEngagement,
  useContentMetrics,
  useSubscriptions,
  useCustomEvents,
} from '@/features/admin/analyticsHooks'
import { TimeRangeSelector } from './components/charts/TimeRangeSelector'
import { TimeSeriesChart } from './components/charts/TimeSeriesChart'
import { SimpleBarChart } from './components/charts/SimpleBarChart'
import { DistributionChart } from './components/charts/DistributionChart'

type Tab = 'userGrowth' | 'studyEngagement' | 'contentMetrics' | 'subscriptions' | 'customEvents'

const TABS: { id: Tab; icon: typeof Users; labelKey: string }[] = [
  { id: 'userGrowth', icon: Users, labelKey: 'admin.analytics.tab.userGrowth' },
  { id: 'studyEngagement', icon: BookOpen, labelKey: 'admin.analytics.tab.studyEngagement' },
  { id: 'contentMetrics', icon: Layers, labelKey: 'admin.analytics.tab.contentMetrics' },
  { id: 'subscriptions', icon: CreditCard, labelKey: 'admin.analytics.tab.subscriptions' },
  { id: 'customEvents', icon: MousePointerClick, labelKey: 'admin.analytics.tab.customEvents' },
]

const RESPONSE_COLORS: Record<string, string> = {
  again: '#ef4444',
  hard: '#f59e0b',
  good: '#10b981',
  easy: '#6366f1',
}

const TIER_COLORS: Record<string, string> = {
  free: '#94a3b8',
  pro: '#6366f1',
  premium: '#f59e0b',
}

function StatCard({ label, value, icon: Icon, color = 'text-primary-600 dark:text-primary-400' }: {
  label: string
  value: string | number
  icon: typeof Users
  color?: string
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        </div>
      </div>
    </div>
  )
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">{title}</h3>
      {children}
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
    </div>
  )
}

export function AdminAnalyticsPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('admin.analytics.title', 'Analytics'), noIndex: true })

  const [activeTab, setActiveTab] = useState<Tab>('userGrowth')
  const [range, setRange] = useState('30d')
  const [granularity, setGranularity] = useState('day')

  const userGrowth = useUserGrowth(range, granularity)
  const studyEngagement = useStudyEngagement(range, granularity)
  const contentMetrics = useContentMetrics(range, granularity)
  const subscriptions = useSubscriptions(range)
  const customEvents = useCustomEvents(range)

  // Merge signups + active users into one dataset for the chart
  const userGrowthChartData = useMemo(() => {
    if (!userGrowth.data) return []
    const map = new Map<string, { date: string; signups: number; active: number }>()
    for (const p of userGrowth.data.signups) {
      map.set(p.date, { date: p.date, signups: p.value, active: 0 })
    }
    for (const p of userGrowth.data.active_users) {
      const existing = map.get(p.date)
      if (existing) existing.active = p.value
      else map.set(p.date, { date: p.date, signups: 0, active: p.value })
    }
    return [...map.values()].sort((a, b) => a.date.localeCompare(b.date))
  }, [userGrowth.data])

  // App opens + unique visitors chart data
  const visitorChartData = useMemo(() => {
    if (!userGrowth.data) return []
    const map = new Map<string, { date: string; app_opens: number; unique_visitors: number }>()
    for (const p of userGrowth.data.app_opens) {
      map.set(p.date, { date: p.date, app_opens: p.value, unique_visitors: 0 })
    }
    for (const p of userGrowth.data.unique_visitors) {
      const existing = map.get(p.date)
      if (existing) existing.unique_visitors = p.value
      else map.set(p.date, { date: p.date, app_opens: 0, unique_visitors: p.value })
    }
    return [...map.values()].sort((a, b) => a.date.localeCompare(b.date))
  }, [userGrowth.data])

  // Peak hours bar data
  const peakHoursData = useMemo(() => {
    if (!studyEngagement.data) return []
    return studyEngagement.data.peak_hours.map((count, hour) => ({
      name: `${hour}:00`,
      value: count,
    }))
  }, [studyEngagement.data])

  // Response distribution pie data
  const responseDistData = useMemo(() => {
    if (!studyEngagement.data) return []
    return Object.entries(studyEngagement.data.response_distribution).map(([name, value]) => ({
      name: t(`admin.analytics.study.${name}`, name),
      value,
      color: RESPONSE_COLORS[name] || '#94a3b8',
    }))
  }, [studyEngagement.data, t])

  // Content charts merged
  const contentChartData = useMemo(() => {
    if (!contentMetrics.data) return []
    const map = new Map<string, { date: string; decks: number; cards: number }>()
    for (const p of contentMetrics.data.decks_over_time) {
      map.set(p.date, { date: p.date, decks: p.value, cards: 0 })
    }
    for (const p of contentMetrics.data.cards_over_time) {
      const existing = map.get(p.date)
      if (existing) existing.cards = p.value
      else map.set(p.date, { date: p.date, decks: 0, cards: p.value })
    }
    return [...map.values()].sort((a, b) => a.date.localeCompare(b.date))
  }, [contentMetrics.data])

  // Tier distribution pie data
  const tierDistData = useMemo(() => {
    if (!subscriptions.data) return []
    return Object.entries(subscriptions.data.users_by_tier).map(([tier, count]) => ({
      name: t(`admin.analytics.subs.${tier}`, tier),
      value: count,
      color: TIER_COLORS[tier] || '#94a3b8',
    }))
  }, [subscriptions.data, t])

  // Category breakdown bar data
  const categoryData = useMemo(() => {
    if (!contentMetrics.data) return []
    return Object.entries(contentMetrics.data.category_breakdown)
      .slice(0, 10)
      .map(([name, value]) => ({ name, value }))
  }, [contentMetrics.data])

  // Custom events grouped
  const customEventsGrouped = useMemo(() => {
    if (!customEvents.data) return { deckMethods: [], cardMethods: [], other: [] as { name: string; value: number }[] }
    const deckMethods: { name: string; value: number }[] = []
    const cardMethods: { name: string; value: number }[] = []
    const other: { name: string; value: number }[] = []

    for (const [key, count] of Object.entries(customEvents.data.events)) {
      if (key.startsWith('deck.create.')) {
        const method = key.replace('deck.create.', '')
        deckMethods.push({ name: t(`admin.analytics.events.method.${method}`, method), value: count })
      } else if (key.startsWith('card.add.')) {
        const method = key.replace('card.add.', '')
        cardMethods.push({ name: t(`admin.analytics.events.method.${method}`, method), value: count })
      } else {
        other.push({ name: key, value: count })
      }
    }
    return { deckMethods, cardMethods, other }
  }, [customEvents.data, t])

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          {t('admin.analytics.title', 'Platform Analytics')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('admin.analytics.subtitle', 'Track user activity, engagement, and growth metrics')}
        </p>
      </div>

      {/* Time range selector */}
      <div className="mb-6">
        <TimeRangeSelector
          range={range}
          granularity={granularity}
          onRangeChange={setRange}
          onGranularityChange={setGranularity}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{t(tab.labelKey)}</span>
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      {activeTab === 'userGrowth' && (
        userGrowth.isLoading ? <LoadingState /> : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label={t('admin.analytics.userGrowth.totalUsers', 'Total Users')}
                value={userGrowth.data?.total_users ?? 0}
                icon={Users}
              />
              <StatCard
                label={t('admin.analytics.userGrowth.appOpens', 'App Opens')}
                value={userGrowth.data?.app_opens.reduce((s, p) => s + p.value, 0) ?? 0}
                icon={Eye}
                color="text-amber-600 dark:text-amber-400"
              />
              <StatCard
                label={t('admin.analytics.userGrowth.uniqueVisitors', 'Unique Visitors')}
                value={userGrowth.data?.unique_visitors.reduce((s, p) => s + p.value, 0) ?? 0}
                icon={Activity}
                color="text-violet-600 dark:text-violet-400"
              />
              <StatCard
                label={t('admin.analytics.userGrowth.retentionRate', 'Retention Rate')}
                value={`${userGrowth.data?.retention_rate ?? 0}%`}
                icon={TrendingUp}
                color="text-emerald-600 dark:text-emerald-400"
              />
            </div>
            <ChartCard title={t('admin.analytics.userGrowth.visitors', 'App Opens & Unique Visitors')}>
              <TimeSeriesChart
                data={visitorChartData}
                series={[
                  { dataKey: 'app_opens', name: t('admin.analytics.userGrowth.appOpens', 'App Opens'), color: '#f59e0b' },
                  { dataKey: 'unique_visitors', name: t('admin.analytics.userGrowth.uniqueVisitors', 'Unique Visitors'), color: '#8b5cf6' },
                ]}
              />
            </ChartCard>
            <ChartCard title={t('admin.analytics.userGrowth.signups', 'Signups & Active Users')}>
              <TimeSeriesChart
                data={userGrowthChartData}
                series={[
                  { dataKey: 'signups', name: t('admin.analytics.userGrowth.signups', 'Signups'), color: '#6366f1' },
                  { dataKey: 'active', name: t('admin.analytics.userGrowth.activeUsers', 'Active Users'), color: '#10b981' },
                ]}
              />
            </ChartCard>
          </div>
        )
      )}

      {activeTab === 'studyEngagement' && (
        studyEngagement.isLoading ? <LoadingState /> : (
          <div className="space-y-6">
            <ChartCard title={t('admin.analytics.study.reviewsOverTime', 'Reviews Over Time')}>
              <TimeSeriesChart
                data={(studyEngagement.data?.reviews_over_time ?? []).map((p) => ({ date: p.date, reviews: p.value }))}
                series={[{ dataKey: 'reviews', name: t('admin.analytics.study.reviewsOverTime', 'Reviews'), color: '#6366f1' }]}
              />
            </ChartCard>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title={t('admin.analytics.study.responseDistribution', 'Response Distribution')}>
                <DistributionChart data={responseDistData} />
              </ChartCard>
              <ChartCard title={t('admin.analytics.study.peakHours', 'Peak Study Hours')}>
                <SimpleBarChart data={peakHoursData} color="#8b5cf6" />
              </ChartCard>
            </div>
          </div>
        )
      )}

      {activeTab === 'contentMetrics' && (
        contentMetrics.isLoading ? <LoadingState /> : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                label={t('admin.analytics.content.sharedDecks', 'Shared Decks')}
                value={contentMetrics.data?.shared_vs_private.shared ?? 0}
                icon={Layers}
                color="text-emerald-600 dark:text-emerald-400"
              />
              <StatCard
                label={t('admin.analytics.content.privateDecks', 'Private Decks')}
                value={contentMetrics.data?.shared_vs_private.private ?? 0}
                icon={Layers}
              />
            </div>
            <ChartCard title={t('admin.analytics.content.decksCreated', 'Decks & Cards Created')}>
              <TimeSeriesChart
                data={contentChartData}
                series={[
                  { dataKey: 'decks', name: t('admin.analytics.content.decksCreated', 'Decks'), color: '#6366f1' },
                  { dataKey: 'cards', name: t('admin.analytics.content.cardsCreated', 'Cards'), color: '#f59e0b' },
                ]}
              />
            </ChartCard>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title={t('admin.analytics.content.categoryBreakdown', 'Category Breakdown')}>
                <SimpleBarChart data={categoryData} color="#10b981" />
              </ChartCard>
              <ChartCard title={t('admin.analytics.content.popularDecks', 'Popular Decks')}>
                {(contentMetrics.data?.popular_decks ?? []).length === 0 ? (
                  <p className="text-sm text-slate-400 dark:text-slate-500 py-8 text-center">
                    {t('admin.analytics.noData', 'No data available')}
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-2 font-medium text-slate-600 dark:text-slate-400">{t('admin.analytics.content.deckTitle', 'Deck')}</th>
                          <th className="text-right py-2 font-medium text-slate-600 dark:text-slate-400">{t('admin.analytics.content.copies', 'Copies')}</th>
                          <th className="text-right py-2 font-medium text-slate-600 dark:text-slate-400">{t('admin.analytics.content.owner', 'Owner')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(contentMetrics.data?.popular_decks ?? []).map((d, i) => (
                          <tr key={i} className="border-b border-slate-100 dark:border-slate-700/50">
                            <td className="py-2 text-slate-800 dark:text-slate-200 truncate max-w-[200px]">{d.title}</td>
                            <td className="py-2 text-right text-slate-600 dark:text-slate-400">{d.copy_count}</td>
                            <td className="py-2 text-right text-slate-500 dark:text-slate-400 truncate max-w-[120px]">{d.owner}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </ChartCard>
            </div>
          </div>
        )
      )}

      {activeTab === 'subscriptions' && (
        subscriptions.isLoading ? <LoadingState /> : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title={t('admin.analytics.subs.tierDistribution', 'Tier Distribution')}>
                <DistributionChart data={tierDistData} />
              </ChartCard>
              <ChartCard title={t('admin.analytics.subs.promoUsage', 'Promo Code Usage')}>
                {(subscriptions.data?.promo_usage ?? []).length === 0 ? (
                  <p className="text-sm text-slate-400 dark:text-slate-500 py-8 text-center">
                    {t('admin.analytics.noData', 'No data available')}
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-2 font-medium text-slate-600 dark:text-slate-400">Code</th>
                          <th className="text-left py-2 font-medium text-slate-600 dark:text-slate-400">Tier</th>
                          <th className="text-right py-2 font-medium text-slate-600 dark:text-slate-400">Redemptions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(subscriptions.data?.promo_usage ?? []).map((p, i) => (
                          <tr key={i} className="border-b border-slate-100 dark:border-slate-700/50">
                            <td className="py-2 font-mono text-slate-800 dark:text-slate-200">{p.code}</td>
                            <td className="py-2">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                                p.tier === 'premium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                              }`}>
                                {p.tier}
                              </span>
                            </td>
                            <td className="py-2 text-right text-slate-600 dark:text-slate-400">{p.redemptions}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </ChartCard>
            </div>
          </div>
        )
      )}

      {activeTab === 'customEvents' && (
        customEvents.isLoading ? <LoadingState /> : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title={t('admin.analytics.events.deckCreation', 'Deck Creation Methods')}>
                <SimpleBarChart data={customEventsGrouped.deckMethods} color="#6366f1" height={250} />
              </ChartCard>
              <ChartCard title={t('admin.analytics.events.cardAddition', 'Card Addition Methods')}>
                <SimpleBarChart data={customEventsGrouped.cardMethods} color="#10b981" height={250} />
              </ChartCard>
            </div>

            {/* Other events summary */}
            {customEventsGrouped.other.length > 0 && (
              <ChartCard title={t('admin.analytics.events.otherEvents', 'Other Events')}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {customEventsGrouped.other.map((evt) => (
                    <div key={evt.name} className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{evt.value}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{evt.name}</p>
                    </div>
                  ))}
                </div>
              </ChartCard>
            )}
          </div>
        )
      )}
    </div>
  )
}
