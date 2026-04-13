import { useState, useMemo } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  ChevronRight,
  Layers,
  Copy,
  User,
  Loader2,
  ArrowLeft,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useDeckRepo } from '@/features/decks/repo'
import { usePublicDeck, usePublicDeckCards, useCopyDeck } from '@/features/decks/publicHooks'
import { useSyncImport } from '@/features/sync/hooks'
import { guestStorage } from '@/shared/lib/guestStorage'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { stripHtml } from '@/shared/lib/htmlUtils'
import { DashboardNavbar } from '@/pages/dashboard/components/DashboardNavbar'

export function PublicDeckDetailPage() {
  const { t } = useTranslation()
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { logout } = useAuth()
  const { mode } = useDeckRepo()
  const syncImportMutation = useSyncImport()
  const [isCopying, setIsCopying] = useState(false)

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

  const { data: deck, isLoading: deckLoading, error: deckError } = usePublicDeck(deckId ?? '')
  const { data: cards, isLoading: cardsLoading } = usePublicDeckCards(deckId ?? '', 500)

  const seoDescription = useMemo(() => {
    if (!deck) return t('seo.browse.description', 'Discover and copy community flashcard decks on any topic. Free to use.')
    const tags = deck.categoryTags ? deck.categoryTags.split(',').map(t => t.trim()).filter(Boolean) : []
    const tagText = tags.length > 0 ? ` Topics: ${tags.join(', ')}.` : ''
    const sampleCards = cards?.slice(0, 3).map(c => stripHtml(c.frontText || '')).filter(Boolean).join(', ')
    const sampleText = sampleCards ? ` Sample cards: ${sampleCards}.` : ''
    const desc = `${deck.title} — ${deck.cardCount} flashcards. Free to copy and study with spaced repetition on Esli.${tagText}${sampleText}`
    return desc.length > 300 ? desc.slice(0, 297) + '...' : desc
  }, [deck, cards, t])

  const jsonLd = useMemo(() => {
    if (!deck) return null
    const tags = deck.categoryTags ? deck.categoryTags.split(',').map(t => t.trim()).filter(Boolean) : []
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      'name': deck.title,
      'description': seoDescription,
      'url': `https://app.esli.app/browse/${deck.id}`,
      'learningResourceType': 'Flashcard Deck',
      'educationalUse': 'Self-study',
      'isAccessibleForFree': true,
      ...(tags.length > 0 ? { keywords: tags.join(', ') } : {}),
      'provider': {
        '@type': 'WebApplication',
        'name': 'Esli',
        'url': 'https://app.esli.app',
      },
    }
  }, [deck, seoDescription])

  usePageMeta({
    title: deck?.title || t('seo.browse.title', 'Browse Flashcard Decks'),
    description: seoDescription,
    ogTitle: deck ? `${deck.title} — ${deck.cardCount} Flashcards | Esli` : undefined,
    ogDescription: seoDescription,
    canonical: `/browse/${deckId}`,
    jsonLd,
  })

  const copyDeckMutation = useCopyDeck()

  const handleCopy = async () => {
    if (!deckId) return

    setIsCopying(true)
    try {
      const result = await copyDeckMutation.mutateAsync(deckId)
      toast.success(t('toast.deckCopied'))
      setTimeout(() => {
        navigate(`/deck/${result.id}`)
      }, 1500)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.failedToCopyDeck'))
    } finally {
      setIsCopying(false)
    }
  }

  const isLoading = deckLoading || cardsLoading

  function parseTags(tagsString: string): string[] {
    if (!tagsString) return []
    return tagsString.split(',').map(tag => tag.trim()).filter(Boolean)
  }

  const tags = deck ? parseTags(deck.categoryTags) : []

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-x-hidden">
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
              <li>
                <Link to="/browse" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t('nav.browse')}</Link>
              </li>
              <li><ChevronRight className="w-4 h-4 shrink-0" aria-hidden /></li>
              <li className="font-medium text-slate-800 dark:text-slate-100 truncate max-w-[200px]" aria-current="page">
                {deck?.title ?? t('common.loading')}
              </li>
            </ol>
          </nav>

          {/* Loading state */}
          {isLoading && !deck && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
          )}

          {/* Error state */}
          {deckError && (
            <div className="text-center py-16 px-4">
              <p className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">{t('deck.deckNotFound')}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                {t('browse.deckUnavailable')}
              </p>
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('browse.backToBrowse')}
              </Link>
            </div>
          )}

          {/* Deck detail */}
          {deck && (
            <>
              {/* Deck header */}
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-3">
                  {deck.title}
                </h1>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.map((tag, idx) => (
                      <span key={idx} className="text-xs font-medium rounded-full px-3 py-1 bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-5">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 shrink-0" aria-hidden />
                    <span>{t('deck.cardCount', { count: deck.cardCount })}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Copy className="w-4 h-4 shrink-0" aria-hidden />
                    <span>{deck.copyCount} {deck.copyCount === 1 ? t('deck.copy') : t('deck.copies')}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 shrink-0" aria-hidden />
                    <span>{deck.owner.email}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={isCopying}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                    title={t('browse.copyToLibraryTitle')}
                  >
                    {isCopying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('browse.copying')}
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        {t('browse.copyToLibrary')}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-slate-200 dark:border-slate-700 mb-6" />

              {/* Cards section */}
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                  {t('browse.cardsCount')} ({cards?.length ?? 0})
                </h2>

                {cardsLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-600 p-4 animate-pulse">
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-3/4 mb-2" />
                            <div className="h-3 bg-slate-200 dark:bg-slate-600 rounded w-1/2" />
                          </div>
                          <div className="flex-1">
                            <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-2/3 mb-2" />
                            <div className="h-3 bg-slate-200 dark:bg-slate-600 rounded w-1/3" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : cards && cards.length > 0 ? (
                  <div className="space-y-2">
                    {/* Header row */}
                    <div className="hidden sm:grid sm:grid-cols-2 gap-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      <span>{t('deck.frontLabel')}</span>
                      <span>{t('deck.backLabel')}</span>
                    </div>

                    {cards.map((card, index) => (
                      <div
                        key={card.id}
                        className="bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-600/50 p-4 hover:border-slate-300 dark:hover:border-slate-500 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:gap-4">
                          {/* Front */}
                          <div className="flex-1 min-w-0">
                            <span className="sm:hidden text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">{t('deck.frontLabel')}</span>
                            <p className="text-sm text-slate-800 dark:text-slate-100 whitespace-pre-wrap break-words">
                              {card.frontText || <span className="italic text-slate-400 dark:text-slate-500">{t('deck.noFrontText')}</span>}
                            </p>
                            {card.frontImageUrl && (
                              <img src={card.frontImageUrl} alt="" className="mt-2 max-h-24 rounded border border-slate-200 dark:border-slate-600" />
                            )}
                          </div>

                          {/* Divider */}
                          <div className="my-2 sm:my-0 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-600/50" />

                          {/* Back */}
                          <div className="flex-1 min-w-0">
                            <span className="sm:hidden text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">{t('deck.backLabel')}</span>
                            <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap break-words">
                              {card.backText || <span className="italic text-slate-400 dark:text-slate-500">{t('deck.noBackText')}</span>}
                            </p>
                            {card.backImageUrl && (
                              <img src={card.backImageUrl} alt="" className="mt-2 max-h-24 rounded border border-slate-200 dark:border-slate-600" />
                            )}
                          </div>
                        </div>

                        {/* Card number */}
                        <div className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                          #{index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400 py-8 text-center">
                    {t('browse.noCardsYet')}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
