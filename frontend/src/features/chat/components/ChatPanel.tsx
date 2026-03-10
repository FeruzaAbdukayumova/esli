import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X, Bot, Headphones } from 'lucide-react'
import { AIChatTab } from './AIChatTab'
import { AdminChatTab } from './AdminChatTab'

interface ChatPanelProps {
  onClose: () => void
}

type Tab = 'ai' | 'support'

export function ChatPanel({ onClose }: ChatPanelProps) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<Tab>('ai')

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-slate-600">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
          {t('chat.title')}
        </h3>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-500 dark:text-slate-400 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-600">
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'ai'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          {t('chat.aiTab')}
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'support'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
          }`}
        >
          <Headphones className="w-3.5 h-3.5" />
          {t('chat.supportTab')}
        </button>
      </div>

      {/* Tab content */}
      <div className="flex-1 min-h-0">
        {activeTab === 'ai' ? <AIChatTab /> : <AdminChatTab />}
      </div>
    </div>
  )
}
