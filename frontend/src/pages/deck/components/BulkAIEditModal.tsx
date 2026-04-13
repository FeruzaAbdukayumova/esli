import { useState, useCallback, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { createPortal } from 'react-dom'
import {
  X,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react'
import { editCardsAI, type AIEditedCard } from '@/features/decks/aiApi'
import { useTier } from '@/features/subscription/useTier'
import { UpgradePrompt } from '@/features/subscription/components/UpgradePrompt'
import type { Card } from '@/features/decks/types'
import { RichTextDisplay } from '@/shared/ui/RichTextDisplay'
import { stripHtml } from '@/shared/lib/htmlUtils'

type Step = 'prompt' | 'generating' | 'preview' | 'applying' | 'done'

interface BulkAIEditModalProps {
  isOpen: boolean
  onClose: () => void
  selectedCards: Card[]
  onApplyEdits: (
    edits: { cardId: string; patch: { frontText: string; backText: string } }[],
  ) => Promise<void>
}

export function BulkAIEditModal({
  isOpen,
  onClose,
  selectedCards,
  onApplyEdits,
}: BulkAIEditModalProps) {
  const { t } = useTranslation()
  const { subscription } = useTier()
  const aiUsed = subscription?.usage?.ai_generations_used ?? 0
  const aiLimit = subscription?.usage?.ai_generations_limit ?? 5
  const isAtLimit = aiLimit !== -1 && aiUsed >= aiLimit

  const [step, setStep] = useState<Step>('prompt')
  const [instruction, setInstruction] = useState('')
  const [editedCards, setEditedCards] = useState<AIEditedCard[]>([])
  const [acceptedIds, setAcceptedIds] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const [closing, setClosing] = useState(false)
  const [appliedCount, setAppliedCount] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  const handleClose = useCallback(() => {
    if (step === 'applying') return
    if (step === 'generating') {
      abortRef.current?.abort()
      abortRef.current = null
    }
    setClosing(true)
    setTimeout(() => {
      onClose()
      setClosing(false)
      setStep('prompt')
      setInstruction('')
      setEditedCards([])
      setAcceptedIds(new Set())
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

  const handleCancelGeneration = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setStep('prompt')
  }, [])

  const handleGenerate = useCallback(async () => {
    if (!instruction.trim()) return
    setError(null)
    setStep('generating')

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const result = await editCardsAI({
        cards: selectedCards.map((c) => ({
          id: c.id,
          frontText: c.frontText || '',
          backText: c.backText || '',
        })),
        instruction: instruction.trim(),
        signal: controller.signal,
      })

      if (result.cards.length === 0) {
        setError(t('ai.bulkEditNoChanges'))
        setStep('prompt')
        return
      }

      setEditedCards(result.cards)
      setAcceptedIds(new Set(result.cards.map((c) => c.id)))
      setStep('preview')
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      setError(
        err instanceof Error ? err.message : 'Failed to edit cards',
      )
      setStep('prompt')
    } finally {
      abortRef.current = null
    }
  }, [instruction, selectedCards, t])

  const handleBackToPrompt = useCallback(() => {
    setStep('prompt')
    setError(null)
  }, [])

  const toggleAccepted = useCallback((id: string) => {
    setAcceptedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const acceptAll = useCallback(() => {
    setAcceptedIds(new Set(editedCards.map((c) => c.id)))
  }, [editedCards])

  const rejectAll = useCallback(() => {
    setAcceptedIds(new Set())
  }, [])

  const handleApply = useCallback(async () => {
    const edits = editedCards
      .filter((c) => acceptedIds.has(c.id))
      .map((c) => ({
        cardId: c.id,
        patch: { frontText: c.frontText, backText: c.backText },
      }))

    if (edits.length === 0) return
    setError(null)
    setStep('applying')

    try {
      await onApplyEdits(edits)
      setAppliedCount(edits.length)
      setStep('done')
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to apply edits',
      )
      setStep('preview')
    }
  }, [editedCards, acceptedIds, onApplyEdits])

  const acceptedCount = acceptedIds.size

  // Helper: check if a field changed
  const isChanged = (cardId: string, field: 'frontText' | 'backText') => {
    const original = selectedCards.find((c) => c.id === cardId)
    const edited = editedCards.find((c) => c.id === cardId)
    if (!original || !edited) return false
    return (original[field] || '') !== edited[field]
  }

  if (!isOpen) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center min-h-screen p-4 bg-black/50 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bulk-ai-edit-title"
    >
      <div
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-elevation-md border border-slate-100 dark:border-slate-700/50 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 transition-[transform,opacity] duration-300 ${closing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0 animate-slide-up'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2
              id="bulk-ai-edit-title"
              className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1"
            >
              {t('ai.bulkEditTitle')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('ai.bulkEditSubtitle', { count: selectedCards.length })}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={step === 'applying'}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 shrink-0"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
        </div>

        {/* ---- Prompt step ---- */}
        {step === 'prompt' && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="ai-edit-instruction"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                {t('ai.bulkEditInstruction')}
              </label>
              <textarea
                id="ai-edit-instruction"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                rows={3}
                maxLength={500}
                autoFocus
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                placeholder={t('ai.bulkEditInstructionPlaceholder')}
              />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 text-right">
                {instruction.length}/500
              </p>
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
                className="min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors duration-200"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isAtLimit || !instruction.trim()}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              >
                <Sparkles className="w-4 h-4" />
                {t('ai.bulkEditGenerate')}
              </button>
            </div>
          </div>
        )}

        {/* ---- Generating step ---- */}
        {step === 'generating' && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600 dark:text-primary-400" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('ai.bulkEditGenerating', { count: selectedCards.length })}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('ai.bulkEditGeneratingWait')}
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
            {/* Accept/Reject controls */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('ai.bulkEditAccepted', { count: acceptedCount })}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  {t('ai.bulkEditAcceptAll')}
                </button>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                >
                  {t('ai.bulkEditRejectAll')}
                </button>
              </div>
            </div>

            {/* Diff list */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {editedCards.map((edited) => {
                const original = selectedCards.find((c) => c.id === edited.id)
                if (!original) return null
                const accepted = acceptedIds.has(edited.id)
                const frontChanged = isChanged(edited.id, 'frontText')
                const backChanged = isChanged(edited.id, 'backText')

                return (
                  <div
                    key={edited.id}
                    className={`border rounded-lg overflow-hidden transition-colors ${
                      accepted
                        ? 'border-primary-300 dark:border-primary-600'
                        : 'border-slate-200 dark:border-slate-600 opacity-60'
                    }`}
                  >
                    {/* Card header with checkbox */}
                    <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-700/50">
                      <input
                        type="checkbox"
                        checked={accepted}
                        onChange={() => toggleAccepted(edited.id)}
                        className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                        {stripHtml(original.frontText || '').slice(0, 60)}{stripHtml(original.frontText || '').length > 60 ? '...' : ''}
                      </span>
                    </div>

                    {/* Diff content */}
                    <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-600">
                      {/* Original column */}
                      <div className="p-3 space-y-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          {t('ai.bulkEditOriginal')}
                        </p>
                        <div className={`text-sm text-slate-700 dark:text-slate-300 ${frontChanged ? 'bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded' : ''}`}>
                          <RichTextDisplay content={original.frontText || ''} />
                        </div>
                        <div className={`text-sm text-slate-500 dark:text-slate-400 ${backChanged ? 'bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded' : ''}`}>
                          <RichTextDisplay content={original.backText || ''} />
                        </div>
                      </div>

                      {/* Edited column */}
                      <div className="p-3 space-y-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          {t('ai.bulkEditEdited')}
                        </p>
                        <div className={`text-sm text-slate-700 dark:text-slate-300 ${frontChanged ? 'bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded' : ''}`}>
                          <RichTextDisplay content={edited.frontText || ''} />
                        </div>
                        <div className={`text-sm text-slate-500 dark:text-slate-400 ${backChanged ? 'bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded' : ''}`}>
                          <RichTextDisplay content={edited.backText || ''} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
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
                {t('ai.bulkEditTryAgain')}
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
                  onClick={handleApply}
                  disabled={acceptedCount === 0}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                  <Sparkles className="w-4 h-4" />
                  {t('ai.bulkEditApply', { count: acceptedCount })}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---- Applying step ---- */}
        {step === 'applying' && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600 dark:text-primary-400" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('ai.bulkEditApplying')}
            </p>
          </div>
        )}

        {/* ---- Done step ---- */}
        {step === 'done' && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-lg font-medium text-slate-800 dark:text-slate-100">
              {t('ai.bulkEditDone', { count: appliedCount })}
            </p>
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => {
                  setStep('prompt')
                  setEditedCards([])
                  setAcceptedIds(new Set())
                  setError(null)
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                {t('ai.bulkEditTryAgain')}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white transition-colors"
              >
                {t('common.done')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
