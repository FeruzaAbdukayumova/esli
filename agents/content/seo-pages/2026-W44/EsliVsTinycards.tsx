/**
 * SEO Landing Page: Esli vs Tinycards / Duolingo Flashcards Alternative
 * Route: /compare/esli-vs-tinycards
 * Meta title: Tinycards Alternative — Best Free Replacement | Esli
 * Meta description: Tinycards is gone. Esli is the free Duolingo flashcard alternative — AI generation, spaced repetition, 14 languages. No paywall. Start free.
 * Target keywords: Tinycards alternative, Duolingo flashcards alternative, what replaced Tinycards, best Tinycards replacement
 * Week: 2026-W44
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
      name: 'What replaced Tinycards after Duolingo shut it down?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Duolingo discontinued Tinycards in 2020. The closest free replacement is Esli — it offers the same clean flashcard experience, plus AI generation from any topic or PDF, spaced repetition (SM-2), 14 interface languages, and guest mode (no account required to study).',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli really free like Tinycards was?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli\'s core features are free with no paywall: unlimited decks, unlimited cards, spaced repetition, card translations, community decks, and a browser extension. No credit card required. AI generation (from text or PDF) is available on the free tier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli support the same languages as Tinycards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli supports 14 interface languages and card translation to 13 languages including Spanish, French, Japanese, Korean, German, Italian, Portuguese, Mandarin Chinese, Arabic, and more. You can create cards in any language and translate them.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I import my old Tinycards decks into Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tinycards\' data is no longer accessible. However, you can quickly recreate any deck in Esli by typing the topic — AI will generate equivalent cards in seconds. You can also import vocabulary lists from Excel or CSV files if you have them saved.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli better than Tinycards was?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli adds several features Tinycards never had: AI flashcard generation from any topic or PDF, spaced repetition with the SM-2 algorithm (Anki\'s algorithm), a browser extension that turns selected text into flashcards, rich card editor with math support, and guest mode that requires no account.',
      },
    },
  ],
}

const comparisonRows = [
  { feature: 'Currently available', esli: true, tinycards: false, note: 'Tinycards shut down in 2020' },
  { feature: 'Free to use', esli: true, tinycards: true, note: 'Both were/are free' },
  { feature: 'No account required', esli: true, tinycards: false, note: 'Esli has full guest mode' },
  { feature: 'AI flashcard generation', esli: true, tinycards: false, note: 'Generate from any topic in seconds' },
  { feature: 'AI from PDF upload', esli: true, tinycards: false, note: 'Upload notes, textbooks, study guides' },
  { feature: 'Spaced repetition (SM-2)', esli: true, tinycards: false, note: 'Tinycards used simple cycling, not SR' },
  { feature: 'Unlimited decks', esli: true, tinycards: true, note: '' },
  { feature: 'Card translation (13 languages)', esli: true, tinycards: false, note: '' },
  { feature: '14 interface languages', esli: true, tinycards: true, note: 'Tinycards had ~30+ via Duolingo' },
  { feature: 'Browser extension', esli: true, tinycards: false, note: 'Right-click text → instant flashcard' },
  { feature: 'Excel/CSV import', esli: true, tinycards: false, note: '' },
  { feature: 'Linked to language course', esli: false, tinycards: true, note: 'Tinycards tied to Duolingo lessons' },
  { feature: 'Mobile app', esli: false, tinycards: true, note: 'Esli is mobile-responsive web only' },
]

export default function EsliVsTinycardsPage() {
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
                Tinycards Alternative
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                The Best Free{' '}
                <span className="text-primary-600">Tinycards Alternative</span>{' '}
                — With AI
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Duolingo shut down Tinycards in 2020. Esli is the free replacement — clean flashcard experience, AI generation from any topic or PDF, spaced repetition that actually works, and 14 languages. No account required to start.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Try Esli Free — No Signup Needed
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

        {/* Product Summaries */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 bg-white rounded-2xl border-2 border-primary-400 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">E</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Esli</h3>
                    <span className="text-xs font-semibold text-primary-600 bg-primary-100 px-2 py-0.5 rounded-full">Available now</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A modern flashcard app with AI generation, spaced repetition, 14 languages, and guest mode. Built for students, language learners, and anyone who wants to study smarter. Free forever.
                </p>
                <ul className="mt-4 space-y-2">
                  {['AI generates cards from any topic or PDF', 'SM-2 spaced repetition algorithm', 'No account required — full guest mode', '14 interface languages, 13 translation targets'].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={14} className="text-primary-600 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-white rounded-2xl border border-slate-200 opacity-75">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center">
                    <span className="text-slate-500 font-bold text-sm">T</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Tinycards</h3>
                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">Discontinued 2020</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Duolingo's flashcard companion app. Had a clean design and language-course integration. Shut down in September 2020. All user data was deleted. No longer accessible.
                </p>
                <ul className="mt-4 space-y-2">
                  {['Clean, simple flashcard UI', 'Tied to Duolingo language courses', 'No spaced repetition (just card cycling)', 'Shut down — no longer accessible'].map((item, i) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-500">
                      {i === 3 ? <X size={14} className="text-red-400 shrink-0 mt-0.5" /> : <Check size={14} className="text-slate-400 shrink-0 mt-0.5" />}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Feature comparison
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                An honest look at what each app offered.
              </p>
            </div>

            <div className="max-w-3xl mx-auto overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 w-1/2">Feature</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-primary-600">Esli</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-slate-500">Tinycards</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="py-3 px-4 text-sm text-slate-700">
                        {row.feature}
                        {row.note && <span className="ml-2 text-xs text-slate-400">{row.note}</span>}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.esli
                          ? <Check size={16} className="text-primary-600 mx-auto" />
                          : <X size={16} className="text-slate-300 mx-auto" />
                        }
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.tinycards
                          ? <Check size={16} className="text-slate-400 mx-auto" />
                          : <X size={16} className="text-red-300 mx-auto" />
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-12">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Start with Esli Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Tinycards alternative FAQs
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
              The best Tinycards replacement is free.
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Esli gives you everything Tinycards had, plus AI generation, spaced repetition, and more. No account required to start.
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
              <a href="/compare/esli-vs-duolingo" className="hover:text-white transition-colors no-underline">Esli vs Duolingo</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
