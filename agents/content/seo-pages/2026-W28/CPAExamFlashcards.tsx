/**
 * SEO Landing Page: CPA Exam Flashcards
 * Route: /flashcards/cpa-exam
 * Meta title: CPA Exam Flashcards Free — AI Study Tool | Esli (52 chars)
 * Meta description: Generate CPA exam flashcards with AI. FAR, AUD, REG, BAR — GAAP, audit standards, tax law. Free, spaced repetition, no signup. (132 chars)
 * Target keywords: CPA exam flashcards, CPA study flashcards free, FAR CPA flashcards, CPA review flashcards, AUD CPA flashcards
 * Week: 2026-W28
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
      name: 'Can I generate flashcards for all four CPA exam sections?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Specify the section and topic in your prompt: "FAR: revenue recognition under ASC 606", "AUD: types of audit opinions", "REG: individual tax brackets and deductions", "BAR: business analysis ratios and financial modeling." Esli generates cards tailored to AICPA Blueprint content areas for each section.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload Becker CPA or Wiley CPA study materials as PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Upload any PDF — Becker, Wiley, Roger, or your own notes — and Esli extracts the key concepts, rules, and mnemonics into flashcard decks. This works for individual chapters, practice problem explanations, or professor handouts. The AI handles dense accounting and legal text well.",
      },
    },
    {
      '@type': 'Question',
      name: 'How should I organize my CPA flashcard decks on Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Create one deck per section (FAR, AUD, REG, BAR) and within each section generate decks per topic area — e.g. "FAR: Governmental Accounting", "FAR: Leases ASC 842", "AUD: Sampling and Evidence." This lets you focus review on weak areas without mixing sections. Spaced repetition handles scheduling across all your decks automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli good for FAR, which has the most content?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FAR is ideal for Esli because the volume of content — GAAP standards, governmental accounting, not-for-profit, foreign currency, leases, derivatives — is too large to retain without spaced repetition. Generate a deck per FAR topic area as you study each one. The SM-2 algorithm keeps older topics fresh while you add new ones.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does spaced repetition help with CPA exam prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The CPA exam tests retention across months of study. Spaced repetition (SM-2 algorithm) resurfaces cards at scientifically optimized intervals — concepts you know get spaced out; ones you struggle with come back sooner. Studies show SRS produces 200-400% better long-term retention than re-reading notes. For CPA candidates studying 300-400 hours, this efficiency compounds significantly.",
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'Explain the 5-step revenue recognition model under ASC 606.',
    a: '1. Identify the contract with the customer. 2. Identify the performance obligations in the contract. 3. Determine the transaction price. 4. Allocate the transaction price to performance obligations. 5. Recognize revenue when (or as) each performance obligation is satisfied. Replaces legacy industry-specific guidance with a single framework.',
  },
  {
    q: 'What are the four required financial statements under GAAP for a public company?',
    a: '1. Income Statement (revenues, expenses, net income). 2. Balance Sheet / Statement of Financial Position (assets = liabilities + equity). 3. Statement of Cash Flows (operating, investing, financing activities). 4. Statement of Stockholders\' Equity (retained earnings, APIC, common stock changes). Notes to financial statements are also required.',
  },
  {
    q: 'What is the difference between a qualified and an adverse audit opinion?',
    a: 'Qualified ("except for"): Financial statements are fairly presented except for a specific material misstatement or scope limitation. Adverse: Financial statements are NOT fairly presented — misstatement is so material and pervasive that an "except for" qualification is not sufficient. Adverse is the most severe negative opinion; it means the FS cannot be relied upon.',
  },
  {
    q: 'How are operating, investing, and financing activities classified on the cash flow statement?',
    a: 'Operating: cash from core business operations (net income + adjustments for non-cash items + working capital changes). Investing: cash from buying/selling long-term assets (PP&E, investments, acquisitions). Financing: cash from debt and equity transactions (issuing stock, borrowing, repaying loans, paying dividends). Net change in all three = change in cash balance.',
  },
  {
    q: 'What is the going concern principle? What is the auditor\'s responsibility?',
    a: 'Going concern assumes the entity will continue operating indefinitely — it underlies historical cost and accrual accounting. Auditors must evaluate whether substantial doubt exists about going concern for at least 12 months after the financial statement date. If substantial doubt exists, they must assess whether management\'s plans alleviate it and disclose accordingly (or modify the opinion).',
  },
  {
    q: 'What is accumulated depreciation and where does it appear on the balance sheet?',
    a: 'A contra-asset account that records the total depreciation expense recognized since the asset\'s acquisition date. Shown on the balance sheet as a deduction from the gross asset cost. Book value (carrying value) = cost - accumulated depreciation. Accumulated depreciation increases each period by the periodic depreciation expense; it never decreases unless the asset is disposed of.',
  },
]

const benefits = [
  {
    title: 'All four CPA sections: FAR, AUD, REG, BAR',
    body: 'Generate targeted decks per section and topic area. Specify the exact AICPA Blueprint area in your prompt for cards that align with what the exam actually tests.',
  },
  {
    title: 'Upload Becker, Wiley, or any review material',
    body: 'Turn your CPA review PDFs into flashcard decks in seconds. Upload a chapter, a set of practice problem explanations, or your own handwritten notes scanned to PDF.',
  },
  {
    title: 'GAAP vs IFRS side-by-side',
    body: 'Generate comparison cards for key GAAP/IFRS differences tested on FAR — inventory methods, R&D costs, investment property, impairment — so you never confuse the two frameworks.',
  },
  {
    title: 'Study in short bursts around your work schedule',
    body: 'Most CPA candidates study while working full-time. Esli\'s 10-min daily review keeps material fresh without marathon sessions. Spaced repetition handles the long-term schedule automatically.',
  },
]

export default function CPAExamFlashcardsPage() {
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
                <span className="text-primary-600">CPA Exam</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any CPA topic — FAR revenue recognition, AUD audit opinions, REG tax law, BAR financial analysis — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['FAR', 'AUD', 'REG', 'BAR', 'GAAP', 'IFRS', 'Audit Standards', 'Tax Law'].map((tag) => (
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
                  Generate CPA Flashcards Free
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
                Study smarter for the CPA in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Turn 300+ hours of review material into a retention system that actually works.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your CPA topic',
                  body: 'Enter "FAR: governmental accounting fund types", "AUD: risk assessment procedures", "REG: partnership basis rules", or upload a Becker or Wiley chapter PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering definitions, rules, standards, and key distinctions — aligned with the AICPA Blueprint topics for your section.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm resurfaces material at optimal intervals across months of study — keeping older FAR topics fresh while you work through new ones.',
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
                Example CPA exam flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Click any card to flip it and see the answer.
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
                Generate Your CPA Deck Free
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
                Why CPA candidates choose Esli
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
                CPA flashcard FAQs
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
              Start passing the CPA faster
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any CPA section in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate CPA Flashcards Free
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
              <a href="/flashcards/aws-certification" className="hover:text-white transition-colors no-underline">AWS Certification Flashcards</a>
              <a href="/flashcards/bar-exam" className="hover:text-white transition-colors no-underline">Bar Exam Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
