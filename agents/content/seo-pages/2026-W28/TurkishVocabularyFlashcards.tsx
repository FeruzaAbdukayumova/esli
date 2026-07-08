/**
 * SEO Landing Page: Turkish Vocabulary Flashcards
 * Route: /flashcards/turkish-vocabulary
 * Meta title: Turkish Vocabulary Flashcards Free — AI | Esli (51 chars)
 * Meta description: Generate Turkish vocabulary flashcards with AI. Vowel harmony, grammar, CEFR levels — free, spaced repetition. No signup needed. (133 chars)
 * Target keywords: Turkish vocabulary flashcards, learn Turkish flashcards, Turkish grammar flashcards, Turkish CEFR flashcards, Türkçe flashcard
 * Week: 2026-W28
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
      name: 'Is Turkish hard to learn with flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Turkish is learnable with flashcards and actually rewards the format well. The language is phonetically consistent (you read what you see) and highly regular — once you learn the agglutinative suffix system, the patterns repeat everywhere. Esli generates cards that break down suffixes and vowel harmony rules alongside vocabulary, so you build grammatical intuition not just word lists. The SM-2 algorithm resurfaces tricky forms at exactly the right interval.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I make flashcards for Turkish grammar, not just vocabulary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Be specific in your prompt: "Turkish vowel harmony rules with examples", "Turkish case suffixes: nominative, accusative, dative, locative, ablative, genitive", "Turkish present continuous tense conjugation", "Turkish postpositions and the cases they require." Esli generates cards that explain the rule, show the suffix, and give example sentences — not just raw word pairs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me prepare for the YDS or other Turkish proficiency exams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. For YDS (Foreign Language Exam) and TÖMER proficiency exams, specify the level and topic: \"YDS C1 academic Turkish vocabulary\", \"YDS reading comprehension vocabulary\", \"Turkish idiomatic expressions B2 level.\" You can also upload your YDS prep book as a PDF and Esli will extract the key vocabulary and grammar points into a deck.",
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Duolingo for learning Turkish?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Duolingo's Turkish course follows a fixed curriculum with gamified lessons — good for building a daily habit as an absolute beginner. Esli is topic-driven and AI-generated: create flashcards for exactly what you're studying right now, from your own materials, at whatever level you need. Esli's SM-2 algorithm is proven to build long-term vocabulary retention faster than Duolingo's point system. Many learners use both: Duolingo for exposure, Esli for deep retention.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload Turkish textbooks or course materials as PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — Turkish language course books, grammar handouts, vocabulary lists, or official TÖMER materials — and Esli extracts the key vocabulary and grammar rules into a flashcard deck. This works for PDFs in Turkish, English, or bilingual formats.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is vowel harmony in Turkish and why does it matter?',
    a: 'Turkish words change suffix vowels to match the last vowel of the stem. Back vowels (a, ı, o, u) attract back suffixes; front vowels (e, i, ö, ü) attract front suffixes. Example: ev-de (in the house, front) vs. araba-da (in the car, back). Mastering vowel harmony unlocks every suffix in the language.',
  },
  {
    q: 'How do you say "I am going" in Turkish? Break down the structure.',
    a: 'Gidiyorum. Root: git (go) — final t softens to d before vowel. Suffix: -iyor (present continuous, front vowel harmony). Personal ending: -um (1st person singular). Full breakdown: gid + iyor + um = gidiyorum. The -iyor suffix is the same for all verbs; only the vowel harmony and stem change.',
  },
  {
    q: 'What is the accusative case in Turkish and when is it used?',
    a: 'Marks specific (definite) direct objects. Suffix: -ı/-i/-u/-ü (four-way vowel harmony). With specific noun: Kitabı okudum = I read the book (that specific book). Without suffix: Kitap okudum = I read a book (indefinite, any book). English has no equivalent — Turkish makes this distinction grammatically.',
  },
  {
    q: 'What is the difference between var and yok?',
    a: 'Var = there is / exists / I have. Yok = there is not / does not exist / I don\'t have. Kitabım var = I have my book (lit. "my book exists"). Param yok = I have no money (lit. "my money doesn\'t exist"). No conjugation needed — simpler than "to have" in most European languages. Add personal suffixes for "my/your/his": kitabım (my book), kitabın (your book).',
  },
  {
    q: 'How do you form yes/no questions in Turkish?',
    a: 'Add the question particle mi/mı/mu/mü after the verb or the word being questioned. Vowel harmony applies: use mi for front/unrounded, mı for back/unrounded, mu for back/rounded, mü for front/rounded. Gidiyorsun = you are going. Gidiyor musun? = Are you going? The particle is always written as a separate word.',
  },
  {
    q: 'List the six Turkish personal pronouns and their English equivalents.',
    a: 'Ben (I), Sen (you, singular informal), O (he / she / it — no gender distinction), Biz (we), Siz (you plural, or formal singular), Onlar (they). Key point: Turkish O covers he, she, and it — one pronoun, no grammatical gender anywhere in the language. Siz is used formally like vous in French or usted in Spanish.',
  },
]

const benefits = [
  {
    title: 'Agglutinative structure made clear',
    body: 'Esli generates cards that break down Turkish suffixes step by step — you learn the patterns, not just isolated words. Understand gidiyorum before memorizing the next hundred verb forms.',
  },
  {
    title: 'Vowel harmony built into every card',
    body: 'Sample cards include the harmony rules so you internalize them alongside vocabulary. Stop second-guessing which suffix vowel to use.',
  },
  {
    title: 'CEFR A1 to C2 targeting',
    body: 'Specify your level in the prompt: beginner daily phrases, B2 academic vocabulary, or C1 literary Turkish. Esli calibrates complexity and vocabulary density accordingly.',
  },
  {
    title: 'Upload your Turkish textbooks or course materials',
    body: 'Turn any Turkish language PDF — course books, grammar handouts, TÖMER materials — into a study deck in seconds. Works with Turkish-English bilingual PDFs.',
  },
]

export default function TurkishVocabularyFlashcardsPage() {
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
                <span className="text-primary-600">Turkish Vocabulary</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any Turkish topic — vowel harmony, verb conjugation, CEFR vocabulary, daily phrases, or YDS exam prep — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['A1–C2 CEFR', 'Vowel Harmony', 'Verb Conjugation', 'Case Suffixes', 'Daily Phrases', 'YDS Exam', 'Agglutinative Grammar', 'Conversational Turkish'].map((tag) => (
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
                  Generate Turkish Flashcards Free
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
                Learn Turkish in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From your topic to a full grammar and vocabulary deck — faster than copying notes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your Turkish topic',
                  body: 'Enter "Turkish vowel harmony with examples", "present continuous and aorist tense", "daily conversational phrases A2", or upload a PDF of your course materials.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering vocabulary, suffix rules, vowel harmony, verb conjugations, and example sentences — so you learn patterns, not just word pairs.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm resurfaces tricky suffix forms at the optimal moment — words you know are spaced out; forms you struggle with come back sooner.',
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
                Example Turkish flashcards
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
                Generate Your Turkish Deck Free
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
                Why Turkish learners choose Esli
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
                Turkish flashcard FAQs
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
              Start building your Turkish vocabulary today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Type any Turkish topic and get a complete flashcard deck in seconds. Free forever — no credit card needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Turkish Flashcards Free
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
              <a href="/flashcards/arabic-vocabulary" className="hover:text-white transition-colors no-underline">Arabic Flashcards</a>
              <a href="/flashcards/hindi-vocabulary" className="hover:text-white transition-colors no-underline">Hindi Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
