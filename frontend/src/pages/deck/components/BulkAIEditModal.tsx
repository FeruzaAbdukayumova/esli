import { useState, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
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
import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'
import { labelCls } from './deckStyles'

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
  const [appliedCount, setAppliedCount] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  const handleClose = useCallback(() => {
    if (step === 'applying') return
    if (step === 'generating') {
      abortRef.current?.abort()
      abortRef.current = null
    }
    onClose()
    setStep('prompt')
    setInstruction('')
    setEditedCards([])
    setAcceptedIds(new Set())
    setError(null)
  }, [step, onClose])

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
        err instanceof Error ? err.message : t('ai.bulkEditFailed', 'Failed to edit cards'),
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
        err instanceof Error ? err.message : t('ai.bulkEditApplyFailed', 'Failed to apply edits'),
      )
      setStep('preview')
    }
  }, [editedCards, acceptedIds, onApplyEdits, t])

  const acceptedCount = acceptedIds.size

  // Helper: check if a field changed
  const isChanged = (cardId: string, field: 'frontText' | 'backText') => {
    const original = selectedCards.find((c) => c.id === cardId)
    const edited = editedCards.find((c) => c.id === cardId)
    if (!original || !edited) return false
    return (original[field] || '') !== edited[field]
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      labelledBy="bulk-ai-edit-title"
      size="lg"
      className="max-w-3xl"
      locked={step === 'applying'}
    >
      {/* Header */}
      <div className="mb-6 pr-10">
        <h2
          id="bulk-ai-edit-title"
          className="font-display text-2xl text-fg mb-1"
        >
          {t('ai.bulkEditTitle')}
        </h2>
        <p className="text-sm text-muted">
          {t('ai.bulkEditSubtitle', { count: selectedCards.length })}
        </p>
      </div>

      {/* ---- Prompt step ---- */}
      {step === 'prompt' && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="ai-edit-instruction"
              className={labelCls}
            >
              {t('ai.bulkEditInstruction')}
            </label>
            <textarea
              id="ai-edit-instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              rows={3}
              maxLength={500}
              data-autofocus
              className="field resize-none"
              placeholder={t('ai.bulkEditInstructionPlaceholder')}
            />
            <p className="mt-1 text-xs text-muted text-right tabular-nums">
              {instruction.length}/500
            </p>
          </div>

          {/* AI usage counter */}
          <p className="text-xs text-muted">
            {aiLimit === -1
              ? t('subscription.aiUsageUnlimited', { used: aiUsed })
              : t('subscription.aiUsage', { used: aiUsed, limit: aiLimit })}
          </p>

          {isAtLimit && (
            <UpgradePrompt
              feature={t('ai.featureName', 'AI generation')}
              currentLimit={`${aiLimit} ${t('ai.perMonth', 'per month')}`}
            />
          )}

          {error && (
            <div role="alert" className="flex items-center gap-2 text-sm font-medium text-again">
              <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden />
              {error}
            </div>
          )}

          <div className="flex flex-wrap justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={handleClose}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleGenerate} disabled={isAtLimit || !instruction.trim()}>
              {t('ai.bulkEditGenerate')}
            </Button>
          </div>
        </div>
      )}

      {/* ---- Generating step ---- */}
      {step === 'generating' && (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-fg" aria-hidden />
          <p className="text-sm font-bold text-fg text-center">
            {t('ai.bulkEditGenerating', { count: selectedCards.length })}
          </p>
          <p className="text-xs text-muted text-center">
            {t('ai.bulkEditGeneratingWait')}
          </p>
          <Button variant="secondary" onClick={handleCancelGeneration} className="mt-2">
            {t('common.cancel')}
          </Button>
        </div>
      )}

      {/* ---- Preview step ---- */}
      {step === 'preview' && (
        <div className="space-y-4">
          {/* Accept/Reject controls */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-bold text-fg">
              {t('ai.bulkEditAccepted', { count: acceptedCount })}
            </p>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={acceptAll}>
                {t('ai.bulkEditAcceptAll')}
              </Button>
              <Button variant="ghost" size="sm" onClick={rejectAll} className="text-muted">
                {t('ai.bulkEditRejectAll')}
              </Button>
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
                  className={`rounded-[18px] border-2 overflow-hidden transition-opacity duration-150 ${
                    accepted ? 'border-edge' : 'border-edge/40 opacity-60'
                  }`}
                >
                  {/* Card header with checkbox */}
                  <div className="flex items-center gap-3 px-4 py-2 bg-fg/[0.04] border-b-2 border-line">
                    <input
                      type="checkbox"
                      checked={accepted}
                      onChange={() => toggleAccepted(edited.id)}
                      className="w-5 h-5 shrink-0 cursor-pointer accent-brand rounded focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky"
                    />
                    <span className="text-xs font-bold text-muted truncate">
                      {stripHtml(original.frontText || '').slice(0, 60)}{stripHtml(original.frontText || '').length > 60 ? '...' : ''}
                    </span>
                  </div>

                  {/* Diff content */}
                  <div className="grid grid-cols-2 divide-x-2 divide-line">
                    {/* Original column */}
                    <div className="p-3 space-y-2">
                      <p className="text-xs font-bold text-muted">
                        {t('ai.bulkEditOriginal')}
                      </p>
                      <div className={`text-sm font-medium text-fg ${frontChanged ? 'bg-again/15 px-1.5 py-0.5 rounded-md line-through decoration-again/60' : ''}`}>
                        <RichTextDisplay content={original.frontText || ''} />
                      </div>
                      <div className={`text-sm text-muted ${backChanged ? 'bg-again/15 px-1.5 py-0.5 rounded-md line-through decoration-again/60' : ''}`}>
                        <RichTextDisplay content={original.backText || ''} />
                      </div>
                    </div>

                    {/* Edited column */}
                    <div className="p-3 space-y-2">
                      <p className="text-xs font-bold text-muted">
                        {t('ai.bulkEditEdited')}
                      </p>
                      <div className={`text-sm font-medium text-fg ${frontChanged ? 'bg-grass/20 px-1.5 py-0.5 rounded-md' : ''}`}>
                        <RichTextDisplay content={edited.frontText || ''} />
                      </div>
                      <div className={`text-sm text-muted ${backChanged ? 'bg-grass/20 px-1.5 py-0.5 rounded-md' : ''}`}>
                        <RichTextDisplay content={edited.backText || ''} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {error && (
            <div role="alert" className="flex items-center gap-2 text-sm font-medium text-again">
              <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden />
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-line">
            <Button variant="ghost" size="sm" onClick={handleBackToPrompt} className="-ml-3 text-muted">
              <RefreshCw className="w-4 h-4" aria-hidden />
              {t('ai.bulkEditTryAgain')}
            </Button>
            <div className="flex gap-3 ml-auto">
              <Button variant="ghost" onClick={handleClose}>
                {t('common.cancel')}
              </Button>
              <Button onClick={handleApply} disabled={acceptedCount === 0}>
                {t('ai.bulkEditApply', { count: acceptedCount })}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ---- Applying step ---- */}
      {step === 'applying' && (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-fg" aria-hidden />
          <p className="text-sm font-bold text-fg">
            {t('ai.bulkEditApplying')}
          </p>
        </div>
      )}

      {/* ---- Done step ---- */}
      {step === 'done' && (
        <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
          <div className="sticker !shadow-sticker-sm bg-mint !rounded-full p-3 -rotate-3">
            <CheckCircle2 className="w-8 h-8 text-ink" aria-hidden />
          </div>
          <p className="font-display text-xl text-fg">
            {t('ai.bulkEditDone', { count: appliedCount })}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <Button
              variant="secondary"
              onClick={() => {
                setStep('prompt')
                setEditedCards([])
                setAcceptedIds(new Set())
                setError(null)
              }}
            >
              {t('ai.bulkEditTryAgain')}
            </Button>
            <Button onClick={handleClose}>
              {t('common.done')}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
