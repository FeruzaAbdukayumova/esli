/**
 * SEO Landing Page: Spanish Grammar Flashcards
 * Route: /flashcards/spanish-grammar
 * Meta title: Spanish Grammar Flashcards Free — AI | Esli (50 chars)
 * Meta description: Generate Spanish grammar flashcards with AI. Verb conjugations, subjunctive, ser vs estar — free, spaced repetition. No signup. (132 chars)
 * Target keywords: Spanish grammar flashcards, Spanish verb conjugation flashcards, Spanish subjunctive flashcards, ser vs estar flashcards, Spanish tense flashcards
 * Week: 2026-W39
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
      name: 'Are Spanish grammar flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. You can generate unlimited Spanish grammar flashcards with AI, study with spaced repetition, and use all core features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Spanish grammar topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any grammar point you need — verb conjugations (present, preterite, imperfect, future, conditional, subjunctive), ser vs estar, por vs para, direct and indirect object pronouns, reflexive verbs, gender and agreement rules, and more. Type the topic or upload a grammar textbook PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Esli and Anki for Spanish grammar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anki requires you to build every card yourself or find pre-made decks that may be incorrect or incomplete. Esli generates targeted grammar flashcards from any topic in seconds. Both use spaced repetition (SM-2) — Esli just removes the hours of card-creation work and lets you focus on studying.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me prepare for the AP Spanish Language exam or DELE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type a topic like "AP Spanish subjunctive uses" or "DELE B2 grammar points" and Esli generates cards specifically scoped to that exam. You can also upload your AP review guide or DELE prep book as a PDF and get a complete deck automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why are flashcards better than just doing grammar exercises for Spanish?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Grammar exercises show you a rule once. Spaced repetition flashcards resurface the rules you keep forgetting at exactly the right moment — before you forget again. This builds long-term retention instead of short-term recognition. You stop making the same mistakes because the pattern becomes automatic.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'When do you use ser vs estar? Give the key rule.',
    a: 'Ser: permanent/inherent traits, identity, origin, time, material (DOCTOR). Estar: temporary states, location, progressive tense, emotions (PLACE). Exception: estar muerto (death is "temporary" in grammar), ser aburrido (boring personality) vs estar aburrido (feeling bored).',
  },
  {
    q: 'Conjugate hablar in the preterite tense (all 6 persons).',
    a: 'hablé, hablaste, habló, hablamos, hablasteis, hablaron. Key pattern: -é, -aste, -ó, -amos, -asteis, -aron. Note: yo form has accent (hablé), nosotros is identical to present (hablamos — context determines tense).',
  },
  {
    q: 'What are the 6 most common subjunctive trigger categories?',
    a: 'WEIRDO: Wishes (querer que), Emotion (estar feliz de que), Impersonal expressions (es importante que), Recommendations/Requests (pedir que), Doubt/Denial (no creer que), Ojalá. Trigger = subject change across "que": "Quiero estudiar" vs "Quiero que tú estudies".',
  },
  {
    q: 'What is the difference between por and para?',
    a: 'Por: cause/reason, duration of time, exchange, means of communication, movement through. Para: purpose/goal, destination, deadline, opinion (para mí), recipient. Memory trick: para points FORWARD to a goal; por looks BACKWARD at cause or exchange.',
  },
  {
    q: 'How do reflexive pronouns work? Give the full pronoun set.',
    a: 'me (yo), te (tú), se (él/ella/Ud.), nos (nosotros), os (vosotros), se (ellos/Uds.). Placed before conjugated verb: "Me llamo Ana." After infinitive/gerund: "Voy a llamarme / Me voy a llamar." Reflexive = subject acts on itself (levantarse, acostarse, ducharse).',
  },
  {
    q: 'Explain the preterite vs imperfect contrast with an example.',
    a: 'Preterite: completed past action with a clear endpoint. Imperfect: ongoing/habitual past state or repeated action. "Comí una manzana" (I ate an apple — done) vs "Comía manzanas cada día" (I used to eat apples every day — habit). Trigger words: preterite = ayer, una vez, de repente; imperfect = siempre, todos los días, cuando era niño.',
  },
]

const benefits = [
  { title: 'Every grammar rule, instantly', body: 'Type any grammar point — "Spanish subjunctive triggers", "preterite vs imperfect", "ser vs estar" — or upload your textbook PDF. AI generates targeted Q&A cards for that exact rule.' },
  { title: 'Stop making the same mistakes', body: 'Spaced repetition resurfaces the rules you keep getting wrong at exactly the right moment. Grammar errors become automatic corrections over time.' },
  { title: 'DELE, AP Spanish, and SIELE ready', body: 'Scope your deck to a specific exam by typing "AP Spanish B2 subjunctive" or uploading your prep book. Cards cover exactly the depth and format the exam requires.' },
  { title: 'No signup required', body: 'Start generating Spanish grammar flashcards in seconds. No account needed. No credit card. Free forever for core features.' },
]

export default function SpanishGrammarFlashcardsPage() {
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
                <span className="text-primary-600">Spanish Grammar Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any grammar rule or upload your Spanish textbook and get a complete deck of flashcards in seconds. Subjunctive triggers, ser vs estar, verb conjugations — all generated by AI, studied with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Verb Conjugations', 'Subjunctive', 'Ser vs Estar', 'Preterite vs Imperfect', 'Por vs Para', 'Object Pronouns', 'Reflexive Verbs', 'AP Spanish / DELE'].map((tag) => (
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
                  Generate Spanish Grammar Flashcards Free
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
                Spanish grammar flashcards in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a complete grammar deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your grammar topic',
                  body: 'Enter anything — "Spanish subjunctive", "preterite vs imperfect", "ser vs estar rules" — or upload a PDF of your grammar textbook, class notes, or DELE prep guide.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates targeted Q&A flashcards covering the rule, example sentences, common exceptions, and memory triggers for that specific grammar point.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review cards with the SM-2 algorithm. Rules you keep getting wrong resurface sooner until the pattern becomes automatic — no more repeating the same mistake.',
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
                Example Spanish grammar flashcards
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
                Generate Your Spanish Grammar Deck Free
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
                Why Spanish learners choose Esli
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
                Spanish grammar flashcard FAQs
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

        {/* CTA */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to master Spanish grammar?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any grammar topic — subjunctive, ser vs estar, preterite — in seconds. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Spanish Grammar Flashcards Free
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
              <a href="/flashcards/spanish" className="hover:text-white transition-colors no-underline">Spanish Vocabulary</a>
              <a href="/flashcards/french-grammar" className="hover:text-white transition-colors no-underline">French Grammar</a>
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
