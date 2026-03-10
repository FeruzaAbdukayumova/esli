import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useDeckRepo } from './repo'
import type { DeckRepoMode } from './repo'
import { statsKeys } from '@/features/stats/statsHooks'
import {
  Card,
  Deck,
  CreateDeckInput,
  UpdateDeckInput,
  CreateCardInput,
  UpdateCardInput,
} from './types'

/** Query keys: consistent everywhere. mode = 'guest' | 'api'. */
export const deckKeys = {
  /** Deck list: ['decks', mode] */
  lists: (mode: DeckRepoMode) => ['decks', mode] as const,
  /** Deck detail: ['deck', mode, deckId] */
  detail: (mode: DeckRepoMode, deckId: string) =>
    ['deck', mode, deckId] as const,
  /** Cards list: ['cards', mode, deckId] */
  cards: (mode: DeckRepoMode, deckId: string) =>
    ['cards', mode, deckId] as const,
}

// Deck queries
export const useDecks = () => {
  const { repo, mode } = useDeckRepo()
  return useQuery({
    queryKey: deckKeys.lists(mode),
    queryFn: () => repo.listDecks(),
  })
}

export const useDeck = (deckId: string) => {
  const { repo, mode } = useDeckRepo()
  return useQuery({
    queryKey: deckKeys.detail(mode, deckId),
    queryFn: () => repo.getDeck(deckId),
    enabled: !!deckId,
  })
}

// Card queries
export const useCards = (deckId: string) => {
  const { repo, mode } = useDeckRepo()
  return useQuery({
    queryKey: deckKeys.cards(mode, deckId),
    queryFn: () => repo.listCards(deckId),
    enabled: !!deckId,
  })
}

// Deck mutations
export const useCreateDeck = () => {
  const queryClient = useQueryClient()
  const { repo, mode } = useDeckRepo()

  return useMutation({
    mutationFn: (input: CreateDeckInput) => repo.createDeck(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deckKeys.lists(mode) })
      queryClient.invalidateQueries({ queryKey: statsKeys.dashboard })
    },
  })
}

export const useUpdateDeck = () => {
  const queryClient = useQueryClient()
  const { repo, mode } = useDeckRepo()

  return useMutation({
    mutationFn: ({
      deckId,
      patch,
    }: {
      deckId: string
      patch: UpdateDeckInput
    }) => repo.updateDeck(deckId, patch),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: deckKeys.lists(mode) })
      queryClient.invalidateQueries({
        queryKey: deckKeys.detail(mode, variables.deckId),
      })
    },
  })
}

export const useDeleteDeck = () => {
  const queryClient = useQueryClient()
  const { repo, mode } = useDeckRepo()

  return useMutation({
    mutationFn: (deckId: string) => repo.deleteDeck(deckId),
    onMutate: async (deckId: string) => {
      const listKey = deckKeys.lists(mode)
      await queryClient.cancelQueries({ queryKey: listKey })
      const previousDecks = queryClient.getQueryData<Deck[]>(listKey)
      queryClient.setQueryData<Deck[]>(listKey, (old) =>
        Array.isArray(old) ? old.filter((d) => d.id !== deckId) : old
      )
      queryClient.removeQueries({ queryKey: deckKeys.detail(mode, deckId) })
      queryClient.removeQueries({ queryKey: deckKeys.cards(mode, deckId) })
      return { previousDecks }
    },
    onError: (_err, _deckId, context) => {
      const listKey = deckKeys.lists(mode)
      if (context?.previousDecks !== undefined) {
        queryClient.setQueryData(listKey, context.previousDecks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: deckKeys.lists(mode) })
      queryClient.invalidateQueries({ queryKey: statsKeys.dashboard })
    },
  })
}

// Card mutations
export const useAddCard = () => {
  const queryClient = useQueryClient()
  const { repo, mode } = useDeckRepo()

  return useMutation({
    mutationFn: ({
      deckId,
      cardInput,
    }: {
      deckId: string
      cardInput: CreateCardInput
    }) => repo.addCard(deckId, cardInput),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: deckKeys.cards(mode, variables.deckId),
      })
      queryClient.invalidateQueries({
        queryKey: deckKeys.detail(mode, variables.deckId),
      })
      queryClient.invalidateQueries({ queryKey: statsKeys.dashboard })
    },
  })
}

export const useAddCardsBatch = () => {
  const queryClient = useQueryClient()
  const { repo, mode } = useDeckRepo()

  return useMutation({
    mutationFn: ({
      deckId,
      cards,
    }: {
      deckId: string
      cards: CreateCardInput[]
    }) => repo.addCardsBatch(deckId, cards),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: deckKeys.cards(mode, variables.deckId),
      })
      queryClient.invalidateQueries({
        queryKey: deckKeys.detail(mode, variables.deckId),
      })
      queryClient.invalidateQueries({ queryKey: statsKeys.dashboard })
    },
  })
}

export const useUpdateCard = () => {
  const queryClient = useQueryClient()
  const { repo, mode } = useDeckRepo()

  return useMutation({
    mutationFn: ({
      deckId,
      cardId,
      patch,
    }: {
      deckId: string
      cardId: string
      patch: UpdateCardInput
    }) => repo.updateCard(deckId, cardId, patch),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: deckKeys.cards(mode, variables.deckId),
      })
    },
  })
}

export const useDeleteCard = () => {
  const queryClient = useQueryClient()
  const { repo, mode } = useDeckRepo()

  return useMutation({
    mutationFn: ({
      deckId,
      cardId,
    }: {
      deckId: string
      cardId: string
    }) => repo.deleteCard(deckId, cardId),
    onMutate: async (variables) => {
      const cardsKey = deckKeys.cards(mode, variables.deckId)
      await queryClient.cancelQueries({ queryKey: cardsKey })
      const previousCards = queryClient.getQueryData<Card[]>(cardsKey)
      queryClient.setQueryData<Card[]>(cardsKey, (old) =>
        Array.isArray(old) ? old.filter((c) => c.id !== variables.cardId) : old
      )
      return { previousCards }
    },
    onError: (_err, variables, context) => {
      if (context?.previousCards !== undefined) {
        queryClient.setQueryData(
          deckKeys.cards(mode, variables.deckId),
          context.previousCards
        )
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: deckKeys.cards(mode, variables.deckId),
      })
      queryClient.invalidateQueries({ queryKey: statsKeys.dashboard })
    },
  })
}

export const useReviewCard = (deckId: string) => {
  const queryClient = useQueryClient()
  const { repo, mode } = useDeckRepo()

  return useMutation({
    mutationFn: ({
      cardId,
      response,
    }: {
      cardId: string
      response: 'again' | 'hard' | 'good' | 'easy'
    }) => repo.reviewCard(deckId, cardId, response),
    onSuccess: (updatedCard) => {
      const cardsKey = deckKeys.cards(mode, deckId)
      queryClient.setQueryData(cardsKey, (old: Card[] | undefined) => {
        if (!old) return old
        return old.map((c) => (c.id === updatedCard.id ? updatedCard : c))
      })
      queryClient.invalidateQueries({ queryKey: cardsKey })
      queryClient.invalidateQueries({ queryKey: statsKeys.dashboard })
    },
  })
}
