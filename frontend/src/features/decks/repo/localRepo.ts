import { guestStorage } from '@/shared/lib/guestStorage'
import {
  Deck,
  Card,
  CreateDeckInput,
  UpdateDeckInput,
  CreateCardInput,
  UpdateCardInput,
  RecallResponse,
} from '../types'
import type { DeckRepository } from './types'

/**
 * Local SM-2 algorithm implementation for guest mode
 */
function computeLocalSm2(
  response: RecallResponse,
  currentEase: number,
  currentInterval: number,
  currentReps: number
): { ease: number; interval: number; reps: number; nextReviewAt: string } {
  const now = new Date()
  let newEase = currentEase
  let newInterval: number
  let newReps: number

  switch (response) {
    case 'again':
      // Reset to learning mode
      newReps = 0
      newInterval = 0
      newEase = Math.max(1.3, currentEase - 0.2)
      // Next review in 1 minute
      now.setMinutes(now.getMinutes() + 1)
      break

    case 'hard':
      // Small interval increase, decrease ease
      newReps = currentReps + 1
      newEase = Math.max(1.3, currentEase - 0.15)
      if (currentInterval === 0) {
        newInterval = 1
        now.setMinutes(now.getMinutes() + 10)
      } else {
        newInterval = Math.ceil(currentInterval * 1.2)
        now.setDate(now.getDate() + newInterval)
      }
      break

    case 'good':
      // Normal progression
      newReps = currentReps + 1
      if (currentInterval === 0) {
        newInterval = 1
        now.setDate(now.getDate() + 1)
      } else if (currentInterval === 1) {
        newInterval = 6
        now.setDate(now.getDate() + 6)
      } else {
        newInterval = Math.ceil(currentInterval * currentEase)
        now.setDate(now.getDate() + newInterval)
      }
      break

    case 'easy':
      // Larger interval, boost ease
      newReps = currentReps + 1
      newEase = currentEase + 0.15
      if (currentInterval === 0) {
        newInterval = 4
        now.setDate(now.getDate() + 4)
      } else {
        newInterval = Math.ceil(currentInterval * currentEase * 1.3)
        now.setDate(now.getDate() + newInterval)
      }
      break
  }

  return {
    ease: newEase,
    interval: newInterval,
    reps: newReps,
    nextReviewAt: now.toISOString(),
  }
}

class LocalDeckRepository implements DeckRepository {
  async listDecks(): Promise<Deck[]> {
    const data = guestStorage.read()
    return data.decks.map((deck) => ({
      ...deck,
      cardCount: data.cardsByDeckId[deck.id]?.length ?? 0,
    }))
  }

  async getDeck(deckId: string): Promise<Deck | null> {
    const data = guestStorage.read()
    const deck = data.decks.find((d) => d.id === deckId)
    if (!deck) return null
    return { ...deck, cardCount: data.cardsByDeckId[deck.id]?.length ?? 0 }
  }

  async createDeck(input: CreateDeckInput): Promise<Deck> {
    const data = guestStorage.read()
    const now = new Date().toISOString()

    const deck: Deck = {
      id: crypto.randomUUID(),
      title: input.title,
      categoryTags: input.categoryTags || [],
      isShared: input.isShared ?? false,
      createdAt: now,
      updatedAt: now,
    }

    data.decks.push(deck)
    data.cardsByDeckId[deck.id] = []
    guestStorage.write(data)

    return deck
  }

  async updateDeck(deckId: string, patch: UpdateDeckInput): Promise<Deck> {
    const data = guestStorage.read()
    const deckIndex = data.decks.findIndex((deck) => deck.id === deckId)

    if (deckIndex === -1) {
      throw new Error(`Deck with id ${deckId} not found`)
    }

    const deck = data.decks[deckIndex]
    const updatedDeck: Deck = {
      ...deck,
      ...patch,
      updatedAt: new Date().toISOString(),
    }

    data.decks[deckIndex] = updatedDeck
    guestStorage.write(data)

    return updatedDeck
  }

  async deleteDeck(deckId: string): Promise<void> {
    const data = guestStorage.read()
    data.decks = data.decks.filter((deck) => deck.id !== deckId)
    delete data.cardsByDeckId[deckId]
    guestStorage.write(data)
  }

