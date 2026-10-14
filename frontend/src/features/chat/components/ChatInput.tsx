import { useState, useRef, KeyboardEvent } from 'react'
import { Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ChatInputProps {
  onSend: (content: string) => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-end gap-2 p-3 border-t-2 border-line">
      <textarea
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || t('chat.placeholder')}
        disabled={disabled}
        rows={1}
        className="field flex-1 min-h-[44px] max-h-24 resize-none py-2.5 leading-snug"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className="btn-ink flex-shrink-0 w-11 h-11 rounded-[14px] focus-visible:ring-offset-sheet"
        aria-label={t('chat.send', 'Send message')}
      >
        <Send className="w-4 h-4" aria-hidden />
      </button>
    </div>
  )
}
