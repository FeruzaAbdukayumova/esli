import { useState, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  ChevronRight,
  Layers,
  Copy,
  User,
  Loader2,
  ArrowLeft,
  Check,
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
import { RichTextDisplay } from '@/shared/ui/RichTextDisplay'
import { DashboardNavbar } from '@/pages/dashboard/components/DashboardNavbar'

export function PublicDeckDetailPage() {
  const { t } = useTranslation()
  const { deckId } = useParams<{ deckId: string }>()
  const { user } = useAuthContext()
  const { logout } = useAuth()
  const { mode } = useDeckRepo()
  const syncImportMutation = useSyncImport()
  const [isCopying, setIsCopying] = useState(false)
  // Id of the user's copied deck once the copy succeeded
  const [copiedDeckId, setCopiedDeckId] = useState<string | null>(null)

  const guestData = useMemo(() => guestStorage.read(), [])
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
      toast.success(
        deck
          ? t('browse.copiedToLibrary', '"{{title}}" copied to your library', { title: deck.title })
          : t('toast.deckCopied'),
      )
      setCopiedDeckId(result.id)
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
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <DashboardNavbar
        user={user}
        isApiMode={mode === 'api'}
        hasGuestDecksToSave={hasGuestDecksToSave}
        isSyncing={syncImportMutation.isPending}
        onSaveGuestDecks={handleSaveGuestDecks}
        onLogout={logout}
      />

      <main className="relative flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 md:mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-muted min-w-0">
            <li className="shrink-0">
              <Link to="/" className="rounded font-medium underline decoration-brand/40 underline-offset-4 hover:text-fg hover:decoration-brand active:opacity-70 transition-[color,opacity] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">{t('common.home')}</Link>
            </li>
            <li className="shrink-0"><ChevronRight className="w-4 h-4 shrink-0" aria-hidden /></li>
            <li className="shrink-0">
              <Link to="/browse" className="rounded font-medium underline decoration-brand/40 underline-offset-4 hover:text-fg hover:decoration-brand active:opacity-70 transition-[color,opacity] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">{t('nav.browse')}</Link>
            </li>
            <li className="shrink-0"><ChevronRight className="w-4 h-4 shrink-0" aria-hidden /></li>
            <li className="font-bold text-fg truncate min-w-0" aria-current="page">
              {deck?.title ?? t('common.loading')}
            </li>
          </ol>
        </nav>

        {/* Loading state */}
        {isLoading && !deck && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted" />
          </div>
        )}

        {/* Error state */}
        {deckError && (
          <div className="sheet text-center py-12 px-4 max-w-lg mx-auto">
            <p className="text-lg font-bold text-again mb-2">{t('deck.deckNotFound')}</p>
            <p className="text-sm text-muted mb-6">
              {t('browse.deckUnavailable')}
            </p>
            <Link to="/browse" className="btn-quiet min-h-[44px] px-4 text-sm">
              <ArrowLeft className="w-4 h-4" aria-hidden />
              {t('browse.backToBrowse')}
            </Link>
          </div>
        )}

        {/* Deck detail */}
        {deck && (
          <>
            {/* Deck header */}
            <div className="mb-10">
              <h1 className="font-display text-[1.75rem] leading-[1.1] md:text-[2.25rem] text-fg mb-3 [text-wrap:balance] [overflow-wrap:anywhere]">
                {deck.title}
              </h1>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="text-xs font-bold rounded-lg border-2 border-ink bg-mint px-2 py-0.5 text-ink">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-muted mb-6">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 shrink-0" aria-hidden />
                  <span>{t('deck.cardCount', { count: deck.cardCount })}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Copy className="w-4 h-4 shrink-0" aria-hidden />
                  <span>{deck.copyCount} {deck.copyCount === 1 ? t('deck.copy') : t('deck.copies')}</span>
                </span>
                <span className="flex items-center gap-1.5 min-w-0">
                  <User className="w-4 h-4 shrink-0" aria-hidden />
                  <span className="truncate">{deck.owner.username || t('browse.communityAuthor', 'Community member')}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                {copiedDeckId ? (
                  <Link to={`/deck/${copiedDeckId}`} className="btn-quiet !bg-mint min-h-[52px] px-6 text-base w-full sm:w-auto">
                    <Check className="w-4 h-4" aria-hidden />
                    {t('browse.copied', 'Copied')}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={isCopying}
                    className="btn-brand min-h-[52px] px-6 text-base w-full sm:w-auto"
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
                )}
              </div>
            </div>

            {/* Cards section */}
            <div>
              <h2 className="font-display text-lg text-fg mb-5">
                {cards && cards.length < deck.cardCount
                  ? t('browse.showingFirst', 'Showing first {{count}} cards', { count: cards.length })
                  : `${t('browse.cardsCount')} (${deck.cardCount})`}
              </h2>

              {cardsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="sticker !rounded-[18px] p-4" aria-hidden>
                      <div className="flex gap-4 animate-pulse">
                        <div className="flex-1">
                          <div className="h-4 bg-ink/10 rounded w-3/4 mb-2" />
                          <div className="h-3 bg-ink/10 rounded w-1/2" />
                        </div>
                        <div className="flex-1">
                          <div className="h-4 bg-ink/10 rounded w-2/3 mb-2" />
                          <div className="h-3 bg-ink/10 rounded w-1/3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : cards && cards.length > 0 ? (
                <div className="space-y-4">
                  {/* Header row */}
                  <div className="hidden sm:grid sm:grid-cols-2 gap-4 px-5 text-sm font-bold text-muted">
                    <span>{t('deck.frontLabel')}</span>
                    <span>{t('deck.backLabel')}</span>
                  </div>

                  {cards.map((card, index) => (
                    <div key={card.id} className="sticker !rounded-[18px] p-4 sm:px-5">
                      <div className="flex flex-col sm:flex-row sm:gap-4">
                        {/* Front */}
                        <div className="flex-1 min-w-0">
                          <span className="sm:hidden text-xs font-bold text-ink/55 mb-1 block">{t('deck.frontLabel')}</span>
                          {card.frontText ? (
                            <RichTextDisplay content={card.frontText} className="text-[15px] font-semibold text-ink break-words" />
                          ) : (
                            <p className="text-sm italic text-ink/50">{t('deck.noFrontText')}</p>
                          )}
                          {card.frontImageUrl && (
                            <img src={card.frontImageUrl} alt="" className="mt-2 max-h-24 rounded-lg border-2 border-ink" />
                          )}
                        </div>

                        {/* Divider */}
                        <div className="my-3 sm:my-0 border-t-2 sm:border-t-0 sm:border-l-2 border-dashed border-ink/20" />

                        {/* Back */}
                        <div className="flex-1 min-w-0">
                          <span className="sm:hidden text-xs font-bold text-ink/55 mb-1 block">{t('deck.backLabel')}</span>
                          {card.backText ? (
                            <RichTextDisplay content={card.backText} className="text-[15px] text-ink/80 break-words" />
                          ) : (
                            <p className="text-sm italic text-ink/50">{t('deck.noBackText')}</p>
                          )}
                          {card.backImageUrl && (
                            <img src={card.backImageUrl} alt="" className="mt-2 max-h-24 rounded-lg border-2 border-ink" />
                          )}
                        </div>
                      </div>

                      {/* Card number */}
                      <div className="mt-2 text-xs font-medium text-ink/45">
                        #{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted py-8 text-center">
                  {t('browse.noCardsYet')}
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
