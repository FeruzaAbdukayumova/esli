import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Globe, ChevronRight, Layers, Copy, User, Loader2, AlertTriangle } from 'lucide-react'
import { usePublicDecks, useCopyDeck } from '@/features/decks/publicHooks'
import type { PublicDeck } from '@/features/decks/types'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

const CARD_GRADIENTS = [
  'from-primary-600 to-primary-500',
  'from-emerald-600 to-emerald-500',
  'from-amber-500 to-orange-500',
  'from-rose-600 to-rose-500',
  'from-violet-600 to-violet-500',
  'from-cyan-600 to-cyan-500',
] as const

function parseTags(tagsString: string): string[] {
  if (!tagsString) return []
  return tagsString.split(',').map(t => t.trim()).filter(Boolean)
}

interface FeaturedCardProps {
  deck: PublicDeck
  index: number
  onCopy: (deckId: string) => void
  isCopying: boolean
}

function FeaturedCard({ deck, index, onCopy, isCopying }: FeaturedCardProps) {
  const { t } = useTranslation()
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length]
  const tags = parseTags(deck.categoryTags)

  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-200 group">
      {/* Gradient header */}
      <Link to={`/browse/${deck.id}`} className={`block bg-gradient-to-r ${gradient} px-4 py-3`}>
        <h3 className="text-sm font-bold text-white truncate group-hover:underline decoration-white/40 underline-offset-2">{deck.title}</h3>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="text-[10px] font-medium rounded-full px-2 py-0.5 bg-white/20 text-white">{tag}</span>
            ))}
            {tags.length > 2 && (
              <span className="text-[10px] font-medium rounded-full px-2 py-0.5 bg-white/15 text-white/80" title={tags.slice(2).join(', ')}>+{tags.length - 2} more</span>
            )}
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex-1 flex flex-col px-3 py-2.5">
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
          <span className="flex items-center gap-1" title={t('dashboard.cardCount')}>
            <Layers className="w-3.5 h-3.5 shrink-0" aria-hidden />
            {deck.cardCount} {t('dashboard.cards')}
          </span>
          <span className="flex items-center gap-1" title={t('dashboard.copies')}>
            <Copy className="w-3.5 h-3.5 shrink-0" aria-hidden />
            {deck.copyCount}
          </span>
          <span className="flex items-center gap-1 ml-auto" title={deck.owner.username || deck.owner.email}>
            <User className="w-3 h-3 shrink-0" aria-hidden />
            <span className="truncate max-w-[100px]">{deck.owner.username || t('dashboard.esliTeam')}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => onCopy(deck.id)}
          disabled={isCopying}
          className="mt-auto inline-flex items-center justify-center gap-1.5 min-h-[32px] px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          title={t('dashboard.copyToLibrary')}
        >
          {isCopying ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              {t('dashboard.copyAction')}
            </>
          )}
        </button>
      </div>
    </div>
  )
}

interface SharedDecksSectionProps {
  categoryFilter?: string | null
}

export function SharedDecksSection({ categoryFilter }: SharedDecksSectionProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data, isLoading, error } = usePublicDecks({
    perPage: 3,
    sortBy: 'popular',
    ...(categoryFilter ? { category: categoryFilter } : {}),
  })
  const copyDeckMutation = useCopyDeck()
  const [copyingDeckId, setCopyingDeckId] = useState<string | null>(null)

  const handleCopy = async (deckId: string) => {
    setCopyingDeckId(deckId)
    try {
      const result = await copyDeckMutation.mutateAsync(deckId)
      toast.success(t('toast.deckCopied'))
      setTimeout(() => {
        navigate(`/deck/${result.id}`)
      }, 1500)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.failedToCopyDeck'))
    } finally {
      setCopyingDeckId(null)
    }
  }

  if (isLoading) {
    return (
      <section className="animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            {t('dashboard.communityDecks')}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700" aria-hidden>
              <div className="h-14 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] animate-shimmer" />
              <div className="p-3">
                <div className="h-3 rounded w-1/2 mb-2 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] animate-shimmer" />
                <div className="h-8 rounded-lg w-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] animate-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const sectionHeader = (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <Globe className="w-4 h-4 text-primary-600 dark:text-primary-400" />
        {t('dashboard.communityDecks')}
      </h2>
      <Link
        to="/browse"
        className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
      >
        {t('dashboard.browseAll')}
        <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  )

  if (error) {
    return (
      <section className="animate-fade-in">
        {sectionHeader}
        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {t('dashboard.failedToLoadCommunityDecks')}
        </div>
      </section>
    )
  }

  if (!data || data.decks.length === 0) {
    return (
      <section className="animate-fade-in">
        {sectionHeader}
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('dashboard.noCommunityDecksYet')}. {t('dashboard.noCommunityDecksSubtext')}
        </p>
      </section>
    )
  }

  return (
    <section className="animate-fade-in">
      {/* Header */}
      {sectionHeader}

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3"
      >
        {data.decks.map((deck, index) => (
          <motion.div key={deck.id} variants={itemVariants}>
            <FeaturedCard
              deck={deck}
              index={index}
              onCopy={handleCopy}
              isCopying={copyingDeckId === deck.id}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
