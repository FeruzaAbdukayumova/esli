/**
 * SEO Landing Page: Korean Vocabulary Flashcards
 * Route: /flashcards/korean-vocabulary
 * Meta title: Korean Vocabulary Flashcards Free — AI Generator | Esli
 * Meta description: Generate Korean vocabulary flashcards with AI. TOPIK prep, Hangul, K-drama vocab — type any topic and get cards instantly. Free.
 * Target keywords: Korean vocabulary flashcards, TOPIK flashcards, learn Korean flashcards, Korean study cards free, Korean flashcards AI
 * Week: 2026-W23
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
      name: 'Are Korean vocabulary flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited Korean vocabulary flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate TOPIK flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "TOPIK I vocabulary", "TOPIK II intermediate grammar", "TOPIK writing expressions", or "TOPIK II advanced vocabulary" and Esli generates targeted Korean cards in seconds. You can also upload TOPIK practice books or study guides as a PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which Korean topics can I make flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic: Hangul pronunciation, beginner vocabulary (TOPIK I), intermediate grammar patterns, advanced vocabulary (TOPIK II), K-drama expressions, business Korean, honorifics and speech levels, Korean numbers and counting, travel phrases, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload Korean study materials as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your Korean textbook, TOPIK practice book, vocabulary lists, or grammar notes — Esli\'s AI extracts words, definitions, example sentences, and grammar patterns into flashcards automatically. Great for turning any resource into a study deck.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli better than Duolingo for learning Korean vocabulary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'They serve different purposes. Duolingo uses gamified lessons with preset content. Esli lets you generate flashcards for any Korean topic instantly — TOPIK vocabulary, K-drama phrases, business Korean, or whatever you\'re studying — using spaced repetition to maximize retention.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: '사랑해요 (saranghaeyo) — what does this mean and when do you use it?',
    a: '"I love you" — polite/formal form. The casual form is 사랑해 (saranghae). Used with anyone you love, but context matters: 사랑해요 shows respect in speech level (존댓말), while 사랑해 is intimate/informal (반말).',
  },
  {
    q: 'What is the difference between 이다 and 있다?',
    a: '이다 = "to be / to equal" (identity/equation): 저는 학생이에요 = I am a student. 있다 = "to exist / to have": 책이 있어요 = There is a book / I have a book. 없다 is the negative of 있다 (to not exist/not have).',
  },
  {
    q: 'What does the grammar pattern ~(으)면 mean?',
    a: '"If/when ~". Attaches to a verb/adjective stem. Example: 시간이 있으면 = if you have time; 비가 오면 = if it rains. Add 으면 after consonant-ending stems, 면 after vowel-ending stems.',
  },
  {
    q: '감사합니다 vs 고마워요 — what is the difference?',
    a: '감사합니다 (formal/polite): most formal way to say "thank you" — use with elders, strangers, business contexts. 고마워요 (polite/casual): friendly, everyday thanks. 고마워 (informal): casual, used between close friends or to someone younger.',
  },
  {
    q: 'What is 존댓말 and why does it matter for Korean learners?',
    a: '존댓말 = honorific/formal speech level — used with strangers, elders, superiors. Korean has multiple speech levels that change verb endings. Learning when to switch between formal (합쇼체), polite (해요체), and informal (해체/반말) is essential for natural Korean.',
  },
  {
    q: 'What does 화이팅 (hwaiting) mean?',
    a: '"Fighting!" — a Korean expression of encouragement, like "You can do it!" / "Good luck!" / "Go for it!". Commonly heard before exams, sports events, or when someone is facing a challenge. Borrowed from English "fighting" with Korean pronunciation.',
  },
]

const benefits = [
  {
    title: 'Any Korean topic in seconds',
    body: 'Type "K-drama slang", "TOPIK II grammar patterns", "Korean numbers", or "honorifics 존댓말" and get a complete vocab and phrase deck instantly — with Korean script, romanization, and example sentences.',
  },
  {
    title: 'Upload study books as PDF',
    body: 'Turn your TOPIK practice book, Korean textbook, or vocabulary list PDF into a complete flashcard deck. Esli extracts words, definitions, grammar notes, and example sentences automatically.',
  },
  {
    title: 'SM-2 spaced repetition',
    body: 'The most effective algorithm for vocabulary retention. Difficult words like honorific speech levels resurface at exactly the right time — building real long-term memory.',
  },
  {
    title: '14 interface languages',
    body: 'Study Korean through your native language. Esli supports 14 interface languages so you can keep learning without language-barrier friction.',
  },
]

export default function KoreanVocabularyFlashcardsPage() {
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
                Free AI Flashcard Generator
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Generate{' '}
                <span className="text-primary-600">Korean Vocabulary Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any Korean topic — TOPIK prep, K-drama vocab, grammar patterns, business Korean — and get a complete flashcard deck in seconds. No manual card entry, no formatting vocabulary lists by hand.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  'TOPIK I & II',
                  'Hangul Basics',
                  'K-Drama Vocabulary',
                  'Grammar Patterns',
                  'Honorifics',
                  'Business Korean',
                  'Travel Phrases',
                  'Korean Numbers',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-full border border-primary-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Korean Flashcards Free
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

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Learn Korean in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a full vocab deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your Korean topic',
                  body: 'Enter anything — "TOPIK II vocabulary level 4", "K-drama slang expressions", "Korean speech levels and honorifics" — or upload your Korean textbook, TOPIK prep guide, or vocabulary list as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates flashcards with Korean script, romanization, meaning, and example sentences — tailored to your target level and study goal.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. Words you find tricky — like irregular verbs or confusing speech levels — resurface at exactly the right time to build lasting memory.',
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
        <section id="sample-cards" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Example Korean vocabulary flashcards
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
                Generate Your Korean Deck Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why Korean learners choose Esli
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all"
                >
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

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Korean flashcard FAQs
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
              Ready to master Korean?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of language learners generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Korean Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Learning other languages?{' '}
              <a href="/flashcards/japanese-vocabulary" className="text-white underline hover:no-underline">
                Japanese flashcards
              </a>{' '}
              and{' '}
              <a href="/flashcards/spanish-vocabulary" className="text-white underline hover:no-underline">
                Spanish flashcards
              </a>{' '}
              are free too.
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
