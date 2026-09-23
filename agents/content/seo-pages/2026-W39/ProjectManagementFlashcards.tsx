/**
 * SEO Landing Page: Project Management Flashcards
 * Route: /flashcards/project-management
 * Meta title: Project Management Flashcards Free — AI | Esli (51 chars)
 * Meta description: Generate PMP, agile, and scrum flashcards with AI. PMP, PMI-ACP, agile certifications — free, spaced repetition. No signup needed. (132 chars)
 * Target keywords: project management flashcards, PMP flashcards, agile flashcards, scrum flashcards, PMI-ACP flashcards, PMP study cards free
 * Week: 2026-W39
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
      name: 'Are project management flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. You can generate unlimited project management flashcards with AI, study with spaced repetition, and use all core features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate PMP exam flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "PMP exam knowledge areas", "PMBOK 7 performance domains", "PMP agile hybrid", or any PMP topic and Esli generates cards targeted to that exam. You can also upload the PMBOK Guide or your PMP prep book as a PDF and get a complete deck automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli cover agile and scrum terminology for the PMI-ACP or CSM exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type any agile framework — "Scrum ceremonies and artifacts", "Kanban WIP limits", "SAFe PI planning", "XP practices", "PMI-ACP agile manifesto principles" — and Esli generates targeted cards. Upload your study guide PDF for a comprehensive deck.',
      },
    },
    {
      '@type': 'Question',
      name: 'What project management topics beyond PMP can Esli cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic you need — CAPM, PRINCE2, ITIL, Six Sigma (DMAIC), Lean principles, OKRs, change management (ADKAR), risk management, earned value management, stakeholder management, and more. Type the topic or upload a study guide.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many PMP flashcards do I need to pass the exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The PMP exam has 180 questions covering predictive (waterfall) and agile/hybrid approaches. You'll want to deeply know: the PMBOK 7 performance domains and principles, ITTOs for key processes, agile/scrum roles and ceremonies, earned value formulas, risk and stakeholder management concepts. Esli can generate targeted decks for each area — most candidates study 500-1,000 cards total across all domains.",
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the 7 PMBOK 7th Edition Project Performance Domains?',
    a: "1. Stakeholders — engage and manage expectations. 2. Team — high-performing culture. 3. Development Approach & Life Cycle — predictive, agile, or hybrid. 4. Planning — iterative and adaptive. 5. Project Work — manage physical resources, procurement. 6. Delivery — provide value. 7. Measurement — evaluate performance. 8. Uncertainty — risk, ambiguity. (Note: PMI lists 8 domains in PMBOK 7.)",
  },
  {
    q: 'Define the 5 Scrum ceremonies.',
    a: '1. Sprint Planning — define Sprint Goal and backlog items (2h per Sprint week). 2. Daily Scrum — 15-min daily sync on progress and blockers. 3. Sprint Review — demo Done work to stakeholders. 4. Sprint Retrospective — inspect and improve team process. 5. Backlog Refinement — clarify and estimate upcoming items (not a formal ceremony but standard practice).',
  },
  {
    q: 'What is Earned Value (EV)? How is SPI calculated?',
    a: 'EV (Earned Value) = % work complete × Budget at Completion (BAC). Measures the value of work actually done. SPI (Schedule Performance Index) = EV / PV. SPI > 1 = ahead of schedule; SPI < 1 = behind. CPI (Cost Performance Index) = EV / AC. CPI > 1 = under budget; CPI < 1 = over budget.',
  },
  {
    q: 'What is a Risk Register? What are its key components?',
    a: 'Risk Register: document that records identified risks and response plans. Key components: Risk ID, description, category, probability (P), impact (I), risk score (P×I), response strategy (avoid/transfer/mitigate/accept), risk owner, trigger conditions, residual risk, contingency plan. Updated throughout the project life cycle.',
  },
  {
    q: 'Explain the ADKAR change management model.',
    a: 'ADKAR (Prosci): framework for individual change. A = Awareness (why change is needed). D = Desire (motivation to support change). K = Knowledge (how to change). A = Ability (skills and behaviors to implement change). R = Reinforcement (sustaining the change). Used to diagnose change resistance — identify which element is missing for each person.',
  },
  {
    q: 'What is the difference between a project, program, and portfolio?',
    a: 'Project: temporary endeavor with a unique outcome, defined start/end. Program: group of related projects managed together for benefits not achievable individually. Portfolio: collection of projects, programs, and operations managed to achieve strategic objectives. Project manager → Program manager → Portfolio manager (increasing strategic scope and complexity).',
  },
]

const benefits = [
  { title: 'PMP, PMI-ACP, CAPM, and more', body: 'Type any certification topic or upload your official study guide PDF. AI generates cards for PMBOK, agile frameworks, EVM formulas, and every domain the exam covers.' },
  { title: 'Formulas and ITTOs handled', body: 'Earned value formulas, ITTO (Inputs, Tools, Techniques, Outputs) for each knowledge area — Esli generates cards with the formula, what each variable means, and how to apply it.' },
  { title: 'SM-2 spaced repetition', body: 'The same algorithm as Anki. Cards you struggle with resurface sooner. PMP vocabulary and agile principles become automatic before exam day.' },
  { title: 'No signup required', body: 'Start generating project management flashcards in seconds. No account needed. No credit card. Free forever for core features.' },
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
                <span className="text-primary-600">Project Management Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any PMP, agile, or scrum topic or upload your study guide and get a complete flashcard deck in seconds. PMBOK formulas, Scrum ceremonies, earned value — all AI-generated, studied with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['PMP Exam', 'Agile & Scrum', 'PMI-ACP', 'CAPM', 'Earned Value', 'Risk Management', 'PRINCE2', 'Kanban & SAFe'].map((tag) => (
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
                PMP and agile flashcards in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a complete certification deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your PM topic',
                  body: 'Enter anything — "PMP knowledge areas", "Scrum roles and responsibilities", "earned value formulas" — or upload a PDF of your PMBOK guide, agile study guide, or course notes.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A flashcards covering definitions, processes, formulas, and exam-style scenarios for that topic — accurate to the current certification exam content.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review cards with the SM-2 algorithm. PMP vocabulary and agile frameworks you struggle with resurface sooner, building the fluency the exam requires.',
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
                Example project management flashcards
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
                Why PM professionals choose Esli
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
                Project management flashcard FAQs
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

        {/* CTA */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to pass your PM certification?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for PMP, agile, scrum, earned value — any topic — in seconds. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Project Management Flashcards Free
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
              <a href="/use-case/professionals" className="hover:text-white transition-colors no-underline">For Professionals</a>
              <a href="/flashcards/aws-certification" className="hover:text-white transition-colors no-underline">AWS Certification</a>
              <a href="/use-case/ai-flashcard-generator" className="hover:text-white transition-colors no-underline">AI Generator</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
