/**
 * SEO Landing Page: AI Flashcards for Language Learners — Use-Case Page
 * Route: /use-case/language-learners
 * Meta title: AI Flashcards for Language Learners — Free | Esli
 * Meta description: Esli generates language flashcards instantly from any topic or PDF. Spanish, Japanese, French, TOEFL, DELE, JLPT — study smarter with AI + spaced repetition. Free.
 * Target keywords: AI flashcards language learning, language learning flashcards, vocabulary flashcards AI, AI flashcard generator language
 * Week: 2026-W16
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, Globe } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which languages does Esli support for flashcard generation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli can generate vocabulary flashcards for any language — Spanish, Japanese, French, German, Chinese, Korean, Arabic, Italian, Portuguese, Russian, and more. The AI generates accurate target-language content with translations and example sentences. The app interface itself supports 14 languages.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli better than Duolingo for vocabulary learning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Duolingo builds habits through gamification. Esli is built for focused vocabulary drilling. You generate exactly the words you need — JLPT N3 vocabulary, DELE B2 topic lists, business English collocations — and study with SM-2 spaced repetition. Many learners use Duolingo for daily streaks and Esli for serious vocabulary work.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I generate flashcards for language exams like JLPT, DELE, or TOEFL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Just type the exam and level — "JLPT N3 vocabulary", "DELE B2 adjectives", "TOEFL academic word list" — and Esli generates a targeted deck for that exam. You can also upload PDF study guides or word lists and Esli will turn them into cards automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli use spaced repetition for language learning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli uses the SM-2 spaced repetition algorithm — the gold standard for vocabulary retention. Words you struggle with appear more frequently; words you know are spaced out. Research shows spaced repetition is the most effective method for long-term vocabulary acquisition.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my language textbook as a PDF and get flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — a textbook chapter, a vocabulary list, grammar notes, or an article in your target language — and Esli\'s AI extracts the key vocabulary and creates a complete flashcard deck automatically. No manual card creation.',
      },
    },
  ],
}

const useCases = [
  {
    language: 'Spanish',
    flag: '🇪🇸',
    examples: ['A1–C2 vocabulary by level', 'DELE exam prep', 'Business Spanish', 'Irregular verbs'],
    link: '/flashcards/spanish-vocabulary',
  },
  {
    language: 'Japanese',
    flag: '🇯🇵',
    examples: ['JLPT N5–N1 vocab', 'Kanji readings', 'Grammar patterns', 'Business Japanese'],
    link: '/flashcards/japanese-vocabulary',
  },
  {
    language: 'French',
    flag: '🇫🇷',
    examples: ['DELF / DALF prep', 'French subjunctive', 'Business vocabulary', 'Idioms & expressions'],
    link: null,
  },
  {
    language: 'German',
    flag: '🇩🇪',
    examples: ['A1–C2 Goethe prep', 'Strong / irregular verbs', 'Separable verbs', 'Case endings'],
    link: null,
  },
  {
    language: 'English (TOEFL/IELTS)',
    flag: '🌍',
    examples: ['Academic word list', 'TOEFL vocabulary', 'IELTS topic vocab', 'Collocations'],
    link: null,
  },
  {
    language: 'Chinese (HSK)',
    flag: '🇨🇳',
    examples: ['HSK 1–6 vocabulary', 'Chinese characters', 'Measure words', 'Chengyu idioms'],
    link: null,
  },
]

const painPoints = [
  {
    problem: 'Building decks takes forever',
    solution: 'Type a topic, get a complete deck in 10 seconds. No manual entry, no copy-pasting from vocabulary lists.',
  },
  {
    problem: 'Pre-built decks don\'t match your level',
    solution: 'Generate exactly the vocabulary you need — your level, your exam, your topic. Not someone else\'s generic word list.',
  },
  {
    problem: 'Regular studying doesn\'t make words stick',
    solution: 'SM-2 spaced repetition schedules cards at the scientifically optimal interval. Words you struggle with resurface more often.',
  },
  {
    problem: 'Can\'t study on the go',
    solution: 'Esli works on any device. Study on your phone during your commute, sync to your laptop for longer sessions.',
  },
]

const benefits = [
  { title: 'Any language, any level', body: 'Spanish, Japanese, French, German, Chinese, Korean — and more. Type your level and topic, get targeted vocabulary cards instantly.' },
  { title: 'Exam-specific decks', body: 'JLPT, DELE, DALF, TOEFL, IELTS, HSK — type the exam name and level and get a deck built specifically for that test.' },
  { title: 'PDF upload', body: 'Upload your textbook PDF, vocabulary list, or article and Esli turns it into a flashcard deck automatically. Study the words that matter to you.' },
  { title: 'Built-in translation (13 languages)', body: 'Any card can be translated into your native language with one click. Study with source + target language side by side.' },
]

export default function AIFlashcardsLanguageLearnersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
                <Globe size={14} />
                AI Flashcards for Language Learners
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Stop Searching for Decks.{' '}
                <span className="text-primary-600">Generate the Vocabulary You Need</span>
                {' '}with AI.
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any language, level, or exam topic — Spanish DELE, Japanese JLPT, TOEFL, IELTS — and Esli generates a complete vocabulary deck in seconds. Free, with spaced repetition.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Your First Deck Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#languages"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See All Languages
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pain Points + Solutions ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                The problems Esli solves for language learners
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {painPoints.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
                  <p className="text-sm font-semibold text-rose-500 mb-2">Problem: {p.problem}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="font-medium text-emerald-600">Solution: </span>
                    {p.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Build your vocabulary deck in 3 steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your topic',
                  body: 'Enter a language + level + topic: "Japanese JLPT N3 vocabulary", "Spanish food and cooking phrases", "TOEFL academic word list". Or upload a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your cards',
                  body: 'Vocabulary cards with target-language words, translations, example sentences, and usage notes. Accurate, level-appropriate, instantly ready.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 scheduling ensures new words get reinforced at the right interval. You build genuine long-term retention, not short-term cramming.',
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

        {/* ── Languages / Use Cases ── */}
        <section id="languages" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Works for any language
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Generate vocabulary for any language and level. A few popular examples:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((lang, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{lang.flag}</span>
                    <h3 className="text-base font-semibold text-slate-900">{lang.language}</h3>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {lang.examples.map((ex, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 bg-primary-400 rounded-full shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                  {lang.link ? (
                    <a href={lang.link} className="text-sm font-medium text-primary-600 hover:text-primary-700 no-underline">
                      See {lang.language} page →
                    </a>
                  ) : (
                    <a
                      href={`${APP_URL}/register`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 no-underline"
                    >
                      Generate {lang.language} cards →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why language learners choose Esli
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
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
        <section id="faq" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Language learning flashcard FAQs
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
              Start building your vocabulary today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate exactly the words you need in any language. Free forever. No account required to try.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Your First Deck Free
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
              <a href="/flashcards/spanish-vocabulary" className="hover:text-white transition-colors no-underline">Spanish</a>
              <a href="/flashcards/japanese-vocabulary" className="hover:text-white transition-colors no-underline">Japanese</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
