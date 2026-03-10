import { apiClient } from '@/shared/lib/apiClient'

export interface AIGenerateRequest {
  topic: string
  count: number
  includeDeckInfo?: boolean
  existingFronts?: string[]
  signal?: AbortSignal
}

export interface AIGeneratePDFRequest {
  file: File
  count: number
  topic?: string
  existingFronts?: string[]
  signal?: AbortSignal
}

export interface AIGeneratedCard {
  frontText: string
  backText: string
}

export interface AIGenerateResponse {
  cards: AIGeneratedCard[]
  suggestedTitle?: string
  suggestedTags?: string[]
}

interface RawAIGeneratedCard {
  front_text: string
  back_text: string
}

interface RawAIGenerateResponse {
  cards: RawAIGeneratedCard[]
  suggested_title: string | null
  suggested_tags: string[] | null
}

export async function generateCardsAI(
  req: AIGenerateRequest,
): Promise<AIGenerateResponse> {
  const raw = await apiClient.post<RawAIGenerateResponse>(
    '/ai/generate-cards',
    {
      topic: req.topic,
      count: req.count,
      include_deck_info: req.includeDeckInfo ?? false,
      existing_fronts: req.existingFronts ?? null,
    },
    { signal: req.signal },
  )

  return {
    cards: raw.cards.map((c) => ({
      frontText: c.front_text,
      backText: c.back_text,
    })),
    suggestedTitle: raw.suggested_title ?? undefined,
    suggestedTags: raw.suggested_tags ?? undefined,
  }
}

export async function generateCardsFromPDF(
  req: AIGeneratePDFRequest,
): Promise<AIGenerateResponse> {
  const formData = new FormData()
  formData.append('file', req.file)
  formData.append('count', String(req.count))
  if (req.topic) {
    formData.append('topic', req.topic)
  }
  if (req.existingFronts && req.existingFronts.length > 0) {
    formData.append('existing_fronts', JSON.stringify(req.existingFronts))
  }

  const response = await fetch('/api/v1/ai/generate-cards-from-pdf', {
    method: 'POST',
    body: formData,
    signal: req.signal,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }))
    const message = typeof error.detail === 'string' ? error.detail : `HTTP error ${response.status}`
    throw new Error(message)
  }

  const raw: RawAIGenerateResponse = await response.json()

  return {
    cards: raw.cards.map((c) => ({
      frontText: c.front_text,
      backText: c.back_text,
    })),
    suggestedTitle: raw.suggested_title ?? undefined,
    suggestedTags: raw.suggested_tags ?? undefined,
  }
}

// --- Bulk AI Edit ---

export interface AIEditCardInput {
  id: string
  frontText: string
  backText: string
}

export interface AIEditCardsRequest {
  cards: AIEditCardInput[]
  instruction: string
  signal?: AbortSignal
}

export interface AIEditedCard {
  id: string
  frontText: string
  backText: string
}

interface RawAIEditedCard {
  id: string
  front_text: string
  back_text: string
}

export async function editCardsAI(
  req: AIEditCardsRequest,
): Promise<{ cards: AIEditedCard[] }> {
  const raw = await apiClient.post<{ cards: RawAIEditedCard[] }>(
    '/ai/edit-cards',
    {
      cards: req.cards.map((c) => ({
        id: c.id,
        front_text: c.frontText,
        back_text: c.backText,
      })),
      instruction: req.instruction,
    },
    { signal: req.signal },
  )

  return {
    cards: raw.cards.map((c) => ({
      id: c.id,
      frontText: c.front_text,
      backText: c.back_text,
    })),
  }
}
