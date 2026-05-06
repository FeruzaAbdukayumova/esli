/**
 * SEO Landing Page: Esli vs Brainscape
 * Route: /compare/brainscape
 * Meta title: Esli vs Brainscape — Which Flashcard App Is Better?
 * Meta description: Comparing Esli and Brainscape? Esli generates flashcards with AI from any topic or PDF. Brainscape requires manual entry. Free vs paid. Honest comparison.
 * Target keywords: Brainscape alternative, Esli vs Brainscape, Brainscape free alternative, best flashcard app
 * Week: 2026-W19
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
      name: 'What is the main difference between Esli and Brainscape?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The biggest difference is AI generation. Esli generates flashcards automatically from any topic you type or any PDF you upload. Brainscape requires you to create cards manually or find pre-made decks. Esli also costs nothing; Brainscape\'s full feature set requires a paid subscription.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free like Brainscape free tier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli is free with no locked features — AI generation, spaced repetition, PDF upload, and sharing are all included at no cost. Brainscape\'s free tier is limited; certified flashcard access, advanced stats, and other features require a Pro subscription ($9.99/month or more).',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Brainscape have AI flashcard generation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As of 2026, Brainscape does not have AI flashcard generation from topics or PDFs. You must create cards manually or copy from existing community decks. Esli generates a complete deck from any topic or PDF in seconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does spaced repetition compare between Esli and Brainscape?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both apps use spaced repetition. Brainscape uses a Confidence-Based Repetition (CBR) system where you rate cards 1-5. Esli uses the SM-2 algorithm (same as Anki) with binary right/wrong ratings. Both are effective; SM-2 has more published research behind it.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I import my Brainscape decks into Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli supports CSV and Excel import. If you can export your Brainscape deck as a CSV, you can import it directly into Esli. Alternatively, you can type your topic in Esli and let AI regenerate the deck instantly.',
      },
    },
  ],
}

const comparisonRows = [
  { feature: 'AI flashcard generation', esli: true, brainscape: false, note: 'Type any topic → cards in seconds' },
  { feature: 'PDF upload → auto-generate cards', esli: true, brainscape: false, note: 'Upload notes, textbooks, any PDF' },
  { feature: 'Spaced repetition', esli: true, brainscape: true, note: 'Esli: SM-2; Brainscape: CBR (1-5 rating)' },
  { feature: 'Free tier (full features)', esli: true, brainscape: false, note: 'Brainscape limits certified decks' },
  { feature: 'Mobile app', esli: false, brainscape: true, note: 'Esli works in mobile browser' },
  { feature: 'Browser extension', esli: true, brainscape: false, note: 'Esli has Chrome/Firefox/Edge extension' },
  { feature: 'Community decks', esli: true, brainscape: true, note: 'Both have premade decks' },
  { feature: 'PDF import', esli: true, brainscape: false, note: '' },
  { feature: 'CSV / Excel import', esli: true, brainscape: false, note: '' },
  { feature: '14 interface languages', esli: true, brainscape: false, note: '' },
  { feature: 'KaTeX math support', esli: true, brainscape: false, note: 'For STEM flashcards' },
  { feature: 'No account required (guest mode)', esli: true, brainscape: false, note: 'Start without signing up' },
]

export default function EsliVsBrainscapePage() {
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                <Sparkles size={14} />
                Honest Comparison
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Esli vs Brainscape
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Both apps use spaced repetition. The key difference: Esli generates flashcards with AI from any topic or PDF — Brainscape requires manual card creation. Here's an honest breakdown.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Try Esli Free — No Signup Needed
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TL;DR summary */}
        <section className="py-16 bg-primary-50 border-y border-primary-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">The short version</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-primary-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">E</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Esli</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><Check size={16} className="text-primary-600 mt-0.5 shrink-0" />AI generates cards from any topic in seconds</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-primary-600 mt-0.5 shrink-0" />Upload any PDF and get a full deck automatically</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-primary-600 mt-0.5 shrink-0" />SM-2 spaced repetition (same as Anki)</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-primary-600 mt-0.5 shrink-0" />100% free — no subscription required</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-primary-600 mt-0.5 shrink-0" />Browser extension for on-the-go capture</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">B</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Brainscape</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" />CBR spaced repetition (1-5 confidence rating)</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" />Large library of certified pre-made decks</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" />Dedicated mobile app</li>
                  <li className="flex items-start gap-2"><X size={16} className="text-red-400 mt-0.5 shrink-0" />No AI generation — cards created manually</li>
                  <li className="flex items-start gap-2"><X size={16} className="text-red-400 mt-0.5 shrink-0" />Full features require paid subscription</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Feature comparison
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Detailed breakdown of what each app offers.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 font-semibold text-slate-900 w-1/2">Feature</th>
                    <th className="text-center px-6 py-4 font-semibold text-primary-600 w-1/4">
                      <span className="flex items-center justify-center gap-1">
                        <span className="w-5 h-5 bg-primary-600 rounded flex items-center justify-center text-white font-bold text-xs">E</span>
                        Esli
                      </span>
                    </th>
                    <th className="text-center px-6 py-4 font-semibold text-slate-700 w-1/4">
                      <span className="flex items-center justify-center gap-1">
                        <span className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-xs">B</span>
                        Brainscape
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="px-6 py-4 text-slate-700">
                        <div>{row.feature}</div>
                        {row.note && <div className="text-xs text-slate-400 mt-0.5">{row.note}</div>}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.esli
                          ? <Check size={18} className="text-primary-600 mx-auto" />
                          : <X size={18} className="text-slate-300 mx-auto" />}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.brainscape
                          ? <Check size={18} className="text-green-500 mx-auto" />
                          : <X size={18} className="text-slate-300 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-slate-400 text-center">
              Comparison based on publicly available information as of May 2026. Features may change.
            </p>
          </div>
        </section>

        {/* When to choose each */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                When to choose each app
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border border-primary-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Choose Esli if you...</h3>
                <ul className="space-y-3">
                  {[
                    'Want AI to generate cards from your own topic or PDF',
                    'Don\'t want to pay for a subscription',
                    'Are studying for exams and need cards fast',
                    'Want to use a browser extension to capture content',
                    'Need math/formula support (KaTeX)',
                    'Prefer Anki-style SM-2 spaced repetition',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={16} className="text-primary-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={`${APP_URL}/register`}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors no-underline"
                >
                  Try Esli Free
                  <ArrowRight size={16} />
                </a>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Brainscape might suit you if...</h3>
                <ul className="space-y-3">
                  {[
                    'You prefer a dedicated mobile app over a web app',
                    'You want professionally certified pre-made decks',
                    'You prefer a 1-5 confidence-rating study system',
                    'You\'re studying specific subjects with well-known Brainscape decks',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
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
                Common questions
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
              Ready to try the AI-powered alternative?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate your first flashcard deck in seconds — free, no signup required.
            </p>
            <a
              href={APP_URL}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Try Esli Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also comparing other apps? See{' '}
              <a href="/compare/anki" className="text-white underline hover:no-underline">Esli vs Anki</a>{' '}
              and{' '}
              <a href="/compare/quizlet" className="text-white underline hover:no-underline">Esli vs Quizlet</a>.
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
