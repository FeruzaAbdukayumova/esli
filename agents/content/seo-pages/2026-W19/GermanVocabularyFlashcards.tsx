/**
 * SEO Landing Page: German Vocabulary Flashcards
 * Route: /flashcards/german-vocabulary
 * Meta title: German Vocabulary Flashcards — AI Generator | Esli
 * Meta description: Generate German vocabulary flashcards with AI. Beginner to C2, Goethe exam prep, business German — type any topic and get cards instantly. Free.
 * Target keywords: German vocabulary flashcards, German flashcards free, learn German flashcards, Goethe flashcards, German grammar flashcards
 * Week: 2026-W19
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
      name: 'Are German vocabulary flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. You can generate unlimited German flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate German flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any German topic — "A1 greetings and introductions", "der/die/das article rules", "Goethe B2 vocabulary", "German separable verbs" — and Esli\'s AI instantly creates Q&A flashcards. You can also upload a German textbook PDF and Esli will extract the vocabulary and grammar automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me prepare for the Goethe-Zertifikat or TestDaF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Generate flashcards specifically for Goethe A1-C2, TestDaF, or DSH exams. Type the exam name and level and Esli creates cards aligned to the vocabulary and grammar tested at that level.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli support German grammar flashcards (cases, articles, verb conjugation)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can generate grammar-focused cards for any German topic: der/die/das article rules, nominative/accusative/dative/genitive cases, strong verb conjugation, Konjunktiv II, separable and inseparable prefixes, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Duolingo for learning German?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Duolingo is gamified but shallow — you follow a fixed path. Esli lets you generate flashcards on exactly what you need to learn, upload your own study materials, and study with proper SM-2 spaced repetition for long-term retention. It\'s a study tool, not a game.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the definite articles for masculine, feminine, neuter, and plural nouns in the nominative case?',
    a: 'Masculine: der | Feminine: die | Neuter: das | Plural: die. Tip: memorize the article with every new noun — never learn "Tisch", always learn "der Tisch".',
  },
  {
    q: 'How do you form the Perfekt (present perfect) in German?',
    a: 'haben/sein + past participle. Most verbs use "haben". Verbs of motion or change of state use "sein" (gehen → er ist gegangen). Weak verbs: ge- + stem + -(e)t. Strong verbs: ge- + stem (vowel change) + -en.',
  },
  {
    q: 'What does "obwohl" mean and what word order does it require?',
    a: '"Obwohl" = "although/even though". It is a subordinating conjunction (Subordinator) → verb goes to the END of the clause. Example: Ich gehe raus, obwohl es regnet.',
  },
  {
    q: 'What is the difference between "kennen" and "wissen"?',
    a: '"Kennen" = to know a person, place, or thing (familiarity). "Wissen" = to know a fact. Example: Ich kenne Berlin. / Ich weiß, dass Berlin die Hauptstadt ist.',
  },
  {
    q: 'How do German separable verbs work? Give an example.',
    a: 'In main clauses, the prefix separates from the verb and goes to the END: "Ich rufe dich an" (anrufen = to call). In subordinate clauses, the verb stays together at the end: "...weil ich dich anrufe."',
  },
  {
    q: 'What is Konjunktiv II used for in German?',
    a: 'Konjunktiv II expresses hypothetical situations, wishes, and polite requests. "Ich würde gern... / Ich hätte... / Ich wäre..." Forms: würde + infinitive (most verbs), or special forms for haben (hätte), sein (wäre), modal verbs.',
  },
]

const benefits = [
  { title: 'Vocabulary and grammar in one place', body: 'Generate cards for new words, article rules, case endings, verb conjugation — whatever you need, at exactly the level you\'re studying.' },
  { title: 'Upload any German textbook or PDF', body: 'Turn Hueber, Cornelsen, or your teacher\'s worksheet into a complete flashcard deck. Esli extracts vocabulary and grammar automatically.' },
  { title: 'SM-2 spaced repetition', body: 'The same algorithm as Anki. Words and grammar rules you struggle with reappear at the optimal interval for long-term retention.' },
  { title: '14 interface languages', body: 'Use Esli in your native language. The interface is available in 14 languages, so you can learn German without studying in English.' },
]

export default function GermanVocabularyFlashcardsPage() {
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
                <span className="text-primary-600">German Vocabulary Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any German topic — articles, grammar rules, Goethe exam vocabulary, business German — and get a complete flashcard deck in seconds. Free, with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['A1 Beginner', 'A2', 'B1', 'B2', 'C1 Advanced', 'Goethe Exam', 'TestDaF', 'Business German'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-full border border-primary-200">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate German Flashcards Free
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
                Learn German faster in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a full flashcard deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your German topic',
                  body: 'Enter anything — "B1 vocabulary travel", "German modal verbs", "Goethe B2 word list" — or upload a PDF of your textbook or notes.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards with vocabulary, example sentences, grammar rules, and usage notes appropriate to your level.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. Words you keep forgetting come back sooner. Words you know get scheduled further out — maximizing your study time.',
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
                Example German flashcards
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
                Generate Your German Vocabulary Deck Free
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
                Why German learners choose Esli
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
                German flashcard FAQs
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
              Ready to learn German faster?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate German vocabulary and grammar flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate German Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also learning other languages? See our{' '}
              <a href="/flashcards/french-vocabulary" className="text-white underline hover:no-underline">French vocabulary flashcards</a>{' '}
              and{' '}
              <a href="/flashcards/spanish-vocabulary" className="text-white underline hover:no-underline">Spanish vocabulary flashcards</a>.
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
