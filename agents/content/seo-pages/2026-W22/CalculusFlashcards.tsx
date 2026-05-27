/**
 * SEO Landing Page: Calculus Flashcards
 * Route: /flashcards/calculus
 * Meta title: Calculus Flashcards Free — AI Generator | Esli
 * Meta description: Generate calculus flashcards with AI. Derivatives, integrals, limits, AP Calculus, college calc — type any topic and get cards instantly. Free.
 * Target keywords: calculus flashcards, AP Calculus flashcards, calculus study cards free, calculus flashcards AI, AP Calc AB BC flashcards
 * Week: 2026-W22
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
      name: 'Are calculus flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited calculus flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate AP Calculus AB and BC flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type topics like "AP Calculus AB limits", "related rates", "Taylor series" or "AP Calc BC parametric equations" and Esli generates high-yield Q&A cards in seconds. You can also upload your AP Calc textbook or review book as a PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which calculus topics can I make flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic: limits and continuity, derivatives (chain rule, product rule, quotient rule), applications of derivatives (related rates, optimization, curve sketching), integrals (u-substitution, integration by parts), series and sequences, multivariable calculus, differential equations, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my calculus textbook as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload Stewart, Larson, Spivak, Barron\'s AP Calculus, or your own lecture notes and Esli\'s AI extracts key theorems, formulas, and problem-solving steps into a complete flashcard deck automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli better than Anki for calculus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With Anki you have to type every formula and theorem yourself — that can take hours. Esli generates a full deck from a topic or PDF in seconds, then both tools use spaced repetition. Esli also works in any browser with no desktop install.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'State the definition of a derivative using the limit definition.',
    a: "f'(x) = lim(h→0) [f(x+h) − f(x)] / h. This is the instantaneous rate of change of f at x — the slope of the tangent line to the curve at that point.",
  },
  {
    q: "What is the chain rule and when do you use it?",
    a: "If y = f(g(x)), then dy/dx = f'(g(x)) · g'(x). Use it whenever you differentiate a composite function — a function inside another function. Example: d/dx[sin(x²)] = cos(x²) · 2x.",
  },
  {
    q: 'State the Fundamental Theorem of Calculus (both parts).',
    a: 'Part 1: If F(x) = ∫[a to x] f(t) dt, then F\'(x) = f(x). Part 2: ∫[a to b] f(x) dx = F(b) − F(a), where F is any antiderivative of f. Together they connect differentiation and integration.',
  },
  {
    q: "What is L'Hôpital's Rule and when does it apply?",
    a: "If lim f(x)/g(x) gives 0/0 or ∞/∞, then lim f(x)/g(x) = lim f'(x)/g'(x), provided the latter limit exists. Apply iteratively if the indeterminate form persists.",
  },
  {
    q: 'What is the integral of 1/x?',
    a: '∫ (1/x) dx = ln|x| + C. The absolute value handles both x > 0 and x < 0. This is a key formula because 1/x has no power rule antiderivative (that would give x⁰/0, undefined).',
  },
  {
    q: "Explain integration by parts and state the formula.",
    a: '∫ u dv = uv − ∫ v du. Choose u and dv using LIATE priority: Logarithms, Inverse trig, Algebraic (polynomials), Trig, Exponentials — the first applicable type becomes u. Example: ∫ x·eˣ dx → u=x, dv=eˣ dx.',
  },
]

const benefits = [
  { title: 'Formulas and theorems in seconds', body: 'Type "related rates problems", "optimization calculus", or "Taylor series convergence" and get formula-focused cards with conditions, proofs, and worked examples.' },
  { title: 'Upload your textbook or AP review book', body: 'Turn Stewart, Barron\'s AP Calculus, or any calc PDF into a complete flashcard deck. Esli extracts theorems, formulas, and key definitions automatically.' },
  { title: 'SM-2 spaced repetition', body: 'The same algorithm used by Anki. Tricky formulas (like integration by parts LIATE rule) resurface at exactly the right time so they stick through exam day.' },
  { title: 'Study anywhere, no install', body: 'Browser, phone, tablet — your decks sync everywhere. No app download needed, works on any device for last-minute AP exam review.' },
]

export default function CalculusFlashcardsPage() {
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
                <span className="text-primary-600">Calculus Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any calc topic — derivatives, integrals, AP Calculus AB/BC, college calc — and get a complete flashcard deck in seconds. No manual formula entry, no formatting theorems by hand.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Limits & Continuity', 'Derivatives', 'Integrals', 'AP Calc AB/BC', 'Related Rates', 'Taylor Series', 'Differential Equations', 'Multivariable Calc'].map(tag => (
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
                  Generate Calculus Flashcards Free
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
                Calc prep in 3 simple steps
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
                  title: 'Type your calc topic',
                  body: 'Enter anything — "chain rule examples", "related rates problems", "AP Calculus BC series" — or upload your textbook, Stewart, Barron\'s AP Calc review book, or lecture notes as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards covering formulas, theorems, definitions, worked examples, and exam-style application questions tailored to your topic.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. Formulas you struggle with resurface sooner, so you never blank on the Fundamental Theorem or integration by parts on exam day.',
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
                Example calculus flashcards
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
                Generate Your Calculus Deck Free
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
                Why calculus students choose Esli
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
                Calculus flashcard FAQs
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
              Ready to master calculus?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of students generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Calculus Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also studying STEM? See our{' '}
              <a href="/flashcards/ap-biology" className="text-white underline hover:no-underline">AP Biology flashcards</a>{' '}
              and{' '}
              <a href="/flashcards/data-structures" className="text-white underline hover:no-underline">data structures flashcards</a>.
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
