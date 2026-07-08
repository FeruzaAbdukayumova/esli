/**
 * SEO Landing Page: Esli vs Obsidian
 * Route: /compare/obsidian
 * Meta title: Esli vs Obsidian for Flashcards — Which Wins? | Esli (55 chars)
 * Meta description: Obsidian is great for notes. But can it replace a flashcard app? Honest comparison — SRS, AI generation, PDF upload. Free tool included. (143 chars)
 * Target keywords: Obsidian flashcards, Obsidian vs Anki spaced repetition, Obsidian spaced repetition plugin vs Esli, best flashcard app PKM users
 * Week: 2026-W28
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
      name: 'Can Obsidian replace a dedicated flashcard app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Obsidian with the Spaced Repetition plugin can handle basic flashcard review — especially if you already live in Obsidian for note-taking. But it's a plugin bolted onto a note-taking app, not a purpose-built SRS. You can't generate cards from a topic with AI, the scheduling algorithm is less refined than SM-2, and the mobile review experience is weaker. For light use alongside a strong PKM workflow, it works. For serious study with high retention targets, a dedicated app like Esli is meaningfully better.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Obsidian spaced repetition plugin compare to Esli\'s SRS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Obsidian's Spaced Repetition plugin uses a variant of SM-2 but with less scheduling sophistication than a purpose-built system. Esli's SRS is the full SM-2 algorithm with ease factor adjustments, per-card intervals, and deck-level scheduling. The bigger difference is creation: in Obsidian you manually write every card as Markdown in your vault. In Esli, you type a topic or upload a PDF and the AI generates a full deck in seconds.",
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use Obsidian for notes and Esli for flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — this is the most common setup for serious learners. Obsidian excels at linked thinking, building a knowledge graph, writing, and personal knowledge management. Esli excels at retention: AI generation, scheduled review, and spaced repetition. Use Obsidian to understand and connect ideas; use Esli to memorize and retain them. They're complements, not competitors.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I import my Obsidian notes into Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Not directly via a sync — but you can copy Obsidian note text into Esli's topic prompt or export a note as PDF and upload it. The AI will generate flashcards from the content. Many users paste the key sections of a long Obsidian note (a book summary, a concept map) as a prompt and get a deck back instantly.",
      },
    },
    {
      '@type': 'Question',
      name: 'Why would I choose Esli over Obsidian for studying for exams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Three reasons: speed (AI generates a full deck in seconds, vs. hours of manual card writing in Obsidian), dedicated SRS (Esli is built around scheduled review, not note-taking), and PDF-to-flashcards (upload your textbook or paper and get cards instantly). For exam prep where retention is the goal and time is limited, Esli is purpose-built for that job. Obsidian is purpose-built for a different job: building a connected knowledge base.",
      },
    },
  ],
}

type Verdict = 'esli' | 'obsidian' | 'tie'

const comparisonRows: { feature: string; esli: string; obsidian: string; verdict: Verdict }[] = [
  {
    feature: 'AI flashcard generation',
    esli: 'Yes — type a topic or upload a PDF',
    obsidian: 'No — all cards written manually',
    verdict: 'esli',
  },
  {
    feature: 'Spaced repetition built in',
    esli: 'Yes — full SM-2 algorithm',
    obsidian: 'Via plugin (limited scheduling)',
    verdict: 'esli',
  },
  {
    feature: 'PDF to flashcards',
    esli: 'Yes — upload any PDF',
    obsidian: 'No',
    verdict: 'esli',
  },
  {
    feature: 'Interactive flip cards',
    esli: 'Yes — built-in flip UI',
    obsidian: 'Via plugin — functional but basic',
    verdict: 'esli',
  },
  {
    feature: 'Guest mode (no account)',
    esli: 'Yes — no signup to try',
    obsidian: 'Local app — no account needed',
    verdict: 'tie',
  },
  {
    feature: 'Free to use',
    esli: 'Yes — free plan, no card limit',
    obsidian: 'Free (app) + some paid plugins',
    verdict: 'tie',
  },
  {
    feature: 'Connected knowledge graph',
    esli: 'No',
    obsidian: 'Yes — core Obsidian feature',
    verdict: 'obsidian',
  },
  {
    feature: 'Bidirectional links / wikilinks',
    esli: 'No',
    obsidian: 'Yes — [[wikilinks]] throughout',
    verdict: 'obsidian',
  },
  {
    feature: 'Markdown note-taking',
    esli: 'No',
    obsidian: 'Yes — entire app is Markdown',
    verdict: 'obsidian',
  },
  {
    feature: 'Community plugin ecosystem',
    esli: 'No',
    obsidian: 'Yes — 1,000+ plugins',
    verdict: 'obsidian',
  },
  {
    feature: 'Browser extension',
    esli: 'Yes — Chrome, Firefox, Edge, Brave',
    obsidian: 'No',
    verdict: 'esli',
  },
  {
    feature: 'Setup required',
    esli: 'None — works immediately',
    obsidian: 'Some — install app, configure plugins',
    verdict: 'esli',
  },
]

export default function EsliVsObsidianPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const verdictIcon = (v: Verdict, side: 'esli' | 'obsidian') => {
    if (v === 'tie') return <Minus size={14} className="text-slate-400 shrink-0" />
    if (v === side) return <Check size={14} className="text-primary-600 shrink-0" />
    return <X size={14} className="text-slate-300 shrink-0" />
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
                Esli vs{' '}
                <span className="text-primary-600">Obsidian</span>{' '}
                for Flashcards
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Obsidian is one of the best tools ever built for connected note-taking. But when it comes to flashcards and spaced repetition, there are real differences worth understanding — and they're not all in Esli's favor.
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

        {/* Key Difference Callout */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">What Obsidian does</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2"><Check size={14} className="text-slate-400 shrink-0 mt-0.5" /> Linked, bidirectional note-taking</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-slate-400 shrink-0 mt-0.5" /> Builds a personal knowledge graph over time</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-slate-400 shrink-0 mt-0.5" /> Massive plugin ecosystem for custom workflows</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-slate-400 shrink-0 mt-0.5" /> Flashcard review via Spaced Repetition plugin</li>
                  <li className="flex items-start gap-2"><X size={14} className="text-red-300 shrink-0 mt-0.5" /> Cards must be written manually in Markdown</li>
                  <li className="flex items-start gap-2"><X size={14} className="text-red-300 shrink-0 mt-0.5" /> No AI generation — no PDF upload to cards</li>
                </ul>
              </div>

              <div className="p-8 bg-white rounded-2xl border border-primary-200 shadow-sm ring-1 ring-primary-100">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">What Esli does</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2"><Check size={14} className="text-primary-600 shrink-0 mt-0.5" /> AI generates a full deck from any topic in seconds</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-primary-600 shrink-0 mt-0.5" /> Upload any PDF — textbook, paper, lecture slides</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-primary-600 shrink-0 mt-0.5" /> Full SM-2 spaced repetition scheduling built in</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-primary-600 shrink-0 mt-0.5" /> Interactive flip card UI, browser extension</li>
                  <li className="flex items-start gap-2"><X size={14} className="text-red-300 shrink-0 mt-0.5" /> Not a note-taking or PKM tool</li>
                  <li className="flex items-start gap-2"><X size={14} className="text-red-300 shrink-0 mt-0.5" /> No knowledge graph or wikilinks</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Feature comparison
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                An honest look at what each tool actually does.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-4 px-6 font-semibold text-slate-700 w-1/3">Feature</th>
                    <th className="text-left py-4 px-6 font-semibold text-primary-700 w-1/3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-primary-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">E</span>
                        </div>
                        Esli
                      </div>
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700 w-1/3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-slate-800 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">O</span>
                        </div>
                        Obsidian
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="py-3 px-6 font-medium text-slate-800">{row.feature}</td>
                      <td className="py-3 px-6">
                        <div className="flex items-start gap-2 text-slate-600">
                          {verdictIcon(row.verdict, 'esli')}
                          <span className={row.verdict === 'esli' ? 'text-slate-800 font-medium' : ''}>{row.esli}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex items-start gap-2 text-slate-600">
                          {verdictIcon(row.verdict, 'obsidian')}
                          <span className={row.verdict === 'obsidian' ? 'text-slate-800 font-medium' : ''}>{row.obsidian}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Which should you use */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Which should you use?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-white rounded-2xl border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-3">Choose Obsidian if...</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  {[
                    'You want a PKM system that grows with you over years',
                    'Your flashcards naturally emerge from your note-taking anyway',
                    "You're already deep in the Obsidian ecosystem and don't want another app",
                    'You prefer writing cards in Markdown and linking them to your notes',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={14} className="text-slate-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-primary-200 ring-1 ring-primary-100">
                <h3 className="text-base font-bold text-slate-900 mb-3">Choose Esli if...</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  {[
                    'You want to generate a deck from any topic in seconds — not write it manually',
                    'You have PDFs (textbooks, papers, slides) you want to turn into flashcards',
                    'You need a serious, scheduled SRS system for high-stakes retention',
                    "You want to start studying immediately with zero setup",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={14} className="text-primary-600 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* You don't have to choose */}
            <div className="p-8 bg-primary-600 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-white mb-3">You don't have to choose</h3>
              <p className="text-primary-100 max-w-2xl mx-auto">
                Many serious learners use both: Obsidian to capture, connect, and understand ideas — Esli to memorize and retain them. Use Obsidian to build your knowledge graph; copy key passages into Esli to generate the flashcard deck that locks it in.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Esli vs Obsidian FAQs
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
              See what AI flashcard generation feels like
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Type any topic and get a full deck in seconds. Free forever — no credit card, no signup required.
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
              <a href="/compare/chatgpt" className="hover:text-white transition-colors no-underline">Esli vs ChatGPT</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
