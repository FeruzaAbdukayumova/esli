/**
 * SEO Landing Page: Portuguese Vocabulary Flashcards
 * Route: /flashcards/portuguese-vocabulary
 * Meta title: Portuguese Vocabulary Flashcards Free — AI Generator | Esli
 * Meta description: Generate Portuguese vocabulary flashcards with AI. Brazilian or European Portuguese, CELPE-Bras prep — free, spaced repetition.
 * Target keywords: Portuguese vocabulary flashcards, Brazilian Portuguese flashcards, CELPE-Bras flashcards, learn Portuguese flashcards, European Portuguese flashcards AI
 * Week: 2026-W25
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
      name: 'Are Portuguese vocabulary flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited Portuguese vocabulary flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I make flashcards for both Brazilian and European Portuguese?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "Brazilian Portuguese slang", "European Portuguese pronunciation differences", "BP vs EP vocabulary contrasts", or any specific variant and Esli generates targeted cards. You can specify whether you are preparing for CELPE-Bras (Brazil) or CAPLE/DELF-style European Portuguese exams.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate flashcards for the CELPE-Bras exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "CELPE-Bras Intermediário vocabulary", "CELPE-Bras Avançado collocations", or any specific task type and Esli creates targeted cards. You can also upload CELPE-Bras prep materials as a PDF and let the AI extract the key vocabulary and expressions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which Portuguese grammar topics can I generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic: ser vs estar, por vs para, personal infinitive (unique to Portuguese), future subjunctive, personal pronouns and placement (próclise vs ênclise), past tenses (pretérito perfeito vs imperfeito vs mais-que-perfeito), subjunctive (present and past), passive voice, diminutives and augmentatives, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload a Portuguese textbook as a PDF to make flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your Português XXI, Bem-Vindo, Contatos, or any course materials. Esli\'s AI extracts vocabulary lists, grammar rules, expressions, and dialogues into a complete flashcard deck automatically — saving hours of manual card creation.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the difference between "ser" and "estar" in Portuguese? Give the key rules.',
    a: 'SER: permanent or inherent qualities, nationality, profession, origin, time/date, passive voice with past participle. "Ela é médica." (She is a doctor.) ESTAR: temporary states, moods, location, progressive tense. "Ela está cansada." (She is tired.) Note: Portuguese uses estar for location of places too ("O banco está na esquina"), unlike Spanish.',
  },
  {
    q: 'Explain "por" vs "para" in Portuguese with examples.',
    a: 'POR: motion through a place, duration, exchange/price, cause/reason, agent in passive, "per". "Viajei por Portugal por duas semanas." (I traveled through Portugal for two weeks.) PARA: destination, purpose/goal, recipient, deadline, opinion. "Comprei flores para você." (I bought flowers for you.) "Preciso terminar para amanhã." (I need to finish by tomorrow.)',
  },
  {
    q: 'What is the Personal Infinitive in Portuguese and when is it used?',
    a: 'The personal infinitive is unique to Portuguese. It is an infinitive that conjugates for person and number: falar, falares, falar, falarmos, falardes, falarem. Used when the subject of the infinitive differs from the main clause: "É importante vocês estudarem." (It\'s important that you all study.) "Trouxe comida para eles comerem." (I brought food for them to eat.)',
  },
  {
    q: 'What are common "falsos amigos" (false friends) between Portuguese and Spanish?',
    a: 'Key false friends: borracha (PT: rubber/drunk woman; ES: drunk woman) — borracha (PT) = drunk in feminine. embarazada (ES: pregnant) — in PT, "grávida" means pregnant; "embaraçada" means embarrassed. polvo (PT: octopus; ES: dust/powder). apelido (PT: surname; ES: nickname). salada (PT: salad; ES: salted). Always verify cognates across languages!',
  },
  {
    q: 'How do you form the Future Subjunctive in Portuguese and when is it used?',
    a: 'Future subjunctive (futuro do conjuntivo) = 3rd person plural preterite stem + endings: -er, -eres, -er, -ermos, -erdes, -erem. Example: "falar" → falarem → eu falar, tu falares, ele falar. Use when the subordinate clause refers to future hypothetical events: "Quando eu tiver tempo, vou estudar." (When I have time, I will study.) Also used in conditional "se" clauses about the future.',
  },
  {
    q: 'What is the difference between BP (Brazilian) and EP (European) Portuguese in everyday speech?',
    a: 'Key differences: Pronouns: BP uses "você" constantly; EP uses "tu" in the north and "você" more formally. Object pronouns: BP places them after verb ("Me liga!" = Call me!); EP places them before ("Liga-me!"). Gerund: BP uses gerund ("estou falando"); EP uses infinitive with "a" ("estou a falar"). Vocabulary: BP "ônibus" = EP "autocarro" (bus); BP "celular" = EP "telemóvel" (phone).',
  },
]

const benefits = [
  {
    title: 'Brazilian or European — your choice',
    body: 'Generate flashcards targeting either variant. Type "Brazilian Portuguese slang", "EP pronoun clitic placement", or "CELPE-Bras B2 vocabulary" and get a deck built exactly for your learning goal.',
  },
  {
    title: 'Grammar and vocabulary in context',
    body: 'Cards include example sentences, usage notes, and contrastive examples with Spanish where relevant. Learn ser/estar and por/para in real sentences, not just abstract rules.',
  },
  {
    title: 'Upload your Portuguese course materials',
    body: 'Turn Português XXI, Bem-Vindo, or any handouts into a complete flashcard deck. AI extracts vocabulary lists, grammar tables, and idiomatic expressions so you study what your course actually covers.',
  },
  {
    title: 'Spaced repetition keeps Portuguese fresh',
    body: 'Personal infinitive, subjunctive triggers, and clitic placement rules that keep slipping resurface at exactly the right interval using SM-2 — the same algorithm trusted for long-term language retention.',
  },
]

export default function PortugueseVocabularyFlashcardsPage() {
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
                <span className="text-primary-600">Portuguese Vocabulary Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any Portuguese topic — subjunctive, ser vs estar, CELPE-Bras vocabulary, personal infinitive — and get a complete flashcard deck in seconds. Works for Brazilian and European Portuguese.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  'A1-A2 Beginner',
                  'B1-B2 Intermediate',
                  'C1-C2 Advanced',
                  'Brazilian Portuguese',
                  'European Portuguese',
                  'CELPE-Bras Prep',
                  'Grammar & Verbs',
                  'Travel & Daily Life',
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
                  Generate Portuguese Flashcards Free
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
                Learn Portuguese in 3 simple steps
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
                  title: 'Type your Portuguese topic',
                  body: 'Enter anything — "Portuguese subjunctive triggers", "ser vs estar rules with examples", "CELPE-Bras Avançado vocabulary" — or upload your textbook, Português XXI, or class notes as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards covering vocabulary, grammar rules, example sentences, verb conjugations, and regional variant notes — with contrastive examples to clarify tricky points.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. Grammar rules that slip — like personal infinitive usage or clitic placement — resurface at exactly the right interval so they stick through your exam or next conversation.',
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
                Example Portuguese flashcards
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
                Generate Your Portuguese Deck Free
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
                Why Portuguese learners choose Esli
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
                Portuguese flashcard FAQs
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
              Ready to master Portuguese?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of language learners generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Portuguese Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also studying other Romance languages?{' '}
              <a href="/flashcards/spanish-vocabulary" className="text-white underline hover:no-underline">
                Spanish flashcards
              </a>{' '}
              and{' '}
              <a href="/flashcards/italian-vocabulary" className="text-white underline hover:no-underline">
                Italian flashcards
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
