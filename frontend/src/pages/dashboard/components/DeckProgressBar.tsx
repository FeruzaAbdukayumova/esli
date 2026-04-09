import { useTranslation } from 'react-i18next'
import type { DeckProgress } from '@/features/stats/types'

interface DeckProgressBarProps {
  deck: DeckProgress
}

export function DeckProgressBar({ deck }: DeckProgressBarProps) {
  const { t } = useTranslation()
  if (deck.total === 0) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate min-w-0 flex-shrink-0 w-32 sm:w-40">
          {deck.title}
        </span>
        <div className="flex-1 h-3 rounded-full bg-slate-100 dark:bg-slate-700" />
        <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">{t('deck.cardCount', { count: 0 })}</span>
      </div>
    )
  }

  const newPct = (deck.newCount / deck.total) * 100
  const learningPct = (deck.learningCount / deck.total) * 100
  const maturePct = (deck.matureCount / deck.total) * 100

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate min-w-0 flex-shrink-0 w-32 sm:w-40" title={deck.title}>
        {deck.title}
      </span>
      <div className="flex-1 h-3 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden flex">
        {maturePct > 0 && (
          <div
            className="h-full bg-emerald-500 transition-[width] duration-500"
            style={{ width: `${maturePct}%` }}
            title={t('deck.matureCount', { count: deck.matureCount })}
          />
        )}
        {learningPct > 0 && (
          <div
            className="h-full bg-amber-400 transition-[width] duration-500"
            style={{ width: `${learningPct}%` }}
            title={t('deck.learningCount', { count: deck.learningCount })}
          />
        )}
        {newPct > 0 && (
          <div
            className="h-full bg-slate-300 dark:bg-slate-500 transition-[width] duration-500"
            style={{ width: `${newPct}%` }}
            title={t('deck.newCount', { count: deck.newCount })}
          />
        )}
      </div>
      <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0 tabular-nums">
        {deck.total}
      </span>
    </div>
  )
}
