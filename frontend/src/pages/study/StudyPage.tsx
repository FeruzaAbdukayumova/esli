import { useState, useMemo, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, XCircle, Globe, RotateCcw, ThumbsDown, ThumbsUp, Zap, Shuffle, Keyboard, X, Trophy, Pencil, Layers } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useDeck, useCards, useReviewCard } from '@/features/decks/hooks'
import { getDueCardsWithLimit, getEarliestNextReview, getLocalCardIntervals, recordNewCardIntroduced, RESPONSE_INFO } from '@/features/study/scheduler'
import { RecallResponse, CardIntervals } from '@/features/decks/types'
import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { translationApi } from '@/features/decks/translationApi'
import { apiDeckRepo } from '@/features/decks/repo/apiRepo'
import { guestStorage } from '@/shared/lib/guestStorage'
import { SUPPORTED_LANGUAGES } from '@/shared/i18n/config'
import { RichTextDisplay } from '@/shared/ui/RichTextDisplay'
import { stripHtml } from '@/shared/lib/htmlUtils'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { trackEvent } from '@/shared/lib/analytics'

const FALLBACK_CONFETTI_COLORS = ['#c4b5fd', '#a78bfa', '#7c3aed', '#6d28d9', '#5b21b6'] as const

/** Derive confetti colors from the active theme's primary CSS variables. */
function getConfettiColors(): string[] {
  const styles = getComputedStyle(document.documentElement)
  return ['300', '400', '500', '600', '700'].map((shade, i) => {
    const value = styles.getPropertyValue(`--color-primary-${shade}`).trim()
    return value ? `rgb(${value})` : FALLBACK_CONFETTI_COLORS[i]
  })
}

