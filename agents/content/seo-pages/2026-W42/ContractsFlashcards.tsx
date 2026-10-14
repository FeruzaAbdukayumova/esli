/**
 * SEO Landing Page: Contracts Flashcards
 * Route: /flashcards/contracts
 * Meta title: Contracts Flashcards Free — MBE Prep AI | Esli
 * Meta description: Generate contracts and MBE flashcards with AI. Offer, acceptance,
 *   consideration, UCC — free, spaced repetition. No signup needed.
 * Target keywords: contracts flashcards, MBE contracts flashcards, contract law flashcards,
 *   offer acceptance consideration flashcards, UCC flashcards, contract formation flashcards,
 *   bar exam contracts, promissory estoppel flashcards
 * Week: 2026-W42
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
      name: 'Are contracts flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited contracts flashcards with AI — offer and acceptance, consideration, UCC Article 2, defenses, remedies, MBE contracts — with spaced repetition included. No credit card or signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What contracts topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any contracts topic: contract formation (offer, acceptance, consideration, capacity), defenses (fraud, misrepresentation, duress, undue influence, impossibility, impracticability, frustration of purpose), UCC vs common law distinctions, promissory estoppel, statute of frauds, conditions, breach, repudiation, remedies (expectation, reliance, restitution, specific performance, liquidated damages), and third-party rights (assignment, delegation, third-party beneficiaries).',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli help with MBE contracts prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any MBE contracts subtopic — "mirror image rule", "mailbox rule", "battle of the forms UCC 2-207", "promissory estoppel elements", "anticipatory repudiation" — and Esli generates cards focused on the tested rule. Upload your bar prep outline or a Contracts treatise PDF and Esli turns it into a targeted deck. Spaced repetition ensures the distinctions that flip MBE answers stick.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between common law and UCC contracts on the MBE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common law governs service contracts and real estate. UCC Article 2 governs contracts for the sale of goods. Key differences: (1) Mirror image rule (common law) vs. Battle of the Forms UCC 2-207 (UCC); (2) Common law requires exact acceptance; UCC permits acceptance with different terms. (3) Common law requires consideration for modification; UCC only requires good faith. (4) UCC has a merchant exception to the statute of frauds. Esli builds cards that drill these distinctions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli for a 1L Contracts course, not just bar prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your casebook notes, professor\'s outline, or syllabus PDF and Esli generates flashcards for the cases and doctrines you need. Type topics like "Hadley v Baxendale foreseeability rule", "Hamer v Sidway consideration", "Lucy v Zehmer objective theory", or "Carlill v Carbolic Smoke Ball offer" and get targeted cards for your 1L Contracts final.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the three essential elements of a valid contract?',
    a: 'Offer: a definite proposal to enter into an agreement, communicated to the offeree. Acceptance: the offeree\'s unequivocal agreement to the exact terms of the offer (mirror image rule under common law). Consideration: each party\'s bargained-for exchange — a legal detriment or benefit. A contract also requires capacity and legality. Without all three, no enforceable contract exists.',
  },
  {
    q: 'What is the mailbox rule and when does it apply?',
    a: 'The mailbox rule: acceptance is effective when dispatched (mailed, emailed, transmitted) — not when received. Applies when acceptance is by a reasonable means of communication. Exceptions: (1) offer specifies receipt as the effective moment; (2) option contracts (acceptance effective on receipt); (3) if the offeree first sends rejection, then acceptance — whichever arrives first controls. Does not apply to revocations, which are effective on receipt.',
  },
  {
    q: 'What is UCC 2-207 (Battle of the Forms)?',
    a: 'Under UCC 2-207, a definite acceptance that adds or changes terms is still a valid acceptance (not a counteroffer). Between merchants, the additional terms automatically become part of the contract unless: (1) the original offer expressly limits acceptance to its terms, (2) the new terms materially alter the deal, or (3) the offeror objects within a reasonable time. Between non-merchants, the additional terms are mere proposals requiring express assent.',
  },
  {
    q: 'What are the elements of promissory estoppel?',
    a: 'Promissory estoppel (Restatement §90): (1) a clear and definite promise; (2) the promisor should reasonably expect the promisee to rely; (3) the promisee does rely to their detriment; (4) injustice can only be avoided by enforcing the promise. Used as a substitute for consideration when no bargained-for exchange exists. Remedy may be limited to reliance damages (not full expectation damages).',
  },
  {
    q: 'What is anticipatory repudiation and what are the non-breaching party\'s options?',
    a: 'Anticipatory repudiation: a clear, unequivocal statement or action by a party before performance is due that they will not perform. The non-breaching party may: (1) treat it as an immediate breach and sue now; (2) wait until the performance date (retraction is possible in the meantime); (3) suspend their own performance and wait. Under UCC, the non-breaching party may also demand adequate assurance of performance in writing.',
  },
  {
    q: 'What is the expectation measure of damages for breach of contract?',
    a: 'Expectation damages put the non-breaching party in the position they would have been in had the contract been performed. Formula: loss in value (what they were promised minus what they got) + consequential damages (foreseeable at time of contracting, per Hadley v Baxendale) + incidental damages - costs avoided - losses avoided. Duty to mitigate: plaintiff cannot recover avoidable losses. Liquidated damages clauses enforced if a reasonable forecast of actual harm.',
  },
]

const benefits = [
  { title: 'MBE contracts distinctions drilled', body: 'The bar tests fine distinctions — common law vs. UCC, mirror image vs. battle of the forms, promissory estoppel vs. consideration. Esli builds cards that isolate exactly what MBE contracts questions test.' },
  { title: 'Upload your bar outline', body: 'Upload your BARBRI, Themis, or Adaptibar contracts outline PDF and Esli extracts the rules, elements, and exceptions into a targeted deck ready for spaced repetition.' },
  { title: 'Perfect for 1L Contracts finals', body: 'Whether you\'re reading Hawkins v McGee for the first time or drilling expectation vs. reliance damages for a 1L final, Esli adapts to any contracts topic you type or upload.' },
  { title: 'Remembers what you\'re forgetting', body: 'SM-2 spaced repetition surfaces the rules you keep missing — UCC merchant exceptions, statute of frauds categories, frustration vs. impossibility — right before you need them.' },
]

export default function ContractsFlashcardsPage() {
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
                <span className="text-primary-600">Contracts Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any contracts topic and get a complete flashcard deck in seconds. Offer and acceptance, UCC vs common law, promissory estoppel, MBE prep — AI-powered with spaced repetition.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Offer & Acceptance', 'Consideration', 'UCC Article 2', 'Battle of the Forms', 'Promissory Estoppel', 'Statute of Frauds', 'Anticipatory Repudiation', 'Expectation Damages'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Contracts Flashcards Free
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
                Bar-ready contracts knowledge in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From contract formation to remedies — faster than re-reading your outline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your contracts topic',
                  body: 'Enter any rule — "mailbox rule", "UCC 2-207 battle of the forms", "promissory estoppel elements", "anticipatory repudiation options" — or upload your bar outline PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds your deck',
                  body: 'Esli generates Q&A cards covering elements, exceptions, leading cases, and the MBE distinctions that separate passing from failing scores.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 algorithm resurfaces the rules you\'re forgetting before exam day. Lock in the distinctions — common law vs. UCC, condition precedent vs. condition subsequent, expectation vs. reliance damages.',
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
                Example contracts flashcards
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
                Generate Your Contracts Deck Free
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
                Why law students choose Esli for contracts
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
                Contracts flashcard FAQs
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
              Ready to master contracts for the bar?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate contracts flashcards with AI — offer and acceptance, UCC, promissory estoppel, remedies — free, with spaced repetition. Build the rules that actually stick.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Contracts Flashcards Free
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
              <a href="/flashcards/bar-exam" className="hover:text-white transition-colors no-underline">Bar Exam Flashcards</a>
              <a href="/flashcards/torts" className="hover:text-white transition-colors no-underline">Torts Flashcards</a>
              <a href="/flashcards/constitutional-law" className="hover:text-white transition-colors no-underline">Constitutional Law</a>
              <a href="/use-case/law-students" className="hover:text-white transition-colors no-underline">Law Students</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
