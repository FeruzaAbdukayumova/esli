import { Card, RecallResponse } from '@/features/decks/types'

/**
 * Check if a card is due for review
 */
export function isCardDue(card: Card): boolean {
  if (!card.nextReviewAt) {
    return true // Never reviewed, so it's due
  }

  const now = new Date()
  const nextReview = new Date(card.nextReviewAt)
  return nextReview <= now
}

/**
 * Get cards that are due for review
 */
export function getDueCards(cards: Card[]): Card[] {
  return cards.filter(isCardDue)
}

/**
 * Get due cards with a daily new card limit applied.
 * Review cards (already studied, next_review_at <= now) are always included.
 * New cards (no nextReviewAt) are limited to dailyNewLimit, sorted by createdAt asc.
 */
export function getDueCardsWithLimit(cards: Card[], dailyNewLimit: number): Card[] {
  const now = new Date()
  const reviewDue = cards.filter((c) => c.nextReviewAt && new Date(c.nextReviewAt) <= now)
  const newCards = cards
    .filter((c) => !c.nextReviewAt)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .slice(0, dailyNewLimit)
  return [...reviewDue, ...newCards]
}

/**
 * Get cards that are not due yet
 */
export function getNotDueCards(cards: Card[]): Card[] {
  return cards.filter((card) => !isCardDue(card))
}

/**
 * Get the earliest next review time from cards that are not due
 */
export function getEarliestNextReview(cards: Card[]): string | null {
  const notDueCards = getNotDueCards(cards)
    .filter((card) => card.nextReviewAt)
    .sort((a, b) => {
      const aTime = new Date(a.nextReviewAt!).getTime()
      const bTime = new Date(b.nextReviewAt!).getTime()
      return aTime - bTime
    })

  return notDueCards.length > 0 ? notDueCards[0].nextReviewAt! : null
}

/**
 * Response descriptions for UI
 */
export const RESPONSE_INFO: Record<RecallResponse, { label: string; description: string; color: string }> = {
  again: {
    label: 'Again',
    description: "Didn't remember",
    color: 'red',
  },
  hard: {
    label: 'Hard',
    description: 'Struggled to recall',
    color: 'orange',
  },
  good: {
    label: 'Good',
    description: 'Remembered correctly',
    color: 'blue',
  },
  easy: {
    label: 'Easy',
    description: 'Knew it instantly',
    color: 'green',
  },
}
