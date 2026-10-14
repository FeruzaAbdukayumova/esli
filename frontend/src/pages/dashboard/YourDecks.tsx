import { useState, useEffect, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  X,
  Plus,
  Search,
  LayoutGrid,
  List,
  Type,
  Globe,
  FileSpreadsheet,
  Upload,
} from 'lucide-react'
import { useDecks, useCreateDeck, useDeleteDeck } from '@/features/decks/hooks'
import { useDashboardStats } from '@/features/stats/statsHooks'
import type { DeckProgress } from '@/features/stats/types'
import { DeckCard } from './components/DeckCard'
import { Skeleton } from '@/shared/ui/Skeleton'
import { CreateDeckModal, type CreateMethod } from './components/CreateDeckModal'
import { DeleteDeckModal } from './components/DeleteDeckModal'
import { AIGenerateDeckModal } from './components/AIGenerateDeckModal'
import type { ViewMode } from './components/DeckCard'

// Sticker palette (DESIGN.md): sun, sky, grass, bubblegum, lilac
const CONFETTI_COLORS = ['#FFC93C', '#8FD3FF', '#44D07B', '#FFB8CC', '#CDBBFF'] as const

function ConfettiOverlay() {
  const pieces = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      left: 10 + (i * 17) % 80,
      top: 15 + (i * 11) % 70,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: (i % 10) * 0.05,
    }))
  }, [])
  return (
    <div className="fixed inset-0 z-[900] pointer-events-none overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute w-2 h-2 rounded-sm animate-confetti-piece"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

type SortBy = 'date' | 'name'

interface YourDecksProps {
  isGuest: boolean
  limit?: number
  categoryFilter?: string | null
}

export function YourDecks({ isGuest, limit, categoryFilter }: YourDecksProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: decks = [], isLoading } = useDecks()
  const { data: stats } = useDashboardStats()
  const progressByDeck = useMemo(() => {
    const map = new Map<string, DeckProgress>()
    for (const p of stats?.deckProgress ?? []) map.set(p.deckId, p)
    return map
  }, [stats])
  const createDeckMutation = useCreateDeck()
  const deleteDeckMutation = useDeleteDeck()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createInitialMethod, setCreateInitialMethod] = useState<CreateMethod | undefined>(undefined)
  const [deckToDelete, setDeckToDelete] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortBy>('date')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showConfetti, setShowConfetti] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const [guestWarningDismissed, setGuestWarningDismissed] = useState(
    () => localStorage.getItem('flashcards-guest-warning-dismissed') === '1'
  )

  const filteredAndSortedDecks = useMemo(() => {
    let list = [...decks]
    if (categoryFilter) {
      const cat = categoryFilter.toLowerCase()
      list = list.filter((d) => d.categoryTags.some((t) => t.toLowerCase() === cat))
    }
    if (!limit && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      list = list.filter((d) => d.title.toLowerCase().includes(q) || d.categoryTags.some((t) => t.toLowerCase().includes(q)))
    }
    if (!limit && sortBy === 'name') {
      list.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }))
    } else {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
    if (limit) {
      list = list.slice(0, limit)
    }
    return list
  }, [decks, categoryFilter, searchQuery, sortBy, limit])

  // Keyboard shortcut: N to create deck
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'n' && !e.ctrlKey && !e.metaKey && !showCreateModal) {
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return
        e.preventDefault()
        setShowCreateModal(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showCreateModal])

  const openCreateModal = (method?: CreateMethod) => {
    setCreateInitialMethod(method)
    setShowCreateModal(true)
  }

  const handleCreateDeck = async (title: string, categoryTags: string[], method: CreateMethod) => {
    if (method === 'ai') {
      setShowCreateModal(false)
      setShowAIModal(true)
      return
    }

    try {
      const isFirstDeck = decks.length === 0
      const deck = await createDeckMutation.mutateAsync({ title, categoryTags })
      setShowCreateModal(false)

      // Navigate to deck page with the appropriate add mode
      const addMode = method === 'file' ? 'file' : method === 'bulk' ? 'bulk' : ''
      const url = addMode ? `/deck/${deck.id}?addMode=${addMode}` : `/deck/${deck.id}`

      if (isFirstDeck) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 2000)
        setTimeout(() => navigate(url), 700)
      } else {
        navigate(url)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.failedToCreateDeck'))
    }
  }

  const handleDeleteDeckClick = (e: React.MouseEvent, deckId: string) => {
    e.stopPropagation()
    setDeckToDelete(deckId)
  }

  const handleDeleteConfirm = async () => {
    if (!deckToDelete) return
    try {
      await deleteDeckMutation.mutateAsync(deckToDelete)
      setDeckToDelete(null)
      toast.success(t('toast.deckDeleted'))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.failedToDeleteDeck'))
      setDeckToDelete(null)
    }
  }

  const handleStudyDeck = (e: React.MouseEvent, deckId: string) => {
    e.stopPropagation()
    navigate(`/study/${deckId}`)
  }

  const handleEditDeck = (e: React.MouseEvent, deckId: string) => {
    e.stopPropagation()
    navigate(`/deck/${deckId}`)
  }

  return (
    <section>
      {showConfetti && <ConfettiOverlay />}

      {/* Header */}
      <div className="flex flex-col gap-4 mb-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-lg text-fg">{t('dashboard.yourDecks')}</h2>
            <p className="mt-1 text-sm text-muted">
              {isLoading ? t('common.loading') : decks.length === 0 ? t('dashboard.noDecksYet') : t('dashboard.deckCount', { count: limit ? decks.length : filteredAndSortedDecks.length })}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="btn-quiet min-h-[44px] px-4 text-sm"
              aria-label={t('dashboard.createNewDeckKeyboard')}
              title={t('dashboard.createNewDeckPress')}
            >
              <Plus className="w-4 h-4" aria-hidden />
              {t('desk.newDeck', 'New deck')}
            </button>
          </div>
        </div>
        {!limit && (
          <p className="text-xs text-muted hidden lg:block">{t('dashboard.pressNToCreate')}</p>
        )}

        {/* Search and toolbar */}
        {!limit && !isLoading && decks.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" aria-hidden />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('dashboard.searchDecks')}
                className="field pl-10"
                aria-label={t('dashboard.searchByTitleOrTag')}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-decks" className="text-sm font-semibold text-muted shrink-0">{t('dashboard.sortBy')}</label>
              <select
                id="sort-decks"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="field w-auto min-w-0 flex-1 sm:flex-none pr-8 cursor-pointer"
                aria-label={t('dashboard.sortBy')}
              >
                <option value="date">{t('dashboard.dateCreated')}</option>
                <option value="name">{t('dashboard.name')}</option>
              </select>
              <div className="flex shrink-0 gap-1 rounded-[16px] border-2 border-edge/25 p-1" role="group" aria-label={t('dashboard.viewModeGroup')}>
                {([
                  ['grid', LayoutGrid, t('dashboard.gridView')],
                  ['list', List, t('dashboard.listView')],
                ] as const).map(([mode, Icon, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setViewMode(mode)}
                    className={`min-w-[40px] min-h-[38px] flex items-center justify-center rounded-[12px] border-2 transition-transform duration-150 active:scale-[0.95] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky ${
                      viewMode === mode
                        ? 'border-ink bg-sky text-ink shadow-sticker-sm'
                        : 'border-transparent text-muted hover:text-fg hover:bg-fg/[0.07]'
                    }`}
                    aria-label={label}
                    title={label}
                    aria-pressed={viewMode === mode}
                  >
                    <Icon className="w-5 h-5" aria-hidden />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Guest Mode Info */}
      {isGuest && !guestWarningDismissed && (
        <div className="mb-5 flex items-start gap-2">
          <p className="flex-1 min-w-0 text-sm text-muted">
            <span className="font-semibold text-fg">{t('dashboard.guestModeInfo')}</span>{' '}
            {t('dashboard.guestInfoMessage')}{' '}
            <Link to="/register" className="font-semibold text-fg underline decoration-brand underline-offset-4 hover:decoration-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              {t('dashboard.createFreeAccount')}
            </Link>
          </p>
          <button
            type="button"
            onClick={() => {
              setGuestWarningDismissed(true)
              localStorage.setItem('flashcards-guest-warning-dismissed', '1')
            }}
            className="shrink-0 -my-1 -mr-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-md text-muted hover:text-fg hover:bg-fg/[0.07] active:scale-[0.95] transition-[transform,color,background-color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label={t('dashboard.dismissGuestWarning')}
          >
            <X className="w-4 h-4" aria-hidden />
          </button>
        </div>
      )}

      {/* Create deck modal */}
      <CreateDeckModal
        isOpen={showCreateModal}
        isPending={createDeckMutation.isPending}
        initialMethod={createInitialMethod}
        onClose={() => { setShowCreateModal(false); setCreateInitialMethod(undefined) }}
        onSubmit={handleCreateDeck}
      />

      {/* Deck list */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-[22px] bg-surface p-5 min-h-[148px]" aria-hidden>
              <Skeleton className="h-6 w-3/4 mb-3" />
              <div className="flex gap-2 mb-3">
                <Skeleton className="h-5 rounded-full w-16" />
                <Skeleton className="h-5 rounded-full w-20" />
              </div>
              <div className="flex gap-3 mb-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-16" />
                <Skeleton className="h-9 w-14" />
              </div>
            </div>
          ))}
        </div>
      ) : decks.length === 0 ? (
        <div className="py-6">
          {/* The main way in: a lilac sticker, same as the create panel */}
          <button
            type="button"
            onClick={() => setShowAIModal(true)}
            className="sticker relative block w-full -rotate-[0.6deg] bg-lilac p-5 text-left transition-transform duration-150 ease-out hover:-translate-y-1 hover:rotate-0 active:translate-y-0 active:scale-[0.99] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:p-7"
          >
            <span className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border-2 border-ink bg-white">
                <Type className="h-6 w-6" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-xl leading-tight sm:text-2xl">{t('create.title', 'Make a deck from anything')}</span>
                <span className="mt-1.5 block text-[15px] font-medium text-ink/75">{t('dashboard.getStarted.generateAIDesc')}</span>
              </span>
            </span>
          </button>

          <p className="mt-8 mb-3 text-sm font-semibold text-muted">{t('dashboard.getStarted.subtitle')}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => openCreateModal('empty')}
              className="flex items-start gap-3 rounded-[18px] border-[2.5px] border-ink bg-white p-4 text-left text-ink shadow-sticker-sm transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:-rotate-[0.6deg] active:translate-y-0 active:rotate-0 active:scale-[0.98] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border-2 border-ink bg-sky">
                <Plus className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-extrabold leading-snug">{t('dashboard.getStarted.createManually')}</span>
                <span className="mt-1 block text-sm leading-snug text-ink/65">{t('dashboard.getStarted.createManuallyDesc')}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => openCreateModal('file')}
              className="flex items-start gap-3 rounded-[18px] border-[2.5px] border-ink bg-white p-4 text-left text-ink shadow-sticker-sm transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:-rotate-[0.6deg] active:translate-y-0 active:rotate-0 active:scale-[0.98] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border-2 border-ink bg-mint">
                <FileSpreadsheet className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-extrabold leading-snug">{t('dashboard.importFile')}</span>
                <span className="mt-1 block text-sm leading-snug text-ink/65">{t('dashboard.importFileDesc')}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => openCreateModal('bulk')}
              className="flex items-start gap-3 rounded-[18px] border-[2.5px] border-ink bg-white p-4 text-left text-ink shadow-sticker-sm transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:-rotate-[0.6deg] active:translate-y-0 active:rotate-0 active:scale-[0.98] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border-2 border-ink bg-bubblegum">
                <Upload className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-extrabold leading-snug">{t('dashboard.bulkImport')}</span>
                <span className="mt-1 block text-sm leading-snug text-ink/65">{t('dashboard.bulkImportDesc')}</span>
              </span>
            </button>
            <Link
              to="/browse"
              className="flex items-start gap-3 rounded-[18px] border-[2.5px] border-ink bg-white p-4 text-left text-ink shadow-sticker-sm transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:-rotate-[0.6deg] active:translate-y-0 active:rotate-0 active:scale-[0.98] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border-2 border-ink bg-coral">
                <Globe className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-extrabold leading-snug">{t('dashboard.getStarted.browseShared')}</span>
                <span className="mt-1 block text-sm leading-snug text-ink/65">{t('dashboard.getStarted.browseSharedDesc')}</span>
              </span>
            </Link>
          </div>
        </div>
      ) : filteredAndSortedDecks.length === 0 ? (
        <div className="py-12 px-4 text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 -rotate-6 items-center justify-center rounded-[16px] border-[2.5px] border-ink bg-white text-ink shadow-sticker-sm">
            <Search className="h-6 w-6" aria-hidden />
          </span>
          <p className="text-base font-bold text-fg mb-1">{t('dashboard.noDecksInCategory')}</p>
          <p className="text-sm text-muted">{searchQuery ? t('dashboard.tryDifferentSearch') : t('dashboard.tryDifferentCategory')}</p>
        </div>
      ) : (
        <div className={!limit && viewMode === 'list' ? 'flex flex-col gap-3' : `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ${limit ? '' : 'xl:grid-cols-4'}`}>
          {filteredAndSortedDecks.map((deck, index) => (
            <div key={deck.id}>
              <DeckCard
                deck={deck}
                index={index}
                onStudy={handleStudyDeck}
                onEdit={handleEditDeck}
                onDelete={handleDeleteDeckClick}
                isDeleting={deleteDeckMutation.isPending && deckToDelete === deck.id}
                viewMode={viewMode}
                progress={progressByDeck.get(deck.id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Bottom "View all" link when limited */}
      {limit && decks.length > limit && (
        <div className="pt-4">
          <Link to="/decks" className="inline-flex items-center gap-2 text-sm font-medium text-fg underline decoration-brand/50 underline-offset-4 hover:decoration-brand rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
            {t('dashboard.viewAllDecks', { count: decks.length })}
          </Link>
        </div>
      )}

      {/* Delete confirmation modal */}
      <DeleteDeckModal
        isOpen={!!deckToDelete}
        isPending={deleteDeckMutation.isPending}
        onClose={() => setDeckToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* AI Generate Deck modal */}
      <AIGenerateDeckModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
      />
    </section>
  )
}
