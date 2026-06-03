/**
 * SEO Landing Page: Statistics Flashcards
 * Route: /flashcards/statistics
 * Meta title: Statistics Flashcards Free — AI Generator | Esli
 * Meta description: Generate statistics flashcards with AI. AP Statistics, hypothesis testing, probability — type any topic and get cards instantly. Free.
 * Target keywords: statistics flashcards, AP Statistics flashcards, statistics study cards free, AP Stats flashcards AI, hypothesis testing flashcards
 * Week: 2026-W23
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
      name: 'Are statistics flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited statistics flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate AP Statistics flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type topics like "AP Statistics hypothesis testing", "sampling distributions", "confidence intervals", or "AP Stats regression" and Esli generates targeted Q&A cards in seconds. You can also upload your AP Stats textbook or review book as a PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which statistics topics can I make flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic: descriptive statistics (mean, median, standard deviation), probability and distributions (normal, binomial, t-distribution), hypothesis testing (z-test, t-test, chi-square, ANOVA), confidence intervals, regression and correlation, sampling methods, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my statistics textbook as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your OpenIntro Statistics, Moore\'s The Basic Practice of Statistics, Barron\'s AP Statistics, or any course notes — Esli\'s AI extracts definitions, formulas, theorems, and worked examples into a complete flashcard deck automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Anki for statistics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With Anki you manually type every formula and definition — that can take hours. Esli generates a full deck from a topic or PDF in seconds, then uses the same SM-2 spaced repetition algorithm. Esli also requires no desktop install and works on any device.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the Central Limit Theorem?',
    a: 'For a sufficiently large sample size (n ≥ 30), the sampling distribution of the sample mean is approximately normal, regardless of the population distribution. Mean of sampling dist = μ, standard error = σ/√n.',
  },
  {
    q: 'What is a p-value and how do you interpret it?',
    a: 'The p-value is the probability of observing results at least as extreme as your data, assuming H₀ is true. If p < α (typically 0.05), reject H₀. A small p-value is evidence against the null hypothesis — not proof the alternative is true.',
  },
  {
    q: 'What is the difference between Type I and Type II error?',
    a: 'Type I error (α): rejecting H₀ when it is actually true (false positive). Type II error (β): failing to reject H₀ when it is actually false (false negative). Power = 1 − β = probability of correctly detecting a real effect.',
  },
  {
    q: 'State the formula for a 95% confidence interval for a population mean.',
    a: 'CI = x̄ ± (z* × σ/√n) for known σ, or x̄ ± (t* × s/√n) for unknown σ. For 95%, z* ≈ 1.96. Interpretation: we are 95% confident the true population mean lies within this interval — NOT that 95% of sample means fall here.',
  },
  {
    q: 'When do you use a chi-square test?',
    a: 'Use chi-square for categorical data: (1) Goodness-of-fit test — does observed distribution match expected? (2) Test of independence — are two categorical variables independent? Formula: χ² = Σ[(O − E)²/E]. Requires all expected counts ≥ 5.',
  },
  {
    q: 'What does the correlation coefficient r measure, and what are its bounds?',
    a: 'r measures the strength and direction of the linear relationship between two quantitative variables. Range: −1 ≤ r ≤ 1. r = 1: perfect positive linear relationship; r = −1: perfect negative; r = 0: no linear relationship. r² = proportion of variance explained.',
  },
]

const benefits = [
  {
    title: 'Formulas and definitions in seconds',
    body: 'Type "hypothesis testing steps", "confidence interval formulas", or "AP Statistics regression" and get formula-focused cards with conditions, interpretations, and common pitfalls.',
  },
  {
    title: 'Upload your textbook or AP review book',
    body: "Turn Barron's AP Statistics, OpenIntro Statistics, or any course notes PDF into a complete flashcard deck. Esli extracts key definitions, formulas, and theorems automatically.",
  },
  {
    title: 'SM-2 spaced repetition',
    body: 'The same algorithm used by Anki. Concepts you find tricky — like p-value interpretation or Type I vs Type II error — resurface at exactly the right time so they stick through exam day.',
  },
  {
    title: 'Study anywhere, no install',
    body: 'Browser, phone, tablet — your decks sync everywhere. No app download needed, works on any device for last-minute AP exam or final exam review.',
  },
]

export default function StatisticsFlashcardsPage() {
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
                <span className="text-primary-600">Statistics Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any stats topic — AP Statistics, hypothesis testing, probability distributions, regression — and get a complete flashcard deck in seconds. No manual formula typing, no formatting definitions by hand.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  'AP Statistics',
                  'Hypothesis Testing',
                  'Probability Distributions',
                  'Confidence Intervals',
                  'Regression & Correlation',
                  'Sampling Methods',
                  'ANOVA',
                  'Chi-Square Tests',
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
                  Generate Statistics Flashcards Free
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
                Stats prep in 3 simple steps
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
                  title: 'Type your stats topic',
                  body: 'Enter anything — "AP Statistics hypothesis testing", "normal distribution formulas", "confidence intervals explained" — or upload your textbook, Barron\'s AP Stats review book, or lecture notes as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards covering formulas, definitions, test conditions, worked examples, and common interpretation mistakes — tailored to your exact topic.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. Concepts you struggle with — like p-value interpretation or when to use z vs t — resurface at exactly the right time so nothing slips on exam day.',
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
                Example statistics flashcards
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
                Generate Your Statistics Deck Free
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
                Why statistics students choose Esli
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
                Statistics flashcard FAQs
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
              Ready to master statistics?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of students generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Statistics Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also studying math?{' '}
              <a href="/flashcards/calculus" className="text-white underline hover:no-underline">
                Calculus flashcards
              </a>{' '}
              and{' '}
              <a href="/flashcards/ap-biology" className="text-white underline hover:no-underline">
                AP Biology flashcards
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
