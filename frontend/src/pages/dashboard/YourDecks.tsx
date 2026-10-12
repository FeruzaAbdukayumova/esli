import { useState, useEffect, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
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
  User,
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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

const CONFETTI_COLORS = ['rgb(var(--color-primary-500))', '#10b981', '#f59e0b', '#ec4899', 'rgb(var(--color-primary-300))'] as const

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
    <section className={`animate-fade-in${limit ? ' flex-1 flex flex-col' : ''}`}>
      {showConfetti && <ConfettiOverlay />}

      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{t('dashboard.yourDecks')}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {isLoading ? t('common.loading') : decks.length === 0 ? t('dashboard.noDecksYet') : t('dashboard.deckCount', { count: limit ? decks.length : filteredAndSortedDecks.length })}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
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
                className="w-full pl-9 pr-4 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                aria-label={t('dashboard.searchByTitleOrTag')}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-decks" className="text-sm text-slate-600 dark:text-slate-400 shrink-0">{t('dashboard.sortBy')}</label>
              <select
                id="sort-decks"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="min-h-[44px] px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-700 transition-colors duration-200"
                aria-label={t('dashboard.sortBy')}
              >
                <option value="date">{t('dashboard.dateCreated')}</option>
                <option value="name">{t('dashboard.name')}</option>
              </select>
              <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden" role="group" aria-label={t('dashboard.viewModeGroup')}>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`min-w-[44px] min-h-[44px] flex items-center justify-center p-2 transition-colors duration-200 ${viewMode === 'grid' ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400' : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-600'}`}
                  aria-label={t('dashboard.gridView')}
                  title={t('dashboard.gridView')}
                  aria-pressed={viewMode === 'grid'}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`min-w-[44px] min-h-[44px] flex items-center justify-center p-2 border-l border-slate-300 dark:border-slate-600 transition-colors duration-200 ${viewMode === 'list' ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400' : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-600'}`}
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

      {/* Guest Mode Info */}
      {isGuest && !guestWarningDismissed && (
        <div className="mb-6 rounded-xl border border-primary-200 dark:border-primary-800/50 bg-primary-50 dark:bg-primary-900/10 p-5 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mt-0.5">
              <User className="w-4 h-4 text-primary-600 dark:text-primary-400" aria-hidden />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">{t('dashboard.guestModeInfo')}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                {t('dashboard.guestInfoMessage')}
              </p>
              <Link to="/register" className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800">{t('dashboard.createFreeAccount')}</Link>
            </div>
            <button
              type="button"
              onClick={() => {
                setGuestWarningDismissed(true)
                localStorage.setItem('flashcards-guest-warning-dismissed', '1')
              }}
              className="shrink-0 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
              aria-label={t('dashboard.dismissGuestWarning')}
            >
              <X className="w-4 h-4" aria-hidden />
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
            <div key={i} className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 border-t-4 border-t-slate-200 dark:border-t-slate-600" aria-hidden>
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
        <div className="py-12 px-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <FolderOpen className="w-10 h-10 text-primary-500 dark:text-primary-400" />
              </motion.div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary-400"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
            </div>
          </div>
          <p className="text-xl font-bold text-slate-800 dark:text-slate-100 text-center mb-2 tracking-tight">{t('dashboard.getStarted.title')}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-8 max-w-md mx-auto">{t('dashboard.getStarted.subtitle')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {/* Create Manually */}
            <button
              type="button"
              onClick={() => openCreateModal('empty')}
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-elevation-md transition-[box-shadow,border-color] duration-200 text-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
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
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-elevation-md transition-[box-shadow,border-color] duration-200 text-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-primary-600 dark:text-primary-400" aria-hidden />
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
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-elevation-md transition-[box-shadow,border-color] duration-200 text-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
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
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-elevation-md transition-[box-shadow,border-color] duration-200 text-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
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
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-elevation-md transition-[box-shadow,border-color] duration-200 text-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 col-span-2 sm:col-span-1"
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
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-8 h-8 text-slate-400 dark:text-slate-500" aria-hidden />
          </div>
          <p className="text-base font-medium text-slate-600 dark:text-slate-400 mb-1">{t('dashboard.noDecksInCategory')}</p>
          <p className="text-sm text-slate-400 dark:text-slate-500">{searchQuery ? t('dashboard.tryDifferentSearch') : t('dashboard.tryDifferentCategory')}</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={!limit && viewMode === 'list' ? 'flex flex-col gap-4' : `grid grid-cols-1 ${limit ? 'sm:grid-cols-2 gap-4 flex-1' : 'sm:grid-cols-2 lg:grid-cols-3 gap-6'}`}
        >
          {filteredAndSortedDecks.map((deck, index) => (
            <motion.div key={deck.id} variants={itemVariants}>
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
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Bottom "View all" link when limited */}
      {limit && decks.length > limit && (
        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700/50">
          <Link to="/decks" className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
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
