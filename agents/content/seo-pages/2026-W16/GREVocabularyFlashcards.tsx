/**
 * SEO Landing Page: GRE Vocabulary Flashcards
 * Route: /flashcards/gre-vocabulary
 * Meta title: GRE Vocabulary Flashcards — AI Generator | Esli
 * Meta description: Generate GRE vocabulary flashcards with AI. Type any GRE word list or concept and get study-ready cards instantly. Free, with spaced repetition. Score higher.
 * Target keywords: GRE vocabulary flashcards, GRE flashcards free, GRE word list flashcards, GRE prep flashcards
 * Week: 2026-W16
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are GRE vocabulary flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free to use. Generate unlimited GRE vocabulary flashcards with AI, study with spaced repetition, and access all core features — no credit card, no signup required to try.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate GRE vocabulary flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any GRE vocabulary topic — "high-frequency GRE words", "GRE word list 1-100", "GRE words related to criticism", or even a specific word like "perfidious" — and the AI generates a full set of flashcards with definitions, etymology, synonyms, antonyms, and example sentences in the GRE style.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many GRE words should I study with flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most GRE prep programs recommend mastering 500-1,000 high-frequency words. With Esli you can generate decks for specific word groups (e.g., "words meaning to criticize", "positive connotation GRE words") rather than memorizing a generic list — which is far more efficient for test day.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my GRE prep book notes and turn them into flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload a PDF of your Magoosh notes, Manhattan Prep vocabulary list, or any GRE word document and Esli extracts the vocabulary and definitions automatically — no manual card creation needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Magoosh or Quizlet for GRE vocab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Magoosh has a fixed deck you study passively. Quizlet requires you to find or build decks manually. Esli lets you generate any custom vocabulary set in seconds — "GRE words related to deception", "rare GRE adjectives", "words I missed in practice tests" — and studies them with spaced repetition. It\'s faster to set up and more targeted than either alternative.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'Define "perfidious" (GRE)',
    a: 'Adjective: deceitful and untrustworthy; guilty of betrayal. Synonyms: treacherous, duplicitous, faithless. Example: "The perfidious advisor leaked the general\'s plans to the enemy."',
  },
  {
    q: 'Define "enervate" (GRE)',
    a: 'Verb: to drain of energy or vitality; to weaken. (Note: often confused with "energize" — it means the OPPOSITE.) Example: "The oppressive heat enervated the hikers before they had covered half the trail."',
  },
  {
    q: 'Define "loquacious" and its antonym (GRE)',
    a: '"Loquacious" = tending to talk a great deal; garrulous, verbose. Antonym: taciturn, reticent, laconic. GRE trap: "laconic" (few words) vs "loquacious" (many words) frequently appear together.',
  },
  {
    q: 'Define "tendentious" (GRE)',
    a: 'Adjective: promoting a particular cause or point of view; biased. Example: "The documentary was criticized for its tendentious portrayal of the conflict." Synonym: partisan, slanted, one-sided.',
  },
  {
    q: 'What does "equivocate" mean and how is it used in GRE sentence equivalence?',
    a: 'Verb: to use ambiguous language to avoid committing to a position; to hedge. In SE questions, look for "hedge" synonyms: prevaricate, temporize, vacillate. Opposite: assert, commit, avow.',
  },
  {
    q: 'Define "pellucid" (GRE)',
    a: 'Adjective: (1) translucently clear; (2) easily understood; lucid. Example: "Her pellucid explanation made even the most complex theorem accessible to first-year students." Synonym: transparent, limpid, perspicuous.',
  },
]

const benefits = [
  { title: 'Generate any word group instantly', body: 'Need "words that mean to criticize"? "High-frequency GRE adjectives"? Type the category and get a targeted deck — no browsing massive word lists.' },
  { title: 'Contextual definitions + examples', body: 'AI-generated cards include GRE-style definitions, etymology clues, synonyms, antonyms, and example sentences — the full context needed to internalize words.' },
  { title: 'SM-2 spaced repetition', body: 'Forget drilling the same list. The SM-2 algorithm resurfaces words you miss more often and spaces out words you know. Efficient to the last study session.' },
  { title: 'Upload your prep materials', body: 'Have Magoosh or Manhattan Prep PDFs? Upload and turn them into a flashcard deck automatically. No manual re-typing.' },
]

const examTags = ['Verbal Reasoning', 'Text Completion', 'Sentence Equivalence', 'High-Frequency Words', 'Magoosh 1000', 'GRE Quant Vocab']

export default function GREVocabularyFlashcardsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  return (
    <>
      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* ── Navbar ── */}
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

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50/30 -z-10" />
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                <Sparkles size={14} />
                Free AI Flashcard Generator
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Generate{' '}
                <span className="text-primary-600">GRE Vocabulary</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any word group or GRE topic and get a complete deck with definitions, synonyms, antonyms, and example sentences — in seconds. Spaced repetition included.
              </p>

              {/* Exam tags */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {examTags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate GRE Flashcards Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#sample-cards"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Example Cards
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                GRE vocab prep in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a full vocabulary deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your word group',
                  body: 'Enter a category ("words meaning to criticize"), a theme ("GRE words about deception"), or upload your prep book notes as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Each card includes the GRE-style definition, etymology, synonyms, antonyms, and an example sentence — the full context you need to internalize each word.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm ensures words you miss resurface frequently while words you know get spaced out. Efficient studying right through test day.',
                },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="relative inline-flex mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-600/25">
                      <step.icon className="text-white" size={28} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-primary-600 rounded-full flex items-center justify-center text-xs font-bold text-primary-600">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed max-w-xs mx-auto">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sample Cards ── */}
        <section id="sample-cards" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Example GRE vocabulary flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                These are the kinds of cards Esli generates — click any card to flip it.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-44 cursor-pointer [perspective:1200px]"
                  onClick={() => setFlippedCard(flippedCard === i ? null : i)}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                      flippedCard === i ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    <div className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden]">
                      <p className="text-xs text-slate-400 mb-2">Question</p>
                      <p className="text-sm font-medium text-slate-800 text-center leading-snug">{card.q}</p>
                      <p className="absolute bottom-3 right-4 text-xs text-slate-300">tap to flip</p>
                    </div>
                    <div className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-xs text-primary-500 mb-2">Answer</p>
                      <p className="text-sm text-slate-700 text-center leading-snug">{card.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Generate Your GRE Vocabulary Deck Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why GRE test-takers choose Esli
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 mb-1">{b.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{b.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                GRE vocabulary flashcard FAQs
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

        {/* ── Final CTA ── */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to boost your GRE Verbal score?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate targeted vocabulary decks in seconds. Free forever. Start studying smarter today.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate GRE Flashcards Free
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* ── Footer ── */}
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
