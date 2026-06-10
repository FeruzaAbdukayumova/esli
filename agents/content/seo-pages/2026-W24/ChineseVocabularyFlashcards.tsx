/**
 * SEO Landing Page: Chinese Vocabulary Flashcards
 * Route: /flashcards/chinese-vocabulary
 * Meta title: Chinese Vocabulary Flashcards Free — AI Generator | Esli
 * Meta description: Generate Chinese vocabulary flashcards with AI. HSK 1-6, Mandarin tones, characters — type any topic and get cards instantly. Free.
 * Target keywords: chinese vocabulary flashcards, HSK flashcards, Mandarin flashcards free, HSK 2 flashcards, learn Chinese flashcards
 * Week: 2026-W24
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
      name: 'Are Chinese vocabulary flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited Chinese vocabulary flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate HSK flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "HSK 2 vocabulary", "HSK 4 grammar patterns", or "HSK 6 advanced characters" and Esli generates targeted Q&A cards with pinyin, tones, example sentences, and English definitions in seconds. You can also upload your HSK textbook or prep materials as a PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli include pinyin and tones in the flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. When you generate Chinese vocabulary cards, Esli\'s AI includes the Chinese character, pinyin with tone marks, and English meaning on each card. You can generate cards focused specifically on tone pairs, tone sandhi rules, or tricky pronunciation patterns.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload a Chinese textbook PDF to make flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your Integrated Chinese, New Practical Chinese Reader, HSK Standard Course, or any course handouts. Esli\'s AI extracts vocabulary, grammar patterns, and example sentences into a complete flashcard deck automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli better than Anki for learning Chinese?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With Anki, building a Chinese vocabulary deck means manually entering every character, pinyin, and definition — hours of setup before you can study. Esli generates a full deck from a topic or PDF in seconds and uses the same SM-2 spaced repetition algorithm. No desktop install, works on any device.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the four tones of Mandarin Chinese? Give an example with 妈.',
    a: '1st tone (mā) — high level: 妈 (mother). 2nd tone (má) — rising: 麻 (hemp). 3rd tone (mǎ) — dipping: 马 (horse). 4th tone (mà) — falling: 骂 (scold). Neutral tone (ma) — unstressed, e.g. 吗 (question particle).',
  },
  {
    q: 'What is the difference between 的, 地, and 得 in Chinese?',
    a: '的 (de) links adjectives/nouns to nouns: 漂亮的女孩 (pretty girl). 地 (de) links adverbs to verbs: 快乐地唱歌 (sing happily). 得 (de) links verbs to result/degree complements: 跑得很快 (run very fast). All pronounced "de" in modern speech.',
  },
  {
    q: 'What is a 量词 (liàngcí) and give 3 examples?',
    a: '量词 are measure words (classifiers) required between a number and a noun. Examples: 一本书 (yī běn shū) — one book (本 for bound things); 一条鱼 (yī tiáo yú) — one fish (条 for long flexible things); 一张纸 (yī zhāng zhǐ) — one sheet of paper (张 for flat things).',
  },
  {
    q: 'Explain the 把 (bǎ) sentence structure in Chinese.',
    a: '把 moves the object before the verb to emphasize a deliberate action or result: Subject + 把 + Object + Verb + Result/Complement. Example: 我把书放在桌子上 (I put the book on the table). Used when action causes a change in the object\'s state or location.',
  },
  {
    q: 'What is tone sandhi (变调) in Mandarin? Give the key rule.',
    a: 'Tone sandhi is the automatic change of a tone in certain combinations. Key rule: when two 3rd tones occur together, the first becomes a 2nd tone. Example: 你好 (nǐ hǎo) is pronounced níhǎo, not nǐhǎo. Also: 不 (normally 4th tone) becomes 2nd tone before another 4th tone: 不对 → búduì.',
  },
  {
    q: 'What does the verb-result complement (结果补语) structure indicate?',
    a: '结果补语 follows a verb to show the result or completion of the action. Structure: Verb + Result Complement. Examples: 听懂 (tīng dǒng) = listen + understand = understand by listening; 写完 (xiě wán) = write + finish = finish writing; 找到 (zhǎo dào) = look + arrive = find successfully.',
  },
]

const benefits = [
  {
    title: 'HSK 1-6 exam prep in seconds',
    body: 'Type "HSK 3 vocabulary list", "HSK 5 grammar points", or "HSK 6 advanced characters" and get a targeted deck covering every word and pattern on the official syllabus.',
  },
  {
    title: 'Characters, pinyin, and tones together',
    body: 'Every generated card includes the character, pinyin with tone marks, and English meaning. Generate dedicated tone-pair or tone-sandhi decks to master pronunciation.',
  },
  {
    title: 'Upload your Chinese textbook as PDF',
    body: 'Turn Integrated Chinese, HSK Standard Course, or any professor\'s handouts into a complete flashcard deck. AI extracts vocab lists, grammar notes, and example sentences automatically.',
  },
  {
    title: 'Spaced repetition keeps characters fresh',
    body: 'Chinese characters demand repetition over time. Esli\'s SM-2 algorithm surfaces characters you\'re forgetting at exactly the right moment — so 忘 (to forget) stays forgotten only in your deck.',
  },
]

export default function ChineseVocabularyFlashcardsPage() {
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
                <span className="text-primary-600">Chinese Vocabulary Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any Mandarin topic — HSK 1-6, tones, characters, grammar patterns, business Chinese — and get a complete flashcard deck with pinyin and meanings in seconds. No manual card entry.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  'HSK 1 Basics',
                  'HSK 2 & 3',
                  'HSK 4-6 Advanced',
                  'Tones & Pronunciation',
                  'Chinese Characters',
                  'Grammar Patterns',
                  'Business Chinese',
                  'Travel Phrases',
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
                  Generate Chinese Flashcards Free
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
                Learn Chinese in 3 simple steps
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
                  title: 'Type your Chinese topic',
                  body: 'Enter anything — "HSK 3 vocabulary", "Mandarin tones and tone sandhi", "Chinese measure words" — or upload your Integrated Chinese textbook, HSK prep book, or class notes as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards covering characters, pinyin with tone marks, English meanings, example sentences, and grammar notes — tailored precisely to your topic and level.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. Characters and tones you struggle with resurface at exactly the right intervals — so you retain what you learn and don\'t waste time on what you already know.',
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
                Example Chinese flashcards
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
                Generate Your Chinese Vocab Deck Free
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
                Why Chinese learners choose Esli
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
                Chinese flashcard FAQs
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
              Ready to master Mandarin?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of language learners generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Chinese Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also learning other languages?{' '}
              <a href="/flashcards/japanese-vocabulary" className="text-white underline hover:no-underline">
                Japanese flashcards
              </a>{' '}
              and{' '}
              <a href="/flashcards/korean-vocabulary" className="text-white underline hover:no-underline">
                Korean flashcards
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
