import { useTranslation } from 'react-i18next'
import { PenLine, FileSpreadsheet, Globe, Keyboard, Users, Puzzle } from 'lucide-react'
import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'

const STORAGE_KEY = 'flashcards-welcome-seen'

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
}

const FEATURES = [
  {
    icon: PenLine,
    titleKey: 'welcome.feature.aiGeneration',
    descKey: 'welcome.feature.aiGenerationDesc',
    chip: 'bg-lilac',
  },
  {
    icon: FileSpreadsheet,
    titleKey: 'welcome.feature.fileImport',
    descKey: 'welcome.feature.fileImportDesc',
    chip: 'bg-mint',
  },
  {
    icon: Globe,
    titleKey: 'welcome.feature.translation',
    descKey: 'welcome.feature.translationDesc',
    chip: 'bg-sky',
  },
  {
    icon: Keyboard,
    titleKey: 'welcome.feature.shortcuts',
    descKey: 'welcome.feature.shortcutsDesc',
    chip: 'bg-white',
  },
  {
    icon: Users,
    titleKey: 'welcome.feature.sharedDecks',
    descKey: 'welcome.feature.sharedDecksDesc',
    chip: 'bg-grass',
  },
  {
    icon: Puzzle,
    titleKey: 'welcome.feature.extension',
    descKey: 'welcome.feature.extensionDesc',
    chip: 'bg-bubblegum',
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
      <h2 id="welcome-title" className="font-display text-2xl leading-tight text-fg mb-1.5 pr-10 [text-wrap:balance]">
        {t('welcome.title')}
      </h2>
      <p className="text-[15px] text-muted mb-6">
        {t('welcome.subtitle')}
      </p>

      {/* Feature list */}
      <ul className="space-y-4 mb-7">
        {FEATURES.map((f) => (
          <li key={f.titleKey} className="flex items-start gap-3">
            <span className={`shrink-0 w-10 h-10 rounded-[12px] border-2 border-ink text-ink flex items-center justify-center ${f.chip}`}>
              <f.icon className="w-5 h-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-fg">
                {t(f.titleKey)}
              </p>
              <p className="text-sm text-muted mt-0.5">
                {t(f.descKey)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button fullWidth size="lg" onClick={handleClose} data-autofocus>
        {t('welcome.getStarted')}
      </Button>
    </Modal>
  )
}
