import { useState, useEffect, useRef, FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { X, Plus, Sparkles, FileSpreadsheet, Upload } from 'lucide-react'
import { trackEvent } from '@/shared/lib/analytics'

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
  const [closing, setClosing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      onClose()
      setClosing(false)
      setStep(initialMethod ? 'details' : 'method')
      setMethod(initialMethod || 'empty')
      setTitle('')
      setTagsInput('')
    }, 300)
  }

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        if (step === 'details' && !initialMethod) {
          setStep('method')
        } else {
          handleClose()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, step])

  useEffect(() => {
    if (isOpen && step === 'details' && !closing) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen, step, closing])

  useEffect(() => {
    if (isOpen && initialMethod) {
      setMethod(initialMethod)
      setStep('details')
    } else if (isOpen && !initialMethod) {
      setStep('method')
      setMethod('empty')
    }
  }, [isOpen, initialMethod])

  if (!isOpen) return null

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
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-900/20',
      border: 'border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600',
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

  return createPortal(
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center min-h-screen p-4 bg-black/50 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-deck-title"
    >
      <div
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700/50 max-w-lg w-full p-6 transition-[transform,opacity] duration-300 ${closing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0 animate-slide-up'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 id="create-deck-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
              {step === 'method' ? t('deck.createNewDeck') : t('deck.deckDetails', 'Deck Details')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {step === 'method'
                ? t('dashboard.chooseMethod', 'Choose how to create your deck')
                : t('deck.createNewDeckSubtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={step === 'details' && !initialMethod ? () => setStep('method') : handleClose}
            disabled={isPending}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 shrink-0"
            aria-label={step === 'details' && !initialMethod ? t('common.back') : t('common.close')}
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
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
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 ${m.border} ${m.bg} transition-[color,background-color,border-color,box-shadow] duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
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
                <button
                  type="button"
                  onClick={() => setStep('method')}
                  disabled={isPending}
                  className="min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors duration-200 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                  {t('common.back')}
                </button>
              )}
              <button
                type="submit"
                disabled={isPending || !title.trim()}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              >
                {isPending ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden />
                    {t('deck.creating')}
                  </>
                ) : (
                  t('deck.create')
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  )
}
