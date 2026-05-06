/**
 * SEO Landing Page: AI Flashcards for High School Students
 * Route: /use-case/high-school-students
 * Meta title: AI Flashcards for High School Students — Free | Esli
 * Meta description: Esli generates high school flashcards instantly from any topic or PDF. AP exams, SAT, history, biology — study smarter with AI and spaced repetition. Free.
 * Target keywords: AI flashcards for high school, high school flashcard app free, AI study tool for students, high school study app
 * Week: 2026-W19
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, BookOpen, Atom, Calculator, Globe } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Esli free for high school students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free to use. You can generate unlimited flashcards with AI, study with spaced repetition, and access all core features — no credit card, no ads, no trial period.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which high school subjects can I make flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any subject: AP Biology, AP History, AP Chemistry, AP English, AP Microeconomics, SAT vocabulary, geometry, algebra, foreign languages (Spanish, French, German), and more. Type any topic and Esli generates a complete deck of Q&A flashcards instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I turn my class notes or textbook into flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — your textbook chapters, class notes, teacher handouts, or AP prep books — and Esli\'s AI will extract the key concepts and build a flashcard deck automatically. No manual entry needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli use spaced repetition like Anki?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli uses the SM-2 spaced repetition algorithm — the same one behind Anki — but without Anki\'s steep learning curve. Cards you struggle with come back sooner; cards you know well are scheduled further out so you focus where it counts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I share my flashcard decks with classmates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can share decks with friends or make them public for other students to copy. Esli also has 800+ premade community decks available for free.',
      },
    },
  ],
}

const subjects = [
  { icon: Atom, name: 'AP Biology', desc: 'Cells, genetics, evolution, ecology' },
  { icon: BookOpen, name: 'AP History', desc: 'US, World, European, Government' },
  { icon: Calculator, name: 'AP Calculus', desc: 'Derivatives, integrals, limits' },
  { icon: Globe, name: 'Foreign Languages', desc: 'Spanish, French, German, Japanese' },
  { icon: Sparkles, name: 'AP Chemistry', desc: 'Stoichiometry, reactions, bonding' },
  { icon: Brain, name: 'SAT / ACT Prep', desc: 'Vocabulary, math, reading' },
]

const painPoints = [
  { problem: 'Spending hours making flashcards the night before a test', solution: 'Generate a complete deck in under a minute — just type the topic' },
  { problem: 'Forgetting everything you studied a week later', solution: 'Spaced repetition surfaces cards at the exact moment you\'d forget them' },
  { problem: 'Textbooks that are too long to re-read before exams', solution: 'Upload any PDF and Esli extracts the key concepts as flashcards automatically' },
  { problem: 'Paying for Quizlet Plus just to study without ads', solution: 'Esli is free — all core features, no subscription required' },
]

const sampleCards = [
  {
    q: 'What is the process of meiosis and why is it important?',
    a: 'Meiosis is a type of cell division that produces 4 haploid (n) gametes from one diploid (2n) cell. Two rounds of division (Meiosis I and II). Importance: genetic variation via crossing over and independent assortment; sexual reproduction.',
  },
  {
    q: 'What was the main cause of World War I?',
    a: 'Multiple causes (MAIN): Militarism, Alliance systems (Triple Entente vs Triple Alliance), Imperialism, Nationalism. Immediate trigger: assassination of Archduke Franz Ferdinand (1914). Underlying: competition between European powers.',
  },
  {
    q: 'What is the derivative of f(x) = x³ + 2x² - 5?',
    a: "f'(x) = 3x² + 4x. Power rule: bring down the exponent, reduce it by 1. The constant -5 disappears (derivative of a constant = 0).",
  },
  {
    q: 'What does "ubiquitous" mean? Use it in a sentence.',
    a: 'Ubiquitous (adj.) = present, appearing, or found everywhere. Example: "Smartphones have become ubiquitous in modern life." SAT tip: from Latin "ubique" (everywhere). Synonyms: omnipresent, pervasive.',
  },
  {
    q: 'What is a covalent bond? How does it differ from an ionic bond?',
    a: 'Covalent bond: atoms share electrons (usually between nonmetals). Ionic bond: one atom transfers electrons to another, creating charged ions (usually metal + nonmetal). Example: H₂O is covalent; NaCl is ionic.',
  },
  {
    q: 'What are the 3 branches of the U.S. government and their main functions?',
    a: 'Legislative (Congress): makes laws. Executive (President): enforces laws. Judicial (Supreme Court): interprets laws. Checks and balances prevent any branch from becoming too powerful.',
  },
]

export default function AIFlashcardsHighSchoolStudentsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

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
                Free AI Study Tool for Students
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                AI Flashcards for{' '}
                <span className="text-primary-600">High School Students</span>{' '}
                — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Stop spending hours making flashcards. Type any topic or upload your notes and Esli's AI generates a complete study deck in seconds. AP exams, SAT, every subject.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Start Studying Free
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

        {/* Pain Points */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                The problems every high schooler knows
              </h2>
              <p className="mt-4 text-lg text-slate-600">And how Esli solves them.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {painPoints.map((item, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-sm text-slate-500 line-through mb-2">{item.problem}</p>
                  <p className="text-base font-medium text-slate-900 flex items-start gap-2">
                    <Check size={18} className="text-primary-600 shrink-0 mt-0.5" />
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subjects Grid */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Every subject, instant flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Esli generates cards for any high school topic in seconds.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {subjects.map((subject, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <subject.icon size={22} className="text-primary-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">{subject.name}</h3>
                  <p className="text-sm text-slate-500">{subject.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                From notes to flashcards in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Spend more time studying, less time making cards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type a topic or upload a PDF',
                  body: 'Enter anything — "AP Bio Chapter 9", "SAT vocab list", "World War I causes" — or upload your class notes PDF directly.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli\'s AI creates complete Q&A flashcards covering key terms, concepts, dates, formulas, and definitions.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Cards you get wrong come back more often. Cards you know get spaced out. You spend time on what actually needs work.',
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

        {/* Sample Cards */}
        <section id="sample-cards" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Example high school flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Across subjects — this is what Esli generates. Click any card to flip it.
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
                Generate Your Study Deck Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Frequently asked questions
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
              Study smarter, not harder.
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any subject in seconds with AI. Free forever — no credit card needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Start Studying Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Taking AP exams? See our{' '}
              <a href="/flashcards/ap-biology" className="text-white underline hover:no-underline">AP Biology</a>
              ,{' '}
              <a href="/flashcards/microeconomics" className="text-white underline hover:no-underline">AP Microeconomics</a>
              , and{' '}
              <a href="/flashcards/sat-vocabulary" className="text-white underline hover:no-underline">SAT vocabulary</a>{' '}
              flashcard pages.
            </p>
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
