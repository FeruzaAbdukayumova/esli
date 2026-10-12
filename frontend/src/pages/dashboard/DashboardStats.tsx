import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp, Target, Trophy, Brain, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { DashboardStats as DashboardStatsType } from '@/features/stats/types'
import { ReviewForecast } from './components/ReviewForecast'
import { DeckProgressBar } from './components/DeckProgressBar'

interface StatsProps {
  stats: DashboardStatsType
}

const DECK_PROGRESS_LIMIT = 3

/**
 * Right-column sidebar: review forecast, per-deck progress, and the
 * reference stats (retention, mastered, mastery, total). The hero
 * (MomentumPanel) keeps only the action-oriented numbers: due, streak, goal.
 */
export function StatsSidebar({ stats }: StatsProps) {
  const { t } = useTranslation()
  const [showAllDecks, setShowAllDecks] = useState(false)

  const composition = useMemo(() => {
    const acc = { mature: 0, learning: 0, knew: 0 }
    for (const d of stats.deckProgress) {
      acc.mature += d.matureCount
      acc.learning += d.learningCount
      acc.knew += d.newCount
    }
    const total = acc.mature + acc.learning + acc.knew || 1
    return {
      mature: (acc.mature / total) * 100,
      learning: (acc.learning / total) * 100,
      knew: (acc.knew / total) * 100,
      counts: acc,
    }
  }, [stats.deckProgress])

  const visibleDecks = showAllDecks
    ? stats.deckProgress
    : stats.deckProgress.slice(0, DECK_PROGRESS_LIMIT)
  const hasMore = stats.deckProgress.length > DECK_PROGRESS_LIMIT

  return (
    <div className="space-y-3">
      {/* Review forecast */}
      {stats.reviewForecast.length > 0 && (
        <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-600 p-3">
          <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">{t('stats.sevenDayForecast')}</h3>
          <ReviewForecast forecast={stats.reviewForecast} />
        </div>
      )}

      {/* Deck progress */}
      {stats.deckProgress.length > 0 && (
        <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-600 p-3">
          <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">{t('stats.deckProgress')}</h3>
          <div className="flex items-center gap-3 mb-2 text-[10px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-sm bg-emerald-500" />{t('profile.mature')}</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-sm bg-amber-400" />{t('profile.learning')}</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-sm bg-slate-300 dark:bg-slate-500" />{t('profile.new')}</span>
          </div>
          <div className="space-y-2">
            {visibleDecks.map((deck) => (
              <DeckProgressBar key={deck.deckId} deck={deck} />
            ))}
          </div>
          {hasMore && (
            <button
              type="button"
              onClick={() => setShowAllDecks(!showAllDecks)}
              className="mt-2 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center gap-1 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              {showAllDecks ? (
                <>{t('stats.showLess')} <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>{t('stats.showAll')} ({stats.deckProgress.length}) <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          )}
        </div>
      )}

      {/* Reference stats */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-600 p-3">
        <div className="grid grid-cols-2 gap-2">
          <StatTile icon={<Target className="h-4 w-4" aria-hidden />} label={t('momentum.retention', 'Retention')} value={`${stats.retentionPercent}%`} tint="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20" />
          <StatTile icon={<Trophy className="h-4 w-4" aria-hidden />} label={t('momentum.mastered', 'Mastered')} value={composition.counts.mature.toLocaleString()} tint="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20" />
          <StatTile icon={<Brain className="h-4 w-4" aria-hidden />} label={t('momentum.mastery', 'Mastery')} value={`${stats.masteryPercent}%`} tint="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20" />
          <StatTile icon={<Check className="h-4 w-4" aria-hidden />} label={t('momentum.totalCards', 'Total cards')} value={stats.totalCards.toLocaleString()} tint="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/40" />
        </div>
        {stats.totalCards > 0 && (
          <div className="mt-3">
            <div className="flex h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
              <div className="bg-emerald-500" style={{ width: `${composition.mature}%` }} />
              <div className="bg-amber-400" style={{ width: `${composition.learning}%` }} />
              <div className="bg-slate-300 dark:bg-slate-600" style={{ width: `${composition.knew}%` }} />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />{t('momentum.legendMastered', 'Mastered {{count}}', { count: composition.counts.mature })}</span>
              <span className="inline-flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-amber-400" />{t('momentum.legendLearning', 'Learning {{count}}', { count: composition.counts.learning })}</span>
              <span className="inline-flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" />{t('momentum.legendNew', 'New {{count}}', { count: composition.counts.knew })}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatTile({ icon, label, value, tint }: { icon: React.ReactNode; label: string; value: string; tint: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/30 p-2.5">
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${tint}`}>{icon}</span>
      <div className="min-w-0">
        <p className="text-sm font-bold leading-tight text-slate-800 dark:text-slate-100">{value}</p>
        <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  )
}
