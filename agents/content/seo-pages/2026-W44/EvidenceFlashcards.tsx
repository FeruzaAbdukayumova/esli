/**
 * SEO Landing Page: Evidence Flashcards
 * Route: /flashcards/evidence
 * Meta title: Evidence Flashcards Free — MBE Hearsay AI | Esli
 * Meta description: Generate MBE evidence flashcards with AI. Hearsay exceptions, FRE rules, privilege — free, spaced repetition. No signup needed.
 * Target keywords: evidence flashcards, MBE evidence flashcards, hearsay exceptions flashcards, FRE flashcards
 * Week: 2026-W44
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
      name: 'Are evidence flashcards on Esli really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free to use. Generate unlimited MBE evidence flashcards with AI, study with spaced repetition, and access all core features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate evidence flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any evidence topic (e.g. "hearsay exceptions", "character evidence FRE 404", "attorney-client privilege") and our AI instantly creates a set of MBE-ready Q&A flashcards. You can also upload a PDF of your outlines and Esli extracts the key rules automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli cover all 23 hearsay exceptions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can generate cards covering every FRE 803, 804, and 807 exception, including prior statements, excited utterances, business records, dying declarations, and the residual exception. The AI structures each card around the exact elements tested on the MBE.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I make evidence flashcards from my outline PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — BarBri, Themis, or your own evidence outline — and Esli\'s AI will parse the content and generate a complete flashcard deck automatically. Great for personalizing cards to your professor\'s emphasis.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Anki for bar exam evidence?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anki requires hours of manual card creation or hunting for pre-made decks that may not match your bar prep course. Esli generates evidence cards from any topic or your own outline in seconds. Both use SM-2 spaced repetition — Esli removes the upfront work.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the 4 elements of the hearsay rule under FRE 801?',
    a: '(1) Out-of-court statement, (2) by a declarant, (3) offered to prove (4) the truth of the matter asserted. All four must be present — if the statement is offered for a non-truth purpose (effect on listener, verbal act, impeachment), it is NOT hearsay.',
  },
  {
    q: 'What are the two requirements for an excited utterance under FRE 803(2)?',
    a: '(1) Startling event or condition, and (2) statement made while declarant was under the stress of excitement from that event. No time limit — courts focus on whether stress had dissipated, not clock time.',
  },
  {
    q: 'Under FRE 803(6), when is a business record admissible?',
    a: '(1) Made at or near the time of the event, (2) by someone with knowledge, (3) in the regular practice of the business, (4) kept in the course of a regularly conducted activity, (5) authenticated by custodian or qualified witness. Excluded if sources indicate lack of trustworthiness.',
  },
  {
    q: 'What is the dying declaration exception (FRE 804(b)(2))?',
    a: 'A statement made by a declarant who believed death was imminent, about the cause or circumstances of their believed impending death. Declarant must be unavailable. In federal court, admissible only in homicide prosecutions and civil cases (not all criminal cases).',
  },
  {
    q: 'What does FRE 404(b) prohibit and what exceptions exist?',
    a: 'Prohibits using prior bad acts to prove character conformity (propensity). Exceptions: MIMIC — Motive, Intent, Mistake/absence of, Identity, Common plan/scheme. Rule 404(a) governs character evidence in criminal cases (victim, defendant, witnesses).',
  },
  {
    q: 'What are the 3 elements of attorney-client privilege?',
    a: '(1) Confidential communication, (2) between attorney and client (or their representatives), (3) made for the purpose of seeking or giving legal advice. Waived by voluntary disclosure to third parties. Crime-fraud exception eliminates privilege if communication furthers a future crime or fraud.',
  },
]

const benefits = [
  { title: 'All 7 MBE subjects covered', body: 'Generate cards for evidence, contracts, torts, con law, civil procedure, real property, and criminal law/procedure — complete MBE prep in one app.' },
  { title: 'Upload your bar prep outlines', body: 'Turn BarBri, Themis, or handwritten outlines into a fully organized flashcard deck. AI extracts the key rules, exceptions, and elements automatically.' },
  { title: 'SM-2 spaced repetition', body: 'The same algorithm as Anki. Cards you miss resurface sooner; cards you know are spaced out. Retain every FRE rule through bar exam day.' },
  { title: 'Study anywhere, no signup needed', body: 'Access your evidence decks on any device. Guest mode means you can start studying before you even create an account.' },
]

export default function EvidenceFlashcardsPage() {
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
                <span className="text-primary-600">Evidence Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any FRE topic and get a complete set of MBE-ready flashcards in seconds. Hearsay exceptions, character evidence, privilege — all 23 exceptions covered. No manual entry, no paywall.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Hearsay Exceptions', 'FRE 404 Character', 'Dying Declaration', 'Business Records', 'Attorney-Client Privilege', 'Impeachment', 'Best Evidence Rule', 'Confrontation Clause'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Evidence Flashcards Free
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
                Evidence prep in 3 simple steps
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
                  title: 'Type your evidence topic',
                  body: 'Enter anything — "hearsay exceptions 803", "FRE 404 propensity rule", "work product doctrine" — or upload your evidence outline PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates MBE-style Q&A cards covering every element, exception, and distinction for that topic — the way bar examiners actually test it.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review cards with the SM-2 algorithm. Cards you miss resurface sooner. Every FRE exception stays in long-term memory through bar exam day.',
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
                Example evidence flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                These are the kinds of cards Esli generates — click any card to flip it.
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
                Generate Your Evidence Deck Free
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
                Why law students choose Esli
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
                Evidence flashcard FAQs
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
              Ready to master evidence?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of bar prep students generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Evidence Flashcards Free
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
              <a href="/flashcards/contracts" className="hover:text-white transition-colors no-underline">Contracts</a>
              <a href="/flashcards/torts" className="hover:text-white transition-colors no-underline">Torts</a>
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
