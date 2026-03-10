import { useTranslation } from 'react-i18next'
import {
  Sparkles,
  Brain,
  Languages,
  FileSpreadsheet,
  Puzzle,
  Users,
} from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    titleKey: 'features.aiGeneration.title',
    descriptionKey: 'features.aiGeneration.description',
    color: 'text-amber-600',
    bg: 'bg-amber-100',
  },
  {
    icon: Brain,
    titleKey: 'features.spacedRepetition.title',
    descriptionKey: 'features.spacedRepetition.description',
    color: 'text-primary-600',
    bg: 'bg-primary-100',
  },
  {
    icon: Languages,
    titleKey: 'features.languages.title',
    descriptionKey: 'features.languages.description',
    color: 'text-emerald-600',
    bg: 'bg-emerald-100',
  },
  {
    icon: FileSpreadsheet,
    titleKey: 'features.importExport.title',
    descriptionKey: 'features.importExport.description',
    color: 'text-sky-600',
    bg: 'bg-sky-100',
  },
  {
    icon: Puzzle,
    titleKey: 'features.extension.title',
    descriptionKey: 'features.extension.description',
    color: 'text-rose-600',
    bg: 'bg-rose-100',
  },
  {
    icon: Users,
    titleKey: 'features.community.title',
    descriptionKey: 'features.community.description',
    color: 'text-violet-600',
    bg: 'bg-violet-100',
  },
]

export default function Features() {
  const { t } = useTranslation()

  return (
    <section id="features" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            {t('features.title')}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.titleKey}
              className="p-6 rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all group"
            >
              <div
                className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}
              >
                <feature.icon className={`${feature.color}`} size={24} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
