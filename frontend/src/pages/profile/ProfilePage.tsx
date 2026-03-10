import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  ChevronRight,
  User,
  Mail,
  Calendar,
  Layers,
  Target,
  Flame,
  Trophy,
  Clock,
  Check,
  Loader2,
  Pencil,
  X,
} from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useDeckRepo } from '@/features/decks/repo'
import { useSyncImport } from '@/features/sync/hooks'
import { guestStorage } from '@/shared/lib/guestStorage'
import { DashboardNavbar } from '@/pages/dashboard/components/DashboardNavbar'
import { authApi } from '@/features/auth/api'
import { useDashboardStats } from '@/features/stats/statsHooks'
import { DeckProgressBar } from '@/pages/dashboard/components/DeckProgressBar'
import { ReviewForecast } from '@/pages/dashboard/components/ReviewForecast'
import { usePageMeta } from '@/shared/lib/usePageMeta'

function getInitials(email: string, username?: string | null): string {
  if (username) {
    return username.slice(0, 2).toUpperCase()
  }
  return email.slice(0, 2).toUpperCase()
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function ProfilePage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('seo.profile.title', 'Profile'), noIndex: true })
  const { user } = useAuthContext()
  const { logout } = useAuth()
  const { mode } = useDeckRepo()
  const queryClient = useQueryClient()
  const syncImportMutation = useSyncImport()
  const { data: stats, error: statsError } = useDashboardStats()
  const isGuest = !user

  useEffect(() => {
    if (statsError) {
      toast.error(t('toast.failedToLoadStats'))
    }
  }, [statsError])

  const guestData = guestStorage.read()
  const hasGuestDecksToSave =
    !!user &&
    Array.isArray(guestData.decks) &&
    typeof guestData.cardsByDeckId === 'object' &&
    guestData.decks.length >= 1
  const handleSaveGuestDecks = () => {
    if (!hasGuestDecksToSave) return
    syncImportMutation.mutate(
      { version: 1 as const, decks: guestData.decks, cardsByDeckId: guestData.cardsByDeckId },
      { onSuccess: () => guestStorage.clear() },
    )
  }

  const [editingUsername, setEditingUsername] = useState(false)
  const [usernameInput, setUsernameInput] = useState(user?.username || '')

  const updateUsernameMutation = useMutation({
    mutationFn: (username: string) => authApi.updateMe({ username }),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['me'], updatedUser)
      setEditingUsername(false)
      toast.success(t('toast.usernameSaved'))
    },
  })

  const handleUsernameSave = () => {
    const trimmed = usernameInput.trim()
    if (!trimmed) return
    updateUsernameMutation.mutate(trimmed)
  }

  const statCards = stats
    ? [
        { icon: Layers, label: t('profile.totalCards'), value: stats.totalCards, color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-100 dark:bg-primary-900/30' },
        { icon: Target, label: t('profile.accuracy'), value: `${stats.retentionPercent}%`, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
        { icon: Flame, label: t('profile.streak'), value: `${stats.streakDays}d`, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
        { icon: Trophy, label: t('profile.mastery'), value: `${stats.masteryPercent}%`, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-100 dark:bg-violet-900/30' },
        { icon: Clock, label: t('profile.dueToday'), value: stats.cardsDueToday, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-100 dark:bg-rose-900/30' },
        { icon: Check, label: t('profile.reviewedToday'), value: stats.cardsReviewedToday, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-700' },
      ]
    : []

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div
        className="fixed inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      <DashboardNavbar
        user={user}
        isApiMode={mode === 'api'}
        hasGuestDecksToSave={hasGuestDecksToSave}
        isSyncing={syncImportMutation.isPending}
        onSaveGuestDecks={handleSaveGuestDecks}
        onLogout={logout}
      />

      <main className="relative z-10 flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {t('common.home')}
              </Link>
            </li>
            <li><ChevronRight className="w-4 h-4 text-slate-400" aria-hidden /></li>
            <li className="font-medium text-slate-800 dark:text-slate-100" aria-current="page">
              {t('profile.title')}
            </li>
          </ol>
        </nav>

        <div className="space-y-6">
          {/* User Info Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/50 p-6 md:p-8">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  {getInitials(user?.email || 'G', user?.username)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                {/* Username */}
                {!isGuest && (
                  <div className="mb-2">
                    {editingUsername ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={usernameInput}
                          onChange={(e) => setUsernameInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleUsernameSave(); if (e.key === 'Escape') setEditingUsername(false) }}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-48"
                          placeholder={t('profile.usernamePlaceholder')}
                          maxLength={50}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={handleUsernameSave}
                          disabled={updateUsernameMutation.isPending || !usernameInput.trim()}
                          className="p-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60 transition-colors"
                        >
                          {updateUsernameMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setEditingUsername(false); setUsernameInput(user?.username || '') }}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                          {user?.username || t('profile.setUsername')}
                        </h2>
                        <button
                          type="button"
                          onClick={() => { setUsernameInput(user?.username || ''); setEditingUsername(true) }}
                          className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                          aria-label={t('profile.editUsername')}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {updateUsernameMutation.isError && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        {(updateUsernameMutation.error as Error)?.message || t('profile.failedToSaveUsername')}
                      </p>
                    )}
                  </div>
                )}

                {isGuest && (
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t('profile.guest')}</h2>
                )}

                <div className="space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                  {user && (
                    <>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        <span>{t('profile.memberSince')} {formatDate(user.created_at)}</span>
                      </div>
                    </>
                  )}
                  {isGuest && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                      <span>{t('profile.dataStoredLocally')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          {stats && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/50 p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-5">{t('profile.statsOverview')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {statCards.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-800 dark:text-slate-100 tabular-nums">{stat.value}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Review Forecast */}
          {stats && stats.reviewForecast.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/50 p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-5">{t('profile.sevenDayForecast')}</h2>
              <ReviewForecast forecast={stats.reviewForecast} />
            </div>
          )}

          {/* Deck Progress */}
          {stats && stats.deckProgress.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/50 p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-5">{t('profile.deckProgress')}</h2>
              <div className="space-y-4">
                {stats.deckProgress.map((deck) => (
                  <DeckProgressBar key={deck.deckId} deck={deck} />
                ))}
              </div>
              <div className="flex items-center gap-4 mt-5 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" /> {t('profile.mature')}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400" /> {t('profile.learning')}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-500" /> {t('profile.new')}
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
