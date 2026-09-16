/**
 * SEO Landing Page: SAT Math Flashcards
 * Route: /flashcards/sat-math
 * Meta title: SAT Math Flashcards Free — AI Generator | Esli (50 chars)
 * Meta description: Generate SAT math flashcards with AI. Algebra, geometry, data analysis — targeted test prep, free, spaced repetition. (121 chars)
 * Target keywords: SAT math flashcards, SAT math prep flashcards, SAT algebra flashcards, SAT geometry flashcards, digital SAT math flashcards
 * Week: 2026-W38
 * Note: W17 has SAT vocabulary — this page targets the distinct and high-volume SAT math cluster.
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
      name: 'Are SAT math flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited SAT math flashcards with AI, study with spaced repetition, and access all core features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What SAT math topics does Esli cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All four domains of the digital SAT Math section: Algebra (linear equations, systems, inequalities), Advanced Math (quadratics, polynomials, functions), Problem-Solving and Data Analysis (ratios, statistics, probability), and Geometry and Trigonometry (area, volume, coordinate geometry, right triangles, radians). Type any topic and AI generates targeted cards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli cover the digital SAT format?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli\'s AI-generated cards align with the current digital SAT (Bluebook format, adaptive testing). You can specify "digital SAT math" in your topic prompt and get cards focused on the concepts and problem types that appear most frequently in the 2024-2025 test.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload SAT prep book PDFs to Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any SAT prep PDF — College Board practice tests, Khan Academy notes, Princeton Review, Barron\'s — and Esli\'s AI extracts the key formulas, concepts, and techniques into a study-ready flashcard deck.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Khan Academy for SAT math prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Khan Academy is excellent for SAT math practice problems and video lessons. Esli is for memorizing the formulas, rules, and concepts you need to solve those problems quickly. Use both together: Esli to retain formulas and definitions, Khan Academy for practice.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the quadratic formula? When do you use it instead of factoring?',
    a: 'x = (−b ± √(b² − 4ac)) / 2a. Use when the quadratic does not factor easily or when the discriminant (b² − 4ac) is not a perfect square. If b² − 4ac > 0: 2 real solutions; = 0: 1 solution; < 0: no real solutions.',
  },
  {
    q: 'What is the vertex form of a parabola? What does each part tell you?',
    a: 'y = a(x − h)² + k. The vertex is at (h, k). If a > 0 the parabola opens upward (minimum at vertex); if a < 0 it opens downward (maximum at vertex). Useful for quickly identifying the axis of symmetry x = h.',
  },
  {
    q: 'Define "slope of a line" and state the slope formula.',
    a: 'Slope m = rise/run = (y₂ − y₁) / (x₂ − x₁). Parallel lines have equal slopes; perpendicular lines have slopes that are negative reciprocals (m₁ × m₂ = −1).',
  },
  {
    q: 'What are the special right triangle ratios to memorize for SAT geometry?',
    a: '30-60-90: sides in ratio 1 : √3 : 2 (short leg : long leg : hypotenuse). 45-45-90: sides in ratio 1 : 1 : √2. SOHCAHTOA: sin = opp/hyp, cos = adj/hyp, tan = opp/adj.',
  },
  {
    q: 'How do you find the mean, median, and mode of a data set?',
    a: 'Mean: sum of values ÷ number of values. Median: middle value when sorted (average of two middle values if even count). Mode: most frequent value (can be multiple). SAT often tests which measure is affected by outliers (mean is; median is not).',
  },
  {
    q: 'What is the equation of a circle in standard form?',
    a: '(x − h)² + (y − k)² = r². Center is at (h, k), radius is r. To convert from general form (x² + y² + Bx + Cy + D = 0), complete the square for both x and y terms.',
  },
]

const benefits = [
  { title: 'Every SAT math domain covered', body: 'Algebra, Advanced Math, Problem-Solving & Data Analysis, Geometry & Trig — generate targeted decks for any domain or the full test.' },
  { title: 'Digital SAT aligned', body: 'Esli\'s AI knows the current adaptive digital SAT format. Cards focus on the formula and concept types that appear most on the actual test.' },
  { title: 'Upload your prep materials', body: 'Turn any SAT prep book PDF into a flashcard deck automatically. College Board tests, Princeton Review, Barron\'s — all supported.' },
  { title: 'SM-2 spaced repetition', body: 'The same algorithm as Anki. Formulas you struggle with resurface sooner, so they stick before test day.' },
]

export default function SATMathFlashcardsPage() {
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
                <span className="text-primary-600">SAT Math Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any SAT math topic or upload your prep book and get a complete deck of formula and concept cards in seconds. No manual entry. Spaced repetition keeps formulas sharp through test day.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Algebra', 'Quadratics & Polynomials', 'Systems of Equations', 'Data Analysis', 'Geometry', 'Trigonometry', 'Digital SAT Format', 'Statistics & Probability'].map((tag) => (
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
                  Generate SAT Math Flashcards Free
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
                SAT math prep in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a complete formula deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your SAT math topic',
                  body: 'Enter anything — "SAT algebra linear equations", "quadratic formula and discriminant", "circle equations SAT" — or upload a PDF of your prep book or practice test.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards covering formulas, rules, and problem-solving techniques for that topic — aligned to the digital SAT format.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review cards with the SM-2 algorithm. Formulas you struggle with resurface sooner, so you retain them through test day.',
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
                Example SAT math flashcards
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
                Generate Your SAT Math Deck Free
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
                Why SAT students choose Esli
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
                SAT math flashcard FAQs
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
              Ready to boost your SAT math score?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate formula and concept cards for every SAT math domain. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate SAT Math Flashcards Free
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
              <a href="/flashcards/gre-vocabulary" className="hover:text-white transition-colors no-underline">GRE Vocabulary</a>
              <a href="/flashcards/act" className="hover:text-white transition-colors no-underline">ACT Flashcards</a>
              <a href="/flashcards/ap-biology" className="hover:text-white transition-colors no-underline">AP Biology</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
