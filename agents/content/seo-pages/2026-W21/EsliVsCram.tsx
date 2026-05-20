/**
 * SEO Landing Page: Esli vs Cram Comparison
 * Route: /compare/cram
 * Meta title: Esli vs Cram — Which Flashcard App Is Better? (2026)
 * Meta description: Comparing Esli and Cram? Esli generates flashcards with AI from any topic or PDF. Cram requires manual entry. Free vs paid. Honest comparison.
 * Target keywords: Cram alternative, Esli vs Cram, Cram.com alternative, best flashcard app free
 * Week: 2026-W21
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
      name: 'What is the main difference between Esli and Cram?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The key difference is AI generation. Esli generates flashcard decks automatically from a topic or PDF in seconds. Cram.com requires you to create every card manually, or find and use a premade public deck. If you want instant card creation, Esli is the better choice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free compared to Cram?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli is completely free for core features including AI card generation and spaced repetition. Cram.com has a free tier with limited features and a Cram Plus subscription for advanced features. Esli\'s free plan is more generous for most learners.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli have spaced repetition like Cram?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli uses the SM-2 spaced repetition algorithm — the same algorithm that powers Anki. Cram.com includes a "Memorize" mode with some adaptive features, but Esli\'s SM-2 implementation is more scientifically grounded for long-term retention.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate flashcards from a PDF like Cram cannot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli lets you upload any PDF — textbook, lecture notes, study guide — and automatically generates a complete flashcard deck. Cram.com does not have PDF upload or AI generation features.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I choose Cram over Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cram has a large library of public community decks, especially for K-12 content. If you want to browse and use premade decks without creating your own, Cram\'s community library may have what you need. However, for AI generation, spaced repetition, or study card creation from scratch, Esli is the stronger option.',
      },
    },
  ],
}

const comparisonRows = [
  { feature: 'AI flashcard generation', esli: true, cram: false },
  { feature: 'Generate from a PDF', esli: true, cram: false },
  { feature: 'Generate from topic/text prompt', esli: true, cram: false },
  { feature: 'Spaced repetition (SM-2)', esli: true, cram: false, cramNote: 'Basic adaptive mode' },
  { feature: 'Free core features', esli: true, cram: false, cramNote: 'Limited free tier' },
  { feature: 'Works in browser (no install)', esli: true, cram: true },
  { feature: 'Browser extension', esli: true, cram: false },
  { feature: 'Manual card creation', esli: true, cram: true },
  { feature: 'Public community decks', esli: false, cram: true, esliNote: 'Curated premade decks' },
  { feature: 'Multiple choice / matching mode', esli: false, cram: true },
  { feature: '14 interface languages', esli: true, cram: false },
  { feature: 'Card translations', esli: true, cram: false },
]

export default function EsliVsCramPage() {
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
              Try Esli Free
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
                Honest Comparison — 2026
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Esli vs Cram — Which{' '}
                <span className="text-primary-600">Flashcard App</span>{' '}
                Is Better?
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Both are flashcard apps. The key difference: Esli generates cards with AI in seconds from any topic or PDF. Cram requires manual entry. Here's an honest side-by-side.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
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

        {/* TL;DR Cards */}
        <section className="py-20 sm:py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">TL;DR</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border-2 border-primary-300 p-8 shadow-lg shadow-primary-600/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">E</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">Esli</p>
                    <p className="text-xs text-primary-600 font-medium">Recommended</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><Check size={15} className="text-primary-600 shrink-0 mt-0.5" /> AI generates decks from any topic or PDF</li>
                  <li className="flex items-start gap-2"><Check size={15} className="text-primary-600 shrink-0 mt-0.5" /> SM-2 spaced repetition (same as Anki)</li>
                  <li className="flex items-start gap-2"><Check size={15} className="text-primary-600 shrink-0 mt-0.5" /> Free — no credit card required</li>
                  <li className="flex items-start gap-2"><Check size={15} className="text-primary-600 shrink-0 mt-0.5" /> Browser extension for on-the-go creation</li>
                  <li className="flex items-start gap-2"><Check size={15} className="text-primary-600 shrink-0 mt-0.5" /> 14 interface languages + card translations</li>
                </ul>
                <p className="mt-4 text-xs text-slate-500">Best for: anyone who wants to generate decks instead of build them manually.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                    <span className="text-slate-600 font-bold text-sm">C</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">Cram</p>
                    <p className="text-xs text-slate-400 font-medium">Established but limited</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><Check size={15} className="text-slate-400 shrink-0 mt-0.5" /> Large public community deck library</li>
                  <li className="flex items-start gap-2"><Check size={15} className="text-slate-400 shrink-0 mt-0.5" /> Multiple choice and matching modes</li>
                  <li className="flex items-start gap-2"><X size={15} className="text-red-400 shrink-0 mt-0.5" /> No AI generation</li>
                  <li className="flex items-start gap-2"><X size={15} className="text-red-400 shrink-0 mt-0.5" /> No PDF upload</li>
                  <li className="flex items-start gap-2"><X size={15} className="text-red-400 shrink-0 mt-0.5" /> No true spaced repetition</li>
                </ul>
                <p className="mt-4 text-xs text-slate-500">Best for: browsing premade K-12 decks without needing advanced study features.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Feature-by-feature comparison
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-4 pr-4 text-slate-600 font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 text-primary-600 font-bold">Esli</th>
                    <th className="text-center py-4 pl-4 text-slate-500 font-semibold">Cram</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-3 pr-4 text-slate-700">{row.feature}</td>
                      <td className="py-3 px-4 text-center">
                        {row.esli ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-100 rounded-full">
                            <Check size={13} className="text-primary-600" />
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">{row.esliNote || '-'}</span>
                        )}
                      </td>
                      <td className="py-3 pl-4 text-center">
                        {row.cram ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-slate-100 rounded-full">
                            <Check size={13} className="text-slate-500" />
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">{row.cramNote || '-'}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When to choose each */}
        <section className="py-20 sm:py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">When to choose each</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border border-primary-200 p-6">
                <h3 className="font-bold text-primary-600 text-lg mb-4">Choose Esli if you...</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    'Want cards generated in seconds without manual entry',
                    'Have a PDF (textbook, notes, study guide) to turn into flashcards',
                    'Study a specialized topic not covered by premade decks',
                    'Want real spaced repetition (SM-2) not just random review',
                    'Study in a language other than English',
                    'Are a student, professional, or language learner who values efficiency',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={14} className="text-primary-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-600 text-lg mb-4">Choose Cram if you...</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    'Want to browse a large library of premade K-12 decks',
                    'Prefer multiple choice or matching game modes',
                    'Are happy creating cards manually without AI help',
                    'Are a teacher who wants to assign premade sets to students',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={14} className="text-slate-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Esli vs Cram FAQs
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
              Ready to try the smarter flashcard app?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate your first AI flashcard deck in 30 seconds. Free, no account required to try.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Try Esli Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also comparing?{' '}
              <a href="/compare/anki" className="text-white underline hover:no-underline">Esli vs Anki</a>{' '}
              -{' '}
              <a href="/compare/quizlet" className="text-white underline hover:no-underline">Esli vs Quizlet</a>{' '}
              -{' '}
              <a href="/compare/brainscape" className="text-white underline hover:no-underline">Esli vs Brainscape</a>
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
