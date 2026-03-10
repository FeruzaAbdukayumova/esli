import { Deck, Card } from '@/features/decks/types'

const STORAGE_KEY = 'flashcards_guest_v1'

export interface GuestReviewLog {
  cardId: string
  deckId: string
  response: string
  reviewedAt: string
}

export interface GuestSettings {
  dailyNewCardLimit?: number
  darkMode?: string
  language?: string
}

export interface GuestData {
  version: number
  decks: Deck[]
  cardsByDeckId: Record<string, Card[]>
  reviewLogs?: GuestReviewLog[]
  settings?: GuestSettings
}

const defaultData: GuestData = {
  version: 1,
  decks: [],
  cardsByDeckId: {},
}

export const guestStorage = {
  read(): GuestData {
    if (typeof window === 'undefined') {
      return defaultData
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        return defaultData
      }

      const parsed = JSON.parse(stored) as GuestData
      
      // Validate structure
      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        Array.isArray(parsed.decks) &&
        typeof parsed.cardsByDeckId === 'object' &&
        parsed.cardsByDeckId !== null
      ) {
        return {
          version: parsed.version || 1,
          decks: parsed.decks || [],
          cardsByDeckId: parsed.cardsByDeckId || {},
          reviewLogs: Array.isArray(parsed.reviewLogs) ? parsed.reviewLogs : [],
        }
      }

      return defaultData
    } catch (error) {
      console.error('Failed to read guest storage:', error)
      return defaultData
    }
  },

  write(data: GuestData): void {
    if (typeof window === 'undefined') {
      return
    }

    try {
      const json = JSON.stringify(data)
      localStorage.setItem(STORAGE_KEY, json)
    } catch (error) {
      console.error('Failed to write guest storage:', error)
    }
  },

  clear(): void {
    if (typeof window === 'undefined') {
      return
    }

    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear guest storage:', error)
    }
  },
}
