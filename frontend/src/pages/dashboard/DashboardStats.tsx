import { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Clock, CheckCircle, Flame, Trophy, Target, Layers, ChevronDown, ChevronUp, Settings2, Loader2 } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { DashboardStats as DashboardStatsType } from '@/features/stats/types'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { authApi } from '@/features/auth/api'
import { guestStorage } from '@/shared/lib/guestStorage'
import { statsKeys } from '@/features/stats/statsHooks'
import { StatCard } from './components/StatCard'
import { ReviewForecast } from './components/ReviewForecast'
import { DeckProgressBar } from './components/DeckProgressBar'

interface StatsProps {
  stats: DashboardStatsType
}

/** "Due" chip with clickable popover to adjust daily new card limit */
function DueChipWithLimit({ stats }: StatsProps) {
  const { t } = useTranslation()
  const { user } = useAuthContext()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [limitValue, setLimitValue] = useState(() => {
    if (user) return user.daily_new_card_limit ?? 20
    return guestStorage.read().settings?.dailyNewCardLimit ?? 20
  })
  const popoverRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user?.daily_new_card_limit != null) setLimitValue(user.daily_new_card_limit)
  }, [user?.daily_new_card_limit])

  // Close popover on outside click
  useEffect(() => {
    if (!open) return
    const handle = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  // Auto-focus input when popover opens
  useEffect(() => {
    if (open) inputRef.current?.select()
  }, [open])

  const updateLimitMutation = useMutation({
    mutationFn: (limit: number) => authApi.updateMe({ daily_new_card_limit: limit }),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['me'], updatedUser)
      queryClient.invalidateQueries({ queryKey: statsKeys.dashboard })
      setOpen(false)
      toast.success(t('toast.dailyLimitSaved'))
    },
    onError: () => {
      toast.error(t('toast.failedToSaveDailyLimit'))
    },
  })

  const handleSave = () => {
    const clamped = Math.max(0, Math.min(9999, limitValue))
    setLimitValue(clamped)
    if (!user) {
      const data = guestStorage.read()
      guestStorage.write({ ...data, settings: { ...data.settings, dailyNewCardLimit: clamped } })
      queryClient.invalidateQueries({ queryKey: statsKeys.dashboard })
      setOpen(false)
      toast.success(t('toast.dailyLimitSaved'))
    } else {
      updateLimitMutation.mutate(clamped)
    }
  }

  const newCount = Math.min(stats.newCardsAvailable, limitValue)
  const reviewCount = stats.cardsDueToday - newCount

  return (
    <div className="relative" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors group"
      >
        <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
        <span className="font-semibold text-slate-800 dark:text-slate-100">{stats.cardsDueToday}</span>
        <span className="text-slate-500 dark:text-slate-400 text-xs hidden sm:inline">{t('stats.due')}</span>
        <Settings2 className="w-3 h-3 text-slate-400 dark:text-slate-500 group-hover:text-amber-500 transition-colors ml-0.5" />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-600 p-4 z-50 animate-fade-in">
          {/* Breakdown */}
          <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mb-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {reviewCount} {t('stats.review')}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary-400" />
              {newCount} {t('stats.new')}
            </span>
            {stats.newCardsAvailable > limitValue && (
              <span className="text-slate-400 dark:text-slate-500">
                ({stats.newCardsAvailable} {t('stats.unseen')})
              </span>
            )}
          </div>

          {/* Limit input */}
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {t('stats.dailyNewCardLimit')}
          </label>
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="number"
              min={0}
              max={9999}
              value={limitValue}
              onChange={(e) => setLimitValue(parseInt(e.target.value) || 0)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSave() }}
              className="w-20 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleSave}
              disabled={updateLimitMutation.isPending}
              className="px-3 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium transition-colors disabled:opacity-60"
            >
              {updateLimitMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : t('common.save')}
            </button>
          </div>
          <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
            {t('stats.onlyReviewHelp')}
          </p>
        </div>
      )}
    </div>
  )
}

/** Compact row of 4 stat chips for the top strip */
export function StatsStrip({ stats }: StatsProps) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-wrap gap-2">
      <DueChipWithLimit stats={stats} />
      <StatCard
        icon={CheckCircle}
        value={stats.cardsReviewedToday}
        label={t('stats.reviewed')}
        color="text-emerald-600 dark:text-emerald-400"
        compact
      />
      <StatCard
        icon={Flame}
        value={`${stats.streakDays}d`}
        label={t('stats.streak')}
        color="text-orange-600 dark:text-orange-400"
        compact
      />
      <StatCard
        icon={Trophy}
        value={`${stats.masteryPercent}%`}
        label={t('stats.mastery')}
        color="text-primary-600 dark:text-primary-400"
        compact
      />
    </div>
  )
}

const DECK_PROGRESS_LIMIT = 3

/** Stats sidebar for the right column */
export function StatsSidebar({ stats }: StatsProps) {
  const { t } = useTranslation()
  const [showAllDecks, setShowAllDecks] = useState(false)

  const visibleDecks = showAllDecks
    ? stats.deckProgress
    : stats.deckProgress.slice(0, DECK_PROGRESS_LIMIT)
  const hasMore = stats.deckProgress.length > DECK_PROGRESS_LIMIT

  return (
    <div className="space-y-3">
      {/* Quick stat chips */}
      <div className="flex flex-wrap gap-2">
        <DueChipWithLimit stats={stats} />
        <StatCard icon={CheckCircle} value={stats.cardsReviewedToday} label={t('stats.reviewed')} color="text-emerald-600 dark:text-emerald-400" compact />
        <StatCard icon={Flame} value={`${stats.streakDays}d`} label={t('stats.streak')} color="text-orange-600 dark:text-orange-400" compact />
        <StatCard icon={Trophy} value={`${stats.masteryPercent}%`} label={t('stats.mastery')} color="text-primary-600 dark:text-primary-400" compact />
      </div>

      {/* Retention & Total Cards */}
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          icon={Target}
          value={`${stats.retentionPercent}%`}
          label={t('stats.accuracy')}
          color="text-violet-600 dark:text-violet-400"
        />
        <StatCard
          icon={Layers}
          value={stats.totalCards}
          label={t('stats.totalCards')}
          color="text-slate-600 dark:text-slate-400"
        />
      </div>

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
              onClick={() => setShowAllDecks(!showAllDecks)}
              className="mt-2 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center gap-1 transition-colors"
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
    </div>
  )
}

/** @deprecated Use StatsStrip and StatsSidebar instead */
export function DashboardStats({ stats }: StatsProps) {
  return (
    <section className="animate-fade-in">
      <StatsStrip stats={stats} />
      <div className="mt-4">
        <StatsSidebar stats={stats} />
      </div>
    </section>
  )
}
