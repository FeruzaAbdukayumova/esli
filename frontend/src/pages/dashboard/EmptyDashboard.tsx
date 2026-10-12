import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  Sparkles,
  ArrowRight,
  FileText,
  FileSpreadsheet,
  ClipboardList,
  Pencil,
  Globe,
  Telescope,
  Wand2,
  Paperclip,
} from 'lucide-react'
import { generateCardsAI } from '@/features/decks/aiApi'
import { useCreateDeck, useAddCardsBatch } from '@/features/decks/hooks'
import { CreateDeckModal, type CreateMethod } from './components/CreateDeckModal'
import { AIGenerateDeckModal } from './components/AIGenerateDeckModal'
import { seedDemoSky } from '@/shared/lib/devSeed'

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
      { icon: Sparkles, text: t('emptyDash.hintTopic', 'Type a topic…') },
      { icon: FileText, text: t('emptyDash.hintPdf', '…or drop a PDF') },
      { icon: FileSpreadsheet, text: t('emptyDash.hintSpreadsheet', '…or a spreadsheet') },
      { icon: ClipboardList, text: t('emptyDash.hintNotes', '…or paste your notes') },
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
      toast(t('emptyDash.toastSpreadsheet', 'Spreadsheet detected. Name your deck, then import it.'), { icon: '📊' })
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

  const HintIcon = hints[hintIdx].icon

  return (
    <div className="w-full max-w-2xl mx-auto py-10 sm:py-16 text-center">
      <style>{`
        @keyframes esli-sheen { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes esli-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-medium">
        <Wand2 className="w-3.5 h-3.5" aria-hidden />
        {t('emptyDash.badge', 'AI-powered learning')}
      </div>
      <h1 className="text-3xl sm:text-[2.6rem] font-bold tracking-[-0.03em] leading-tight text-slate-900 dark:text-slate-50">
        {greetingName
          ? t('emptyDash.headlineNamed', '{{name}}, give Esli anything.', { name: greetingName })
          : t('emptyDash.headline', 'Give Esli anything.')}
        <br className="hidden sm:block" /> {t('emptyDash.headlineTail', 'Get flashcards.')}
      </h1>
      <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
        {t('emptyDash.subtitle', 'A topic, a PDF, a spreadsheet, your messy notes. Drop it in and it becomes a deck.')}
      </p>

      {/* The one magic intake */}
      <form onSubmit={generate} className="mt-8">
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className="relative rounded-3xl p-[2px] transition-transform duration-200"
          style={{
            background: dragging
              ? 'linear-gradient(90deg, rgb(var(--color-primary-500)), rgb(var(--color-primary-600)), rgb(var(--color-primary-400)), rgb(var(--color-primary-600)))'
              : 'linear-gradient(90deg, rgba(var(--color-primary-500),0.4), rgba(var(--color-primary-400),0.15), rgba(var(--color-primary-500),0.4))',
            backgroundSize: '200% 100%',
            animation: 'esli-sheen 4s linear infinite',
            transform: dragging ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          <div className="relative rounded-[1.4rem] bg-white dark:bg-slate-800 p-3">
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
              className="w-full resize-none bg-transparent px-2 pt-1 text-lg text-slate-900 dark:text-slate-100 placeholder-transparent focus:outline-none"
            />

            {/* Animated empty-state hint (only when nothing typed) */}
            {!text && !dragging && (
              <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 text-lg text-slate-400 dark:text-slate-500">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={hintIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-2"
                  >
                    <HintIcon className="h-4 w-4" aria-hidden />
                    {hints[hintIdx].text}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}

            {/* Drag overlay */}
            {dragging && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[1.4rem] bg-primary-50/90 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 font-semibold">
                {t('emptyDash.dropOverlay', "Drop it and I'll turn it into cards ✨")}
              </div>
            )}

            <div className="flex items-center justify-between gap-2 px-2 pb-1">
              <div className="flex items-center gap-2">
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
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 transition-[transform,border-color,color] duration-150 hover:-translate-y-0.5 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <Paperclip className="h-3.5 w-3.5" aria-hidden />
                  {t('emptyDash.attachFile', 'Attach file')}
                </button>
                <span className="hidden sm:inline text-xs text-slate-400 dark:text-slate-500">
                  {pasteList
                    ? t('emptyDash.looksLikeList', 'Looks like a list of cards')
                    : t('emptyDash.fileHint', 'PDF or spreadsheet')}
                </span>
              </div>
              {pasteList ? (
                <button
                  type="button"
                  onClick={() => openCreate('bulk')}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition-[transform,background-color] duration-150 hover:bg-amber-600 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <ClipboardList className="h-4 w-4" aria-hidden />
                  {t('emptyDash.importAsCards', 'Import as cards')}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!text.trim() || generating}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-5 py-2 text-sm font-semibold text-white transition-[transform,background-color] duration-150 hover:bg-primary-700 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  {generating ? t('emptyDash.building', 'Building…') : t('emptyDash.makeMyCards', 'Make my cards')}
                  {!generating && <ArrowRight className="h-4 w-4" aria-hidden />}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* "Esli understands:" — the clarity anchor + clickable shortcuts */}
      <div className="mt-7">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {t('emptyDash.understands', 'Esli understands')}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
          <Shortcut icon={Sparkles} label={t('emptyDash.pillTopic', 'A topic')} tint="primary" onClick={() => taRef.current?.focus()} />
          <Shortcut icon={FileText} label={t('emptyDash.pillPdf', 'A PDF')} tint="rose" badge={t('emptyDash.pillAiBadge', 'AI')} onClick={() => openAI('pdf')} />
          <Shortcut icon={FileSpreadsheet} label={t('emptyDash.pillSpreadsheet', 'A spreadsheet')} tint="emerald" onClick={() => openCreate('file')} />
          <Shortcut icon={ClipboardList} label={t('emptyDash.pillPastedList', 'A pasted list')} tint="amber" onClick={() => openCreate('bulk')} />
          <Shortcut icon={Pencil} label={t('emptyDash.pillWriteOwn', 'Write your own')} tint="sky" onClick={() => openCreate('empty')} />
        </div>
      </div>

      {/* Community fallback */}
      <button
        type="button"
        onClick={() => navigate('/browse')}
        className="group mt-8 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 transition-[transform,color,background-color] duration-150 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-slate-800 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <Globe className="h-4 w-4" aria-hidden />
        {t('emptyDash.browseCommunity', 'Or copy a ready-made deck from 800+ community decks')}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </button>

      {import.meta.env.DEV && (
        <div className="mt-12">
          <button
            type="button"
            onClick={seedDemoSky}
            className="inline-flex items-center gap-2 rounded-lg border border-dashed border-primary-400/50 px-3 py-1.5 text-xs font-medium text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            title="Dev only — seeds guest decks so the populated dashboard renders"
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

const TINT: Record<string, string> = {
  primary: 'text-primary-600 dark:text-primary-400',
  rose: 'text-rose-500',
  emerald: 'text-emerald-500',
  amber: 'text-amber-500',
  sky: 'text-sky-500',
}

function Shortcut({
  icon: Icon,
  label,
  tint,
  badge,
  onClick,
}: {
  icon: typeof Sparkles
  label: string
  tint: string
  badge?: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-600 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      <Icon className={`h-4 w-4 ${TINT[tint]}`} aria-hidden />
      {label}
      {badge && (
        <span className="rounded-full bg-primary-100 dark:bg-primary-900/40 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary-600 dark:text-primary-400">
          {badge}
        </span>
      )}
    </button>
  )
}
