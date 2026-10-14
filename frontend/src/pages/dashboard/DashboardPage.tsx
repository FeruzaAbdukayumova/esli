import { useState } from 'react'
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
import { YourDecks } from './YourDecks'
import { SharedDecksSection } from './SharedDecksSection'
import { CreationBar } from './components/CreationBar'
import { NextCard } from './components/NextCard'
import { WordGarden } from './components/WordGarden'
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

  usePageMeta({ title: t('seo.dashboard.title', 'Dashboard'), noIndex: true })

  // Redirect admin users to admin panel unless they explicitly chose dashboard
  if (user?.is_admin && searchParams.get('view') !== 'user') {
    return <Navigate to="/admin" replace />
  }

  const isApiMode = mode === 'api'

  // New user with zero decks → dedicated first-run activation experience.
  const isNewUser = !decksLoading && allDecks.length === 0
  const greetingName = user?.username || user?.email?.split('@')[0]

  return (
    <div className="paper min-h-screen flex flex-col text-fg">
      <DashboardNavbar
        user={user}
        isApiMode={isApiMode}
        hasGuestDecksToSave={hasGuestDecksToSave}
        isSyncing={isSyncing}
        onSaveGuestDecks={saveGuestDecks}
        onLogout={logout}
      />

      <main className="flex-1 w-full max-w-5xl xl:max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10 pb-28 md:pb-16">
        {isNewUser ? (
          <EmptyDashboard greetingName={greetingName ?? undefined} />
        ) : (
          <>
            {/* Phones/tablets stack in this order. On wide screens: make + decks on the
                left, a study rail (next card, garden) on the right. */}
            <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_400px] xl:items-start xl:gap-x-14">
              <div className="xl:col-start-1 xl:row-start-1">
                <CreationBar />
              </div>

              <aside className="mt-12 sm:mt-14 xl:col-start-2 xl:row-span-3 xl:row-start-1 xl:mt-0">
                {stats ? (
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8 xl:grid-cols-1 xl:gap-10">
                    <NextCard stats={stats} />
                    <WordGarden stats={stats} />
                  </div>
                ) : (
                  <div className="h-[320px]" aria-hidden />
                )}
              </aside>

              <div className="mt-12 sm:mt-14 xl:col-start-1 xl:row-start-2">
                <YourDecks isGuest={!user} limit={6} />
              </div>

              <div className="mt-12 sm:mt-14 xl:col-start-1 xl:row-start-3">
                <SharedDecksSection />
              </div>
            </div>

            {showExtensionBanner && EXTENSION_STORE_URL && (
              <div className="mt-14 flex items-center gap-4 border-t border-line pt-6">
                <Puzzle className="w-5 h-5 shrink-0 text-muted" aria-hidden />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{t('extension.bannerTitle')}</p>
                  <p className="text-sm text-muted">{t('extension.bannerDesc')}</p>
                </div>
                <a
                  href={EXTENSION_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 min-h-[40px] inline-flex items-center px-4 rounded-lg text-sm font-medium border border-line hover:bg-surface active:scale-[0.97] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {t('extension.install')}
                </a>
                <button
                  type="button"
                  onClick={dismissExtensionBanner}
                  className="shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-muted hover:text-fg hover:bg-surface active:scale-[0.95] transition-[transform,color,background-color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label={t('common.close')}
                >
                  <X className="w-4 h-4" aria-hidden />
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <WelcomeModal isOpen={showWelcome && !isNewUser} onClose={() => setShowWelcome(false)} />
    </div>
  )
}
