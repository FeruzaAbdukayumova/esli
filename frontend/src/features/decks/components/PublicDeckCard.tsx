import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layers, Copy, User, Loader2 } from 'lucide-react'
import type { PublicDeck } from '@/features/decks/types'

const CARD_COLORS = [
  'border-t-primary-500',
  'border-t-emerald-500',
  'border-t-amber-500',
  'border-t-rose-500',
  'border-t-violet-500',
  'border-t-cyan-500',
] as const

function parseTags(tagsString: string): string[] {
  if (!tagsString) return []
  return tagsString.split(',').map(t => t.trim()).filter(Boolean)
}

interface PublicDeckCardProps {
  deck: PublicDeck
  index: number
  onCopy: (deckId: string) => void
  isCopying: boolean
}

export function PublicDeckCard({ deck, index, onCopy, isCopying }: PublicDeckCardProps) {
  const { t } = useTranslation()
  const accentClass = CARD_COLORS[index % CARD_COLORS.length]
  const tags = parseTags(deck.categoryTags)

  return (
    <div className={`group relative flex flex-col bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-lg transition-[box-shadow,border-color] duration-200 p-4 md:p-6 border-t-4 ${accentClass} animate-fade-in`}>
      <Link to={`/browse/${deck.id}`} className="flex-1 min-h-0 flex flex-col">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 pr-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{deck.title}</h3>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-xs font-medium rounded-full px-3 py-1 bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300">{tag}</span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs font-medium rounded-full px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">+{tags.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
          <span className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 shrink-0" aria-hidden />
            <span>{t('deck.cardCount', { count: deck.cardCount })}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Copy className="w-4 h-4 shrink-0" aria-hidden />
            <span>{deck.copyCount} {deck.copyCount === 1 ? t('deck.copy') : t('deck.copies')}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mb-4">
          <User className="w-3.5 h-3.5 shrink-0" aria-hidden />
          <span className="truncate">{deck.owner.email}</span>
        </div>
      </Link>

      <div className="flex items-center gap-2 mt-auto pt-2">
        <button
          type="button"
          onClick={() => onCopy(deck.id)}
          disabled={isCopying}
          className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
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
      </div>
    </div>
  )
}
