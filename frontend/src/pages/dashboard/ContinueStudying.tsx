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
      className="group relative block w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 shadow-glow-sm hover:shadow-glow-md transition-[box-shadow,transform] duration-200 ease-smooth hover:-translate-y-0.5 active:scale-[0.99] px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
    >
      {/* hover darkening layer (opacity animates; gradients cannot) */}
      <div className="absolute inset-0 bg-primary-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden />
      <div className="relative flex items-center gap-3">
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
