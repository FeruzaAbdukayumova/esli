import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { useCards } from '@/features/decks/hooks'
import { getDueCardsWithLimit } from '@/features/study/scheduler'
import { guestStorage } from '@/shared/lib/guestStorage'
import { stripHtml } from '@/shared/lib/htmlUtils'
import type { DashboardStats } from '@/features/stats/types'
import { CREATE_INPUT_ID } from '../constants'

/**
 * The home screen's hero is the product itself: the front of the next card
 * you'll review. Tapping it (or the button) starts the session.
 */
export function NextCard({ stats }: { stats: DashboardStats }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useAuthContext()

  // Deck to study: the last one you studied if it still has open cards,
  // otherwise the deck with the most unfinished cards.
  const deck = useMemo(() => {
    const open = stats.deckProgress
      .filter((d) => d.newCount + d.learningCount > 0)
      .sort((a, b) => b.newCount + b.learningCount - (a.newCount + a.learningCount))
    const last = stats.lastStudiedDeck
    return (last && open.find((d) => d.deckId === last.id)) ?? open[0] ?? null
  }, [stats.deckProgress, stats.lastStudiedDeck])

  const { data: cards = [], isLoading } = useCards(deck?.deckId ?? '')
  const dailyLimit = user
    ? (user.daily_new_card_limit ?? 20)
    : (guestStorage.read().settings?.dailyNewCardLimit ?? 20)

  const next = useMemo(
    () => (deck ? getDueCardsWithLimit(cards, dailyLimit, deck.deckId)[0] : undefined),
    [cards, dailyLimit, deck],
  )

  const due = stats.cardsDueToday
  const hasCards = stats.totalCards > 0
  const canStudy = due > 0 && !!deck
  const minutes = Math.max(1, Math.round(due * 0.25))
  const start = () => deck && navigate(`/study/${deck.deckId}`)
  const focusCreate = () => document.getElementById(CREATE_INPUT_ID)?.focus()

  const front = next?.frontText ? stripHtml(next.frontText).trim() : ''

  const face = 'sticker relative flex min-h-[210px] w-full -rotate-[1.5deg] flex-col p-6 text-left'

  return (
    <section className="flex flex-col" aria-label={t('next.aria', 'Up next')}>
      <p className="mb-3 text-sm font-semibold text-fg">
        {canStudy
          ? t('next.fromDeck', 'Up next, from {{deck}}', { deck: deck?.title })
          : t('next.today', 'Today')}
      </p>

      {canStudy ? (
        <button
          type="button"
          onClick={start}
          className={`${face} bg-sky transition-transform duration-150 ease-out hover:-translate-y-1 hover:rotate-0 active:translate-y-0 active:scale-[0.99] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sun focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`}
          aria-label={t('next.studyAria', 'Start reviewing {{count}} cards', { count: due })}
        >
          <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[3deg] bg-sun/80" aria-hidden />
          <span className="flex flex-1 items-center">
            {isLoading ? (
              <span className="h-8 w-2/3 animate-pulse rounded-lg bg-ink/10" aria-hidden />
            ) : (
              <span className="font-display line-clamp-4 break-words text-[1.75rem] leading-[1.1] text-ink sm:text-[2rem]">
                {front || t('next.cardFallback', 'Your next card is ready')}
              </span>
            )}
          </span>
          <span className="mt-4 text-sm font-medium text-ink/70">{t('next.tapHint', 'Tap to answer')}</span>
        </button>
      ) : (
        <div className={`${face} bg-mint`}>
          <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[3deg] bg-sun/80" aria-hidden />
          <span className="flex flex-1 flex-col justify-center">
            <span className="font-display text-2xl leading-tight text-ink">
              {hasCards ? t('next.doneTitle', 'All done for today') : t('next.emptyTitle', 'No cards to review yet')}
            </span>
            <span className="mt-2 text-ink/75">
              {hasCards
                ? t('next.doneBody', 'New reviews show up tomorrow. Want more words? Make a new deck.')
                : t('next.emptyBody', 'Add cards to a deck, or make a deck from any topic.')}
            </span>
          </span>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        {canStudy ? (
          <>
            <button type="button" onClick={start} className="btn-brand min-h-[52px] px-7 text-base">
              {t('next.review', 'Review {{count}} cards', { count: due })}
            </button>
            <span className="text-sm text-muted">{t('next.minutes', 'About {{count}} min', { count: minutes })}</span>
          </>
        ) : (
          <button type="button" onClick={focusCreate} className="btn-quiet min-h-[48px] px-6 text-base">
            {t('next.makeDeck', 'Make a new deck')}
          </button>
        )}
      </div>
    </section>
  )
}
