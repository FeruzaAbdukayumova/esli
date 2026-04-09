import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import {
  X,
  Sparkles,
  Loader2,
  Trash2,
  RefreshCw,
  AlertTriangle,
  FileText,
  Upload,
} from 'lucide-react'
import {
  generateCardsAI,
  generateCardsFromPDF,
  type AIGeneratedCard,
} from '@/features/decks/aiApi'
import { useCreateDeck, useAddCardsBatch } from '@/features/decks/hooks'
import { useTier } from '@/features/subscription/useTier'
import { UpgradePrompt } from '@/features/subscription/components/UpgradePrompt'

type Step = 'prompt' | 'generating' | 'preview' | 'creating' | 'done'
type InputMode = 'topic' | 'pdf'

interface AIGenerateDeckModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AIGenerateDeckModal({
  isOpen,
  onClose,
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
  const [inputMode, setInputMode] = useState<InputMode>('topic')
  const [topic, setTopic] = useState('')
  const [count, setCount] = useState(10)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [generatedCards, setGeneratedCards] = useState<AIGeneratedCard[]>([])
  const [deckTitle, setDeckTitle] = useState('')
  const [deckTags, setDeckTags] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [closing, setClosing] = useState(false)
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
    setClosing(true)
    setTimeout(() => {
      onClose()
      setClosing(false)
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
    }, 300)
  }, [step, onClose])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, handleClose])

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
        err instanceof Error ? err.message : 'Failed to generate cards',
      )
      setStep('prompt')
    } finally {
      abortRef.current = null
    }
  }, [topic, count, inputMode, pdfFile])

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
        err instanceof Error ? err.message : 'Failed to create deck',
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
  ])

  if (!isOpen) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center min-h-screen p-4 bg-black/50 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-generate-deck-title"
    >
      <div
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 transition-[transform,opacity] duration-300 ${closing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0 animate-slide-up'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2
              id="ai-generate-deck-title"
              className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1"
            >
              {t('ai.generateDeckTitle')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('ai.generateDeckSubtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={step === 'creating'}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 shrink-0"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
        </div>

        {/* ---- Prompt step ---- */}
        {step === 'prompt' && (
          <div className="space-y-4">
            {/* Mode toggle */}
            <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-700 rounded-lg w-fit">
              <button
                type="button"
                onClick={() => setInputMode('topic')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  inputMode === 'topic'
                    ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-slate-100 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {t('ai.topic')}
              </button>
              <button
                type="button"
                onClick={() => setInputMode('pdf')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  inputMode === 'pdf'
                    ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-slate-100 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                {t('ai.pdf')}
              </button>
            </div>

            {inputMode === 'topic' ? (
              <div>
                <label
                  htmlFor="ai-deck-topic"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  {t('ai.topicLabel')}
                </label>
                <textarea
                  id="ai-deck-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={3}
                  maxLength={500}
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                  placeholder={t('ai.topicPlaceholder')}
                />
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 text-right">
                  {topic.length}/500
                </p>
              </div>
            ) : (
              <div>
                {/* PDF upload area */}
                {!pdfFile ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors"
                  >
                    <Upload className="w-8 h-8 mx-auto mb-3 text-slate-400 dark:text-slate-500" />
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t('ai.dropPdfHere')}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
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
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50">
                    <FileText className="w-5 h-5 text-primary-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                        {pdfFile.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {(pdfFile.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPdfFile(null)}
                      className="p-1 rounded text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      aria-label={t('common.delete')}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Optional focus topic for PDF */}
                <div className="mt-3">
                  <label
                    htmlFor="ai-deck-pdf-topic"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    {t('ai.focusTopic')}{' '}
                    <span className="text-slate-400 dark:text-slate-500 font-normal">
                      ({t('ai.focusTopicOptional')})
                    </span>
                  </label>
                  <input
                    id="ai-deck-pdf-topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    maxLength={500}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder={t('ai.focusTopicPlaceholder')}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="ai-deck-count"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                {t('ai.numberOfCards')}
              </label>
              <input
                id="ai-deck-count"
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
                className="w-32 px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
              />
            </div>

            {/* AI usage counter */}
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {aiLimit === -1
                ? t('subscription.aiUsageUnlimited', { used: aiUsed })
                : t('subscription.aiUsage', { used: aiUsed, limit: aiLimit })}
            </p>

            {isAtLimit && (
              <UpgradePrompt
                feature="AI generation"
                currentLimit={`${aiLimit} per month`}
              />
            )}

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isAtLimit || (inputMode === 'topic' ? !topic.trim() : !pdfFile)}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              >
                <Sparkles className="w-4 h-4" />
                {t('ai.generate')}
              </button>
            </div>
          </div>
        )}

        {/* ---- Generating step ---- */}
        {step === 'generating' && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600 dark:text-primary-400" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {inputMode === 'pdf' && pdfFile
                ? t('ai.analyzingPdf', { count })
                : t('ai.generatingCards', { count, topic: topic.slice(0, 60) + (topic.length > 60 ? '...' : '') })}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('ai.generatingWait')}
            </p>
            <button
              type="button"
              onClick={handleCancelGeneration}
              className="mt-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors duration-200"
            >
              {t('common.cancel')}
            </button>
          </div>
        )}

        {/* ---- Preview step ---- */}
        {step === 'preview' && (
          <div className="space-y-4">
            {/* Deck info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="ai-deck-title-edit"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  {t('ai.deckTitle')}
                </label>
                <input
                  id="ai-deck-title-edit"
                  type="text"
                  value={deckTitle}
                  onChange={(e) => setDeckTitle(e.target.value)}
                  maxLength={100}
                  className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="ai-deck-tags-edit"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  {t('ai.tags')}{' '}
                  <span className="text-slate-400 dark:text-slate-500 font-normal">
                    ({t('ai.tagsHelp')})
                  </span>
                </label>
                <input
                  id="ai-deck-tags-edit"
                  type="text"
                  value={deckTags}
                  onChange={(e) => setDeckTags(e.target.value)}
                  className="w-full px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  placeholder={t('ai.tagsPlaceholder')}
                />
              </div>
            </div>

            {/* Cards table */}
            <div className="border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden">
              <div className="overflow-x-auto max-h-[320px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-700 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-8">
                        #
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                        {t('deck.frontLabel')}
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                        {t('deck.backLabel')}
                      </th>
                      <th className="px-3 py-2 w-10" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
                    {generatedCards.map((card, i) => (
                      <tr
                        key={i}
                        className="hover:bg-slate-50 dark:hover:bg-slate-700/30"
                      >
                        <td className="px-3 py-2 text-xs text-slate-400 dark:text-slate-500">
                          {i + 1}
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={card.frontText}
                            onChange={(e) =>
                              updateCard(i, 'frontText', e.target.value)
                            }
                            className="w-full px-2 py-1 text-sm rounded border border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 bg-transparent text-slate-800 dark:text-slate-100 transition-colors"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={card.backText}
                            onChange={(e) =>
                              updateCard(i, 'backText', e.target.value)
                            }
                            className="w-full px-2 py-1 text-sm rounded border border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 bg-transparent text-slate-700 dark:text-slate-200 transition-colors"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <button
                            type="button"
                            onClick={() => removeCard(i)}
                            className="p-1 rounded text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            aria-label={t('ai.removeCard')}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Sparkles className="w-4 h-4 text-primary-500" />
                {t('ai.cardsGenerated', { count: generatedCards.length })}
              </span>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-600">
              <button
                type="button"
                onClick={handleBackToPrompt}
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {t('ai.editAndRegenerate')}
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors duration-200"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={
                    !deckTitle.trim() || generatedCards.length === 0
                  }
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                  <Sparkles className="w-4 h-4" />
                  {t('ai.createDeck')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---- Creating step ---- */}
        {step === 'creating' && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600 dark:text-primary-400" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('ai.creatingDeck', { count: generatedCards.length })}
            </p>
          </div>
        )}

        {/* ---- Done step ---- */}
        {step === 'done' && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-lg font-medium text-slate-800 dark:text-slate-100">
              {t('ai.deckCreatedRedirecting')}
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
