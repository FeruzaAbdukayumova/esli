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
          className="chat-fab btn-quiet fixed right-4 bottom-[calc(4rem+12px+env(safe-area-inset-bottom,0px))] lg:right-6 lg:bottom-6 z-[1100] h-12 w-12 lg:w-auto lg:h-11 lg:pl-4 lg:pr-5 rounded-full"
          aria-label={t('chat.getHelp')}
          title={t('chat.getHelp')}
        >
          <MessageCircle className="w-5 h-5" aria-hidden />
          <span className="hidden lg:inline text-sm">{t('chat.getHelp')}</span>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="sheet fixed z-[1100] left-3 right-3 bottom-[calc(4rem+12px+env(safe-area-inset-bottom,0px))] h-[min(560px,calc(100dvh-4rem-24px-env(safe-area-inset-bottom,0px)-env(safe-area-inset-top,0px)))] sm:left-auto sm:right-6 sm:w-[380px] lg:bottom-6 lg:h-[min(560px,calc(100dvh-48px))] flex flex-col overflow-hidden animate-[slide-up_200ms_ease-out] motion-reduce:animate-none">
          <ChatPanel onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>,
    document.body
  )
}
