import { apiClient } from '@/shared/lib/apiClient'
import type { DashboardStats, DeckProgress, DayForecast, LastStudiedDeck } from './types'

interface RawLastStudiedDeck {
  id: string
  title: string
}

interface RawDeckProgress {
  deck_id: string
  title: string
  new_count: number
  learning_count: number
  mature_count: number
  total: number
}

interface RawDayForecast {
  date: string
  count: number
}

interface RawDashboardStats {
  last_studied_deck: RawLastStudiedDeck | null
  cards_due_today: number
  new_cards_available: number
  cards_reviewed_today: number
  total_cards: number
  total_decks: number
  mastery_percent: number
  streak_days: number
  retention_percent: number
  deck_progress: RawDeckProgress[]
  review_forecast: RawDayForecast[]
  activity_heatmap?: RawDayForecast[]
}

function transformDeckProgress(raw: RawDeckProgress): DeckProgress {
  return {
    deckId: raw.deck_id,
    title: raw.title,
    newCount: raw.new_count,
    learningCount: raw.learning_count,
    matureCount: raw.mature_count,
    total: raw.total,
  }
}

function transformForecast(raw: RawDayForecast): DayForecast {
  return { date: raw.date, count: raw.count }
}

function transformLastStudied(raw: RawLastStudiedDeck | null): LastStudiedDeck | null {
  if (!raw) return null
  return { id: raw.id, title: raw.title }
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const raw = await apiClient.get<RawDashboardStats>('/stats/dashboard')
  return {
    lastStudiedDeck: transformLastStudied(raw.last_studied_deck),
    cardsDueToday: raw.cards_due_today,
    newCardsAvailable: raw.new_cards_available,
    cardsReviewedToday: raw.cards_reviewed_today,
    totalCards: raw.total_cards,
    totalDecks: raw.total_decks,
    masteryPercent: raw.mastery_percent,
    streakDays: raw.streak_days,
    retentionPercent: raw.retention_percent,
    deckProgress: raw.deck_progress.map(transformDeckProgress),
    reviewForecast: raw.review_forecast.map(transformForecast),
    activityHeatmap: raw.activity_heatmap?.map((d) => ({ date: d.date, count: d.count })),
  }
}
