import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useDeckRepo } from '@/features/decks/repo'
import { useGuestSync } from '@/features/sync/useGuestSync'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { DashboardNavbar } from '@/pages/dashboard/components/DashboardNavbar'
import { YourDecks } from '@/pages/dashboard/YourDecks'

export const DecksPage = () => {
  const { t } = useTranslation()
  usePageMeta({ title: t('seo.decks.title', 'My Decks'), noIndex: true })
  const { user } = useAuthContext()
  const { logout } = useAuth()
  const { mode } = useDeckRepo()

  const { hasGuestDecksToSave, isSyncing, saveGuestDecks } = useGuestSync()

  const isApiMode = mode === 'api'

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

      <main className="flex-1 w-full max-w-5xl xl:max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-28 md:pb-16">
        {/* Breadcrumb */}
        <nav className="mb-4 md:mb-6" aria-label={t('nav.breadcrumb', 'Breadcrumb')}>
          <ol className="flex items-center gap-1.5 text-sm text-muted">
            <li>
              <Link to="/" className="font-semibold underline-offset-4 hover:text-fg hover:underline active:opacity-70 transition-opacity duration-150 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">{t('nav.home')}</Link>
            </li>
            <li><ChevronRight className="w-4 h-4 shrink-0" aria-hidden /></li>
            <li className="font-medium text-fg" aria-current="page">{t('dashboard.yourDecks')}</li>
          </ol>
        </nav>

        <YourDecks isGuest={!user} />
      </main>
    </div>
  )
}
