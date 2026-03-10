import { apiClient } from '@/shared/lib/apiClient'
import type { ChatConversation, ChatMessage } from './types'

export const chatApi = {
  // --- AI Chat ---

  createAIConversation(guestId?: string): Promise<ChatConversation> {
    return apiClient.post<ChatConversation>('/chat/ai/conversations', { guest_id: guestId })
  },

  sendAIMessage(conversationId: string, content: string, guestId?: string): Promise<ChatMessage> {
    return apiClient.post<ChatMessage>(`/chat/ai/conversations/${conversationId}/messages`, {
      content,
      guest_id: guestId,
    })
  },

  getAIMessages(conversationId: string, guestId?: string): Promise<ChatMessage[]> {
    const params = guestId ? `?guest_id=${guestId}` : ''
    return apiClient.get<ChatMessage[]>(`/chat/ai/conversations/${conversationId}/messages${params}`)
  },

  // --- Live Support (user side) ---

  createSupportConversation(guestId?: string): Promise<ChatConversation> {
    return apiClient.post<ChatConversation>('/chat/support/conversations', { guest_id: guestId })
  },

  sendSupportMessage(conversationId: string, content: string, guestId?: string): Promise<ChatMessage> {
    return apiClient.post<ChatMessage>(`/chat/support/conversations/${conversationId}/messages`, {
      content,
      guest_id: guestId,
    })
  },

  getSupportMessages(conversationId: string, guestId?: string): Promise<ChatMessage[]> {
    const params = guestId ? `?guest_id=${guestId}` : ''
    return apiClient.get<ChatMessage[]>(`/chat/support/conversations/${conversationId}/messages${params}`)
  },

  // --- Admin panel ---

  listAllConversations(status?: string): Promise<ChatConversation[]> {
    const params = status ? `?status=${status}` : ''
    return apiClient.get<ChatConversation[]>(`/chat/admin/conversations${params}`)
  },

  adminReply(conversationId: string, content: string): Promise<ChatMessage> {
    return apiClient.post<ChatMessage>(`/chat/admin/conversations/${conversationId}/reply`, { content })
  },

  closeConversation(conversationId: string): Promise<ChatConversation> {
    return apiClient.patch<ChatConversation>(`/chat/admin/conversations/${conversationId}`, { status: 'closed' })
  },
}
