import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useDeckRepo } from '@/features/decks/repo'
import { useSyncImport } from '@/features/sync/hooks'
import { guestStorage } from '@/shared/lib/guestStorage'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { DashboardNavbar } from '@/pages/dashboard/components/DashboardNavbar'
import { YourDecks } from '@/pages/dashboard/YourDecks'

export const DecksPage = () => {
  const { t } = useTranslation()
  usePageMeta({ title: t('seo.decks.title', 'My Decks'), noIndex: true })
  const { user } = useAuthContext()
  const { logout } = useAuth()
  const { mode } = useDeckRepo()
  const syncImportMutation = useSyncImport()

  const guestData = guestStorage.read()
  const hasGuestDecksToSave =
    !!user &&
    Array.isArray(guestData.decks) &&
    typeof guestData.cardsByDeckId === 'object' &&
    guestData.decks.length >= 1

  const handleSaveGuestDecks = () => {
    if (!hasGuestDecksToSave) return
    const payload = {
      version: 1 as const,
      decks: guestData.decks,
      cardsByDeckId: guestData.cardsByDeckId,
    }
    syncImportMutation.mutate(payload, {
      onSuccess: () => {
        guestStorage.clear()
      },
    })
  }

  const isApiMode = mode === 'api'

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F0F11] grain relative overflow-x-hidden">
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
        isSyncing={syncImportMutation.isPending}
        onSaveGuestDecks={handleSaveGuestDecks}
        onLogout={logout}
      />

      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 md:py-8 pb-24 md:pb-8 animate-fade-in">
        {/* Breadcrumb */}
        <nav className="mb-4 md:mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link>
            </li>
            <li><ChevronRight className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden /></li>
            <li className="font-medium text-slate-800 dark:text-slate-100" aria-current="page">Your Decks</li>
          </ol>
        </nav>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-elevation-md border border-slate-100 dark:border-slate-700/50 p-4 sm:p-6 md:p-8">
          <YourDecks isGuest={!user} />
        </div>
      </main>
    </div>
  )
}
