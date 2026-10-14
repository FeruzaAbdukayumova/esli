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
import { useGuestSync } from '@/features/sync/useGuestSync'
import { DashboardNavbar } from '@/pages/dashboard/components/DashboardNavbar'
import { authApi } from '@/features/auth/api'
import { useDashboardStats } from '@/features/stats/statsHooks'
import { DeckProgressBar } from '@/pages/dashboard/components/DeckProgressBar'
import { ReviewForecast } from '@/pages/dashboard/components/ReviewForecast'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Button } from '@/shared/ui/Button'

function getInitials(email: string, username?: string | null): string {
  if (username) {
    return username.slice(0, 2).toUpperCase()
  }
  return email.slice(0, 2).toUpperCase()
}

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function ProfilePage() {
  const { t, i18n } = useTranslation()
  usePageMeta({ title: t('seo.profile.title', 'Profile'), noIndex: true })
  const { user } = useAuthContext()
  const { logout } = useAuth()
  const { mode } = useDeckRepo()
  const queryClient = useQueryClient()
  const { data: stats, error: statsError, isLoading: statsLoading, refetch: refetchStats } = useDashboardStats()
  const isGuest = !user

  useEffect(() => {
    if (statsError) {
      toast.error(t('toast.failedToLoadStats'))
    }
  }, [statsError, t])

  const { hasGuestDecksToSave, isSyncing, saveGuestDecks } = useGuestSync()

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
        { icon: Layers, label: t('profile.totalCards'), value: stats.totalCards },
        { icon: Target, label: t('profile.accuracy'), value: `${stats.retentionPercent}%` },
        { icon: Flame, label: t('profile.streak'), value: `${stats.streakDays}d` },
        { icon: Trophy, label: t('profile.mastery'), value: `${stats.masteryPercent}%` },
        { icon: Clock, label: t('profile.dueToday'), value: stats.cardsDueToday },
        { icon: Check, label: t('profile.reviewedToday'), value: stats.cardsReviewedToday },
      ]
    : []

  const iconBtn =
    'inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-[14px] transition-[transform,background-color,color] duration-150 active:scale-[0.95] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-60'

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar
        user={user}
        isApiMode={mode === 'api'}
        hasGuestDecksToSave={hasGuestDecksToSave}
        isSyncing={isSyncing}
        onSaveGuestDecks={saveGuestDecks}
        onLogout={logout}
      />

      <main className="relative flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        <nav className="mb-6" aria-label={t('nav.breadcrumb', 'Breadcrumb')}>
          <ol className="flex items-center gap-1.5 text-sm text-muted">
            <li>
              <Link to="/" className="rounded font-medium underline decoration-brand/40 underline-offset-4 hover:text-fg hover:decoration-brand active:opacity-70 transition-[color,opacity] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                {t('common.home')}
              </Link>
            </li>
            <li><ChevronRight className="w-4 h-4" aria-hidden /></li>
            <li className="font-bold text-fg" aria-current="page">
              {t('profile.title')}
            </li>
          </ol>
        </nav>

        <div className="space-y-6">
          {/* User Info Card */}
          <div className="sheet p-5 sm:p-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-16 h-16 rounded-full border-[2.5px] border-ink bg-coral flex items-center justify-center shrink-0 -rotate-3">
                <span className="font-display text-xl text-ink">
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
                          className="field min-w-0 flex-1 sm:flex-none sm:!w-56 font-bold"
                          placeholder={t('profile.usernamePlaceholder')}
                          maxLength={50}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={handleUsernameSave}
                          disabled={updateUsernameMutation.isPending || !usernameInput.trim()}
                          className="btn-brand shrink-0 min-w-[44px] min-h-[44px] px-0"
                          aria-label={t('common.save')}
                        >
                          {updateUsernameMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" strokeWidth={3} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setEditingUsername(false); setUsernameInput(user?.username || '') }}
                          className={`${iconBtn} shrink-0 text-muted hover:text-fg hover:bg-fg/[0.07]`}
                          aria-label={t('common.cancel')}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <h1 className="font-display text-xl sm:text-2xl text-fg min-w-0 truncate">
                          {user?.username || t('profile.setUsername')}
                        </h1>
                        <button
                          type="button"
                          onClick={() => { setUsernameInput(user?.username || ''); setEditingUsername(true) }}
                          className={`${iconBtn} -my-2.5 text-muted hover:text-fg hover:bg-fg/[0.07]`}
                          aria-label={t('profile.editUsername')}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {updateUsernameMutation.isError && (
                      <p role="alert" className="text-sm font-medium text-again mt-1">
                        {(updateUsernameMutation.error as Error)?.message || t('profile.failedToSaveUsername')}
                      </p>
                    )}
                  </div>
                )}

                {isGuest && (
                  <h1 className="font-display text-xl sm:text-2xl text-fg mb-2">{t('profile.guest')}</h1>
                )}

                <div className="space-y-1.5 text-sm text-muted">
                  {user && (
                    <>
                      <div className="flex items-center gap-2 min-w-0">
                        <Mail className="w-4 h-4 shrink-0" aria-hidden />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 shrink-0" aria-hidden />
                        <span>{t('profile.memberSince')} {formatDate(user.created_at, i18n.language)}</span>
                      </div>
                    </>
                  )}
                  {isGuest && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 shrink-0" aria-hidden />
                      <span>{t('profile.dataStoredLocally')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats loading skeletons (mirror the stats + forecast card layout) */}
          {statsLoading && (
            <>
              <div className="sheet p-5 sm:p-6">
                <Skeleton className="h-6 w-44 mb-5" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-14 rounded-xl" />
                  ))}
                </div>
              </div>
              <div className="sheet p-5 sm:p-6">
                <Skeleton className="h-6 w-44 mb-5" />
                <Skeleton className="h-32" />
              </div>
            </>
          )}

          {/* Stats error (inline, with retry) */}
          {!statsLoading && !!statsError && (
            <div className="sheet !border-again p-5 sm:p-6 text-center">
              <p className="text-sm text-muted mb-4">
                {t('profile.statsError', 'Could not load your stats. Check your connection and try again.')}
              </p>
              <Button variant="secondary" size="sm" onClick={() => refetchStats()}>
                {t('common.retry', 'Retry')}
              </Button>
            </div>
          )}

          {/* Stats Overview */}
          {stats && (
            <section className="sheet p-5 sm:p-6">
              <h2 className="font-display text-lg text-fg mb-4">{t('profile.statsOverview')}</h2>
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-5">
                {statCards.map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <dt className="flex items-center gap-1.5 text-sm text-muted">
                      <stat.icon className="w-4 h-4 shrink-0" aria-hidden />
                      <span className="truncate">{stat.label}</span>
                    </dt>
                    <dd className="mt-0.5 text-2xl font-extrabold text-fg tabular-nums">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Review Forecast */}
          {stats && stats.reviewForecast.length > 0 && (
            <section className="sheet p-5 sm:p-6">
              <h2 className="font-display text-lg text-fg mb-5">{t('profile.sevenDayForecast')}</h2>
              <ReviewForecast forecast={stats.reviewForecast} />
            </section>
          )}

          {/* Deck Progress */}
          {stats && stats.deckProgress.length > 0 && (
            <section className="sheet p-5 sm:p-6">
              <h2 className="font-display text-lg text-fg mb-5">{t('profile.deckProgress')}</h2>
              <div className="space-y-4">
                {stats.deckProgress.map((deck) => (
                  <DeckProgressBar key={deck.deckId} deck={deck} />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border-2 border-edge bg-grass" aria-hidden /> {t('profile.mature')}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border-2 border-edge bg-sun" aria-hidden /> {t('profile.learning')}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border-2 border-edge bg-surface" aria-hidden /> {t('profile.new')}
                </span>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
