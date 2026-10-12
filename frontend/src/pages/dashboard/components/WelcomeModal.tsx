import { useTranslation } from 'react-i18next'
import { Sparkles, FileSpreadsheet, Globe, Keyboard, Users, Puzzle } from 'lucide-react'
import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'

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
    color: 'text-primary-600 dark:text-primary-400',
    bg: 'bg-primary-100 dark:bg-primary-900/30',
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
    color: 'text-slate-600 dark:text-slate-300',
    bg: 'bg-slate-100 dark:bg-slate-700/60',
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

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} labelledBy="welcome-title" size="md">
      <h2 id="welcome-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 pr-10">
        {t('welcome.title')}
      </h2>
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
      <Button fullWidth onClick={handleClose} data-autofocus>
        {t('welcome.getStarted')}
      </Button>
    </Modal>
  )
}
