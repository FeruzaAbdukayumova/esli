export interface Deck {
  id: string
  title: string
  categoryTags: string[]
  isShared: boolean
  createdAt: string
  updatedAt: string
  lastStudiedAt?: string
  stats?: {
    streak?: number
    progress?: number
  }
}

// SM-2 Response types (self-assessment of recall)
export type RecallResponse = 'again' | 'hard' | 'good' | 'easy'

export interface Card {
  id: string
  frontText?: string
  backText?: string
  frontImageUrl?: string
  backImageUrl?: string
  translations?: Record<string, string> | null
  createdAt: string
  updatedAt: string
  lastReviewedAt?: string
  nextReviewAt?: string
  // SM-2 spaced repetition fields
  easeFactor: number
  interval: number
  repetitions: number
}

// Intervals for each response option (e.g., "1m", "10m", "1d", "4d")
export interface CardIntervals {
  again: string
  hard: string
  good: string
  easy: string
}

export interface TranslatedCard extends Card {
  translated_back: string
}

export interface DeckWithCards {
  deck: Deck
  cards: Card[]
}

export interface CreateDeckInput {
  title: string
  categoryTags?: string[]
  isShared?: boolean
}

export interface UpdateDeckInput {
  title?: string
  categoryTags?: string[]
  isShared?: boolean
}

export interface CreateCardInput {
  frontText?: string
  backText?: string
  frontImageUrl?: string
  backImageUrl?: string
}

export interface UpdateCardInput {
  frontText?: string
  backText?: string
  frontImageUrl?: string
  backImageUrl?: string
}

// --- Public Deck Types ---

export interface PublicDeckOwner {
  id: string
  email: string
  username?: string
}

export interface PublicDeck {
  id: string
  title: string
  categoryTags: string
  copyCount: number
  cardCount: number
  owner: PublicDeckOwner
  createdAt: string
  updatedAt: string
}

export interface PublicDeckListResponse {
  decks: PublicDeck[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

export interface DeckCopyResponse {
  id: string
  title: string
  categoryTags: string
  cardCount: number
  message: string
}
