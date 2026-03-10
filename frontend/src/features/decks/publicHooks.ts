import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { publicDeckApi } from './publicApi'
import { deckKeys } from './hooks'
import { statsKeys } from '@/features/stats/statsHooks'
import { useDeckRepo } from './repo'
import { localDeckRepo } from './repo/localRepo'
import type { DeckCopyResponse } from './types'

interface PublicDecksParams {
  page?: number
  perPage?: number
  search?: string
  sortBy?: 'popular' | 'recent' | 'title'
  category?: string
}

export const publicDeckKeys = {
  all: ['publicDecks'] as const,
  list: (params: PublicDecksParams) => [...publicDeckKeys.all, 'list', params] as const,
  detail: (deckId: string) => [...publicDeckKeys.all, 'detail', deckId] as const,
  cards: (deckId: string) => [...publicDeckKeys.all, 'cards', deckId] as const,
}

export const usePublicDecks = (params: PublicDecksParams = {}) => {
  return useQuery({
    queryKey: publicDeckKeys.list(params),
    queryFn: () => publicDeckApi.listPublicDecks(params),
  })
}

export const usePublicDeck = (deckId: string) => {
  return useQuery({
    queryKey: publicDeckKeys.detail(deckId),
    queryFn: () => publicDeckApi.getPublicDeck(deckId),
    enabled: !!deckId,
  })
}

export const usePublicDeckCards = (deckId: string, limit: number = 10) => {
  return useQuery({
    queryKey: publicDeckKeys.cards(deckId),
    queryFn: () => publicDeckApi.getPublicDeckCards(deckId, limit),
    enabled: !!deckId,
  })
}

export const useCopyDeck = () => {
  const queryClient = useQueryClient()
  const { mode } = useDeckRepo()

  return useMutation({
    mutationFn: async (deckId: string): Promise<DeckCopyResponse> => {
      if (mode === 'guest') {
        // Guest mode: fetch public deck + cards, create in localStorage
        const [deck, cards] = await Promise.all([
          publicDeckApi.getPublicDeck(deckId),
          publicDeckApi.getPublicDeckCards(deckId, 500),
        ])
        const tags = deck.categoryTags
          ? deck.categoryTags.split(',').map(t => t.trim()).filter(Boolean)
          : []
        const newDeck = await localDeckRepo.createDeck({
          title: deck.title,
          categoryTags: tags,
        })
        if (cards.length > 0) {
          await localDeckRepo.addCardsBatch(
            newDeck.id,
            cards.map(c => ({
              frontText: c.frontText,
              backText: c.backText,
              frontImageUrl: c.frontImageUrl,
              backImageUrl: c.backImageUrl,
            })),
          )
        }
        return {
          id: newDeck.id,
          title: newDeck.title,
          categoryTags: deck.categoryTags,
          cardCount: cards.length,
          message: 'Deck copied to your library',
        }
      }
      return publicDeckApi.copyDeck(deckId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deckKeys.lists(mode) })
      queryClient.invalidateQueries({ queryKey: publicDeckKeys.all })
      queryClient.invalidateQueries({ queryKey: statsKeys.dashboard })
    },
  })
}
