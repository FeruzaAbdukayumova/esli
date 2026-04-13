import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  Search,
  ChevronRight,
  TrendingUp,
  Clock,
  SortAsc,
  ChevronLeft,
  Globe,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useDeckRepo } from '@/features/decks/repo'
import { usePublicDecks, useCopyDeck } from '@/features/decks/publicHooks'
import { useSyncImport } from '@/features/sync/hooks'
import { guestStorage } from '@/shared/lib/guestStorage'
import { PublicDeckCard } from '@/features/decks/components/PublicDeckCard'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { DashboardNavbar } from './dashboard/components/DashboardNavbar'

type SortBy = 'popular' | 'recent' | 'title'

const SORT_OPTIONS: { value: SortBy; labelKey: string; icon: typeof TrendingUp }[] = [
  { value: 'popular', labelKey: 'browse.mostPopular', icon: TrendingUp },
  { value: 'recent', labelKey: 'browse.recentlyAdded', icon: Clock },
  { value: 'title', labelKey: 'browse.alphabetical', icon: SortAsc },
]

export const BrowsePage = () => {
  const { t } = useTranslation()
  usePageMeta({
    title: t('seo.browse.title', 'Browse Flashcard Decks'),
    description: t('seo.browse.description', 'Discover and copy community flashcard decks on any topic. Free to use.'),
    canonical: '/browse',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Browse Flashcard Decks',
      'description': 'Discover and copy community flashcard decks on any topic. Free to use with spaced repetition.',
      'url': 'https://app.esli.app/browse',
      'provider': {
        '@type': 'WebApplication',
        'name': 'Esli',
        'url': 'https://app.esli.app',
      },
    },
  })
  const navigate = useNavigate()
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

  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortBy>('popular')
  const [page, setPage] = useState(1)
  const [copyingDeckId, setCopyingDeckId] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      setSearchQuery(searchInput)
      setPage(1)
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [searchInput])

  const { data, isLoading, error } = usePublicDecks({
    page,
    perPage: 12,
    search: searchQuery || undefined,
    sortBy,
  })

  const copyDeckMutation = useCopyDeck()

  const handleCopy = async (deckId: string) => {
    setCopyingDeckId(deckId)
    try {
      const result = await copyDeckMutation.mutateAsync(deckId)
      toast.success(t('toast.deckCopied'))
      setTimeout(() => {
        navigate(`/deck/${result.id}`)
      }, 1500)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.failedToCopyDeck'))
    } finally {
      setCopyingDeckId(null)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1) // Reset to first page on new search
  }

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

      <DashboardNavbar
        user={user}
        isApiMode={mode === 'api'}
        hasGuestDecksToSave={hasGuestDecksToSave}
        isSyncing={syncImportMutation.isPending}
        onSaveGuestDecks={handleSaveGuestDecks}
        onLogout={logout}
      />

      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-elevation-md border border-slate-100 dark:border-slate-700/50 p-4 sm:p-6 md:p-8">
          {/* Breadcrumb */}
          <nav className="mb-4 md:mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t('common.home')}</Link>
              </li>
              <li><ChevronRight className="w-4 h-4 shrink-0" aria-hidden /></li>
              <li className="font-medium text-slate-800 dark:text-slate-100" aria-current="page">{t('browse.title')}</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="flex flex-col gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
                <Globe className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                {t('browse.title')}
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {t('browse.subtitle')}
              </p>
            </div>

            {/* Search and filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <form onSubmit={handleSearch} className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" aria-hidden />
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={t('browse.searchPlaceholder')}
                  className="w-full pl-9 pr-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  aria-label={t('browse.searchLabel')}
                />
              </form>

              <div className="flex items-center gap-2">
                <label htmlFor="sort-public" className="text-sm text-slate-600 dark:text-slate-400 shrink-0">{t('browse.sort')}</label>
                <select
                  id="sort-public"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as SortBy)
                    setPage(1)
                  }}
                  className="min-h-[44px] px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-700 transition-colors duration-200"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-slate-100 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 p-6 animate-pulse"
                  aria-hidden
                >
                  <div className="h-6 bg-slate-200 dark:bg-slate-600 rounded w-3/4 mb-3" />
                  <div className="flex gap-2 mb-3">
                    <div className="h-5 bg-slate-200 dark:bg-slate-600 rounded-full w-16" />
                    <div className="h-5 bg-slate-200 dark:bg-slate-600 rounded-full w-20" />
                  </div>
                  <div className="flex gap-3 mb-4">
                    <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-20" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-24" />
                  </div>
                  <div className="h-10 bg-slate-200 dark:bg-slate-600 rounded-lg w-full mt-4" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16 px-4">
              <p className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">{t('browse.failedToLoadDecks')}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {error instanceof Error ? error.message : 'Please try again later'}
              </p>
            </div>
          ) : data && data.decks.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Globe className="w-24 h-24 mx-auto text-slate-300 dark:text-slate-600 mb-4" aria-hidden />
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                {searchQuery ? t('browse.noDecksFound') : t('browse.noPublicDecksYet')}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {searchQuery ? t('browse.tryAdjustingSearch') : t('browse.beTheFirst')}
              </p>
            </div>
          ) : data && (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                {data.total} {t('browse.decksFound')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.decks.map((deck, index) => (
                  <PublicDeckCard
                    key={deck.id}
                    deck={deck}
                    index={index}
                    onCopy={handleCopy}
                    isCopying={copyingDeckId === deck.id}
                  />
                ))}
              </div>

              {/* Pagination */}
              {data.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    type="button"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="inline-flex items-center gap-1 min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t('browse.previous')}
                  </button>

                  <span className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400">
                    {t('browse.pageXofY', { current: page, total: data.totalPages })}
                  </span>

                  <button
                    type="button"
                    onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                    disabled={page === data.totalPages}
                    className="inline-flex items-center gap-1 min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('browse.next')}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
