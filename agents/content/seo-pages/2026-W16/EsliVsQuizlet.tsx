/**
 * SEO Landing Page: Esli vs Quizlet — Comparison Page
 * Route: /compare/quizlet
 * Meta title: Esli vs Quizlet — Which Flashcard App Is Better?
 * Meta description: Esli vs Quizlet compared honestly. Quizlet has huge deck libraries — but Esli generates custom AI flashcards in seconds. Free. See the full comparison.
 * Target keywords: Esli vs Quizlet, Quizlet alternative, Quizlet alternative free, best flashcard app 2026
 * Week: 2026-W16
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
      name: 'Is Esli free like Quizlet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli\'s core features — AI flashcard generation, spaced repetition, PDF upload, deck sharing — are all free. Quizlet\'s free tier exists but hides key features (no offline, ads, limited AI) behind a Quizlet Plus paywall starting at $35.99/year. Esli gives you more for free.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli replace Quizlet for studying?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For most students, yes. Esli covers the core use case — creating and studying flashcards — and adds AI generation and proper spaced repetition (SM-2 algorithm). Where Quizlet has the edge is its massive community library of pre-built decks; if you rely heavily on those, you may want to use both tools or check Esli\'s shared decks first.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli have premade decks like Quizlet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli has 812+ shared community cards in its premade deck library, covering popular subjects. But the main strength of Esli vs Quizlet is that you don\'t need pre-made decks — the AI generates a custom deck from any topic in seconds. No searching, no hoping someone made what you need.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Quizlet have spaced repetition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quizlet has "Learn" mode which adapts card difficulty, but it does not use a proper spaced repetition algorithm like SM-2. Esli uses SM-2 — the same algorithm as Anki — which scientifically schedules reviews at the optimal intervals for long-term retention. This makes a measurable difference for retention-heavy subjects.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which app is better for language learning — Esli or Quizlet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli. You can generate vocabulary cards for any language level, topic, or exam (JLPT, DELE, TOEFL, etc.) in seconds with AI. Esli also supports 14 interface languages and has a built-in translation feature. Quizlet has more community vocabulary sets, but Esli lets you create exactly what you need rather than searching for the right deck.',
      },
    },
  ],
}

type Feature = {
  feature: string
  esli: { val: boolean | string; note?: string }
  quizlet: { val: boolean | string; note?: string }
}

const comparisonFeatures: Feature[] = [
  {
    feature: 'AI flashcard generation',
    esli: { val: true, note: 'Any topic, instant' },
    quizlet: { val: 'Limited', note: 'Quizlet Plus only, limited prompts' },
  },
  {
    feature: 'Spaced repetition (SM-2)',
    esli: { val: true, note: 'Full SM-2 algorithm' },
    quizlet: { val: false, note: 'Adaptive Learn mode (not SM-2)' },
  },
  {
    feature: 'Free to use',
    esli: { val: true, note: 'All core features free' },
    quizlet: { val: 'Partial', note: 'Free tier has ads + limits' },
  },
  {
    feature: 'PDF upload - flashcard generation',
    esli: { val: true, note: 'Upload any PDF' },
    quizlet: { val: false, note: 'Not available' },
  },
  {
    feature: 'Community / premade decks',
    esli: { val: '812+ cards', note: 'Growing library' },
    quizlet: { val: 'Millions', note: 'Huge community library' },
  },
  {
    feature: 'Browser extension',
    esli: { val: true, note: 'Chrome, Firefox, Edge, Brave' },
    quizlet: { val: false, note: 'No extension' },
  },
  {
    feature: 'Interface languages',
    esli: { val: '14 languages', note: 'Full UI localization' },
    quizlet: { val: 'English only', note: 'No UI localization' },
  },
  {
    feature: 'No account required',
    esli: { val: true, note: 'Guest mode available' },
    quizlet: { val: false, note: 'Account required' },
  },
  {
    feature: 'Math / KaTeX support',
    esli: { val: true, note: 'Rich text + KaTeX' },
    quizlet: { val: true, note: 'Basic math supported' },
  },
  {
    feature: 'Card translation',
    esli: { val: true, note: '13 language translation' },
    quizlet: { val: false, note: 'No built-in translation' },
  },
  {
    feature: 'Price',
    esli: { val: 'Free / $5 / $12', note: 'Per month' },
    quizlet: { val: '$35.99/yr', note: 'Quizlet Plus annual' },
  },
]

const esliWins = [
  {
    title: 'AI generates cards from any topic',
    body: 'No searching for someone else\'s deck. Type any topic — "A2 German adjectives", "NCLEX cardiac drugs", "AWS Lambda concepts" — and get a complete, accurate deck in under 10 seconds.',
  },
  {
    title: 'Proper spaced repetition',
    body: 'Quizlet\'s "Learn" mode adapts difficulty but does not use spaced repetition scheduling. Esli runs SM-2 — the gold standard algorithm — which means cards resurface at scientifically optimal intervals.',
  },
  {
    title: 'Completely free, no paywalled AI',
    body: 'Quizlet\'s AI generation is locked behind Quizlet Plus ($35.99/yr). Esli\'s AI is free for all users, no subscription required.',
  },
]

const quizletWins = [
  { title: 'Massive community deck library', body: 'Quizlet has hundreds of millions of user-created decks. If you study a very common subject, someone has already made a solid deck.' },
  { title: 'More study modes', body: 'Quizlet offers Match, Gravity, and other game-like modes that some learners enjoy for quick review variety.' },
]

export default function EsliVsQuizletPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const renderVal = (v: boolean | string) => {
    if (v === true) return <Check size={18} className="text-emerald-500 mx-auto" />
    if (v === false) return <X size={18} className="text-rose-400 mx-auto" />
    return <span className="text-sm font-medium text-slate-700">{v}</span>
  }

  return (
    <>
      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* ── Navbar ── */}
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

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50/30 -z-10" />
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                <Sparkles size={14} />
                Honest comparison
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Esli vs Quizlet —{' '}
                <span className="text-primary-600">Which Is Better?</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Both are flashcard apps. But Esli generates custom AI flashcards from any topic in seconds, uses proper spaced repetition, and is free — no paywall on the features that matter.
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

        {/* ── TL;DR Summary ── */}
        <section className="py-10 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                { label: 'Best for AI generation', winner: 'Esli', note: 'Any topic, free, instant' },
                { label: 'Best free tier', winner: 'Esli', note: 'No paywalled AI' },
                { label: 'Best community decks', winner: 'Quizlet', note: 'Millions of shared sets' },
              ].map((item, i) => (
                <div key={i} className="py-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-xl font-bold text-white">{item.winner}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison Table ── */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Feature comparison
              </h2>
              <p className="mt-4 text-lg text-slate-600">An honest side-by-side breakdown.</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 font-semibold text-slate-700 w-2/5">Feature</th>
                    <th className="text-center px-4 py-4 font-semibold text-primary-600 w-[30%]">Esli</th>
                    <th className="text-center px-4 py-4 font-semibold text-slate-500 w-[30%]">Quizlet</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                      <td className="px-6 py-4 font-medium text-slate-800">{row.feature}</td>
                      <td className="px-4 py-4 text-center">
                        <div>{renderVal(row.esli.val)}</div>
                        {row.esli.note && <p className="text-xs text-slate-400 mt-1">{row.esli.note}</p>}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div>{renderVal(row.quizlet.val)}</div>
                        {row.quizlet.note && <p className="text-xs text-slate-400 mt-1">{row.quizlet.note}</p>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Where Esli Wins ── */}
        <section className="py-20 sm:py-28 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Where Esli wins</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {esliWins.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-primary-100 shadow-sm">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <Check size={16} className="text-primary-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Where Quizlet Wins (honest section) ── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Where Quizlet still has the edge
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {quizletWins.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                  <h3 className="text-base font-semibold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-slate-500 text-sm">
              We believe in honest comparisons. Quizlet is a good product. Esli is better for AI-powered, custom flashcard creation.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Esli vs Quizlet — FAQs
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

        {/* ── Final CTA ── */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to try the smarter alternative?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate your first deck with AI in under a minute. No account required to start.
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

        {/* ── Footer ── */}
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
              <a href="/compare/anki" className="hover:text-white transition-colors no-underline">Esli vs Anki</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
