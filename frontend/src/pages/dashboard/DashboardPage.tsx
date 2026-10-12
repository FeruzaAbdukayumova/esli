import { useState, useMemo } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { Puzzle, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useDecks } from '@/features/decks/hooks'
import { useDeckRepo } from '@/features/decks/repo'
import { useGuestSync } from '@/features/sync/useGuestSync'
import { useDashboardStats } from '@/features/stats/statsHooks'
import { DashboardNavbar } from './components/DashboardNavbar'
import { CategoryFilter } from './components/CategoryFilter'
import { ContinueStudying } from './ContinueStudying'
import { YourDecks } from './YourDecks'
import { StatsSidebar } from './DashboardStats'
import { SharedDecksSection } from './SharedDecksSection'
import { MomentumPanel } from './components/MomentumPanel'
import { CreationBar } from './components/CreationBar'
import { EmptyDashboard } from './EmptyDashboard'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { WelcomeModal } from './components/WelcomeModal'
import { EXTENSION_STORE_URL } from '@/shared/config'

export const DashboardPage = () => {
  const { t } = useTranslation()
  const { user } = useAuthContext()
  const { logout } = useAuth()
  const { mode } = useDeckRepo()
  const [searchParams] = useSearchParams()
  const { data: stats } = useDashboardStats()
  const { data: allDecks = [], isLoading: decksLoading } = useDecks()
  const { hasGuestDecksToSave, isSyncing, saveGuestDecks } = useGuestSync()

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showWelcome, setShowWelcome] = useState(
    () => localStorage.getItem('flashcards-welcome-seen') !== '1'
  )
  const [showExtensionBanner, setShowExtensionBanner] = useState(
    () => localStorage.getItem('flashcards-extension-banner-dismissed') !== '1'
  )

  const dismissExtensionBanner = () => {
    localStorage.setItem('flashcards-extension-banner-dismissed', '1')
    setShowExtensionBanner(false)
  }

  const categories = useMemo(() => {
    const tagSet = new Set<string>()
    for (const deck of allDecks) {
      for (const tag of deck.categoryTags) {
        if (tag.trim()) tagSet.add(tag.trim())
      }
    }
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  }, [allDecks])

  usePageMeta({ title: t('seo.dashboard.title', 'Dashboard'), noIndex: true })

  // Redirect admin users to admin panel unless they explicitly chose dashboard
  if (user?.is_admin && searchParams.get('view') !== 'user') {
    return <Navigate to="/admin" replace />
  }

  const isApiMode = mode === 'api'
  const hasStats = stats && (stats.totalCards > 0 || stats.cardsReviewedToday > 0)

  // New user with zero decks → dedicated first-run activation experience.
  const isNewUser = !decksLoading && allDecks.length === 0
  const greetingName = user?.username || user?.email?.split('@')[0]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-surface-base grain relative overflow-x-hidden">
      {/* Decorative background */}
      <div
        className="fixed inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none z-0" aria-hidden />
      <div className="fixed bottom-0 right-0 w-[400px] h-[200px] bg-primary-300/10 dark:bg-primary-600/10 rounded-full blur-3xl pointer-events-none z-0" aria-hidden />

      <DashboardNavbar
        user={user}
        isApiMode={isApiMode}
        hasGuestDecksToSave={hasGuestDecksToSave}
        isSyncing={isSyncing}
        onSaveGuestDecks={saveGuestDecks}
        onLogout={logout}
      />

      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 md:py-8 pb-24 md:pb-8 animate-fade-in">
        {isNewUser ? (
          <EmptyDashboard greetingName={greetingName ?? undefined} />
        ) : (
        <>
        {/* Momentum — the signature centerpiece */}
        {hasStats && stats && (
          <div className="mb-6">
            <MomentumPanel stats={stats} />
          </div>
        )}

        {/* Give-Esli-anything creation bar — the differentiator, always visible */}
        <div className="mb-6">
          <CreationBar />
        </div>

        {/* Continue Studying — mobile only (above grid) */}
        {hasStats && stats?.lastStudiedDeck && (
          <div className="mb-6 lg:hidden">
            <ContinueStudying lastStudiedDeck={stats.lastStudiedDeck} cardsDue={stats.cardsDueToday} />
          </div>
        )}

        {/* Main 2-column layout */}
        <div className={`grid grid-cols-1 ${hasStats ? 'lg:grid-cols-3 items-stretch' : ''} gap-6`}>
          {/* Left column: Your Decks first, then Shared Decks */}
          <div className={`${hasStats ? 'lg:col-span-2' : ''} flex flex-col gap-6`}>
            {/* Category filter — sits with the deck lists it actually filters */}
            {categories.length > 0 && (
              <CategoryFilter categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
            )}

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-elevation-md border border-slate-100 dark:border-slate-700/50 p-4 sm:p-6">
              <YourDecks isGuest={!user} limit={6} categoryFilter={selectedCategory} />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-elevation-md border border-slate-100 dark:border-slate-700/50 p-4 sm:p-6">
              <SharedDecksSection categoryFilter={selectedCategory} />
            </div>

            {/* Extension banner - shown after core content, hidden until the store listing is live */}
            {showExtensionBanner && EXTENSION_STORE_URL && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-elevation-sm border border-slate-100 dark:border-slate-700/50 p-4 sm:p-5 flex items-center gap-4 animate-fade-in">
                <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30">
                  <Puzzle className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t('extension.bannerTitle')}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('extension.bannerDesc')}</p>
                </div>
                <a
                  href={EXTENSION_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  {t('extension.install')}
                </a>
                <button
                  type="button"
                  onClick={dismissExtensionBanner}
                  className="shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  aria-label={t('common.close')}
                >
                  <X className="w-4 h-4" aria-hidden />
                </button>
              </div>
            )}
          </div>

          {/* Right column: Continue Studying + Stats sidebar */}
          {hasStats && (
            <div className="lg:col-span-1 flex flex-col gap-3">
              {stats?.lastStudiedDeck && (
                <div className="hidden lg:block">
                  <ContinueStudying lastStudiedDeck={stats.lastStudiedDeck} cardsDue={stats.cardsDueToday} />
                </div>
              )}
              <StatsSidebar stats={stats} />
            </div>
          )}
        </div>
        </>
        )}
      </main>
      <WelcomeModal isOpen={showWelcome && !isNewUser} onClose={() => setShowWelcome(false)} />
    </div>
  )
}
