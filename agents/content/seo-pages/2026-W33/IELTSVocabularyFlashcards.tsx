/**
 * SEO Landing Page: IELTS Vocabulary Flashcards
 * Route: /flashcards/ielts-vocabulary
 * Meta title: IELTS Vocabulary Flashcards Free — AI Generator | Esli
 * Meta description: Generate IELTS vocabulary flashcards with AI. Academic Word List, band 7-9
 *   collocations, topic vocab — free, spaced repetition. No signup.
 * Target keywords: IELTS vocabulary flashcards, IELTS academic word list flashcards,
 *   IELTS vocab cards, IELTS band 7 vocabulary, IELTS word list study
 * Week: 2026-W33
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
      name: 'Are IELTS vocabulary flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free to use. Generate unlimited IELTS vocabulary flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which IELTS vocabulary does Esli cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli can generate flashcards for any IELTS vocabulary area: Academic Word List (AWL) subgroups, band 7-9 collocations, topic-based vocabulary (environment, technology, health, education), and Writing Task 2 discourse markers. Just type your specific focus and the AI creates targeted cards.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli better than Quizlet for IELTS vocab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quizlet has user-made IELTS sets of variable quality — many contain errors or miss key collocations. Esli generates fresh, accurate cards on demand for exactly the vocabulary band or topic you need, with example sentences showing academic usage. Esli also uses spaced repetition; Quizlet\'s free tier removed it.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my IELTS study materials to make flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — Cambridge IELTS practice tests, vocabulary workbooks, your own essay feedback — and Esli extracts key vocabulary and creates flashcards automatically. Great for turning passive highlighting into active recall.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli support my native language for IELTS vocab cards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli translates flashcard content into 13 languages including Spanish, French, German, Arabic, Chinese, Japanese, Korean, Turkish, Portuguese, Italian, Hindi, and Russian. Study IELTS vocabulary with L1 translations to build bilingual retention.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What does "mitigate" mean? Give an academic collocation.',
    a: 'To reduce the severity of something. Academic collocations: "mitigate the impact of", "mitigate risks", "measures to mitigate". Band 7+ synonym cluster: alleviate, ameliorate, attenuate.',
  },
  {
    q: 'Define "proliferate" and write a sentence for IELTS Writing Task 2.',
    a: '"Proliferate" = to increase rapidly in number. Example: "Social media platforms have proliferated to the extent that they now dominate how younger generations consume news."',
  },
  {
    q: 'What is the Academic Word List (AWL) and why does it matter for IELTS?',
    a: 'The AWL is 570 word families covering ~10% of academic text (Coxhead, 2000). Mastering the AWL lifts IELTS Reading speed and Writing band scores. High-frequency sublist 1 words: analyse, approach, area, assess, assume, authority, available, benefit, concept, context.',
  },
  {
    q: 'What are four discourse markers for IELTS Writing Task 2 "contrast"?',
    a: 'However, Nevertheless, Conversely, On the other hand. Tip: avoid "but" in formal writing. "Despite this" and "Notwithstanding" are band 8+ alternatives.',
  },
  {
    q: 'What does "ubiquitous" mean? How is it used in IELTS topic: Technology?',
    a: '"Ubiquitous" = appearing or found everywhere. Tech usage: "Smartphones have become ubiquitous in both developed and developing nations, fundamentally altering social interaction."',
  },
  {
    q: 'Give the noun, verb, adjective, and adverb forms of "sustain".',
    a: 'Noun: sustainability / sustenance. Verb: sustain. Adjective: sustainable / sustained. Adverb: sustainably. AWL word family strategy: learn all forms together to boost lexical range score.',
  },
]

const benefits = [
  {
    title: 'Target any band level or topic',
    body: 'Type "band 7 environmental vocabulary" or "AWL sublist 3" and get precise cards — not a random mix.',
  },
  {
    title: 'Collocations and word families included',
    body: 'AI cards show how words are used academically, not just definitions — collocations, example sentences, and word family forms.',
  },
  {
    title: 'Spaced repetition schedules revision',
    body: 'SM-2 algorithm resurfaces hard vocabulary at the right moment. No more forgetting "mitigate" the day before your test.',
  },
  {
    title: '13-language translations',
    body: 'Get translations into your native language alongside English definitions — proven to accelerate L2 vocabulary acquisition.',
  },
]

export default function IELTSVocabularyFlashcardsPage() {
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
                <span className="text-primary-600">IELTS Vocabulary Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any IELTS vocabulary topic — Academic Word List, band 7-9 collocations, topic vocab — and get precise, study-ready flashcards in seconds. Spaced repetition included. No signup needed.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Academic Word List', 'Band 7-9 Collocations', 'Writing Task 2', 'Environment', 'Technology', 'IELTS Reading Vocab', 'Word Families', 'Discourse Markers'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate IELTS Vocab Cards Free
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
                IELTS vocab prep in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a targeted vocabulary deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your vocabulary focus',
                  body: 'Enter "AWL sublist 1", "IELTS environment vocabulary", "band 8 collocations" — or upload your Cambridge practice test PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates targeted cards',
                  body: 'Our AI creates cards with definitions, collocations, example sentences showing academic usage, and word family forms.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Review with spaced repetition',
                  body: 'SM-2 algorithm schedules each word at the optimal moment — so vocabulary sticks before test day, not just during cramming.',
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
                Example IELTS vocabulary flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                These are the kinds of cards Esli generates — click any card to flip it.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-48 cursor-pointer [perspective:1200px]"
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
                Generate Your IELTS Vocab Deck Free
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
                Why IELTS test-takers choose Esli
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

            <div className="mt-10 text-center">
              <p className="text-sm text-slate-500">
                Also useful for:{' '}
                <a href="/flashcards/toefl" className="text-primary-600 hover:underline">TOEFL</a>
                {' · '}
                <a href="/flashcards/gre-vocabulary" className="text-primary-600 hover:underline">GRE Vocabulary</a>
                {' · '}
                <a href="/use-case/language-learners" className="text-primary-600 hover:underline">Language Learners</a>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                IELTS vocabulary flashcard FAQs
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
              Ready to boost your IELTS band score?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate targeted vocabulary flashcards in seconds. Spaced repetition. 13-language support. Free.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate IELTS Vocab Flashcards Free
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
