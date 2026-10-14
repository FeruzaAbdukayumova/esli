import { useTranslation } from 'react-i18next'
import type { ChatMessage } from '../types'

interface ChatMessageBubbleProps {
  message: ChatMessage
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const { t } = useTranslation()
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-[18px] border-2 px-3.5 py-2.5 text-sm font-medium leading-relaxed ${
          isUser
            ? 'bg-sky border-ink text-ink rounded-br-[6px]'
            : 'bg-surface border-edge text-fg rounded-bl-[6px]'
        }`}
      >
        {message.role === 'admin' && (
          <div className="text-xs font-bold text-muted mb-1">
            {t('chat.supportLabel', 'Support')}
          </div>
        )}
        <div className="whitespace-pre-wrap break-words">{message.content}</div>
        <div
          className={`text-[10px] mt-1 ${
            isUser ? 'text-ink/60' : 'text-muted'
          }`}
        >
          {new Date(message.created_at).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  )
}
