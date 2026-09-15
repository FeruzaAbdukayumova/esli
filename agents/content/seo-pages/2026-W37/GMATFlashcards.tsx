/**
 * SEO Landing Page: GMAT Flashcards
 * Route: /flashcards/gmat
 * Meta title: GMAT Flashcards Free — AI Generator | Esli (50 chars)
 * Meta description: Generate GMAT flashcards with AI. Quant, Verbal, Data Insights — targeted prep, free, spaced repetition. No signup. (120 chars)
 * Target keywords: GMAT flashcards, GMAT prep flashcards, GMAT quant flashcards, GMAT verbal flashcards, free GMAT flashcards
 * Week: 2026-W37
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
      name: 'What GMAT topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates GMAT flashcards across all three sections of the GMAT Focus Edition. Quantitative Reasoning: arithmetic (number properties, percents, ratios, rates), algebra (linear and quadratic equations, inequalities, absolute value), geometry (triangles, circles, coordinate geometry), and statistics (mean, median, standard deviation, permutations, combinations, probability). Verbal Reasoning: critical reasoning (argument structure, assumption, weaken, strengthen, inference, boldface), reading comprehension (main idea, inference, function, application), and sentence correction grammar rules (parallelism, subject-verb agreement, modifier placement, tense, pronoun reference). Data Insights: data sufficiency logic (is the statement sufficient? alone? together?), multi-source reasoning, table analysis, graphics interpretation. You can also upload your GMAT prep book PDF or your own notes to generate custom decks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should I use flashcards to study for the GMAT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most effective GMAT flashcard strategy targets your weakest sub-skills. For Quant: generate decks by topic cluster rather than all quant at once — "GMAT number properties: factors, multiples, LCM/GCD, prime factorization, divisibility rules" as one deck. Drill the concept, then drill the application. For Verbal: critical reasoning argument types deserve their own deck — "GMAT assumption questions: 5 common argument structures and their assumptions" — because assumption errors are the #1 GMAT CR mistake. For Data Sufficiency: generate a deck of DS logic rules ("a DS statement is sufficient if you can get a unique answer, not just an answer") plus each DS trap type (rephrasing, testing special cases, two statements that seem redundant). Use Esli\'s spaced repetition to focus review time on your weakest clusters, not the concepts you already know.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli better than Magoosh or Manhattan Prep flashcards for GMAT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli and GMAT-specific apps serve different needs. Magoosh and Manhattan Prep offer professionally vetted, test-calibrated question banks — if you want polished GMAT-style practice questions, those are strong. Esli\'s advantage is AI-generated custom decks: you define the concept, depth, and framing you want, and get a deck instantly. Need to drill "number properties — divisibility rules for 2, 3, 4, 5, 6, 8, 9 with examples"? Generate it in 10 seconds, not 20 minutes of manual card-making. Esli also does PDF upload — drop in your Quant review sheet and get a targeted deck. The ideal GMAT study setup: use official GMAT practice tests for question exposure, Esli for concept mastery and vocab drilling. Both tools are free to start.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best GMAT flashcard prompts to use with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-yield GMAT prompts by section: Quant — 'GMAT number properties: all divisibility rules (2,3,4,5,6,8,9,10,11) with the rule stated, an example, and a common GMAT trap', 'GMAT statistics: mean vs median vs mode — how each changes when an outlier is added, and when they are equal', 'GMAT probability: combinations vs permutations formula — when to use each, with one GMAT-style example each'. Verbal — 'GMAT critical reasoning: the 6 question types (assumption, strengthen, weaken, inference, boldface, evaluation) — what each asks and the #1 mistake per type', 'GMAT sentence correction: the 7 tested grammar rules with examples of each error and the corrected form'. Data Insights — 'GMAT data sufficiency: the 5 answer choices, what each means, and 3 trap patterns that make insufficient data look sufficient'.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for GMAT prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free with no credit card required. Generate unlimited GMAT decks, use spaced repetition scheduling, and study in 14 languages. Guest mode lets you start without creating an account — no email, no signup, just type a GMAT topic and get flashcards. The free plan covers everything most GMAT students need: unlimited AI generation, spaced repetition, and community decks.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the divisibility rule for 9? How do you quickly check if a number is divisible by 9 on the GMAT?',
    a: "A number is divisible by 9 if and only if the sum of its digits is divisible by 9. Example: Is 7,236 divisible by 9? Sum of digits: 7+2+3+6 = 18. Is 18 divisible by 9? Yes (18÷9=2). So 7,236 is divisible by 9. GMAT trap: Don't confuse divisibility by 9 with divisibility by 3 (sum of digits divisible by 3). All numbers divisible by 9 are also divisible by 3, but not vice versa. E.g., 12 (1+2=3, divisible by 3 but not 9). Extension: a number divisible by both 2 and 9 is divisible by 18.",
  },
  {
    q: 'What is the formula for combinations vs permutations? When does the GMAT use each?',
    a: 'Permutations (order matters): P(n,r) = n! / (n-r)!. Combinations (order does not matter): C(n,r) = n! / [r!(n-r)!]. Memory trick: Permutations = Positions matter (a person placed 1st vs 2nd is a different outcome). Combinations = Choosing a Committee (a committee of Alice+Bob = same as Bob+Alice). GMAT signals for each: Permutations — "arrange," "order," "seat in a row," "award 1st/2nd/3rd place." Combinations — "choose," "select," "form a group/team/committee." Example: 5 people, pick 3 for a committee = C(5,3) = 10. Arrange 5 people in a row = P(5,5) = 5! = 120. GMAT trap: "choose 3 officers (president, VP, treasurer)" — looks like a committee but order matters because roles differ, so use permutations.',
  },
  {
    q: 'GMAT Critical Reasoning: What is the core structure of an "Assumption" question? How do you identify the answer?',
    a: 'An assumption is an unstated premise the argument MUST rely on to be valid — it bridges the evidence to the conclusion. Question stem signals: "the argument assumes," "the argument above depends on the assumption that," "which of the following is an assumption the author makes?" Method — Negation Test: negate the answer choice. If negating it destroys the argument\'s logic, it\'s the assumption. If negating it doesn\'t hurt the argument, eliminate it. Example: Argument — "Sales have increased every quarter since we hired our new marketing director. Therefore, the director is responsible for the sales increase." Assumption: No other factors (economic growth, competitor failures, pricing changes) caused the increase. Negate: "Other factors DID cause the increase" — destroys the argument. Common trap: an answer that strengthens the conclusion but isn\'t required — the assumption must be NECESSARY, not just helpful.',
  },
  {
    q: 'GMAT Data Sufficiency: What are the 5 answer choices and what does each mean?',
    a: 'Data Sufficiency tests whether you can answer a question with the given statements, not whether you can solve it. The 5 choices — always the same order: (A) Statement 1 ALONE is sufficient, but statement 2 alone is not. (B) Statement 2 ALONE is sufficient, but statement 1 alone is not. (C) BOTH statements TOGETHER are sufficient, but neither alone is. (D) EACH statement ALONE is sufficient. (E) The statements TOGETHER are NOT sufficient. Memory trick: "1 2 T D E" — 12 Types of Data Either suffice. Key principle: "Sufficient" means you get a UNIQUE answer — not just "an" answer. If Statement 1 gives you x = 3 only, it\'s sufficient. If it gives you x = 3 or x = -5, it\'s not sufficient (unless both are valid given constraints). GMAT trap: assuming you need to SOLVE the problem. For yes/no questions, if Statement 1 always gives you "yes" OR always gives you "no" (even if it\'s always "no"), it\'s still sufficient.',
  },
  {
    q: 'What is the GMAT Focus Edition structure? How many questions per section?',
    a: 'GMAT Focus Edition (2024+) has 3 sections, 64 questions total, 2h 15min. Quantitative Reasoning: 21 questions, 45 minutes. Problem Solving only (no more Data Sufficiency here). Tests arithmetic, algebra, geometry, statistics. Verbal Reasoning: 23 questions, 45 minutes. Critical Reasoning + Reading Comprehension only (no more Sentence Correction). Data Insights (new section): 20 questions, 45 minutes. Data Sufficiency, Multi-Source Reasoning, Table Analysis, Graphics Interpretation, Two-Part Analysis. Scoring: each section 60-90, total score 205-805. Score reporting: see all 5 scores before deciding to report (once per test). No essay (Analytical Writing removed). Key change from old GMAT: Data Sufficiency moved to Data Insights, Sentence Correction removed, more emphasis on reasoning than grammar.',
  },
  {
    q: 'GMAT Quant: What are the properties of a 30-60-90 and 45-45-90 triangle?',
    a: '30-60-90 triangle: sides in ratio 1 : √3 : 2. If the short leg (opposite 30°) = x, then: medium leg (opposite 60°) = x√3, hypotenuse (opposite 90°) = 2x. Created by cutting an equilateral triangle in half. Example: if hypotenuse = 10, short leg = 5, long leg = 5√3. 45-45-90 triangle (isosceles right triangle): sides in ratio 1 : 1 : √2. If both legs = x, hypotenuse = x√2. Created by cutting a square diagonally. Example: if leg = 6, hypotenuse = 6√2. GMAT uses these to avoid trig — any time you see 30°, 60°, 45°, or an equilateral triangle cut in half, or a square diagonal, apply these ratios. Common GMAT trap: giving the hypotenuse and asking for a leg in a 30-60-90 — students divide by √3 instead of 2, getting the wrong leg.',
  },
]

const benefits = [
  {
    title: 'Custom decks for every GMAT sub-skill you need to drill',
    body: 'Generate targeted flashcard decks for exactly the GMAT topics you struggle with — divisibility rules, CR assumption questions, DS logic traps. Depth-matched to GMAT Focus Edition: the right concepts, the right framing.',
  },
  {
    title: 'Upload your GMAT prep book as a PDF',
    body: 'Drop in a chapter from Manhattan Prep, GMAT Official Guide, or your own notes and get a custom flashcard deck in seconds. Turn 50 pages of Quant review into a 15-minute daily drill.',
  },
  {
    title: 'Spaced repetition targets your weak spots automatically',
    body: "The SM-2 algorithm shows you data sufficiency traps and CR assumption logic more often than concepts you've already mastered — so your 30-minute daily review is 100% targeted, not 50% review of easy material.",
  },
  {
    title: 'Study across devices with no setup',
    body: 'Guest mode means you can start without creating an account. Browser extension lets you save GMAT vocabulary while reading prep forums. 14 interface languages for international MBA applicants.',
  },
]

export default function GMATFlashcardsPage() {
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
                <span className="text-primary-600">GMAT</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any GMAT topic — number properties, critical reasoning, data sufficiency, data insights — and get a complete flashcard deck in seconds. Targeted, free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Quantitative Reasoning', 'Critical Reasoning', 'Data Sufficiency', 'Data Insights', 'Number Properties', 'Verbal Reasoning', 'Probability', 'Sentence Logic'].map((tag) => (
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
                  Generate GMAT Flashcards Free
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
                Master the GMAT in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From quant fundamentals to CR argument logic — generate, study, and build exam-ready recall.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your topic or upload a PDF',
                  body: 'Enter "GMAT number properties divisibility rules" or "Critical reasoning assumption question types", or upload your prep book PDF for a deck matched to exactly what the GMAT tests.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering concepts, formulas, common traps, and the reasoning patterns the GMAT Focus Edition actually tests — at the depth business school applicants need.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm surfaces data sufficiency traps and CR argument types you struggle with more often — turning 30-minute daily sessions into targeted, measurable score improvement.',
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
                Example GMAT flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Click any card to flip it and see the answer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-52 cursor-pointer [perspective:1200px]"
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
                    <div className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200 shadow-md flex flex-col items-start justify-start p-5 overflow-y-auto [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-xs text-primary-500 mb-2">Answer</p>
                      <p className="text-xs text-slate-700 leading-relaxed">{card.a}</p>
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
                Generate Your GMAT Deck Free
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
                Why MBA applicants choose Esli for GMAT prep
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
                GMAT flashcard FAQs
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
              Start your GMAT prep today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any GMAT topic in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate GMAT Flashcards Free
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
              <a href="/flashcards/gre-vocabulary" className="hover:text-white transition-colors no-underline">GRE Flashcards</a>
              <a href="/flashcards/lsat" className="hover:text-white transition-colors no-underline">LSAT Flashcards</a>
              <a href="/flashcards/cpa-exam" className="hover:text-white transition-colors no-underline">CPA Exam Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
