/**
 * SEO Landing Page: Esli vs ChatGPT for Flashcards
 * Route: /compare/chatgpt
 * Meta title: Esli vs ChatGPT for Flashcards — Which Wins? | Esli (54 chars)
 * Meta description: ChatGPT can generate flashcards once. Esli studies with you using spaced repetition. Honest comparison — free tool included. (127 chars)
 * Target keywords: ChatGPT flashcards, ChatGPT vs flashcard app, can ChatGPT make flashcards, best AI flashcard generator, ChatGPT alternative for studying
 * Week: 2026-W27
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
      name: 'Can ChatGPT make flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can ask ChatGPT to generate a list of flashcard questions and answers on any topic, and it will produce good output. The limitation is what happens next: you have to manually copy those cards into a separate study app, there is no built-in spaced repetition, and nothing reminds you to review them. ChatGPT is a content generator; Esli is a complete study system where generation and spaced repetition are integrated in one place.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does Esli do that ChatGPT cannot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli tracks what you know and what you don\'t. After you rate each card (easy, good, hard), the SM-2 algorithm calculates exactly when to show you that card again — days, weeks, or months later, right before you would have forgotten it. ChatGPT has no memory of your study sessions, no scheduling, and no due-card queue. It generates content on request; it does not learn what you struggle with or surface it at the optimal moment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free compared to ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli is free to use with no card limit. ChatGPT\'s free tier (GPT-4o mini) can generate flashcards but without integration into a study system. ChatGPT Plus ($20/mo) gives better generation quality but still no spaced repetition. Esli\'s free tier includes unlimited AI generation, unlimited cards, spaced repetition, PDF upload, and browser extension — the full study workflow at no cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use ChatGPT and Esli together?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, and many users do. Use ChatGPT for brainstorming topics, generating essay outlines, or explaining difficult concepts. Then use Esli to actually drill and memorise the information. You can also upload any ChatGPT-generated content as a text document into Esli\'s PDF importer to create a study deck from it.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is better for language learning — ChatGPT or Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli wins for vocabulary retention. ChatGPT is useful for grammar explanations, example sentences, and conversation practice. But vocabulary acquisition requires spaced repetition — reviewing words repeatedly over time at calculated intervals — which ChatGPT cannot provide. Use ChatGPT to understand why a grammar rule works; use Esli to make sure the vocabulary stays in your memory 3 months from now.',
      },
    },
  ],
}

const comparisonRows = [
  { feature: 'AI flashcard generation from any topic', esli: true, chatgpt: 'partial', chatgptNote: 'Generates content, no study integration' },
  { feature: 'Built-in spaced repetition (SM-2)', esli: true, chatgpt: false, chatgptNote: '' },
  { feature: 'Remembers what you struggle with', esli: true, chatgpt: false, chatgptNote: '' },
  { feature: 'Due-card scheduling and reminders', esli: true, chatgpt: false, chatgptNote: '' },
  { feature: 'PDF-to-flashcards automatic', esli: true, chatgpt: 'partial', chatgptNote: 'Can read PDFs but no deck output' },
  { feature: 'Guest mode (no account required)', esli: true, chatgpt: false, chatgptNote: 'Account required' },
  { feature: 'Free with no card limits', esli: true, chatgpt: 'partial', chatgptNote: 'Free tier has usage caps' },
  { feature: 'Browser extension for study on the go', esli: true, chatgpt: false, chatgptNote: '' },
  { feature: 'Interactive card flip UI', esli: true, chatgpt: false, chatgptNote: '' },
  { feature: 'Conversation and explanation', esli: false, chatgpt: true, chatgptNote: '' },
  { feature: 'Writing and editing assistance', esli: false, chatgpt: true, chatgptNote: '' },
  { feature: 'Code generation and debugging', esli: false, chatgpt: true, chatgptNote: '' },
]

export default function EsliVsChatGPTPage() {
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
                Honest comparison
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Esli vs ChatGPT{' '}
                <span className="text-primary-600">for Flashcards</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                ChatGPT can write flashcard content. Esli turns that content into a study system — with spaced repetition, due-card scheduling, and memory tracking. Here's the honest difference.
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

        {/* Key Difference Callout */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-2xl border border-slate-200">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">What ChatGPT does</h3>
                <p className="text-slate-600 leading-relaxed">
                  Generates a list of Q&A pairs on demand. Excellent at producing well-written content quickly. Stops there — no scheduling, no tracking, no memory of what you reviewed. You still need to copy cards into a study tool and remember to review them yourself.
                </p>
              </div>
              <div className="p-8 bg-primary-50 rounded-2xl border border-primary-200">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-xl">🎴</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">What Esli does</h3>
                <p className="text-slate-600 leading-relaxed">
                  Generates the same flashcard content, then acts as a study partner. Tracks every rating you give, calculates the optimal review date using SM-2, queues cards when they're due, and surfaces weak cards before you forget them. Generation and retention in one tool.
                </p>
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

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 font-semibold text-slate-700 w-1/2">Feature</th>
                    <th className="text-center px-6 py-4 font-semibold text-primary-700 w-1/4">Esli</th>
                    <th className="text-center px-6 py-4 font-semibold text-slate-700 w-1/4">ChatGPT</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="px-6 py-4 text-slate-700">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {row.esli === true ? (
                          <Check size={18} className="text-primary-600 mx-auto" />
                        ) : (
                          <X size={18} className="text-slate-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.chatgpt === true ? (
                          <Check size={18} className="text-green-500 mx-auto" />
                        ) : row.chatgpt === 'partial' ? (
                          <span className="text-amber-500 text-xs font-medium">{row.chatgptNote || 'Partial'}</span>
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

        {/* Honest Chooser */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Which should you use?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Use ChatGPT when you need to...</h3>
                <ul className="space-y-3">
                  {[
                    'Understand a concept through conversation',
                    'Get a written explanation of something difficult',
                    'Generate an essay outline or study plan',
                    'Debug code or get step-by-step help',
                    'Research a topic across multiple angles',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                      <Check size={14} className="text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-primary-50 rounded-2xl border border-primary-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Use Esli when you need to...</h3>
                <ul className="space-y-3">
                  {[
                    'Actually memorise vocabulary, terms, or facts',
                    'Study with a scheduled, consistent review system',
                    'Convert a PDF or textbook into a study deck',
                    'Track what you know vs. what you\'re weak on',
                    'Study efficiently in short daily sessions',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                      <Check size={14} className="text-primary-600 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-200 text-center">
              <p className="text-slate-700 font-medium">You don't have to choose one</p>
              <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
                Many students use ChatGPT to understand material and Esli to retain it. Ask ChatGPT to explain a hard concept, then type that topic into Esli to build a deck and make sure it sticks.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Esli vs ChatGPT FAQs
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
              Generate flashcards and actually remember them
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Try Esli free — type any topic and get a complete spaced repetition deck in seconds. No credit card needed.
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
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Try Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
