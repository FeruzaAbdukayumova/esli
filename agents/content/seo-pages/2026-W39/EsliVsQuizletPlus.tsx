/**
 * SEO Landing Page: Esli vs Quizlet Plus
 * Route: /compare/esli-vs-quizlet-plus
 * Meta title: Esli vs Quizlet Plus — Free AI Alternative | Esli (53 chars)
 * Meta description: Quizlet Plus costs $7.99/mo for AI features. Esli gives you AI flashcard generation free. Honest comparison — see which is right for you. (142 chars)
 * Target keywords: Quizlet Plus alternative, Quizlet Plus too expensive, free Quizlet Plus alternative, Quizlet Plus vs free
 * Week: 2026-W39
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
      name: 'Is Esli really free compared to Quizlet Plus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Esli's core features — AI flashcard generation, spaced repetition, unlimited decks, PDF upload, 14 interface languages — are free. Quizlet Plus costs $7.99/month (or $35.99/year) and gates AI generation and ad-free studying behind that paywall.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate flashcards from a PDF like Quizlet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — textbook chapter, lecture slides, study guide — and Esli generates a complete flashcard deck automatically. This feature is free on Esli; Quizlet gates PDF-based AI generation to Plus subscribers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli have spaced repetition like Quizlet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Esli uses the SM-2 spaced repetition algorithm — the same algorithm that powers Anki. Cards you find difficult resurface sooner, building long-term retention. Quizlet's \"Learn\" mode has some adaptive scheduling but uses a proprietary system. SM-2 is the research-backed standard.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does Quizlet Plus have that Esli does not?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Quizlet Plus has a larger existing library of community-created sets (500+ million) and some test-mode features tuned for standardized exams. If you need to browse millions of pre-made sets quickly, Quizlet's scale is hard to match. Esli's strength is AI generation — you don't need to find the right pre-made set when you can generate an accurate one in seconds.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli have a browser extension like Quizlet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli has a browser extension for Chrome, Firefox, Edge, and Brave. You can highlight text on any webpage or open a PDF and generate flashcards instantly without switching apps. The extension is free.',
      },
    },
  ],
}

const comparisonRows = [
  { feature: 'AI flashcard generation', esli: true, quizletFree: false, quizletPlus: true },
  { feature: 'Generate from PDF upload', esli: true, quizletFree: false, quizletPlus: true },
  { feature: 'Spaced repetition (SM-2)', esli: true, quizletFree: false, quizletPlus: 'Partial' },
  { feature: 'Unlimited decks & cards', esli: true, quizletFree: 'Limited', quizletPlus: true },
  { feature: 'Ad-free studying', esli: true, quizletFree: false, quizletPlus: true },
  { feature: 'Browser extension', esli: true, quizletFree: true, quizletPlus: true },
  { feature: '14 interface languages', esli: true, quizletFree: false, quizletPlus: false },
  { feature: 'Card translation (13 languages)', esli: true, quizletFree: false, quizletPlus: false },
  { feature: 'No account required', esli: true, quizletFree: false, quizletPlus: false },
  { feature: 'Monthly cost', esli: 'Free', quizletFree: 'Free (limited)', quizletPlus: '$7.99/mo' },
  { feature: 'Community decks library', esli: '812+ cards', quizletFree: '500M+ sets', quizletPlus: '500M+ sets' },
]

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check size={18} className="text-primary-600 mx-auto" />
  if (value === false) return <X size={18} className="text-slate-300 mx-auto" />
  return <span className="text-sm text-slate-600">{value}</span>
}

export default function EsliVsQuizletPlusPage() {
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
                Esli vs{' '}
                <span className="text-primary-600">Quizlet Plus</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Quizlet Plus charges $7.99/month to unlock AI flashcard generation. Esli gives you AI generation, spaced repetition, and PDF upload free. Here's the honest comparison.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Try Esli Free — No Credit Card
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

        {/* Key difference callout */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Quizlet Free', detail: 'Manual card creation only. Ads everywhere. No AI, no spaced repetition.', highlight: false },
                { label: 'Quizlet Plus', detail: 'AI generation unlocked, ad-free. But $7.99/month — $96/year.', highlight: false },
                { label: 'Esli', detail: 'AI generation, spaced repetition, PDF upload, ad-free — all free.', highlight: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`p-6 rounded-2xl border-2 text-center ${
                    item.highlight
                      ? 'border-primary-400 bg-primary-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <p className={`text-lg font-bold mb-2 ${item.highlight ? 'text-primary-700' : 'text-slate-800'}`}>
                    {item.label}
                    {item.highlight && (
                      <span className="ml-2 text-xs font-medium bg-primary-200 text-primary-700 px-2 py-0.5 rounded-full">
                        Best value
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Feature comparison
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                A full breakdown of what each plan actually gives you.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 font-semibold text-slate-700 w-1/2">Feature</th>
                    <th className="text-center px-4 py-4 font-semibold text-primary-700">Esli (Free)</th>
                    <th className="text-center px-4 py-4 font-semibold text-slate-500">Quizlet Free</th>
                    <th className="text-center px-4 py-4 font-semibold text-slate-700">Quizlet Plus</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="px-6 py-4 font-medium text-slate-700">{row.feature}</td>
                      <td className="px-4 py-4 text-center">
                        <CellValue value={row.esli} />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CellValue value={row.quizletFree} />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CellValue value={row.quizletPlus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-slate-400 text-center">
              Comparison based on publicly available feature information. Quizlet pricing as of 2026.
            </p>
          </div>
        </section>

        {/* When to choose each */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                When to choose each
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-primary-200">
                <h3 className="text-lg font-bold text-primary-700 mb-4">Choose Esli if...</h3>
                <ul className="space-y-3">
                  {[
                    'You want AI flashcard generation without paying $96/year',
                    'You study from PDFs, textbooks, or lecture slides',
                    'You want research-backed spaced repetition (SM-2)',
                    'You study in multiple languages or need a multilingual UI',
                    "You want to start studying without creating an account",
                    'You want a browser extension that generates cards from any webpage',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={16} className="text-primary-600 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-700 mb-4">Choose Quizlet Plus if...</h3>
                <ul className="space-y-3">
                  {[
                    "You need to browse Quizlet's 500M+ community-created set library",
                    'Your school or class already uses Quizlet and shares sets there',
                    "You rely heavily on Quizlet's test mode or match game features",
                    'You prefer the Quizlet interface and team collaboration features',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={16} className="text-slate-400 shrink-0 mt-0.5" />
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
                Frequently asked questions
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

        {/* CTA */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get the AI features. Skip the $96/year.
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              AI flashcard generation, spaced repetition, PDF upload — free on Esli. No credit card required.
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
              <a href="/use-case/ai-flashcard-generator" className="hover:text-white transition-colors no-underline">AI Flashcard Generator</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
