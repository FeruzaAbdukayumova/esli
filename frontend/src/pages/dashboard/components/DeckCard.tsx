import { Pencil, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Deck } from '@/features/decks/types'
import type { DeckProgress } from '@/features/stats/types'

/** Stickers look hand-placed: each deck gets a small, stable tilt from a hash of its id. */
const TILTS = ['-rotate-1', 'rotate-[0.6deg]', '-rotate-[0.4deg]', 'rotate-1'] as const
function tiltFor(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return TILTS[h % TILTS.length]
}

export type ViewMode = 'grid' | 'list'

interface DeckCardProps {
  deck: Deck
  index?: number
  onStudy: (e: React.MouseEvent, deckId: string) => void
  onEdit: (e: React.MouseEvent, deckId: string) => void
  onDelete: (e: React.MouseEvent, deckId: string) => void
  isDeleting: boolean
  viewMode?: ViewMode
  /** SRS composition for the mastery bar (from dashboard stats) */
  progress?: DeckProgress
}

export function DeckCard({ deck, onStudy, onEdit, onDelete, isDeleting, viewMode = 'grid', progress }: DeckCardProps) {
  const { t } = useTranslation()
  const cardCount = deck.cardCount ?? 0

  const learnedPct =
    progress && progress.total > 0 ? Math.round((progress.matureCount / progress.total) * 100) : null
  const started = !!progress && progress.total > 0 && progress.newCount < progress.total
  const progressLabel = !started
    ? t('desk.notStarted', 'Not started')
    : t('desk.learnedPct', '{{pct}}% learned', { pct: learnedPct ?? 0 })

  const activate = (e: React.MouseEvent | React.KeyboardEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    onStudy(e as React.MouseEvent, deck.id)
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      activate(e)
    }
  }

  const tilt = tiltFor(deck.id)

  const actions = (
    <div className="flex items-center gap-1 shrink-0 md:rounded-xl md:bg-white md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-150">
      <button
        type="button"
        onClick={(e) => onEdit(e, deck.id)}
        className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-ink/60 hover:text-ink hover:bg-ink/10 active:scale-[0.95] transition-[transform,color,background-color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky"
        aria-label={t('deck.editDeck')}
        title={t('deck.editDeck')}
      >
        <Pencil className="w-4 h-4" aria-hidden />
      </button>
      <button
        type="button"
        onClick={(e) => onDelete(e, deck.id)}
        disabled={isDeleting}
        className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-ink/60 hover:text-again hover:bg-ink/10 active:scale-[0.95] transition-[transform,color,background-color] duration-150 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-again"
        aria-label={t('deck.deleteDeck')}
        title={t('deck.deleteDeck')}
      >
        {isDeleting ? (
          <span className="w-4 h-4 border-2 border-again border-t-transparent rounded-full animate-spin" aria-hidden />
        ) : (
          <Trash2 className="w-4 h-4" aria-hidden />
        )}
      </button>
    </div>
  )

  const bar = (
    <div className="h-3 flex-1 overflow-hidden rounded-full border-2 border-ink bg-white">
      <div className="h-full bg-grass" style={{ width: `${learnedPct ?? 0}%` }} />
    </div>
  )

  const shell =
    'sticker group relative cursor-pointer transition-transform duration-150 ease-out hover:-translate-y-1 hover:rotate-0 active:translate-y-0 active:scale-[0.99] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-canvas'

  if (viewMode === 'list') {
    return (
      <div className={`${shell} flex items-center gap-4 !rounded-[18px] px-4 py-3`} onClick={activate} onKeyDown={onKeyDown} role="button" tabIndex={0}>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-sm truncate">{deck.title}</h3>
          <p className="mt-0.5 text-sm text-ink/65 truncate">
            {t('deck.cardCount', { count: cardCount })}
            {deck.categoryTags.length > 0 && `, ${deck.categoryTags.join(', ')}`}
          </p>
        </div>
        <div className="hidden sm:flex w-40 items-center gap-3">
          {bar}
          <span className="w-20 text-right text-xs text-ink/65">{progressLabel}</span>
        </div>
        {actions}
      </div>
    )
  }

  return (
    <div className={`${shell} ${tilt} flex flex-col min-h-[148px] p-5`} onClick={activate} onKeyDown={onKeyDown} role="button" tabIndex={0}>
      <div className="flex items-start gap-2">
        <h3 className="flex-1 min-w-0 font-display text-base leading-snug line-clamp-2 hyphens-auto [overflow-wrap:anywhere]">
          {deck.title}
        </h3>
        <div className="-mr-2 -mt-1.5 md:absolute md:right-3 md:top-3 md:m-0">{actions}</div>
      </div>
      <p className="mt-1 text-sm text-ink/65">{t('deck.cardCount', { count: cardCount })}</p>
      <div className="mt-auto pt-5 flex items-center gap-3">
        {bar}
        <span className="text-xs font-medium text-ink/65">{progressLabel}</span>
      </div>
    </div>
  )
}
