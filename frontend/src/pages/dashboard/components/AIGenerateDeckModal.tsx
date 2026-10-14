import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { X, Check, Type, Loader2, Trash2, RefreshCw, AlertTriangle, FileText, Upload } from 'lucide-react'
import {
  generateCardsAI,
  generateCardsFromPDF,
  type AIGeneratedCard,
} from '@/features/decks/aiApi'
import { useCreateDeck, useAddCardsBatch } from '@/features/decks/hooks'
import { useTier } from '@/features/subscription/useTier'
import { UpgradePrompt } from '@/features/subscription/components/UpgradePrompt'
import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'

type Step = 'prompt' | 'generating' | 'preview' | 'creating' | 'done'
type InputMode = 'topic' | 'pdf'

interface AIGenerateDeckModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: InputMode
  initialFile?: File | null
  initialTopic?: string
}

export function AIGenerateDeckModal({
  isOpen,
  onClose,
  initialMode = 'topic',
  initialFile = null,
  initialTopic = '',
}: AIGenerateDeckModalProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const createDeckMutation = useCreateDeck()
  const addCardsBatchMutation = useAddCardsBatch()
  const { tier, subscription } = useTier()
  const aiUsed = subscription?.usage?.ai_generations_used ?? 0
  const aiLimit = subscription?.usage?.ai_generations_limit ?? 5
  const isAtLimit = aiLimit !== -1 && aiUsed >= aiLimit
  const maxCardsPerGen = tier === 'premium' ? 100 : tier === 'pro' ? 50 : 20
  const maxCardsPerPdf = tier === 'premium' ? 100 : tier === 'pro' ? 50 : 10

  const [step, setStep] = useState<Step>('prompt')
  const [inputMode, setInputMode] = useState<InputMode>(initialMode)
  const [topic, setTopic] = useState('')
  const [count, setCount] = useState(10)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [generatedCards, setGeneratedCards] = useState<AIGeneratedCard[]>([])
  const [deckTitle, setDeckTitle] = useState('')
  const [deckTags, setDeckTags] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [countInput, setCountInput] = useState('10')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const handleCancelGeneration = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setStep('prompt')
  }, [])

  const handleClose = useCallback(() => {
    if (step === 'creating') return
    if (step === 'generating') {
      abortRef.current?.abort()
      abortRef.current = null
    }
    onClose()
    setStep('prompt')
    setInputMode('topic')
    setTopic('')
    setCount(10)
    setCountInput('10')
    setPdfFile(null)
    setGeneratedCards([])
    setDeckTitle('')
    setDeckTags('')
    setError(null)
  }, [step, onClose])

  // Honour the requested input mode (and any pre-dropped file) on open.
  useEffect(() => {
    if (isOpen) {
      setInputMode(initialMode)
      if (initialFile) setPdfFile(initialFile)
      if (initialTopic) setTopic(initialTopic)
    }
  }, [isOpen, initialMode, initialFile, initialTopic])

  const handleFileSelect = useCallback((file: File) => {
    if (file.type !== 'application/pdf') {
      setError(t('ai.onlyPdfSupported'))
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError(t('ai.pdfTooLarge'))
      return
    }
    setError(null)
    setPdfFile(file)
  }, [t])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file) handleFileSelect(file)
    },
    [handleFileSelect],
  )

  const handleGenerate = useCallback(async () => {
    if (inputMode === 'topic' && !topic.trim()) return
    if (inputMode === 'pdf' && !pdfFile) return
    setError(null)
    setStep('generating')

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      let result
      if (inputMode === 'pdf' && pdfFile) {
        result = await generateCardsFromPDF({
          file: pdfFile,
          count,
          topic: topic.trim() || undefined,
          signal: controller.signal,
        })
      } else {
        result = await generateCardsAI({
          topic: topic.trim(),
          count,
          includeDeckInfo: true,
          signal: controller.signal,
        })
      }
      setGeneratedCards(result.cards)
      setDeckTitle(result.suggestedTitle || (inputMode === 'pdf' ? pdfFile?.name.replace(/\.pdf$/i, '') || 'PDF Deck' : topic.trim().slice(0, 100)))
      setDeckTags(result.suggestedTags?.join(', ') || '')
      setStep('preview')
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      setError(
        err instanceof Error ? err.message : t('ai.generateFailed', 'Failed to generate cards'),
      )
      setStep('prompt')
    } finally {
      abortRef.current = null
    }
  }, [topic, count, inputMode, pdfFile, t])

  const handleBackToPrompt = useCallback(() => {
    setStep('prompt')
    setError(null)
  }, [])

  const removeCard = useCallback((index: number) => {
    setGeneratedCards((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const updateCard = useCallback(
    (index: number, field: 'frontText' | 'backText', value: string) => {
      setGeneratedCards((prev) =>
        prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
      )
    },
    [],
  )

  const handleCreate = useCallback(async () => {
    if (!deckTitle.trim() || generatedCards.length === 0) return
    setError(null)
    setStep('creating')

    try {
      const categoryTags = deckTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
      const deck = await createDeckMutation.mutateAsync({
        title: deckTitle.trim(),
        categoryTags,
      })
      await addCardsBatchMutation.mutateAsync({
        deckId: deck.id,
        cards: generatedCards.map((c) => ({
          frontText: c.frontText,
          backText: c.backText,
        })),
      })
      setStep('done')
      setTimeout(() => {
        onClose()
        navigate(`/deck/${deck.id}`)
      }, 1200)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t('ai.createDeckFailed', 'Failed to create deck'),
      )
      setStep('preview')
    }
  }, [
    deckTitle,
    deckTags,
    generatedCards,
    createDeckMutation,
    addCardsBatchMutation,
    navigate,
    onClose,
    t,
  ])

  // Three-step strip in the header: write the topic, Esli writes cards, check and save.
  const stepIndex = step === 'prompt' ? 0 : step === 'generating' ? 1 : 2
  const cap = inputMode === 'pdf' ? maxCardsPerPdf : maxCardsPerGen
  const segment = (active: boolean) =>
    `inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-[12px] px-4 text-sm font-bold transition-transform duration-150 active:scale-[0.97] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky sm:flex-none ${
      active
        ? 'border-2 border-ink bg-sky text-ink shadow-sticker-sm'
        : 'border-2 border-transparent text-muted hover:text-fg hover:bg-fg/[0.07]'
    }`
  const errorBox = error && (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-[14px] border-2 border-again bg-again/10 px-3 py-2.5 text-sm font-medium text-fg"
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-again" aria-hidden />
      <span className="min-w-0 break-words">{error}</span>
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      labelledBy="ai-generate-deck-title"
      size="lg"
      locked={step === 'creating'}
    >
      {/* Header */}
      <div className="mb-6 pr-10">
        <div className="mb-4 flex w-28 gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-2 flex-1 rounded-full ${i <= stepIndex ? 'bg-grass' : 'bg-fg/15'}`}
            />
          ))}
        </div>
        <h2
          id="ai-generate-deck-title"
          className="font-display text-2xl leading-tight text-fg sm:text-[1.75rem] [text-wrap:balance]"
        >
          {t('create.title', 'Make a deck from anything')}
        </h2>
        <p className="mt-1.5 text-[15px] text-muted">
          {t('create.subtitle', 'Type a topic or drop a PDF. Esli writes the cards in seconds.')}
        </p>
      </div>

      {/* ---- Prompt step ---- */}
      {step === 'prompt' && (
        <div className="space-y-5">
          {/* Mode toggle */}
          <div className="flex gap-1 rounded-[16px] border-2 border-edge/25 p-1 sm:w-fit">
            <button
              type="button"
              onClick={() => setInputMode('topic')}
              aria-pressed={inputMode === 'topic'}
              className={segment(inputMode === 'topic')}
            >
              <Type className="h-4 w-4" aria-hidden />
              {t('ai.topic')}
            </button>
            <button
              type="button"
              onClick={() => setInputMode('pdf')}
              aria-pressed={inputMode === 'pdf'}
              className={segment(inputMode === 'pdf')}
            >
              <FileText className="h-4 w-4" aria-hidden />
              {t('ai.pdf')}
            </button>
          </div>

          {inputMode === 'topic' ? (
            <div>
              <label htmlFor="ai-deck-topic" className="mb-1.5 block text-sm font-bold text-fg">
                {t('ai.topicLabel')}
              </label>
              <textarea
                id="ai-deck-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={3}
                maxLength={500}
                data-autofocus
                className="field resize-none text-lg leading-snug"
                placeholder={t('ai.topicPlaceholder')}
              />
              <p className="mt-1 text-right text-xs text-muted tabular-nums">{topic.length}/500</p>
            </div>
          ) : (
            <div>
              {/* PDF upload area */}
              {!pdfFile ? (
                <div
                  role="button"
                  tabIndex={0}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      fileInputRef.current?.click()
                    }
                  }}
                  className="group cursor-pointer rounded-[18px] border-2 border-dashed border-edge/50 px-6 py-8 text-center transition-[transform,border-color,background-color] duration-150 hover:border-edge hover:bg-fg/[0.04] active:scale-[0.99] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky"
                >
                  <span className="mx-auto mb-3 flex h-12 w-12 -rotate-6 items-center justify-center rounded-[14px] border-2 border-ink bg-coral text-ink shadow-sticker-sm transition-transform duration-150 group-hover:rotate-0">
                    <Upload className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="text-[15px] font-bold text-fg">{t('ai.dropPdfHere')}</p>
                  <p className="mt-1 text-sm text-muted">{t('ai.maxFileSize')}</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileSelect(file)
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-[16px] border-2 border-ink bg-white p-3 text-ink shadow-sticker-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border-2 border-ink bg-coral">
                    <FileText className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{pdfFile.name}</p>
                    <p className="text-xs text-ink/60">{(pdfFile.size / 1024 / 1024).toFixed(1)} MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPdfFile(null)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-ink/60 transition-[transform,color,background-color] duration-150 hover:bg-ink/10 hover:text-again active:scale-[0.95] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky"
                    aria-label={t('common.delete')}
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              )}

              {/* Optional focus topic for PDF */}
              <div className="mt-4">
                <label htmlFor="ai-deck-pdf-topic" className="mb-1.5 block text-sm font-bold text-fg">
                  {t('ai.focusTopic')}{' '}
                  <span className="font-medium text-muted">({t('ai.focusTopicOptional')})</span>
                </label>
                <input
                  id="ai-deck-pdf-topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  maxLength={500}
                  className="field"
                  placeholder={t('ai.focusTopicPlaceholder')}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
            <div>
              <label htmlFor="ai-deck-count" className="mb-1.5 block text-sm font-bold text-fg">
                {t('ai.numberOfCards')}
              </label>
              <input
                id="ai-deck-count"
                type="number"
                min={1}
                max={cap}
                value={countInput}
                onChange={(e) => {
                  const raw = e.target.value
                  setCountInput(raw)
                  const num = parseInt(raw, 10)
                  if (!isNaN(num) && num > 0) {
                    setCount(Math.min(cap, num))
                  }
                }}
                onBlur={() => {
                  const clamped = Math.min(cap, Math.max(1, count))
                  setCount(clamped)
                  setCountInput(String(clamped))
                }}
                className="field w-28 tabular-nums"
              />
            </div>

            {/* AI usage counter */}
            <p className="pb-3 text-sm text-muted">
              {aiLimit === -1
                ? t('subscription.aiUsageUnlimited', { used: aiUsed })
                : t('subscription.aiUsage', { used: aiUsed, limit: aiLimit })}
            </p>
          </div>

          {isAtLimit && (
            <UpgradePrompt
              feature={t('ai.featureName', 'AI generation')}
              currentLimit={`${aiLimit} ${t('ai.perMonth', 'per month')}`}
            />
          )}

          {errorBox}

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end sm:gap-3">
            <Button variant="ghost" onClick={handleClose} className="min-h-[46px]">
              {t('common.cancel')}
            </Button>
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={isAtLimit || (inputMode === 'topic' ? !topic.trim() : !pdfFile)}
              className="w-full sm:w-auto"
            >
              {t('desk.makeCards', 'Make cards')}
            </Button>
          </div>
        </div>
      )}

      {/* ---- Generating step ---- */}
      {step === 'generating' && (
        <div className="flex flex-col items-center py-8 text-center" role="status" aria-live="polite">
          {/* A small stack of blank cards being written */}
          <div className="relative mb-8 h-[120px] w-[180px]" aria-hidden>
            <span className="absolute inset-0 -rotate-6 rounded-[16px] border-2 border-ink bg-mint shadow-sticker-sm" />
            <span className="absolute inset-0 rotate-3 rounded-[16px] border-2 border-ink bg-sky shadow-sticker-sm" />
            <span className="absolute inset-0 flex flex-col justify-center gap-2.5 rounded-[16px] border-2 border-ink bg-white px-5 shadow-sticker-sm">
              <span className="h-3 w-3/4 rounded-full bg-ink/80 motion-safe:animate-pulse" />
              <span className="h-2.5 w-full rounded-full bg-ink/15 motion-safe:animate-pulse [animation-delay:200ms]" />
              <span className="h-2.5 w-2/3 rounded-full bg-ink/15 motion-safe:animate-pulse [animation-delay:400ms]" />
            </span>
          </div>
          <p className="max-w-[40ch] text-base font-bold text-fg [overflow-wrap:anywhere]">
            {inputMode === 'pdf' && pdfFile
              ? t('ai.analyzingPdf', { count })
              : t('ai.generatingCards', { count, topic: topic.slice(0, 60) + (topic.length > 60 ? '...' : '') })}
          </p>
          <p className="mt-1.5 text-sm text-muted">{t('ai.generatingWait')}</p>
          <Button variant="ghost" onClick={handleCancelGeneration} className="mt-6 min-h-[44px]">
            {t('common.cancel')}
          </Button>
        </div>
      )}

      {/* ---- Preview step ---- */}
      {step === 'preview' && (
        <div className="space-y-5">
          {/* Deck info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.4fr_1fr]">
            <div>
              <label htmlFor="ai-deck-title-edit" className="mb-1.5 block text-sm font-bold text-fg">
                {t('ai.deckTitle')}
              </label>
              <input
                id="ai-deck-title-edit"
                type="text"
                value={deckTitle}
                onChange={(e) => setDeckTitle(e.target.value)}
                maxLength={100}
                className="field font-bold"
              />
            </div>
            <div>
              <label htmlFor="ai-deck-tags-edit" className="mb-1.5 block text-sm font-bold text-fg">
                {t('ai.tags')} <span className="font-medium text-muted">({t('ai.tagsHelp')})</span>
              </label>
              <input
                id="ai-deck-tags-edit"
                type="text"
                value={deckTags}
                onChange={(e) => setDeckTags(e.target.value)}
                className="field"
                placeholder={t('ai.tagsPlaceholder')}
              />
            </div>
          </div>

          {/* Generated cards as small stickers, editable in place */}
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-fg">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-ink bg-grass text-ink">
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
              </span>
              {t('ai.cardsGenerated', { count: generatedCards.length })}
            </p>
            <ul className="-mx-2 grid max-h-[min(46vh,400px)] grid-cols-1 gap-3 overflow-y-auto px-2 pb-2 pt-1 sm:grid-cols-2">
              {generatedCards.map((card, i) => (
                <li
                  key={i}
                  className="group relative rounded-[16px] border-2 border-ink bg-white p-3 pr-10 text-ink shadow-sticker-sm focus-within:ring-[3px] focus-within:ring-sky"
                >
                  <span className="absolute left-3 top-2 text-[11px] font-bold text-ink/40 tabular-nums" aria-hidden>
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={card.frontText}
                    onChange={(e) => updateCard(i, 'frontText', e.target.value)}
                    aria-label={`${t('deck.frontLabel')} ${i + 1}`}
                    className="mt-3 w-full rounded-[8px] bg-transparent px-1 py-1 text-[15px] font-bold text-ink hover:bg-ink/5 focus:bg-ink/5 focus:outline-none"
                  />
                  <div className="my-1.5 border-t-2 border-dashed border-ink/15" aria-hidden />
                  <input
                    type="text"
                    value={card.backText}
                    onChange={(e) => updateCard(i, 'backText', e.target.value)}
                    aria-label={`${t('deck.backLabel')} ${i + 1}`}
                    className="w-full rounded-[8px] bg-transparent px-1 py-1 text-sm font-medium text-ink/75 hover:bg-ink/5 focus:bg-ink/5 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeCard(i)}
                    className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-[10px] text-ink/45 transition-[transform,color,background-color] duration-150 hover:bg-ink/10 hover:text-again active:scale-[0.95] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-again"
                    aria-label={t('ai.removeCard')}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {errorBox}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <Button variant="ghost" onClick={handleBackToPrompt} className="min-h-[44px] text-sm">
              <RefreshCw className="h-4 w-4" aria-hidden />
              {t('ai.editAndRegenerate')}
            </Button>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:gap-3">
              <Button variant="ghost" onClick={handleClose} className="min-h-[46px]">
                {t('common.cancel')}
              </Button>
              <Button
                size="lg"
                onClick={handleCreate}
                disabled={!deckTitle.trim() || generatedCards.length === 0}
                className="w-full sm:w-auto"
              >
                {t('ai.createDeck')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ---- Creating step ---- */}
      {step === 'creating' && (
        <div className="flex flex-col items-center justify-center gap-4 py-12" role="status" aria-live="polite">
          <Loader2 className="h-8 w-8 text-fg motion-safe:animate-spin" aria-hidden />
          <p className="text-base font-bold text-fg">
            {t('ai.creatingDeck', { count: generatedCards.length })}
          </p>
        </div>
      )}

      {/* ---- Done step ---- */}
      {step === 'done' && (
        <div className="flex flex-col items-center justify-center gap-5 py-12" role="status" aria-live="polite">
          <span className="flex h-16 w-16 -rotate-6 items-center justify-center rounded-[18px] border-[2.5px] border-ink bg-mint text-ink shadow-sticker">
            <Check className="h-8 w-8" strokeWidth={3} aria-hidden />
          </span>
          <p className="font-display text-xl text-fg">{t('ai.deckCreatedRedirecting')}</p>
        </div>
      )}
    </Modal>
  )
}
