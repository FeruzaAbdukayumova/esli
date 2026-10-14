import { useRef, useState, DragEvent, ClipboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Paperclip, ArrowRight } from 'lucide-react'
import { useCreateDeck } from '@/features/decks/hooks'
import { AIGenerateDeckModal } from './AIGenerateDeckModal'
import { CreateDeckModal, type CreateMethod } from './CreateDeckModal'
import { CREATE_INPUT_ID } from '../constants'

const SPREADSHEET_RE = /\.(xlsx|xls|csv)$/i

/**
 * The dashboard's hero: making a deck is the core of Esli, so it sits first.
 * Type a topic, tap an example, drop a PDF or spreadsheet, or paste a list of cards.
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

  const examples = [
    t('create.example1', 'IELTS band 7 words'),
    t('create.example2', 'Phrasal verbs with get'),
    t('create.example3', 'Irregular verbs'),
  ]

  const startExample = (topic: string) => {
    setAiTopic(topic)
    setAiFile(null)
    setShowAIModal(true)
  }

  const submit = () => {
    if (text.trim()) openTopic()
    else document.getElementById(CREATE_INPUT_ID)?.focus()
  }

  return (
    <>
      <section
        aria-labelledby="create-title"
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`sticker relative bg-lilac rotate-[0.6deg] p-5 sm:p-8 ${dragOver ? 'border-dashed' : ''}`}
      >
        <svg
          viewBox="0 0 64 64"
          className="pointer-events-none absolute -right-4 -top-6 h-14 w-14 rotate-12 sm:-right-6 sm:-top-8 sm:h-[72px] sm:w-[72px]"
          aria-hidden
        >
          <path
            d="M32 4l7.6 16.4L57 22.6 44 35l3.4 18L32 44.4 16.6 53 20 35 7 22.6l17.4-2.2z"
            fill="#FFC93C"
            stroke="#fff"
            strokeWidth="9"
            strokeLinejoin="round"
          />
          <path
            d="M32 4l7.6 16.4L57 22.6 44 35l3.4 18L32 44.4 16.6 53 20 35 7 22.6l17.4-2.2z"
            fill="#FFC93C"
            stroke="#17171A"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
        <h2 id="create-title" className="font-display text-[1.75rem] leading-[1.1] text-ink sm:text-[2.25rem] [text-wrap:balance]">
          {dragOver ? t('desk.dropHere', 'Drop it here') : t('create.title', 'Make a deck from anything')}
        </h2>
        <p className="mt-2 max-w-[52ch] text-base font-medium text-ink/75">
          {t('create.subtitle', 'Type a topic or drop a PDF. Esli writes the cards in seconds.')}
        </p>

        <div className="mt-5 flex items-center gap-2 rounded-[18px] border-[2.5px] border-ink bg-white p-2 pl-4 shadow-[inset_0_3px_0_rgb(23_23_26/0.08)] focus-within:ring-[3px] focus-within:ring-sky">
          <input
            id={CREATE_INPUT_ID}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') openTopic() }}
            onPaste={handlePaste}
            placeholder={t('desk.creationPlaceholder', 'Topic, notes or PDF')}
            aria-label={t('emptyDash.inputAria', 'Type a topic, paste notes, or drop a file')}
            className="min-w-0 flex-1 min-h-[48px] bg-transparent text-lg font-medium text-ink placeholder:text-ink/45 focus:outline-none"
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
            className="flex items-center justify-center gap-1.5 shrink-0 min-w-[48px] min-h-[48px] sm:px-3 rounded-xl text-sm font-semibold text-ink/60 hover:text-ink hover:bg-ink/5 active:scale-[0.97] transition-[transform,color,background-color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky"
          >
            <Paperclip className="h-5 w-5" aria-hidden />
            <span className="hidden sm:inline">{t('emptyDash.attachFile', 'Attach file')}</span>
          </button>
          <button
            type="button"
            onClick={submit}
            aria-label={t('desk.makeCards', 'Make cards')}
            className="btn-ink shrink-0 min-h-[48px] min-w-[48px] sm:px-5 text-base"
          >
            <span className="hidden sm:inline">{t('desk.makeCards', 'Make cards')}</span>
            <ArrowRight className="h-5 w-5 sm:hidden" aria-hidden />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-ink/70">{t('create.try', 'Try:')}</span>
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => startExample(ex)}
              className="min-h-[36px] rounded-full border-2 border-ink bg-white px-3 shadow-sticker-sm text-sm font-semibold text-ink transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky"
            >
              {ex}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCreateMethod('empty')}
            className="min-h-[36px] w-full rounded-lg px-1 text-left sm:ml-auto sm:w-auto text-sm font-semibold text-ink/70 underline decoration-2 underline-offset-4 hover:text-ink active:scale-[0.97] transition-[transform,color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky"
          >
            {t('create.byHand', 'Or write cards yourself')}
          </button>
        </div>
      </section>

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
