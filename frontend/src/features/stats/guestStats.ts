import type { GuestData } from '@/shared/lib/guestStorage'
import type { DashboardStats, DeckProgress, DayForecast, ActivityDay, LastStudiedDeck } from './types'

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function dateStr(d: Date): string {
  return d.toISOString().slice(0, 10)
}

export function computeGuestStats(data: GuestData): DashboardStats {
  const now = new Date()
  const todayStart = startOfDay(now)
  const allCards = Object.entries(data.cardsByDeckId).flatMap(([, cards]) => cards)
  const reviewLogs = data.reviewLogs ?? []

  // --- Last studied deck ---
  let lastStudiedDeck: LastStudiedDeck | null = null
  let latestReviewTime = 0
  for (const card of allCards) {
    if (card.lastReviewedAt) {
      const t = new Date(card.lastReviewedAt).getTime()
      if (t > latestReviewTime) {
        latestReviewTime = t
        // Find which deck this card belongs to
        for (const [deckId, cards] of Object.entries(data.cardsByDeckId)) {
          if (cards.some((c) => c.id === card.id)) {
            const deck = data.decks.find((d) => d.id === deckId)
            if (deck) {
              lastStudiedDeck = { id: deck.id, title: deck.title }
            }
            break
          }
        }
      }
    }
  }

  // --- Total counts ---
  const totalCards = allCards.length
  const totalDecks = data.decks.length

  // --- Cards due today (split new vs review) ---
  const dailyNewCardLimit = data.settings?.dailyNewCardLimit ?? 20
  const reviewDue = allCards.filter((c) => c.nextReviewAt && new Date(c.nextReviewAt) <= now).length
  const newCardsAvailable = allCards.filter((c) => !c.nextReviewAt).length
  const newToday = Math.min(newCardsAvailable, dailyNewCardLimit)
  const cardsDueToday = reviewDue + newToday

  // --- Cards reviewed today ---
  const cardsReviewedToday = reviewLogs.filter(
    (l) => new Date(l.reviewedAt) >= todayStart
  ).length

  // --- Mastery percent ---
  const matureCount = allCards.filter((c) => c.interval >= 21).length
  const masteryPercent = totalCards > 0 ? Math.round((matureCount / totalCards) * 1000) / 10 : 0

  // --- Streak days ---
  let streakDays = 0
  if (reviewLogs.length > 0) {
    const reviewDaysSet = new Set(
      reviewLogs.map((l) => dateStr(new Date(l.reviewedAt)))
    )
    const checkDate = new Date(todayStart)
    if (reviewDaysSet.has(dateStr(checkDate))) {
      streakDays = 1
      checkDate.setDate(checkDate.getDate() - 1)
      while (reviewDaysSet.has(dateStr(checkDate))) {
        streakDays++
        checkDate.setDate(checkDate.getDate() - 1)
      }
    } else {
      // Check yesterday
      checkDate.setDate(checkDate.getDate() - 1)
      if (reviewDaysSet.has(dateStr(checkDate))) {
        streakDays = 1
        checkDate.setDate(checkDate.getDate() - 1)
        while (reviewDaysSet.has(dateStr(checkDate))) {
          streakDays++
          checkDate.setDate(checkDate.getDate() - 1)
        }
      }
    }
  }

  // --- Retention percent (last 30 days) ---
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const recentLogs = reviewLogs.filter((l) => new Date(l.reviewedAt) >= thirtyDaysAgo)
  const passedCount = recentLogs.filter((l) => l.response === 'good' || l.response === 'easy').length
  const retentionPercent = recentLogs.length > 0 ? Math.round((passedCount / recentLogs.length) * 1000) / 10 : 0

  // --- Deck progress ---
  const deckProgress: DeckProgress[] = data.decks.map((deck) => {
    const cards = data.cardsByDeckId[deck.id] ?? []
    return {
      deckId: deck.id,
      title: deck.title,
      newCount: cards.filter((c) => c.repetitions === 0).length,
      learningCount: cards.filter((c) => c.repetitions > 0 && c.interval < 21).length,
      matureCount: cards.filter((c) => c.interval >= 21).length,
      total: cards.length,
    }
  })

  // --- Review forecast (7 days) ---
  const forecastMap: Record<string, number> = {}
  for (const card of allCards) {
    if (card.nextReviewAt) {
      const d = dateStr(new Date(card.nextReviewAt))
      forecastMap[d] = (forecastMap[d] || 0) + 1
    }
  }
  const reviewForecast: DayForecast[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(todayStart)
    d.setDate(d.getDate() + i)
    const ds = dateStr(d)
    reviewForecast.push({ date: ds, count: forecastMap[ds] || 0 })
  }

  // --- Activity heatmap (trailing 84 days of review counts) ---
  const heatmapMap: Record<string, number> = {}
  for (const log of reviewLogs) {
    const d = dateStr(new Date(log.reviewedAt))
    heatmapMap[d] = (heatmapMap[d] || 0) + 1
  }
  const activityHeatmap: ActivityDay[] = []
  for (let i = 83; i >= 0; i--) {
    const d = new Date(todayStart)
    d.setDate(d.getDate() - i)
    const ds = dateStr(d)
    activityHeatmap.push({ date: ds, count: heatmapMap[ds] || 0 })
  }

  return {
    lastStudiedDeck,
    cardsDueToday,
    newCardsAvailable,
    cardsReviewedToday,
    totalCards,
    totalDecks,
    masteryPercent,
    streakDays,
    retentionPercent,
    deckProgress,
    reviewForecast,
    activityHeatmap,
  }
}
