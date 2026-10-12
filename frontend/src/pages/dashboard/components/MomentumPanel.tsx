import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Flame, Play, Check, TrendingUp, TrendingDown } from 'lucide-react'
import type { DashboardStats } from '@/features/stats/types'

/**
 * Momentum — the dashboard centerpiece.
 * A data-driven "you're improving" panel: today's goal ring, study streak,
 * the study CTA, and a GitHub-style activity heatmap with a week-over-week
 * trend. Reference stats live in the sidebar (StatsSidebar). All real data.
 */
export function MomentumPanel({ stats }: { stats: DashboardStats }) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const doneToday = stats.cardsReviewedToday
  const dueLeft = stats.cardsDueToday
  const goal = doneToday + dueLeft
  const pct = goal > 0 ? Math.min(1, doneToday / goal) : 1
  const caughtUp = dueLeft === 0

  const heatmap = useMemo(() => stats.activityHeatmap ?? [], [stats.activityHeatmap])
  const thisWeek = useMemo(
    () => heatmap.slice(-7).reduce((s, d) => s + d.count, 0),
    [heatmap],
  )
  const lastWeek = useMemo(
    () => heatmap.slice(-14, -7).reduce((s, d) => s + d.count, 0),
    [heatmap],
  )
  const weekDelta = thisWeek - lastWeek

  const rescueDeckId = stats.lastStudiedDeck?.id

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 p-5 sm:p-6 shadow-glow-lg"
      aria-label={t('momentum.ariaLabel', 'Your momentum')}
    >
      {/* Ambient brand glows — the hero is always dark, in both themes */}
      <div className="pointer-events-none absolute -top-28 -right-16 h-80 w-80 rounded-full bg-primary-600/40 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-36 -left-24 h-96 w-96 rounded-full bg-primary-500/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,rgb(var(--color-primary-500)/0.15),transparent_60%)]" aria-hidden />
      <div className="relative">
      {/* Top row: goal ring · streak · CTA */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Daily goal ring */}
        <div className="flex items-center gap-4 rounded-2xl bg-white/[0.06] border border-white/[0.08] p-4">
          <GoalRing pct={pct} done={doneToday} goal={goal} caughtUp={caughtUp} />
          <div>
            <p className="text-sm font-semibold text-white">
              {caughtUp ? t('momentum.caughtUp', 'Caught up') : t('momentum.todaysGoal', "Today's goal")}
            </p>
            <p className="mt-0.5 text-xs text-white/60">
              {goal > 0
                ? t('momentum.reviewedOfGoal', '{{done}} of {{goal}} reviewed', { done: doneToday, goal })
                : t('momentum.nothingDueToday', 'Nothing due today')}
            </p>
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-4 rounded-2xl bg-white/[0.06] border border-white/[0.08] p-4">
          <div className="relative flex h-14 w-14 items-center justify-center">
            <Flame
              className={`h-12 w-12 ${stats.streakDays > 0 ? 'text-amber-400' : 'text-white/20'}`}
              fill={stats.streakDays > 0 ? 'currentColor' : 'none'}
              aria-hidden
            />
            <span className="absolute text-sm font-bold text-white drop-shadow">
              {stats.streakDays}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {stats.streakDays === 1
                ? t('momentum.streakDay', '{{count}} day', { count: stats.streakDays })
                : t('momentum.streakDays', '{{count}} days', { count: stats.streakDays })}
            </p>
            <p className="mt-0.5 text-xs text-white/60">
              {stats.streakDays > 0
                ? t('momentum.keepStreak', 'Keep the streak alive')
                : t('momentum.startStreak', 'Study today to start a streak')}
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => navigate(rescueDeckId && !caughtUp ? `/study/${rescueDeckId}` : '/decks')}
          className={`group flex items-center justify-between gap-3 rounded-2xl p-4 text-left transition-[transform,background-color] duration-150 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
            caughtUp
              ? 'bg-emerald-400/10 border border-emerald-400/20 hover:bg-emerald-400/15'
              : 'bg-white text-primary-700 hover:bg-primary-50 shadow-[0_8px_24px_rgb(var(--color-primary-500)/0.35)]'
          }`}
        >
          <div>
            <p className={`text-sm font-bold ${caughtUp ? 'text-emerald-300' : 'text-primary-700'}`}>
              {caughtUp
                ? t('momentum.allDoneToday', 'All done for today')
                : dueLeft === 1
                  ? t('momentum.cardDue', '{{count}} card due', { count: dueLeft })
                  : t('momentum.cardsDue', '{{count}} cards due', { count: dueLeft })}
            </p>
            <p className={`mt-0.5 text-xs ${caughtUp ? 'text-emerald-400/80' : 'text-primary-600/80'}`}>
              {caughtUp
                ? t('momentum.comeBackTomorrow', 'Come back tomorrow')
                : t('momentum.minToClear', '~{{min}} min to clear', { min: Math.max(1, Math.round(dueLeft * 0.25)) })}
            </p>
          </div>
          <span className={`flex h-9 w-9 items-center justify-center rounded-full ${caughtUp ? 'bg-emerald-400/15' : 'bg-primary-600'}`}>
            {caughtUp ? (
              <Check className="h-5 w-5 text-emerald-300" aria-hidden />
            ) : (
              <Play className="h-5 w-5 text-white transition-transform group-hover:translate-x-0.5" aria-hidden />
            )}
          </span>
        </button>
      </div>

      {/* Activity heatmap + trend */}
      {heatmap.length > 0 && (
        <div className="mt-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">{t('momentum.studyActivity', 'Study activity')}</p>
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium ${
                weekDelta > 0 ? 'text-emerald-400' : 'text-white/50'
              }`}
            >
              {weekDelta > 0 ? (
                <TrendingUp className="h-3.5 w-3.5" aria-hidden />
              ) : weekDelta < 0 ? (
                <TrendingDown className="h-3.5 w-3.5" aria-hidden />
              ) : null}
              {t('momentum.thisWeek', '{{count}} this week', { count: thisWeek })}
              {weekDelta !== 0 && (
                <span className="text-white/40">
                  {t('momentum.vsLastWeek', '({{delta}} vs last)', {
                    delta: `${weekDelta > 0 ? '+' : ''}${weekDelta}`,
                  })}
                </span>
              )}
            </span>
          </div>
          <Heatmap days={heatmap} />
        </div>
      )}

      </div>
    </motion.section>
  )
}

function GoalRing({ pct, done, goal, caughtUp }: { pct: number; done: number; goal: number; caughtUp: boolean }) {
  const R = 26
  const C = 2 * Math.PI * R
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
        <circle cx="32" cy="32" r={R} fill="none" strokeWidth="7" className="stroke-white/15" />
        <motion.circle
          cx="32"
          cy="32"
          r={R}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          className={caughtUp ? 'stroke-emerald-400' : 'stroke-primary-400'}
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C * (1 - pct) }}
          transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
        {goal > 0 ? `${done}/${goal}` : '✓'}
      </span>
    </div>
  )
}

const LEVEL_CLASS = [
  'bg-white/[0.08]',
  'bg-primary-800',
  'bg-primary-600',
  'bg-primary-500',
  'bg-primary-400',
]

function Heatmap({ days }: { days: { date: string; count: number }[] }) {
  const { t } = useTranslation()
  const max = Math.max(1, ...days.map((d) => d.count))
  const level = (c: number) => (c === 0 ? 0 : Math.min(4, 1 + Math.floor((c / max) * 3.999)))
  // Columns of 7 (weeks), oldest → newest.
  const weeks: { date: string; count: number }[][] = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))

  return (
    <div className="flex gap-[3px] overflow-x-auto">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((d) => (
            <div
              key={d.date}
              className={`h-3 w-3 rounded-[3px] ${LEVEL_CLASS[level(d.count)]}`}
              title={`${d.date}: ${
                d.count === 1
                  ? t('momentum.heatmapReview', '{{count}} review', { count: d.count })
                  : t('momentum.heatmapReviews', '{{count}} reviews', { count: d.count })
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
