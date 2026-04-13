import { useState, FormEvent, useCallback, useRef, useEffect, type ReactNode, type KeyboardEvent } from 'react'
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
  CreditCard,
  Lightbulb,
  Check,
  FileText,
  Eye,
  EyeOff,
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
  Sparkles,
} from 'lucide-react'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useDeckRepo } from '@/features/decks/repo'
import { useDeck, useCards, useAddCard, useAddCardsBatch, useDeleteCard, useDeleteDeck, useUpdateDeck, useUpdateCard } from '@/features/decks/hooks'
import { useSyncImport } from '@/features/sync/hooks'
import { guestStorage } from '@/shared/lib/guestStorage'
import type { Card } from '@/features/decks/types'
import { Button } from '@/shared/ui/Button'
import { DashboardNavbar } from '@/pages/dashboard/components/DashboardNavbar'
import { FileImportTab } from './components/FileImportTab'
import { AIGenerateTab } from './components/AIGenerateTab'
import { BulkAIEditModal } from './components/BulkAIEditModal'
import { RichTextEditor } from '@/shared/ui/RichTextEditor'
import { RichTextDisplay } from '@/shared/ui/RichTextDisplay'
import { stripHtml, plainTextToHtml } from '@/shared/lib/htmlUtils'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { trackEvent } from '@/shared/lib/analytics'

const MAX_RICH_TEXT_CHARS = 5000

