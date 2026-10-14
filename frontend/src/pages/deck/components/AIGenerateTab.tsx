import { useState, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '@/shared/lib/analytics'
import {
  Lightbulb,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  RefreshCw,
  FileText,
  Upload,
  X,
} from 'lucide-react'
import {
  generateCardsAI,
  generateCardsFromPDF,
  type AIGeneratedCard,
} from '@/features/decks/aiApi'
import { useTier } from '@/features/subscription/useTier'
import { UpgradePrompt } from '@/features/subscription/components/UpgradePrompt'
import type { CreateCardInput } from '@/features/decks/types'
import type { Card } from '@/features/decks/types'
import { Button } from '@/shared/ui/Button'
import { segOn, segOff, labelCls, cellInput, iconBtnDanger } from './deckStyles'

type Step = 'prompt' | 'generating' | 'preview' | 'saving' | 'done'
type InputMode = 'topic' | 'pdf'

interface AIGenerateTabProps {
  deckId: string
  existingCards?: Card[]
  onAddBatch: (args: {
    deckId: string
    cards: CreateCardInput[]
  }) => Promise<Card[]>
  isPending: boolean
  onClose: () => void
}

export function AIGenerateTab({
  deckId,
  existingCards,
  onAddBatch,
  isPending,
  onClose,
}: AIGenerateTabProps) {
  const { t } = useTranslation()
  const { tier, subscription } = useTier()
  const aiUsed = subscription?.usage?.ai_generations_used ?? 0
  const aiLimit = subscription?.usage?.ai_generations_limit ?? 5
  const isAtLimit = aiLimit !== -1 && aiUsed >= aiLimit
  const maxCardsPerGen = tier === 'premium' ? 100 : tier === 'pro' ? 50 : 20
  const maxCardsPerPdf = tier === 'premium' ? 100 : tier === 'pro' ? 50 : 10

  const [step, setStep] = useState<Step>('prompt')
  const [inputMode, setInputMode] = useState<InputMode>('topic')
  const [topic, setTopic] = useState('')
  const [count, setCount] = useState(10)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [generatedCards, setGeneratedCards] = useState<AIGeneratedCard[]>([])
  const [generateError, setGenerateError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [savedCount, setSavedCount] = useState(0)
  const [countInput, setCountInput] = useState('10')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const handleCancelGeneration = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setStep('prompt')
  }, [])

  const handleGenerate = useCallback(async () => {
    if (inputMode === 'topic' && !topic.trim()) return
    if (inputMode === 'pdf' && !pdfFile) return
    setGenerateError(null)
    setStep('generating')

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const existingFronts = existingCards
      ?.map((c) => c.frontText)
      .filter((t): t is string => !!t)

    try {
      let result
      if (inputMode === 'pdf' && pdfFile) {
        result = await generateCardsFromPDF({
          file: pdfFile,
          count,
          topic: topic.trim() || undefined,
          existingFronts: existingFronts?.length ? existingFronts : undefined,
          signal: controller.signal,
        })
      } else {
        result = await generateCardsAI({
          topic: topic.trim(),
          count,
          existingFronts: existingFronts?.length ? existingFronts : undefined,
          signal: controller.signal,
        })
      }
      setGeneratedCards(result.cards)
      setStep('preview')
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      setGenerateError(
        err instanceof Error ? err.message : t('ai.generateFailed', 'Failed to generate cards'),
      )
      setStep('prompt')
    } finally {
      abortRef.current = null
    }
  }, [topic, count, inputMode, pdfFile, existingCards, t])

  const handleFileSelect = useCallback((file: File) => {
    if (file.type !== 'application/pdf') {
      setGenerateError(t('ai.onlyPdfSupported'))
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setGenerateError(t('ai.pdfTooLarge'))
      return
    }
    setGenerateError(null)
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

  const handleBackToPrompt = useCallback(() => {
    setStep('prompt')
    setGenerateError(null)
    setSaveError(null)
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

  const handleSave = useCallback(async () => {
    if (generatedCards.length === 0) return
    setSaveError(null)
    setStep('saving')

    try {
      const cards: CreateCardInput[] = generatedCards.map((c) => ({
        frontText: c.frontText,
        backText: c.backText,
      }))
      const result = await onAddBatch({ deckId, cards })
      setSavedCount(result.length)
      trackEvent('card.add', { method: 'ai' })
      setStep('done')
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : t('ai.saveFailed', 'Failed to save cards'),
      )
      setStep('preview')
    }
  }, [generatedCards, deckId, onAddBatch, t])

  const resetToPrompt = () => {
    setStep('prompt')
    setGeneratedCards([])
    setGenerateError(null)
    setSaveError(null)
    setPdfFile(null)
    setTopic('')
    setCount(10)
    setCountInput('10')
  }

  // ---- Prompt step ----
  if (step === 'prompt') {
    const canGenerate =
      (inputMode === 'topic' ? !!topic.trim() : !!pdfFile) && !isAtLimit

    return (
      <div>
        {/* Usage counter */}
        {aiLimit !== -1 && (
          <p className="mb-4 text-sm font-medium text-muted">
            {t('subscription.aiUsage', { used: aiUsed, limit: aiLimit })}
          </p>
        )}

        {isAtLimit && (
          <UpgradePrompt
            feature={t('pricing.features.aiGenerations')}
            currentLimit={`${aiLimit} ${t('pricing.perMonth')}`}
            className="mb-4"
          />
        )}

        <div className="space-y-4">
          {/* Mode toggle */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setInputMode('topic')}
              aria-pressed={inputMode === 'topic'}
              className={`${inputMode === 'topic' ? segOn : segOff} min-h-[40px] px-3.5 text-sm`}
            >
              <Lightbulb className="w-4 h-4" aria-hidden />
              {t('ai.topic')}
            </button>
            <button
              type="button"
              onClick={() => setInputMode('pdf')}
              aria-pressed={inputMode === 'pdf'}
              className={`${inputMode === 'pdf' ? segOn : segOff} min-h-[40px] px-3.5 text-sm`}
            >
              <FileText className="w-4 h-4" aria-hidden />
              {t('ai.pdf')}
            </button>
          </div>

          {inputMode === 'topic' ? (
            <div>
              <label htmlFor="ai-topic" className={labelCls}>
                {t('ai.topicLabel')}
              </label>
              <textarea
                id="ai-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={3}
                maxLength={500}
                className="field resize-none"
                placeholder={t('ai.topicPlaceholder')}
              />
              <p className="mt-1 text-xs text-muted text-right tabular-nums">
                {topic.length}/500
              </p>
            </div>
          ) : (
            <div>
              {/* PDF upload area */}
              {!pdfFile ? (
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={t('ai.dropPdfHere')}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      fileInputRef.current?.click()
                    }
                  }}
                  className="rounded-[18px] border-[2.5px] border-dashed border-edge/60 p-8 text-center cursor-pointer transition-[background-color,border-color] duration-150 hover:border-edge hover:bg-fg/[0.04] active:bg-fg/[0.07] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky"
                >
                  <Upload className="w-8 h-8 mx-auto mb-3 text-muted" aria-hidden />
                  <p className="text-sm font-bold text-fg">
                    {t('ai.dropPdfHere')}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {t('ai.maxFileSize')}
                  </p>
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
                <div className="sticker !rounded-[16px] !shadow-sticker-sm bg-white flex items-center gap-3 p-3">
                  <FileText className="w-5 h-5 text-ink shrink-0" aria-hidden />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-ink truncate">
                      {pdfFile.name}
                    </p>
                    <p className="text-xs text-ink/65">
                      {(pdfFile.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPdfFile(null)}
                    className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-ink/60 hover:text-again hover:bg-ink/10 active:scale-95 transition-[transform,color,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky"
                    aria-label={t('common.delete')}
                  >
                    <X className="w-4 h-4" aria-hidden />
                  </button>
                </div>
              )}

              {/* Optional focus topic for PDF */}
              <div className="mt-3">
                <label htmlFor="ai-pdf-topic" className={labelCls}>
                  {t('ai.focusTopic')}{' '}
                  <span className="text-muted font-medium">
                    ({t('ai.focusTopicOptional')})
                  </span>
                </label>
                <input
                  id="ai-pdf-topic"
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

          <div>
            <label htmlFor="ai-count" className={labelCls}>
              {t('ai.numberOfCards')}
            </label>
            <input
              id="ai-count"
              type="number"
              min={1}
              max={inputMode === 'pdf' ? maxCardsPerPdf : maxCardsPerGen}
              value={countInput}
              onChange={(e) => {
                const raw = e.target.value
                setCountInput(raw)
                const num = parseInt(raw, 10)
                if (!isNaN(num) && num > 0) {
                  const cap = inputMode === 'pdf' ? maxCardsPerPdf : maxCardsPerGen
                  setCount(Math.min(cap, num))
                }
              }}
              onBlur={() => {
                const cap = inputMode === 'pdf' ? maxCardsPerPdf : maxCardsPerGen
                const clamped = Math.min(cap, Math.max(1, count))
                setCount(clamped)
                setCountInput(String(clamped))
              }}
              className="field !w-32"
            />
          </div>
        </div>

        {generateError && (
          <div role="alert" className="mt-4 flex items-center gap-2 text-sm font-medium text-again">
            <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden />
            {generateError}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 mt-4 border-t-2 border-line">
          <Button variant="ghost" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!canGenerate}
            className="btn-ink min-h-[46px] px-5 text-[15px]"
          >
            {t('ai.generate')}
          </button>
        </div>
      </div>
    )
  }

  // ---- Generating step ----
  if (step === 'generating') {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4 text-center" aria-live="polite">
        <Loader2 className="w-8 h-8 animate-spin text-fg" aria-hidden />
        <p className="text-sm font-bold text-fg">
          {inputMode === 'pdf' && pdfFile
            ? t('ai.analyzingPdf', { count })
            : t('ai.generatingCards', { count, topic: topic.slice(0, 60) + (topic.length > 60 ? '...' : '') })}
        </p>
        <p className="text-xs text-muted">
          {t('ai.generatingWait')}
        </p>
        <Button variant="secondary" size="sm" onClick={handleCancelGeneration} className="mt-2">
          {t('common.cancel')}
        </Button>
      </div>
    )
  }

  // ---- Preview step ----
  if (step === 'preview') {
    return (
      <div>
        {/* Generated cards: each row is editable before saving */}
        <div className="rounded-[18px] border-2 border-edge/80 overflow-hidden mb-4">
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-sheet sticky top-0 border-b-2 border-line">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-bold text-muted w-8">
                    #
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-bold text-fg">
                    {t('deck.frontLabel')}
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-bold text-fg">
                    {t('deck.backLabel')}
                  </th>
                  <th className="px-3 py-2 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {generatedCards.map((card, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2 text-xs text-muted tabular-nums">
                      {i + 1}
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        value={card.frontText}
                        onChange={(e) =>
                          updateCard(i, 'frontText', e.target.value)
                        }
                        className={cellInput}
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        value={card.backText}
                        onChange={(e) =>
                          updateCard(i, 'backText', e.target.value)
                        }
                        className={cellInput}
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <button
                        type="button"
                        onClick={() => removeCard(i)}
                        className={iconBtnDanger}
                        aria-label={t('ai.removeCard')}
                      >
                        <Trash2 className="w-4 h-4" aria-hidden />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <p className="mb-4 text-sm font-bold text-fg">
          {t('ai.cardsGenerated', { count: generatedCards.length })}
        </p>

        {saveError && (
          <div role="alert" className="mb-4 flex items-center gap-2 text-sm font-medium text-again">
            <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden />
            {saveError}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-line">
          <Button variant="ghost" size="sm" onClick={handleBackToPrompt} className="-ml-3 text-muted">
            <RefreshCw className="w-4 h-4" aria-hidden />
            {t('ai.editAndRegenerate')}
          </Button>
          <div className="flex gap-3 ml-auto">
            <Button variant="ghost" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isPending || generatedCards.length === 0}
              className="btn-ink min-h-[46px] px-5 text-[15px]"
            >
              {t('ai.addCards', { count: generatedCards.length })}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ---- Saving step ----
  if (step === 'saving') {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4" aria-live="polite">
        <Loader2 className="w-8 h-8 animate-spin text-fg" aria-hidden />
        <p className="text-sm font-bold text-fg">
          {t('ai.addingCards', { count: generatedCards.length })}
        </p>
      </div>
    )
  }

  // ---- Done step ----
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      <div className="sticker !shadow-sticker-sm bg-mint !rounded-full p-3 -rotate-3">
        <CheckCircle2 className="w-8 h-8 text-ink" aria-hidden />
      </div>
      <p className="font-display text-xl text-fg">
        {t('ai.addedCards', { count: savedCount })}
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        <Button variant="secondary" onClick={resetToPrompt}>
          {t('ai.regenerate')}
        </Button>
        <button type="button" onClick={onClose} className="btn-ink min-h-[46px] px-5 text-[15px]">
          {t('common.done')}
        </button>
      </div>
    </div>
  )
}
