/**
 * SEO Landing Page: Esli vs Notion AI
 * Route: /compare/notion-ai
 * Meta title: Esli vs Notion AI for Flashcards — Which Wins? | Esli (55 chars)
 * Meta description: Esli vs Notion AI compared. Notion organizes notes; Esli turns any topic into spaced repetition flashcards instantly. Free comparison. (134 chars)
 * Target keywords: Esli vs Notion AI, Notion AI flashcards, Notion alternative for studying, notion spaced repetition, notion vs anki flashcards
 * Week: 2026-W26
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
      name: 'Can Notion AI create flashcards with spaced repetition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Notion AI can help you write content and summarise your notes, but it has no built-in spaced repetition system. Some users create a database with review dates and manually update them, but this is a workaround — not a real SRS. Esli has true SM-2 spaced repetition built in: cards you struggle with come back sooner, cards you know are spaced further out, automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Notion AI free, and how does it compare to Esli\'s pricing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Notion\'s AI features require the Notion AI add-on at $10/month (billed on top of your Notion plan, which starts at $10/month for Plus). Full AI features cost $20+/month. Esli is completely free — unlimited AI flashcard generation, spaced repetition, and PDF upload at no cost, with no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Notion to generate flashcards from a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Notion AI can summarise PDFs and extract key points into your Notion workspace, but the output is prose — not structured Q&A flashcards with spaced repetition. Esli takes any PDF and generates a complete deck of Q&A flashcard cards directly, ready to study immediately with spaced repetition. No reformatting needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Notion AI actually good at vs Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Notion AI is excellent for writing, editing, summarising, and organising information inside a workspace — it\'s a knowledge management and productivity tool. Esli is focused entirely on one thing: turning any topic or PDF into study-ready flashcards with spaced repetition. If you want to write and organise notes, use Notion. If you want to study and retain information, use Esli. They solve different problems.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli and Notion together?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — many users do. Take notes or build your knowledge base in Notion, then export sections as PDF and upload to Esli to generate flashcard decks. Notion handles capture and organisation; Esli handles memorisation and retention. The two tools complement each other well.',
      },
    },
  ],
}

const comparisonRows = [
  {
    feature: 'AI flashcard generation from any topic',
    esli: true,
    notion: false,
    note: 'Type any topic; Esli generates Q&A cards instantly — no notes needed',
  },
  {
    feature: 'Built-in spaced repetition (SRS)',
    esli: true,
    notion: false,
    note: 'Esli has SM-2 built in; Notion has no native SRS',
  },
  {
    feature: 'PDF → flashcards (automatic)',
    esli: true,
    notion: false,
    note: 'Esli generates structured Q&A cards from any PDF; Notion AI produces prose summaries',
  },
  {
    feature: 'Free with no card limits',
    esli: true,
    notion: false,
    note: 'Esli is fully free; Notion AI costs $10+/month extra on top of the base plan',
  },
  {
    feature: 'Study reminders and scheduling',
    esli: true,
    notion: false,
    note: 'Esli schedules reviews automatically; Notion requires manual reminders',
  },
  {
    feature: 'Browser extension for clipping',
    esli: true,
    notion: false,
    note: 'Esli has a browser extension; Notion has a web clipper but not a flashcard clipper',
  },
  {
    feature: 'Guest mode (no signup to start)',
    esli: true,
    notion: false,
    note: 'Esli works immediately without an account',
  },
  {
    feature: 'Note-taking and knowledge base',
    esli: false,
    notion: true,
    note: 'Notion excels at structured notes, databases, and wikis',
  },
  {
    feature: 'Team collaboration and wikis',
    esli: false,
    notion: true,
    note: 'Notion is excellent for team knowledge management',
  },
  {
    feature: 'Writing and editing assistance',
    esli: false,
    notion: true,
    note: 'Notion AI is a strong writing co-pilot for drafts, docs, and summaries',
  },
  {
    feature: 'Template library',
    esli: false,
    notion: true,
    note: 'Notion has a huge ecosystem of templates for project management, journaling, etc.',
  },
]

export default function EsliVsNotionAIPage() {
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
                Esli vs Notion AI{' '}
                <span className="text-primary-600">for Flashcards</span>{' '}
                — Which Wins?
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Both use AI, but they solve completely different problems. Notion organises your notes. Esli turns any topic or PDF into spaced repetition flashcards — instantly, for free.
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
                  href="#comparison-table"
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
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">
              The fundamental difference
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-slate-600">N</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Notion AI</h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  A productivity and knowledge management platform. AI helps you write, edit, and summarise content inside your workspace. Flashcards require manual workarounds — there's no built-in SRS or study scheduling. Paid add-on at $10+/month extra.
                </p>
              </div>
              <div className="p-6 bg-primary-50 rounded-2xl border border-primary-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-white">E</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Esli</h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  A dedicated AI flashcard and spaced repetition tool. Type any topic or upload a PDF → get a full Q&A flashcard deck in seconds → study with SM-2 spaced repetition. No notes required. Completely free.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison-table" className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Feature comparison
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                An honest look at what each tool does and doesn't do.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Feature</th>
                    <th className="text-center px-6 py-4 text-sm font-semibold text-primary-600">Esli</th>
                    <th className="text-center px-6 py-4 text-sm font-semibold text-slate-600">Notion AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-900">{row.feature}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{row.note}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.esli ? (
                          <Check size={18} className="text-primary-600 mx-auto" />
                        ) : (
                          <X size={18} className="text-slate-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.notion ? (
                          <Check size={18} className="text-slate-500 mx-auto" />
                        ) : (
                          <X size={18} className="text-slate-300 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Which Should You Use */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Which should you use?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-primary-600 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">Choose Esli if you want to...</h3>
                <ul className="space-y-3">
                  {[
                    'Memorise anything fast — vocabulary, facts, rules, formulas',
                    'Generate flashcards from a topic without writing notes first',
                    'Turn textbook PDFs or lecture slides into study cards automatically',
                    'Study with proven spaced repetition (SM-2)',
                    'Use a completely free tool with no subscription',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-primary-100">
                      <Check size={16} className="text-white shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Choose Notion AI if you want to...</h3>
                <ul className="space-y-3">
                  {[
                    'Build and organise a personal knowledge base or team wiki',
                    'Write, edit, and polish documents with AI assistance',
                    'Manage projects, tasks, and databases in one workspace',
                    'Collaborate with a team on shared notes and docs',
                    'Connect notes, tasks, and databases in a structured system',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800 leading-relaxed">
              <strong>You don't have to choose.</strong> Many students use Notion to organise their notes and reading, then export to PDF and import into Esli to generate flashcard decks. Both tools at once, each doing what it does best.
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Esli vs Notion AI — FAQs
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
              Ready to actually memorise what you learn?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Esli generates flashcard decks from any topic in seconds. Free forever — no credit card needed.
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
              <a href="/compare/anki" className="hover:text-white transition-colors no-underline">Esli vs Anki</a>
              <a href="/compare/quizlet" className="hover:text-white transition-colors no-underline">Esli vs Quizlet</a>
              <a href="/compare/remnote" className="hover:text-white transition-colors no-underline">Esli vs RemNote</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
