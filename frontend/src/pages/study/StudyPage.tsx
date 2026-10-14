import { useState, useMemo, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, XCircle, Globe, RotateCcw, ThumbsDown, ThumbsUp, Zap, Shuffle, Keyboard, X, Pencil } from 'lucide-react'
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
import { Plant } from '@/pages/dashboard/components/WordGarden'

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

type StatKey = 'again' | 'hard' | 'good' | 'easy'
const STAT_KEYS: readonly StatKey[] = ['again', 'hard', 'good', 'easy']

/** Answer stickers (DESIGN.md jobs): again = again red, hard = quiet white, good = grass, easy = sky. */
const RESPONSE_STYLE: Record<StatKey, { button: string; bar: string }> = {
  again: { button: 'bg-again text-white', bar: 'bg-again' },
  hard: { button: 'bg-white', bar: 'bg-ink/30' },
  good: { button: 'bg-grass', bar: 'bg-grass' },
  easy: { button: 'bg-sky', bar: 'bg-sky' },
}

const RESPONSE_ICON: Record<StatKey, typeof RotateCcw> = {
  again: RotateCcw,
  hard: ThumbsDown,
  good: ThumbsUp,
  easy: Zap,
}

/** Outlined sticker progress bar. Fill grows with scaleX so only transform animates. */
function StickerBar({ pct, fill = 'bg-grass', className = 'h-3' }: { pct: number; fill?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-full border-2 border-ink bg-white ${className}`}>
      <div
        className={`h-full w-full origin-left ${fill} transition-transform duration-300 ease-out motion-reduce:transition-none`}
        style={{ transform: `scaleX(${Math.max(0, Math.min(100, pct)) / 100})` }}
      />
    </div>
  )
}

/** Small icon/label sticker button for the study header and card navigation. */
const chipBtn = 'btn-quiet min-h-[40px] px-3 text-sm'

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
  // Hide the help button while studying: it would sit on top of the answer buttons
  useEffect(() => {
    document.body.dataset.focus = 'study'
    return () => { delete document.body.dataset.focus }
  }, [])

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

  // Body is already notebook paper / chalkboard (DESIGN.md), so the shell sets no background.
  const studyPageShell = (children: ReactNode) => (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {children}
    </div>
  )

  const goBackFromPractice = () => {
    endPracticeMode()
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/dashboard')
    }
  }

  /** Mint "done" sticker with the garden plant, shared by the completion screens. */
  const doneSticker = (title: string, message: string, nextReview?: string | null, empty = false) => (
    <div className={`sticker relative -rotate-1 px-6 pt-5 pb-7 text-center ${empty ? 'bg-white' : 'bg-mint'}`}>
      <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[3deg] bg-sun/80" aria-hidden />
      <Plant stage={empty ? 0 : 4} mood={empty ? 'new' : 'watered'} className="mx-auto h-36 w-32" />
      <h1 className="font-display text-[1.75rem] leading-tight text-ink">{title}</h1>
      <p className="mt-2 text-base font-medium text-ink/75">{message}</p>
      {nextReview && (
        <p className="mt-2 text-sm font-semibold text-ink/65">{formatRelativeTime(nextReview, t)}</p>
      )}
    </div>
  )

  const sessionSummary = () => {
    const totalResponses = sessionStats.again + sessionStats.hard + sessionStats.good + sessionStats.easy
    if (totalResponses === 0) return null
    return (
      <div className="sheet mt-8 p-5 text-left">
        <p className="text-sm font-semibold text-fg mb-4">{t('study.sessionSummary')}</p>
        <div className="space-y-3">
          {STAT_KEYS.map(key => {
            const count = sessionStats[key]
            const pct = (count / totalResponses) * 100
            return (
              <div key={key} className="flex items-center gap-3">
                <span className="min-w-[3.5rem] text-right text-sm font-medium text-muted">{t(`study.${key}`)}</span>
                <StickerBar pct={pct} fill={RESPONSE_STYLE[key].bar} className="h-4 flex-1" />
                <span className="w-8 text-sm font-bold text-fg tabular-nums">{count}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (!deckId) {
    return studyPageShell(
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <p className="text-muted">{t('deck.invalidDeckId')}</p>
        <Button onClick={() => navigate('/dashboard')} className="mt-4">{t('deck.backToDashboard')}</Button>
      </main>
    )
  }

  if (deckLoading || cardsLoading) {
    return studyPageShell(
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <Loader2 className="w-8 h-8 animate-spin text-muted" />
      </main>
    )
  }

  if (!deck) {
    return studyPageShell(
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 gap-4 py-8">
        <p className="text-muted">{t('deck.deckNotFound')}</p>
        <Button onClick={() => navigate('/dashboard')}>{t('deck.backToDashboard')}</Button>
      </main>
    )
  }

  if (isRoundComplete) {
    return studyPageShell(
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="max-w-md w-full mx-auto">
          {doneSticker(t('study.roundComplete'), t('study.roundCompleteMessage', { count: studyCount }))}
          {sessionSummary()}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button size="lg" onClick={goBackFromPractice}>
              {t('study.backToDeck')}
            </Button>
            <Button size="lg" onClick={startPracticeMode} variant="secondary">
              {t('study.studyAgain')}
            </Button>
          </div>
        </div>
      </main>
    )
  }

  if (isSessionComplete) {
    return studyPageShell(
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="max-w-md w-full mx-auto">
          {doneSticker(
            t('study.sessionComplete'),
            t('study.sessionCompleteMessage', { count: sessionQueue.length }),
            earliestNextReview,
          )}
          {sessionSummary()}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button size="lg" onClick={() => navigate(`/deck/${deckId}`)}>
              {t('study.backToDeck')}
            </Button>
            {totalCards > 0 && (
              <Button size="lg" onClick={startPracticeMode} variant="secondary">
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
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="max-w-md w-full mx-auto">
          {doneSticker(
            isEmpty ? t('study.noCards') : t('study.allDone'),
            isEmpty ? t('study.noCardsMessage') : t('study.allDoneMessage'),
            isEmpty ? null : earliestNextReview,
            isEmpty,
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            {isEmpty ? (
              <Button size="lg" onClick={() => navigate(`/deck/${deckId}`)}>
                {t('study.addCards')}
              </Button>
            ) : (
              <>
                <Button size="lg" onClick={() => navigate(`/deck/${deckId}`)}>
                  {t('study.backToDeck')}
                </Button>
                <Button size="lg" onClick={startPracticeMode} variant="secondary">
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
        <p className="text-muted mb-6">{t('study.noCardsToStudy')}</p>
        <Button onClick={goBackFromPractice}>
          {t('study.backToDeck')}
        </Button>
      </main>
    )
  }

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
  // Short fronts (a word or phrase) get the display face, like the dashboard's next card
  const frontTypeClass = stripHtml(frontText).length <= 50
    ? 'font-display text-[1.75rem] leading-[1.15] sm:text-4xl'
    : `font-semibold ${frontSizeClass}`
  const progressPct = studyCount > 0 ? (answeredCount / studyCount) * 100 : 0
  const navBtn = 'disabled:!invisible btn-quiet h-12 w-12 shrink-0 p-0'

  return studyPageShell(
    <>
      {/* Top bar */}
      <header className="relative z-20">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(`/deck/${deckId}`)}
            className="btn-ghost -ml-3 min-h-[44px] min-w-0 text-sm"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="truncate">{deck.title}</span>
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
                className={chipBtn}
              >
                <Globe className="w-4 h-4" />
                {SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.nativeLabel || 'EN'}
              </button>
              {showLangDropdown && (
                <div
                  role="listbox"
                  aria-label={t('study.selectLanguage', 'Select language')}
                  className="sheet !rounded-[18px] absolute right-0 top-full mt-2 w-48 max-h-64 overflow-y-auto p-1.5 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      role="option"
                      aria-selected={selectedLanguage === lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-3 py-2 rounded-[10px] text-sm transition-[background-color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky ${
                        selectedLanguage === lang.code
                          ? 'bg-sky text-ink font-bold'
                          : 'text-fg font-medium hover:bg-fg/[0.07] active:bg-fg/[0.12]'
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
              className={chipBtn}
              aria-label={t('study.editDeck', 'Edit Deck')}
              title={t('study.editDeck', 'Edit Deck')}
            >
              <Pencil className="w-4 h-4" aria-hidden />
              <span className="hidden sm:inline">{t('study.editDeck', 'Edit Deck')}</span>
            </Link>
            <button
              type="button"
              onClick={handleShuffle}
              className={`btn-sticker min-h-[40px] px-3 text-sm ${isShuffled ? 'bg-mint' : 'bg-white'}`}
              aria-label={t('study.shuffleRemaining')}
              title={t('study.shuffleRemaining')}
            >
              <Shuffle className="w-4 h-4" aria-hidden />
              <span className="hidden sm:inline">{t('study.shuffle')}</span>
            </button>
            <span className="hidden sm:inline text-sm font-bold text-fg tabular-nums">
              {currentIndex + 1} / {studyCount}
            </span>
          </div>
        </div>
      </header>

    <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      <div className="w-full">
        {/* Session progress bar */}
        <div
          className="w-full max-w-2xl mx-auto mb-6 sm:mb-10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={studyCount}
          aria-valuenow={answeredCount}
          aria-label={t('study.progress', 'Session progress')}
        >
          <StickerBar pct={progressPct} className="h-3.5" />
        </div>

        {/* Card with navigation */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Previous button — desktop only */}
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`hidden sm:inline-flex ${navBtn}`}
            aria-label={t('study.previousCard')}
          >
            <ChevronLeft className="w-6 h-6" aria-hidden />
          </button>

          {/* 3D Flip Card: a big sticker, slightly tilted; hover straightens it */}
          <div className="relative [perspective:2000px] flex-1 h-[300px] sm:h-[380px] -rotate-1 transition-transform duration-150 ease-out hover:rotate-0 motion-reduce:transition-none">
            <div
              className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 motion-reduce:transition-none cursor-pointer rounded-[22px] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sun focus-visible:ring-offset-[6px] focus-visible:ring-offset-canvas ${isFlipped ? '[transform:rotateY(-180deg)]' : '[transform:rotateY(0deg)]'}`}
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
              <div className="sticker absolute inset-0 [backface-visibility:hidden] bg-sky p-6 sm:p-12 flex flex-col items-center justify-center">
                <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[3deg] bg-sun/80" aria-hidden />
                <RichTextDisplay content={frontText} className={`text-ink text-center break-words ${frontTypeClass}`} />
                {showFlipHint && (
                  <p className="text-sm font-medium text-ink/65 mt-6">{t('study.tapToReveal')}</p>
                )}
              </div>

              {/* Back face */}
              <div className="sticker absolute inset-0 [backface-visibility:hidden] [transform:rotateY(-180deg)] bg-white p-6 sm:p-12 flex flex-col items-center justify-center">
              {(isTranslated || (needsTranslation && translationLoading) || showTranslationFailed) && (
                <div className="flex items-center gap-2 mb-4 flex-wrap justify-center">
                  {isTranslated && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border-2 border-ink bg-sky text-xs font-bold text-ink">
                      <Globe className="w-3 h-3" aria-hidden />
                      {SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.nativeLabel || selectedLanguage}
                    </span>
                  )}
                  {needsTranslation && translationLoading && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border-2 border-ink/30 text-xs font-semibold text-ink/70">
                      <Loader2 className="w-3 h-3 animate-spin" aria-hidden />
                      {t('study.translating')}
                    </span>
                  )}
                  {showTranslationFailed && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border-2 border-ink bg-again text-xs font-bold text-white">
                      <XCircle className="w-3 h-3" aria-hidden />
                      {t('study.translationFailed')}
                    </span>
                  )}
                </div>
              )}
              {!(needsTranslation && translationLoading) && (
                <>
                  <RichTextDisplay content={backText} className={`text-ink text-center break-words font-medium ${backSizeClass}`} />
                  {isTranslated && currentCard.backText && (
                    <RichTextDisplay content={currentCard.backText} className="text-sm text-ink/60 text-center mt-3" />
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
            className={`hidden sm:inline-flex ${navBtn}`}
            aria-label={t('study.nextCard')}
          >
            <ChevronRight className="w-6 h-6" aria-hidden />
          </button>
        </div>

        {/* Navigation buttons — mobile only (below card) */}
        <div className="flex sm:hidden items-center justify-center gap-5 mt-6">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={navBtn}
            aria-label={t('study.previousCard')}
          >
            <ChevronLeft className="w-5 h-5" aria-hidden />
          </button>
          <span className="text-sm font-bold text-fg tabular-nums">
            {currentIndex + 1} / {studyCount}
          </span>
          <button
            type="button"
            onClick={handleNext}
            disabled={practiceMode ? !isFlipped : !isReviewedCard}
            className={navBtn}
            aria-label={t('study.nextCard')}
          >
            <ChevronRight className="w-5 h-5" aria-hidden />
          </button>
        </div>

        {/* Response section */}
        <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
          {/* Keyboard shortcuts banner — desktop only, first time */}
          {!shortcutsBannerDismissed && (
            <div className="sheet !rounded-[18px] hidden sm:flex items-center justify-between gap-3 mb-5 px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-muted flex-wrap">
                <Keyboard className="w-4 h-4 shrink-0" aria-hidden />
                <span>{t('study.shortcutSpace')}</span>
                <span className="text-line" aria-hidden>|</span>
                <span>{t('study.shortcutRate')}</span>
                <span className="text-line" aria-hidden>|</span>
                <span>{t('study.shortcutNav')}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShortcutsBannerDismissed(true)
                  localStorage.setItem('flashcards-shortcuts-dismissed', '1')
                }}
                className="btn-ghost shrink-0 min-w-[32px] min-h-[32px] px-0 text-muted hover:text-fg"
                aria-label={t('study.dismissShortcuts')}
              >
                <X className="w-4 h-4" aria-hidden />
              </button>
            </div>
          )}

          {isReviewedCard ? (
            <p className="text-sm font-medium text-muted text-center">
              {t('study.alreadyAnswered', 'Already reviewed this session')}
            </p>
          ) : !isFlipped ? (
            <p className="text-sm font-medium text-muted text-center">{t('study.flipPrompt')}</p>
          ) : (
            <div className="space-y-4">
              {/* Explanatory text */}
              <p className="text-sm font-medium text-muted text-center">
                {t('study.ratingPrompt')}
              </p>

              {errorMessage && (
                <p className="text-sm font-semibold text-again text-center">{errorMessage}</p>
              )}

              {/* Response stickers — stay mounted while saving to avoid layout jumps */}
              <div className="grid grid-cols-4 gap-2 sm:flex sm:justify-center sm:gap-3">
                {STAT_KEYS.map((key) => {
                  const Icon = RESPONSE_ICON[key]
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleResponse(key)}
                      disabled={isSaving}
                      className={`btn-sticker ${RESPONSE_STYLE[key].button} flex-col gap-0.5 min-h-[64px] px-1.5 py-2 text-sm sm:min-w-[108px] sm:px-5 sm:py-3`}
                      title={t(RESPONSE_INFO[key].descriptionKey, RESPONSE_INFO[key].descriptionDefault)}
                    >
                      <span className="flex flex-col items-center gap-1 sm:flex-row sm:gap-1.5">
                        {pendingResponse === key ? <Spinner size="sm" /> : <Icon className="w-4 h-4" aria-hidden />}
                        <span className="leading-tight">{t(`study.${key}`)}</span>
                      </span>
                      {cardIntervals && (
                        <span className="text-xs font-semibold opacity-75">{cardIntervals[key]}</span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Keyboard shortcuts hint — shows after banner dismissed */}
              {shortcutsBannerDismissed && (
                <p className="text-xs text-muted text-center pt-1">
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
