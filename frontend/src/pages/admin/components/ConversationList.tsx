import { useTranslation } from 'react-i18next'
import { MessageCircle } from 'lucide-react'
import type { ChatConversation } from '@/features/chat/types'

interface ConversationListProps {
  conversations: ChatConversation[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  const { t } = useTranslation()

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500 py-12">
        <MessageCircle className="w-10 h-10 mb-2 opacity-50" />
        <p className="text-sm">{t('admin.support.noConversations')}</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-700">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          className={`w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
            selectedId === conv.id ? 'bg-primary-50 dark:bg-primary-900/20 border-l-2 border-primary-600' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
              {conv.user_id ? `User` : `${t('admin.support.guest')}`}
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
              conv.status === 'open'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-400'
            }`}>
              {conv.status === 'open' ? t('admin.support.open') : t('admin.support.closed')}
            </span>
          </div>
          {conv.last_message && (
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {conv.last_message.content}
            </p>
          )}
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
            {new Date(conv.updated_at).toLocaleDateString(undefined, {
              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
            })}
          </p>
        </button>
      ))}
    </div>
  )
}
