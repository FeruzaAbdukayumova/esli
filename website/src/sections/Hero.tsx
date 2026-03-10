import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Sparkles } from 'lucide-react'

const APP_URL = 'https://flashcards-app.com'

export default function Hero() {
  const { t } = useTranslation()
  const [flipped, setFlipped] = useState(false)

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50/30 -z-10" />
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
            <Sparkles size={14} />
            {t('hero.badge')}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            {t('hero.titleStart')}{' '}
            <span className="text-primary-600">{t('hero.titleHighlight')}</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
            >
              {t('hero.ctaPrimary')}
              <ArrowRight size={18} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
            >
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </div>

        {/* Hero visual — interactive flashcard */}
        <div className="mt-16 flex justify-center">
          <div className="relative w-80 h-48">
            {/* Decorative offset card */}
            <div className="absolute top-4 left-4 w-full h-full bg-primary-100 rounded-2xl border border-primary-200 shadow-lg" />
            {/* Flippable card */}
            <div
              className="relative w-full h-full cursor-pointer [perspective:1200px]"
              onClick={() => setFlipped((f) => !f)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
              >
                {/* Front face */}
                <div className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-xl flex flex-col items-center justify-center p-6 [backface-visibility:hidden]">
                  <p className="text-sm text-slate-400 mb-2">{t('hero.cardFront')}</p>
                  <p className="text-xl font-semibold text-slate-800">{t('hero.cardQuestion')}</p>
                  <div className="absolute bottom-3 right-4 text-xs text-slate-300">{t('hero.tapToFlip')}</div>
                </div>
                {/* Back face */}
                <div className="absolute inset-0 bg-white rounded-2xl border border-primary-300 shadow-xl flex flex-col items-center justify-center p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="text-sm text-primary-500 mb-2">{t('hero.cardBack')}</p>
                  <p className="text-center text-lg text-slate-700">{t('hero.cardAnswer')}</p>
                  <div className="absolute bottom-3 right-4 text-xs text-slate-300">{t('hero.tapToFlip')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
