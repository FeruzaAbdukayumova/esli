/**
 * SEO Landing Page: Esli vs Kahoot — Comparison Page
 * Route: /compare/esli-vs-kahoot
 * Meta title: Esli vs Kahoot — Individual Study vs Group Games | Esli
 * Meta description: Kahoot is great for class games. Esli is built for individual spaced
 *   repetition and AI generation. Honest comparison. Free alternative.
 * Target keywords: Kahoot alternative for studying, Kahoot vs flashcard app, individual study
 *   vs Kahoot, Kahoot alternative free, self-study flashcard app, better than Kahoot for retention
 * Week: 2026-W41
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
      name: 'What is the main difference between Esli and Kahoot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kahoot is a game-based classroom engagement tool — it requires a host, a group, and a live session to create competitive quizzes. Esli is a personal AI-powered flashcard app built for individual study, spaced repetition, and long-term retention. They solve different problems: Kahoot is for in-class engagement, Esli is for studying alone before and after class.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Kahoot to study alone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kahoot has a solo practice mode (Kahoot! Practice), but it lacks spaced repetition and AI generation. You must create questions manually or find a public kahoot to play. There is no algorithm that reschedules cards based on what you\'re forgetting. For solo study, Esli\'s spaced repetition and AI generation are fundamentally more effective for long-term retention.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli work for classroom or group use like Kahoot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli is designed for individual study, not live group quizzing. If your goal is a classroom game with a leaderboard, Kahoot does this better. If your goal is building lasting knowledge for exams — alone or as a student preparing outside class — Esli is the right tool. Many students use both: Kahoot for class participation, Esli for the studying that actually prepares them for tests.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli\'s AI generation compare to creating Kahoot questions manually?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Creating a Kahoot requires writing each question, four answer choices, and setting a timer — manually, one by one. Esli generates a complete Q&A deck from a topic in seconds. Type "cell biology for AP exam" or upload a PDF and get 20+ focused flashcards instantly. No manual card creation, no Kahoot question editor, no answer writing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free compared to Kahoot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free — AI generation, spaced repetition, unlimited decks, 14 languages, PDF upload, and browser extension. Kahoot has a free tier for basic quizzes, but AI features, detailed reports, and larger class sizes require Kahoot+ or Kahoot! for Schools paid plans. Esli\'s core study features are free with no study limits.',
      },
    },
  ],
}

const comparisonRows = [
  { feature: 'AI flashcard generation', esli: true, esliNote: 'Type topic → instant deck', kahoot: false, kahootNote: 'Manual question creation only' },
  { feature: 'Spaced repetition (SM-2)', esli: true, esliNote: 'Full SM-2 algorithm', kahoot: false, kahootNote: 'No scheduling algorithm' },
  { feature: 'Individual solo study', esli: true, esliNote: 'Built for it', kahoot: 'partial', kahootNote: 'Solo practice mode available, limited' },
  { feature: 'Generate from PDF', esli: true, esliNote: 'Upload any PDF', kahoot: false, kahootNote: 'Not available' },
  { feature: 'Live classroom games', esli: false, esliNote: 'Not designed for this', kahoot: true, kahootNote: 'Core feature — real-time leaderboard' },
  { feature: 'Group / team quiz', esli: false, esliNote: 'Individual use only', kahoot: true, kahootNote: 'Core feature' },
  { feature: 'Free (core study features)', esli: true, esliNote: 'Fully free, no limits', kahoot: 'partial', kahootNote: 'Free tier limited; AI features paid' },
  { feature: 'Browser extension', esli: true, esliNote: 'Chrome, Firefox, Edge', kahoot: false, kahootNote: 'No extension' },
  { feature: 'No signup required', esli: true, esliNote: 'Guest mode available', kahoot: false, kahootNote: 'Account required' },
  { feature: '14 interface languages', esli: true, esliNote: 'Full UI + card support', kahoot: false, kahootNote: 'Limited language support' },
  { feature: 'Gamified engagement', esli: false, esliNote: 'Not gamified', kahoot: true, kahootNote: 'Points, streaks, leaderboards' },
]

export default function EsliVsKahootPage() {
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
                Esli vs Kahoot:{' '}
                <span className="text-primary-600">Different Tools, Different Jobs</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Kahoot is built for live classroom games. Esli is built for individual spaced repetition with AI generation. One is for engagement — the other is for retention.
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

        {/* Product summaries */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 bg-white rounded-2xl border border-slate-200">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Esli</h2>
                <p className="text-slate-500 text-sm mb-4">Personal AI-powered flashcard app</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> AI generates a deck from any topic in seconds</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> SM-2 spaced repetition schedules your reviews</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> Upload PDF - AI extracts the cards</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> Study alone, at your own pace, on any device</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> 100% free, no account required</li>
                </ul>
                <p className="mt-4 text-xs text-slate-400">Best for: individual study, exam prep, long-term retention</p>
              </div>
              <div className="p-8 bg-white rounded-2xl border border-slate-200">
                <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Kahoot</h2>
                <p className="text-slate-500 text-sm mb-4">Live game-based classroom engagement</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2"><Check size={14} className="text-slate-400 mt-0.5 shrink-0" /> Real-time multiplayer quizzes with leaderboard</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-slate-400 mt-0.5 shrink-0" /> Classroom engagement — increases participation</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-slate-400 mt-0.5 shrink-0" /> 350M+ users, massive library of public kahoots</li>
                  <li className="flex items-start gap-2"><X size={14} className="text-red-400 mt-0.5 shrink-0" /> No spaced repetition scheduling</li>
                  <li className="flex items-start gap-2"><X size={14} className="text-red-400 mt-0.5 shrink-0" /> No AI generation — manual question creation</li>
                </ul>
                <p className="mt-4 text-xs text-slate-400">Best for: classroom games, group engagement, teacher-led sessions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Feature comparison
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-500 w-1/2">Feature</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-primary-600">Esli</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">Kahoot</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}`}>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-slate-900">{row.feature}</p>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.esli === true ? (
                          <div className="flex flex-col items-center gap-1">
                            <Check size={18} className="text-primary-600" />
                            {row.esliNote && <span className="text-xs text-slate-400">{row.esliNote}</span>}
                          </div>
                        ) : row.esli === 'partial' ? (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-yellow-500 text-base">~</span>
                            {row.esliNote && <span className="text-xs text-slate-400">{row.esliNote}</span>}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <X size={18} className="text-slate-300" />
                            {row.esliNote && <span className="text-xs text-slate-400">{row.esliNote}</span>}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.kahoot === true ? (
                          <div className="flex flex-col items-center gap-1">
                            <Check size={18} className="text-slate-600" />
                            {row.kahootNote && <span className="text-xs text-slate-400">{row.kahootNote}</span>}
                          </div>
                        ) : row.kahoot === 'partial' ? (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-yellow-500 text-base">~</span>
                            {row.kahootNote && <span className="text-xs text-slate-400">{row.kahootNote}</span>}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <X size={18} className="text-slate-300" />
                            {row.kahootNote && <span className="text-xs text-slate-400">{row.kahootNote}</span>}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When to use each */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">When to use each</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white rounded-2xl border-2 border-primary-200">
                <h3 className="text-lg font-bold text-primary-600 mb-4">Use Esli when...</h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  {[
                    'Studying alone for a test or certification exam',
                    'You want flashcards generated from any topic instantly',
                    'You need spaced repetition to actually retain material long-term',
                    'You want to upload a PDF and get a study deck automatically',
                    'You\'re learning a language and need vocabulary + grammar cards',
                    'You\'re preparing for MCAT, bar exam, CFA, AWS, or any professional certification',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={14} className="text-primary-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-white rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-700 mb-4">Use Kahoot when...</h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  {[
                    'Running a live class quiz with a leaderboard',
                    'You need group engagement in a classroom or team meeting',
                    'You\'re a teacher creating a quick formative assessment',
                    'You want a competitive game-style review session',
                    'Corporate training with real-time audience participation',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={14} className="text-slate-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Use both callout */}
            <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-200">
              <h3 className="text-base font-semibold text-primary-900 mb-2">Use both together</h3>
              <p className="text-sm text-primary-800 leading-relaxed">
                Many students use Kahoot for in-class review games (teacher-led) and Esli for independent study outside class. After a Kahoot game highlights what you got wrong, open Esli and generate flashcards for exactly those concepts. The games show the gap; the spaced repetition closes it.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Esli vs Kahoot FAQs
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
              Ready to study smarter than a game?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards with AI on any topic, study with spaced repetition, and actually retain what you learn. Free, no account required.
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
              <a href="/compare/esli-vs-notion-flashcards" className="hover:text-white transition-colors no-underline">Esli vs Notion</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
