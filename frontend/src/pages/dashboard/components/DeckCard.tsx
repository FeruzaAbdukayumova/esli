import { Play, Pencil, Trash2, Layers, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Deck } from '@/features/decks/types'
import type { DeckProgress } from '@/features/stats/types'

/** Per-deck identity gradients — rotated by position, first slot follows the theme. */
const CARD_GRADIENTS = [
  'from-primary-600 to-primary-500',
  'from-sky-600 to-sky-500',
  'from-emerald-600 to-emerald-500',
  'from-amber-500 to-orange-500',
  'from-rose-600 to-rose-500',
] as const

const CARD_ACCENT_BG = [
  'bg-primary-500',
  'bg-sky-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
] as const

function formatDeckDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale, {
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
  /** SRS composition for the mastery bar (from dashboard stats) */
  progress?: DeckProgress
}

export function DeckCard({ deck, index, onStudy, onEdit, onDelete, isDeleting, viewMode = 'grid', progress }: DeckCardProps) {
  const { t, i18n } = useTranslation()
  const cardCount = deck.cardCount ?? 0
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length]

  const masteredPct =
    progress && progress.total > 0 ? Math.round((progress.matureCount / progress.total) * 100) : null

  if (viewMode === 'list') {
    return (
      <div
        className="group relative bg-white dark:bg-slate-800/50 rounded-2xl shadow-elevation-sm border border-slate-200 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-elevation-md transition-[box-shadow,border-color,background-color] duration-200 p-4 cursor-pointer flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
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
              {t('deck.cardCount', { count: cardCount })}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" aria-hidden />
              {formatDeckDate(deck.createdAt, i18n.language)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button type="button" onClick={(e) => onStudy(e, deck.id)} className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" aria-label={t('deck.studyDeck')} title={t('deck.studyDeck')}><Play className="w-5 h-5" /></button>
          <button type="button" onClick={(e) => onEdit(e, deck.id)} className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400" aria-label={t('deck.editDeck')} title={t('deck.editDeck')}><Pencil className="w-5 h-5" /></button>
          <button type="button" onClick={(e) => onDelete(e, deck.id)} disabled={isDeleting} className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500" aria-label={t('deck.deleteDeck')} title={t('deck.deleteDeck')}>
            {isDeleting ? <span className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" aria-hidden /> : <Trash2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="group relative flex flex-col min-h-full overflow-hidden bg-white dark:bg-slate-800/60 rounded-2xl shadow-elevation-sm border border-slate-200 dark:border-slate-700/60 hover:border-primary-400/60 dark:hover:border-primary-500/60 hover:shadow-glow-md transition-[box-shadow,border-color,transform] duration-200 ease-smooth cursor-pointer hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 active:scale-[0.98]"
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
      {/* Identity header */}
      <div className={`relative bg-gradient-to-br ${gradient} px-5 py-4`}>
        <h3 className="text-base font-bold text-white pr-10 truncate">{deck.title}</h3>
        {deck.categoryTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {deck.categoryTags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-[10px] font-medium rounded-full px-2 py-0.5 bg-white/20 text-white">
                {tag}
              </span>
            ))}
            {deck.categoryTags.length > 3 && (
              <span className="text-[10px] font-medium rounded-full px-2 py-0.5 bg-white/15 text-white/80" title={deck.categoryTags.slice(3).join(', ')}>
                {t('dashboard.moreTags', '+{{count}} more', { count: deck.categoryTags.length - 3 })}
              </span>
            )}
          </div>
        )}
        <button
          type="button"
          onClick={(e) => onDelete(e, deck.id)}
          disabled={isDeleting}
          className="absolute top-2.5 right-2.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/15 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:opacity-60"
          aria-label={t('deck.deleteDeck')}
          title={t('deck.deleteDeck')}
        >
          {isDeleting ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col px-5 pt-4 pb-5">
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden />
            <span>{t('deck.cardCount', { count: cardCount })}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden />
            <span>{formatDeckDate(deck.createdAt, i18n.language)}</span>
          </span>
        </div>

        {/* Mastery composition */}
        {progress && progress.total > 0 && (
          <div className="mt-3">
            <div className="flex h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
              <div className="bg-emerald-500" style={{ width: `${(progress.matureCount / progress.total) * 100}%` }} />
              <div className="bg-amber-400" style={{ width: `${(progress.learningCount / progress.total) * 100}%` }} />
              <div className="bg-slate-200 dark:bg-slate-600" style={{ width: `${(progress.newCount / progress.total) * 100}%` }} />
            </div>
            {masteredPct !== null && (
              <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                {t('dashboard.masteredPct', '{{pct}}% mastered', { pct: masteredPct })}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 mt-auto pt-4">
          <button
            type="button"
            onClick={(e) => onStudy(e, deck.id)}
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label={t('deck.studyDeck')}
            title={t('deck.studyDeck')}
          >
            <Play className="w-4 h-4" />
            {t('deck.study')}
          </button>
          <button
            type="button"
            onClick={(e) => onEdit(e, deck.id)}
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500"
            aria-label={t('deck.editDeck')}
            title={t('deck.editDeck')}
          >
            <Pencil className="w-4 h-4" />
            {t('deck.edit')}
          </button>
        </div>
      </div>
    </div>
  )
}
