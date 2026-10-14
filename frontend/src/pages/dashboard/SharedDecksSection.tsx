import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Loader2, AlertTriangle } from 'lucide-react'
import { Skeleton } from '@/shared/ui/Skeleton'
import { usePublicDecks, useCopyDeck } from '@/features/decks/publicHooks'
import { useDecks } from '@/features/decks/hooks'
import type { PublicDeck } from '@/features/decks/types'

const SHOWN = 4

interface DeckRowProps {
  deck: PublicDeck
  onCopy: (deckId: string) => void
  isCopying: boolean
  /** id of the user's new deck once copied */
  copiedDeckId?: string
}

function DeckRow({ deck, onCopy, isCopying, copiedDeckId }: DeckRowProps) {
  const { t } = useTranslation()
  const action =
    'btn-quiet shrink-0 min-h-[40px] min-w-[88px] px-3 text-sm'

  return (
    <li className="flex items-center gap-4 py-3">
      <Link
        to={`/browse/${deck.id}`}
        className="flex-1 min-w-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <span className="block truncate font-bold text-ink hover:underline underline-offset-4">
          {deck.title}
        </span>
        <span className="block text-sm text-ink/65">{t('deck.cardCount', { count: deck.cardCount })}</span>
      </Link>
      {copiedDeckId ? (
        <Link to={`/deck/${copiedDeckId}`} className={action}>
          {t('dashboard.openCopiedDeck', 'Open deck')}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => onCopy(deck.id)}
          disabled={isCopying}
          className={action}
          title={t('dashboard.copyToLibrary')}
        >
          {isCopying ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden /> : t('dashboard.copyAction')}
        </button>
      )}
    </li>
  )
}

interface SharedDecksSectionProps {
  categoryFilter?: string | null
}

export function SharedDecksSection({ categoryFilter }: SharedDecksSectionProps) {
  const { t } = useTranslation()
  const { data, isLoading, error } = usePublicDecks({
    perPage: 12,
    sortBy: 'popular',
    ...(categoryFilter ? { category: categoryFilter } : {}),
  })
  const { data: myDecks = [] } = useDecks()
  const copyDeckMutation = useCopyDeck()
  const [copyingDeckId, setCopyingDeckId] = useState<string | null>(null)
  const [copiedDeckIds, setCopiedDeckIds] = useState<Record<string, string>>({})

  // Copies keep the original title, so hide decks the user already has
  // (unless they just copied it here, so the "Open deck" state stays visible).
  const suggestions = useMemo(() => {
    const owned = new Set(myDecks.map((d) => d.title.trim().toLowerCase()))
    return (data?.decks ?? [])
      .filter((d) => copiedDeckIds[d.id] || !owned.has(d.title.trim().toLowerCase()))
      .slice(0, SHOWN)
  }, [data, myDecks, copiedDeckIds])

  const handleCopy = async (deckId: string) => {
    setCopyingDeckId(deckId)
    try {
      const result = await copyDeckMutation.mutateAsync(deckId)
      toast.success(t('toast.deckCopied'))
      setCopiedDeckIds((prev) => ({ ...prev, [deckId]: result.id }))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.failedToCopyDeck'))
    } finally {
      setCopyingDeckId(null)
    }
  }

  const header = (
    <div className="flex items-end justify-between gap-3 mb-2">
      <h2 className="font-display text-lg text-fg">
        {t('desk.readyMade', 'Ready-made decks')}
      </h2>
      <Link
        to="/browse"
        className="text-sm font-medium text-fg underline decoration-brand/50 underline-offset-4 hover:decoration-brand rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {t('dashboard.browseAll')}
      </Link>
    </div>
  )

  if (isLoading) {
    return (
      <section>
        {header}
        <ul className="sticker divide-y-2 divide-ink/15 px-4" aria-hidden>
          {[1, 2, 3].map((i) => (
            <li key={i} className="py-3">
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-3 w-16" />
            </li>
          ))}
        </ul>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        {header}
        <p className="flex items-center gap-2 text-sm font-medium text-again">
          <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden />
          {t('dashboard.failedToLoadCommunityDecks')}
        </p>
      </section>
    )
  }

  if (suggestions.length === 0) return null

  return (
    <section>
      {header}
      <ul className="sticker divide-y-2 divide-ink/15 px-4">
        {suggestions.map((deck) => (
          <DeckRow
            key={deck.id}
            deck={deck}
            onCopy={handleCopy}
            isCopying={copyingDeckId === deck.id}
            copiedDeckId={copiedDeckIds[deck.id]}
          />
        ))}
      </ul>
    </section>
  )
}
