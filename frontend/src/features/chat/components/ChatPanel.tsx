import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X, Bot, Headphones } from 'lucide-react'
import { AIChatTab } from './AIChatTab'
import { AdminChatTab } from './AdminChatTab'

interface ChatPanelProps {
  onClose: () => void
}

type Tab = 'ai' | 'support'

const tabClass = (active: boolean) =>
  `flex-1 flex items-center justify-center gap-1.5 min-h-[40px] px-2 rounded-[12px] border-2 text-sm font-bold transition-transform duration-150 active:scale-[0.97] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky ${
    active
      ? 'bg-sky border-ink text-ink'
      : 'border-transparent text-muted hover:text-fg hover:bg-fg/[0.06]'
  }`

export function ChatPanel({ onClose }: ChatPanelProps) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<Tab>('ai')

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pl-4 pr-2 pt-3 pb-2">
        <h3 className="font-display text-lg leading-tight text-fg">
          {t('chat.title')}
        </h3>
        <button
          onClick={onClose}
          className="btn-ghost h-10 w-10 px-0 text-muted hover:text-fg"
          aria-label={t('chat.close', 'Close chat')}
        >
          <X className="w-5 h-5" aria-hidden />
        </button>
      </div>

      {/* Tabs: sticker segmented control */}
      <div className="px-3 pb-3 border-b-2 border-line">
        <div role="tablist" className="flex gap-1 rounded-[16px] bg-surface p-1">
          <button
            role="tab"
            aria-selected={activeTab === 'ai'}
            onClick={() => setActiveTab('ai')}
            className={tabClass(activeTab === 'ai')}
          >
            <Bot className="w-4 h-4 shrink-0" aria-hidden />
            <span className="truncate">{t('chat.aiTab')}</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'support'}
            onClick={() => setActiveTab('support')}
            className={tabClass(activeTab === 'support')}
          >
            <Headphones className="w-4 h-4 shrink-0" aria-hidden />
            <span className="truncate">{t('chat.supportTab')}</span>
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 min-h-0">
        {activeTab === 'ai' ? <AIChatTab /> : <AdminChatTab />}
      </div>
    </div>
  )
}
