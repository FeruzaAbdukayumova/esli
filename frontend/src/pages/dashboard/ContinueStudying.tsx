import { Link } from 'react-router-dom'
import { Play, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { LastStudiedDeck } from '@/features/stats/types'

interface ContinueStudyingProps {
  lastStudiedDeck: LastStudiedDeck | null
  cardsDue?: number
}

export function ContinueStudying({ lastStudiedDeck, cardsDue }: ContinueStudyingProps) {
  const { t } = useTranslation()
  if (!lastStudiedDeck) return null

  return (
    <Link
      to={`/study/${lastStudiedDeck.id}`}
      className="group block w-full rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-600 dark:to-primary-500 shadow-md shadow-primary-200/50 dark:shadow-primary-900/40 hover:shadow-lg hover:from-primary-700 hover:to-primary-600 dark:hover:from-primary-500 dark:hover:to-primary-400 transition-all duration-200 px-4 py-3"
    >
      <div className="flex items-center gap-3">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
          <Play className="w-5 h-5 text-white fill-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-primary-200">{t('dashboard.continueStudying')}</p>
          <p className="text-sm font-bold text-white truncate">{lastStudiedDeck.title}</p>
          {cardsDue !== undefined && cardsDue > 0 && (
            <p className="text-xs text-primary-200">{t('deck.cardCount', { count: cardsDue })} {t('dashboard.due')}</p>
          )}
        </div>
        <ArrowRight className="w-4 h-4 text-primary-200 group-hover:translate-x-0.5 transition-transform shrink-0" />
      </div>
    </Link>
  )
}
