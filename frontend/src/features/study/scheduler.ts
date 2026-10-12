import { Card, CardIntervals, RecallResponse } from '@/features/decks/types'

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

// --- Daily new-card pacing (client-side, per local day) ---

const NEW_CARDS_KEY_PREFIX = 'esli-new-cards-'

function localDateStamp(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function todayNewCardsKey(): string {
  return `${NEW_CARDS_KEY_PREFIX}${localDateStamp()}`
}

/** Remove introduced-new-card counters left over from previous days. */
function pruneOldNewCardKeys(): void {
  try {
    const todayKey = todayNewCardsKey()
    const stale: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(NEW_CARDS_KEY_PREFIX) && key !== todayKey) stale.push(key)
    }
    stale.forEach((key) => localStorage.removeItem(key))
  } catch {
    /* localStorage unavailable */
  }
}

function readTodayNewCardCounts(): Record<string, number> {
  try {
    const raw = localStorage.getItem(todayNewCardsKey())
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, number>) : {}
  } catch {
    return {}
  }
}

/** How many new (never-reviewed) cards from this deck were first answered today. */
export function getNewCardsIntroducedToday(deckId: string): number {
  const count = readTodayNewCardCounts()[deckId]
  return typeof count === 'number' && count > 0 ? Math.floor(count) : 0
}

/** Record that a new card from this deck was answered for the first time today. */
export function recordNewCardIntroduced(deckId: string): void {
  try {
    pruneOldNewCardKeys()
    const counts = readTodayNewCardCounts()
    counts[deckId] = getNewCardsIntroducedToday(deckId) + 1
    localStorage.setItem(todayNewCardsKey(), JSON.stringify(counts))
  } catch {
    /* localStorage unavailable */
  }
}

/**
 * Get due cards with a daily new card limit applied.
 * Review cards (already studied, next_review_at <= now) are always included.
 * New cards (no nextReviewAt) are limited to dailyNewLimit, sorted by createdAt asc.
 * When deckId is provided, new cards already introduced today (tracked in
 * localStorage) are subtracted from the limit, so reloading doesn't serve
 * another batch of new cards.
 */
export function getDueCardsWithLimit(cards: Card[], dailyNewLimit: number, deckId?: string): Card[] {
  const now = new Date()
  const effectiveLimit = deckId
    ? Math.max(0, dailyNewLimit - getNewCardsIntroducedToday(deckId))
    : dailyNewLimit
  const reviewDue = cards.filter((c) => c.nextReviewAt && new Date(c.nextReviewAt) <= now)
  const newCards = cards
    .filter((c) => !c.nextReviewAt)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .slice(0, effectiveLimit)
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

// --- Local interval previews (guest mode) ---

const MINUTE_MS = 60_000
const HOUR_MS = 3_600_000
const DAY_MS = 86_400_000

/** Format a duration the same way the backend does ("1m", "3h", "6d", "2mo", "1y"). */
function formatIntervalMs(ms: number): string {
  if (ms < HOUR_MS) return `${Math.max(1, Math.floor(ms / MINUTE_MS))}m`
  if (ms < DAY_MS) return `${Math.floor(ms / HOUR_MS)}h`
  const days = Math.floor(ms / DAY_MS)
  if (days < 30) return `${days}d`
  if (days < 365) return `${Math.floor(days / 30)}mo`
  return `${Math.floor(days / 365)}y`
}

/**
 * Compute interval previews for each response locally, mirroring the guest
 * SM-2 rules in `features/decks/repo/localRepo.ts` (kept in sync manually).
 * Used for guests, who can't call the authenticated intervals endpoint.
 */
export function getLocalCardIntervals(card: Pick<Card, 'easeFactor' | 'interval'>): CardIntervals {
  const ease = card.easeFactor ?? 2.5
  const interval = card.interval ?? 0

  const againMs = MINUTE_MS
  const hardMs = interval === 0 ? 10 * MINUTE_MS : Math.ceil(interval * 1.2) * DAY_MS
  const goodMs =
    interval === 0 ? DAY_MS : interval === 1 ? 6 * DAY_MS : Math.ceil(interval * ease) * DAY_MS
  const easyMs = interval === 0 ? 4 * DAY_MS : Math.ceil(interval * ease * 1.3) * DAY_MS

  return {
    again: formatIntervalMs(againMs),
    hard: formatIntervalMs(hardMs),
    good: formatIntervalMs(goodMs),
    easy: formatIntervalMs(easyMs),
  }
}

/**
 * Response tooltip info for UI. Translate via t(descriptionKey, descriptionDefault).
 */
export interface ResponseInfo {
  descriptionKey: string
  descriptionDefault: string
}

export const RESPONSE_INFO: Record<RecallResponse, ResponseInfo> = {
  again: {
    descriptionKey: 'study.tooltipAgain',
    descriptionDefault: "Didn't remember",
  },
  hard: {
    descriptionKey: 'study.tooltipHard',
    descriptionDefault: 'Struggled to recall',
  },
  good: {
    descriptionKey: 'study.tooltipGood',
    descriptionDefault: 'Remembered correctly',
  },
  easy: {
    descriptionKey: 'study.tooltipEasy',
    descriptionDefault: 'Knew it instantly',
  },
}
