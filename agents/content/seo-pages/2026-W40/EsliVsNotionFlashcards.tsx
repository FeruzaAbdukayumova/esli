/**
 * SEO Landing Page: Esli vs Notion Flashcards
 * Route: /compare/esli-vs-notion-flashcards
 * Meta title: Esli vs Notion Flashcards — Purpose-Built vs DIY | Esli
 * Meta description: Notion databases can't do spaced repetition. Esli is purpose-built for
 *   it — with AI generation. Honest comparison. Fully free.
 * Target keywords: Notion flashcards alternative, Notion vs flashcard app, Notion spaced
 *   repetition, Notion database flashcards, better than Notion for studying
 * Week: 2026-W40
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
      name: 'Can you use Notion as a flashcard app with spaced repetition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not natively. Notion has no built-in spaced repetition algorithm. You can build a database with "next review date" columns and formulas, but you\'re manually implementing what Anki and Esli do automatically. There are third-party integrations (Notion to Anki exporters) but they require technical setup and break when Notion updates its API. For serious study, a dedicated spaced repetition app is more reliable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Notion generate flashcards with AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Notion AI can summarize notes and suggest content, but it cannot generate a structured set of Q&A flashcards from a topic or PDF and immediately put them into a spaced repetition study queue. Esli\'s AI is purpose-built for this: type a topic or upload a PDF and get a complete study-ready deck in seconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use Notion or Esli for studying?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use both for what each does best. Notion excels at note-taking, project management, wikis, and organizing course materials. Esli excels at active recall and long-term retention through spaced repetition. Many students keep their notes in Notion and then paste key concepts into Esli (or upload notes as a PDF) to generate flashcards. The tools complement each other.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free compared to Notion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli is completely free — all core features including AI flashcard generation, spaced repetition, PDF upload, and browser extension are free with no credit card required. Notion has a free plan with limits (1,000 blocks, no history, no API), and paid plans from $8-$15/month. For flashcard studying specifically, Esli is the better free option.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I import my Notion notes into Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Export your Notion page as a PDF (File → Export → PDF) and upload it to Esli. Our AI will parse the content and generate a complete flashcard deck from your notes automatically. This is one of the most popular workflows among students who use Notion for notes and Esli for review.',
      },
    },
  ],
}

type FeatureRow = {
  feature: string
  notion: string | boolean
  esli: string | boolean
  notionNote?: string
}

const comparisonRows: FeatureRow[] = [
  { feature: 'AI flashcard generation', notion: false, esli: true, notionNote: 'Notion AI summarizes — does not generate Q&A decks' },
  { feature: 'Spaced repetition (SM-2)', notion: false, esli: true, notionNote: 'No built-in SRS — requires manual workarounds' },
  { feature: 'Generate from PDF upload', notion: false, esli: true },
  { feature: 'Interactive card flip study mode', notion: false, esli: true, notionNote: 'Gallery views exist but no study mode' },
  { feature: 'Free to use (core features)', notion: 'Limited', esli: true, notionNote: 'Free plan capped at 1,000 blocks' },
  { feature: 'Note-taking and organization', notion: true, esli: false, notionNote: 'Notion\'s core strength' },
  { feature: 'Project/task management', notion: true, esli: false },
  { feature: 'Team collaboration', notion: true, esli: false },
  { feature: 'Browser extension', notion: false, esli: true },
  { feature: 'No account required to start', notion: false, esli: true },
  { feature: '14 interface languages', notion: false, esli: true },
]

export default function EsliVsNotionFlashcardsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const renderCell = (val: string | boolean, note?: string) => {
    if (val === true) return <Check size={18} className="text-emerald-500 mx-auto" />
    if (val === false) return (
      <div className="flex flex-col items-center gap-1">
        <X size={18} className="text-slate-300 mx-auto" />
        {note && <span className="text-xs text-slate-400 text-center leading-tight hidden sm:block">{note}</span>}
      </div>
    )
    return <span className="text-sm text-amber-600 font-medium">{val}</span>
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
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary-50/30 -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                <Sparkles size={14} />
                Honest Comparison
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Esli vs Notion{' '}
                <span className="text-primary-600">Flashcards</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Notion is a great note-taking tool. It was not designed for spaced repetition or AI flashcard generation. Here's an honest look at when to use each — and how they work together.
              </p>
            </div>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border-2 border-slate-200 bg-slate-50">
                <div className="text-2xl mb-3">📋</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Notion</h3>
                <p className="text-sm text-slate-600 mb-4">Best-in-class for notes, wikis, and project management. No spaced repetition, no AI flashcard generation.</p>
                <div className="space-y-1 text-sm text-slate-500">
                  <p>Free plan: 1,000 blocks (limited)</p>
                  <p>Plus: $8/month | Business: $15/month</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl border-2 border-primary-200 bg-primary-50">
                <div className="text-2xl mb-3">🧠</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Esli</h3>
                <p className="text-sm text-slate-600 mb-4">Purpose-built for active recall and retention. AI generation from any topic or PDF. SM-2 spaced repetition.</p>
                <div className="space-y-1 text-sm text-primary-700 font-medium">
                  <p>Free forever — no block limits</p>
                  <p>No credit card required</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">
              Feature comparison
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left px-6 py-4 font-semibold text-slate-900 w-1/2">Feature</th>
                    <th className="text-center px-4 py-4 font-semibold text-slate-600 w-1/4">Notion</th>
                    <th className="text-center px-4 py-4 font-semibold text-primary-700 w-1/4">Esli</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="px-6 py-4 text-slate-700">{row.feature}</td>
                      <td className="px-4 py-4 text-center">{renderCell(row.notion, row.notionNote)}</td>
                      <td className="px-4 py-4 text-center">{renderCell(row.esli)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When to Use Each */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">
              When to use each
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-4">Use Notion for:</h3>
                <ul className="space-y-2">
                  {[
                    'Taking and organizing lecture notes',
                    'Managing tasks, assignments, deadlines',
                    'Building a personal knowledge base / wiki',
                    'Collaborating with classmates on group projects',
                    'Long-form writing and documentation',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-slate-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-primary-200 bg-primary-50/30">
                <h3 className="text-base font-bold text-slate-900 mb-4">Use Esli for:</h3>
                <ul className="space-y-2">
                  {[
                    'Generating flashcards from any topic in seconds',
                    'Turning Notion notes / PDFs into study decks',
                    'Long-term retention with spaced repetition',
                    'Exam prep (MCAT, CFA, NCLEX, bar, language)',
                    'Daily review sessions with smart scheduling',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-primary-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-slate-900 text-white">
              <h3 className="text-base font-semibold mb-2">The best workflow: use both</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Take notes in Notion. Export the relevant pages as PDFs. Upload to Esli. Your notes become flashcard decks in seconds, and spaced repetition handles the review schedule automatically. Two tools, each doing what it's best at.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Notion flashcards FAQs
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
              Turn your Notion notes into flashcards
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Export any Notion page as PDF. Upload to Esli. Get a complete flashcard deck in seconds — free, with spaced repetition.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Try Esli Free — No Signup Needed
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
              <a href="/compare/esli-vs-notion-ai" className="hover:text-white transition-colors no-underline">Esli vs Notion AI</a>
              <a href="/compare/esli-vs-anki" className="hover:text-white transition-colors no-underline">Esli vs Anki</a>
              <a href="/use-case/pdf-to-flashcards" className="hover:text-white transition-colors no-underline">PDF to Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
