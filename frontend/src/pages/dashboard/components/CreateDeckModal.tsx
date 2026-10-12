import { useState, useEffect, useRef, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Sparkles, FileSpreadsheet, Upload } from 'lucide-react'
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

  const methods = [
    {
      id: 'empty' as CreateMethod,
      icon: Plus,
      label: t('dashboard.createEmpty', 'Empty Deck'),
      desc: t('dashboard.createEmptyDesc', 'Create a blank deck and add cards manually'),
      color: 'text-primary-600 dark:text-primary-400',
      bg: 'bg-primary-50 dark:bg-primary-900/20',
      border: 'border-primary-200 dark:border-primary-800 hover:border-primary-400 dark:hover:border-primary-600',
    },
    {
      id: 'ai' as CreateMethod,
      icon: Sparkles,
      label: t('dashboard.generateWithAI', 'Generate with AI'),
      desc: t('dashboard.generateWithAIDesc', 'Describe a topic and AI creates flashcards'),
      color: 'text-primary-600 dark:text-primary-400',
      bg: 'bg-primary-50 dark:bg-primary-900/20',
      border: 'border-primary-200 dark:border-primary-800 hover:border-primary-400 dark:hover:border-primary-600',
    },
    {
      id: 'file' as CreateMethod,
      icon: FileSpreadsheet,
      label: t('dashboard.importFile', 'Import from File'),
      desc: t('dashboard.importFileDesc', 'Upload an Excel or CSV spreadsheet'),
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600',
    },
    {
      id: 'bulk' as CreateMethod,
      icon: Upload,
      label: t('dashboard.bulkImport', 'Bulk Import'),
      desc: t('dashboard.bulkImportDesc', 'Paste text with front|back per line'),
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600',
    },
  ]

  return (
    <Modal isOpen={isOpen} onClose={handleDismiss} labelledBy="create-deck-title" size="md" locked={isPending}>
      <div className="mb-6 pr-10">
        <h2 id="create-deck-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          {step === 'method' ? t('deck.createNewDeck') : t('deck.deckDetails', 'Deck Details')}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {step === 'method'
            ? t('dashboard.chooseMethod', 'Choose how to create your deck')
            : t('deck.createNewDeckSubtitle')}
        </p>
      </div>

      {step === 'method' ? (
        <div className="grid grid-cols-2 gap-3">
          {methods.map((m) => {
            const Icon = m.icon
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectMethod(m.id)}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 ${m.border} ${m.bg} transition-[color,background-color,border-color,box-shadow] duration-200 hover:shadow-elevation-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${m.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{m.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{m.desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="deck-title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('deck.deckTitle')}</label>
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
              className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-colors duration-200"
              placeholder={t('deck.deckTitleExample')}
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 text-right">{title.length}/{TITLE_MAX_LENGTH}</p>
          </div>

          <div>
            <label htmlFor="deck-tags" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t('deck.categoryTags')} <span className="text-slate-400 dark:text-slate-500 font-normal">({t('deck.categoryTagsHelp')})</span>
            </label>
            <input
              id="deck-tags"
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              disabled={isPending}
              className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-colors duration-200"
              placeholder={t('deck.categoryTagsPlaceholder')}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            {!initialMethod && (
              <Button variant="secondary" onClick={() => setStep('method')} disabled={isPending}>
                {t('common.back')}
              </Button>
            )}
            <Button type="submit" loading={isPending} disabled={isPending || !title.trim()}>
              {isPending ? t('deck.creating') : t('deck.create')}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  )
}
