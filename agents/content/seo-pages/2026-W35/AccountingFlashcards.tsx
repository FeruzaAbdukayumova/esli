/**
 * SEO Landing Page: Accounting Flashcards
 * Route: /flashcards/accounting
 * Meta title: Accounting Flashcards Free — AI Generator | Esli (51 chars)
 * Meta description: Generate accounting flashcards with AI. Debits, credits, financial statements, journal entries — free, spaced repetition. No signup. (139 chars)
 * Target keywords: accounting flashcards, financial accounting flashcards, debits and credits flashcards, accounting principles flashcards, managerial accounting flashcards
 * Week: 2026-W35
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
      name: 'What accounting topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates accounting flashcards covering the full curriculum: financial accounting fundamentals (debits, credits, the accounting equation, journal entries, ledger posting, trial balance), financial statements (income statement, balance sheet, cash flow statement, statement of retained earnings), revenue recognition (ASC 606 five-step model), depreciation methods (straight-line, double-declining balance, units-of-activity), inventory valuation (FIFO, LIFO, weighted average), managerial accounting (job costing, process costing, activity-based costing, CVP analysis, budgeting, variance analysis), intermediate accounting (leases, bonds, pensions, EPS, fair value measurement), and CPA exam FAR, AUD, REG, BEC topics. Upload any accounting textbook chapter PDF for instant targeted decks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli to study for the CPA exam or CMA exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. CPA and CMA candidates use Esli to build rapid recall of the conceptual rules that appear in MCQ sections — definitions, criteria, and thresholds that are easy to confuse under exam pressure. For FAR (Financial Accounting and Reporting): generate decks on ASC standards by topic (revenue, leases ASC 842, financial instruments ASC 320, not-for-profit ASC 958). For REG: tax rules and thresholds (standard deductions, AMT, corporate vs pass-through tax treatment). For AUD: audit risk model components (inherent, control, detection risk), assertions, sampling methods. Esli complements Becker, Roger, or Wiley review by building the background conceptual memory that makes MCQs faster to answer. For the CMA exam: use Esli for Part 1 (financial statement analysis ratios) and Part 2 (budgeting, standard costs, variance analysis formulas).',
      },
    },
    {
      '@type': 'Question',
      name: 'What are effective accounting flashcard prompts to use with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-value accounting prompts: 'Debits and credits: which side increases each of the 5 account types (assets, liabilities, equity, revenue, expenses) and why — include the normal balance and a journal entry example', 'GAAP vs IFRS: 10 key differences in revenue recognition, inventory, leases, and intangible assets — include the relevant ASC/IAS standard numbers', 'Depreciation methods: straight-line, double-declining balance, units-of-activity — formula, when to use each, and how book value changes over time', 'ASC 606 revenue recognition: all 5 steps with examples from SaaS, retail, and construction contracts', 'Variance analysis: all 6 variances (direct materials price + quantity, direct labor rate + efficiency, overhead spending + volume) — formula, favorable vs unfavorable, who is responsible', 'Ratio analysis: 15 key ratios grouped by liquidity, solvency, profitability, and efficiency — formula, what it measures, and what a good ratio looks like'.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does spaced repetition help with accounting memorization?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Accounting is heavily rule-based and threshold-dependent — the kind of knowledge that fades quickly without reinforcement. Spaced repetition is especially powerful here because accounting students must remember both the rule (how to account for a lease) and the specific criteria (when an operating vs finance lease is triggered under ASC 842). Esli's SM-2 algorithm surfaces the rules you misremember more frequently, building the automatic recall that lets you recognize the correct journal entry in 10 seconds rather than reconstructing it from first principles. Research shows spaced repetition produces 2-3x better long-term retention compared to rereading — the same chapters that take hours to read can become reflex recall in 10 minutes of daily review over two weeks.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for accounting students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes unlimited AI flashcard generation, spaced repetition scheduling, and community decks — no credit card required. Whether you are taking Principles of Accounting, Intermediate Accounting II, Auditing, or studying for the CPA exam, you can generate as many accounting decks as you need at no cost. Guest mode lets you start immediately without creating an account — no email, no signup.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are debits and credits? How do they affect the 5 account types?',
    a: 'Debits (Dr) and credits (Cr) are the two sides of every journal entry. They do NOT mean increase/decrease universally — the effect depends on the account type. Assets: Debit = increase, Credit = decrease. Normal balance = Debit. Liabilities: Debit = decrease, Credit = increase. Normal balance = Credit. Equity (including Common Stock, Retained Earnings): Debit = decrease, Credit = increase. Normal balance = Credit. Revenue: Debit = decrease, Credit = increase. Normal balance = Credit. Expenses: Debit = increase, Credit = decrease. Normal balance = Debit. Memory trick: DEA-LER — Dividends, Expenses, Assets have Debit normal balances. Liabilities, Equity, Revenue have Credit normal balances. Every transaction must balance: total debits = total credits.',
  },
  {
    q: 'What is the accounting equation? How does it stay balanced after every transaction?',
    a: 'Accounting equation: Assets = Liabilities + Equity. This is the foundation of double-entry bookkeeping — every transaction affects at least two accounts and must keep this equation in balance. Expanded: Assets = Liabilities + (Common Stock + Retained Earnings) = Liabilities + Common Stock + Revenue - Expenses - Dividends. Examples: Buy equipment for cash ($10,000): Assets +$10,000 (equipment), Assets -$10,000 (cash). Net effect on Assets: $0. Equation stays balanced. Borrow $50,000 from bank: Assets +$50,000 (cash), Liabilities +$50,000 (notes payable). Both sides increase equally. Equation stays balanced. Record $5,000 revenue on account: Assets +$5,000 (accounts receivable), Equity +$5,000 (revenue increases retained earnings). Equation stays balanced.',
  },
  {
    q: 'What are the four financial statements? What does each measure?',
    a: '1. Income Statement (P&L): measures profitability over a period. Revenue - Expenses = Net Income. Reports operating performance. Period: Q or year. 2. Balance Sheet (Statement of Financial Position): snapshot of financial position at a point in time. Assets = Liabilities + Equity. Shows what the company owns (assets) vs owes (liabilities) vs has invested (equity). 3. Statement of Cash Flows: tracks actual cash movement, not accrual income. Three sections: Operating (core business), Investing (long-term asset purchases/sales), Financing (debt and equity transactions). Can be direct or indirect method for operating section. 4. Statement of Retained Earnings (or Stockholders Equity): bridges the income statement and balance sheet. Beginning RE + Net Income - Dividends = Ending RE. Links the period (income statement) to the snapshot (balance sheet). Preparation order matters: Income Statement → Statement of RE → Balance Sheet → Cash Flow Statement.',
  },
  {
    q: 'What is the difference between accrual and cash basis accounting?',
    a: 'Accrual basis: Revenue recognized when earned (service performed, goods delivered), regardless of when cash is received. Expenses recognized when incurred, regardless of when cash is paid. Required by GAAP for public companies. Gives a more accurate picture of economic activity. Key concepts: accounts receivable (earned but uncollected), accounts payable (incurred but unpaid), prepaid expenses (paid but not yet used), deferred revenue (cash received, service not yet performed). Cash basis: Revenue recognized only when cash is received. Expenses recognized only when cash is paid. Allowed for small businesses and tax purposes (under IRS rules). Simple to maintain but can distort financial picture (e.g., a company can look profitable on cash basis while being technically insolvent on accrual). Conversion: Accrual revenue = Cash collected + Increase in AR - Decrease in AR. Accrual expense = Cash paid + Decrease in AP - Increase in AP.',
  },
  {
    q: 'What are the depreciation methods? When do you use each?',
    a: 'Depreciation allocates an asset\'s cost over its useful life. All methods: Depreciable cost = Cost - Salvage value. 1. Straight-Line (SL): Annual depreciation = Depreciable cost / Useful life (years). Equal expense each year. Most common, simple, used when asset benefits are uniform. 2. Double-Declining Balance (DDB) [accelerated]: Annual rate = 2 / Useful life. Apply rate to beginning book value (NOT depreciable cost). Expense declines each year. Used when asset delivers more benefit early (vehicles, computers). Note: switch to SL when SL gives higher expense. Stop at salvage value. 3. Units-of-Activity (UOP): Depreciation/unit = Depreciable cost / Total expected units. Annual expense = Depreciation/unit × Units produced this year. Matches expense to actual usage. Best for machinery, mining equipment, delivery vehicles where output is measurable. GAAP note: any method is acceptable if applied consistently. MACRS (accelerated) is used for tax purposes — different from financial accounting.',
  },
  {
    q: 'What is the ASC 606 five-step revenue recognition model?',
    a: 'ASC 606 (IFRS 15 internationally) unified revenue recognition across all industries. 5 steps: Step 1 — Identify the contract with a customer: must have commercial substance, both parties committed, payment terms identified, and collection probable. Step 2 — Identify the performance obligations (POBs): distinct goods/services promised. A good/service is distinct if: (a) customer can benefit from it on its own, and (b) it is separately identifiable from other promises. Step 3 — Determine the transaction price: fixed amounts + variable consideration (estimated, constrained to probable amount). Exclude amounts collected for third parties (sales tax). Step 4 — Allocate transaction price to POBs: use relative standalone selling prices (SSP). If SSP is not directly observable, estimate via adjusted market assessment, expected cost + margin, or residual approach. Step 5 — Recognize revenue when (or as) each POB is satisfied: Point in time (most goods): control transfers at delivery. Over time (services, construction): recognize as service is performed, using output or input methods.',
  },
]

const benefits = [
  {
    title: 'From debits and credits to advanced financial reporting',
    body: 'Generate decks matched to your course level: intro accounting fundamentals for Principles I, journal entries and adjustments for Intermediate Accounting, or ASC standard-specific decks for CPA exam FAR prep. The AI adjusts depth to your prompt.',
  },
  {
    title: 'Upload your accounting textbook chapters as PDFs',
    body: "Drop a chapter from Weygandt, Kieso & Kimmel, or your professor's lecture notes and get flashcard decks covering every journal entry type, ratio formula, and GAAP rule. Turn 80-page chapters into 20-minute daily review sessions.",
  },
  {
    title: 'Build automatic recall for journal entries and ratios',
    body: 'Accounting exams reward speed and accuracy under pressure. Spaced repetition builds the reflex recall that lets you identify the correct journal entry in seconds — debits and credits become instinctive rather than something you reconstruct from scratch each time.',
  },
  {
    title: 'Prepare for CPA, CMA, and accounting exams',
    body: 'Esli complements Becker and Wiley review courses by drilling the conceptual background that multiple-choice questions test. Generate decks for FAR, AUD, REG, and BEC topics, or focus on CMA Part 1 and Part 2 content — targeted by section and topic.',
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
                <span className="text-primary-600">Accounting</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any accounting topic — debits and credits, financial statements, journal entries, ASC standards — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Debits & Credits', 'Financial Statements', 'Journal Entries', 'ASC 606', 'Depreciation', 'Managerial Accounting', 'CPA Exam', 'Ratio Analysis'].map((tag) => (
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
                Master accounting in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From journal entries to financial statements — generate, study, and build automatic recall.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your accounting topic',
                  body: 'Enter "debits and credits for all 5 account types with examples", "ASC 606 five-step model", or upload a textbook chapter PDF for decks that match exactly what your exam will test.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering rules, journal entry examples, formulas, and GAAP criteria — the conceptual depth that Intermediate Accounting and CPA exam questions actually test.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules daily 10-minute reviews. The depreciation formulas and ASC thresholds you confuse appear more often — building the automatic recall that accounting exams demand.',
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
              Start mastering accounting today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any accounting topic in seconds. Free forever — no credit card, no subscription required.
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
              <a href="/flashcards/economics" className="hover:text-white transition-colors no-underline">Economics Flashcards</a>
              <a href="/flashcards/cpa-exam" className="hover:text-white transition-colors no-underline">CPA Exam Flashcards</a>
              <a href="/flashcards/data-science" className="hover:text-white transition-colors no-underline">Data Science Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
