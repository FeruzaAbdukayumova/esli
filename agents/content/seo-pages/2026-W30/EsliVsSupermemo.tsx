/**
 * SEO Landing Page: Esli vs SuperMemo — Comparison Page
 * Route: /compare/supermemo
 * Meta title: Esli vs SuperMemo: Which Flashcard App Wins? | Esli (54 chars)
 * Meta description: SuperMemo invented spaced repetition. But is it the best app today? Honest comparison: AI generation, ease of use, price, algorithms. (134 chars)
 * Target keywords: SuperMemo alternative, SuperMemo vs Anki, spaced repetition app comparison, SuperMemo review, best spaced repetition app
 * Week: 2026-W30
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, ChevronDown, Check, X, Minus } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is SuperMemo better than other spaced repetition apps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "SuperMemo created the original SRS algorithm in 1987 and continues to develop the most scientifically rigorous spaced repetition system available. For users who want the absolute best algorithm and are willing to invest significant time learning the system, SuperMemo is unmatched. However, most learners find its interface and workflow too complex to sustain. Anki, Esli, and other apps make a deliberate tradeoff: slightly less optimal scheduling in exchange for dramatically higher usability and therefore actual daily use.",
      },
    },
    {
      '@type': 'Question',
      name: 'What algorithm does SuperMemo use vs Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "SuperMemo uses SM-18, its latest proprietary algorithm that models each item's forgetting curve individually and adapts in real time. Esli uses SM-2, the 1987 SuperMemo algorithm that Anki popularized — simpler, well-understood, and extremely effective for most learners. The practical difference in retention between SM-2 and SM-18 is real but small. The much larger difference is consistency: a slightly less optimal algorithm you actually use every day beats a perfect algorithm you open twice and abandon.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli import SuperMemo files?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli does not currently import SuperMemo native format (.kno files). However, SuperMemo can export content to text formats, and Esli supports CSV and Excel import — so migration is possible with an intermediate export step. Alternatively, use Esli\'s AI generation to recreate key decks faster than a manual import would take. Type your topic and get a structured deck in seconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is SuperMemo free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SuperMemo 18 is a paid Windows application (one-time license, approximately $66). SuperMemo.com (web version) has a free tier with significant limitations. Esli is free with no credit card required — the free plan includes AI flashcard generation, spaced repetition, PDF upload, and community decks. No login required (guest mode).',
      },
    },
    {
      '@type': 'Question',
      name: 'Who should use SuperMemo instead of Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SuperMemo is the right choice if: you are a Windows user who values algorithmic precision over ease of use, you want to study 5+ years worth of material with maximum long-term retention, you are willing to invest 10-20 hours learning the system, and you prefer manual card creation with deep incremental reading integration. Choose Esli if: you want to generate flashcards instantly from any topic or PDF, you value a clean modern interface, you study on mobile or cross-platform, or you want to get started in under 2 minutes without a learning curve.',
      },
    },
  ],
}

type ComparisonValue = 'esli' | 'tie' | 'supermemo' | 'neither'

const comparisonRows: { feature: string; esli: string; supermemo: string; winner: ComparisonValue }[] = [
  { feature: 'AI flashcard generation', esli: 'Yes — type any topic, instant deck', supermemo: 'No — manual only', winner: 'esli' },
  { feature: 'PDF to flashcards', esli: 'Yes — upload PDF, auto-extract cards', supermemo: 'Incremental reading (complex)', winner: 'esli' },
  { feature: 'SRS algorithm quality', esli: 'SM-2 (proven, effective)', supermemo: 'SM-18 (best available)', winner: 'supermemo' },
  { feature: 'Ease of use', esli: 'Very easy — no learning curve', supermemo: 'Steep — requires significant investment', winner: 'esli' },
  { feature: 'Web app', esli: 'Yes (app.esli.app)', supermemo: 'Yes (supermemo.com, limited)', winner: 'tie' },
  { feature: 'Mobile app', esli: 'Yes (browser-based mobile)', supermemo: 'Limited (Windows-primary)', winner: 'esli' },
  { feature: 'Free plan', esli: 'Yes — full features, no credit card', supermemo: 'Limited free tier on web', winner: 'esli' },
  { feature: 'Price', esli: 'Free / $5 / $12 per month', supermemo: '~$66 one-time (desktop) or subscription', winner: 'esli' },
  { feature: 'Guest mode (no signup)', esli: 'Yes', supermemo: 'No', winner: 'esli' },
  { feature: 'Browser extension', esli: 'Yes — capture any webpage', supermemo: 'No', winner: 'esli' },
  { feature: 'Incremental reading', esli: 'No', supermemo: 'Yes — flagship feature', winner: 'supermemo' },
  { feature: 'Algorithm age / updates', esli: 'SM-2 (stable, 1987)', supermemo: 'SM-18 (actively developed)', winner: 'supermemo' },
  { feature: 'Community decks', esli: 'Yes (812+ premade cards)', supermemo: 'Limited', winner: 'esli' },
  { feature: '14-language interface', esli: 'Yes', supermemo: 'No', winner: 'esli' },
]

const WinnerIcon = ({ winner, side }: { winner: ComparisonValue; side: 'esli' | 'supermemo' }) => {
  if (winner === 'tie') return <Minus size={16} className="text-slate-400" />
  if (winner === side) return <Check size={16} className="text-emerald-500" />
  if (winner === 'neither') return <Minus size={16} className="text-slate-400" />
  return <X size={16} className="text-rose-400" />
}

export default function EsliVsSupermemoPage() {
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
                Esli vs{' '}
                <span className="text-primary-600">SuperMemo</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                SuperMemo invented spaced repetition in 1987. It is the most algorithmically advanced flashcard system ever built. It is also notoriously difficult to use. Here is the honest comparison.
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
                  See Feature Comparison
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
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">What SuperMemo does best</p>
                <h3 className="text-xl font-bold text-slate-900 mb-3">The most rigorous SRS algorithm on earth</h3>
                <p className="text-slate-600 leading-relaxed">
                  SuperMemo's SM-18 algorithm models each item's individual forgetting curve, adapting in real time to your memory patterns. Developed over 35+ years by Piotr Wozniak, it is the most scientifically advanced spaced repetition system available anywhere. Incremental reading — consuming long-form text inside the SRS loop — is also unique to SuperMemo.
                </p>
              </div>
              <div className="p-8 bg-primary-50 rounded-2xl border border-primary-200">
                <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">What Esli does best</p>
                <h3 className="text-xl font-bold text-slate-900 mb-3">AI generation + zero friction to start</h3>
                <p className="text-slate-600 leading-relaxed">
                  Esli generates a complete flashcard deck from any topic or PDF in seconds — no manual card creation required. The interface takes 2 minutes to learn, works on any device, and has a guest mode so you can study without even signing up. It uses SM-2, the proven algorithm that Anki and millions of users rely on daily.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Feature comparison</h2>
              <p className="mt-4 text-slate-600">We include features where SuperMemo genuinely wins. This is an honest table.</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 w-[45%]">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-primary-600">Esli</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">SuperMemo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`${row.winner === 'supermemo' ? 'bg-amber-50/30' : row.winner === 'esli' ? 'bg-white' : 'bg-white'} hover:bg-slate-50 transition-colors`}>
                      <td className="px-6 py-4 text-sm text-slate-700 font-medium">{row.feature}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <WinnerIcon winner={row.winner} side="esli" />
                          <span className="text-xs text-slate-600 text-center">{row.esli}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <WinnerIcon winner={row.winner} side="supermemo" />
                          <span className="text-xs text-slate-600 text-center">{row.supermemo}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-slate-400 text-center">Rows highlighted in amber indicate categories where SuperMemo wins. We are not hiding them.</p>
          </div>
        </section>

        {/* Honest recommendation */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Which should you use?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-2xl border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-4">Choose SuperMemo if...</h3>
                <ul className="space-y-3">
                  {[
                    'You are on Windows and will stay on Windows',
                    'You want the most algorithmically correct SRS available',
                    'You intend to study for 5+ years from the same collection',
                    'You are willing to invest 10-20 hours learning the system',
                    'You value incremental reading inside the SRS loop',
                    'Algorithmic precision matters more than ease of use',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-slate-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-primary-50 rounded-2xl border border-primary-200">
                <h3 className="text-base font-bold text-slate-900 mb-4">Choose Esli if...</h3>
                <ul className="space-y-3">
                  {[
                    'You want to generate a flashcard deck in under 2 minutes',
                    'You have PDFs you want to convert to flashcards automatically',
                    'You want cross-platform: web, mobile, browser extension',
                    'You prefer a modern UI you can use without a tutorial',
                    'You are starting from zero and want no friction',
                    'You want free with no credit card required',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={14} className="text-primary-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 p-6 bg-white rounded-2xl border border-slate-200 text-center">
              <p className="text-sm font-semibold text-slate-700 mb-2">You don't have to choose</p>
              <p className="text-sm text-slate-600 max-w-2xl mx-auto">
                Some serious learners use both: Esli's AI generation to quickly create new decks from any topic or PDF, and SuperMemo for long-term retention of their most important material. Esli handles onboarding new knowledge fast; SuperMemo maintains it for years. The tools complement rather than compete.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                SuperMemo vs Esli FAQs
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
              Try the AI-powered alternative — free
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate your first flashcard deck in under 2 minutes. No signup required.
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
              <a href="/compare/anki" className="hover:text-white transition-colors no-underline">Esli vs Anki</a>
              <a href="/compare/quizlet" className="hover:text-white transition-colors no-underline">Esli vs Quizlet</a>
              <a href="/compare/obsidian" className="hover:text-white transition-colors no-underline">Esli vs Obsidian</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
