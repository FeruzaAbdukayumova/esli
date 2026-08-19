/**
 * SEO Landing Page: Esli vs GoConqr — Comparison Page
 * Route: /compare/esli-vs-goconqr
 * Meta title: GoConqr Alternative Free — Esli vs GoConqr | Esli
 * Meta description: GoConqr limits free users and lacks AI generation. Esli is a free GoConqr alternative with AI flashcard creation and spaced repetition. Honest comparison.
 * Target keywords: GoConqr alternative, GoConqr alternative free, Esli vs GoConqr,
 *   free GoConqr alternative, GoConqr flashcard app, best flashcard app Europe
 * Week: 2026-W34
 * Audience: EU/UK/Ireland students familiar with GoConqr (popular in those markets)
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, ChevronDown, Check, X } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the main difference between Esli and GoConqr?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The biggest difference is AI generation. Esli lets you type any topic or upload a PDF and generates a complete flashcard deck automatically. GoConqr requires you to create every card manually. Esli is also fully free with no storage limits; GoConqr\'s free tier has content and storage limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free compared to GoConqr?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free — unlimited AI flashcard generation, spaced repetition, PDF upload, and 13-language translations. GoConqr offers a free tier but limits the number of resources (flashcard sets, mind maps, quizzes) you can create and store.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli work in the UK and Ireland like GoConqr does?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli works everywhere — web app accessible from any browser, no download required. Esli also supports 13 interface languages and card translations. GoConqr has historically been strongest in Ireland and the UK; Esli serves those students equally well with the added benefit of AI generation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli replace GoConqr\'s mind maps and quizzes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli focuses on flashcards and spaced repetition — it does not have mind maps or quiz builder tools like GoConqr. If you rely heavily on GoConqr\'s mind mapping or flowchart features, GoConqr may still be worth using for those. But for flashcard creation and study, Esli\'s AI generation is a significant upgrade.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli have spaced repetition like GoConqr?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli uses the SM-2 spaced repetition algorithm — the same algorithm used by Anki, one of the most evidence-based study tools available. GoConqr has a basic spaced repetition feature. Esli\'s implementation resurfaces cards at mathematically optimal intervals for long-term retention.',
      },
    },
  ],
}

type FeatureStatus = boolean | 'partial'

interface Feature {
  feature: string
  esli: FeatureStatus
  goconqr: FeatureStatus
  note?: string
}

const comparisonRows: Feature[] = [
  { feature: 'AI flashcard generation', esli: true, goconqr: false, note: 'Esli: type a topic, get a full deck instantly' },
  { feature: 'PDF upload → flashcards', esli: true, goconqr: false },
  { feature: 'Spaced repetition (SM-2)', esli: true, goconqr: 'partial', note: 'GoConqr: basic review scheduling' },
  { feature: 'Fully free (no content limits)', esli: true, goconqr: false, note: 'GoConqr: free tier limits resources' },
  { feature: 'No account required to start', esli: true, goconqr: false },
  { feature: 'Browser extension', esli: true, goconqr: false },
  { feature: '13-language card translations', esli: true, goconqr: false },
  { feature: 'Mind maps & flowcharts', esli: false, goconqr: true, note: 'GoConqr specialty' },
  { feature: 'Quiz builder', esli: false, goconqr: true },
  { feature: 'Note-taking tools', esli: false, goconqr: true },
  { feature: 'Community deck sharing', esli: true, goconqr: true },
  { feature: 'Mobile app', esli: 'partial', goconqr: true, note: 'Esli: mobile-optimized web app; no native app yet' },
]

function StatusIcon({ status }: { status: FeatureStatus }) {
  if (status === true) return <Check className="mx-auto text-emerald-600" size={20} />
  if (status === false) return <X className="mx-auto text-slate-300" size={20} />
  return <span className="text-xs text-amber-600 font-medium">Partial</span>
}

export default function EsliVsGoConqrPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
              Get Started Free
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50/30 -z-10" />
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                <Sparkles size={14} />
                Honest Comparison
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Esli vs GoConqr
              </h1>
              <p className="mt-4 text-xl font-medium text-slate-600">
                Free AI generation vs. manual card creation
              </p>

              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                GoConqr is a popular study platform in Ireland and the UK. Esli takes a different approach: AI generates your flashcard deck from any topic or PDF — no manual card creation. This is an honest comparison of what each tool does well.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
                >
                  Try Esli Free
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

        {/* TL;DR Summary */}
        <section className="py-12 bg-primary-50 border-y border-primary-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-slate-900 text-center mb-8">TL;DR</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-primary-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">E</span>
                  </div>
                  <span className="font-bold text-lg text-slate-900">Esli</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2"><Check size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />AI generates your deck instantly — no manual card creation</li>
                  <li className="flex items-start gap-2"><Check size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />Upload any PDF and get flashcards in seconds</li>
                  <li className="flex items-start gap-2"><Check size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />Completely free, no content limits</li>
                  <li className="flex items-start gap-2"><Check size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />Evidence-based SM-2 spaced repetition</li>
                  <li className="flex items-start gap-2"><X size={15} className="text-slate-300 mt-0.5 flex-shrink-0" />No mind maps or quiz builder</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">G</span>
                  </div>
                  <span className="font-bold text-lg text-slate-900">GoConqr</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2"><Check size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />Mind maps, quizzes, notes, and flashcards in one place</li>
                  <li className="flex items-start gap-2"><Check size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />Large community of shared study resources</li>
                  <li className="flex items-start gap-2"><Check size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />Native mobile apps</li>
                  <li className="flex items-start gap-2"><X size={15} className="text-slate-300 mt-0.5 flex-shrink-0" />No AI generation — all cards are manual</li>
                  <li className="flex items-start gap-2"><X size={15} className="text-slate-300 mt-0.5 flex-shrink-0" />Free tier limits content volume</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
              Full feature comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-4 pr-6 font-semibold text-slate-700 w-1/2">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-primary-700 w-1/4">Esli</th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-700 w-1/4">GoConqr</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 pr-6">
                        <p className="font-medium text-slate-800 text-sm">{row.feature}</p>
                        {row.note && <p className="text-xs text-slate-400 mt-0.5">{row.note}</p>}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <StatusIcon status={row.esli} />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <StatusIcon status={row.goconqr} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Which one is right for you */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
              Which one is right for you?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border-2 border-primary-200 p-8 shadow-sm">
                <h3 className="font-bold text-xl text-slate-900 mb-4">Choose Esli if...</h3>
                <ul className="space-y-3 text-slate-600">
                  {[
                    'You want AI to generate flashcards from a topic or PDF — not create them manually',
                    'You need to build decks quickly before exams or class',
                    'You want evidence-based spaced repetition (SM-2) for long-term retention',
                    'You study multiple languages or need card translations',
                    'You want a completely free tool with no content caps',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={`${APP_URL}/register`}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors no-underline"
                >
                  Try Esli Free <ArrowRight size={15} />
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h3 className="font-bold text-xl text-slate-900 mb-4">Stick with GoConqr if...</h3>
                <ul className="space-y-3 text-slate-600">
                  {[
                    'You rely on mind maps, flowcharts, or quizzes as core study tools',
                    'You want a native mobile app for iOS or Android',
                    'You\'re already embedded in a GoConqr study group or course',
                    'You prefer building all your own cards from scratch',
                    'You use GoConqr\'s note-taking and course builder features',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-slate-200">
              {faqSchema.mainEntity.map((item, i) => (
                <div key={i}>
                  <button
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-slate-900">{item.name}</span>
                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="pb-5 text-slate-600 leading-relaxed">{item.acceptedAnswer.text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Try AI-powered flashcards for free
            </h2>
            <p className="text-lg text-primary-100 mb-10">
              Generate your first deck in under a minute — no account needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-700 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Get Started Free
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-slate-500 mb-6">More comparisons</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Esli vs Anki', href: '/compare/anki' },
                { label: 'Esli vs Quizlet', href: '/compare/quizlet' },
                { label: 'Esli vs Brainscape', href: '/compare/brainscape' },
                { label: 'Esli vs Memrise', href: '/compare/memrise' },
                { label: 'Best Flashcard App', href: '/best-flashcard-app' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-primary-300 hover:text-primary-700 transition-colors no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a href="https://esli.app" className="flex items-center gap-2 no-underline">
              <div className="w-7 h-7 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">E</span>
              </div>
              <span className="text-lg font-bold text-slate-900">Esli</span>
            </a>
            <p className="text-sm text-slate-400">Free AI flashcard generator with spaced repetition.</p>
            <div className="flex gap-6">
              <a href="https://esli.app" className="text-sm text-slate-500 hover:text-slate-800 no-underline">Home</a>
              <a href={`${APP_URL}/register`} className="text-sm text-slate-500 hover:text-slate-800 no-underline">Get Started</a>
              <a href="https://esli.app/pricing" className="text-sm text-slate-500 hover:text-slate-800 no-underline">Pricing</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
