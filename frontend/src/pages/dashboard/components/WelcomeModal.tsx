import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { X, Sparkles, FileSpreadsheet, Globe, Keyboard, Users, Puzzle } from 'lucide-react'

const STORAGE_KEY = 'flashcards-welcome-seen'

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
}

const FEATURES = [
  {
    icon: Sparkles,
    titleKey: 'welcome.feature.aiGeneration',
    descKey: 'welcome.feature.aiGenerationDesc',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-900/30',
  },
  {
    icon: FileSpreadsheet,
    titleKey: 'welcome.feature.fileImport',
    descKey: 'welcome.feature.fileImportDesc',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  {
    icon: Globe,
    titleKey: 'welcome.feature.translation',
    descKey: 'welcome.feature.translationDesc',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    icon: Keyboard,
    titleKey: 'welcome.feature.shortcuts',
    descKey: 'welcome.feature.shortcutsDesc',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  {
    icon: Users,
    titleKey: 'welcome.feature.sharedDecks',
    descKey: 'welcome.feature.sharedDecksDesc',
    color: 'text-primary-600 dark:text-primary-400',
    bg: 'bg-primary-100 dark:bg-primary-900/30',
  },
  {
    icon: Puzzle,
    titleKey: 'welcome.feature.extension',
    descKey: 'welcome.feature.extensionDesc',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-900/30',
  },
] as const

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const { t } = useTranslation()
  const [closing, setClosing] = useState(false)

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, '1')
      onClose()
      setClosing(false)
    }, 300)
  }

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
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center min-h-screen p-4 bg-black/50 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700/50 max-w-lg w-full p-6 transition-all duration-300 max-h-[90vh] overflow-y-auto ${closing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0 animate-slide-up'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <h2 id="welcome-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {t('welcome.title')}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 shrink-0"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          {t('welcome.subtitle')}
        </p>

        {/* Feature list */}
        <div className="space-y-3 mb-6">
          {FEATURES.map((f) => (
            <div key={f.titleKey} className="flex items-start gap-3">
              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${f.bg}`}>
                <f.icon className={`w-5 h-5 ${f.color}`} aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {t(f.titleKey)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t(f.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleClose}
          className="w-full min-h-[44px] px-4 py-3 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
        >
          {t('welcome.getStarted')}
        </button>
      </div>
    </div>,
    document.body,
  )
}
