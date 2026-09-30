/**
 * SEO Landing Page: Stock Market & Investing Flashcards
 * Route: /flashcards/stock-market
 * Meta title: Stock Market Flashcards Free — AI Generator | Esli
 * Meta description: Generate stock market and investing flashcards with AI. P/E ratio,
 *   valuation, CFA prep — free, spaced repetition. No signup needed.
 * Target keywords: stock market flashcards, investing flashcards, finance flashcards free,
 *   CFA flashcards, stock market terms flashcards, investment flashcards, trading flashcards
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
      name: 'Are stock market flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited stock market and investing flashcards with AI — valuation ratios, financial statements, options, CFA concepts — with spaced repetition included. No credit card or signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What investing topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any investing or stock market topic: valuation ratios (P/E, P/B, EV/EBITDA), financial statement analysis (income statement, balance sheet, cash flow), technical analysis (moving averages, RSI, support/resistance), options and derivatives basics, portfolio theory (CAPM, beta, Sharpe ratio), macroeconomic indicators, CFA Level 1 concepts, accounting fundamentals, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me study for the CFA exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type any CFA Level 1, 2, or 3 topic — "CFA ethics standards", "time value of money", "fixed income duration", "portfolio management IPS" — and Esli generates targeted flashcards. You can also upload CFA study notes PDFs and Esli extracts the key concepts automatically. Spaced repetition ensures long-term retention across the 10 CFA topic areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a beginner use Esli to learn stock market basics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Type "stock market basics for beginners" or specific terms like "what is a P/E ratio", "how do dividends work", or "difference between stocks and bonds" and Esli creates beginner-friendly flashcards. You control the complexity level by how you phrase your topic.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from just reading an investing book?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Reading is passive — you forget most of it within a week. Esli converts investing concepts into active recall flashcards and uses spaced repetition (SM-2 algorithm) to resurface what you\'re forgetting before it slips away. This is how CFA candidates and finance students build lasting knowledge, not just familiarity.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What does the Price-to-Earnings (P/E) ratio measure and how is it calculated?',
    a: 'P/E = Share Price / Earnings Per Share (EPS). Measures how much investors pay per $1 of earnings. High P/E = growth expectations or overvaluation. Low P/E = value stock or declining business. Context: always compare P/E to sector average and historical range.',
  },
  {
    q: 'What is EBITDA and why do analysts use EV/EBITDA instead of P/E?',
    a: 'EBITDA = Earnings Before Interest, Taxes, Depreciation & Amortization. EV/EBITDA uses Enterprise Value (equity + debt - cash) rather than just equity, making it capital-structure neutral. Better for comparing companies with different leverage levels or in capital-intensive industries.',
  },
  {
    q: 'What is beta in finance and what does a beta of 1.5 mean?',
    a: 'Beta measures a stock\'s volatility relative to the market. Beta 1.0 = moves with market. Beta 1.5 = moves 1.5x market volatility (up 15% when market up 10%, down 15% when market down 10%). Used in CAPM: Expected Return = Risk-Free Rate + Beta × (Market Return - Risk-Free Rate).',
  },
  {
    q: 'What are the 3 financial statements and what does each show?',
    a: 'Income Statement: revenue, expenses, profit over a period. Balance Sheet: assets, liabilities, equity at a point in time (Assets = Liabilities + Equity). Cash Flow Statement: operating, investing, and financing cash flows. Together they give a complete financial picture — always read all three.',
  },
  {
    q: 'What is the difference between a call option and a put option?',
    a: 'Call option: right (not obligation) to BUY 100 shares at the strike price before expiry. Profitable when stock rises above strike + premium. Put option: right to SELL 100 shares at the strike price. Profitable when stock falls below strike - premium. Both expire worthless if out-of-the-money.',
  },
  {
    q: 'What is the Sharpe Ratio and what does a higher value indicate?',
    a: 'Sharpe Ratio = (Portfolio Return - Risk-Free Rate) / Portfolio Standard Deviation. Measures excess return per unit of risk. Higher = better risk-adjusted performance. SR > 1 = good; SR > 2 = very good; SR > 3 = excellent. Useful for comparing portfolios with different risk levels.',
  },
]

const benefits = [
  { title: 'Valuation ratios in minutes', body: 'Type "equity valuation ratios" and get P/E, P/B, EV/EBITDA, PEG, and dividend yield explained with formulas and use cases — instantly.' },
  { title: 'CFA exam prep without the cost', body: 'Generate CFA Level 1-3 flashcards for any topic area. Upload your study notes PDF and Esli turns 200 pages into a targeted flashcard deck.' },
  { title: 'Build real financial literacy', body: 'Spaced repetition ensures you actually retain valuation concepts and financial statement analysis — not just recognize them when you see them.' },
  { title: 'Study anywhere', body: 'Commute, lunch break, waiting room — your investing decks sync across all devices so you can review anytime without losing your progress.' },
]

export default function StockMarketFlashcardsPage() {
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
                <span className="text-primary-600">Stock Market Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any investing topic and get a complete flashcard deck in seconds. Valuation ratios, financial statements, options, CFA prep — AI-powered with spaced repetition.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Valuation Ratios', 'Financial Statements', 'Options & Derivatives', 'Technical Analysis', 'CFA Level 1', 'Portfolio Theory', 'Macroeconomics', 'Accounting Basics'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Stock Market Flashcards Free
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
                Investing knowledge in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From market beginner to fluent in valuation — faster than any course.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your investing topic',
                  body: 'Enter anything — "stock valuation ratios", "CFA Level 1 fixed income", "options strategies", "DCF analysis" — or upload your finance textbook PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds your deck',
                  body: 'Our AI creates Q&A cards covering formulas, definitions, applications, and the nuances that differentiate strong investors from weak ones.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm resurfaces concepts you\'re forgetting before they slip. Build durable financial knowledge, not just short-term familiarity.',
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
                Example stock market flashcards
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
                Generate Your Investing Deck Free
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
                Why investors and finance students choose Esli
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
                Stock market flashcard FAQs
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
              Ready to think like an investor?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate finance and investing flashcards with AI — free, with spaced repetition. Build knowledge that actually sticks.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Stock Market Flashcards Free
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
              <a href="/flashcards/economics" className="hover:text-white transition-colors no-underline">Economics Flashcards</a>
              <a href="/flashcards/cpa-exam" className="hover:text-white transition-colors no-underline">CPA Exam Flashcards</a>
              <a href="/use-case/professionals" className="hover:text-white transition-colors no-underline">Professionals</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
