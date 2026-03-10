import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { adminApi } from './adminApi'

export const adminKeys = {
  stats: ['admin', 'stats'] as const,
  users: ['admin', 'users'] as const,
  usersList: (params?: Record<string, unknown>) => [...adminKeys.users, 'list', params] as const,
  decks: ['admin', 'decks'] as const,
  decksList: (params?: Record<string, unknown>) => [...adminKeys.decks, 'list', params] as const,
}

export function useAdminStats() {
  return useQuery({
    queryKey: adminKeys.stats,
    queryFn: () => adminApi.getStats(),
    staleTime: 60_000,
  })
}

export function useAdminUsers(params?: Parameters<typeof adminApi.listUsers>[0]) {
  return useQuery({
    queryKey: adminKeys.usersList(params as Record<string, unknown>),
    queryFn: () => adminApi.listUsers(params),
    staleTime: 30_000,
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: { is_admin?: boolean } }) =>
      adminApi.updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users })
      toast.success(t('admin.users.updateSuccess'))
    },
    onError: (err: Error) => {
      toast.error(err.message || t('admin.users.updateError'))
    },
  })
}

export function useAdminDecks(params?: Parameters<typeof adminApi.listDecks>[0]) {
  return useQuery({
    queryKey: adminKeys.decksList(params as Record<string, unknown>),
    queryFn: () => adminApi.listDecks(params),
    staleTime: 30_000,
  })
}

export function useUpdateDeck() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ deckId, data }: { deckId: string; data: { is_shared?: boolean } }) =>
      adminApi.updateDeck(deckId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.decks })
      toast.success(t('admin.decks.updateSuccess'))
    },
    onError: (err: Error) => {
      toast.error(err.message || t('admin.decks.updateError'))
    },
  })
}

export function useDeleteDeck() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: (deckId: string) => adminApi.deleteDeck(deckId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.decks })
      toast.success(t('admin.decks.deleteSuccess'))
    },
    onError: (err: Error) => {
      toast.error(err.message || t('admin.decks.deleteError'))
    },
  })
}