function formatRelative(dateStr: string, t: (key: string, opts?: Record<string, unknown>) => string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000))
  if (diffDays === 0) return t('deck.today')
  if (diffDays === 1) return t('deck.yesterday')
  if (diffDays < 7) return t('deck.daysAgo', { count: diffDays })
  if (diffDays < 30) return t('deck.weeksAgo', { count: Math.floor(diffDays / 7) })
  return new Date(dateStr).toLocaleDateString(undefined, {
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
  const { t } = useTranslation()
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-elevation-sm border border-slate-200 dark:border-slate-700 hover:shadow-elevation-md hover:border-primary-300 dark:hover:border-primary-600 hover:scale-[1.02] transition-[transform,box-shadow,border-color] p-6 flex justify-between items-start">
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            onClick={(e) => e.stopPropagation()}
            className="mt-1 w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500 dark:bg-slate-700"
            aria-label={`Select card ${stripHtml(card.frontText || '') || 'unnamed'}`}
          />
          <div className="flex-1 space-y-4 min-w-0">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                <Eye className="w-3.5 h-3.5" aria-hidden />
                {t('deck.frontLabel')}
              </div>
              {card.frontText ? (
                <RichTextDisplay content={card.frontText} className="text-slate-900 dark:text-slate-100 text-base break-words line-clamp-3" />
              ) : (
                <p className="text-slate-400 dark:text-slate-500 italic text-base">{t('deck.noFrontText')}</p>
              )}
            </div>
            <div className="border-t border-slate-100 dark:border-slate-700 my-3" aria-hidden />
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                <EyeOff className="w-3.5 h-3.5" aria-hidden />
                {t('deck.backLabel')}
              </div>
              {card.backText ? (
                <RichTextDisplay content={card.backText} className="text-slate-900 dark:text-slate-100 text-base break-words line-clamp-3" />
              ) : (
                <p className="text-slate-400 dark:text-slate-500 italic text-base">{t('deck.noBackText')}</p>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" aria-hidden />
                {t('deck.created')} {new Date(card.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              {card.lastReviewedAt && (
                <span>{t('deck.lastReviewed')} {formatRelative(card.lastReviewedAt, t)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 shrink-0 ml-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
          className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          title={t('deck.editCard')}
          aria-label={t('deck.editCard')}
        >
          <Pencil className="w-5 h-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          disabled={isDeleting}
          className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
          title={t('deck.deleteCard')}
          aria-label={t('deck.deleteCard')}
        >
          {isDeleting ? (
            <span className="inline-block w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" aria-hidden />
          ) : (
            <Trash2 className="w-5 h-5" aria-hidden />
          )}
        </button>
      </div>
    </div>
  )
}

export const DeckPage = () => {
  const { t } = useTranslation()
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuthContext()
  const { logout } = useAuth()
  const { mode } = useDeckRepo()
  const syncImportMutation = useSyncImport()
  const { data: deck, isLoading: deckLoading } = useDeck(deckId || '')
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

  const deckPageShell = (children: ReactNode) => (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-x-hidden">
      <div
        className="fixed inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none z-0"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}
        aria-hidden
      />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none z-0" aria-hidden />
      <div className="fixed bottom-0 right-0 w-[400px] h-[200px] bg-primary-300/10 dark:bg-primary-600/10 rounded-full blur-3xl pointer-events-none z-0" aria-hidden />
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
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <p className="text-slate-600 dark:text-slate-400">{t('deck.invalidDeckId')}</p>
      </main>
    )
  }

  if (deckLoading) {
    return deckPageShell(
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <p className="text-slate-600 dark:text-slate-400">{t('deck.loadingDeck')}</p>
      </main>
    )
  }

  if (!deck) {
    return deckPageShell(
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 gap-4 py-8">
        <p className="text-slate-600 dark:text-slate-400">{t('deck.deckNotFound')}</p>
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

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm(t('deck.confirmDeleteCard'))) return

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
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(t('deck.confirmDeleteCards', { count: selectedIds.size }))) return

    const count = selectedIds.size
    try {
      for (const cardId of selectedIds) {
        await deleteCardMutation.mutateAsync({ deckId, cardId })
      }
      setSelectedIds(new Set())
      toast.success(t('toast.cardsDeleted', { count }))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.failedToDeleteCards'))
    }
  }

  const handleApplyBulkEdits = async (
    edits: { cardId: string; patch: { frontText: string; backText: string } }[],
  ) => {
    for (const edit of edits) {
      await updateCardMutation.mutateAsync({
        deckId,
        cardId: edit.cardId,
        patch: edit.patch,
      })
    }
    setSelectedIds(new Set())
    toast.success(t('ai.bulkEditDone', { count: edits.length }))
  }

  const handleDeleteDeck = async () => {
    if (!window.confirm(t('deck.deleteDeckConfirm') + ' ' + t('deck.deleteDeckWarning'))) return
    setDeleteError(null)
    try {
      await deleteDeckMutation.mutateAsync(deckId)
      navigate('/dashboard')
    } catch (error) {
      console.error('Failed to delete deck:', error)
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

  return deckPageShell(
    <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 md:py-8 pb-24 md:pb-8 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-elevation-md border border-slate-100 dark:border-slate-700/50 p-4 sm:p-6 md:p-8">
        {/* Breadcrumb */}
        <nav className="mb-4 md:mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t('common.home')}</Link>
            </li>
            <li><ChevronRight className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden /></li>
            <li>
              <Link to="/dashboard" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t('deck.yourDecks')}</Link>
            </li>
            <li><ChevronRight className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden /></li>
            <li className="font-medium text-slate-800 dark:text-slate-100" aria-current="page">
              {deck.title}
            </li>
          </ol>
        </nav>

        {/* Error banner */}
        {deleteError && (
          <div
            className={`mb-6 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 flex items-start gap-3 transition-opacity duration-200 ${
              errorDismissing ? 'opacity-0' : 'opacity-100'
            }`}
            role="alert"
          >
            <XCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400 mt-0.5" aria-hidden />
            <p className="flex-1 text-sm text-red-800 dark:text-red-200">{deleteError}</p>
            <button
              type="button"
              onClick={dismissError}
              className="shrink-0 p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label={t('auth.dismissError')}
            >
              <X className="w-5 h-5" aria-hidden />
            </button>
          </div>
        )}

        {/* Deck header card */}
        <div className="bg-white dark:bg-slate-700/50 rounded-xl shadow-elevation-sm border border-slate-200 dark:border-slate-600 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3 truncate tracking-tight">
                {deck.title}
              </h1>
              {deck.categoryTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {deck.categoryTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-slate-400 dark:text-slate-500" aria-hidden />
                  {t('deck.cardCount', { count: cards.length })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" aria-hidden />
                  {t('deck.created')} {new Date(deck.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                {deck.lastStudiedAt && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" aria-hidden />
                    {t('deck.lastStudied')} {new Date(deck.lastStudiedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                )}
              </div>

              {/* Share toggle */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                <button
                  type="button"
                  onClick={() => {
                    updateDeckMutation.mutate({
                      deckId,
                      patch: { isShared: !deck.isShared },
                    })
                  }}
                  disabled={updateDeckMutation.isPending}
                  className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
                    deck.isShared
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 focus:ring-emerald-500'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 focus:ring-slate-500'
                  } disabled:opacity-60`}
                >
                  {updateDeckMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : deck.isShared ? (
                    <Globe className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  {deck.isShared ? t('deck.public') : t('deck.private')}
                </button>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {deck.isShared
                    ? t('deck.publicDescription')
                    : t('deck.privateDescription')
                  }
                </span>
                {deck.isShared && (deck as any).copyCount > 0 && (
                  <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 ml-auto">
                    <Copy className="w-3.5 h-3.5" />
                    {(deck as any).copyCount} {(deck as any).copyCount === 1 ? t('deck.copy') : t('deck.copies')}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button
                onClick={() => navigate(`/study/${deckId}`)}
                disabled={cards.length === 0}
                title={cards.length === 0 ? t('deck.addAtLeastOneCard') : t('deck.startStudy')}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4" aria-hidden />
                {t('deck.startStudy')}
              </Button>
              <button
                type="button"
                onClick={openEditDeckModal}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                title={t('deck.editDeck')}
                aria-label={t('deck.editDeck')}
              >
                <Pencil className="w-5 h-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={handleDeleteDeck}
                disabled={deleteDeckMutation.isPending}
                className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
                title={t('deck.deleteDeck')}
                aria-label={t('deck.deleteDeck')}
              >
                {deleteDeckMutation.isPending ? (
                  <span className="inline-block w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" aria-hidden />
                ) : (
                  <Trash2 className="w-5 h-5" aria-hidden />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Add New Card button */}
        {!showAddCard && (
          <div className="mb-6">
            <button
              type="button"
              onClick={() => {
                setShowAddCard(true)
                setAddedCount(0)
              }}
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 gap-2"
            >
              <Plus className="w-5 h-5" aria-hidden />
              {t('deck.addCards')}
            </button>
          </div>
        )}

        {/* Enhanced Add Card Form */}
        {showAddCard && (
          <div className="bg-white dark:bg-slate-700/50 rounded-xl shadow-elevation-sm border border-slate-200 dark:border-slate-600 p-6 mb-6 animate-slide-down">
            {/* Header with success indicator */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden />
                {t('deck.addCards')}
              </h2>
              <div className="flex items-center gap-3">
                {addedCount > 0 && (
                  <span className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${showSuccess ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    <CheckCircle2 className={`w-4 h-4 transition-transform duration-300 ${showSuccess ? 'scale-110' : 'scale-100'}`} />
                    {addedCount} {t('deck.added')}
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                  <Keyboard className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('deck.ctrlEnterToSave')}</span>
                </div>
              </div>
            </div>

            {/* Mode Tabs */}
            <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 w-fit">
              <button
                type="button"
                onClick={() => setAddMode('single')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  addMode === 'single'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  {t('deck.tabs.singleCard')}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setAddMode('bulk')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  addMode === 'bulk'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  {t('deck.tabs.bulkImport')}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setAddMode('file')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  addMode === 'file'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  {t('deck.tabs.fileImport')}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setAddMode('ai')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  addMode === 'ai'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {t('deck.tabs.aiGenerate')}
                </span>
              </button>
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
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-500" aria-hidden />
                      {t('deck.front')}
                    </label>
                    <RichTextEditor
                      content={frontText}
                      onChange={setFrontText}
                      placeholder={t('deck.frontPlaceholder')}
                      maxLength={MAX_RICH_TEXT_CHARS}
                    />
                  </div>
                  {/* Back */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" aria-hidden />
                      {t('deck.back')}
                    </label>
                    <RichTextEditor
                      content={backText}
                      onChange={setBackText}
                      placeholder={t('deck.backPlaceholder')}
                      maxLength={MAX_RICH_TEXT_CHARS}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-600">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('deck.pressCtrlEnterToAdd')}
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={closeAddCardForm}
                      disabled={addCardMutation.isPending}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-60"
                    >
                      {t('common.done')}
                    </button>
                    <button
                      type="submit"
                      disabled={addCardMutation.isPending || (!stripHtml(frontText).trim() && !stripHtml(backText).trim())}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {addCardMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
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
                  <label htmlFor="bulk-import" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    <Upload className="w-4 h-4 text-primary-500" aria-hidden />
                    {t('deck.bulkPaste')}
                  </label>
                  <textarea
                    ref={bulkInputRef}
                    id="bulk-import"
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('deck.bulkImportPlaceholder')}
                    disabled={addCardMutation.isPending}
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 disabled:cursor-not-allowed transition-shadow resize-none font-mono text-sm"
                  />
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {t('deck.bulkPlaceholder')}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-600">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {bulkText.trim().split('\n').filter((l) => l.trim()).length} {t('deck.cardsReadyToImport')}
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={closeAddCardForm}
                      disabled={addCardMutation.isPending}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-60"
                    >
                      {t('common.cancel')}
                    </button>
                    <button
                      type="button"
                      onClick={handleBulkImport}
                      disabled={addCardMutation.isPending || !bulkText.trim()}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {addCardMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
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
          </div>
        )}

        {/* Cards list */}
        {cardsLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-slate-200 dark:bg-slate-600 rounded-xl h-40 animate-pulse"
                aria-hidden
              />
            ))}
          </div>
        ) : cards.length === 0 && !showAddCard ? (
          <div className="py-12 px-4">
            <div className="text-center mb-8">
              <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-500" aria-hidden />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">{t('deck.noCardsYet')}</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                {t('deck.startBuildingDeck')}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {[
                { mode: 'single' as const, icon: Plus, label: t('deck.tabs.singleCard'), desc: t('dashboard.createEmptyDesc'), color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-900/20', border: 'border-primary-200 dark:border-primary-800 hover:border-primary-400 dark:hover:border-primary-600' },
                { mode: 'ai' as const, icon: Sparkles, label: t('deck.tabs.aiGenerate'), desc: t('dashboard.generateWithAIDesc'), color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-900/20', border: 'border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600' },
                { mode: 'file' as const, icon: FileSpreadsheet, label: t('deck.tabs.fileImport'), desc: t('dashboard.importFileDesc'), color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600' },
                { mode: 'bulk' as const, icon: Upload, label: t('deck.tabs.bulkImport'), desc: t('dashboard.bulkImportDesc'), color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600' },
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
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 ${m.border} ${m.bg} transition-[color,background-color,border-color,box-shadow] duration-200 hover:shadow-elevation-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${m.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{m.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 hidden sm:block">{m.desc}</p>
                    </div>
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
                <span className="text-sm text-slate-600 dark:text-slate-400">{t('deck.view')}</span>
                <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden" role="group" aria-label={t('dashboard.viewModeGroup')}>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center p-2 transition-colors duration-200 ${viewMode === 'list' ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400' : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-600'}`}
                    title={t('dashboard.listView')}
                    aria-pressed={viewMode === 'list'}
                  >
                    <List className="w-5 h-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center p-2 border-l border-slate-300 dark:border-slate-600 transition-colors duration-200 ${viewMode === 'grid' ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400' : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-600'}`}
                    title={t('dashboard.gridView')}
                    aria-pressed={viewMode === 'grid'}
                  >
                    <LayoutGrid className="w-5 h-5" aria-hidden />
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={selectAll}
                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                {selectedIds.size === cards.length ? t('deck.deselectAll') : t('deck.selectAll')}
              </button>
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
                  onDelete={() => handleDeleteCard(card.id)}
                  isDeleting={deleteCardMutation.isPending && deleteCardMutation.variables?.cardId === card.id}
                />
              ))}
            </div>

            {/* Spacer when bulk bar is visible */}
            {selectedIds.size > 0 && <div className="h-20" aria-hidden />}
          </>
        )}

        {/* Bulk action bar — fixed bottom with slide-up */}
        {selectedIds.size > 0 && createPortal(
          <div className="fixed bottom-0 left-0 right-0 z-[900] animate-slide-up">
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)] border-t border-primary-200 dark:border-primary-800 px-4 py-3">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full bg-primary-600 text-white text-xs font-bold">
                    {selectedIds.size}
                  </span>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t('deck.selected')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBulkAIEdit(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" aria-hidden />
                    {t('ai.bulkEdit')}
                  </button>
                  <button
                    type="button"
                    onClick={handleBulkDelete}
                    disabled={deleteCardMutation.isPending}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 transition-colors disabled:opacity-60"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden />
                    {t('common.delete')}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

        {/* Edit Deck Modal */}
        {showEditDeckModal && createPortal(
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center min-h-screen p-4 bg-black/50 dark:bg-black/60 backdrop-blur-sm"
            onClick={() => setShowEditDeckModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-deck-title"
          >
            <div
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-elevation-md border border-slate-100 dark:border-slate-700/50 max-w-md w-full p-6 animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <h2 id="edit-deck-title" className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {t('deck.editDeckModal')}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowEditDeckModal(false)}
                  className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  aria-label={t('common.close')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-deck-title-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('deck.title')}
                  </label>
                  <input
                    id="edit-deck-title-input"
                    type="text"
                    value={editDeckTitle}
                    onChange={(e) => setEditDeckTitle(e.target.value)}
                    maxLength={255}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder={t('deck.deckTitlePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="edit-deck-tags-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('deck.tagsLabel')}
                  </label>
                  <input
                    id="edit-deck-tags-input"
                    type="text"
                    value={editDeckTags}
                    onChange={(e) => setEditDeckTags(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder={t('deck.tagsPlaceholder')}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditDeckModal(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDeck}
                    disabled={updateDeckMutation.isPending || !editDeckTitle.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-60 transition-colors"
                  >
                    {updateDeckMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('deck.saving')}
                      </>
                    ) : (
                      t('deck.saveChanges')
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

        {/* Edit Card Modal */}
        {editingCard && createPortal(
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center min-h-screen p-4 bg-black/50 dark:bg-black/60 backdrop-blur-sm"
            onClick={() => setEditingCard(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-card-title"
          >
            <div
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-elevation-md border border-slate-100 dark:border-slate-700/50 max-w-2xl w-full p-6 animate-slide-up max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <h2 id="edit-card-title" className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {t('deck.editCardModal')}
                </h2>
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  aria-label={t('common.close')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    {t('deck.front')}
                  </label>
                  <RichTextEditor
                    content={editCardFront}
                    onChange={setEditCardFront}
                    placeholder={t('deck.enterFront')}
                    maxLength={MAX_RICH_TEXT_CHARS}
                    compact
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    <Check className="w-4 h-4 text-green-600" />
                    {t('deck.back')}
                  </label>
                  <RichTextEditor
                    content={editCardBack}
                    onChange={setEditCardBack}
                    placeholder={t('deck.enterBack')}
                    maxLength={MAX_RICH_TEXT_CHARS}
                    compact
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingCard(null)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCard}
                    disabled={updateCardMutation.isPending}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-60 transition-colors"
                  >
                    {updateCardMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('deck.saving')}
                      </>
                    ) : (
                      t('deck.saveChanges')
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
      </div>

      {/* Bulk AI Edit Modal */}
      <BulkAIEditModal
        isOpen={showBulkAIEdit}
        onClose={() => setShowBulkAIEdit(false)}
        selectedCards={cards.filter((c) => selectedIds.has(c.id))}
        onApplyEdits={handleApplyBulkEdits}
      />
    </main>
  )
}
