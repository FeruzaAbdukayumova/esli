/**
 * SEO Landing Page: Real Estate License Exam Flashcards
 * Route: /flashcards/real-estate
 * Meta title: Real Estate License Exam Flashcards Free | Esli AI
 * Meta description: Generate real estate license exam flashcards with AI. Salesperson & broker exam prep, agency law, contracts — free, spaced repetition.
 * Target keywords: real estate license flashcards, real estate exam flashcards free, real estate vocabulary flashcards, real estate salesperson exam prep, real estate broker flashcards
 * Week: 2026-W25
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
      name: 'Are real estate exam flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited real estate license exam flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What real estate topics can I generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic on the salesperson or broker exam: agency law (types of agency, fiduciary duties, dual agency), contract law (elements, contingencies, earnest money), property ownership (fee simple, life estate, easements, liens), fair housing laws (protected classes, prohibited practices), financing (mortgage types, amortization, loan-to-value), appraisal methods (sales comparison, cost, income), real estate math (commission, proration, capitalization rate), and state-specific license law.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my real estate exam prep course materials as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your Kaplan, CompuCram, PrepAgent, or state-specific exam prep materials as a PDF. Esli\'s AI extracts key definitions, legal concepts, formulas, and vocabulary into a complete flashcard deck automatically — so you study from your exact course content, not generic cards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli cover state-specific real estate license content?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "California real estate license law", "Texas real estate exam", "Florida real estate statutes", or any state plus the specific topic you need. Esli generates cards targeting your state\'s license requirements, disclosure laws, and exam content. You can also upload your state-specific study guide as a PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I study real estate math with Esli flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type "real estate math formulas", "commission calculation practice", "proration problems", "capitalization rate formula", or "loan-to-value ratio" and get cards that present the formula, walk through an example calculation, and test you on the steps. Spaced repetition ensures math formulas stay sharp for exam day.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the 7 fiduciary duties a real estate agent owes to a client? (Mnemonic: OLDCAR)',
    a: 'OLDCAR: Obedience (follow lawful instructions), Loyalty (put client\'s interest first), Disclosure (reveal all material facts), Confidentiality (protect client\'s info), Accounting (account for all funds), Reasonable care (use professional competence). These duties apply in full to a client (agency relationship). A customer gets only honesty and disclosure of material facts — not full fiduciary duty.',
  },
  {
    q: 'What is "procuring cause" in real estate? Why does it matter?',
    a: 'Procuring cause is the uninterrupted series of causal events that leads to a transaction. It determines which broker earns the commission when there is a dispute. The broker who initiates and maintains the chain of events leading to a sale is the procuring cause. Key factors: who first introduced the buyer to the property, continuity of effort, and who was instrumental in closing the deal. Used to resolve commission disputes between cooperating brokers.',
  },
  {
    q: 'What are the 4 essential elements of a valid real estate contract?',
    a: '1. Offer and Acceptance (mutual assent / meeting of the minds — parties agree to the same terms). 2. Consideration (something of value exchanged — typically money but can be a promise). 3. Legally competent parties (adults of legal age, sound mind — minors and mentally incapacitated cannot contract). 4. Legal purpose (contract must be for a lawful transaction). Also note: real estate contracts must be in writing (Statute of Frauds) to be enforceable.',
  },
  {
    q: 'Define "earnest money" and what happens to it if the buyer defaults?',
    a: 'Earnest money (also called a good faith deposit) is money a buyer puts down with a purchase offer to show serious intent to buy. It is held in escrow by the broker or escrow company. If the buyer defaults without a valid contract contingency: the seller typically keeps the earnest money as liquidated damages. If the seller defaults: the buyer gets the earnest money back plus may sue for specific performance. Amount is negotiable — typically 1-3% of purchase price.',
  },
  {
    q: 'What is the difference between an easement appurtenant and an easement in gross?',
    a: 'Easement appurtenant: benefits a neighboring parcel. Involves two properties — dominant tenement (land that benefits) and servient tenement (land that carries the burden). Transfers automatically with the land when either property is sold. Example: shared driveway easement. Easement in gross: benefits a person or entity, not a neighboring parcel. No dominant tenement. May or may not transfer. Examples: utility company right-of-way, personal hunting/fishing rights. Commercial easements in gross can be assigned; personal ones generally cannot.',
  },
  {
    q: 'How do you calculate a capitalization rate (cap rate) and what does it tell you?',
    a: 'Cap Rate = Net Operating Income (NOI) / Property Value × 100. Example: NOI = $50,000; Value = $500,000 → Cap Rate = 10%. NOI = gross income minus vacancy/credit loss minus operating expenses (taxes, insurance, maintenance) — does NOT include mortgage payments. What it tells you: the expected annual return assuming all-cash purchase. Higher cap rate = higher yield but typically higher risk. Used to compare income properties and estimate value: Value = NOI / Cap Rate.',
  },
]

const benefits = [
  {
    title: 'Cover every exam topic in seconds',
    body: 'Type "dual agency rules", "fair housing protected classes", "types of deeds", or "mortgage contingency clauses" and get a targeted deck covering exactly what your state exam will test.',
  },
  {
    title: 'Real estate math made systematic',
    body: 'Generate cards that show the formula, walk through a sample calculation, and quiz you on the steps. Commission splits, proration, LTV ratio, cap rates — all covered with worked examples.',
  },
  {
    title: 'Upload your exam prep course as a PDF',
    body: 'Turn your Kaplan, PrepAgent, or state-specific study guide into a complete flashcard deck in minutes. AI extracts vocabulary, legal concepts, and formulas from your exact course materials.',
  },
  {
    title: 'Spaced repetition for exam day confidence',
    body: 'Agency law distinctions, property ownership types, and state license rules that keep slipping resurface at exactly the right interval using SM-2 — so you walk into the exam ready.',
  },
]

export default function RealEstateFlashcardsPage() {
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
                <span className="text-primary-600">Real Estate License Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any topic — agency law, contracts, fair housing, real estate math — and get a complete flashcard deck in seconds. Pass your salesperson or broker exam faster with AI-powered spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  'Agency Law',
                  'Contracts & Agreements',
                  'Property Ownership',
                  'Fair Housing',
                  'Financing & Mortgages',
                  'Valuation & Appraisal',
                  'Real Estate Math',
                  'State License Law',
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
                  Generate Real Estate Flashcards Free
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
                Pass your real estate exam in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From topic to a full exam-ready deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your exam topic',
                  body: 'Enter anything — "fiduciary duties mnemonic OLDCAR", "types of deeds and their differences", "fair housing Act protected classes" — or upload your Kaplan or PrepAgent study guide as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards with definitions, legal distinctions, worked math examples, and mnemonics — the exact format the real estate exam tests you on.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. Agency law distinctions, property types, and state license rules that keep slipping resurface at exactly the right interval so they stick on exam day.',
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
                Example real estate flashcards
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
                Generate Your Real Estate Exam Deck Free
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
                Why real estate students choose Esli
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
                Real estate exam flashcard FAQs
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
              Ready to pass your real estate exam?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate exam-ready flashcards from your own study materials or any topic. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Real Estate Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Studying for other professional exams?{' '}
              <a href="/flashcards/project-management" className="text-white underline hover:no-underline">
                PMP flashcards
              </a>{' '}
              and{' '}
              <a href="/flashcards/comptia-security-plus" className="text-white underline hover:no-underline">
                CompTIA flashcards
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
