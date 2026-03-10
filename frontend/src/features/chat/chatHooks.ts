import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { chatApi } from './chatApi'

export const chatKeys = {
  aiMessages: (id: string) => ['chat', 'ai', id, 'messages'] as const,
  supportMessages: (id: string) => ['chat', 'support', id, 'messages'] as const,
  adminConversations: ['chat', 'admin', 'conversations'] as const,
}

// --- AI Chat ---

export function useAIMessages(conversationId: string | null, guestId?: string) {
  return useQuery({
    queryKey: chatKeys.aiMessages(conversationId ?? ''),
    queryFn: () => chatApi.getAIMessages(conversationId!, guestId),
    enabled: !!conversationId,
    staleTime: Infinity,
  })
}

export function useSendAIMessage() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ conversationId, content, guestId }: {
      conversationId: string
      content: string
      guestId?: string
    }) => chatApi.sendAIMessage(conversationId, content, guestId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: chatKeys.aiMessages(variables.conversationId) })
    },
    onError: (err: Error) => {
      toast.error(err.message || t('chat.sendError'))
    },
  })
}

// --- Live Support (user side) ---

export function useSupportMessages(conversationId: string | null, guestId?: string) {
  return useQuery({
    queryKey: chatKeys.supportMessages(conversationId ?? ''),
    queryFn: () => chatApi.getSupportMessages(conversationId!, guestId),
    enabled: !!conversationId,
    staleTime: Infinity,
  })
}

export function useSendSupportMessage() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ conversationId, content, guestId }: {
      conversationId: string
      content: string
      guestId?: string
    }) => chatApi.sendSupportMessage(conversationId, content, guestId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: chatKeys.supportMessages(variables.conversationId) })
    },
    onError: (err: Error) => {
      toast.error(err.message || t('chat.sendError'))
    },
  })
}

// --- Admin panel ---

export function useAdminConversations(status?: string) {
  return useQuery({
    queryKey: [...chatKeys.adminConversations, status],
    queryFn: () => chatApi.listAllConversations(status),
    staleTime: 10_000,
    refetchInterval: 15_000,
  })
}

export function useAdminReply() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ conversationId, content }: { conversationId: string; content: string }) =>
      chatApi.adminReply(conversationId, content),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: chatKeys.supportMessages(variables.conversationId) })
      queryClient.invalidateQueries({ queryKey: chatKeys.adminConversations })
    },
    onError: (err: Error) => {
      toast.error(err.message || t('chat.sendError'))
    },
  })
}

export function useCloseConversation() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: (conversationId: string) => chatApi.closeConversation(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.adminConversations })
      toast.success(t('admin.support.conversationClosed'))
    },
    onError: (err: Error) => {
      toast.error(err.message || t('chat.sendError'))
    },
  })
}
