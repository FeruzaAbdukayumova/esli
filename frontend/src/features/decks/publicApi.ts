import { apiClient } from '@/shared/lib/apiClient'
import type { PublicDeck, PublicDeckListResponse, DeckCopyResponse, Card } from './types'

interface PublicDecksParams {
  page?: number
  perPage?: number
  search?: string
  sortBy?: 'popular' | 'recent' | 'title'
  category?: string
}

// Raw API response types (snake_case)
interface RawPublicDeckOwner {
  id: string
  email: string
}

interface RawPublicDeck {
  id: string
  title: string
  category_tags: string
  copy_count: number
  card_count: number
  owner: RawPublicDeckOwner
  created_at: string
  updated_at: string
}

interface RawPublicDeckListResponse {
  decks: RawPublicDeck[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

interface RawCard {
  id: string
  deck_id: string
  front_text: string | null
  back_text: string | null
  front_image_url: string | null
  back_image_url: string | null
  last_reviewed_at: string | null
  next_review_at: string | null
  ease_factor: number
  interval: number
  repetitions: number
  created_at: string
  updated_at: string
}

interface RawDeckCopyResponse {
  id: string
  title: string
  category_tags: string
  card_count: number
  message: string
}

// Transform functions
function transformPublicDeck(raw: RawPublicDeck): PublicDeck {
  return {
    id: raw.id,
    title: raw.title,
    categoryTags: raw.category_tags,
    copyCount: raw.copy_count,
    cardCount: raw.card_count,
    owner: raw.owner,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  }
}

function transformCard(raw: RawCard): Card {
  return {
    id: raw.id,
    frontText: raw.front_text ?? undefined,
    backText: raw.back_text ?? undefined,
    frontImageUrl: raw.front_image_url ?? undefined,
    backImageUrl: raw.back_image_url ?? undefined,
    lastReviewedAt: raw.last_reviewed_at ?? undefined,
    nextReviewAt: raw.next_review_at ?? undefined,
    easeFactor: raw.ease_factor ?? 2.5,
    interval: raw.interval ?? 0,
    repetitions: raw.repetitions ?? 0,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  }
}

export const publicDeckApi = {
  async listPublicDecks(params: PublicDecksParams = {}): Promise<PublicDeckListResponse> {
    const searchParams = new URLSearchParams()
    if (params.page) searchParams.set('page', String(params.page))
    if (params.perPage) searchParams.set('per_page', String(params.perPage))
    if (params.search) searchParams.set('search', params.search)
    if (params.sortBy) searchParams.set('sort_by', params.sortBy)
    if (params.category) searchParams.set('category', params.category)

    const query = searchParams.toString()
    const endpoint = `/public/decks${query ? `?${query}` : ''}`

    const raw = await apiClient.get<RawPublicDeckListResponse>(endpoint)

    return {
      decks: raw.decks.map(transformPublicDeck),
      total: raw.total,
      page: raw.page,
      perPage: raw.per_page,
      totalPages: raw.total_pages,
    }
  },

  async getPublicDeck(deckId: string): Promise<PublicDeck> {
    const raw = await apiClient.get<RawPublicDeck>(`/public/decks/${deckId}`)
    return transformPublicDeck(raw)
  },

  async getPublicDeckCards(deckId: string, limit: number = 10): Promise<Card[]> {
    const raw = await apiClient.get<RawCard[]>(`/public/decks/${deckId}/cards?limit=${limit}`)
    return raw.map(transformCard)
  },

  async copyDeck(deckId: string): Promise<DeckCopyResponse> {
    const raw = await apiClient.post<RawDeckCopyResponse>(`/public/decks/${deckId}/copy`)
    return {
      id: raw.id,
      title: raw.title,
      categoryTags: raw.category_tags,
      cardCount: raw.card_count,
      message: raw.message,
    }
  },
}
