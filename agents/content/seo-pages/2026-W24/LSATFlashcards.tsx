/**
 * SEO Landing Page: LSAT Flashcards
 * Route: /flashcards/lsat
 * Meta title: LSAT Flashcards Free — AI Generator | Esli
 * Meta description: Generate LSAT flashcards with AI. Logical reasoning, logic games, reading comp — type any topic and get cards instantly. Free.
 * Target keywords: LSAT flashcards, LSAT logical reasoning flashcards, LSAT prep flashcards free, LSAT study cards, law school admission flashcards
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
      name: 'Are LSAT flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited LSAT flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What LSAT topics can I generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All LSAT sections: Logical Reasoning (assumption, strengthen, weaken, flaw, inference, parallel reasoning, main point, method of argument, role of statement, point of disagreement, principle), Logic Games / Analytical Reasoning (sequencing, grouping, matching, hybrid game types, deductions), and Reading Comprehension (primary purpose, inference, author attitude, structure). Type any subtopic and Esli generates targeted cards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me memorize LSAT flaw types?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Generate a deck specifically for "LSAT flaw types" and get cards covering correlation vs causation, sampling errors, equivocation, circular reasoning, appeal to authority, ad hominem, false dilemma, overgeneralization, and more — each with a definition and example argument pattern.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my LSAT prep book as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your PowerScore LSAT Bible, Manhattan Prep LSAT Strategy Guides, 7Sage study materials, or any course notes. Esli\'s AI extracts question types, logical indicators, formal logic rules, and game setups into a complete flashcard deck automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does spaced repetition help LSAT prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LSAT success depends on pattern recognition — instantly identifying a flaw type, a sufficient assumption, or a logic game constraint. Spaced repetition drills these patterns until recognition is automatic. Esli\'s SM-2 algorithm surfaces the question types and logical patterns you mix up most, right before you\'d forget them.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the difference between a sufficient condition and a necessary condition?',
    a: 'Sufficient condition (if A → then B): A is enough to guarantee B, but B may occur without A. Necessary condition (B requires A): A must be present for B to occur, but A alone doesn\'t guarantee B. LSAT notation: A → B means "A is sufficient for B" and "B is necessary for A." Contrapositive: ¬B → ¬A.',
  },
  {
    q: 'What is the Negation Test and when do you use it?',
    a: 'The Negation Test identifies the correct answer to Assumption (Necessary) questions. Negate each answer choice and ask: does the negated statement destroy the argument\'s conclusion? If yes, that choice is a necessary assumption. The argument must depend on the assumption being true.',
  },
  {
    q: 'Name 5 common LSAT flaw types with a one-line description each.',
    a: '1. Correlation/Causation: assumes X caused Y because they correlate. 2. Sampling error: generalizes from an unrepresentative sample. 3. Equivocation: uses a term with two different meanings. 4. False dilemma: presents two options as exhaustive when others exist. 5. Appeal to authority: accepts a claim based on the source, not the evidence.',
  },
  {
    q: 'What is the difference between a "must be true" and a "most strongly supported" inference question?',
    a: '"Must be true": the answer follows with certainty from the stimulus — it cannot be false if the stimulus is true. "Most strongly supported": the answer is best supported by the stimulus but need not be 100% certain. Both are Inference question types; "must be true" requires a stronger logical guarantee.',
  },
  {
    q: 'What are the four main Logic Games (Analytical Reasoning) game types?',
    a: '1. Sequencing/Ordering: arrange elements in a sequence (linear or circular). 2. Grouping: distribute elements into groups (selection or assignment). 3. Matching: pair elements from two sets. 4. Hybrid: combines two game types (e.g., sequence + grouping). Most games have one dominant type with hybrid variants.',
  },
  {
    q: 'What logical indicators signal a sufficient condition vs a necessary condition?',
    a: 'Sufficient condition indicators: if, when, whenever, every, all, any, in order to, anyone who. Necessary condition indicators: only if, only when, only, must, requires, essential, necessary. Exception: "only" followed by a noun = sufficient (e.g., "only cats" = if animal, then cat). Practice: "A only if B" → A → B (B is necessary for A).',
  },
]

const benefits = [
  {
    title: 'Master question types and flaw patterns',
    body: 'Generate dedicated decks for each LR question type — assumption, strengthen, weaken, flaw, inference, parallel reasoning. Drill the patterns until recognition is automatic.',
  },
  {
    title: 'Formal logic and conditional reasoning',
    body: 'Type "LSAT conditional logic", "contrapositive practice", or "formal logic biconditionals" and get targeted cards covering sufficient/necessary conditions, negation, contrapositives, and chain logic.',
  },
  {
    title: 'Upload your prep book or notes as PDF',
    body: 'Turn PowerScore LSAT Bible, Manhattan Prep guides, or 7Sage course materials into a reviewable flashcard deck. AI extracts key rules, game types, and question templates automatically.',
  },
  {
    title: 'Spaced repetition for pattern recognition',
    body: 'LSAT is about instant pattern recognition. Esli\'s SM-2 algorithm resurfaces the question types and logical structures you mix up most — building the reflexes that top scorers have.',
  },
]

export default function LSATFlashcardsPage() {
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
                <span className="text-primary-600">LSAT Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any LSAT topic — logical reasoning flaw types, conditional logic, logic game rules — and get a complete flashcard deck in seconds. Build the pattern recognition that top scorers have.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  'Logical Reasoning',
                  'Logic Games',
                  'Reading Comprehension',
                  'Argument Flaw Types',
                  'Assumption Questions',
                  'Strengthen & Weaken',
                  'Conditional Logic',
                  'Flaw Identification',
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
                  Generate LSAT Flashcards Free
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
                LSAT prep in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a complete pattern-recognition deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your LSAT topic',
                  body: 'Enter anything — "LSAT flaw types list", "necessary assumption question strategy", "logic game sequencing rules" — or upload your PowerScore Bible, Manhattan Prep guides, or 7Sage notes as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards covering question types, formal logic rules, game setups, conditional indicators, flaw definitions, and argument patterns — tailored precisely to your topic.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. The question types and logical structures you mix up resurface at exactly the right intervals — building the automatic pattern recognition that separates 170+ scorers from everyone else.',
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
                Example LSAT flashcards
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
                Generate Your LSAT Deck Free
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
                Why LSAT students choose Esli
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
                LSAT flashcard FAQs
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
              Ready to boost your LSAT score?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate a complete logical reasoning or logic games deck in seconds. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate LSAT Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also prepping for other law school admissions?{' '}
              <a href="/flashcards/gre-vocabulary" className="text-white underline hover:no-underline">
                GRE vocabulary flashcards
              </a>{' '}
              and{' '}
              <a href="/use-case/law-students" className="text-white underline hover:no-underline">
                AI flashcards for law students
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
