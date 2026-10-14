import { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
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
  const { user } = useAuthContext()
  const { logout } = useAuth()
  const { mode } = useDeckRepo()
  const syncImportMutation = useSyncImport()

  const guestData = useMemo(() => guestStorage.read(), [])
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
  // Maps public deck id -> the user's new copied deck id
  const [copiedDeckIds, setCopiedDeckIds] = useState<Record<string, string>>({})
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      setSearchQuery(searchInput)
      setPage(1)
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [searchInput])

  const { data, error } = usePublicDecks({
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
      const deckTitle = data?.decks.find(d => d.id === deckId)?.title
      toast.success(
        deckTitle
          ? t('browse.copiedToLibrary', '"{{title}}" copied to your library', { title: deckTitle })
          : t('toast.deckCopied'),
      )
      setCopiedDeckIds(prev => ({ ...prev, [deckId]: result.id }))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.failedToCopyDeck'))
    } finally {
      setCopyingDeckId(null)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Apply the pending query immediately on Enter; only reset pagination if it changed
    if (searchInput !== searchQuery) {
      clearTimeout(debounceRef.current)
      setSearchQuery(searchInput)
      setPage(1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <DashboardNavbar
        user={user}
        isApiMode={mode === 'api'}
        hasGuestDecksToSave={hasGuestDecksToSave}
        isSyncing={syncImportMutation.isPending}
        onSaveGuestDecks={handleSaveGuestDecks}
        onLogout={logout}
      />

      <main className="relative flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 md:mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-muted">
            <li>
              <Link
                to="/"
                className="rounded font-medium underline decoration-brand/40 underline-offset-4 hover:text-fg hover:decoration-brand active:opacity-70 transition-[color,opacity] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {t('common.home')}
              </Link>
            </li>
            <li><ChevronRight className="w-4 h-4 shrink-0" aria-hidden /></li>
            <li className="font-bold text-fg" aria-current="page">{t('browse.title')}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex flex-col gap-5 mb-8">
          <div>
            <h1 className="font-display text-[1.75rem] leading-[1.1] md:text-[2.25rem] text-fg [text-wrap:balance]">
              {t('browse.title')}
            </h1>
            <p className="mt-2 max-w-[60ch] text-base text-muted">
              {t('browse.subtitle')}
            </p>
          </div>

          {/* Search and sort */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <form onSubmit={handleSearch} className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" aria-hidden />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t('browse.searchPlaceholder')}
                className="field pl-10"
                aria-label={t('browse.searchLabel')}
              />
            </form>

            <div className="flex items-center gap-2 min-w-0">
              <span id="sort-public" className="text-sm font-bold text-fg shrink-0">{t('browse.sort')}</span>
              <div role="group" aria-labelledby="sort-public" className="flex flex-wrap gap-2">
                {SORT_OPTIONS.map(opt => {
                  const Icon = opt.icon
                  const selected = sortBy === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setSortBy(opt.value)
                        setPage(1)
                      }}
                      className={`btn-sticker shrink-0 min-h-[40px] px-3 text-sm font-bold ${selected ? 'bg-sky' : 'bg-white'}`}
                    >
                      <Icon className="w-4 h-4" aria-hidden />
                      {t(opt.labelKey)}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {error ? (
          <div className="sheet text-center py-12 px-4 max-w-lg mx-auto">
            <p className="text-lg font-bold text-again mb-2">{t('browse.failedToLoadDecks')}</p>
            <p className="text-sm text-muted">
              {error instanceof Error ? error.message : t('browse.tryAgainLater', 'Please try again later')}
            </p>
          </div>
        ) : !data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="sticker p-5 min-h-[180px]" aria-hidden>
                <div className="h-5 bg-ink/10 rounded-lg w-3/4 mb-3 animate-pulse" />
                <div className="flex gap-2 mb-3">
                  <div className="h-5 bg-ink/10 rounded-lg w-16 animate-pulse" />
                  <div className="h-5 bg-ink/10 rounded-lg w-20 animate-pulse" />
                </div>
                <div className="h-4 bg-ink/10 rounded w-1/2 mb-4 animate-pulse" />
                <div className="h-11 bg-ink/10 rounded-[18px] w-full animate-pulse" />
              </div>
            ))}
          </div>
        ) : data.decks.length === 0 ? (
          <div className="sheet text-center py-12 px-4 max-w-lg mx-auto">
            <Globe className="w-12 h-12 mx-auto text-muted mb-4" aria-hidden />
            <p className="font-display text-lg text-fg mb-2">
              {searchQuery ? t('browse.noDecksFound') : t('browse.noPublicDecksYet')}
            </p>
            <p className="text-sm text-muted">
              {searchQuery ? t('browse.tryAdjustingSearch') : t('browse.beTheFirst')}
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-muted mb-5">
              {t('browse.decksFoundCount', '{{count}} decks found', { count: data.total })}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.decks.map((deck) => (
                <PublicDeckCard
                  key={deck.id}
                  deck={deck}
                  onCopy={handleCopy}
                  isCopying={copyingDeckId === deck.id}
                  copiedDeckId={copiedDeckIds[deck.id] ?? null}
                />
              ))}
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  type="button"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn-quiet min-h-[44px] px-3 sm:px-4 text-sm"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden />
                  {t('browse.previous')}
                </button>

                <span className="px-2 sm:px-4 py-2 text-sm font-medium text-muted">
                  {t('browse.pageXofY', { current: page, total: data.totalPages })}
                </span>

                <button
                  type="button"
                  onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                  disabled={page === data.totalPages}
                  className="btn-quiet min-h-[44px] px-3 sm:px-4 text-sm"
                >
                  {t('browse.next')}
                  <ChevronRight className="w-4 h-4" aria-hidden />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
