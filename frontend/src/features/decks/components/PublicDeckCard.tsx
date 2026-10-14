import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layers, Copy, User, Loader2, Check } from 'lucide-react'
import type { PublicDeck } from '@/features/decks/types'

function parseTags(tagsString: string): string[] {
  if (!tagsString) return []
  return tagsString.split(',').map(t => t.trim()).filter(Boolean)
}

/** Same hand-placed tilt as the dashboard DeckCard: small, stable, from a hash of the id. */
const TILTS = ['-rotate-1', 'rotate-[0.6deg]', '-rotate-[0.4deg]', 'rotate-1'] as const
function tiltFor(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return TILTS[h % TILTS.length]
}

interface PublicDeckCardProps {
  deck: PublicDeck
  onCopy: (deckId: string) => void
  isCopying: boolean
  /** Id of the user's copied deck once the copy succeeded */
  copiedDeckId?: string | null
}

export function PublicDeckCard({ deck, onCopy, isCopying, copiedDeckId }: PublicDeckCardProps) {
  const { t } = useTranslation()
  const tags = parseTags(deck.categoryTags)
  const ownerLabel = deck.owner.username || t('browse.communityAuthor', 'Community member')
  const action = 'btn-quiet flex-1 min-h-[44px] px-4 text-sm'

  return (
    <div
      className={`sticker group relative flex flex-col min-h-[180px] p-5 ${tiltFor(deck.id)} transition-transform duration-150 ease-out hover:-translate-y-1 hover:rotate-0 focus-within:rotate-0`}
    >
      <Link
        to={`/browse/${deck.id}`}
        className="flex-1 min-h-0 flex flex-col rounded-xl focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 active:scale-[0.99] transition-transform duration-150"
      >
        <h3 className="font-display text-base leading-snug text-ink mb-2 pr-2 line-clamp-2 [overflow-wrap:anywhere] group-hover:underline decoration-2 underline-offset-4">
          {deck.title}
        </h3>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-xs font-bold rounded-lg border-2 border-ink bg-mint px-2 py-0.5 text-ink">{tag}</span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs font-bold rounded-lg border-2 border-ink/30 px-2 py-0.5 text-ink/70">+{tags.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-ink/65 mb-2">
          <span className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 shrink-0" aria-hidden />
            <span>{t('deck.cardCount', { count: deck.cardCount })}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Copy className="w-4 h-4 shrink-0" aria-hidden />
            <span>{deck.copyCount} {deck.copyCount === 1 ? t('deck.copy') : t('deck.copies')}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-ink/55 mb-4">
          <User className="w-3.5 h-3.5 shrink-0" aria-hidden />
          <span className="truncate">{ownerLabel}</span>
        </div>
      </Link>

      <div className="flex items-center gap-2 mt-auto">
        {copiedDeckId ? (
          <Link to={`/deck/${copiedDeckId}`} className={`${action} !bg-mint`}>
            <Check className="w-4 h-4" aria-hidden />
            {t('browse.copied', 'Copied')}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => onCopy(deck.id)}
            disabled={isCopying}
            className={action}
            title={t('dashboard.copyToLibrary')}
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
  )
}
