import { useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { X, MessageCircle } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useSupportMessages, useAdminReply, useCloseConversation, chatKeys } from '@/features/chat/chatHooks'
import { useChatWebSocket } from '@/features/chat/useWebSocket'
import { ChatMessageBubble } from '@/features/chat/components/ChatMessageBubble'
import { ChatInput } from '@/features/chat/components/ChatInput'
import type { ChatConversation, ChatMessage } from '@/features/chat/types'

interface ConversationDetailProps {
  conversation: ChatConversation
}

export function ConversationDetail({ conversation }: ConversationDetailProps) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { data: messages = [] } = useSupportMessages(conversation.id)
  const replyMutation = useAdminReply()
  const closeMutation = useCloseConversation()

  const handleWsMessage = useCallback((msg: ChatMessage) => {
    queryClient.setQueryData(
      chatKeys.supportMessages(conversation.id),
      (old: ChatMessage[] | undefined) => {
        if (!old) return [msg]
        if (old.some((m) => m.id === msg.id)) return old
        return [...old, msg]
      }
    )
  }, [conversation.id, queryClient])

  useChatWebSocket(conversation.id, null, handleWsMessage)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleReply = (content: string) => {
    replyMutation.mutate({ conversationId: conversation.id, content })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {conversation.user_id ? 'User' : t('admin.support.guest')}
          </h3>
          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            {new Date(conversation.created_at).toLocaleDateString()}
          </p>
        </div>
        {conversation.status === 'open' && (
          <button
            onClick={() => closeMutation.mutate(conversation.id)}
            disabled={closeMutation.isPending}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
          >
            <X className="w-3.5 h-3.5" />
            {t('admin.support.close')}
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm">
            <MessageCircle className="w-8 h-8 mb-2 opacity-50" />
            <p>{t('admin.support.noMessages')}</p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply input */}
      {conversation.status === 'open' && (
        <ChatInput
          onSend={handleReply}
          disabled={replyMutation.isPending}
          placeholder={t('admin.support.replyPlaceholder')}
        />
      )}
      {conversation.status === 'closed' && (
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 text-center text-xs text-slate-400 dark:text-slate-500">
          {t('chat.conversationClosed')}
        </div>
      )}
    </div>
  )
}
