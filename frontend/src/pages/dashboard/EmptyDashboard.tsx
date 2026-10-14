import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { Paperclip, Telescope } from 'lucide-react'
import { generateCardsAI } from '@/features/decks/aiApi'
import { useCreateDeck, useAddCardsBatch } from '@/features/decks/hooks'
import { CreateDeckModal, type CreateMethod } from './components/CreateDeckModal'
import { AIGenerateDeckModal } from './components/AIGenerateDeckModal'
import { seedDemoSky } from '@/shared/lib/devSeed'
import { Plant } from './components/WordGarden'

interface EmptyDashboardProps {
  greetingName?: string
}

const FIRST_DECK_COUNT = 10

/**
 * First-run experience — "give Esli anything, get flashcards."
 *
 * Instead of a grid of methods, there is ONE living intake surface that
 * accepts everything: type a topic, drop a PDF, drop a spreadsheet, or paste
 * a list. It detects what you gave it and routes to the right flow. One
 * obvious place to act, and it visibly shows it eats any input.
 */
export function EmptyDashboard({ greetingName }: EmptyDashboardProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const createDeck = useCreateDeck()
  const addCards = useAddCardsBatch()

  // Rotating hints that prove the one box accepts everything.
  // Built with t() inside the component so language switches apply live.
  const hints = useMemo(
    () => [
      t('emptyDash.hintTopic', 'Type a topic…'),
      t('emptyDash.hintPdf', '…or drop a PDF'),
      t('emptyDash.hintSpreadsheet', '…or a spreadsheet'),
      t('emptyDash.hintNotes', '…or paste your notes'),
    ],
    [t],
  )

  const [text, setText] = useState('')
  const [generating, setGenerating] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [hintIdx, setHintIdx] = useState(0)
  const [pasteList, setPasteList] = useState(false)

  const [showCreate, setShowCreate] = useState(false)
  const [createMethod, setCreateMethod] = useState<CreateMethod>('empty')
  const [showAI, setShowAI] = useState(false)
  const [aiMode, setAiMode] = useState<'topic' | 'pdf'>('topic')
  const [droppedFile, setDroppedFile] = useState<File | null>(null)

  const taRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const id = window.setInterval(() => setHintIdx((i) => (i + 1) % hints.length), 2200)
    return () => window.clearInterval(id)
  }, [hints.length])

  const openCreate = (method: CreateMethod) => {
    setCreateMethod(method)
    setShowCreate(true)
  }
  const openAI = (mode: 'topic' | 'pdf', file: File | null = null) => {
    setAiMode(mode)
    setDroppedFile(file)
    setShowAI(true)
  }

  const routeFile = (file: File) => {
    const name = file.name.toLowerCase()
    if (file.type === 'application/pdf' || name.endsWith('.pdf')) {
      openAI('pdf', file)
    } else if (/\.(xlsx|xls|csv)$/.test(name) || file.type.includes('sheet') || file.type.includes('csv')) {
      toast(t('emptyDash.toastSpreadsheet', 'Spreadsheet detected. Name your deck, then import it.'))
      openCreate('file')
    } else {
      toast.error(t('emptyDash.toastUnsupportedFile', 'Drop a PDF or a spreadsheet (.xlsx / .csv)'))
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) routeFile(file)
  }

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) routeFile(file)
    e.target.value = '' // allow re-picking the same file
  }

  const onPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pasted = e.clipboardData.getData('text')
    if ((pasted.match(/\n/g) || []).length >= 2) setPasteList(true)
  }

  const generate = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const topic = text.trim()
      if (!topic || generating) return
      setGenerating(true)
      try {
        const res = await generateCardsAI({ topic, count: FIRST_DECK_COUNT, includeDeckInfo: true })
        if (!res.cards.length) throw new Error(t('emptyDash.errorNoCards', 'No cards generated'))
        const deck = await createDeck.mutateAsync({
          title: res.suggestedTitle || topic.slice(0, 100),
          categoryTags: res.suggestedTags ?? [],
        })
        await addCards.mutateAsync({
          deckId: deck.id,
          cards: res.cards.map((c) => ({ frontText: c.frontText, backText: c.backText })),
        })
        navigate(`/study/${deck.id}`)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : t('emptyDash.errorBuildDeck', 'Could not build your deck. Try again'))
        setGenerating(false)
      }
    },
    [text, generating, createDeck, addCards, navigate, t],
  )

  const handleCreateSubmit = async (title: string, tags: string[], method: CreateMethod) => {
    if (method === 'ai') {
      setShowCreate(false)
      openAI('topic')
      return
    }
    try {
      const deck = await createDeck.mutateAsync({ title, categoryTags: tags })
      setShowCreate(false)
      const addMode = method === 'file' ? 'file' : method === 'bulk' ? 'bulk' : ''
      navigate(addMode ? `/deck/${deck.id}?addMode=${addMode}` : `/deck/${deck.id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('emptyDash.errorCreateDeck', 'Could not create deck'))
    }
  }


  const linkBtn =
    'font-medium text-fg underline decoration-line underline-offset-4 hover:decoration-brand rounded active:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand'

  return (
    <div className="w-full max-w-2xl mx-auto pt-2 sm:pt-6">
      <Plant stage={0} mood="new" className="-ml-3 mb-2 h-24 w-20" />
      <h1 className="font-display text-[1.75rem] sm:text-[2.5rem] leading-[1.15] text-fg">
        {greetingName
          ? t('emptyDash.headlineNamed', '{{name}}, give Esli anything.', { name: greetingName })
          : t('emptyDash.headline', 'Give Esli anything.')}{' '}
        {t('emptyDash.headlineTail', 'Get flashcards.')}
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-muted">
        {t('emptyDash.subtitle', 'A topic, a PDF, a spreadsheet, your messy notes. Drop it in and it becomes a deck.')}
      </p>

      <form onSubmit={generate} className="mt-8">
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`sticker -rotate-1 transition-transform duration-150 focus-within:rotate-0 focus-within:ring-[3px] focus-within:ring-sky ${dragging ? 'border-dashed' : ''}`}
        >
          <div className="relative px-5 pt-4">
            <textarea
              ref={taRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onPaste={onPaste}
              rows={3}
              maxLength={2000}
              autoFocus
              placeholder=" "
              aria-label={t('emptyDash.inputAria', 'Type a topic, paste notes, or drop a file')}
              className="block w-full resize-none bg-transparent text-lg font-medium leading-relaxed text-ink placeholder-transparent focus:outline-none"
            />
            {!text && !dragging && (
              <div className="pointer-events-none absolute left-5 top-4 text-lg leading-relaxed text-ink/50">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={hintIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="inline-block"
                  >
                    {hints[hintIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
            {dragging && (
              <div className="pointer-events-none absolute left-5 top-4 text-lg leading-relaxed font-bold text-ink">
                {t('desk.dropHere', 'Drop it here')}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 px-3 pb-3 pt-2">
            <div className="flex items-center gap-2 min-w-0">
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.xlsx,.xls,.csv,application/pdf"
                onChange={onPickFile}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-1.5 min-h-[44px] rounded-xl px-3 text-sm font-semibold text-ink/60 hover:text-ink hover:bg-ink/5 active:scale-[0.97] transition-[transform,color,background-color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <Paperclip className="h-4 w-4" aria-hidden />
                {t('emptyDash.attachFile', 'Attach file')}
              </button>
              <span className="hidden sm:inline truncate text-sm text-ink/50">
                {pasteList
                  ? t('emptyDash.looksLikeList', 'Looks like a list of cards')
                  : t('emptyDash.fileHint', 'PDF or spreadsheet')}
              </span>
            </div>
            {pasteList ? (
              <button type="button" onClick={() => openCreate('bulk')} className="btn-brand shrink-0 min-h-[48px] px-5 text-base">
                {t('emptyDash.importAsCards', 'Import as cards')}
              </button>
            ) : (
              <button type="submit" disabled={!text.trim() || generating} className="btn-brand shrink-0 min-h-[48px] px-5 text-base">
                {generating ? t('emptyDash.building', 'Building…') : t('emptyDash.makeMyCards', 'Make my cards')}
              </button>
            )}
          </div>
        </div>
      </form>

      <p className="mt-8 leading-relaxed text-muted">
        {t('desk.otherWays', 'Other ways to start:')}{' '}
        <button type="button" onClick={() => openCreate('file')} className={linkBtn}>
          {t('emptyDash.pillSpreadsheet', 'A spreadsheet')}
        </button>
        {', '}
        <button type="button" onClick={() => openCreate('bulk')} className={linkBtn}>
          {t('emptyDash.pillPastedList', 'A pasted list')}
        </button>
        {', '}
        <button type="button" onClick={() => openCreate('empty')} className={linkBtn}>
          {t('emptyDash.pillWriteOwn', 'Write your own')}
        </button>
        {', '}
        <button type="button" onClick={() => navigate('/browse')} className={linkBtn}>
          {t('desk.copyReadyMade', 'Copy a ready-made deck')}
        </button>
      </p>

      {import.meta.env.DEV && (
        <div className="mt-12">
          <button
            type="button"
            onClick={seedDemoSky}
            className="inline-flex items-center gap-2 rounded-md border border-dashed border-line px-3 py-1.5 text-xs font-medium text-muted hover:bg-surface active:scale-[0.97] transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            title="Dev only: seeds guest decks so the populated dashboard renders"
          >
            <Telescope className="h-3.5 w-3.5" aria-hidden />
            Seed demo data (dev)
          </button>
        </div>
      )}

      <CreateDeckModal
        isOpen={showCreate}
        isPending={createDeck.isPending}
        initialMethod={createMethod}
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreateSubmit}
      />
      <AIGenerateDeckModal
        isOpen={showAI}
        initialMode={aiMode}
        initialFile={droppedFile}
        onClose={() => {
          setShowAI(false)
          setDroppedFile(null)
        }}
      />
    </div>
  )
}
