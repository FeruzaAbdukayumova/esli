/**
 * SEO Landing Page: Accounting Flashcards
 * Route: /flashcards/accounting
 * Meta title: Accounting Flashcards Free — AI Generator | Esli
 * Meta description: Generate accounting flashcards with AI. Debits & credits, financial
 *   statements, journal entries, ratios — free, spaced repetition. No signup.
 * Target keywords: accounting flashcards, financial accounting flashcards,
 *   debits and credits flashcards, accounting terms flashcards, managerial accounting flashcards
 * Week: 2026-W33
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
      name: 'Are accounting flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited accounting flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What accounting topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli can generate flashcards for any accounting topic: financial accounting (debits, credits, journal entries, financial statements), managerial accounting (cost behavior, variance analysis, budgeting), tax accounting, auditing, and exam prep (CPA, CMA, FAR). Just type the specific topic or upload your textbook PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I make flashcards from my accounting textbook PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — Intermediate Accounting (Kieso), Managerial Accounting (Garrison), your professor\'s slides — and Esli\'s AI extracts key concepts, journal entries, and formulas and turns them into study-ready flashcards automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli help with memorizing accounting journal entries?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates cards that show the full journal entry (debit/credit format) on the answer side. You see the scenario on the front ("Company receives cash payment of $5,000 for services rendered") and flip to see the T-account entry. Spaced repetition ensures high-frequency entries like accruals and adjustments get extra repetition.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli useful for CPA exam accounting prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — especially for the FAR (Financial Accounting & Reporting) and REG (Regulation) sections where memorization of standards, ratios, and rules is key. Type "FAR governmental accounting flashcards" or "REG tax concepts flashcards" and Esli generates targeted cards instantly. For a dedicated CPA page, see our CPA exam flashcards page.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'A company purchases $10,000 of inventory on credit. Record the journal entry.',
    a: 'Debit: Inventory $10,000 | Credit: Accounts Payable $10,000. (Assets increase → debit; Liabilities increase → credit.)',
  },
  {
    q: 'What is the accounting equation? What does each component represent?',
    a: 'Assets = Liabilities + Shareholders\' Equity. Assets = what the company owns. Liabilities = what it owes. SE = residual interest of owners. Must always balance — every transaction has dual effects.',
  },
  {
    q: 'Define "accrual basis" vs "cash basis" accounting.',
    a: 'Accrual basis: revenue recognized when earned, expenses when incurred — regardless of cash flow (GAAP required for public companies). Cash basis: revenue and expenses recorded only when cash changes hands (allowed for small businesses).',
  },
  {
    q: 'What are the four financial statements and what does each show?',
    a: '1. Income Statement — revenues and expenses over a period (net income). 2. Balance Sheet — assets, liabilities, equity at a point in time. 3. Cash Flow Statement — operating, investing, financing cash flows. 4. Statement of Stockholders\' Equity — changes in equity accounts.',
  },
  {
    q: 'What is the current ratio and what does it indicate?',
    a: 'Current Ratio = Current Assets / Current Liabilities. Measures short-term liquidity. A ratio > 1 means the company can cover current obligations with current assets. Ideal varies by industry; generally 1.5-2.0 is healthy.',
  },
  {
    q: 'Explain the difference between straight-line and double-declining-balance depreciation.',
    a: 'Straight-line: equal expense each year. Formula: (Cost - Salvage) / Useful Life. Double-declining balance (DDB): accelerated method. Year 1 expense = 2 × SL rate × Book Value. DDB front-loads expenses — matching principle for assets that lose value quickly.',
  },
]

const benefits = [
  {
    title: 'Covers every accounting course level',
    body: 'From intro financial accounting to intermediate, managerial, advanced, audit, and tax — AI generates cards specific to your exact course content.',
  },
  {
    title: 'Journal entries in flash-card format',
    body: 'See the scenario, flip to the debit/credit entry. The exact format your professor tests, not vague definitions.',
  },
  {
    title: 'Upload your textbook or slides',
    body: 'Turn Kieso chapters, Horngren slides, or your own notes into a complete study deck automatically — no manual entry.',
  },
  {
    title: 'Spaced repetition for formulas and ratios',
    body: 'Accounting ratios and depreciation methods need to be automatic on exam day. SM-2 algorithm makes sure they are.',
  },
]

export default function AccountingFlashcardsPage() {
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
                <span className="text-primary-600">Accounting Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any accounting topic — debits and credits, financial statements, journal entries, ratios — and get a complete deck of flashcards in seconds. Spaced repetition included. No signup needed.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Debits & Credits', 'Journal Entries', 'Financial Statements', 'Depreciation', 'Ratios & Analysis', 'Managerial Accounting', 'Accruals', 'CPA FAR Prep'].map((tag) => (
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
                  Generate Accounting Flashcards Free
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
                Accounting prep in 3 simple steps
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
                  title: 'Type your accounting topic',
                  body: 'Enter "debits and credits basics", "adjusting journal entries", "cost-volume-profit analysis" — or upload your textbook chapter PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'AI creates scenario-based cards with full journal entries, formula cards, ratio definitions, and conceptual Q&As — the format your exams test.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 algorithm resurfaces tricky entries and ratios at the optimal interval. Formulas become second nature by exam day.',
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
                Example accounting flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                These are the kinds of cards Esli generates — click any card to flip it.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-48 cursor-pointer [perspective:1200px]"
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
                Generate Your Accounting Deck Free
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
                Why accounting students choose Esli
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

            <div className="mt-10 text-center">
              <p className="text-sm text-slate-500">
                Also useful for:{' '}
                <a href="/flashcards/cpa-exam" className="text-primary-600 hover:underline">CPA Exam</a>
                {' · '}
                <a href="/flashcards/economics" className="text-primary-600 hover:underline">Economics</a>
                {' · '}
                <a href="/flashcards/microeconomics" className="text-primary-600 hover:underline">Microeconomics</a>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Accounting flashcard FAQs
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
              Ready to ace your accounting exam?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate accounting flashcards for any topic in seconds. Spaced repetition. PDF upload. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Accounting Flashcards Free
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
