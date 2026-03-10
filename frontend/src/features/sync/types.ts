/** Payload shape for sync import (matches guest storage / API request). */
export interface SyncImportPayload {
  version: 1
  decks: Array<{
    id: string
    title: string
    categoryTags: string[]
    isShared?: boolean
    createdAt?: string
    updatedAt?: string
  }>
  cardsByDeckId: Record<string, Array<{
    id?: string
    frontText?: string | null
    backText?: string | null
    frontImageUrl?: string | null
    backImageUrl?: string | null
    lastReviewedAt?: string | null
    nextReviewAt?: string | null
    createdAt?: string
    updatedAt?: string
  }>>
}

/** API response for sync import. */
export interface SyncImportResponse {
  importedDecks: number
  importedCards: number
  deckIdMap: Record<string, string>
}
