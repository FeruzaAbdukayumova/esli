/**
 * SEO Landing Page: Real Estate Finance Flashcards
 * Route: /flashcards/real-estate-finance
 * Meta title: Real Estate Finance Flashcards Free — AI | Esli (52 chars)
 * Meta description: Generate real estate finance flashcards with AI. Cap rate, NOI, DSCR, IRR, LTV — free, spaced repetition. No signup. (118 chars)
 * Target keywords: real estate finance flashcards, cap rate flashcards, NOI flashcards, mortgage calculations flashcards, real estate investing flashcards
 * Week: 2026-W36
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
      name: 'What real estate finance topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates real estate finance flashcards covering: property valuation (cap rate, NOI, GRM, income approach, sales comparison approach, cost approach, DCF), financing metrics (LTV, DSCR, debt yield, break-even ratio), investment returns (cash-on-cash return, IRR, NPV, equity multiple, modified IRR), mortgage math (amortization, P&I payments, interest-only vs fully amortizing, balloon loans, prepayment penalties), property types and their typical cap rates (multifamily, office, retail, industrial, hospitality), real estate capital structure (senior debt, mezzanine, preferred equity, common equity), development finance (construction loans, land cost, hard costs, soft costs, stabilization), 1031 exchanges and tax basics, and real estate syndication terms (promote, waterfall, preferred return, GP/LP structure). Suitable for real estate finance courses, CFA candidates covering real assets, or self-study investors.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a cap rate and how do I remember it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cap rate (capitalization rate) = NOI / Property Value. It measures the unlevered yield an investor gets from a property — the return if the property were bought all cash with no debt. Memory trick: cap rate is the yield on the asset, not the equity. A $1,000,000 property generating $60,000 NOI has a 6% cap rate. Rearranged: Property Value = NOI / Cap Rate. This is the income approach to valuation — if the market cap rate for similar office buildings is 7%, a building with $70,000 NOI is worth $1,000,000. Key relationships: cap rate and value move in opposite directions (higher cap rate → lower value, like bond prices and yields). In expensive markets (NYC, San Francisco), multifamily cap rates are 3-4%. In secondary markets, cap rates might be 6-8%. Going-in cap rate (purchase cap rate) vs going-out cap rate (exit cap rate at the time of sale) both matter for IRR analysis.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I study real estate finance formulas with flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most effective approach is grouping formulas by decision type. For valuation: NOI = Revenue - Operating Expenses (not debt service), Cap Rate = NOI / Value, Value = NOI / Cap Rate, GRM = Price / Gross Rents. For financing: LTV = Loan Amount / Property Value, DSCR = NOI / Annual Debt Service (lenders typically require 1.20-1.25x minimum), Debt Yield = NOI / Loan Amount. For investor returns: Cash-on-Cash = Annual Pre-Tax Cash Flow / Equity Invested, Equity Multiple = Total Distributions / Equity Invested, IRR = the discount rate that makes NPV = 0. Use Esli to generate cards that pair each formula with: (1) the formula itself, (2) what each input means, (3) a worked numerical example, and (4) the typical benchmark range. That four-part card structure matches how real estate finance exam questions are structured.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best real estate finance flashcard prompts to use with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-value real estate finance prompts: 'Cap rate, NOI, and property value: the three-way relationship with worked examples — include how cap rate compression drives value appreciation', 'DSCR: formula, why lenders care about it, what happens below 1.0x, and how loan sizing works backward from DSCR constraints', 'Cash-on-cash return vs IRR vs equity multiple: what each measures, when to use each, and why they can give conflicting signals for the same deal', 'Amortization math: how to calculate monthly P&I payment, what changes with term length vs interest rate, and how much equity builds in year 1 vs year 10', 'Real estate capital structure: senior debt vs mezz vs preferred equity vs common equity — risk/return profile, typical cost, security interest, and where each sits in the waterfall', 'Development pro forma: the 7 line items from gross revenue to leveraged IRR — what each includes and what can go wrong in each line'.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for real estate finance students and investors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is free with no credit card required. The free plan includes unlimited AI flashcard generation, spaced repetition scheduling, and community decks. Whether you are studying for a real estate finance course, preparing for the CFA real assets questions, getting your real estate license, or self-studying as an investor, you can generate as many finance formula decks as you need. Guest mode lets you start without an account — no email, no signup.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is NOI and how is it different from cash flow?',
    a: 'NOI (Net Operating Income) = Gross Potential Rent - Vacancy & Credit Loss + Other Income - Operating Expenses. Key: NOI does NOT include debt service (mortgage payments), income taxes, depreciation, or capital expenditures. It is the unlevered operating income of the property — what the asset generates before financing. Gross Potential Rent: all rents if 100% occupied at market. Vacancy & Credit Loss: typically 5-10% deducted. Operating Expenses: property taxes, insurance, management fees, maintenance, utilities (landlord-paid), legal/accounting, reserves for replacement. What is NOT in operating expenses: mortgage interest, principal payments, depreciation, CapEx (treated separately). Cash Flow to Equity = NOI - Annual Debt Service (interest + principal). Why distinction matters: lenders underwrite to NOI (DSCR = NOI / Debt Service). Investors value the asset using NOI (Cap Rate = NOI / Value). Two investors with the same property can have very different equity cash flows depending on their financing.',
  },
  {
    q: 'What is DSCR (Debt Service Coverage Ratio)? Why do lenders care so much about it?',
    a: 'DSCR = NOI / Annual Debt Service. Annual Debt Service = total principal + interest payments in a year (on a fully amortizing loan). Example: NOI = $120,000, annual P&I = $96,000 → DSCR = 1.25x. Why lenders care: DSCR measures whether the property generates enough income to cover the loan payments with a cushion. A DSCR of 1.0x means NOI exactly equals debt service — no margin for error. Typical lender minimums: multifamily (agency/Fannie/Freddie): 1.25x; commercial real estate: 1.20-1.30x; construction/value-add: may be underwritten on future stabilized NOI. DSCR below 1.0x = property cannot cover its own debt from operations (negative leverage territory, borrower must inject equity to service the loan). DSCR used for loan sizing: if target DSCR is 1.25x and NOI is $150,000, maximum allowable debt service = $150,000 / 1.25 = $120,000/yr. Convert annual debt service to loan amount using amortization math (given interest rate and term). Debt Yield = NOI / Loan Amount — a lender metric that became more common post-2008 to avoid gaming through long amortization periods.',
  },
  {
    q: 'What is LTV and how does it interact with DSCR in sizing a loan?',
    a: 'LTV (Loan-to-Value) = Loan Amount / Property Value. Typical LTV limits by property type: multifamily (agency): up to 80%; commercial mortgage: 65-75%; construction: 60-70% of total cost (LTC). Two constraints — lenders use BOTH LTV and DSCR, and the loan must satisfy whichever gives the lower loan amount. Example: Property value = $2,000,000. Max LTV of 75% → max loan = $1,500,000. NOI = $120,000, target DSCR of 1.25x, 30-year amortization at 6% interest → max annual debt service = $96,000, which corresponds to a loan of ~$1,340,000 (using amortization tables). DSCR constraint ($1.34M) is binding here, not LTV ($1.5M). The binding constraint depends on interest rates and NOI — in low-rate environments, LTV tends to be binding; in high-rate environments, DSCR binds sooner because the same loan requires larger debt service payments. Why this matters: when interest rates rise, even the same property with the same value will support a smaller loan because DSCR constrains earlier.',
  },
  {
    q: 'What is the difference between cash-on-cash return, equity multiple, and IRR?',
    a: 'Three different lenses on the same investment: Cash-on-Cash (CoC) Return = Annual Pre-Tax Cash Flow / Equity Invested. Measures current yield on equity in a single year. Does not account for appreciation, loan paydown, or holding period. Good for: measuring the "income" component of a deal. Example: $200K equity invested, $16K annual cash flow → 8% CoC. Equity Multiple = Total Distributions to Equity / Equity Invested. Measures total return over the whole hold period (cash flow + sale proceeds + loan paydown). Does not account for the time value of money — 2x in 2 years vs 2x in 10 years look the same. Good for: quickly benchmarking whether a deal "doubles your money." Example: $200K in, $400K out total → 2.0x. IRR (Internal Rate of Return) = the discount rate at which NPV of all cash flows = 0. Accounts for the amount AND timing of all cash flows — accounts for time value of money. Best measure for comparing deals with different hold periods. Good for: portfolio-level comparisons, institutional underwriting. Typical target IRRs: core deals 8-10%, value-add 12-18%, opportunistic 18%+. All three metrics are needed together — a deal can have great CoC but poor IRR (cash-flowing asset held too long) or great IRR but poor CoC (zero cash flow, all-upside exit play).',
  },
  {
    q: 'How does mortgage amortization work? What is the effect of term length vs interest rate?',
    a: 'Amortization = gradually paying off a loan through regular P&I payments, each payment split between interest and principal. Monthly Payment Formula: P&I = Loan × [r(1+r)^n] / [(1+r)^n - 1], where r = monthly interest rate (annual rate / 12), n = number of months. Example: $1,000,000 loan, 6% rate, 30-year term: r = 0.5%, n = 360. Monthly P&I = $5,996. Year 1: ~$59,500 interest, ~$2,400 principal (very back-weighted). Year 25: ~$25,000 interest, ~$47,000 principal (front-loaded toward principal). Effect of rate vs term: Higher rate → higher monthly payment (more expensive per dollar borrowed). Longer term → lower monthly payment BUT more total interest paid AND slower equity buildup. 30-year vs 15-year at same rate: 30-year has lower monthly payment but pays roughly 2x total interest over the life. Interest-only (IO) period: common in commercial real estate. During IO, payment = Loan × (rate/12). No principal reduction. Lower payment, conserves equity cash during lease-up or repositioning. At IO end, payment jumps to amortizing P&I on the same remaining balance.',
  },
  {
    q: 'What is a real estate waterfall and how does the GP/LP structure work?',
    a: 'A waterfall defines the order and priority of distributing cash flow and sale proceeds among investors. Typical structure: GP (General Partner): manages the deal, typically contributes 5-20% of equity. LP (Limited Partners): passive investors, typically contribute 80-95% of equity. Basic waterfall example: Tier 1 — Return of capital: LPs get 100% of distributions until original equity is returned. Tier 2 — Preferred return: LPs get 8% preferred return on invested capital (accrues, compounds if unpaid). Tier 3 — Catch-up: GP gets 50-100% of distributions until GP has received the same preferred return on its invested capital. Tier 4 — Profit split (promote): remaining proceeds split, e.g. 70% LP / 30% GP — the GP\'s "promote" or "carried interest" is the extra share above their capital contribution for managing the deal. Key terms: Preferred return (pref): hurdle rate LPs must receive before GP promotes. Promote: GP\'s disproportionate share above pref — incentivizes GP to generate excess returns. Clawback: provision requiring GP to return promote if later distributions fall short. IRR hurdles: promote can step up at higher IRR thresholds (e.g. 30% GP at 15% IRR, 40% GP if IRR exceeds 20%).',
  },
]

const benefits = [
  {
    title: 'From cap rates to capital structure — every real estate finance concept',
    body: 'Generate targeted decks for any real estate finance topic: valuation metrics (NOI, cap rate, GRM, DCF), lender underwriting (LTV, DSCR, debt yield), investor returns (cash-on-cash, IRR, equity multiple), and deal structure (waterfall, promote, preferred equity). The AI matches depth to your prompt.',
  },
  {
    title: 'Upload a course syllabus, textbook chapter, or deal memorandum as a PDF',
    body: 'Drop a chapter from Geltner or a real estate finance course PDF and get flashcard decks covering every formula, metric, and concept. Turn dense pro forma modeling guides into 15-minute daily review sessions.',
  },
  {
    title: 'Build formula recall before the exam or the interview',
    body: 'Real estate finance interviews and exams test formula recall under pressure — can you compute DSCR in 10 seconds? Spaced repetition builds the automatic recall that lets you recognize the right metric and calculate it quickly, so you can focus on reasoning rather than reconstructing formulas.',
  },
  {
    title: 'Complement your Excel modeling with conceptual understanding',
    body: "Knowing how to build a real estate model in Excel is not the same as understanding what each cell is measuring. Esli's AI-generated cards explain the logic behind each metric — why DSCR matters to a lender, why IRR and equity multiple can conflict — building the intuition that makes you a better analyst and investor.",
  },
]

export default function RealEstateFinanceFlashcardsPage() {
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
                <span className="text-primary-600">Real Estate Finance</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any real estate finance concept — cap rate, NOI, DSCR, IRR, amortization, waterfall structures — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Cap Rate', 'NOI', 'Debt Service Coverage', 'IRR & NPV', 'Amortization', 'LTV', 'Cash-on-Cash Return', 'GP/LP Waterfall'].map((tag) => (
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
                  Generate Real Estate Finance Flashcards Free
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
                Master real estate finance in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From valuation metrics to deal structures — generate, study, and build automatic recall.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your topic or upload a PDF',
                  body: 'Enter "DSCR calculation with worked examples and lender benchmarks", "cap rate vs equity yield vs IRR", or upload a real estate finance course syllabus PDF for decks matched to your exam.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering formulas, worked examples, typical benchmarks, and the economic logic behind each metric — the depth that real estate finance courses and interviews actually test.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules daily 10-minute reviews. The formulas you confuse — like DSCR vs debt yield, or cash-on-cash vs IRR — appear more often until they become automatic.',
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
                Example real estate finance flashcards
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
                Generate Your Real Estate Finance Deck Free
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
                Why real estate finance students and investors choose Esli
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
                Real estate finance flashcard FAQs
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
              Start mastering real estate finance today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any real estate finance concept in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Real Estate Finance Flashcards Free
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
              <a href="/flashcards/real-estate-license" className="hover:text-white transition-colors no-underline">Real Estate License Flashcards</a>
              <a href="/flashcards/economics" className="hover:text-white transition-colors no-underline">Economics Flashcards</a>
              <a href="/flashcards/accounting" className="hover:text-white transition-colors no-underline">Accounting Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
