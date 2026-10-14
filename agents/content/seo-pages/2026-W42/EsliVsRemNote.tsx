/**
 * SEO Landing Page: Esli vs RemNote
 * Route: /compare/esli-vs-remnote
 * Meta title: Esli vs RemNote — Flashcards vs PKM | Esli
 * Meta description: RemNote is powerful but complex. Esli is fast, focused on flashcards,
 *   and AI-powered. Honest comparison. Free flashcard alternative.
 * Target keywords: RemNote alternative, RemNote vs flashcard app, RemNote spaced repetition,
 *   RemNote alternative free, RemNote vs Anki, simpler RemNote alternative, best RemNote alternative
 * Week: 2026-W42
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
      name: 'What is the main difference between Esli and RemNote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RemNote is a personal knowledge management (PKM) tool that includes spaced repetition as one feature — it also has a document editor, knowledge graph, PDF annotation, and concept map builder. Esli is a dedicated flashcard app focused entirely on flashcard creation, spaced repetition, and AI generation. If your goal is a networked second brain with flashcards embedded, RemNote is the right tool. If your goal is the fastest, easiest way to make and study flashcards — especially from AI generation or PDF uploads — Esli is built for that.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free compared to RemNote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli is fully free for unlimited flashcards and decks with spaced repetition included. No account required to start. RemNote\'s free tier has limits on documents and flashcards; RemNote Pro costs $8/month. Both have paid tiers for AI features, but Esli\'s core flashcard experience is completely free with no paywall on spaced repetition or deck creation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli have AI flashcard generation like RemNote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli generates flashcards from a topic description or PDF upload using AI — type any subject and get a complete deck in seconds. RemNote also has AI flashcard generation from documents. The key difference: Esli\'s entire interface is designed around flashcard creation and study, so the AI generation workflow is simpler and faster. Esli also has a browser extension for capturing any web text as a flashcard.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is RemNote better than Esli for medical students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RemNote is popular with medical students because of its PDF annotation and nested flashcard system (hierarchical rem-cards that mirror clinical reasoning). Esli has a simpler card model but faster AI generation from uploaded PDFs — paste your USMLE outline and get 50 cards in 12 seconds. Both use SM-2 spaced repetition. The choice depends on whether you want a full PKM system (RemNote) or just the fastest, cleanest way to make and study flashcards (Esli).',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I import my RemNote flashcards into Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Export your RemNote cards as CSV or structured text, then import into Esli using the CSV/Excel import feature. Esli supports any spreadsheet format with question and answer columns. For large decks, the import takes seconds.',
      },
    },
  ],
}

type FeatureRow = {
  feature: string
  esli: boolean | string
  remnote: boolean | string
}

const comparisonRows: FeatureRow[] = [
  { feature: 'AI flashcard generation from topic', esli: true, remnote: true },
  { feature: 'AI generation from PDF upload', esli: true, remnote: true },
  { feature: 'Spaced repetition (SM-2)', esli: true, remnote: true },
  { feature: 'Free (unlimited flashcards)', esli: true, remnote: false },
  { feature: 'No signup required to start', esli: true, remnote: false },
  { feature: 'Browser extension (right-click → flashcard)', esli: true, remnote: false },
  { feature: '14 interface languages', esli: true, remnote: false },
  { feature: 'Card translation (13 languages)', esli: true, remnote: false },
  { feature: 'Guest mode (no account)', esli: true, remnote: false },
  { feature: 'Personal knowledge management (PKM)', esli: false, remnote: true },
  { feature: 'Networked notes / knowledge graph', esli: false, remnote: true },
  { feature: 'PDF annotation and highlighting', esli: false, remnote: true },
  { feature: 'Hierarchical/nested flashcards', esli: false, remnote: true },
  { feature: 'Mobile app', esli: 'Web (mobile-responsive)', remnote: true },
]

export default function EsliVsRemNotePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const renderCell = (val: boolean | string) => {
    if (val === true) return <Check size={18} className="text-green-500 mx-auto" />
    if (val === false) return <X size={18} className="text-slate-300 mx-auto" />
    return <span className="text-xs text-slate-500">{val}</span>
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
              Get Started Free
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
                Honest Comparison
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Esli vs{' '}
                <span className="text-slate-500">RemNote</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                RemNote is a powerful knowledge management system. Esli is a focused flashcard app with AI generation. They solve different problems — here's an honest look at both.
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

        {/* Product Summary */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 bg-white rounded-2xl border-2 border-primary-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">E</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Esli</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  A dedicated AI-powered flashcard app. Type any topic, upload a PDF, or use the browser extension — and get a complete flashcard deck in seconds. Free, with spaced repetition included. No account required to start.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['AI Generation', 'Free Forever', 'Browser Extension', '14 Languages'].map((t) => (
                    <span key={t} className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">{t}</span>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">R</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">RemNote</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  A personal knowledge management (PKM) system that includes flashcard creation and spaced repetition. Also has a document editor, knowledge graph, PDF annotation, and hierarchical note structure.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['PKM System', 'Knowledge Graph', 'PDF Annotation', 'Nested Flashcards'].map((t) => (
                    <span key={t} className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Feature comparison</h2>
              <p className="mt-4 text-lg text-slate-600">An honest look at what each tool does well.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 w-1/2">Feature</th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-primary-700 w-1/4">Esli</th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-slate-500 w-1/4">RemNote</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="px-6 py-3 text-sm text-slate-700">{row.feature}</td>
                      <td className="px-4 py-3 text-center">{renderCell(row.esli)}</td>
                      <td className="px-4 py-3 text-center">{renderCell(row.remnote)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When to use each */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">When to use each</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white rounded-2xl border-2 border-primary-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Choose Esli if you want to...</h3>
                <ul className="space-y-3">
                  {[
                    'Generate flashcards from any topic with AI in seconds',
                    'Upload a PDF and get a deck without manual card creation',
                    'Study without making an account first',
                    'Use a browser extension to capture any web text as a flashcard',
                    'Study in multiple languages with built-in translation',
                    'Start studying now, with zero setup',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check size={16} className="text-primary-600 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Choose RemNote if you want to...</h3>
                <ul className="space-y-3">
                  {[
                    'Build a networked knowledge base, not just flashcards',
                    'Annotate PDFs and link notes directly to flashcards',
                    'Use hierarchical "rem" cards that reflect concept structure',
                    'Connect your flashcard review to a knowledge graph',
                    'Have flashcards and long-form notes in the same tool',
                    'Build in public or share your knowledge graph',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100 text-center">
              <p className="text-slate-700 font-medium">Use both? Sure.</p>
              <p className="mt-2 text-sm text-slate-600">
                Many students use RemNote for long-form notes and knowledge management, then export key concepts to Esli for fast AI-powered flashcard generation and spaced repetition study sessions. They serve different phases of learning.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Esli vs RemNote FAQs
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
              Just want a fast, free flashcard app?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Esli is built for one thing: making and studying flashcards, as fast as possible, with AI that does the work. Free, no signup required, spaced repetition included.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Try Esli Free
              <ArrowRight size={18} />
            </a>
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
              <a href="/compare/esli-vs-anki" className="hover:text-white transition-colors no-underline">Esli vs Anki</a>
              <a href="/compare/esli-vs-quizlet" className="hover:text-white transition-colors no-underline">Esli vs Quizlet</a>
              <a href="/compare/esli-vs-kahoot" className="hover:text-white transition-colors no-underline">Esli vs Kahoot</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
