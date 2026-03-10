import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Headphones, Loader2 } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { chatApi } from '../chatApi'
import { useSupportMessages, useSendSupportMessage, chatKeys } from '../chatHooks'
import { getGuestChatId } from '../guestChatId'
import { useChatWebSocket } from '../useWebSocket'
import { ChatMessageBubble } from './ChatMessageBubble'
import { ChatInput } from './ChatInput'
import type { ChatMessage } from '../types'

const SUPPORT_CONV_KEY = 'flashcards_support_chat_conv'

export function AdminChatTab() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthContext()
  const queryClient = useQueryClient()
  const [conversationId, setConversationId] = useState<string | null>(
    () => localStorage.getItem(SUPPORT_CONV_KEY)
  )
  const [creating, setCreating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const guestId = isAuthenticated ? undefined : getGuestChatId()

  const { data: messages = [] } = useSupportMessages(conversationId, guestId)
  const sendMutation = useSendSupportMessage()

  const handleWsMessage = useCallback((msg: ChatMessage) => {
    if (!conversationId) return
    queryClient.setQueryData(
      chatKeys.supportMessages(conversationId),
      (old: ChatMessage[] | undefined) => {
        if (!old) return [msg]
        if (old.some((m) => m.id === msg.id)) return old
        return [...old, msg]
      }
    )
  }, [conversationId, queryClient])

  useChatWebSocket(conversationId, guestId ?? null, handleWsMessage)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (content: string) => {
    let convId = conversationId
    if (!convId) {
      setCreating(true)
      try {
        const conv = await chatApi.createSupportConversation(guestId)
        convId = conv.id
        setConversationId(convId)
        localStorage.setItem(SUPPORT_CONV_KEY, convId)
      } finally {
        setCreating(false)
      }
    }
    sendMutation.mutate({ conversationId: convId, content, guestId })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && !sendMutation.isPending && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-slate-500 text-sm">
            <Headphones className="w-10 h-10 mb-2 opacity-50" />
            <p className="text-center">{t('chat.supportWelcome')}</p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}
        {(sendMutation.isPending || creating) && (
          <div className="flex justify-end">
            <div className="bg-primary-600 rounded-2xl rounded-br-md px-4 py-3 text-sm text-white/70 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('chat.sending')}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} disabled={sendMutation.isPending || creating} />
    </div>
  )
}
