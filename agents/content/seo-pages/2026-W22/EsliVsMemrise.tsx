/**
 * SEO Landing Page: Esli vs Memrise Comparison
 * Route: /compare/memrise
 * Meta title: Esli vs Memrise — Which Is Better in 2026? | Esli
 * Meta description: Comparing Esli and Memrise? Esli generates flashcards with AI from any topic or PDF. Memrise uses curated courses. Honest feature comparison.
 * Target keywords: Memrise alternative, Esli vs Memrise, best language learning app 2026, free Memrise alternative, Memrise vs AI flashcards
 * Week: 2026-W22
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Check, X, ChevronDown } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Esli free compared to Memrise?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli is completely free — no paywalled features. Memrise has a free tier with limited content and a Pro plan (~$8.49/month or ~$59.99/year) that unlocks all courses and features.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli replace Memrise for language learning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on your goal. Memrise offers structured, gamified language courses with native speaker video clips. Esli lets you generate AI flashcards on any language topic — vocabulary, grammar, idioms — and study with spaced repetition. Esli is better if you want to learn specific vocabulary or supplement existing courses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli have pre-made language decks like Memrise?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli has 800+ community flashcard decks including language vocabulary decks for Spanish, French, Japanese, German, and more. But the main advantage is AI generation — type any vocabulary topic and get a custom deck in seconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which app is better for Japanese or Korean vocabulary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Memrise has curated JLPT and Korean vocabulary courses with native speaker audio. Esli lets you generate custom vocabulary lists for any JLPT level, topic, or grammar point — and supports 14 interface languages. For deep structured learning, Memrise courses help; for custom vocab drilling, Esli is faster.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli support spaced repetition like Memrise?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli uses the SM-2 spaced repetition algorithm — the same algorithm used by Anki. Memrise also uses spaced repetition with a custom "membot" scheduling system. Both apps resurface cards at optimal intervals, but Esli\'s SM-2 is the most widely validated algorithm for long-term retention.',
      },
    },
  ],
}

type FeatureRow = {
  feature: string
  esli: string | boolean
  memrise: string | boolean
  note?: string
}

const features: FeatureRow[] = [
  { feature: 'Price', esli: 'Free (all features)', memrise: 'Free tier + Pro (~$8.49/mo)', note: 'Esli is fully free' },
  { feature: 'AI flashcard generation', esli: true, memrise: false, note: 'Esli\'s core feature' },
  { feature: 'PDF upload to flashcards', esli: true, memrise: false },
  { feature: 'Spaced repetition', esli: 'SM-2 (Anki algorithm)', memrise: 'Custom membot scheduler' },
  { feature: 'Pre-made decks', esli: '800+ community decks', memrise: '1000s of curated courses' },
  { feature: 'Native speaker audio', esli: false, memrise: true, note: 'Memrise strength' },
  { feature: 'Gamification', esli: false, memrise: true, note: 'Memrise streaks, leaderboards' },
  { feature: 'Interface languages', esli: '14 languages', memrise: '~20 languages' },
  { feature: 'Browser extension', esli: true, memrise: false },
  { feature: 'No account required (guest mode)', esli: true, memrise: false },
  { feature: 'Custom card creation', esli: true, memrise: 'Limited (pro)' },
  { feature: 'Math / KaTeX support', esli: true, memrise: false },
]

export default function EsliVsMemrisePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const renderCell = (val: string | boolean) => {
    if (val === true) return <Check size={18} className="text-primary-600 mx-auto" />
    if (val === false) return <X size={18} className="text-slate-300 mx-auto" />
    return <span className="text-sm text-slate-700">{val}</span>
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <a href="https://esli.app" className="flex items-center gap-2 no-underline">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Esli</span>
            </a>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors no-underline"
            >
              Try Esli Free
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50/30 -z-10" />
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                <Sparkles size={14} />
                Honest Comparison - 2026
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Esli vs Memrise —<br />
                <span className="text-primary-600">Which Is Better?</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Memrise is great for structured language courses with native speaker audio. Esli is better if you want AI-generated flashcards on any topic — not just language courses — with spaced repetition. Here's the honest breakdown.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
                >
                  Try Esli Free — No Account Needed
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#comparison"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Full Comparison
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TL;DR Summary Cards */}
        <section className="py-20 sm:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
              TL;DR — who should choose which app
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl border-2 border-primary-200 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">E</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Choose Esli if...</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'You want AI to generate flashcards from any topic instantly',
                    'You need to turn a PDF, textbook, or notes into a deck',
                    'You\'re studying subjects beyond language learning (exams, coding, medicine)',
                    'You want fully free access without a subscription',
                    'You prefer the battle-tested SM-2 spaced repetition algorithm',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={16} className="text-primary-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center">
                    <span className="text-slate-600 font-bold text-sm">M</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Choose Memrise if...</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'You want gamified, structured language learning courses',
                    'Native speaker video clips are important to your learning style',
                    'You prefer guided courses with preset lesson paths',
                    'You enjoy streaks, points, and leaderboard competition',
                    'You\'re focused on one of Memrise\'s supported languages',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
              Feature comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-slate-500 border-b border-slate-200 w-1/2">Feature</th>
                    <th className="text-center p-4 text-sm font-semibold text-primary-600 border-b border-primary-200 bg-primary-50 rounded-t-lg w-1/4">Esli</th>
                    <th className="text-center p-4 text-sm font-semibold text-slate-500 border-b border-slate-200 w-1/4">Memrise</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                      <td className="p-4 text-sm text-slate-700 font-medium border-b border-slate-100">
                        {row.feature}
                        {row.note && <span className="ml-2 text-xs text-slate-400">({row.note})</span>}
                      </td>
                      <td className="p-4 text-center border-b border-primary-100 bg-primary-50/30">
                        {renderCell(row.esli)}
                      </td>
                      <td className="p-4 text-center border-b border-slate-100">
                        {renderCell(row.memrise)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Esli vs Memrise FAQs
              </h2>
            </div>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-center justify-between w-full px-6 py-4 text-left bg-transparent border-none cursor-pointer"
                  >
                    <span className="text-base font-medium text-slate-900">{item.name}</span>
                    <ChevronDown
                      size={20}
                      className={`text-slate-400 transition-transform shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4">
                      <p className="text-slate-600 leading-relaxed">{item.acceptedAnswer.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Try the AI-powered Memrise alternative
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards on any topic — not just preset language courses. Free, forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Get Started with Esli — Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also comparing other apps? See{' '}
              <a href="/compare/anki" className="text-white underline hover:no-underline">Esli vs Anki</a>,{' '}
              <a href="/compare/quizlet" className="text-white underline hover:no-underline">Esli vs Quizlet</a>,{' '}
              and{' '}
              <a href="/compare/brainscape" className="text-white underline hover:no-underline">Esli vs Brainscape</a>.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <a href="https://esli.app" className="flex items-center gap-2 justify-center mb-4 no-underline">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold text-white">Esli</span>
            </a>
            <p className="text-sm">AI-powered flashcards with spaced repetition. Free forever.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
              <a href="https://esli.app" className="hover:text-white transition-colors no-underline">Home</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
              <a href={`${APP_URL}/login`} className="hover:text-white transition-colors no-underline">Log In</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
