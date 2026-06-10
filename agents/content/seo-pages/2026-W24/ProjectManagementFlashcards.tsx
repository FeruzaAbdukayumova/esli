/**
 * SEO Landing Page: PMP / Project Management Flashcards
 * Route: /flashcards/project-management
 * Meta title: PMP Flashcards Free — AI Flashcard Generator | Esli
 * Meta description: Generate PMP and project management flashcards with AI. PMBOK 7, Agile, CAPM — type any topic and get cards instantly. Free.
 * Target keywords: PMP flashcards, project management flashcards, CAPM flashcards free, PMBOK flashcards, PMP exam prep flashcards
 * Week: 2026-W24
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
      name: 'Are PMP flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited PMP and project management flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate PMBOK 7 flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "PMBOK 7 performance domains", "PMBOK 7 principles", "Agile hybrid project management", or any specific knowledge area or process group from PMBOK 6 or 7, and Esli generates targeted Q&A cards in seconds. You can also upload your PMBOK guide, Rita Mulcahy PMP Prep, or study notes as a PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli cover Agile and Scrum for the PMP exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The PMP exam is now roughly 50% Agile/hybrid. Generate decks for Scrum ceremonies, sprint planning, Kanban flow metrics, SAFe frameworks, or hybrid project approaches. Just type the topic and Esli generates exam-targeted cards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I make CAPM flashcards with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. CAPM covers PMBOK fundamentals: project lifecycle, integration management, scope, schedule, cost, quality, resource, communication, risk, procurement, and stakeholder management. Type any CAPM topic or upload your study guide and get a complete deck instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many flashcards do I need for the PMP exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most PMP candidates build 300-600 flashcards covering formulas (EVM, CPM, PERT), ITTOs, process groups, knowledge areas, Agile ceremonies, and situational questions. With Esli, you generate targeted topic decks in seconds instead of building them by hand — focus your time on studying, not card-making.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is Earned Value (EV) and how is it calculated?',
    a: 'Earned Value (EV) = % Complete × Budget at Completion (BAC). It represents the budgeted value of work actually performed. EV is used to calculate schedule variance (SV = EV - PV), cost variance (CV = EV - AC), SPI (EV/PV), and CPI (EV/AC).',
  },
  {
    q: 'What is the Critical Path Method (CPM) and what does it determine?',
    a: 'CPM is a schedule network analysis technique that calculates the longest path through the project network — the critical path. Tasks on the critical path have zero float (total float = 0). Any delay to a critical path task delays the project end date by the same amount.',
  },
  {
    q: 'What is a Risk Register and what does it contain?',
    a: 'A Risk Register is a project document that records identified risks and their attributes: risk ID, description, category, probability, impact, risk score, triggers, responses (avoid/transfer/mitigate/accept), owners, and residual/secondary risks. Updated throughout the project lifecycle.',
  },
  {
    q: 'What is the difference between a Sprint and a Kanban board?',
    a: 'A Sprint (Scrum) is a time-boxed iteration (1-4 weeks) with a fixed scope committed at sprint planning — work is "pulled" into the sprint backlog. Kanban uses a continuous flow model with no fixed iterations — work items are pulled as capacity allows, limited by WIP limits on board columns.',
  },
  {
    q: 'Define the Work Breakdown Structure (WBS) and its lowest level.',
    a: 'A WBS is a hierarchical decomposition of the total project scope into work packages. The lowest level is the Work Package — the point at which cost and schedule can be reliably estimated and managed. The WBS captures 100% of scope (100% rule) and only includes deliverables, not activities.',
  },
  {
    q: 'What is the Stakeholder Engagement Assessment Matrix?',
    a: 'A tool that compares current vs. desired engagement levels for each stakeholder across five levels: Unaware, Resistant, Neutral, Supportive, Leading. A "C" marks current level, "D" marks desired. The PM\'s job is to close the gap — move stakeholders from current to desired engagement level.',
  },
]

const benefits = [
  {
    title: 'PMP formulas and ITTOs in seconds',
    body: 'Type "Earned Value formulas", "PERT three-point estimate", or "PMBOK knowledge area ITTOs" and get formula-focused cards with definitions, examples, and exam tips — no manual entry.',
  },
  {
    title: 'Covers both PMBOK 7 and Agile/hybrid',
    body: 'The PMP exam is 50% Agile. Generate separate decks for PMBOK performance domains, Scrum ceremonies, Kanban flow metrics, and SAFe principles — covering every exam domain.',
  },
  {
    title: 'Upload your PMP prep book as a PDF',
    body: 'Turn Rita Mulcahy\'s PMP Exam Prep, the PMBOK Guide, or your own study notes into a complete flashcard deck. AI extracts key definitions, processes, and formulas automatically.',
  },
  {
    title: 'SM-2 spaced repetition for exam day',
    body: 'Formulas and process flows that trip you up — like EVM calculations or PERT variance — resurface at exactly the right time using the same algorithm trusted by Anki users worldwide.',
  },
]

export default function ProjectManagementFlashcardsPage() {
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
                <span className="text-primary-600">PMP Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any project management topic — PMBOK 7, Agile, EVM formulas, risk management, CAPM — and get a complete flashcard deck in seconds. No manual ITTO memorization grind.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  'PMBOK 7 Domains',
                  'Agile & Scrum',
                  'Risk Management',
                  'Earned Value Management',
                  'Stakeholder Management',
                  'CAPM Prep',
                  'Change Management',
                  'Quality Management',
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
                  Generate PMP Flashcards Free
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
                PMP prep in 3 simple steps
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
                  title: 'Type your PM topic',
                  body: 'Enter anything — "Earned Value Management formulas", "PMBOK 7 performance domains", "Scrum ceremonies and artifacts" — or upload your PMBOK guide, Rita Mulcahy prep book, or exam notes as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards covering formulas, definitions, process inputs/outputs, Agile ceremonies, situational exam scenarios, and common calculation examples — tailored to your exact topic.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. EVM calculations, process groups, and Agile distinctions you struggle with resurface at exactly the right time — so nothing slips on exam day.',
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
                Example PMP flashcards
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
                Generate Your PMP Deck Free
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
                Why PMP candidates choose Esli
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
                PMP flashcard FAQs
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
              Ready to pass the PMP?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate a complete PMBOK or Agile study deck in seconds. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate PMP Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also studying IT certs?{' '}
              <a href="/flashcards/aws-certification" className="text-white underline hover:no-underline">
                AWS certification flashcards
              </a>{' '}
              and{' '}
              <a href="/flashcards/comptia-security-plus" className="text-white underline hover:no-underline">
                CompTIA Security+ flashcards
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
