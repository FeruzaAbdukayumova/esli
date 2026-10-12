import { useRef, useState, DragEvent, ClipboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Sparkles, Paperclip, ArrowRight } from 'lucide-react'
import { useCreateDeck } from '@/features/decks/hooks'
import { AIGenerateDeckModal } from './AIGenerateDeckModal'
import { CreateDeckModal, type CreateMethod } from './CreateDeckModal'

const SPREADSHEET_RE = /\.(xlsx|xls|csv)$/i

/**
 * Compact "magic intake" for the populated dashboard — the same
 * give-Esli-anything promise as the first-run screen, always available.
 * Type a topic, drop a PDF or spreadsheet, or paste a list of cards.
 */
export function CreationBar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const createDeckMutation = useCreateDeck()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [text, setText] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [aiTopic, setAiTopic] = useState('')
  const [aiFile, setAiFile] = useState<File | null>(null)
  const [showAIModal, setShowAIModal] = useState(false)
  const [createMethod, setCreateMethod] = useState<CreateMethod | null>(null)

  const openTopic = () => {
    const topic = text.trim()
    if (!topic) return
    setAiTopic(topic)
    setAiFile(null)
    setShowAIModal(true)
  }

  const routeFile = (file: File) => {
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      setAiFile(file)
      setAiTopic('')
      setShowAIModal(true)
    } else if (SPREADSHEET_RE.test(file.name)) {
      toast(t('emptyDash.toastSpreadsheet', 'Spreadsheet detected. Name your deck, then import it.'))
      setCreateMethod('file')
    } else {
      toast.error(t('emptyDash.toastUnsupportedFile', 'Drop a PDF or a spreadsheet (.xlsx / .csv)'))
    }
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) routeFile(file)
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text')
    if (pasted.includes('\n') && pasted.trim().split('\n').length >= 3) {
      e.preventDefault()
      toast(t('emptyDash.looksLikeList', 'Looks like a list of cards'))
      setCreateMethod('bulk')
    }
  }

  const handleCreateDeck = async (title: string, categoryTags: string[], method: CreateMethod) => {
    if (method === 'ai') {
      setCreateMethod(null)
      setShowAIModal(true)
      return
    }
    try {
      const deck = await createDeckMutation.mutateAsync({ title, categoryTags })
      setCreateMethod(null)
      const addMode = method === 'file' ? 'file' : method === 'bulk' ? 'bulk' : ''
      navigate(addMode ? `/deck/${deck.id}?addMode=${addMode}` : `/deck/${deck.id}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.failedToCreateDeck'))
    }
  }

  return (
    <>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`group relative flex items-center gap-2 rounded-2xl border bg-white/70 dark:bg-slate-800/60 backdrop-blur-md p-2 pl-4 shadow-elevation-sm transition-[border-color,box-shadow] duration-200 focus-within:border-primary-400 focus-within:shadow-glow-md ${
          dragOver
            ? 'border-primary-500 shadow-glow-md'
            : 'border-slate-200/80 dark:border-slate-700/60'
        }`}
      >
        <Sparkles className="h-4 w-4 shrink-0 text-primary-500 dark:text-primary-400" aria-hidden />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') openTopic() }}
          onPaste={handlePaste}
          placeholder={`${t('emptyDash.headline', 'Give Esli anything.')} ${t('emptyDash.hintTopic', 'Type a topic…')}`}
          aria-label={t('emptyDash.inputAria', 'Type a topic, paste notes, or drop a file')}
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.xlsx,.xls,.csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) routeFile(file)
            e.target.value = ''
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title={t('emptyDash.fileHint', 'PDF or spreadsheet')}
          aria-label={t('emptyDash.attachFile', 'Attach file')}
          className="hidden sm:flex items-center gap-1.5 shrink-0 min-h-[38px] px-3 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <Paperclip className="h-3.5 w-3.5" aria-hidden />
          {t('emptyDash.attachFile', 'Attach file')}
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label={t('emptyDash.attachFile', 'Attach file')}
          className="sm:hidden flex items-center justify-center shrink-0 min-w-[38px] min-h-[38px] rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <Paperclip className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={openTopic}
          disabled={!text.trim()}
          className="flex items-center gap-1.5 shrink-0 min-h-[38px] px-4 rounded-xl text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-40 disabled:pointer-events-none transition-[background-color,opacity] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        >
          {t('emptyDash.makeMyCards', 'Make my cards')}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>

      <AIGenerateDeckModal
        isOpen={showAIModal}
        onClose={() => { setShowAIModal(false); setAiFile(null); setAiTopic(''); setText('') }}
        initialMode={aiFile ? 'pdf' : 'topic'}
        initialFile={aiFile}
        initialTopic={aiTopic}
      />
      <CreateDeckModal
        isOpen={createMethod !== null}
        isPending={createDeckMutation.isPending}
        initialMethod={createMethod ?? undefined}
        onClose={() => setCreateMethod(null)}
        onSubmit={handleCreateDeck}
      />
    </>
  )
}
