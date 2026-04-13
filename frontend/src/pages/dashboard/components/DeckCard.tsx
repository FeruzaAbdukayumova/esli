import { Play, Pencil, Trash2, Layers, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useCards } from '@/features/decks/hooks'
import type { Deck } from '@/features/decks/types'

const CARD_ACCENT_COLORS = [
  'border-t-indigo-500',
  'border-t-emerald-500',
  'border-t-amber-500',
  'border-t-rose-500',
  'border-t-violet-500',
] as const

const CARD_ACCENT_BG = [
  'bg-indigo-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-violet-500',
] as const

function formatDeckDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export type ViewMode = 'grid' | 'list'

interface DeckCardProps {
  deck: Deck
  index: number
  onStudy: (e: React.MouseEvent, deckId: string) => void
  onEdit: (e: React.MouseEvent, deckId: string) => void
  onDelete: (e: React.MouseEvent, deckId: string) => void
  isDeleting: boolean
  viewMode?: ViewMode
}

export function DeckCard({ deck, index, onStudy, onEdit, onDelete, isDeleting, viewMode = 'grid' }: DeckCardProps) {
  const { t } = useTranslation()
  const { data: cards = [] } = useCards(deck.id)
  const accentClass = CARD_ACCENT_COLORS[index % CARD_ACCENT_COLORS.length]

  const cardContent = (
    <>
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="absolute top-4 right-4 flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => onDelete(e, deck.id)}
            disabled={isDeleting}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
            aria-label={t('deck.deleteDeck')}
            title={t('deck.deleteDeck')}
          >
            {isDeleting ? (
              <span className="inline-block w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" aria-hidden />
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
          </button>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 pr-10 min-w-0 truncate">
          {deck.title}
        </h3>
        {deck.categoryTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {deck.categoryTags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-medium rounded-full px-3 py-1 bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden />
            <span>{t('deck.cardCount', { count: cards.length })}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden />
            <span>{formatDeckDate(deck.createdAt)}</span>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-auto pt-3 transition-opacity duration-200">
        <button
          type="button"
          onClick={(e) => onStudy(e, deck.id)}
          className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-lg text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label={t('deck.studyDeck')}
          title={t('deck.studyDeck')}
        >
          <Play className="w-4 h-4" />
          {t('deck.study')}
        </button>
        <button
          type="button"
          onClick={(e) => onEdit(e, deck.id)}
          className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500"
          aria-label={t('deck.editDeck')}
          title={t('deck.editDeck')}
        >
          <Pencil className="w-4 h-4" />
          {t('deck.edit')}
        </button>
      </div>
    </>
  )

  if (viewMode === 'list') {
    return (
      <div
        className="group relative bg-white dark:bg-slate-800/50 rounded-2xl shadow-elevation-sm border border-slate-200 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-elevation-md transition-[box-shadow,border-color,background-color] duration-200 p-4 cursor-pointer border-l-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
        style={{ borderLeftColor: 'var(--tw-border-opacity, 1)' }}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('button')) return
          onStudy(e, deck.id)
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (!(e.target as HTMLElement).closest('button')) onStudy(e as unknown as React.MouseEvent, deck.id)
          }
        }}
      >
        <div className={`w-1 rounded-full self-stretch shrink-0 ${CARD_ACCENT_BG[index % CARD_ACCENT_BG.length]}`} aria-hidden />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 truncate">{deck.title}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-slate-500 dark:text-slate-400">
            {deck.categoryTags.length > 0 && (
              <>
                {deck.categoryTags.map((tag, idx) => (
                  <span key={idx} className="text-xs rounded-full px-2 py-0.5 bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300">{tag}</span>
                ))}
                <span className="text-slate-300 dark:text-slate-600">·</span>
              </>
            )}
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" aria-hidden />
              {t('deck.cardCount', { count: cards.length })}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" aria-hidden />
              {formatDeckDate(deck.createdAt)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button type="button" onClick={(e) => onStudy(e, deck.id)} className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30" aria-label={t('deck.studyDeck')} title={t('deck.studyDeck')}><Play className="w-5 h-5" /></button>
          <button type="button" onClick={(e) => onEdit(e, deck.id)} className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" aria-label={t('deck.editDeck')} title={t('deck.editDeck')}><Pencil className="w-5 h-5" /></button>
          <button type="button" onClick={(e) => onDelete(e, deck.id)} disabled={isDeleting} className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" aria-label={t('deck.deleteDeck')} title={t('deck.deleteDeck')}>
            {isDeleting ? <span className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" aria-hidden /> : <Trash2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`group relative flex flex-col min-h-full bg-white dark:bg-slate-800/50 rounded-2xl shadow-elevation-sm border border-slate-200 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-xl hover:shadow-primary-500/10 dark:hover:shadow-primary-500/5 transition-[transform,box-shadow,border-color] duration-200 p-5 md:p-7 cursor-pointer border-t-4 hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${accentClass}`}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) return
        onStudy(e, deck.id)
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (!(e.target as HTMLElement).closest('button')) onStudy(e as unknown as React.MouseEvent, deck.id)
        }
      }}
    >
      {cardContent}
    </div>
  )
}
