import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const plans = [
  {
    nameKey: 'pricing.free.name',
    monthlyPrice: 0,
    yearlyPrice: 0,
    descriptionKey: 'pricing.free.description',
    featureKeys: [
      'pricing.free.feature1',
      'pricing.free.feature2',
      'pricing.free.feature3',
      'pricing.free.feature4',
      'pricing.free.feature5',
      'pricing.free.feature6',
      'pricing.free.feature7',
    ],
    ctaKey: 'pricing.free.cta',
    popular: false,
  },
  {
    nameKey: 'pricing.pro.name',
    monthlyPrice: 5,
    yearlyPrice: 49,
    descriptionKey: 'pricing.pro.description',
    featureKeys: [
      'pricing.pro.feature1',
      'pricing.pro.feature2',
      'pricing.pro.feature3',
      'pricing.pro.feature4',
      'pricing.pro.feature5',
      'pricing.pro.feature6',
    ],
    ctaKey: 'pricing.pro.cta',
    popular: true,
  },
  {
    nameKey: 'pricing.premium.name',
    monthlyPrice: 12,
    yearlyPrice: 118,
    descriptionKey: 'pricing.premium.description',
    featureKeys: [
      'pricing.premium.feature1',
      'pricing.premium.feature2',
      'pricing.premium.feature3',
      'pricing.premium.feature4',
      'pricing.premium.feature5',
      'pricing.premium.feature6',
    ],
    ctaKey: 'pricing.premium.cta',
    popular: false,
  },
]

export default function Pricing() {
  const { t } = useTranslation()
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            {t('pricing.title')}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span
            className={`text-sm font-medium ${!yearly ? 'text-slate-900' : 'text-slate-500'}`}
          >
            {t('pricing.monthly')}
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors border-none cursor-pointer ${
              yearly ? 'bg-primary-600' : 'bg-slate-300'
            }`}
            role="switch"
            aria-checked={yearly}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                yearly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${yearly ? 'text-slate-900' : 'text-slate-500'}`}
          >
            {t('pricing.yearly')}
          </span>
          {yearly && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              {t('pricing.save')}
            </span>
          )}
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.nameKey}
              className={`relative p-8 rounded-2xl border ${
                plan.popular
                  ? 'border-primary-600 shadow-xl shadow-primary-600/10 scale-105'
                  : 'border-slate-200'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold text-white bg-primary-600 rounded-full">
                  {t('pricing.mostPopular')}
                </span>
              )}

              <h3 className="text-lg font-semibold text-slate-900">
                {t(plan.nameKey)}
              </h3>
              <p className="text-sm text-slate-500 mt-1">{t(plan.descriptionKey)}</p>

              <div className="mt-6 mb-8">
                <span className="text-4xl font-bold text-slate-900">
                  ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                {plan.monthlyPrice > 0 && (
                  <span className="text-slate-500 ml-1">
                    {yearly ? t('pricing.perYear') : t('pricing.perMonth')}
                  </span>
                )}
              </div>

              <a
                href={`${APP_URL}/register`}
                className={`block w-full text-center px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors no-underline ${
                  plan.popular
                    ? 'text-white bg-primary-600 hover:bg-primary-700'
                    : 'text-primary-600 bg-primary-50 hover:bg-primary-100'
                }`}
              >
                {t(plan.ctaKey)}
              </a>

              <ul className="mt-8 space-y-3">
                {plan.featureKeys.map((featureKey) => (
                  <li
                    key={featureKey}
                    className="flex items-start gap-3 text-sm text-slate-600"
                  >
                    <Check
                      size={16}
                      className="text-primary-600 mt-0.5 shrink-0"
                    />
                    {t(featureKey)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
