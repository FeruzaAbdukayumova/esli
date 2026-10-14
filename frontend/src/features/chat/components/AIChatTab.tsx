import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Bot, Loader2 } from 'lucide-react'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { chatApi } from '../chatApi'
import { useAIMessages, useSendAIMessage } from '../chatHooks'
import { getGuestChatId } from '../guestChatId'
import { ChatMessageBubble } from './ChatMessageBubble'
import { ChatInput } from './ChatInput'

const AI_CONV_KEY = 'flashcards_ai_chat_conv'

export function AIChatTab() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthContext()
  const [conversationId, setConversationId] = useState<string | null>(
    () => localStorage.getItem(AI_CONV_KEY)
  )
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const guestId = isAuthenticated ? undefined : getGuestChatId()

  const { data: messages = [] } = useAIMessages(conversationId, guestId)
  const sendMutation = useSendAIMessage()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (content: string) => {
    let convId = conversationId
    if (!convId) {
      const conv = await chatApi.createAIConversation(guestId)
      convId = conv.id
      setConversationId(convId)
      localStorage.setItem(AI_CONV_KEY, convId)
    }
    sendMutation.mutate({ conversationId: convId, content, guestId })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && !sendMutation.isPending && (
          <div className="flex flex-col items-center justify-center h-full text-muted text-sm px-6">
            <Bot className="w-10 h-10 mb-2 opacity-60" aria-hidden />
            <p className="text-center leading-relaxed">{t('chat.aiWelcome')}</p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}
        {sendMutation.isPending && (
          <div className="flex justify-start">
            <div className="bg-surface border-2 border-edge rounded-[18px] rounded-bl-[6px] px-4 py-3 text-sm font-medium text-muted flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
              {t('chat.aiThinking')}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} disabled={sendMutation.isPending} />
    </div>
  )
}
