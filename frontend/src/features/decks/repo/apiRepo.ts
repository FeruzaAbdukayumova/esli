import { apiClient } from '@/shared/lib/apiClient'
import {
  Deck,
  Card,
  CreateDeckInput,
  UpdateDeckInput,
  CreateCardInput,
  UpdateCardInput,
} from '../types'
import { DeckRepository } from './types'

/** API response shapes (snake_case, ISO date strings). */
interface ApiDeck {
  id: string
  title: string
  category_tags: string
  is_shared: boolean
  created_at: string
  updated_at: string
}

interface ApiCard {
  id: string
  deck_id: string
  front_text: string | null
  back_text: string | null
  front_image_url: string | null
  back_image_url: string | null
  last_reviewed_at: string | null
  next_review_at: string | null
  // SM-2 fields
  ease_factor: number
  interval: number
  repetitions: number
  created_at: string
  updated_at: string
}

interface ApiCardIntervals {
  again: string
  hard: string
  good: string
  easy: string
}

function apiDeckToDeck(api: ApiDeck): Deck {
  const categoryTags = api.category_tags
    ? api.category_tags.split(',').map((s) => s.trim()).filter(Boolean)
    : []
  return {
    id: String(api.id),
    title: api.title,
    categoryTags,
    isShared: api.is_shared,
    createdAt: api.created_at,
    updatedAt: api.updated_at,
  }
}

function apiCardToCard(api: ApiCard): Card {
  return {
    id: String(api.id),
    frontText: api.front_text ?? undefined,
    backText: api.back_text ?? undefined,
    frontImageUrl: api.front_image_url ?? undefined,
    backImageUrl: api.back_image_url ?? undefined,
    createdAt: api.created_at,
    updatedAt: api.updated_at,
    lastReviewedAt: api.last_reviewed_at ?? undefined,
    nextReviewAt: api.next_review_at ?? undefined,
    // SM-2 fields
    easeFactor: api.ease_factor ?? 2.5,
    interval: api.interval ?? 0,
    repetitions: api.repetitions ?? 0,
  }
}

class ApiDeckRepository implements DeckRepository {
  async listDecks(): Promise<Deck[]> {
    const list = await apiClient.get<ApiDeck[]>('/decks')
    return (list ?? []).map(apiDeckToDeck)
  }

  async getDeck(deckId: string): Promise<Deck | null> {
    try {
      const api = await apiClient.get<ApiDeck>(`/decks/${deckId}`)
      return api ? apiDeckToDeck(api) : null
    } catch {
      return null
    }
  }

  async createDeck(input: CreateDeckInput): Promise<Deck> {
    const body = {
      title: input.title,
      category_tags: Array.isArray(input.categoryTags) ? input.categoryTags.join(',') : '',
      is_shared: input.isShared ?? false,
    }
    const api = await apiClient.post<ApiDeck>('/decks', body)
    return apiDeckToDeck(api)
  }

  async updateDeck(deckId: string, patch: UpdateDeckInput): Promise<Deck> {
    const body: Record<string, unknown> = {}
    if (patch.title !== undefined) body.title = patch.title
    if (patch.categoryTags !== undefined) body.category_tags = Array.isArray(patch.categoryTags) ? patch.categoryTags.join(',') : ''
    if (patch.isShared !== undefined) body.is_shared = patch.isShared
    const api = await apiClient.request<ApiDeck>(`/decks/${deckId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
    return apiDeckToDeck(api)
  }

  async deleteDeck(deckId: string): Promise<void> {
    await apiClient.delete(`/decks/${deckId}`)
  }

  async listCards(deckId: string): Promise<Card[]> {
    const list = await apiClient.get<ApiCard[]>(`/decks/${deckId}/cards`)
    return (list ?? []).map(apiCardToCard)
  }

  async addCard(deckId: string, cardInput: CreateCardInput): Promise<Card> {
    const body = {
      front_text: cardInput.frontText ?? null,
      back_text: cardInput.backText ?? null,
      front_image_url: cardInput.frontImageUrl ?? null,
      back_image_url: cardInput.backImageUrl ?? null,
    }
    const api = await apiClient.post<ApiCard>(`/decks/${deckId}/cards`, body)
    return apiCardToCard(api)
  }

  async addCardsBatch(deckId: string, cards: CreateCardInput[]): Promise<Card[]> {
    const body = {
      cards: cards.map((c) => ({
        front_text: c.frontText ?? null,
        back_text: c.backText ?? null,
        front_image_url: c.frontImageUrl ?? null,
        back_image_url: c.backImageUrl ?? null,
      })),
    }
    const response = await apiClient.post<{ created: number; cards: ApiCard[] }>(
      `/decks/${deckId}/cards/batch`,
      body,
    )
    return response.cards.map(apiCardToCard)
  }

  async updateCard(_deckId: string, cardId: string, patch: UpdateCardInput): Promise<Card> {
    const body: Record<string, unknown> = {}
    if (patch.frontText !== undefined) body.front_text = patch.frontText
    if (patch.backText !== undefined) body.back_text = patch.backText
    if (patch.frontImageUrl !== undefined) body.front_image_url = patch.frontImageUrl
    if (patch.backImageUrl !== undefined) body.back_image_url = patch.backImageUrl
    const api = await apiClient.request<ApiCard>(`/cards/${cardId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
    return apiCardToCard(api)
  }

  async deleteCard(_deckId: string, cardId: string): Promise<void> {
    await apiClient.delete(`/cards/${cardId}`)
  }

  async reviewCard(
    _deckId: string,
    cardId: string,
    response: 'again' | 'hard' | 'good' | 'easy',
  ): Promise<Card> {
    const api = await apiClient.post<ApiCard>(`/cards/${cardId}/review`, { response })
    return apiCardToCard(api)
  }

  async getCardIntervals(cardId: string): Promise<ApiCardIntervals> {
    return apiClient.get<ApiCardIntervals>(`/cards/${cardId}/intervals`)
  }
}

export const apiDeckRepo = new ApiDeckRepository()
