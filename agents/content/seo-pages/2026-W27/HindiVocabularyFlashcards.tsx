/**
 * SEO Landing Page: Hindi Vocabulary Flashcards
 * Route: /flashcards/hindi-vocabulary
 * Meta title: Hindi Vocabulary Flashcards Free — AI | Esli (50 chars)
 * Meta description: Generate Hindi vocabulary flashcards with AI. Devanagari script, CEFR levels, spoken Hindi — free, spaced repetition. No signup. (136 chars)
 * Target keywords: Hindi vocabulary flashcards, Devanagari script flashcards, learn Hindi flashcards, Hindi grammar flashcards AI, Hindi CEFR flashcards
 * Week: 2026-W27
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
      name: 'Is Hindi hard to learn with flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hindi is very learnable with flashcards, especially for English speakers who want to build vocabulary fast. Esli generates cards that include the Devanagari script, transliteration, and English meaning side by side — so you learn to read the script while building vocabulary. The SM-2 spaced repetition algorithm resurfaces words at exactly the right time so nothing slips through.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I learn Devanagari script using Esli flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. When you type a Hindi topic, Esli generates cards that show the Devanagari spelling alongside IAST transliteration and the English meaning. You can also prompt specifically for script practice: try "Hindi Devanagari vowels and matras" or "conjunct consonants in Hindi" to drill the writing system directly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli work for Bollywood / conversational Hindi as well as formal Hindi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Just be specific in your prompt. "Conversational Hindi greetings", "Bollywood slang vocabulary", or "Hindi Urdu common phrases" all produce very different cards from "formal Hindi business vocabulary" or "Hindi CEFR B2 academic words". The AI adapts to whatever register you specify.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload Hindi PDF textbooks or course materials?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — textbook chapters, vocabulary sheets, grammar handouts — and Esli extracts the key vocabulary and grammar rules into a flashcard deck automatically. This works for PDFs written in Hindi, English, or a mix of both scripts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Duolingo for learning Hindi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Duolingo's Hindi course follows a fixed curriculum with gamified lessons — useful for absolute beginners wanting a daily habit. Esli is vocabulary-first and AI-driven: generate flashcards on any Hindi topic you're currently studying, from your own materials, at whatever level you need. Esli's SM-2 algorithm is scientifically proven to accelerate vocabulary retention faster than Duolingo's point system.",
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What does नमस्ते (namaste) mean and when is it used?',
    a: 'A respectful greeting meaning "I bow to the divine in you." Used for hello and goodbye in formal and informal settings. Palms pressed together (añjali mudrā). Also written नमस्कार (namaskār) in more formal registers.',
  },
  {
    q: 'What is the difference between आप (āp), तुम (tum), and तू (tū)?',
    a: 'Three levels of "you": आप = formal/respectful (use with elders, strangers, boss). तुम = familiar (friends, younger relatives). तू = intimate or dismissive (close friends, children, or can be rude). Verb forms change with each pronoun.',
  },
  {
    q: 'How do Hindi postpositions work? Give an example with को (ko).',
    a: 'Hindi uses postpositions (after the noun) instead of prepositions. को (ko) marks indirect objects and destinations: मुझे पानी दो = give me water; वह दिल्ली को जा रही है = she is going to Delhi. Nouns before को take oblique case.',
  },
  {
    q: 'What is the oblique case in Hindi and when does it apply?',
    a: 'Nouns change form before postpositions and in some other contexts — this is the oblique case. Masculine singular nouns ending in -ā change: लड़का (boy) → लड़के के साथ (with the boy). Feminine nouns generally do not change. Knowing this prevents very common errors.',
  },
  {
    q: 'Translate and explain: मैं खाना खा रहा हूँ (main khānā khā rahā hūn).',
    a: '"I am eating food." Structure: मैं (I) + खाना (food, direct object) + खा (eat, verb root) + रहा (present participle, masculine) + हूँ (am, first person singular). The रहा/रही/रहे form marks continuous aspect; gender of the participle matches the subject.',
  },
  {
    q: 'What are the Devanagari vowels and their matra forms?',
    a: 'Vowels: अ आ इ ई उ ऊ ए ऐ ओ औ. When attached to a consonant they become matras (diacritics): क ka, का kā, कि ki, की kī, कु ku, कू kū, के ke, कै kai, को ko, कौ kau. अ has no matra — it is the inherent vowel of every consonant.',
  },
]

const benefits = [
  {
    title: 'Devanagari + transliteration on every card',
    body: 'Study the script from day one. Cards show Devanagari text, IAST transliteration, and English meaning so you build reading ability alongside vocabulary.',
  },
  {
    title: 'Any register or dialect',
    body: 'Generate standard Hindi, conversational Hindustani, Urdu-influenced vocabulary, or Bollywood slang — just specify in your topic prompt.',
  },
  {
    title: 'Grammar cards, not just words',
    body: 'Esli generates cards covering postpositions, verb conjugations, case endings, and other grammar rules — not only isolated vocabulary.',
  },
  {
    title: 'Upload your textbook or study materials',
    body: 'Turn any PDF — Hindi course chapters, vocabulary sheets, teacher handouts — into a full study deck automatically, in seconds.',
  },
]

export default function HindiVocabularyFlashcardsPage() {
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
                <span className="text-primary-600">Hindi Vocabulary</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any Hindi topic — Devanagari script, conversational phrases, grammar rules, CEFR vocabulary levels — and get a complete flashcard deck in seconds. Script, transliteration, and meaning included. Free, with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Devanagari Script', 'Spoken Hindi', 'Formal Hindi', 'Hindi Grammar', 'CEFR A1–C1', 'Verb Conjugation', 'Bollywood Vocab', 'Urdu–Hindi'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-primary-700 bg-primary-50 border border-primary-200 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Hindi Flashcards Free
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
                Learn Hindi vocabulary in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a full deck — faster than copying words into a notebook.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your Hindi topic',
                  body: 'Enter "Devanagari vowels", "Hindi postpositions", "conversational phrases for beginners", or upload a PDF of your course materials.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards with Devanagari script, IAST transliteration, and English meaning — covering vocabulary, grammar, and script reading together.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm resurfaces words at the optimal moment — words you struggle with come back sooner, words you know are spaced further out.',
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
                Example Hindi flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Click any card to flip it and see the answer.
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
                Generate Your Hindi Deck Free
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
                Why Hindi learners choose Esli
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

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Hindi flashcard FAQs
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
              Start building your Hindi vocabulary today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Type any Hindi topic and get a complete flashcard deck in seconds. Free forever — no credit card needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Hindi Flashcards Free
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
              <a href="/flashcards/japanese-vocabulary" className="hover:text-white transition-colors no-underline">Japanese Flashcards</a>
              <a href="/flashcards/arabic-vocabulary" className="hover:text-white transition-colors no-underline">Arabic Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
