import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  AlertTriangle,
  X,
  Plus,
  Search,
  LayoutGrid,
  List,
  FolderOpen,
  ArrowRight,
  Sparkles,
  Globe,
  FileSpreadsheet,
  Upload,
} from 'lucide-react'
import { useDecks, useCreateDeck, useDeleteDeck } from '@/features/decks/hooks'
import { DeckCard } from './components/DeckCard'
import { CreateDeckModal, type CreateMethod } from './components/CreateDeckModal'
import { DeleteDeckModal } from './components/DeleteDeckModal'
import { AIGenerateDeckModal } from './components/AIGenerateDeckModal'
import type { ViewMode } from './components/DeckCard'

const CONFETTI_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'] as const

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
  const hasCreatedDeckBeforeRef = useRef(false)
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
      const deck = await createDeckMutation.mutateAsync({ title, categoryTags })
      const isFirstDeck = !hasCreatedDeckBeforeRef.current
      hasCreatedDeckBeforeRef.current = true
      setShowCreateModal(false)

      // Navigate to deck page with the appropriate add mode
      const addMode = method === 'file' ? 'file' : method === 'bulk' ? 'bulk' : ''
      const url = addMode ? `/deck/${deck.id}?addMode=${addMode}` : `/deck/${deck.id}`

      if (isFirstDeck) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 2500)
        setTimeout(() => navigate(url), 1200)
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
    <section className={`animate-fade-in${limit ? ' flex-1 flex flex-col' : ''}`}>
      {showConfetti && <ConfettiOverlay />}

      {/* Mobile FAB */}
      <button
        type="button"
        onClick={() => setShowCreateModal(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 min-w-[56px] min-h-[56px] flex items-center justify-center rounded-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-500/50"
        aria-label={t('dashboard.createNewDeck')}
        title={t('dashboard.createNewDeck')}
      >
        <Plus className="w-7 h-7" aria-hidden />
      </button>

      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{t('dashboard.yourDecks')}</h2>
            {!limit && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {isLoading ? t('common.loading') : filteredAndSortedDecks.length === 0 && !searchQuery ? t('dashboard.noDecksYet') : t('dashboard.deckCount', { count: filteredAndSortedDecks.length })}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              aria-label={t('dashboard.createNewDeckKeyboard')}
              title={t('dashboard.createNewDeckPress')}
            >
              <Plus className="w-4 h-4" />
              {t('dashboard.createDeck')}
            </button>
          </div>
        </div>
        {!limit && (
          <p className="text-xs text-slate-500 dark:text-slate-400 hidden lg:block">{t('dashboard.pressNToCreate')}</p>
        )}

        {/* Search and toolbar */}
        {!limit && !isLoading && decks.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" aria-hidden />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('dashboard.searchDecks')}
                className="w-full pl-9 pr-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                aria-label={t('dashboard.searchByTitleOrTag')}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-decks" className="text-sm text-slate-600 dark:text-slate-400 shrink-0">{t('dashboard.sortBy')}</label>
              <select
                id="sort-decks"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="min-h-[44px] px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-700 transition-all duration-200"
                aria-label={t('dashboard.sortBy')}
              >
                <option value="date">{t('dashboard.dateCreated')}</option>
                <option value="name">{t('dashboard.name')}</option>
              </select>
              <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden" role="group" aria-label={t('dashboard.viewModeGroup')}>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`min-w-[44px] min-h-[44px] flex items-center justify-center p-2 transition-all duration-200 ${viewMode === 'grid' ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400' : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-600'}`}
                  aria-label={t('dashboard.gridView')}
                  title={t('dashboard.gridView')}
                  aria-pressed={viewMode === 'grid'}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`min-w-[44px] min-h-[44px] flex items-center justify-center p-2 border-l border-slate-300 dark:border-slate-600 transition-all duration-200 ${viewMode === 'list' ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400' : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-600'}`}
                  aria-label={t('dashboard.listView')}
                  title={t('dashboard.listView')}
                  aria-pressed={viewMode === 'list'}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Guest Mode Warning */}
      {isGuest && !guestWarningDismissed && (
        <div className="mb-6 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-6 transition-all duration-200 animate-fade-in">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" aria-hidden />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">{t('dashboard.guestMode')}</h3>
              <p className="text-sm text-amber-800 dark:text-amber-300 mb-4">
                {t('dashboard.guestWarning')}
              </p>
              <div className="flex flex-wrap gap-2">
                <Link to="/register" className="inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800">{t('dashboard.createAccount')}</Link>
                <Link to="/login" className="inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 rounded-lg bg-white dark:bg-slate-700 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800">{t('nav.login')}</Link>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setGuestWarningDismissed(true)
                localStorage.setItem('flashcards-guest-warning-dismissed', '1')
              }}
              className="shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-amber-500 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label={t('dashboard.dismissGuestWarning')}
            >
              <X className="w-5 h-5" aria-hidden />
            </button>
          </div>
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
        <div className={`grid grid-cols-1 ${limit ? 'sm:grid-cols-2 gap-4 flex-1' : 'sm:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-100 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 p-6 animate-pulse" aria-hidden>
              <div className="h-6 bg-slate-200 dark:bg-slate-600 rounded w-3/4 mb-3" />
              <div className="flex gap-2 mb-3"><div className="h-5 bg-slate-200 dark:bg-slate-600 rounded-full w-16" /><div className="h-5 bg-slate-200 dark:bg-slate-600 rounded-full w-20" /></div>
              <div className="flex gap-3 mb-4"><div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-20" /><div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-24" /></div>
              <div className="flex gap-2"><div className="h-8 bg-slate-200 dark:bg-slate-600 rounded-lg w-16" /><div className="h-8 bg-slate-200 dark:bg-slate-600 rounded-lg w-14" /></div>
            </div>
          ))}
        </div>
      ) : decks.length === 0 ? (
        <div className="py-10 px-4">
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300 text-center mb-2">{t('dashboard.getStarted.title')}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-8 max-w-md mx-auto">{t('dashboard.getStarted.subtitle')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {/* Create Manually */}
            <button
              type="button"
              onClick={() => openCreateModal('empty')}
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all duration-200 text-center group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-primary-600 dark:text-primary-400" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{t('dashboard.getStarted.createManually')}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('dashboard.getStarted.createManuallyDesc')}</p>
              </div>
            </button>

            {/* Generate with AI */}
            <button
              type="button"
              onClick={() => setShowAIModal(true)}
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-md transition-all duration-200 text-center group focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-violet-600 dark:text-violet-400" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{t('dashboard.getStarted.generateAI')}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('dashboard.getStarted.generateAIDesc')}</p>
              </div>
            </button>

            {/* Import from File */}
            <button
              type="button"
              onClick={() => openCreateModal('file')}
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all duration-200 text-center group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileSpreadsheet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{t('dashboard.importFile')}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('dashboard.importFileDesc')}</p>
              </div>
            </button>

            {/* Bulk Import */}
            <button
              type="button"
              onClick={() => openCreateModal('bulk')}
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-md transition-all duration-200 text-center group focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-amber-600 dark:text-amber-400" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{t('dashboard.bulkImport')}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('dashboard.bulkImportDesc')}</p>
              </div>
            </button>

            {/* Browse Shared Decks */}
            <Link
              to="/browse"
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-md transition-all duration-200 text-center group focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 col-span-2 sm:col-span-1"
            >
              <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-sky-600 dark:text-sky-400" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{t('dashboard.getStarted.browseShared')}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('dashboard.getStarted.browseSharedDesc')}</p>
              </div>
            </Link>
          </div>
        </div>
      ) : filteredAndSortedDecks.length === 0 ? (
        <div className="text-center py-12 px-4">
          <FolderOpen className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-3" aria-hidden />
          <p className="text-base font-medium text-slate-600 dark:text-slate-400">{t('dashboard.noDecksInCategory')}</p>
        </div>
      ) : (
        <div className={!limit && viewMode === 'list' ? 'flex flex-col gap-4' : `grid grid-cols-1 ${limit ? 'sm:grid-cols-2 gap-4 flex-1' : 'sm:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
          {filteredAndSortedDecks.map((deck, index) => (
            <DeckCard
              key={deck.id}
              deck={deck}
              index={index}
              onStudy={handleStudyDeck}
              onEdit={handleEditDeck}
              onDelete={handleDeleteDeckClick}
              isDeleting={deleteDeckMutation.isPending && deckToDelete === deck.id}
              viewMode={viewMode}
              animationDelay={index * 80}
            />
          ))}
        </div>
      )}

      {/* Bottom "View all" link when limited */}
      {limit && decks.length > limit && (
        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700/50">
          <Link to="/decks" className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors">
            {t('dashboard.viewAllDecks', { count: decks.length })} <ArrowRight className="w-4 h-4" />
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
