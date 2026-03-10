import { useTranslation } from 'react-i18next'
import { PenLine, RotateCcw, Trophy } from 'lucide-react'

const steps = [
  {
    icon: PenLine,
    number: '01',
    titleKey: 'howItWorks.step1.title',
    descriptionKey: 'howItWorks.step1.description',
  },
  {
    icon: RotateCcw,
    number: '02',
    titleKey: 'howItWorks.step2.title',
    descriptionKey: 'howItWorks.step2.description',
  },
  {
    icon: Trophy,
    number: '03',
    titleKey: 'howItWorks.step3.title',
    descriptionKey: 'howItWorks.step3.description',
  },
]

export default function HowItWorks() {
  const { t } = useTranslation()

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            {t('howItWorks.title')}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <div key={step.titleKey} className="text-center">
              {/* Icon circle */}
              <div className="relative inline-flex mb-6">
                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-600/25">
                  <step.icon className="text-white" size={28} />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-primary-600 rounded-full flex items-center justify-center text-xs font-bold text-primary-600">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {t(step.titleKey)}
              </h3>
              <p className="text-slate-600 leading-relaxed max-w-xs mx-auto">
                {t(step.descriptionKey)}
              </p>

              {/* Connector line (hidden on last item and mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