function ConfettiOverlay() {
  const pieces = useMemo(() => {
    const colors = getConfettiColors()
    return [...Array(40)].map((_, i) => ({
      id: i,
      left: 10 + (i * 17) % 80,
      top: 15 + (i * 11) % 70,
      color: colors[i % colors.length],
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

function formatRelativeTime(dateStr: string, t: (key: string, opts?: Record<string, unknown>) => string): string {
  const now = new Date()
  const target = new Date(dateStr)
  const diffMs = target.getTime() - now.getTime()
  if (diffMs < 0) return t('study.reviewNow')
  const diffMinutes = Math.round(diffMs / 60000)
  if (diffMinutes < 60) return t('study.reviewInMinutes', { count: Math.max(1, diffMinutes) })
  const diffHours = Math.round(diffMs / 3600000)
  if (diffHours < 24) return t('study.reviewInHours', { count: diffHours })
  const diffDays = Math.round(diffMs / 86400000)
  return t('study.reviewInDays', { count: diffDays })
}

const STAT_COLORS: Record<string, { bg: string; bar: string }> = {
  again: { bg: 'bg-red-100 dark:bg-red-900/30', bar: 'bg-red-500' },
  hard: { bg: 'bg-orange-100 dark:bg-orange-900/30', bar: 'bg-orange-500' },
  good: { bg: 'bg-primary-100 dark:bg-primary-900/30', bar: 'bg-primary-500' },
  easy: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', bar: 'bg-emerald-500' },
}

function getTextSizeClass(text: string): string {
  const len = stripHtml(text).length
  if (len <= 50) return 'text-2xl'
  if (len <= 150) return 'text-xl'
  return 'text-lg'
}

export const StudyPage = () => {
  const { t } = useTranslation()
  usePageMeta({ title: t('seo.study.title', 'Study'), noIndex: true })
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { data: deck, isLoading: deckLoading } = useDeck(deckId || '')
  const { data: cards = [], isLoading: cardsLoading } = useCards(deckId || '')
  const reviewCardMutation = useReviewCard(deckId || '')

  // Language selection - stored in localStorage for persistence
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const saved = localStorage.getItem('study-language')
    return saved || user?.preferred_language || 'en'
  })
  const [showLangDropdown, setShowLangDropdown] = useState(false)

  const needsTranslation = selectedLanguage !== 'en'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [practiceMode, setPracticeMode] = useState(false)
  const [practiceSessionCards, setPracticeSessionCards] = useState<typeof cards | null>(null)
  const [showFlipHint, setShowFlipHint] = useState(true)
  const [cardIntervals, setCardIntervals] = useState<CardIntervals | null>(null)
  const [sessionQueue, setSessionQueue] = useState<typeof cards>([])
  const [sessionInitialized, setSessionInitialized] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [shortcutsBannerDismissed, setShortcutsBannerDismissed] = useState(
    () => localStorage.getItem('flashcards-shortcuts-dismissed') === '1'
  )
  const [sessionStats, setSessionStats] = useState({ again: 0, hard: 0, good: 0, easy: 0 })
  // Index of the first not-yet-answered card in SM-2 mode (cards before it are read-only)
  const [frontierIndex, setFrontierIndex] = useState(0)
  const [pendingResponse, setPendingResponse] = useState<RecallResponse | null>(null)
  // New cards already counted against today's daily limit (per session)
  const newCardsCountedRef = useRef<Set<string>>(new Set())
  // "Card will come back later" notice — only once per session
  const requeueNoticeShownRef = useRef(false)

  // Session persistence helpers
  const sessionKey = deckId ? `study-session-${deckId}` : ''
  const saveSession = useCallback((queue: typeof cards, index: number, isPractice?: boolean, stats?: typeof sessionStats, frontier?: number) => {
    if (!sessionKey) return
    try {
      sessionStorage.setItem(sessionKey, JSON.stringify({
        cardIds: queue.map(c => c.id),
        currentIndex: index,
        ...(isPractice != null && { practiceMode: isPractice }),
        ...(stats && { sessionStats: stats }),
        ...(frontier != null && { frontierIndex: frontier }),
      }))
    } catch { /* ignore quota errors */ }
  }, [sessionKey])
  const clearSession = useCallback(() => {
    if (sessionKey) sessionStorage.removeItem(sessionKey)
  }, [sessionKey])

  const dailyNewCardLimit = useMemo(() => {
    if (user) return user.daily_new_card_limit ?? 20
    return guestStorage.read().settings?.dailyNewCardLimit ?? 20
  }, [user])

  const dueCards = useMemo(() => {
    const due = getDueCardsWithLimit(cards, dailyNewCardLimit, deckId)
    return due.sort((a, b) => {
      if (!a.nextReviewAt && !b.nextReviewAt) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }
      if (!a.nextReviewAt) return -1
      if (!b.nextReviewAt) return 1
      return new Date(a.nextReviewAt).getTime() - new Date(b.nextReviewAt).getTime()
    })
  }, [cards, dailyNewCardLimit, deckId])

  // Initialize study session from due cards (snapshot once), restoring saved progress
  useEffect(() => {
    if (sessionInitialized || practiceMode) return

    // Try to restore a saved session for this deck
    if (sessionKey) {
      try {
        const saved = sessionStorage.getItem(sessionKey)
        if (saved) {
          const parsed = JSON.parse(saved) as {
            cardIds: string[]
            currentIndex: number
            practiceMode?: boolean
            sessionStats?: typeof sessionStats
            frontierIndex?: number
          }
          const cardMap = new Map(cards.map(c => [c.id, c]))
          const restoredQueue = parsed.cardIds
            .map(id => cardMap.get(id))
            .filter((c): c is typeof cards[number] => !!c)
          if (restoredQueue.length > 0 && parsed.currentIndex < restoredQueue.length) {
            if (parsed.practiceMode) {
              setPracticeSessionCards(restoredQueue)
              setPracticeMode(true)
              setCurrentIndex(parsed.currentIndex)
              if (parsed.sessionStats) setSessionStats(parsed.sessionStats)
              setSessionInitialized(true)
              return
            }
            setSessionQueue(restoredQueue)
            setCurrentIndex(parsed.currentIndex)
            setFrontierIndex(parsed.frontierIndex ?? parsed.currentIndex)
            if (parsed.sessionStats) setSessionStats(parsed.sessionStats)
            setSessionInitialized(true)
            return
          }
        }
      } catch { /* corrupt data, ignore */ }
    }

    if (dueCards.length === 0) return
    setSessionQueue([...dueCards])
    saveSession([...dueCards], 0, false)
    setSessionInitialized(true)
  }, [cards, dueCards, sessionInitialized, practiceMode, sessionKey, saveSession])

  // Persist session progress on changes
  useEffect(() => {
    if (!sessionInitialized) return
    if (practiceMode && practiceSessionCards && practiceSessionCards.length > 0) {
      saveSession(practiceSessionCards, currentIndex, true, sessionStats)
    } else if (!practiceMode && sessionQueue.length > 0) {
      saveSession(sessionQueue, currentIndex, false, sessionStats, frontierIndex)
    }
  }, [sessionInitialized, practiceMode, sessionQueue, practiceSessionCards, currentIndex, sessionStats, frontierIndex, saveSession])

  const cardsToStudy = practiceMode && practiceSessionCards?.length
    ? practiceSessionCards
    : sessionQueue
  const studyCount = cardsToStudy.length
  const isRoundComplete = practiceMode && studyCount > 0 && currentIndex >= studyCount
  const isSessionComplete = !practiceMode && sessionInitialized && sessionQueue.length > 0 && currentIndex >= sessionQueue.length

  // Clear saved session when study session or practice round is complete
  useEffect(() => {
    if (isSessionComplete || isRoundComplete) clearSession()
  }, [isSessionComplete, isRoundComplete, clearSession])

  useEffect(() => {
    // Don't adjust index before session is ready — the INIT effect handles setting the correct index
    if (!sessionInitialized && !practiceMode) return
    if (practiceMode && currentIndex >= cardsToStudy.length) return
    if (!practiceMode && sessionInitialized && currentIndex >= cardsToStudy.length) return
    if (cardsToStudy.length > 0 && currentIndex >= cardsToStudy.length) {
      setCurrentIndex(Math.max(0, cardsToStudy.length - 1))
    } else if (cardsToStudy.length === 0 && !practiceMode) {
      setCurrentIndex(0)
    }
  }, [cardsToStudy.length, currentIndex, practiceMode, sessionInitialized])

  const totalCards = cards.length
  const dueCount = dueCards.length
  const currentCard = cardsToStudy[currentIndex]
  const earliestNextReview = getEarliestNextReview(cards)
  // In SM-2 mode, cards before the frontier were already rated this session — show them read-only
  const isReviewedCard = !practiceMode && currentIndex < frontierIndex
  const isSaving = pendingResponse !== null
  const answeredCount = practiceMode ? Math.min(currentIndex, studyCount) : Math.min(frontierIndex, studyCount)

  // Fetch translation for current card when needed
  const { data: translatedCard, isLoading: translationLoading, isError: isTranslationError } = useQuery({
    queryKey: ['translation', currentCard?.id, selectedLanguage],
    queryFn: async () => {
      if (user) {
        // Authenticated: use card-based endpoint (caches in DB)
        return translationApi.getTranslatedCard(currentCard!.id, selectedLanguage)
      }
      // Guest: use text-based endpoint (strip HTML for plain text translation)
      const translated = await translationApi.translateText(
        stripHtml(currentCard!.backText || ''),
        selectedLanguage,
      )
      return { ...currentCard!, translated_back: translated } as import('@/features/decks/types').TranslatedCard
    },
    enabled: needsTranslation && !!currentCard?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Retry once on failure
  })

  // Handle language change
  const handleLanguageChange = (langCode: string) => {
    trackEvent('translate.use', { target_lang: langCode })
    setSelectedLanguage(langCode)
    localStorage.setItem('study-language', langCode)
    setShowLangDropdown(false)
  }

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    if (!showLangDropdown) return
    const handleClick = () => setShowLangDropdown(false)
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowLangDropdown(false)
    }
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [showLangDropdown])

  // Fetch card intervals when current card changes (auth: from API, guest: computed locally)
  useEffect(() => {
    if (!currentCard) {
      setCardIntervals(null)
      return
    }
    if (!user) {
      setCardIntervals(getLocalCardIntervals(currentCard))
      return
    }
    let cancelled = false
    apiDeckRepo.getCardIntervals(currentCard.id)
      .then((intervals) => { if (!cancelled) setCardIntervals(intervals) })
      .catch(() => { if (!cancelled) setCardIntervals(null) })
    return () => { cancelled = true }
  }, [currentCard, user])

  const startPracticeMode = () => {
    const practiceCards = [...cards].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    setPracticeSessionCards(practiceCards)
    setPracticeMode(true)
    setCurrentIndex(0)
    setFrontierIndex(0)
    setIsFlipped(false)
    setSessionInitialized(true)
    setSessionStats({ again: 0, hard: 0, good: 0, easy: 0 })
    saveSession(practiceCards, 0, true, { again: 0, hard: 0, good: 0, easy: 0 })
  }

  const endPracticeMode = () => {
    setPracticeMode(false)
    setPracticeSessionCards(null)
    setCurrentIndex(0)
    setFrontierIndex(0)
    setSessionInitialized(false)
    setSessionQueue([])
    setIsShuffled(false)
    setSessionStats({ again: 0, hard: 0, good: 0, easy: 0 })
    clearSession()
  }

  const handleShuffle = useCallback(() => {
    // In SM-2 mode never shuffle already-answered cards (positions before the frontier)
    const shuffleFrom = practiceMode ? currentIndex : Math.max(currentIndex, frontierIndex)
    const shuffleRemaining = (list: typeof cards) => {
      const before = list.slice(0, shuffleFrom)
      const remaining = list.slice(shuffleFrom)
      for (let i = remaining.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remaining[i], remaining[j]] = [remaining[j], remaining[i]]
      }
      return [...before, ...remaining]
    }
    if (practiceMode) {
      setPracticeSessionCards(prev => prev ? shuffleRemaining(prev) : prev)
    } else {
      setSessionQueue(prev => shuffleRemaining(prev))
    }
    setIsShuffled(true)
    setIsFlipped(false)
  }, [currentIndex, frontierIndex, practiceMode])

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev)
    setShowFlipHint(false)
  }, [])

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }, [currentIndex])

  const handleNext = useCallback(() => {
    if (practiceMode) {
      if (!isFlipped) return
      if (currentIndex < studyCount - 1) {
        setCurrentIndex(currentIndex + 1)
        setIsFlipped(false)
      } else if (studyCount > 0) {
        setCurrentIndex(studyCount)
        setIsFlipped(false)
      }
      return
    }
    // SM-2 mode: only move forward through already-answered cards, never past the frontier
    if (currentIndex >= frontierIndex) return
    if (currentIndex < studyCount - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }, [practiceMode, isFlipped, currentIndex, studyCount, frontierIndex])

  const { mutateAsync: reviewCard } = reviewCardMutation

  const handleResponse = useCallback(async (response: RecallResponse) => {
    if (!currentCard || !deckId || isSaving) return
    // Never re-submit a review for a card already rated this session
    if (isReviewedCard) return
    setErrorMessage(null)
    setPendingResponse(response)
    try {
      if (!practiceMode) {
        await reviewCard({ cardId: currentCard.id, response })
        // Daily pacing: count a new card against today's limit the first time it's answered
        if (!currentCard.nextReviewAt && !newCardsCountedRef.current.has(currentCard.id)) {
          newCardsCountedRef.current.add(currentCard.id)
          recordNewCardIntroduced(deckId)
        }
      }
      setSessionStats(prev => ({ ...prev, [response]: prev[response] + 1 }))
      setIsFlipped(false)
      if (response === 'again' && !practiceMode) {
        // Re-insert card later in the queue so user sees it again
        setSessionQueue(prev => {
          const newQueue = [...prev]
          const card = newQueue.splice(currentIndex, 1)[0]
          const insertAt = Math.min(currentIndex + 3, newQueue.length)
          newQueue.splice(insertAt, 0, card)
          return newQueue
        })
        if (!requeueNoticeShownRef.current) {
          requeueNoticeShownRef.current = true
          toast(t('study.requeued', 'Card will come back later this session'), { duration: 3000 })
        }
      } else {
        if (!practiceMode) setFrontierIndex(currentIndex + 1)
        setCurrentIndex((prev) => prev + 1)
      }
    } catch (error) {
      console.error('Failed to review card:', error)
      setErrorMessage(error instanceof Error ? error.message : t('study.saveReviewFailed', 'Failed to save review'))
    } finally {
      setPendingResponse(null)
    }
  }, [currentCard, deckId, isSaving, isReviewedCard, practiceMode, currentIndex, reviewCard, t])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    // Skip shortcuts while a focusable control has focus (buttons, form fields, editors)
    const active = document.activeElement
    if (active instanceof HTMLElement) {
      const tag = active.tagName
      if (tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || active.isContentEditable) {
        return
      }
    }
    if (e.key === ' ') {
      e.preventDefault()
      handleFlip()
      return
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrevious()
      return
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
      return
    }
    if (isFlipped && !isSaving && currentCard && !isReviewedCard) {
      if (e.key === '1') {
        e.preventDefault()
        handleResponse('again')
      } else if (e.key === '2') {
        e.preventDefault()
        handleResponse('hard')
      } else if (e.key === '3') {
        e.preventDefault()
        handleResponse('good')
      } else if (e.key === '4') {
        e.preventDefault()
        handleResponse('easy')
      }
    }
  }, [isFlipped, isSaving, currentCard, isReviewedCard, handleFlip, handlePrevious, handleNext, handleResponse])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  const studyPageShell = (children: ReactNode) => (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-surface-base grain relative overflow-x-hidden">
      <div
        className="fixed inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none z-0"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}
        aria-hidden
      />
      {children}
    </div>
  )

  if (!deckId) {
    return studyPageShell(
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <p className="text-slate-600 dark:text-slate-400">{t('deck.invalidDeckId')}</p>
        <Button onClick={() => navigate('/dashboard')} className="mt-4">{t('deck.backToDashboard')}</Button>
      </main>
    )
  }

  if (deckLoading || cardsLoading) {
    return studyPageShell(
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </main>
    )
  }

  if (!deck) {
    return studyPageShell(
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 gap-4 py-8">
        <p className="text-slate-600 dark:text-slate-400">{t('deck.deckNotFound')}</p>
        <Button onClick={() => navigate('/dashboard')}>{t('deck.backToDashboard')}</Button>
      </main>
    )
  }

  if (isRoundComplete) {
    const totalResponses = sessionStats.again + sessionStats.hard + sessionStats.good + sessionStats.easy
    return studyPageShell(
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <ConfettiOverlay />
        <div className="max-w-md w-full mx-auto text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-primary-600 dark:text-primary-400" aria-hidden />
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-2">{t('study.roundComplete')}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            {t('study.roundCompleteMessage', { count: studyCount })}
          </p>
          {totalResponses > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-6 text-left">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{t('study.sessionSummary')}</p>
              <div className="space-y-2">
                {(['again', 'hard', 'good', 'easy'] as const).map(key => {
                  const count = sessionStats[key]
                  const pct = totalResponses > 0 ? (count / totalResponses) * 100 : 0
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 w-12 text-right">{t(`study.${key}`)}</span>
                      <div className={`flex-1 h-5 rounded-full ${STAT_COLORS[key].bg} overflow-hidden`}>
                        <div className={`h-full rounded-full ${STAT_COLORS[key].bar} transition-[width] duration-500`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 w-8">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => {
                endPracticeMode()
                if (window.history.length > 1) {
                  navigate(-1)
                } else {
                  navigate('/dashboard')
                }
              }}
            >
              {t('study.backToDeck')}
            </Button>
            <Button onClick={startPracticeMode} variant="secondary">
              {t('study.studyAgain')}
            </Button>
          </div>
        </div>
      </main>
    )
  }

  if (isSessionComplete) {
    const totalResponses = sessionStats.again + sessionStats.hard + sessionStats.good + sessionStats.easy
    return studyPageShell(
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <ConfettiOverlay />
        <div className="max-w-md w-full mx-auto text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-emerald-600 dark:text-emerald-400" aria-hidden />
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-2">{t('study.sessionComplete')}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
            {t('study.sessionCompleteMessage', { count: sessionQueue.length })}
          </p>
          {earliestNextReview && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              {formatRelativeTime(earliestNextReview, t)}
            </p>
          )}
          {totalResponses > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-6 text-left">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{t('study.sessionSummary')}</p>
              <div className="space-y-2">
                {(['again', 'hard', 'good', 'easy'] as const).map(key => {
                  const count = sessionStats[key]
                  const pct = totalResponses > 0 ? (count / totalResponses) * 100 : 0
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 w-12 text-right">{t(`study.${key}`)}</span>
                      <div className={`flex-1 h-5 rounded-full ${STAT_COLORS[key].bg} overflow-hidden`}>
                        <div className={`h-full rounded-full ${STAT_COLORS[key].bar} transition-[width] duration-500`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 w-8">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate(`/deck/${deckId}`)}>
              {t('study.backToDeck')}
            </Button>
            {totalCards > 0 && (
              <Button onClick={startPracticeMode} variant="secondary">
                {t('study.studyAgainAll', { count: totalCards })}
              </Button>
            )}
          </div>
        </div>
      </main>
    )
  }

  if (dueCount === 0 && !practiceMode && !sessionInitialized) {
    const isEmpty = totalCards === 0
    return studyPageShell(
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-md w-full mx-auto text-center animate-fade-in">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isEmpty ? 'bg-slate-100 dark:bg-slate-800' : 'bg-emerald-100 dark:bg-emerald-900/30'}`}>
            {isEmpty
              ? <Layers className="w-8 h-8 text-slate-400 dark:text-slate-500" aria-hidden />
              : <Trophy className="w-8 h-8 text-emerald-600 dark:text-emerald-400" aria-hidden />
            }
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-2">
            {isEmpty ? t('study.noCards') : t('study.allDone')}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
            {isEmpty ? t('study.noCardsMessage') : t('study.allDoneMessage')}
          </p>
          {!isEmpty && earliestNextReview && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              {formatRelativeTime(earliestNextReview, t)}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            {isEmpty ? (
              <Button onClick={() => navigate(`/deck/${deckId}`)}>
                {t('study.addCards')}
              </Button>
            ) : (
              <>
                <Button onClick={() => navigate(`/deck/${deckId}`)}>
                  {t('study.backToDeck')}
                </Button>
                <Button onClick={startPracticeMode} variant="secondary">
                  {t('study.studyAgainAll', { count: totalCards })}
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    )
  }

  if (studyCount === 0 || !currentCard) {
    return studyPageShell(
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <p className="text-slate-600 dark:text-slate-400 mb-6">{t('study.noCardsToStudy')}</p>
        <Button
          onClick={() => {
            endPracticeMode()
            if (window.history.length > 1) {
              navigate(-1)
            } else {
              navigate('/dashboard')
            }
          }}
        >
          {t('study.backToDeck')}
        </Button>
      </main>
    )
  }

  const isFirstCard = currentIndex === 0
  const frontText = currentCard.frontText || t('study.noFrontText')
  // Use translated back text if available, otherwise fall back to original
  const translatedBackText = translatedCard?.translated_back
  const backText = needsTranslation && translatedBackText
    ? translatedBackText
    : (currentCard.backText || t('study.noBackText'))
  const isTranslated = needsTranslation && !!translatedBackText
  const showTranslationFailed = needsTranslation && isTranslationError && !translationLoading
  const frontSizeClass = getTextSizeClass(frontText)
  const backSizeClass = getTextSizeClass(backText)

  return studyPageShell(
    <>
      {/* Top navbar */}
      <header className="relative z-20 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-20 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(`/deck/${deckId}`)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors min-w-0"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium truncate">{deck.title}</span>
          </button>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowLangDropdown(!showLangDropdown)
                }}
                aria-expanded={showLangDropdown}
                aria-haspopup="listbox"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
              >
                <Globe className="w-3.5 h-3.5" />
                {SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.nativeLabel || 'EN'}
              </button>
              {showLangDropdown && (
                <div
                  role="listbox"
                  aria-label={t('study.selectLanguage', 'Select language')}
                  className="absolute right-0 top-full mt-1 w-44 max-h-64 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-elevation-lg z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      role="option"
                      aria-selected={selectedLanguage === lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 ${
                        selectedLanguage === lang.code
                          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {lang.nativeLabel}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link
              to={`/deck/${deckId}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              aria-label={t('study.editDeck', 'Edit Deck')}
              title={t('study.editDeck', 'Edit Deck')}
            >
              <Pencil className="w-3.5 h-3.5" aria-hidden />
              <span className="hidden sm:inline">{t('study.editDeck', 'Edit Deck')}</span>
            </Link>
            <button
              type="button"
              onClick={handleShuffle}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isShuffled
                  ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
              aria-label={t('study.shuffleRemaining')}
              title={t('study.shuffleRemaining')}
            >
              <Shuffle className="w-3.5 h-3.5" aria-hidden />
              <span className="hidden sm:inline">{t('study.shuffle')}</span>
            </button>
            <span className="hidden sm:inline text-sm font-medium text-slate-600 dark:text-slate-300">
              {currentIndex + 1} / {studyCount}
            </span>
          </div>
        </div>
      </header>

    <main className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-6xl w-full mx-auto px-3 sm:px-12 py-6 sm:py-12 animate-fade-in">
      <div className="w-full">
        {/* Session progress bar */}
        <div
          className="w-full mb-4 sm:mb-6"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={studyCount}
          aria-valuenow={answeredCount}
          aria-label={t('study.progress', 'Session progress')}
        >
          <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary-500 transition-[width] duration-300"
              style={{ width: `${studyCount > 0 ? (answeredCount / studyCount) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Card with navigation */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Previous button — desktop only */}
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="hidden sm:flex p-3 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
            aria-label={t('study.previousCard')}
          >
            <ChevronLeft className="w-6 h-6" aria-hidden />
          </button>

          {/* 3D Flip Card */}
          <div className="relative [perspective:2000px] flex-1 h-[280px] sm:h-[380px]">
            {/* First-card hint ring — pulses on its own so card content never flashes */}
            {isFirstCard && (
              <div
                className="absolute inset-0 rounded-2xl ring-2 ring-primary-400 dark:ring-primary-500 ring-offset-2 dark:ring-offset-slate-900 animate-pulse pointer-events-none"
                aria-hidden
              />
            )}
            <div
              className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 cursor-pointer rounded-2xl shadow-lg ${isFlipped ? '[transform:rotateY(-180deg)]' : '[transform:rotateY(0deg)]'}`}
              onClick={handleFlip}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleFlip()
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={isFlipped ? t('study.flipToFront') : t('study.flipToBack')}
            >
              {/* Front face */}
              <div className="absolute inset-0 [backface-visibility:hidden] bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-12 flex flex-col items-center justify-center">
                <RichTextDisplay content={frontText} className={`text-slate-900 dark:text-slate-100 text-center break-words font-semibold ${frontSizeClass}`} />
                {showFlipHint && (
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-6">{t('study.tapToReveal')}</p>
                )}
              </div>

              {/* Back face */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(-180deg)] bg-primary-50 dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-primary-900/50 p-6 sm:p-12 flex flex-col items-center justify-center">
              {(isTranslated || (needsTranslation && translationLoading) || showTranslationFailed) && (
                <div className="flex items-center gap-2 mb-3 flex-wrap justify-center">
                  {isTranslated && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40">
                      <Globe className="w-3 h-3" aria-hidden />
                      {SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.nativeLabel || selectedLanguage}
                    </span>
                  )}
                  {needsTranslation && translationLoading && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-600">
                      <Loader2 className="w-3 h-3 animate-spin" aria-hidden />
                      {t('study.translating')}
                    </span>
                  )}
                  {showTranslationFailed && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40">
                      <XCircle className="w-3 h-3" aria-hidden />
                      {t('study.translationFailed')}
                    </span>
                  )}
                </div>
              )}
              {!(needsTranslation && translationLoading) && (
                <>
                  <RichTextDisplay content={backText} className={`text-slate-900 dark:text-slate-100 text-center break-words ${backSizeClass}`} />
                  {isTranslated && currentCard.backText && (
                    <RichTextDisplay content={currentCard.backText} className="text-sm text-slate-500 dark:text-slate-400 text-center mt-3" />
                  )}
                </>
              )}
            </div>
            </div>
          </div>

          {/* Next button — desktop only */}
          <button
            type="button"
            onClick={handleNext}
            disabled={practiceMode ? !isFlipped : !isReviewedCard}
            className="hidden sm:flex p-3 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
            aria-label={t('study.nextCard')}
          >
            <ChevronRight className="w-6 h-6" aria-hidden />
          </button>
        </div>

        {/* Navigation buttons — mobile only (below card) */}
        <div className="flex sm:hidden items-center justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-2.5 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
            aria-label={t('study.previousCard')}
          >
            <ChevronLeft className="w-5 h-5" aria-hidden />
          </button>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {currentIndex + 1} / {studyCount}
          </span>
          <button
            type="button"
            onClick={handleNext}
            disabled={practiceMode ? !isFlipped : !isReviewedCard}
            className="p-2.5 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
            aria-label={t('study.nextCard')}
          >
            <ChevronRight className="w-5 h-5" aria-hidden />
          </button>
        </div>

        {/* Response section */}
        <div className="mt-8 sm:mt-10">
          {/* Keyboard shortcuts banner — desktop only, first time */}
          {!shortcutsBannerDismissed && (
            <div className="hidden sm:flex items-center justify-between gap-3 mb-4 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 animate-fade-in">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 flex-wrap">
                <Keyboard className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" aria-hidden />
                <span>{t('study.shortcutSpace')}</span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span>{t('study.shortcutRate')}</span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span>{t('study.shortcutNav')}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShortcutsBannerDismissed(true)
                  localStorage.setItem('flashcards-shortcuts-dismissed', '1')
                }}
                className="shrink-0 min-w-[28px] min-h-[28px] flex items-center justify-center rounded text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                aria-label={t('study.dismissShortcuts')}
              >
                <X className="w-4 h-4" aria-hidden />
              </button>
            </div>
          )}

          {isReviewedCard ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              {t('study.alreadyAnswered', 'Already reviewed this session')}
            </p>
          ) : !isFlipped ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">{t('study.flipPrompt')}</p>
          ) : (
            <div className="space-y-4">
              {/* Explanatory text */}
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                {t('study.ratingPrompt')}
              </p>

              {errorMessage && (
                <p className="text-xs text-red-600 dark:text-red-400 text-center">{errorMessage}</p>
              )}

              {/* Response buttons — stay mounted while saving to avoid layout jumps */}
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {/* Again */}
                <button
                  type="button"
                  onClick={() => handleResponse('again')}
                  disabled={isSaving}
                  className="flex flex-col items-center gap-0.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm font-medium transition-colors bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/50 disabled:opacity-50 min-w-[70px] sm:min-w-[80px] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:focus-visible:ring-red-400"
                  title={t(RESPONSE_INFO.again.descriptionKey, RESPONSE_INFO.again.descriptionDefault)}
                >
                  <div className="flex items-center gap-1.5">
                    {pendingResponse === 'again' ? <Spinner size="sm" /> : <RotateCcw className="w-4 h-4" aria-hidden />}
                    <span>{t('study.again')}</span>
                  </div>
                  {cardIntervals && (
                    <span className="text-xs opacity-70">{cardIntervals.again}</span>
                  )}
                </button>

                {/* Hard */}
                <button
                  type="button"
                  onClick={() => handleResponse('hard')}
                  disabled={isSaving}
                  className="flex flex-col items-center gap-0.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm font-medium transition-colors bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/50 disabled:opacity-50 min-w-[70px] sm:min-w-[80px] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-400"
                  title={t(RESPONSE_INFO.hard.descriptionKey, RESPONSE_INFO.hard.descriptionDefault)}
                >
                  <div className="flex items-center gap-1.5">
                    {pendingResponse === 'hard' ? <Spinner size="sm" /> : <ThumbsDown className="w-4 h-4" aria-hidden />}
                    <span>{t('study.hard')}</span>
                  </div>
                  {cardIntervals && (
                    <span className="text-xs opacity-70">{cardIntervals.hard}</span>
                  )}
                </button>

                {/* Good */}
                <button
                  type="button"
                  onClick={() => handleResponse('good')}
                  disabled={isSaving}
                  className="flex flex-col items-center gap-0.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm font-medium transition-colors bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/50 disabled:opacity-50 min-w-[70px] sm:min-w-[80px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
                  title={t(RESPONSE_INFO.good.descriptionKey, RESPONSE_INFO.good.descriptionDefault)}
                >
                  <div className="flex items-center gap-1.5">
                    {pendingResponse === 'good' ? <Spinner size="sm" /> : <ThumbsUp className="w-4 h-4" aria-hidden />}
                    <span>{t('study.good')}</span>
                  </div>
                  {cardIntervals && (
                    <span className="text-xs opacity-70">{cardIntervals.good}</span>
                  )}
                </button>

                {/* Easy */}
                <button
                  type="button"
                  onClick={() => handleResponse('easy')}
                  disabled={isSaving}
                  className="flex flex-col items-center gap-0.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm font-medium transition-colors bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 disabled:opacity-50 min-w-[70px] sm:min-w-[80px] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400"
                  title={t(RESPONSE_INFO.easy.descriptionKey, RESPONSE_INFO.easy.descriptionDefault)}
                >
                  <div className="flex items-center gap-1.5">
                    {pendingResponse === 'easy' ? <Spinner size="sm" /> : <Zap className="w-4 h-4" aria-hidden />}
                    <span>{t('study.easy')}</span>
                  </div>
                  {cardIntervals && (
                    <span className="text-xs opacity-70">{cardIntervals.easy}</span>
                  )}
                </button>
              </div>

              {/* Keyboard shortcuts hint — shows after banner dismissed */}
              {shortcutsBannerDismissed && (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center pt-1">
                  {t('study.keyboardHint')}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
    </>
  )
}
