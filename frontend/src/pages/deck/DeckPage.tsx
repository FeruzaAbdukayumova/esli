import { useState, FormEvent, useCallback, useRef, useEffect, lazy, Suspense, type ReactNode, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import {
  ChevronRight,
  Play,
  Pencil,
  Trash2,
  Layers,
  Calendar,
  XCircle,
  X,
  Clock,
  Plus,
  Lightbulb,
  LayoutGrid,
  List,
  Globe,
  Lock,
  Loader2,
  Copy,
  Upload,
  Keyboard,
  CheckCircle2,
  FileSpreadsheet,
  PenLine,
} from 'lucide-react'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useDeckRepo } from '@/features/decks/repo'
import { useDeck, useCards, useAddCard, useAddCardsBatch, useDeleteCard, useDeleteDeck, useUpdateDeck, useUpdateCard } from '@/features/decks/hooks'
import { useSyncImport } from '@/features/sync/hooks'
import { guestStorage } from '@/shared/lib/guestStorage'
import type { Card } from '@/features/decks/types'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Spinner } from '@/shared/ui/Spinner'
import { Modal } from '@/shared/ui/Modal'
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog'
import { Skeleton } from '@/shared/ui/Skeleton'
import { DashboardNavbar } from '@/pages/dashboard/components/DashboardNavbar'
import { FileImportTab } from './components/FileImportTab'
import { AIGenerateTab } from './components/AIGenerateTab'
import { BulkAIEditModal } from './components/BulkAIEditModal'
import { segOn, segOff, labelCls, iconBtn, iconBtnDanger } from './components/deckStyles'

/** Icon button on a white sticker (ink in both themes) */
const stickerIconBtn =
  'min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-ink/60 hover:text-ink hover:bg-ink/10 active:scale-95 transition-[transform,color,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-50'
// TipTap + KaTeX are heavy; load the editor only when the deck editor renders.
const RichTextEditor = lazy(() =>
  import('@/shared/ui/RichTextEditor').then((m) => ({ default: m.RichTextEditor })),
)

function EditorFallback() {
  return <Skeleton className="h-[120px] w-full rounded-[14px]" />
}
import { RichTextDisplay } from '@/shared/ui/RichTextDisplay'
import { stripHtml, plainTextToHtml } from '@/shared/lib/htmlUtils'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { trackEvent } from '@/shared/lib/analytics'

const MAX_RICH_TEXT_CHARS = 5000

function formatRelative(dateStr: string, t: (key: string, opts?: Record<string, unknown>) => string, locale: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000))
  if (diffDays === 0) return t('deck.today')
  if (diffDays === 1) return t('deck.yesterday')
  if (diffDays < 7) return t('deck.daysAgo', { count: diffDays })
  if (diffDays < 30) return t('deck.weeksAgo', { count: Math.floor(diffDays / 7) })
  return new Date(dateStr).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface FlashcardItemProps {
  card: Card
  isSelected: boolean
  onToggleSelect: () => void
  onEdit: () => void
  onDelete: () => void
  isDeleting: boolean
}

