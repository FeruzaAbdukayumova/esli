/**
 * SEO Landing Page: Japanese Vocabulary Flashcards
 * Route: /flashcards/japanese-vocabulary
 * Meta title: Japanese Vocabulary Flashcards — AI Generator | Esli
 * Meta description: Generate Japanese vocabulary flashcards with AI. Type any topic — JLPT N5,
 *   N3, kanji, grammar — and get cards instantly. Free, spaced repetition, 14 languages.
 * Target keywords: Japanese vocabulary flashcards, JLPT flashcards, Japanese flashcards free,
 *   learn Japanese flashcards, Japanese kanji flashcards
 * Week: 2026-W15
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, Languages } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can Esli generate Japanese flashcards for specific JLPT levels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Just type a prompt like "JLPT N5 vocabulary", "JLPT N3 kanji", or "JLPT N2 grammar patterns" and Esli\'s AI generates a targeted set of flashcards for that level. You can be as specific as "JLPT N4 verbs for expressing time" and the AI will tailor the deck accordingly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli support Japanese characters (hiragana, katakana, kanji)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli fully supports Japanese script including hiragana (ひらがな), katakana (カタカナ), and kanji (漢字). Cards can include the Japanese word, furigana pronunciation, and English translation — however you prompt the AI.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a premade Japanese deck I can start with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Esli has a shared public Japanese vocabulary deck you can copy in one click from the app\'s Discover section. You can then use AI to expand it with any additional topics you need.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload Japanese textbook PDFs to create flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Upload any Japanese learning material — Genki chapters, Minna no Nihongo pages, your own study notes — and Esli will extract vocabulary and grammar points into a ready-to-study flashcard deck.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli better than Anki for Japanese?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anki requires you to manually create cards or spend time importing pre-made decks. Esli lets you type "JLPT N3 vocabulary with example sentences" and get a complete, well-formatted deck in seconds. Both apps use spaced repetition — Esli just eliminates the card-creation bottleneck.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: '食べる (たべる)',
    a: 'To eat — Taberu (Group 2 / ichidan verb)\nExample: 朝ごはんを食べる (asa gohan wo taberu) — "I eat breakfast"',
  },
  {
    q: 'JLPT N5 — 大きい vs 大きな',
    a: '大きい (ookii) is a true i-adjective used predicatively AND attributively.\n大きな (ookina) is only used attributively (before a noun).\nBoth mean "big/large".',
  },
  {
    q: 'て-form conjugation rule for Group 1 verbs (う-verbs) ending in く',
    a: 'Drop く and add いて.\nExample: 書く (kaku) → 書いて (kaite)\nException: 行く (iku) → 行って (itte)',
  },
  {
    q: '電車 vs 列車 — what\'s the difference?',
    a: '電車 (でんしゃ) = electric train, the common word for commuter trains in cities.\n列車 (れっしゃ) = train/rail vehicle (broader, includes diesel, used in formal/written Japanese).',
  },
  {
    q: 'N3 Grammar: 〜ために (tame ni)',
    a: 'Expresses purpose ("in order to") or cause ("because of").\nPurpose: 日本語を学ぶために日本に行く — "I\'m going to Japan in order to learn Japanese."\nCause: 台風のために電車が止まった — "Trains stopped because of the typhoon."',
  },
  {
    q: 'What does ちょっと mean and when is it used?',
    a: 'ちょっと (chotto) = "a little", "just a moment", or a polite refusal.\nAs refusal: ちょっと… (trailing off) = "That\'s a bit difficult…" (softened "no").\nVery common in everyday Japanese speech.',
  },
]

const benefits = [
  { title: 'Any JLPT level, any topic', body: 'JLPT N5 basics to N1 keigo — just describe what you want and Esli generates cards tailored to your level.' },
  { title: 'Full Japanese script support', body: 'Hiragana, katakana, and kanji all render correctly. Prompt for furigana or romaji alongside Japanese characters.' },
  { title: 'Upload Genki or any textbook', body: 'Drop in a PDF of your current chapter and Esli extracts every vocabulary item and grammar point automatically.' },
  { title: '14 language support', body: 'Study Japanese-to-English, Japanese-to-Spanish, Japanese-to-Korean — Esli supports 14 language pairs for translations.' },
]

export default function JapaneseVocabularyFlashcardsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  return (
    <>
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
                <Languages size={14} />
                14 Languages Supported
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Generate{' '}
                <span className="text-primary-600">Japanese Vocabulary Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any topic — JLPT N5, N3 grammar, kanji by radical, business Japanese — and get a complete study deck in seconds. Works with hiragana, katakana, and kanji. No manual card creation required.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Japanese Flashcards Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#sample-cards"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Example Cards
                </a>
              </div>

              {/* Language badge row */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['JLPT N5', 'JLPT N4', 'JLPT N3', 'JLPT N2', 'JLPT N1', 'Kanji', 'Grammar', 'Keigo'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                From zero to studying in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                No decks to download, no formatting to fix.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Describe your topic',
                  body: '"JLPT N3 vocabulary", "Japanese counters", "て-form conjugation rules", or upload your Genki PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds your deck',
                  body: 'Esli generates accurate Japanese vocabulary cards with readings, meanings, and usage examples.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review cards at the scientifically optimal intervals. Hard words come back sooner; known words less often.',
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
                Example Japanese flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Click any card to reveal the answer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-52 cursor-pointer [perspective:1200px]"
                  onClick={() => setFlippedCard(flippedCard === i ? null : i)}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                      flippedCard === i ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    <div className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden]">
                      <p className="text-xs text-slate-400 mb-2">Question</p>
                      <p className="text-lg font-semibold text-slate-800 text-center leading-snug">{card.q}</p>
                      <p className="absolute bottom-3 right-4 text-xs text-slate-300">tap to flip</p>
                    </div>
                    <div className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-xs text-primary-500 mb-2">Answer</p>
                      <p className="text-sm text-slate-700 text-center leading-snug whitespace-pre-line">{card.a}</p>
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
                Generate Your Japanese Deck Free
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
                Built for Japanese learners
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
                Japanese flashcard FAQs
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
              Start learning Japanese today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate your first Japanese deck in under 30 seconds. Free, forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Japanese Flashcards Free
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
