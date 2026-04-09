import { useState } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ChatPanel } from './ChatPanel'

export function ChatWidget() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return createPortal(
    <>
      {/* Floating bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[1100] flex items-center gap-2 pl-4 pr-5 h-12 rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-transform transition-shadow duration-200 active:scale-[0.97]"
          aria-label={t('chat.getHelp')}
          title={t('chat.getHelp')}
        >
          <MessageCircle className="w-5 h-5" fill="currentColor" />
          <span className="text-sm font-medium">{t('chat.getHelp')}</span>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[1100] w-[380px] h-[520px] max-w-[calc(100vw-48px)] max-h-[calc(100vh-48px)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 flex flex-col overflow-hidden animate-[slide-up_200ms_ease-out]">
          <ChatPanel onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>,
    document.body
  )
}