function FlashcardItem({ card, isSelected, onToggleSelect, onEdit, onDelete, isDeleting }: FlashcardItemProps) {
  const { t, i18n } = useTranslation()
  return (
    <div
      className={`sheet p-4 sm:p-5 flex justify-between items-start gap-3 transition-[box-shadow] duration-150 ${
        isSelected ? 'ring-[3px] ring-sky ring-offset-2 ring-offset-canvas' : ''
      }`}
    >
      <div className="flex-1 min-w-0 flex items-start gap-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          onClick={(e) => e.stopPropagation()}
          className="mt-0.5 w-5 h-5 shrink-0 cursor-pointer rounded accent-brand focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky"
          aria-label={`Select card ${stripHtml(card.frontText || '') || 'unnamed'}`}
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-muted mb-1">{t('deck.frontLabel')}</p>
          {card.frontText ? (
            <RichTextDisplay content={card.frontText} className="text-fg text-base font-semibold break-words line-clamp-3" />
          ) : (
            <p className="text-muted italic text-base">{t('deck.noFrontText')}</p>
          )}
          <div className="border-t-2 border-dashed border-line my-3" aria-hidden />
          <p className="text-xs font-bold text-muted mb-1">{t('deck.backLabel')}</p>
          {card.backText ? (
            <RichTextDisplay content={card.backText} className="text-fg text-base break-words line-clamp-3" />
          ) : (
            <p className="text-muted italic text-base">{t('deck.noBackText')}</p>
          )}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted mt-3">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" aria-hidden />
              {t('deck.created')} {new Date(card.createdAt).toLocaleDateString(i18n.language, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            {card.lastReviewedAt && (
              <span>{t('deck.lastReviewed')} {formatRelative(card.lastReviewedAt, t, i18n.language)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 shrink-0 -mr-1 -mt-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
          className={iconBtn}
          title={t('deck.editCard')}
          aria-label={t('deck.editCard')}
        >
          <Pencil className="w-[18px] h-[18px]" aria-hidden />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          disabled={isDeleting}
          className={iconBtnDanger}
          title={t('deck.deleteCard')}
          aria-label={t('deck.deleteCard')}
        >
          {isDeleting ? (
            <span className="inline-block w-[18px] h-[18px] border-2 border-again border-t-transparent rounded-full animate-spin" aria-hidden />
          ) : (
            <Trash2 className="w-[18px] h-[18px]" aria-hidden />
          )}
        </button>
      </div>
    </div>
  )
}

export const DeckPage = () => {
  const { t, i18n } = useTranslation()
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuthContext()
  const { logout } = useAuth()
  const { mode } = useDeckRepo()
  const syncImportMutation = useSyncImport()
  const { data: deck, isLoading: deckLoading, error: deckError, refetch: refetchDeck } = useDeck(deckId || '')
  const { data: cards = [], isLoading: cardsLoading } = useCards(deckId || '')
  usePageMeta({ title: deck?.title || t('seo.decks.title', 'My Decks'), noIndex: true })
  const addCardMutation = useAddCard()
  const addCardsBatchMutation = useAddCardsBatch()
  const deleteCardMutation = useDeleteCard()
  const deleteDeckMutation = useDeleteDeck()
  const updateDeckMutation = useUpdateDeck()

  const guestData = guestStorage.read()
  const hasGuestDecksToSave =
    !!user &&
    Array.isArray(guestData.decks) &&
    typeof guestData.cardsByDeckId === 'object' &&
    guestData.decks.length >= 1
  const handleSaveGuestDecks = () => {
    if (!hasGuestDecksToSave) return
    syncImportMutation.mutate(
      { version: 1 as const, decks: guestData.decks, cardsByDeckId: guestData.cardsByDeckId },
      { onSuccess: () => guestStorage.clear() },
    )
  }

  // Auto-open add card form if addMode query param is present (from dashboard create flow)
  const initialAddMode = searchParams.get('addMode') as 'single' | 'bulk' | 'file' | 'ai' | null
  const [showAddCard, setShowAddCard] = useState(!!initialAddMode)
  const [frontText, setFrontText] = useState('')
  const [backText, setBackText] = useState('')
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [errorDismissing, setErrorDismissing] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Confirm dialog state (replaces native confirm())
  const [cardToDelete, setCardToDelete] = useState<string | null>(null)
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false)
  const [bulkDeleteProgress, setBulkDeleteProgress] = useState<{ done: number; total: number } | null>(null)
  const [showDeleteDeckConfirm, setShowDeleteDeckConfirm] = useState(false)

  // Bulk AI edit modal state
  const [showBulkAIEdit, setShowBulkAIEdit] = useState(false)

  // Edit deck modal state
  const [showEditDeckModal, setShowEditDeckModal] = useState(false)
  const [editDeckTitle, setEditDeckTitle] = useState('')
  const [editDeckTags, setEditDeckTags] = useState('')

  // Edit card modal state
  const [editingCard, setEditingCard] = useState<Card | null>(null)
  const [editCardFront, setEditCardFront] = useState('')
  const [editCardBack, setEditCardBack] = useState('')
  const updateCardMutation = useUpdateCard()

  // Enhanced card creation state
  const [addMode, setAddMode] = useState<'single' | 'bulk' | 'file' | 'ai'>(initialAddMode || 'single')
  const [bulkText, setBulkText] = useState('')
  const [addedCount, setAddedCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const bulkInputRef = useRef<HTMLTextAreaElement>(null)

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const selectAll = useCallback(() => {
    if (selectedIds.size === cards.length) setSelectedIds(new Set())
    else setSelectedIds(new Set(cards.map((c) => c.id)))
  }, [cards, selectedIds.size])

  const clearSelection = useCallback(() => setSelectedIds(new Set()), [])

  // Focus input when form opens
  useEffect(() => {
    if (showAddCard && addMode === 'bulk' && bulkInputRef.current) {
      bulkInputRef.current.focus()
    }
  }, [showAddCard, addMode])

  // Show success message briefly
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  const dismissError = () => {
    setErrorDismissing(true)
    setTimeout(() => {
      setDeleteError(null)
      setErrorDismissing(false)
    }, 200)
  }

  // The body is already notebook paper / chalkboard (DESIGN.md), so the shell sets no background.
  const deckPageShell = (children: ReactNode) => (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <DashboardNavbar
        user={user}
        isApiMode={mode === 'api'}
        hasGuestDecksToSave={hasGuestDecksToSave}
        isSyncing={syncImportMutation.isPending}
        onSaveGuestDecks={handleSaveGuestDecks}
        onLogout={logout}
      />
      {children}
    </div>
  )

  if (!deckId) {
    return deckPageShell(
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <p className="text-muted">{t('deck.invalidDeckId')}</p>
      </main>
    )
  }

  if (deckLoading) {
    return deckPageShell(
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 pt-4 sm:pt-8 pb-28 md:pb-16" aria-busy="true">
        <span className="sr-only">{t('deck.loadingDeck')}</span>
        {/* Breadcrumb skeleton */}
        <Skeleton className="h-4 w-48 mb-6" />
        {/* Deck header skeleton */}
        <Skeleton className="h-48 w-full rounded-[22px] mb-8" />
        {/* Cards list skeleton */}
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-36 rounded-[24px]" />
          ))}
        </div>
      </main>
    )
  }

  if (deckError) {
    return deckPageShell(
      <main className="flex-1 flex flex-col items-center justify-center px-4 gap-4 py-8">
        <XCircle className="w-10 h-10 text-again" aria-hidden />
        <p className="text-muted text-center max-w-sm">
          {t('deck.loadError', 'Something went wrong while loading this deck.')}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="secondary" onClick={() => refetchDeck()}>{t('deck.tryAgain', 'Try again')}</Button>
          <Button onClick={() => navigate('/dashboard')}>{t('deck.backToDashboard')}</Button>
        </div>
      </main>
    )
  }

  if (!deck) {
    return deckPageShell(
      <main className="flex-1 flex flex-col items-center justify-center px-4 gap-4 py-8">
        <p className="text-muted">{t('deck.deckNotFound')}</p>
        <Button onClick={() => navigate('/dashboard')}>{t('deck.backToDashboard')}</Button>
      </main>
    )
  }

  const handleAddCard = async (e?: FormEvent) => {
    e?.preventDefault()
    if (!stripHtml(frontText).trim() && !stripHtml(backText).trim()) return

    try {
      await addCardMutation.mutateAsync({
        deckId,
        cardInput: {
          frontText: stripHtml(frontText).trim() ? frontText : undefined,
          backText: stripHtml(backText).trim() ? backText : undefined,
        },
      })
      setFrontText('')
      setBackText('')
      setAddedCount((c) => c + 1)
      setShowSuccess(true)
      trackEvent('card.add', { method: 'single' })
      toast.success(t('toast.cardAdded'))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.failedToAddCard'))
    }
  }

  const handleBulkImport = async () => {
    const lines = bulkText.trim().split('\n').filter((line) => line.trim())
    if (lines.length === 0) return

    const cards = lines
      .map((line) => {
        const delimiter = line.includes('\t') ? '\t' : '|'
        const parts = line.split(delimiter).map((p) => p.trim())
        return { frontText: parts[0] || undefined, backText: parts[1] || undefined }
      })
      .filter((c) => c.frontText || c.backText)

    if (cards.length === 0) return

    try {
      await addCardsBatchMutation.mutateAsync({ deckId, cards })
      setBulkText('')
      setAddedCount((c) => c + cards.length)
      setShowSuccess(true)
      trackEvent('card.add', { method: 'bulk' })
      toast.success(t('toast.cardsImported', { count: cards.length }))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.cardsFailed', { count: cards.length }))
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl/Cmd + Enter to save
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      if (addMode === 'single') {
        handleAddCard()
      } else {
        handleBulkImport()
      }
    }
    // Escape to close
    if (e.key === 'Escape') {
      e.preventDefault()
      closeAddCardForm()
    }
  }

  const closeAddCardForm = () => {
    setShowAddCard(false)
    setFrontText('')
    setBackText('')
    setBulkText('')
    setAddedCount(0)
  }

  const confirmDeleteCard = async () => {
    if (!cardToDelete) return
    const cardId = cardToDelete
    try {
      await deleteCardMutation.mutateAsync({ deckId, cardId })
      setSelectedIds((prev) => {
        const next = new Set(prev)
        next.delete(cardId)
        return next
      })
      toast.success(t('toast.cardDeleted'))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.failedToDeleteCard'))
    } finally {
      setCardToDelete(null)
    }
  }

  const confirmBulkDelete = async () => {
    const ids = Array.from(selectedIds)
    const total = ids.length
    if (total === 0) return

    let done = 0
    setBulkDeleteProgress({ done: 0, total })
    try {
      // No batch delete in DeckRepository — delete sequentially with progress,
      // aborting on the first failure so the user knows exactly what succeeded.
      for (const cardId of ids) {
        await deleteCardMutation.mutateAsync({ deckId, cardId })
        done++
        setBulkDeleteProgress({ done, total })
        setSelectedIds((prev) => {
          const next = new Set(prev)
          next.delete(cardId)
          return next
        })
      }
      toast.success(t('toast.cardsDeleted', { count: total }))
    } catch (error) {
      toast.error(
        done > 0
          ? t('deck.bulkDeletePartial', 'Deleted {{done}} of {{total}} cards before an error occurred.', { done, total })
          : error instanceof Error ? error.message : t('toast.failedToDeleteCards'),
      )
    } finally {
      setBulkDeleteProgress(null)
      setShowBulkDeleteConfirm(false)
    }
  }

  const handleApplyBulkEdits = async (
    edits: { cardId: string; patch: { frontText: string; backText: string } }[],
  ) => {
    const total = edits.length
    const toastId = 'bulk-edit-progress'
    let done = 0
    try {
      for (const edit of edits) {
        toast.loading(
          t('deck.applyingEditsProgress', 'Applying edits {{done}}/{{total}}…', { done: done + 1, total }),
          { id: toastId },
        )
        await updateCardMutation.mutateAsync({
          deckId,
          cardId: edit.cardId,
          patch: edit.patch,
        })
        done++
      }
      toast.dismiss(toastId)
      setSelectedIds(new Set())
      toast.success(t('ai.bulkEditDone', { count: total }))
    } catch (error) {
      toast.dismiss(toastId)
      if (done > 0) {
        toast.error(t('deck.bulkEditPartial', 'Updated {{done}} of {{total}} cards before an error occurred.', { done, total }))
      }
      // Re-throw so BulkAIEditModal can surface its error state
      throw error
    }
  }

  const confirmDeleteDeck = async () => {
    setDeleteError(null)
    try {
      await deleteDeckMutation.mutateAsync(deckId)
      navigate('/dashboard')
    } catch (error) {
      console.error('Failed to delete deck:', error)
      setShowDeleteDeckConfirm(false)
      setDeleteError(error instanceof Error ? error.message : 'Failed to delete deck')
    }
  }

  const openEditDeckModal = () => {
    if (!deck) return
    setEditDeckTitle(deck.title)
    setEditDeckTags(deck.categoryTags.join(', '))
    setShowEditDeckModal(true)
  }

  const handleSaveDeck = async () => {
    if (!editDeckTitle.trim()) return
    try {
      await updateDeckMutation.mutateAsync({
        deckId,
        patch: {
          title: editDeckTitle.trim(),
          categoryTags: editDeckTags.split(',').map(tag => tag.trim()).filter(Boolean),
        },
      })
      setShowEditDeckModal(false)
      toast.success(t('toast.deckUpdated'))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.failedToUpdateDeck'))
    }
  }

  const openEditCardModal = (card: Card) => {
    setEditingCard(card)
    setEditCardFront(plainTextToHtml(card.frontText || ''))
    setEditCardBack(plainTextToHtml(card.backText || ''))
  }

  const handleSaveCard = async () => {
    if (!editingCard) return
    const hasFront = stripHtml(editCardFront).trim().length > 0
    const hasBack = stripHtml(editCardBack).trim().length > 0
    if (!hasFront && !hasBack) {
      toast.error(t('deck.cardCannotBeEmpty'))
      return
    }
    try {
      await updateCardMutation.mutateAsync({
        deckId,
        cardId: editingCard.id,
        patch: {
          frontText: hasFront ? editCardFront : undefined,
          backText: hasBack ? editCardBack : undefined,
        },
      })
      setEditingCard(null)
      setEditCardFront('')
      setEditCardBack('')
      toast.success(t('toast.cardUpdated'))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.failedToUpdateCard'))
    }
  }

  const linkCls =
    'rounded-md font-semibold hover:text-fg hover:underline underline-offset-4 decoration-2 transition-colors duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky'

  return deckPageShell(
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 pt-4 sm:pt-8 pb-28 md:pb-16">
      <div>
        {/* Breadcrumb */}
        <nav className="mb-5 md:mb-7" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-muted min-w-0">
            <li className="shrink-0">
              <Link to="/" className={linkCls}>{t('common.home')}</Link>
            </li>
            <li className="shrink-0"><ChevronRight className="w-4 h-4" aria-hidden /></li>
            <li className="shrink-0">
              <Link to="/dashboard" className={linkCls}>{t('deck.yourDecks')}</Link>
            </li>
            <li className="shrink-0"><ChevronRight className="w-4 h-4" aria-hidden /></li>
            <li className="font-bold text-fg truncate min-w-0" aria-current="page">
              {deck.title}
            </li>
          </ol>
        </nav>

        {/* Error banner */}
        {deleteError && (
          <div
            className={`sheet !border-again mb-6 p-4 flex items-start gap-3 transition-opacity duration-200 ${
              errorDismissing ? 'opacity-0' : 'opacity-100'
            }`}
            role="alert"
          >
            <XCircle className="w-5 h-5 shrink-0 text-again mt-0.5" aria-hidden />
            <p className="flex-1 text-sm font-medium text-fg">{deleteError}</p>
            <button
              type="button"
              onClick={dismissError}
              className={`${iconBtn} -m-2`}
              aria-label={t('auth.dismissError')}
            >
              <X className="w-5 h-5" aria-hidden />
            </button>
          </div>
        )}

        {/* Deck header: the deck itself as a big sticker, taped to the page */}
        <header className="sticker relative -rotate-[0.4deg] p-5 sm:p-7 mb-8">
          <span className="tape bg-sun/80 -top-3 left-6 -rotate-3" aria-hidden />
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-[1.75rem] sm:text-[2.25rem] leading-[1.1] text-ink mb-3 [overflow-wrap:anywhere] [text-wrap:balance]">
                {deck.title}
              </h1>
              {deck.categoryTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {deck.categoryTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border-2 border-ink bg-bubblegum px-3 py-0.5 text-sm font-bold text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm font-medium text-ink/70">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4" aria-hidden />
                  {t('deck.cardCount', { count: cards.length })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" aria-hidden />
                  {t('deck.created')} {new Date(deck.createdAt).toLocaleDateString(i18n.language, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                {deck.lastStudiedAt && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" aria-hidden />
                    {t('deck.lastStudied')} {new Date(deck.lastStudiedAt).toLocaleDateString(i18n.language, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                )}
              </div>

              {/* Share toggle */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 pt-4 border-t-2 border-dashed border-ink/15">
                <button
                  type="button"
                  onClick={() => {
                    updateDeckMutation.mutate({
                      deckId,
                      patch: { isShared: !deck.isShared },
                    })
                  }}
                  disabled={updateDeckMutation.isPending}
                  aria-pressed={deck.isShared}
                  className={`btn-sticker min-h-[40px] px-3.5 text-sm ${deck.isShared ? 'bg-mint' : 'bg-white'}`}
                >
                  {updateDeckMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                  ) : deck.isShared ? (
                    <Globe className="w-4 h-4" aria-hidden />
                  ) : (
                    <Lock className="w-4 h-4" aria-hidden />
                  )}
                  {deck.isShared ? t('deck.public') : t('deck.private')}
                </button>
                <span className="text-xs font-medium text-ink/65">
                  {deck.isShared
                    ? t('deck.publicDescription')
                    : t('deck.privateDescription')
                  }
                </span>
                {deck.isShared && (deck.copyCount ?? 0) > 0 && (
                  <span className="flex items-center gap-1 text-xs font-medium text-ink/65 sm:ml-auto">
                    <Copy className="w-3.5 h-3.5" aria-hidden />
                    {deck.copyCount} {deck.copyCount === 1 ? t('deck.copy') : t('deck.copies')}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="lg"
                onClick={() => navigate(`/study/${deckId}`)}
                disabled={cards.length === 0}
                title={cards.length === 0 ? t('deck.addAtLeastOneCard') : t('deck.startStudy')}
                className="flex-1 sm:flex-none"
              >
                <Play className="w-4 h-4" aria-hidden />
                {t('deck.startStudy')}
              </Button>
              <button
                type="button"
                onClick={openEditDeckModal}
                className={stickerIconBtn}
                title={t('deck.editDeck')}
                aria-label={t('deck.editDeck')}
              >
                <Pencil className="w-5 h-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteDeckConfirm(true)}
                disabled={deleteDeckMutation.isPending}
                className={`${stickerIconBtn} hover:!text-again`}
                title={t('deck.deleteDeck')}
                aria-label={t('deck.deleteDeck')}
              >
                {deleteDeckMutation.isPending ? (
                  <span className="inline-block w-5 h-5 border-2 border-again border-t-transparent rounded-full animate-spin" aria-hidden />
                ) : (
                  <Trash2 className="w-5 h-5" aria-hidden />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Add New Card button */}
        {!showAddCard && (
          <div className="mb-6">
            <button
              type="button"
              onClick={() => {
                setShowAddCard(true)
                setAddedCount(0)
              }}
              className="btn-ink min-h-[48px] px-5 text-[15px]"
            >
              <Plus className="w-5 h-5" aria-hidden />
              {t('deck.addCards')}
            </button>
          </div>
        )}

        {/* Enhanced Add Card Form */}
        {showAddCard && (
          <section aria-labelledby="add-cards-title" className="sheet p-4 sm:p-6 mb-8 animate-slide-down">
            {/* Header with success indicator */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h2 id="add-cards-title" className="font-display text-xl sm:text-2xl text-fg">
                {t('deck.addCards')}
              </h2>
              <div className="flex items-center gap-3">
                {addedCount > 0 && (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-mint px-2.5 py-0.5 text-sm font-bold text-ink transition-transform duration-300 ease-bounce-out ${showSuccess ? 'scale-110' : 'scale-100'}`}
                    aria-live="polite"
                  >
                    <CheckCircle2 className="w-4 h-4" aria-hidden />
                    {addedCount} {t('deck.added')}
                  </span>
                )}
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted">
                  <Keyboard className="w-3.5 h-3.5" aria-hidden />
                  <span>{t('deck.ctrlEnterToSave')}</span>
                </div>
              </div>
            </div>

            {/* Mode Tabs */}
            <div
              role="tablist"
              aria-label={t('deck.addCards')}
              className="flex gap-2 mb-5 -mx-1 px-1 py-1 max-w-full overflow-x-auto scrollbar-hide"
            >
              {[
                { mode: 'single' as const, icon: Plus, label: t('deck.tabs.singleCard') },
                { mode: 'bulk' as const, icon: Upload, label: t('deck.tabs.bulkImport') },
                { mode: 'file' as const, icon: FileSpreadsheet, label: t('deck.tabs.fileImport') },
                { mode: 'ai' as const, icon: Lightbulb, label: t('deck.tabs.aiGenerate') },
              ].map((tab) => {
                const TabIcon = tab.icon
                return (
                  <button
                    key={tab.mode}
                    type="button"
                    role="tab"
                    aria-selected={addMode === tab.mode}
                    onClick={() => setAddMode(tab.mode)}
                    className={`${addMode === tab.mode ? segOn : segOff} min-h-[44px] px-4 text-sm`}
                  >
                    <TabIcon className="w-4 h-4" aria-hidden />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {addMode === 'ai' ? (
              /* AI Generate Mode */
              <AIGenerateTab
                deckId={deckId}
                existingCards={cards}
                onAddBatch={async (args) => {
                  const result = await addCardsBatchMutation.mutateAsync(args)
                  setAddedCount((c) => c + result.length)
                  setShowSuccess(true)
                  return result
                }}
                isPending={addCardsBatchMutation.isPending}
                onClose={closeAddCardForm}
              />
            ) : addMode === 'file' ? (
              /* File Import Mode */
              <FileImportTab
                deckId={deckId}
                onImportBatch={async (args) => {
                  const result = await addCardsBatchMutation.mutateAsync(args)
                  setAddedCount((c) => c + result.length)
                  setShowSuccess(true)
                  return result
                }}
                isPending={addCardsBatchMutation.isPending}
                onClose={closeAddCardForm}
              />
            ) : addMode === 'single' ? (
              /* Single Card Mode - Side by Side Layout */
              <form onSubmit={handleAddCard}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Front */}
                  <div>
                    <label className={labelCls}>
                      {t('deck.front')}
                    </label>
                    <Suspense fallback={<EditorFallback />}><RichTextEditor
                      content={frontText}
                      onChange={setFrontText}
                      placeholder={t('deck.frontPlaceholder')}
                      maxLength={MAX_RICH_TEXT_CHARS}
                    /></Suspense>
                  </div>
                  {/* Back */}
                  <div>
                    <label className={labelCls}>
                      {t('deck.back')}
                    </label>
                    <Suspense fallback={<EditorFallback />}><RichTextEditor
                      content={backText}
                      onChange={setBackText}
                      placeholder={t('deck.backPlaceholder')}
                      maxLength={MAX_RICH_TEXT_CHARS}
                    /></Suspense>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-line">
                  <p className="hidden sm:block text-xs text-muted">
                    {t('deck.pressCtrlEnterToAdd')}
                  </p>
                  <div className="flex gap-3 ml-auto">
                    <Button variant="ghost" onClick={closeAddCardForm} disabled={addCardMutation.isPending}>
                      {t('common.done')}
                    </Button>
                    <button
                      type="submit"
                      disabled={addCardMutation.isPending || (!stripHtml(frontText).trim() && !stripHtml(backText).trim())}
                      className="btn-ink min-h-[46px] px-5 text-[15px]"
                    >
                      {addCardMutation.isPending ? (
                        <>
                          <Spinner size="sm" className="text-current" />
                          {t('deck.adding')}
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" aria-hidden />
                          {t('deck.addAndContinue')}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* Bulk Import Mode */
              <div>
                <div className="mb-4">
                  <label htmlFor="bulk-import" className={labelCls}>
                    {t('deck.bulkPaste')}
                  </label>
                  <textarea
                    ref={bulkInputRef}
                    id="bulk-import"
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('deck.bulkImportPlaceholder')}
                    disabled={addCardsBatchMutation.isPending}
                    rows={8}
                    className="field resize-none font-mono text-sm leading-relaxed"
                  />
                  <p className="mt-2 text-xs text-muted">
                    {t('deck.bulkPlaceholder')}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-line">
                  <p className="text-sm font-medium text-muted">
                    <span className="font-extrabold text-fg tabular-nums">{bulkText.trim().split('\n').filter((l) => l.trim()).length}</span> {t('deck.cardsReadyToImport')}
                  </p>
                  <div className="flex gap-3 ml-auto">
                    <Button variant="ghost" onClick={closeAddCardForm} disabled={addCardsBatchMutation.isPending}>
                      {t('common.cancel')}
                    </Button>
                    <button
                      type="button"
                      onClick={handleBulkImport}
                      disabled={addCardsBatchMutation.isPending || !bulkText.trim()}
                      className="btn-ink min-h-[46px] px-5 text-[15px]"
                    >
                      {addCardsBatchMutation.isPending ? (
                        <>
                          <Spinner size="sm" className="text-current" />
                          {t('deck.importing')}
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" aria-hidden />
                          {t('deck.importAll')}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Cards list */}
        {cardsLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-36 rounded-[24px]" />
            ))}
          </div>
        ) : cards.length === 0 && !showAddCard ? (
          <div className="py-6 sm:py-10">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl sm:text-[1.75rem] text-fg mb-2">{t('deck.noCardsYet')}</h2>
              <p className="text-muted font-medium max-w-sm mx-auto">
                {t('deck.startBuildingDeck')}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-2xl mx-auto">
              {[
                { mode: 'ai' as const, icon: Lightbulb, label: t('deck.tabs.aiGenerate'), desc: t('dashboard.generateWithAIDesc'), fill: 'bg-lilac', tilt: '-rotate-[0.6deg]' },
                { mode: 'single' as const, icon: Plus, label: t('deck.tabs.singleCard'), desc: t('dashboard.createEmptyDesc'), fill: 'bg-white', tilt: 'rotate-[0.5deg]' },
                { mode: 'file' as const, icon: FileSpreadsheet, label: t('deck.tabs.fileImport'), desc: t('dashboard.importFileDesc'), fill: 'bg-bubblegum', tilt: 'rotate-[0.4deg]' },
                { mode: 'bulk' as const, icon: Upload, label: t('deck.tabs.bulkImport'), desc: t('dashboard.bulkImportDesc'), fill: 'bg-sky', tilt: '-rotate-[0.5deg]' },
              ].map((m) => {
                const Icon = m.icon
                return (
                  <button
                    key={m.mode}
                    type="button"
                    onClick={() => {
                      setAddMode(m.mode)
                      setShowAddCard(true)
                      setAddedCount(0)
                    }}
                    className={`sticker ${m.fill} ${m.tilt} flex items-start gap-3 p-4 sm:p-5 text-left transition-transform duration-150 ease-out hover:-translate-y-1 hover:rotate-0 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`}
                  >
                    <Icon className="w-6 h-6 shrink-0 mt-0.5 text-ink" aria-hidden />
                    <span className="min-w-0">
                      <span className="block text-base font-extrabold text-ink">{m.label}</span>
                      <span className="block text-sm font-medium text-ink/70 mt-0.5">{m.desc}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : cards.length === 0 && showAddCard ? (
          null
        ) : (
          <>
            {/* View toggle, select all, and bulk actions */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted">{t('deck.view')}</span>
                <div className="flex gap-1" role="group" aria-label={t('dashboard.viewModeGroup')}>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`${viewMode === 'list' ? segOn : segOff} min-w-[44px] min-h-[44px] !px-0`}
                    title={t('dashboard.listView')}
                    aria-label={t('dashboard.listView')}
                    aria-pressed={viewMode === 'list'}
                  >
                    <List className="w-5 h-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`${viewMode === 'grid' ? segOn : segOff} min-w-[44px] min-h-[44px] !px-0`}
                    title={t('dashboard.gridView')}
                    aria-label={t('dashboard.gridView')}
                    aria-pressed={viewMode === 'grid'}
                  >
                    <LayoutGrid className="w-5 h-5" aria-hidden />
                  </button>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={selectAll} className="min-h-[44px]">
                {selectedIds.size === cards.length ? t('deck.deselectAll') : t('deck.selectAll')}
              </Button>
            </div>

            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                  : 'flex flex-col space-y-4'
              }
            >
              {cards.map((card) => (
                <FlashcardItem
                  key={card.id}
                  card={card}
                  isSelected={selectedIds.has(card.id)}
                  onToggleSelect={() => toggleSelect(card.id)}
                  onEdit={() => openEditCardModal(card)}
                  onDelete={() => setCardToDelete(card.id)}
                  isDeleting={deleteCardMutation.isPending && deleteCardMutation.variables?.cardId === card.id}
                />
              ))}
            </div>

            {/* Spacer when bulk bar is visible */}
            {selectedIds.size > 0 && <div className="h-24" aria-hidden />}
          </>
        )}

        {/* Bulk action bar: fixed bottom with slide-up */}
        {selectedIds.size > 0 && createPortal(
          <div className="fixed bottom-0 left-0 right-0 z-[900] px-3 pb-3 safe-area-bottom animate-slide-up">
            <div className="sheet !rounded-[20px] max-w-3xl mx-auto px-3 sm:px-4 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-full border-2 border-ink bg-sky text-ink text-sm font-extrabold tabular-nums">
                    {selectedIds.size}
                  </span>
                  <p className="hidden sm:block text-sm font-bold text-fg">
                    {t('deck.selected')}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Button variant="ghost" size="sm" onClick={clearSelection}>
                    {t('common.cancel')}
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setShowBulkAIEdit(true)}>
                    <PenLine className="w-4 h-4" aria-hidden />
                    {t('ai.bulkEdit')}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setShowBulkDeleteConfirm(true)}
                    disabled={deleteCardMutation.isPending}
                    aria-label={t('common.delete')}
                  >
                    <Trash2 className="w-4 h-4" aria-hidden />
                    <span className="hidden sm:inline">{t('common.delete')}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

        {/* Edit Deck Modal */}
        <Modal
          isOpen={showEditDeckModal}
          onClose={() => setShowEditDeckModal(false)}
          title={t('deck.editDeckModal')}
          size="sm"
          locked={updateDeckMutation.isPending}
        >
          <div className="space-y-4 mt-4">
            <Input
              id="edit-deck-title-input"
              label={t('deck.title')}
              type="text"
              value={editDeckTitle}
              onChange={(e) => setEditDeckTitle(e.target.value)}
              maxLength={255}
              data-autofocus
              placeholder={t('deck.deckTitlePlaceholder')}
            />

            <Input
              id="edit-deck-tags-input"
              label={t('deck.tagsLabel')}
              type="text"
              value={editDeckTags}
              onChange={(e) => setEditDeckTags(e.target.value)}
              placeholder={t('deck.tagsPlaceholder')}
            />

            <div className="flex flex-wrap justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={() => setShowEditDeckModal(false)} disabled={updateDeckMutation.isPending}>
                {t('common.cancel')}
              </Button>
              <Button
                onClick={handleSaveDeck}
                loading={updateDeckMutation.isPending}
                disabled={!editDeckTitle.trim()}
              >
                {updateDeckMutation.isPending ? t('deck.saving') : t('deck.saveChanges')}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Edit Card Modal */}
        <Modal
          isOpen={!!editingCard}
          onClose={() => setEditingCard(null)}
          title={t('deck.editCardModal')}
          size="lg"
          locked={updateCardMutation.isPending}
        >
          <div className="space-y-4 mt-4">
            <div>
              <label className={labelCls}>
                {t('deck.front')}
              </label>
              <Suspense fallback={<EditorFallback />}><RichTextEditor
                content={editCardFront}
                onChange={setEditCardFront}
                placeholder={t('deck.enterFront')}
                maxLength={MAX_RICH_TEXT_CHARS}
                compact
              /></Suspense>
            </div>

            <div>
              <label className={labelCls}>
                {t('deck.back')}
              </label>
              <Suspense fallback={<EditorFallback />}><RichTextEditor
                content={editCardBack}
                onChange={setEditCardBack}
                placeholder={t('deck.enterBack')}
                maxLength={MAX_RICH_TEXT_CHARS}
                compact
              /></Suspense>
            </div>

            <div className="flex flex-wrap justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={() => setEditingCard(null)} disabled={updateCardMutation.isPending}>
                {t('common.cancel')}
              </Button>
              <Button onClick={handleSaveCard} loading={updateCardMutation.isPending}>
                {updateCardMutation.isPending ? t('deck.saving') : t('deck.saveChanges')}
              </Button>
            </div>
          </div>
        </Modal>
      </div>

      {/* Bulk AI Edit Modal */}
      <BulkAIEditModal
        isOpen={showBulkAIEdit}
        onClose={() => setShowBulkAIEdit(false)}
        selectedCards={cards.filter((c) => selectedIds.has(c.id))}
        onApplyEdits={handleApplyBulkEdits}
      />

      {/* Delete card confirmation */}
      <ConfirmDialog
        isOpen={cardToDelete !== null}
        title={t('deck.deleteCard')}
        description={t('deck.confirmDeleteCard')}
        confirmLabel={t('common.delete')}
        danger
        isPending={deleteCardMutation.isPending}
        onClose={() => setCardToDelete(null)}
        onConfirm={confirmDeleteCard}
      />

      {/* Bulk delete confirmation with progress */}
      <ConfirmDialog
        isOpen={showBulkDeleteConfirm}
        title={t('deck.confirmDeleteCards', { count: bulkDeleteProgress?.total ?? selectedIds.size })}
        description={
          bulkDeleteProgress
            ? t('deck.deletingProgress', 'Deleting {{done}}/{{total}}…', {
                done: Math.min(bulkDeleteProgress.done + 1, bulkDeleteProgress.total),
                total: bulkDeleteProgress.total,
              })
            : undefined
        }
        confirmLabel={t('common.delete')}
        danger
        isPending={bulkDeleteProgress !== null}
        onClose={() => setShowBulkDeleteConfirm(false)}
        onConfirm={confirmBulkDelete}
      />

      {/* Delete deck confirmation */}
      <ConfirmDialog
        isOpen={showDeleteDeckConfirm}
        title={t('deck.deleteDeckConfirm')}
        description={t('deck.deleteDeckWarning')}
        confirmLabel={t('common.delete')}
        danger
        isPending={deleteDeckMutation.isPending}
        onClose={() => setShowDeleteDeckConfirm(false)}
        onConfirm={confirmDeleteDeck}
      />
    </main>
  )
}
