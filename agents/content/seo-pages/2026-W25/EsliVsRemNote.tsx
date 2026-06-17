/**
 * SEO Landing Page: Esli vs RemNote
 * Route: /compare/remnote
 * Meta title: Esli vs RemNote — Which Is Better for Flashcards? | Esli
 * Meta description: Esli vs RemNote compared honestly. Both have spaced repetition — Esli adds AI generation so you get cards without taking notes first. Free comparison.
 * Target keywords: Esli vs RemNote, RemNote alternative, RemNote flashcard alternative, note-taking with spaced repetition, RemNote vs Anki
 * Week: 2026-W25
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
      name: 'Is Esli better than RemNote for flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on your workflow. Esli is better if you want AI to generate complete flashcard decks from any topic without writing notes first — type a subject and get cards in seconds. RemNote is better if you want a combined note-taking + spaced repetition system where flashcards auto-generate from your notes. If you mainly need flashcards and not a knowledge management system, Esli is faster and simpler.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is RemNote free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RemNote has a free tier with limitations (limited flashcard count, limited PDF upload, limited AI features). Full features require a paid plan ($8-$12/month). Esli is completely free with no card limits, unlimited AI generation, and full spaced repetition — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate flashcards from PDFs like RemNote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — textbook, lecture slides, research paper — and Esli\'s AI extracts the key concepts, definitions, and vocabulary into a complete flashcard deck automatically. You don\'t need to annotate the PDF or write notes; the AI generates the cards directly from the content.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli have note-taking features like RemNote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli is focused on flashcard generation and spaced repetition study — it does not have bidirectional linking, knowledge graphs, or a hierarchical note-taking system like RemNote. If you want a combined notes + flashcards knowledge base, RemNote is the better tool. If you just want fast, AI-generated flashcards with excellent spaced repetition, Esli is simpler and free.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the main difference between how Esli and RemNote create flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RemNote\'s flashcards come from your notes — you write hierarchical "rems" and they become cards. This works well if you already take notes in RemNote, but means you must write notes before you can study. Esli generates cards directly from any topic or PDF with AI — no note-writing required. Type "pharmacology drug classes" and get 25 cards in seconds, without ever touching a note editor.',
      },
    },
  ],
}

const comparisonRows = [
  {
    feature: 'AI flashcard generation from any topic',
    esli: true,
    remnote: false,
    note: 'Type any topic; Esli generates cards instantly — no notes needed',
  },
  {
    feature: 'Spaced repetition',
    esli: true,
    remnote: true,
    note: 'Both have strong SRS implementations',
  },
  {
    feature: 'PDF → flashcards (no annotation needed)',
    esli: true,
    remnote: false,
    note: 'Esli extracts cards from any PDF automatically; RemNote requires in-PDF annotation',
  },
  {
    feature: 'Free with no card limits',
    esli: true,
    remnote: false,
    note: 'RemNote free tier has flashcard and PDF limits',
  },
  {
    feature: '14 interface languages',
    esli: true,
    remnote: false,
    note: 'Esli supports 14 interface languages; RemNote is English-first',
  },
  {
    feature: 'Browser extension',
    esli: true,
    remnote: true,
    note: 'Both have browser extensions for saving content while browsing',
  },
  {
    feature: 'Note-taking + knowledge base',
    esli: false,
    remnote: true,
    note: 'RemNote is a full PKM system with hierarchical notes and bi-directional links',
  },
  {
    feature: 'Bidirectional linking',
    esli: false,
    remnote: true,
    note: 'RemNote links notes like Roam/Obsidian; Esli has no note graph',
  },
  {
    feature: 'Cards auto-generated from your notes',
    esli: false,
    remnote: true,
    note: 'RemNote creates flashcards from your note hierarchy; Esli generates from topics',
  },
  {
    feature: 'Guest mode (no account)',
    esli: true,
    remnote: false,
    note: 'Esli works without an account; RemNote requires signup',
  },
  {
    feature: 'No subscription needed for full access',
    esli: true,
    remnote: false,
    note: 'RemNote Pro is $8-$12/month for full features',
  },
]

export default function EsliVsRemNotePage() {
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
                Honest Comparison
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Esli vs RemNote
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Both have spaced repetition. The key difference: RemNote generates flashcards from notes you write. Esli generates flashcards from any topic — no notes required, just AI.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Try Esli Free — No Card Limits
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#comparison-table"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Full Comparison
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Key difference callout */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-2xl border border-slate-200">
                <div className="text-2xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">RemNote's approach</h3>
                <p className="text-slate-600 leading-relaxed">
                  Take notes in RemNote's hierarchical editor. Your notes automatically become flashcards. Great if you already think in notes and want a combined knowledge management + study system.
                </p>
                <p className="mt-3 text-slate-500 text-sm">
                  Best for: students who love note-taking, knowledge workers building a personal knowledge graph.
                </p>
              </div>
              <div className="p-8 bg-primary-50 rounded-2xl border border-primary-200">
                <div className="text-2xl mb-4">✨</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Esli's approach</h3>
                <p className="text-slate-600 leading-relaxed">
                  Skip the notes. Type any topic or upload a PDF — AI generates a complete, study-ready flashcard deck in seconds. No note-writing, no template setup, no time spent making cards.
                </p>
                <p className="mt-3 text-slate-500 text-sm">
                  Best for: students who want to study fast, anyone who hates making cards manually.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison-table" className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Feature comparison
              </h2>
              <p className="mt-4 text-slate-600 max-w-xl mx-auto">
                An honest side-by-side. Each tool has real strengths — pick based on how you actually study.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 font-semibold text-slate-700 w-1/2">Feature</th>
                    <th className="text-center px-4 py-4 font-semibold text-primary-700 w-1/4">
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-5 h-5 bg-primary-600 rounded flex items-center justify-center">
                          <span className="text-white font-bold text-xs">E</span>
                        </div>
                        Esli
                      </div>
                    </th>
                    <th className="text-center px-4 py-4 font-semibold text-slate-500 w-1/4">RemNote</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-800">
                        <div>{row.feature}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{row.note}</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        {row.esli ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 bg-primary-100 rounded-full">
                            <Check size={14} className="text-primary-600" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-7 h-7 bg-slate-100 rounded-full">
                            <X size={14} className="text-slate-400" />
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {row.remnote ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 bg-slate-100 rounded-full">
                            <Check size={14} className="text-slate-500" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-7 h-7 bg-slate-100 rounded-full">
                            <X size={14} className="text-slate-400" />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Who should use which */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Which should you use?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-primary-700 mb-4">Choose Esli if you...</h3>
                <ul className="space-y-3">
                  {[
                    'Want AI to generate complete decks without writing notes',
                    'Need to study from PDF textbooks without annotation',
                    'Study multiple subjects and want fast deck creation',
                    'Use the app in a language other than English',
                    'Want 100% free with no feature limitations',
                    'Prefer a clean, simple study interface over a complex PKM tool',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={15} className="text-primary-600 shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-white rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-700 mb-4">Choose RemNote if you...</h3>
                <ul className="space-y-3">
                  {[
                    'Already take detailed notes and want them to become flashcards',
                    'Want a combined PKM + SRS system in one place',
                    'Love Roam/Obsidian-style bidirectional linking',
                    'Want to annotate PDFs with inline flashcard creation',
                    'Need a knowledge graph connecting all your study materials',
                    'Are comfortable paying for a premium tool with richer features',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={15} className="text-slate-400 shrink-0 mt-0.5" />
                      {point}
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
                Esli vs RemNote — FAQs
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
              Want flashcards without the note-taking?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Type any topic, get a complete deck in seconds. Free with no card limits, no subscription.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Try Esli Free — Generate Your First Deck
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also comparing other tools?{' '}
              <a href="/compare/anki" className="text-white underline hover:no-underline">
                Esli vs Anki
              </a>{' '}
              and{' '}
              <a href="/compare/quizlet" className="text-white underline hover:no-underline">
                Esli vs Quizlet
              </a>{' '}
              comparisons are available too.
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
