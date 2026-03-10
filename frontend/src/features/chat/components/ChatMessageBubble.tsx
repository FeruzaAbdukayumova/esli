import type { ChatMessage } from '../types'

interface ChatMessageBubbleProps {
  message: ChatMessage
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-primary-600 text-white rounded-br-md'
            : 'bg-gray-100 dark:bg-slate-600 text-gray-900 dark:text-white rounded-bl-md'
        }`}
      >
        {message.role === 'admin' && (
          <div className="text-xs font-medium opacity-70 mb-1">Support</div>
        )}
        <div className="whitespace-pre-wrap break-words">{message.content}</div>
        <div
          className={`text-[10px] mt-1 ${
            isUser ? 'text-white/60' : 'text-gray-400 dark:text-slate-400'
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
