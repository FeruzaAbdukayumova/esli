export interface LastStudiedDeck {
  id: string
  title: string
}

export interface DeckProgress {
  deckId: string
  title: string
  newCount: number
  learningCount: number
  matureCount: number
  total: number
}

export interface DayForecast {
  date: string
  count: number
}

export interface DashboardStats {
  lastStudiedDeck: LastStudiedDeck | null
  cardsDueToday: number
  newCardsAvailable: number
  cardsReviewedToday: number
  totalCards: number
  totalDecks: number
  masteryPercent: number
  streakDays: number
  retentionPercent: number
  deckProgress: DeckProgress[]
  reviewForecast: DayForecast[]
}
