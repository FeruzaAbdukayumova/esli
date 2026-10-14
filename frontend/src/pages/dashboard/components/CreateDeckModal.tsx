import { useState, useEffect, useRef, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Type, FileSpreadsheet, Upload } from 'lucide-react'
import { trackEvent } from '@/shared/lib/analytics'
import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'

export type CreateMethod = 'empty' | 'ai' | 'file' | 'bulk'

interface CreateDeckModalProps {
  isOpen: boolean
  isPending: boolean
  initialMethod?: CreateMethod
  onClose: () => void
  onSubmit: (title: string, categoryTags: string[], method: CreateMethod) => void
}

const TITLE_MAX_LENGTH = 100

export function CreateDeckModal({ isOpen, isPending, initialMethod, onClose, onSubmit }: CreateDeckModalProps) {
  const { t } = useTranslation()
  const [step, setStep] = useState<'method' | 'details'>(initialMethod ? 'details' : 'method')
  const [method, setMethod] = useState<CreateMethod>(initialMethod || 'empty')
  const [title, setTitle] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    onClose()
    setStep(initialMethod ? 'details' : 'method')
    setMethod(initialMethod || 'empty')
    setTitle('')
    setTagsInput('')
  }

  // Escape / backdrop / X on the details step steps back to method choice first
  const handleDismiss = () => {
    if (step === 'details' && !initialMethod) {
      setStep('method')
    } else {
      handleClose()
    }
  }

  useEffect(() => {
    if (isOpen && step === 'details') {
      const timer = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(timer)
    }
  }, [isOpen, step])

  useEffect(() => {
    if (isOpen && initialMethod) {
      setMethod(initialMethod)
      setStep('details')
    } else if (isOpen && !initialMethod) {
      setStep('method')
      setMethod('empty')
    }
  }, [isOpen, initialMethod])

  const handleSelectMethod = (m: CreateMethod) => {
    trackEvent('deck.create', { method: m })
    setMethod(m)
    if (m === 'ai') {
      // AI has its own full modal, just signal parent
      onSubmit('', [], 'ai')
      handleClose()
      return
    }
    setStep('details')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim().slice(0, TITLE_MAX_LENGTH)
    if (!trimmed) return
    const categoryTags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
    onSubmit(trimmed, categoryTags, method)
  }

  // Each way to start is a white sticker; its icon chip carries a palette fill (DESIGN.md)
  const methods = [
    {
      id: 'empty' as CreateMethod,
      icon: Plus,
      label: t('dashboard.createEmpty', 'Empty Deck'),
      desc: t('dashboard.createEmptyDesc', 'Create a blank deck and add cards manually'),
      chip: 'bg-sky',
    },
    {
      id: 'ai' as CreateMethod,
      icon: Type,
      label: t('dashboard.generateWithAI', 'Generate with AI'),
      desc: t('dashboard.generateWithAIDesc', 'Describe a topic and AI creates flashcards'),
      chip: 'bg-lilac',
    },
    {
      id: 'file' as CreateMethod,
      icon: FileSpreadsheet,
      label: t('dashboard.importFile', 'Import from File'),
      desc: t('dashboard.importFileDesc', 'Upload an Excel or CSV spreadsheet'),
      chip: 'bg-mint',
    },
    {
      id: 'bulk' as CreateMethod,
      icon: Upload,
      label: t('dashboard.bulkImport', 'Bulk Import'),
      desc: t('dashboard.bulkImportDesc', 'Paste text with front|back per line'),
      chip: 'bg-bubblegum',
    },
  ]

  return (
    <Modal isOpen={isOpen} onClose={handleDismiss} labelledBy="create-deck-title" size="md" locked={isPending}>
      <div className="mb-6 pr-10">
        <h2 id="create-deck-title" className="font-display text-2xl leading-tight text-fg [text-wrap:balance]">
          {step === 'method' ? t('deck.createNewDeck') : t('deck.deckDetails', 'Deck Details')}
        </h2>
        <p className="mt-1.5 text-[15px] text-muted">
          {step === 'method'
            ? t('dashboard.chooseMethod', 'Choose how to create your deck')
            : t('deck.createNewDeckSubtitle')}
        </p>
      </div>

      {step === 'method' ? (
        <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
          {methods.map((m) => {
            const Icon = m.icon
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectMethod(m.id)}
                className="flex items-start gap-3 rounded-[18px] border-[2.5px] border-ink bg-white p-4 text-left text-ink shadow-sticker-sm transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:-rotate-[0.6deg] active:translate-y-0 active:rotate-0 active:scale-[0.98] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-sheet min-[400px]:flex-col"
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border-2 border-ink ${m.chip}`}>
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-extrabold leading-snug">{m.label}</span>
                  <span className="mt-1 block text-sm leading-snug text-ink/65">{m.desc}</span>
                </span>
              </button>
            )
          })}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="deck-title" className="mb-1.5 block text-sm font-bold text-fg">{t('deck.deckTitle')}</label>
            <input
              ref={inputRef}
              id="deck-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, TITLE_MAX_LENGTH))}
              required
              maxLength={TITLE_MAX_LENGTH}
              disabled={isPending}
              data-autofocus
              className="field"
              placeholder={t('deck.deckTitleExample')}
            />
            <p className="mt-1 text-right text-xs text-muted tabular-nums">{title.length}/{TITLE_MAX_LENGTH}</p>
          </div>

          <div>
            <label htmlFor="deck-tags" className="mb-1.5 block text-sm font-bold text-fg">
              {t('deck.categoryTags')} <span className="font-medium text-muted">({t('deck.categoryTagsHelp')})</span>
            </label>
            <input
              id="deck-tags"
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              disabled={isPending}
              className="field"
              placeholder={t('deck.categoryTagsPlaceholder')}
            />
          </div>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end sm:gap-3">
            {!initialMethod && (
              <Button variant="ghost" onClick={() => setStep('method')} disabled={isPending} className="min-h-[46px]">
                {t('common.back')}
              </Button>
            )}
            <Button type="submit" size="lg" loading={isPending} disabled={isPending || !title.trim()} className="w-full sm:w-auto">
              {isPending ? t('deck.creating') : t('deck.create')}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  )
}
