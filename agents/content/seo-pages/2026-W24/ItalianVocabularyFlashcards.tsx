/**
 * SEO Landing Page: Italian Vocabulary Flashcards
 * Route: /flashcards/italian-vocabulary
 * Meta title: Italian Vocabulary Flashcards Free — AI Generator | Esli
 * Meta description: Generate Italian vocabulary flashcards with AI. A1-C2 levels, CILS exam prep, travel Italian — type any topic and get cards free.
 * Target keywords: Italian vocabulary flashcards, learn Italian flashcards, Italian study cards free, CILS flashcards, Italian language flashcards AI
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
      name: 'Are Italian vocabulary flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited Italian vocabulary flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate flashcards for the CILS or PLIDA exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "CILS B2 vocabulary", "PLIDA C1 grammar patterns", or any specific CILS level (A1, A2, B1, B2, C1, C2) and Esli generates targeted flashcards covering the vocabulary, grammar structures, and expressions tested at that level. You can also upload your exam prep book as a PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which Italian grammar topics can I generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic: verb conjugations (present, past, future, conditional, subjunctive), passato prossimo vs imperfetto, direct and indirect object pronouns, reflexive verbs, congiuntivo, condizionale, imperativo, passive voice, Italian nouns and adjective agreement, prepositions, and more. Type the topic and get targeted cards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload an Italian textbook as a PDF to make flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your Nuovo Espresso, Alma Viva, In Italiano, or any course materials. Esli\'s AI extracts vocabulary lists, grammar rules, idiomatic expressions, and example sentences into a complete flashcard deck automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli better than Duolingo for learning Italian vocabulary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Duolingo teaches Italian through structured lessons — good for structure and gamification. Esli lets you generate flashcards for any specific vocabulary set or grammar topic you choose, then uses spaced repetition to ensure long-term retention. Esli is better for targeted vocabulary building, exam prep, or supplementing a course.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'When do you use the Congiuntivo (subjunctive) in Italian? Give 3 trigger expressions.',
    a: 'Use the congiuntivo in subordinate clauses after expressions of doubt, desire, emotion, or impersonal statements. Key triggers: penso che (I think that), voglio che (I want that), è importante che (it\'s important that), sembra che (it seems that), ho paura che (I\'m afraid that). Congiuntivo presente of essere: sia, sia, sia, siamo, siate, siano.',
  },
  {
    q: 'What is the difference between Passato Prossimo and Imperfetto?',
    a: 'Passato Prossimo: completed actions with a defined beginning/end, actions that happened at a specific time. "Ieri ho mangiato la pizza." (Yesterday I ate pizza.) Imperfetto: ongoing/habitual past states, background conditions, repeated actions without defined end. "Da bambino mangiavo la pizza ogni venerdì." (As a child I used to eat pizza every Friday.)',
  },
  {
    q: 'Explain the placement rules for direct object pronouns in Italian.',
    a: 'Direct object pronouns (mi, ti, lo, la, ci, vi, li, le) attach before a conjugated verb: "Lo vedo" (I see him). With infinitives, attach to the end (drop final -e): "Voglio vederlo" (I want to see him). With modal verbs, may go before OR attach: "Lo voglio vedere" OR "Voglio vederlo." With imperative (tu): attach to verb. Negative imperative (tu): pronoun before infinitive.',
  },
  {
    q: 'What are "falsi amici" (false friends) in Italian? Give 3 examples.',
    a: 'Falsi amici are Italian words that resemble English words but have different meanings. Examples: "attuale" = current/present-day (NOT actual); "sensibile" = sensitive (NOT sensible); "eventualmente" = possibly/perhaps (NOT eventually); "annoiare" = to bore (NOT to annoy); "libreria" = bookshop (NOT library — that\'s "biblioteca").',
  },
  {
    q: 'How do you form the Condizionale Presente (conditional) in Italian?',
    a: 'Condizionale presente = infinitive stem + endings: -ei, -esti, -ebbe, -emmo, -este, -ebbero. For -are verbs, the "a" in the stem changes to "e": parlare → parlerei. Irregular stems: essere → sar-, avere → avr-, fare → far-, andare → andr-, venire → verr-, potere → potr-. Use for: hypothetical situations (Se avessi tempo, studierei) and polite requests (Vorrei un caffè).',
  },
  {
    q: 'What is the verb "stare" + gerundio construction and when is it used?',
    a: 'Stare + gerundio expresses an action in progress right now (Italian present continuous): sto + gerund. Gerund formation: -are verbs → -ando (parlando); -ere verbs → -endo (scrivendo); -ire verbs → -endo (dormendo). Example: "Sto studiando l\'italiano" = I am studying Italian. Unlike English, this is only used for actions happening at this exact moment — not for planned future actions.',
  },
]

const benefits = [
  {
    title: 'Any Italian topic in seconds',
    body: 'Type "Italian irregular verbs", "congiuntivo trigger phrases", "B2 vocabulary for CILS", or "Italian false friends" and get a targeted deck covering exactly what you need to review.',
  },
  {
    title: 'Grammar and vocabulary together',
    body: 'Generate cards that include example sentences, usage notes, and common errors — not just bare definitions. Learn vocabulary in context so it actually sticks in real conversations.',
  },
  {
    title: 'Upload your Italian textbook as a PDF',
    body: 'Turn Nuovo Espresso, Alma Viva, or any course handouts into a complete flashcard deck. AI extracts vocabulary lists, grammar tables, and idiomatic expressions automatically.',
  },
  {
    title: 'Spaced repetition keeps Italian fresh',
    body: 'Irregular verbs and congiuntivo forms that slip from memory resurface at the optimal interval using SM-2 — the same algorithm Anki users trust for long-term language retention.',
  },
]

export default function ItalianVocabularyFlashcardsPage() {
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
                <span className="text-primary-600">Italian Vocabulary Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any Italian topic — congiuntivo, verb conjugations, CILS exam vocabulary, travel phrases — and get a complete flashcard deck in seconds. No manual card typing, no generic word lists.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  'A1-A2 Beginner',
                  'B1-B2 Intermediate',
                  'C1-C2 Advanced',
                  'CILS Exam Prep',
                  'Italian Grammar',
                  'Travel & Daily Life',
                  'Food & Culture',
                  'Business Italian',
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
                  Generate Italian Flashcards Free
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
                Learn Italian in 3 simple steps
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
                  title: 'Type your Italian topic',
                  body: 'Enter anything — "Italian subjunctive congiuntivo triggers", "passato prossimo vs imperfetto practice", "CILS B2 vocabulary" — or upload your textbook, Nuovo Espresso, or class notes as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards covering vocabulary, grammar rules, example sentences, verb conjugations, and idiomatic usage — with context and common mistakes flagged.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. Grammar rules and vocabulary that slip — like congiuntivo triggers or false friends — resurface at exactly the right time so they stick through your exam or next conversation.',
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
                Example Italian flashcards
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
                Generate Your Italian Deck Free
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
                Why Italian learners choose Esli
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
                Italian flashcard FAQs
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
              Ready to master Italian?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of language learners generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Italian Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also learning other Romance languages?{' '}
              <a href="/flashcards/spanish-vocabulary" className="text-white underline hover:no-underline">
                Spanish flashcards
              </a>{' '}
              and{' '}
              <a href="/flashcards/french-vocabulary" className="text-white underline hover:no-underline">
                French flashcards
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
