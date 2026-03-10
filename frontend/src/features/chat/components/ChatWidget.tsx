import { useState } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle } from 'lucide-react'
import { ChatPanel } from './ChatPanel'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return createPortal(
    <>
      {/* Floating bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[1100] w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-200 flex items-center justify-center hover:scale-110"
        >
          <MessageCircle className="w-7 h-7" fill="currentColor" />
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