  async listCards(deckId: string): Promise<Card[]> {
    const data = guestStorage.read()
    return [...(data.cardsByDeckId[deckId] || [])]
  }

  async addCard(deckId: string, cardInput: CreateCardInput): Promise<Card> {
    const data = guestStorage.read()
    const now = new Date().toISOString()

    const card: Card = {
      id: crypto.randomUUID(),
      frontText: cardInput.frontText,
      backText: cardInput.backText,
      frontImageUrl: cardInput.frontImageUrl,
      backImageUrl: cardInput.backImageUrl,
      createdAt: now,
      updatedAt: now,
      // SM-2 defaults
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
    }

    if (!data.cardsByDeckId[deckId]) {
      data.cardsByDeckId[deckId] = []
    }

    data.cardsByDeckId[deckId].push(card)
    guestStorage.write(data)

    return card
  }

  async addCardsBatch(deckId: string, cards: CreateCardInput[]): Promise<Card[]> {
    const data = guestStorage.read()
    const now = new Date().toISOString()

    if (!data.cardsByDeckId[deckId]) {
      data.cardsByDeckId[deckId] = []
    }

    const createdCards: Card[] = cards.map((cardInput) => ({
      id: crypto.randomUUID(),
      frontText: cardInput.frontText,
      backText: cardInput.backText,
      frontImageUrl: cardInput.frontImageUrl,
      backImageUrl: cardInput.backImageUrl,
      createdAt: now,
      updatedAt: now,
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
    }))

    data.cardsByDeckId[deckId].push(...createdCards)
    guestStorage.write(data)

    return createdCards
  }

  async updateCard(
    deckId: string,
    cardId: string,
    patch: UpdateCardInput
  ): Promise<Card> {
    const data = guestStorage.read()
    const cards = data.cardsByDeckId[deckId] || []
    const cardIndex = cards.findIndex((card) => card.id === cardId)

    if (cardIndex === -1) {
      throw new Error(`Card with id ${cardId} not found`)
    }

    const card = cards[cardIndex]
    const updatedCard: Card = {
      ...card,
      ...patch,
      updatedAt: new Date().toISOString(),
    }

    cards[cardIndex] = updatedCard
    data.cardsByDeckId[deckId] = cards
    guestStorage.write(data)

    return updatedCard
  }

  async deleteCard(deckId: string, cardId: string): Promise<void> {
    const data = guestStorage.read()
    const cards = data.cardsByDeckId[deckId] || []
    data.cardsByDeckId[deckId] = cards.filter((card) => card.id !== cardId)
    guestStorage.write(data)
  }

  async reviewCard(deckId: string, cardId: string, response: RecallResponse): Promise<Card> {
    const data = guestStorage.read()
    const cards = data.cardsByDeckId[deckId] || []
    const cardIndex = cards.findIndex((c) => c.id === cardId)
    if (cardIndex === -1) {
      throw new Error(`Card with id ${cardId} not found`)
    }

    const card = cards[cardIndex]
    const sm2Result = computeLocalSm2(
      response,
      card.easeFactor ?? 2.5,
      card.interval ?? 0,
      card.repetitions ?? 0
    )

    const updatedCard: Card = {
      ...card,
      lastReviewedAt: new Date().toISOString(),
      nextReviewAt: sm2Result.nextReviewAt,
      easeFactor: sm2Result.ease,
      interval: sm2Result.interval,
      repetitions: sm2Result.reps,
      updatedAt: new Date().toISOString(),
    }

    cards[cardIndex] = updatedCard
    data.cardsByDeckId[deckId] = cards

    // Log review for guest stats
    if (!data.reviewLogs) data.reviewLogs = []
    data.reviewLogs.push({
      cardId,
      deckId,
      response,
      reviewedAt: new Date().toISOString(),
    })
    // Trim to prevent localStorage bloat
    if (data.reviewLogs.length > 10_000) {
      data.reviewLogs = data.reviewLogs.slice(-5_000)
    }

    guestStorage.write(data)

    return updatedCard
  }
}

export const localDeckRepo = new LocalDeckRepository()
