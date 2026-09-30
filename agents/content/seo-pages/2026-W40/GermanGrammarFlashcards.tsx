/**
 * SEO Landing Page: German Grammar Flashcards
 * Route: /flashcards/german-grammar
 * Meta title: German Grammar Flashcards Free — AI | Esli
 * Meta description: Generate German grammar flashcards with AI. Der/die/das, cases, verb
 *   conjugation — free, spaced repetition. No signup needed.
 * Target keywords: German grammar flashcards, German cases flashcards, der die das flashcards,
 *   nominative accusative dative genitive, German verb conjugation flashcards, German declension
 * Week: 2026-W40
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
      name: 'Are German grammar flashcards on Esli really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited German grammar flashcards with AI — der/die/das, cases, verb conjugations, word order — with spaced repetition included. No credit card, no signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate German grammar flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any German grammar topic — "accusative case", "weak noun declension", "separable verbs", "Konjunktiv II" — and our AI instantly creates a set of question-and-answer flashcards covering the rules, patterns, and example sentences. You can also upload a PDF of your German textbook and Esli extracts the grammar points automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'What German grammar topics can I make flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any German grammar topic: grammatical gender (der/die/das), the four cases (nominative, accusative, dative, genitive), adjective endings (strong/weak/mixed declension), verb conjugation (present, past, Perfekt, Präteritum), modal verbs, separable and inseparable verbs, Konjunktiv I and II, passive voice, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me memorize der/die/das for German nouns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Generate flashcards by noun category (e.g. "German noun gender rules — words ending in -ung, -heit, -schaft") or for specific vocabulary sets. Spaced repetition ensures the genders you mix up appear more often until they stick permanently.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Anki for German grammar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anki requires you to build every card manually or download someone else\'s deck. Esli generates fresh, tailored German grammar cards from any topic or textbook page in seconds. Both use spaced repetition — Esli just eliminates the hours of manual card creation so you can spend more time actually learning German.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the four German grammatical cases and their primary functions?',
    a: 'Nominative (subject), Accusative (direct object), Dative (indirect object), Genitive (possession). Mnemonic: "NADG" — Never Allow Dative Genitive confusion.',
  },
  {
    q: 'What is the definite article for each case (masculine singular)?',
    a: 'Nominative: der | Accusative: den | Dative: dem | Genitive: des. Only masculine changes in all 4 cases — neuter matches masculine except Nom/Acc (das/das).',
  },
  {
    q: 'When do you use "sein" vs "haben" to form Perfekt (present perfect)?',
    a: 'Sein: verbs of motion/change of state (gehen, kommen, werden, sterben) + bleiben, sein itself. Haben: all transitive verbs and most intransitive verbs. When unsure, default to haben.',
  },
  {
    q: 'What is the two-part rule for German word order in main clauses?',
    a: 'The conjugated verb is ALWAYS in position 2. The rest of the verb cluster (infinitive, past participle, separable prefix) goes to the END. Any element can go first, but V2 never moves.',
  },
  {
    q: 'What triggers the dative case in German?',
    a: 'After dative prepositions: aus, außer, bei, mit, nach, seit, von, zu, gegenüber. After verbs that take dative objects: helfen, danken, gehören, gefallen, glauben (a person). Mnemonic: "Aua Bei Mit Nach Seit Von Zu".',
  },
  {
    q: 'What is the pattern for weak noun declension (n-Declension)?',
    a: 'Masculine nouns ending in -e (der Junge) or certain masculine occupations/nationalities (der Student, der Herr) add -n or -en in ALL cases except nominative singular. E.g. dem Jungen, des Jungen.',
  },
]

const benefits = [
  { title: 'Master der/die/das faster', body: 'Generate cards by noun group, suffix pattern, or topic. Spaced repetition burns gender into long-term memory where it stays.' },
  { title: 'Cases made systematic', body: 'Type "German dative prepositions" and get every rule, exception, and example sentence in one organized deck — instantly.' },
  { title: 'Turn your textbook into cards', body: 'Upload any PDF — Hammer Grammatik, Schritte, Berliner Platz, your professor\'s notes — and Esli extracts the grammar rules automatically.' },
  { title: 'Study anywhere', body: 'Your decks sync across browser, phone, and tablet. Practice word order on your commute or conjugation drills between classes.' },
]

export default function GermanGrammarFlashcardsPage() {
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
                <span className="text-primary-600">German Grammar Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any German grammar topic — der/die/das, cases, verb conjugation, word order — and get a complete flashcard deck in seconds. AI-powered, spaced repetition included.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Der / Die / Das', 'Nominative & Accusative', 'Dative Prepositions', 'Verb Conjugation', 'Separable Verbs', 'Konjunktiv II', 'Adjective Endings', 'Perfekt vs Präteritum'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate German Grammar Flashcards Free
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
                German grammar in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From grammar confusion to confident recall — in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your grammar topic',
                  body: 'Enter anything — "German dative case", "separable verbs list", "adjective endings after definite article" — or upload your textbook PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds your deck',
                  body: 'Our AI creates systematic Q&A cards covering the rules, exception patterns, and example sentences for that specific grammar point.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with the SM-2 algorithm. The cases and genders you keep getting wrong resurface more often until they become automatic.',
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
                Example German grammar flashcards
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
                Generate Your German Grammar Deck Free
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
                German grammar flashcard FAQs
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
              Ready to finally master German grammar?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Stop memorizing tables. Generate smart flashcards and let spaced repetition do the work. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate German Grammar Flashcards Free
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
              <a href="/flashcards/german" className="hover:text-white transition-colors no-underline">German Vocabulary</a>
              <a href="/flashcards/spanish-grammar" className="hover:text-white transition-colors no-underline">Spanish Grammar</a>
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
