import { guestStorage, type GuestData, type GuestReviewLog } from './guestStorage'
import type { Card, Deck } from '@/features/decks/types'

/**
 * DEV ONLY — seed a realistic guest "memory sky" into localStorage so the
 * Memory Constellation and stats can be previewed without a running backend.
 * Never imported in production paths; callers gate on import.meta.env.DEV.
 */
export function seedDemoSky() {
  const now = Date.now()
  const day = 86_400_000
  const iso = (ms: number) => new Date(ms).toISOString()
  const ri = (n: number) => Math.floor(Math.random() * n)

  // [title, cardCount, matureFraction, learningFraction]
  const specs: [string, number, number, number][] = [
    ['Spanish Basics', 26, 0.5, 0.3],
    ['World Capitals', 30, 0.6, 0.25],
    ['JavaScript Fundamentals', 18, 0.3, 0.4],
    ['Human Anatomy', 22, 0.45, 0.35],
    ['SAT Vocabulary', 40, 0.55, 0.3],
    ['The French Revolution', 12, 0.2, 0.5],
    ['Biology: Cells', 16, 0.4, 0.3],
  ]

  const decks: Deck[] = []
  const cardsByDeckId: Record<string, Card[]> = {}
  const reviewLogs: GuestReviewLog[] = []
  let c = 0

  specs.forEach(([title, n, matureFrac, learnFrac], di) => {
    const id = `deck-${di}`
    decks.push({
      id,
      title,
      categoryTags: [],
      isShared: false,
      createdAt: iso(now - 30 * day),
      updatedAt: iso(now),
    })

    const cards: Card[] = []
    for (let i = 0; i < n; i++) {
      const r = Math.random()
      let interval = 0
      let repetitions = 0
      let nextReviewAt: string | undefined
      let lastReviewedAt: string | undefined

      if (r < matureFrac) {
        // Mature, well-retained — bright star
        interval = 21 + ri(60)
        repetitions = 4 + ri(5)
        lastReviewedAt = iso(now - ri(10) * day)
        nextReviewAt = iso(now + (5 + ri(20)) * day)
      } else if (r < matureFrac + learnFrac) {
        // Learning, due now — pulsing / fading star
        interval = 1 + ri(10)
        repetitions = 1 + ri(3)
        lastReviewedAt = iso(now - ri(5) * day)
        nextReviewAt = iso(now - ri(2) * day)
      }
      // else: brand new — faint star (interval 0, repetitions 0, no review dates)

      cards.push({
        id: `card-${c++}`,
        frontText: `${title} Q${i + 1}`,
        backText: `Answer ${i + 1}`,
        createdAt: iso(now - 20 * day),
        updatedAt: iso(now),
        easeFactor: 2.5,
        interval,
        repetitions,
        ...(nextReviewAt ? { nextReviewAt } : {}),
        ...(lastReviewedAt ? { lastReviewedAt } : {}),
      })
    }
    cardsByDeckId[id] = cards
  })

  // 5-day study streak with some reviews today
  for (let d = 0; d < 5; d++) {
    for (let k = 0; k < 6; k++) {
      reviewLogs.push({
        cardId: `card-${k}`,
        deckId: 'deck-0',
        response: Math.random() < 0.8 ? 'good' : 'again',
        reviewedAt: iso(now - d * day - k * 3_600_000),
      })
    }
  }

  const data: GuestData = { version: 1, decks, cardsByDeckId, reviewLogs }
  guestStorage.write(data)
  window.location.reload()
}
