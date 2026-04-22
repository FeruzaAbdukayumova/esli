/**
 * SEO Landing Page: SAT Vocabulary Flashcards
 * Route: /flashcards/sat-vocabulary
 * Meta title: SAT Vocabulary Flashcards — AI Generator | Esli
 * Meta description: Generate SAT vocabulary flashcards with AI. Type any SAT word list or topic and get study cards instantly. Free, spaced repetition. Score higher on the SAT.
 * Target keywords: SAT vocabulary flashcards, SAT flashcards free, SAT prep flashcards, SAT word list flashcards
 * Week: 2026-W17
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
      name: 'Are SAT vocabulary flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. You can generate unlimited SAT vocabulary flashcards with AI, study with spaced repetition, and access all core features — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate SAT vocabulary flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any SAT vocabulary topic — "SAT high-frequency words", "SAT Reading passage vocabulary", "Latin and Greek roots for SAT", "Barron\'s 1000 SAT words" — and the AI creates accurate flashcards with definitions, example sentences, synonyms, and memory tips. You can also upload a prep book PDF and Esli will extract vocabulary cards automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli use spaced repetition for SAT prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli uses the SM-2 spaced repetition algorithm to schedule reviews at the optimal time. Words you struggle with appear more often; words you already know are spaced further out. This approach is far more effective than re-reading word lists and is proven to improve long-term retention.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many SAT vocabulary words should I study?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most SAT prep experts recommend mastering 500-1000 high-frequency words. With Esli, you can generate topic-specific decks — "SAT tier-1 must-know words", "rare literary SAT vocab", "words from past SAT Reading passages" — and work through them systematically with spaced repetition. Start with the 300 most common SAT words and expand from there.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli better than Quizlet for SAT vocabulary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quizlet has premade SAT word lists, which is useful. Esli lets you generate custom decks from any topic or PDF in seconds, plus its SM-2 spaced repetition is more scientifically rigorous than Quizlet\'s default scheduling. Many students use both: Quizlet for browsing premade decks, Esli for building custom decks from their specific prep materials and studying with optimized spaced repetition.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'Define "obsequious" (SAT high-frequency) and use it in a sentence.',
    a: 'Obsequious (adj.) = excessively eager to serve or please; fawning. Example: "The obsequious assistant agreed with everything his boss said, regardless of merit." Synonyms: sycophantic, servile, ingratiating.',
  },
  {
    q: 'What does "laconic" mean, and what is its Greek root?',
    a: 'Laconic (adj.) = using very few words; brief and concise. From Greek "Lakonikos" — referring to Sparta (Lakonia), whose people were famously terse. Example: "Her laconic reply — \'No\' — ended the debate." Antonym: verbose, loquacious.',
  },
  {
    q: 'Distinguish "enervate" from "energize" — a common SAT trap.',
    a: 'Enervate (v.) = to weaken, drain energy or vitality. Example: "The oppressive heat enervated the hikers." NOT related to "energy" despite the similar spelling. It means the OPPOSITE of energize. Root: Latin "enervare" (to remove nerves).',
  },
  {
    q: 'What does "pellucid" mean? Use the Latin root to remember it.',
    a: 'Pellucid (adj.) = translucently clear; easy to understand. From Latin "pellucidus" (transparent). Think: "per" (through) + "lucid" (light/clear). Example: "Her pellucid prose made even complex ideas accessible." Synonyms: lucid, transparent, limpid.',
  },
  {
    q: 'Define "equivocate" and explain how "equi-" and "voc-" help you remember it.',
    a: 'Equivocate (v.) = to use ambiguous language to conceal truth or avoid commitment. "Equi-" = equal/both, "voc-" = voice/words → speaking in two equal directions at once. Example: "The politician equivocated when asked about the scandal." Synonyms: hedge, prevaricate, be evasive.',
  },
  {
    q: 'What is the difference between "furtive" and "surreptitious"?',
    a: 'Both mean secretive/done in hiding, but there\'s a nuance: Furtive = done quickly to avoid being noticed (furtive glance). Surreptitious = done in a way that avoids notice, often implying something forbidden. Both are common SAT synonyms — knowing both earns points on synonym questions.',
  },
]

const benefits = [
  { title: 'Any word list, instantly', body: 'Type "Barron\'s 1000 SAT words", "Latin root vocabulary", or any topic — get a targeted deck in seconds. No more searching for the right premade list.' },
  { title: 'Upload your prep book', body: 'Have a Princeton Review, Kaplan, or College Board PDF? Upload it and Esli generates vocabulary flashcards from your exact materials.' },
  { title: 'Definitions + context', body: 'AI-generated cards include definitions, example sentences, synonyms, antonyms, and memory tricks — everything you need to truly learn a word, not just memorize it.' },
  { title: 'SM-2 spaced repetition', body: 'Study efficiently. The algorithm ensures you spend more time on words you struggle with, less on words you know. Cover 800+ words without burning out.' },
]

const topicTags = ['High-Frequency Words', 'Latin & Greek Roots', 'Reading Passage Vocab', 'Tier 1 Must-Know', 'Literary Terms', 'Barron\'s 1000', 'Rare/Advanced Words']

export default function SATVocabularyFlashcardsPage() {
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
                <span className="text-primary-600">SAT Vocabulary</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any SAT word list, topic, or word root — and get a full deck of flashcards with definitions, examples, and memory tips in seconds. Free, with spaced repetition.
              </p>

              {/* Topic tags */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {topicTags.map(tag => (
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
                  Generate SAT Flashcards Free
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
                Build your SAT vocab deck in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a full study deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your topic',
                  body: 'Enter anything — "SAT tier-1 high-frequency vocabulary", "Latin root words for SAT", "words from past SAT Reading passages" — or upload your prep book PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates vocabulary cards with precise definitions, example sentences in context, synonyms, antonyms, and etymology notes to make words stick.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules reviews at the optimal time. Tricky words resurface more often. Cover 800+ SAT words efficiently without burning out.',
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
                Example SAT vocabulary flashcards
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
                Generate Your SAT Vocabulary Deck Free
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
                Why SAT students choose Esli
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
                SAT vocabulary flashcard FAQs
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
              Ready to boost your SAT score?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate exactly the vocabulary you need. Any word list, any topic, in seconds. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate SAT Flashcards Free
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
              <a href="/flashcards/gre-vocabulary" className="hover:text-white transition-colors no-underline">GRE Vocabulary</a>
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
