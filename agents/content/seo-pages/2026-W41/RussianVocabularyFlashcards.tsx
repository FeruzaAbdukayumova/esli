/**
 * SEO Landing Page: Russian Vocabulary Flashcards
 * Route: /flashcards/russian-vocabulary
 * Meta title: Russian Vocabulary Flashcards Free — AI | Esli
 * Meta description: Generate Russian vocabulary flashcards with AI. Cyrillic alphabet, A1-C2
 *   levels, any topic — free, spaced repetition. No signup needed.
 * Target keywords: Russian vocabulary flashcards, Russian flashcards free, learn Russian flashcards,
 *   Russian language flashcards, Russian Cyrillic flashcards, Russian words flashcards
 * Week: 2026-W41
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
      name: 'Are Russian vocabulary flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited Russian vocabulary flashcards with AI — Cyrillic alphabet, beginner A1 vocabulary, conversational phrases, advanced B2-C2 words — with spaced repetition included. No credit card or signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me learn the Russian Cyrillic alphabet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "Russian Cyrillic alphabet" and Esli generates flashcards for all 33 letters with their names, sounds, and English sound equivalents. You can also drill specific letters that look similar to Latin characters but sound different (е, р, с, у, х, н, В, М) — a common stumbling block for new learners.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Russian vocabulary topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any Russian topic: Cyrillic alphabet, A1 survival vocabulary (numbers, colors, greetings, days of the week), thematic vocabulary (food, family, work, travel, weather), verb conjugation patterns, noun declension cases (nominative, genitive, dative, accusative, instrumental, prepositional), TORFL/ТРКИ exam prep, business Russian, academic vocabulary, and TRKI B1-C2 word lists.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli handle Russian grammar in flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any grammar topic — "Russian noun cases genitive", "verb aspect perfective vs imperfective", "Russian adjective agreement", "verbs of motion" — and Esli generates cards with the rule, paradigm examples, and a common mistake to avoid. Grammar cards work alongside vocabulary so you build both at the same time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli to prepare for the TORFL / ТРКИ Russian exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "TORFL A1 vocabulary", "ТРКИ B1 word list", or specific grammar topics tested at each level and Esli generates targeted cards. You can also upload TORFL preparation materials as a PDF and Esli extracts the vocabulary and grammar points automatically.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the Russian word for "to speak / to talk" and how is it conjugated in present tense?',
    a: 'говорить (govorit\') — to speak. я говорю (I speak), ты говоришь (you speak), он/она говорит (he/she speaks), мы говорим (we speak), вы говорите (you pl. speak), они говорят (they speak). Second conjugation verb (-ить ending). Note: alternation г → говорю in 1st person sg.',
  },
  {
    q: 'What are the 6 Russian noun cases and what is the primary function of each?',
    a: 'Именительный (Nominative): subject. Родительный (Genitive): possession, absence, quantities. Дательный (Dative): indirect object, recipient. Винительный (Accusative): direct object. Творительный (Instrumental): "with", "by means of", predicate complement. Предложный (Prepositional): location with в/на, topic with о. Mnemonic: No Russians Drink Awful Intoxicating Poison.',
  },
  {
    q: 'What is the difference between perfective and imperfective verb aspect in Russian?',
    a: 'Imperfective (несовершенный вид): ongoing, repeated, or habitual action; no definite endpoint. Used for past in-progress, present, and habitual past. Example: читать (to read, ongoing). Perfective (совершенный вид): completed action with a definite endpoint. Only used for past completion and future. Example: прочитать (to read and finish). Most verbs come in aspect pairs.',
  },
  {
    q: 'What does "пожалуйста" mean and in what situations is it used?',
    a: 'пожалуйста (pozhaluysta) has two main uses: (1) "please" in requests — Дайте мне воду, пожалуйста. (Please give me water.) (2) "you\'re welcome" in response to спасибо (thank you) — Спасибо! / Пожалуйста! It is one of the first Russian courtesy words to memorize and is used constantly in daily conversation.',
  },
  {
    q: 'How do numbers affect noun case in Russian?',
    a: '1 (один) / numbers ending in 1 (except 11): Nominative singular — одна книга. 2-4 / ending in 2-4 (except 12-14): Genitive singular — три книги. 5-20, 11-14, and most higher numbers: Genitive plural — пять книг. The "except 11-14" rule is critical — 11, 12, 13, 14 follow the 5+ rule, not the 1/2-4 rule.',
  },
  {
    q: 'What are the Russian words for common family members?',
    a: 'мать / мама (mother / mom), отец / папа (father / dad), сестра (sister), брат (brother), бабушка (grandmother), дедушка (grandfather), дочь (daughter), сын (son), жена (wife), муж (husband), тётя (aunt), дядя (uncle). Note: дочь and мать are irregular — they gain -ер- in all cases except nominative/accusative sg.',
  },
]

const benefits = [
  { title: 'Cyrillic to conversational, one topic at a time', body: 'Start with the alphabet, move to survival phrases, then build thematic vocabulary — or jump directly to any gap you have. Esli adapts to wherever you are.' },
  { title: 'Grammar baked into vocabulary cards', body: 'Russian vocabulary without case context is half the story. Esli\'s AI includes the genitive form, aspect pair, or gender alongside the word so you learn it correctly from day one.' },
  { title: 'TORFL exam prep in any level', body: 'Type "TORFL A2 vocabulary" or upload your prep materials PDF and Esli builds a deck targeting exactly what\'s tested at your level — A1 through C2.' },
  { title: 'Spaced repetition for a hard language', body: 'Russian vocabulary needs more repetition than Romance languages. SM-2 algorithm ensures you review words at the right interval — building a lasting vocabulary, not a cramming session.' },
]

export default function RussianVocabularyFlashcardsPage() {
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
                <span className="text-primary-600">Russian Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any Russian topic and get a complete flashcard deck in seconds. Cyrillic alphabet, vocabulary, grammar cases, TORFL prep — AI-powered with spaced repetition.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Cyrillic Alphabet', 'A1-C2 Vocabulary', 'Noun Cases (6)', 'Verb Aspects', 'Verbs of Motion', 'TORFL Prep', 'Family & Daily Life', 'Business Russian'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Russian Flashcards Free
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
                Learn Russian vocabulary in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From Cyrillic to conversational — at whatever pace fits your life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your Russian topic',
                  body: 'Enter anything — "Russian Cyrillic alphabet", "A1 beginner vocabulary", "Russian food vocabulary", "noun cases genitive" — or upload your Russian textbook PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds your deck',
                  body: 'Esli creates Q&A cards with Cyrillic, transliteration, translation, grammar context (case, gender, aspect pair), and a usage example — everything you need in one card.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Russian needs more repetition than Romance languages. SM-2 resurfaces words right before you forget them, building vocabulary that survives past the next day.',
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
                Example Russian flashcards
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
                Generate Your Russian Deck Free
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
                Why Russian learners choose Esli
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
                Russian flashcard FAQs
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
              Ready to learn Russian?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate Russian vocabulary and grammar flashcards with AI — Cyrillic, A1 to C2, any topic — free, with spaced repetition. Start today.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Russian Flashcards Free
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
              <a href="/flashcards/german" className="hover:text-white transition-colors no-underline">German Flashcards</a>
              <a href="/use-case/language-learners" className="hover:text-white transition-colors no-underline">Language Learners</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
