import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Headphones } from 'lucide-react'
import { useAdminConversations } from '@/features/chat/chatHooks'
import { ConversationList } from './components/ConversationList'
import { ConversationDetail } from './components/ConversationDetail'
import { usePageMeta } from '@/shared/lib/usePageMeta'

export function AdminSupportPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('admin.nav.support', 'Support'), noIndex: true })
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { data: conversations = [] } = useAdminConversations(statusFilter)
  const selectedConversation = conversations.find((c) => c.id === selectedId) ?? null

  const filters = [
    { label: t('admin.support.filterAll'), value: undefined },
    { label: t('admin.support.filterOpen'), value: 'open' },
    { label: t('admin.support.filterClosed'), value: 'closed' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {t('admin.support.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {t('admin.support.subtitle')}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header with filters */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <Headphones className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {t('admin.support.title')}
            </h2>
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.label}
                onClick={() => setStatusFilter(f.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 ${
                  statusFilter === f.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex" style={{ height: 'calc(100vh - 350px)', minHeight: '400px' }}>
          <div className="w-80 flex-shrink-0 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
            <ConversationList
              conversations={conversations}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          <div className="flex-1 min-w-0">
            {selectedConversation ? (
              <ConversationDetail conversation={selectedConversation} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500 text-sm">
                <Headphones className="w-10 h-10 mb-2 opacity-50" />
                <p>{t('admin.support.selectConversation')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
