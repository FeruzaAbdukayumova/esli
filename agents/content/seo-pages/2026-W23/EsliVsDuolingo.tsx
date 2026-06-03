/**
 * SEO Landing Page: Esli vs Duolingo
 * Route: /compare/duolingo
 * Meta title: Esli vs Duolingo — Which Is Better for Language Learning?
 * Meta description: Comparing Esli and Duolingo? Esli generates custom AI flashcards from any topic or PDF. Duolingo uses gamified lessons. Honest feature comparison.
 * Target keywords: Duolingo alternative, Esli vs Duolingo, best free language learning app 2026, Duolingo vs AI flashcards, free Duolingo alternative
 * Week: 2026-W23
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
      name: 'What is the main difference between Esli and Duolingo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Duolingo provides structured, gamified language courses with preset content — you follow Duolingo\'s curriculum. Esli is an AI flashcard generator — you type any vocabulary topic or upload any PDF and get custom flashcards instantly, then study with spaced repetition. Duolingo is a course; Esli is a flexible study tool.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free like Duolingo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free — no ads, no streaks, no paywalled features. Duolingo is free with ads; Duolingo Plus (Super Duolingo) removes ads and adds offline access for ~$7/month.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli replace Duolingo for language learning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'They complement each other well rather than being direct replacements. Duolingo is better for structured beginner courses with gamification. Esli is better when you want to drill specific vocabulary, prep for exams like TOPIK or DELF, or turn your own study materials into flashcards with spaced repetition.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli support the same languages as Duolingo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli\'s AI can generate flashcards in any language — Spanish, French, German, Japanese, Korean, Chinese, Italian, Portuguese, and more — because it uses a large language model rather than preset course content. The Esli interface itself supports 14 languages.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is better for TOPIK, DELF, or other language exam prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli is better for exam-specific prep. Type "TOPIK II vocabulary level 5", "DELF B2 expressions", or "JLPT N2 grammar patterns" and Esli generates targeted flashcards for your exact exam. Duolingo\'s preset courses don\'t align with specific exam vocabulary and formats.',
      },
    },
  ],
}

type FeatureValue = boolean | string

interface ComparisonFeature {
  feature: string
  esli: FeatureValue
  duolingo: FeatureValue
}

const comparisonFeatures: ComparisonFeature[] = [
  { feature: 'AI flashcard generation', esli: true, duolingo: false },
  { feature: 'Generate from your own PDF', esli: true, duolingo: false },
  { feature: 'Any vocabulary topic on demand', esli: true, duolingo: false },
  { feature: 'Spaced repetition (SM-2)', esli: true, duolingo: false },
  { feature: 'Structured beginner courses', esli: false, duolingo: true },
  { feature: 'Gamification (streaks, XP, leagues)', esli: false, duolingo: true },
  { feature: 'Grammar lessons with explanations', esli: false, duolingo: true },
  { feature: 'Speaking & listening exercises', esli: false, duolingo: true },
  { feature: 'Free tier (no credit card)', esli: true, duolingo: true },
  { feature: 'No ads on free plan', esli: true, duolingo: false },
  { feature: 'Exam-specific prep (TOPIK, DELF, etc.)', esli: true, duolingo: false },
  { feature: '14+ interface languages', esli: true, duolingo: false },
  { feature: 'Browser extension', esli: true, duolingo: false },
  { feature: 'Mobile app', esli: false, duolingo: true },
]

function FeatureCell({ value }: { value: FeatureValue }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check size={18} className="text-primary-600 mx-auto" />
    ) : (
      <X size={18} className="text-slate-300 mx-auto" />
    )
  }
  return <span className="text-sm text-slate-600">{value}</span>
}

export default function EsliVsDuolingoPage() {
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
                Esli vs Duolingo
                <br />
                <span className="text-primary-600">Which Should You Use?</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Duolingo gives you a structured course. Esli lets you generate custom AI flashcards for any vocabulary topic or PDF — then study with spaced repetition. Here's the honest breakdown.
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
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">TL;DR</h2>
              <p className="mt-4 text-lg text-slate-600">Choose the tool that matches how you learn.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Esli */}
              <div className="p-8 bg-white rounded-2xl border-2 border-primary-200 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">E</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Esli</h3>
                    <p className="text-sm text-primary-600 font-medium">AI Flashcard Generator</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-5 leading-relaxed">
                  Best for learners who want to drill <strong>specific vocabulary</strong>, prep for a <strong>language exam</strong>, or turn their own <strong>study materials into flashcards</strong> with proven spaced repetition.
                </p>
                <ul className="space-y-2">
                  {[
                    'Generate flashcards for any topic instantly',
                    'Upload PDFs — textbook, novel, notes',
                    'SM-2 spaced repetition (same as Anki)',
                    'No ads, no streaks pressure',
                    'Any language, any topic, any level',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={14} className="text-primary-600 mt-0.5 shrink-0" />
                      {point}
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

              {/* Duolingo */}
              <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">D</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Duolingo</h3>
                    <p className="text-sm text-green-600 font-medium">Gamified Language Courses</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-5 leading-relaxed">
                  Best for <strong>beginners</strong> who want a structured, guided course with gamification (streaks, XP, leagues) to build a daily habit from scratch.
                </p>
                <ul className="space-y-2">
                  {[
                    'Structured beginner courses',
                    'Gamification keeps you coming back',
                    'Speaking and listening exercises',
                    'Grammar explanations in lessons',
                    'Strong mobile app',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={14} className="text-green-500 mt-0.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-slate-500 italic">Not affiliated with Duolingo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Full Comparison Table */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Full feature comparison</h2>
              <p className="mt-4 text-lg text-slate-600">Every major feature, side by side.</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600 w-1/2">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-primary-600 w-1/4">Esli</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600 w-1/4">Duolingo</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                    >
                      <td className="px-6 py-3.5 text-sm text-slate-700">{row.feature}</td>
                      <td className="px-6 py-3.5 text-center">
                        <FeatureCell value={row.esli} />
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <FeatureCell value={row.duolingo} />
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
                Esli vs Duolingo FAQs
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
              Want custom flashcards for any language topic?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Esli generates a complete deck from any topic or PDF in seconds. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Try Esli Free — No Sign-Up Required
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              See language pages:{' '}
              <a href="/flashcards/korean-vocabulary" className="text-white underline hover:no-underline">
                Korean flashcards
              </a>
              {', '}
              <a href="/flashcards/japanese-vocabulary" className="text-white underline hover:no-underline">
                Japanese flashcards
              </a>
              {'. '}
              Also comparing:{' '}
              <a href="/compare/anki" className="text-white underline hover:no-underline">
                Esli vs Anki
              </a>
              {' and '}
              <a href="/compare/quizlet" className="text-white underline hover:no-underline">
                Esli vs Quizlet
              </a>
              .
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
