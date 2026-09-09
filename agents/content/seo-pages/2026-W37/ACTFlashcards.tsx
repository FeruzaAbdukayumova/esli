/**
 * SEO Landing Page: ACT Flashcards
 * Route: /flashcards/act
 * Meta title: ACT Flashcards Free — AI Generator | Esli (49 chars)
 * Meta description: Generate ACT flashcards with AI. English, Math, Reading, Science — targeted test prep, free, spaced repetition. (119 chars)
 * Target keywords: ACT flashcards, ACT prep flashcards, ACT math flashcards, ACT English flashcards, free ACT flashcards, ACT test prep flashcards
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
      name: 'What ACT topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates ACT flashcards across all four test sections. ACT English: grammar rules (subject-verb agreement, pronoun-antecedent agreement, verb tense consistency, parallel structure, modifier placement, comma usage), rhetorical skills (main idea, author\'s purpose, transitions, relevance, organization), and common ACT English trap patterns. ACT Math: pre-algebra (fractions, decimals, percentages, ratios, number properties), elementary algebra (linear equations, inequalities, systems of equations, factoring), intermediate algebra (quadratics, absolute value, matrices, sequences), coordinate geometry (slope, distance, midpoint, lines, circles, parabolas, transformations), plane geometry (triangles including special triangles, circles, polygons, volume, area, perimeter), and trigonometry (SOHCAHTOA, unit circle, basic trig identities). ACT Reading: main idea, inference, vocabulary in context, function, detail questions, paired passage strategies. ACT Science: data interpretation (reading graphs and tables), scientific reasoning (experimental design, hypotheses, variables), conflicting viewpoints. Esli also covers ACT vocabulary and commonly confused words (affect/effect, its/it\'s, than/then, lie/lay).',
      },
    },
    {
      '@type': 'Question',
      name: 'How should I use flashcards to study for the ACT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ACT flashcards work best for three purposes: grammar rules (the ACT English section tests specific grammar rules repeatedly — making a rule card for each is the fastest prep), math formulas (the ACT has no formula sheet, so you must memorize geometry formulas — area of a circle, circumference, triangle area, Pythagorean theorem, special triangle ratios), and vocabulary for the Reading and English sections. For English grammar: generate a card for each rule type with the rule stated, an example of the error, and the corrected version. For Math: generate formula cards by topic cluster ("ACT geometry — all circle formulas: area, circumference, arc length, sector area") rather than one huge formula list. For Science: practice data interpretation by generating cards that describe a figure type and ask what conclusion can be drawn. Use Esli\'s spaced repetition to drill your weakest section every day for 2 weeks before the exam.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli useful for ACT Math if it has no formula sheet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — the ACT provides no math reference sheet, which makes flashcard memorization especially valuable. The ACT tests formulas you must recall from memory: area formulas (triangle = ½bh, circle = πr², trapezoid = ½(b1+b2)h), volume formulas (cylinder = πr²h, rectangular prism = lwh), the distance formula (√[(x2-x1)² + (y2-y1)²]), the slope formula ((y2-y1)/(x2-x1)), special triangle ratios (30-60-90: 1:√3:2; 45-45-90: 1:1:√2), the quadratic formula (x = [-b ± √(b²-4ac)] / 2a), SOHCAHTOA for trigonometry, and basic properties (sum of angles in a triangle = 180°, circle = 360°). Use Esli to generate an ACT Math formula deck sorted by topic. 15 minutes of daily drilling for 2 weeks before your test date typically covers everything. You can also upload your ACT prep book PDF to get a custom deck matched to the exact topics your test date is likely to emphasize.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best ACT flashcard prompts to use with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-yield ACT prompts: English — 'ACT English grammar rules — all 8 tested rule types: subject-verb agreement, pronoun agreement, verb tense, parallelism, modifier placement, comma usage, apostrophes, commonly confused words — rule statement + one ACT-style example of the error and the fix'. Math — 'ACT Math formulas — plane geometry section: all area and perimeter formulas for triangles, rectangles, trapezoids, circles, and composite figures with a worked example each'. 'ACT special triangles: 30-60-90 and 45-45-90 — side ratios, when they appear, and how to find missing sides in 3 steps'. Trigonometry — 'SOHCAHTOA — define each trig ratio, state when each is used in an ACT triangle problem, and give a sample ACT problem setup'. Science — 'ACT Science conflicting viewpoints — 5-step approach: identify the scientists\' claims, what they agree on, what they disagree on, what evidence would support each, and how a new finding would affect each view'.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for ACT test prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free with no credit card required. The free plan includes unlimited AI flashcard generation, spaced repetition scheduling, and community decks. Guest mode lets you start immediately without creating an account — just type an ACT topic and get flashcards in seconds. Whether you are prepping for your first ACT or retaking to improve your score, you can generate as many decks as you need at no cost.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the 8 grammar rules most frequently tested on the ACT English section?',
    a: "The 8 highest-frequency ACT English grammar rules: 1. SUBJECT-VERB AGREEMENT: the verb must match the number of its subject (not the nearest noun). 'The box of chocolates is on the table' (box is singular). 2. PRONOUN-ANTECEDENT AGREEMENT: pronoun must match its antecedent in number and gender. Use 'they' for plural, 'he/she/it' for singular. 3. VERB TENSE CONSISTENCY: don't switch tense mid-sentence without reason. 4. PARALLEL STRUCTURE: items in a list must use the same grammatical form ('reading, writing, and running' not 'to read, writing, run'). 5. MODIFIER PLACEMENT: a modifier must be directly next to what it modifies ('Wearing a helmet, the cyclist rode' not 'Wearing a helmet, the bicycle...'). 6. COMMA USAGE: use commas with independent clauses joined by FANBOYS, after introductory phrases, and around nonessential phrases. 7. APOSTROPHES: possessive (it's = it is; its = possessive). 8. COMMONLY CONFUSED WORDS: affect/effect, than/then, lie/lay, who/whom.",
  },
  {
    q: 'What is SOHCAHTOA and when does it apply on the ACT?',
    a: "SOHCAHTOA defines the three basic trig ratios for a RIGHT triangle: SOH: sin(θ) = Opposite / Hypotenuse. CAH: cos(θ) = Adjacent / Hypotenuse. TOA: tan(θ) = Opposite / Adjacent. The angle θ is always one of the acute angles (not the 90° angle). To use it on the ACT: identify the angle in question, label the three sides relative to that angle (opposite = side across from angle, adjacent = side next to angle, hypotenuse = longest side opposite 90°), then choose the ratio that uses the two sides you have or need. Example: In a right triangle, the side opposite a 30° angle = 5. Find the hypotenuse. sin(30°) = 5/hyp → 0.5 = 5/hyp → hyp = 10. ACT tip: Know sin(30°) = 0.5, sin(45°) = cos(45°) = √2/2 ≈ 0.707, sin(60°) = cos(30°) = √3/2 ≈ 0.866 without a calculator — these appear regularly on the ACT trigonometry questions (last ~4 questions of the Math section).",
  },
  {
    q: 'What are the special triangle ratios tested on the ACT? How do you find missing sides?',
    a: "Two special right triangles — memorize their side ratios because ACT geometry problems use them constantly: 30-60-90 TRIANGLE: sides in ratio 1 : √3 : 2. Short leg (opposite 30°) = x, long leg (opposite 60°) = x√3, hypotenuse = 2x. Created by bisecting an equilateral triangle. HOW TO USE: identify the 30-60-90 triangle, identify which side you know, then set up the ratio. Example: if hypotenuse = 8, short leg = 4, long leg = 4√3. 45-45-90 TRIANGLE (isosceles right): sides in ratio 1 : 1 : √2. Both legs = x, hypotenuse = x√2. Created by cutting a square diagonally. HOW TO USE: if one leg = 6, other leg = 6, hypotenuse = 6√2. ACT trap: confusing which ratio goes where — remember the longer side is always opposite the larger angle. Also appears in coordinate geometry: a square's diagonal creates a 45-45-90 triangle.",
  },
  {
    q: 'What is the quadratic formula? When does the ACT require you to use it vs. factor?',
    a: "Quadratic formula: for ax² + bx + c = 0, x = [-b ± √(b²-4ac)] / 2a. The ± means there are (usually) two solutions. The discriminant (b²-4ac) tells you the number and type of solutions: b²-4ac > 0 → two real solutions. b²-4ac = 0 → one real solution (double root). b²-4ac < 0 → no real solutions (two complex roots). WHEN TO USE EACH on the ACT: FACTOR first if the equation looks factorable (integer coefficients, factors easily): x² + 5x + 6 = (x+2)(x+3) = 0 → x = -2 or -3. Use the QUADRATIC FORMULA when factoring would take too long or isn't obvious: 3x² - 5x - 1 = 0 → plug directly into formula. ACT tip: the formula is not given on the test. Memorize it exactly, especially the ± and the 2a in the denominator (common error: dividing only the -b by 2a). Also useful: completing the square (for recognizing vertex form of a parabola on coordinate geometry questions).",
  },
  {
    q: 'What is the ACT Science section actually testing? What are the 3 passage types?',
    a: "The ACT Science section does NOT primarily test science knowledge — it tests data interpretation and scientific reasoning. Most questions can be answered from the charts, graphs, and tables in the passage alone. 3 PASSAGE TYPES: 1. DATA REPRESENTATION (~30% of section): charts, tables, and graphs. Questions ask you to read values, identify trends, extrapolate, and compare. Strategy: read the question first, then find the relevant figure. 2. RESEARCH SUMMARIES (~45%): describes 2-3 experiments. Questions ask about experimental design (what is the independent/dependent variable?), conclusions, and what a new experiment would test. Key concept: independent variable = what researcher changes; dependent variable = what is measured. 3. CONFLICTING VIEWPOINTS (~25%): 2-3 scientists with different hypotheses about the same phenomenon. Questions ask what each scientist believes, what they agree/disagree on, what evidence would support each, and how a new finding affects each view. TIMING: 40 questions, 35 minutes = ~52 seconds per question. Skip passages with many figures you find confusing and return at the end.",
  },
  {
    q: 'What are the circle formulas you must know for ACT Math?',
    a: "ACT Math circle formulas (not provided — must memorize): AREA: A = πr². CIRCUMFERENCE: C = 2πr = πd (where d = diameter = 2r). ARC LENGTH: (central angle/360°) × 2πr. For a 90° arc of a circle with radius 6: (90/360) × 2π(6) = (1/4) × 12π = 3π. SECTOR AREA: (central angle/360°) × πr². For a 90° sector, radius 6: (90/360) × π(36) = 9π. CHORD and INSCRIBED ANGLE: An inscribed angle equals half the central angle that subtends the same arc. CIRCLE EQUATION: (x-h)² + (y-k)² = r² with center (h,k) and radius r. ACT trap: Given the diameter, students use it as the radius in the area formula → A = π(d)² instead of π(d/2)² — always halve the diameter first. Memorization tip: area uses r², circumference uses r (just the first power). If you know the radius, every other measurement follows from these two formulas.",
  },
]

const benefits = [
  {
    title: 'All 4 ACT sections covered — English, Math, Reading, Science',
    body: 'Generate targeted flashcard decks for grammar rules, math formulas, reading strategies, and science data interpretation. Customized to your specific weaknesses, not one-size-fits-all decks.',
  },
  {
    title: 'Upload your ACT prep book as a PDF',
    body: 'Drop in a chapter from Kaplan, Princeton Review, or your own notes and get a custom flashcard deck in seconds. No formula sheet on test day means you need to memorize — Esli makes that fast.',
  },
  {
    title: 'Spaced repetition drills the rules and formulas you keep forgetting',
    body: "The SM-2 algorithm tracks which grammar rules and math formulas you struggle with and shows them more often — so subject-verb agreement traps and circle area formulas stick before test day.",
  },
  {
    title: 'Free with no signup, works on any device',
    body: 'Guest mode means you can start immediately without an account. Study ACT prep on your phone during any spare moment — the spaced repetition schedule keeps your daily review under 20 minutes.',
  },
]

export default function ACTFlashcardsPage() {
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
                <span className="text-primary-600">ACT</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any ACT topic — grammar rules, math formulas, science reasoning, reading strategies — and get a complete flashcard deck in seconds. Targeted prep, free, with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['English Grammar', 'Math Formulas', 'Special Triangles', 'Data Interpretation', 'Science Reasoning', 'Circle Geometry', 'Trig (SOHCAHTOA)', 'Reading Strategies'].map((tag) => (
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
                  Generate ACT Flashcards Free
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
                Raise your ACT score in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From grammar rules to geometry formulas — generate, drill, and build automatic recall before test day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your section or upload a PDF',
                  body: 'Enter "ACT English grammar rules with examples" or "ACT Math circle formulas", or upload your prep book for a deck matched to exactly what the ACT tests.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering grammar rules, math formulas, science reasoning strategies, and the ACT trap patterns that trip up unprepared test-takers.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: "The SM-2 algorithm surfaces grammar rules and formulas you miss most often — building the automatic recall that turns 20-second per-question solving into a habit.",
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
                Example ACT flashcards
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
                Generate Your ACT Prep Deck Free
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
                Why high school students choose Esli for ACT prep
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
                ACT flashcard FAQs
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
              Start your ACT prep today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any ACT topic in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate ACT Flashcards Free
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
              <a href="/flashcards/sat-vocabulary" className="hover:text-white transition-colors no-underline">SAT Vocabulary</a>
              <a href="/flashcards/ap-biology" className="hover:text-white transition-colors no-underline">AP Biology</a>
              <a href="/use-case/high-school-ap-students" className="hover:text-white transition-colors no-underline">High School Students</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
