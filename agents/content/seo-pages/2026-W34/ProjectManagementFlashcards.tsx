/**
 * SEO Landing Page: Project Management Flashcards
 * Route: /flashcards/project-management
 * Meta title: Project Management Flashcards Free — AI | Esli
 * Meta description: Generate project management flashcards with AI. Agile, Scrum, Kanban, Waterfall, PMBOK — free, spaced repetition. No signup needed.
 * Target keywords: project management flashcards, Agile flashcards, Scrum flashcards,
 *   Kanban flashcards, PMBOK flashcards, project management study cards, intro project management
 * Week: 2026-W34
 * Note: Distinct from W24 PMP certification page. Covers intro/business-school PM, not the PMP exam.
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
        text: 'Yes. Esli is completely free. Generate unlimited project management flashcards with AI and study with spaced repetition — no credit card, no signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What project management frameworks can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli covers all major frameworks: Agile (values, principles, ceremonies), Scrum (roles, events, artifacts), Kanban (WIP limits, flow metrics), Waterfall (phases, gates), SAFe (scaled Agile), PRINCE2, and PMBOK knowledge areas. Just type the framework or specific concept.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from the PMP exam flashcard page?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The PMP exam page targets people studying for the PMI certification exam. This page covers project management as a subject — for business school courses, CS programs, intro PM courses, and professionals who want to learn frameworks without sitting for a certification.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate flashcards for comparing Agile vs. Waterfall?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "Agile vs Waterfall comparison flashcards" and Esli generates cards that contrast methodology philosophy, planning approach, team structure, change tolerance, and best use cases. Comparison cards are especially useful for business school exams that ask you to choose the right method for a given scenario.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I make flashcards from a PM textbook or course PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — Larson & Gray\'s Project Management textbook, your MBA course slides, a Scrum guide PDF — and Esli extracts key terms, processes, and frameworks into study-ready flashcards automatically.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the four values in the Agile Manifesto?',
    a: '1. Individuals and interactions over processes and tools. 2. Working software over comprehensive documentation. 3. Customer collaboration over contract negotiation. 4. Responding to change over following a plan. Note: the right-hand values still matter — the left-hand values are weighted more heavily.',
  },
  {
    q: 'What are the three Scrum roles, and what is each responsible for?',
    a: 'Product Owner: maximizes product value, manages and prioritizes the product backlog, represents stakeholders. Scrum Master: servant-leader, removes impediments, coaches the team on Scrum, facilitates events. Development Team: self-organizing, cross-functional, delivers potentially shippable increments. No sub-roles or hierarchies within the team.',
  },
  {
    q: 'Define "WIP limit" in Kanban. Why does it improve flow?',
    a: 'WIP (Work In Progress) limit: a cap on how many work items can be in any given stage simultaneously. Enforces focus, exposes bottlenecks (if downstream is blocked, upstream stops rather than piling up), and reduces context switching. Little\'s Law: Lead Time = WIP / Throughput — reducing WIP reduces lead time for the same throughput.',
  },
  {
    q: 'What are the five phases of the Waterfall methodology?',
    a: '1. Requirements — gather and document all requirements upfront. 2. Design — system and software architecture. 3. Implementation — coding/development. 4. Verification (Testing) — QA against requirements. 5. Maintenance — post-deployment support. Each phase must be completed before the next begins. Best for: stable, well-defined requirements; worst for: changing or unclear requirements.',
  },
  {
    q: 'What is a Sprint Retrospective and when does it occur?',
    a: 'Scrum ceremony at the end of each Sprint (after Sprint Review). The team inspects: What went well? What could improve? What actions will we commit to? Time-boxed to 3 hours for a 1-month Sprint (proportionally shorter for shorter Sprints). Output: actionable improvements to the team\'s process for the next Sprint. Distinct from Sprint Review (which inspects the product).',
  },
  {
    q: 'What is a Critical Path in project management and why does it matter?',
    a: 'The longest sequence of dependent tasks in a project — the minimum time to complete the project. Any delay to a critical path task delays the entire project. Tasks not on the critical path have "float" (slack) — they can be delayed without affecting the project end date. CPM (Critical Path Method) uses network diagrams (AOA or AON) to identify it. Essential for: resource allocation, scheduling, risk prioritization.',
  },
]

const benefits = [
  {
    title: 'Covers Agile, Scrum, Kanban, Waterfall, and more',
    body: 'Type any framework, methodology, or PM concept and AI generates targeted cards — no need to create a separate deck for each method.',
  },
  {
    title: 'Comparison cards for methodology choices',
    body: 'Business school exams often ask "which methodology fits this scenario?" Esli generates comparison cards that sharpen that decision-making.',
  },
  {
    title: 'Upload your course slides or textbook chapter',
    body: 'Turn Larson & Gray, your MBA case readings, or a Scrum guide PDF into a complete flashcard deck automatically — no manual entry.',
  },
  {
    title: 'Spaced repetition for terminology-heavy exams',
    body: 'PM frameworks use precise terminology (artifacts, ceremonies, WIP, velocity). SM-2 ensures these definitions are automatic before your midterm.',
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
                <span className="text-primary-600">Project Management Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any PM topic — Agile, Scrum, Kanban, Waterfall, or PMBOK — and get a complete flashcard deck in seconds. Spaced repetition included. No signup needed.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Agile Values', 'Scrum Roles', 'Kanban WIP Limits', 'Waterfall Phases', 'Sprint Ceremonies', 'Critical Path', 'Earned Value', 'SAFe Framework'].map((tag) => (
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
                  Generate PM Flashcards Free
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
                Master PM frameworks in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From any topic or PDF to a complete study deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your PM topic',
                  body: 'Enter "Scrum ceremonies and artifacts", "Agile vs Waterfall comparison", "earned value management formulas" — or upload your course slides or textbook chapter PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'AI creates definition cards, comparison cards, and scenario-based cards — matching the types of questions on business school midterms and PM certification exams.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 algorithm resurfaces tricky concepts at optimal intervals. Agile terminology becomes second nature before your exam.',
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
                  className="relative h-52 cursor-pointer [perspective:1200px]"
                  onClick={() => setFlippedCard(flippedCard === i ? null : i)}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flippedCard === i ? '[transform:rotateY(180deg)]' : ''}`}
                  >
                    <div className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden]">
                      <p className="text-xs text-slate-400 mb-2">Question</p>
                      <p className="text-sm font-medium text-slate-800 text-center leading-relaxed">{card.q}</p>
                      <p className="absolute bottom-3 right-4 text-xs text-slate-300">tap to flip</p>
                    </div>
                    <div className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-xs text-primary-500 mb-2">Answer</p>
                      <p className="text-sm text-slate-700 text-center leading-relaxed">{card.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Generate Your PM Flashcard Deck
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
                Why students use Esli for project management
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Check className="text-primary-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{b.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-slate-200">
              {faqSchema.mainEntity.map((item, i) => (
                <div key={i}>
                  <button
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-slate-900">{item.name}</span>
                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="pb-5 text-slate-600 leading-relaxed">{item.acceptedAnswer.text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start mastering project management today
            </h2>
            <p className="text-lg text-primary-100 mb-10">
              Generate your first PM flashcard deck in under a minute — free, no account needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-700 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Project Management Flashcards Free
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-slate-500 mb-6">Related study tools</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'PMP Exam Flashcards', href: '/flashcards/pmp-exam' },
                { label: 'Economics Flashcards', href: '/flashcards/economics' },
                { label: 'Business English Flashcards', href: '/flashcards/business-english' },
                { label: 'AI Flashcards for Professionals', href: '/use-case/professionals' },
                { label: 'CompTIA Security+ Flashcards', href: '/flashcards/comptia-security-plus' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-primary-300 hover:text-primary-700 transition-colors no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a href="https://esli.app" className="flex items-center gap-2 no-underline">
              <div className="w-7 h-7 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">E</span>
              </div>
              <span className="text-lg font-bold text-slate-900">Esli</span>
            </a>
            <p className="text-sm text-slate-400">Free AI flashcard generator with spaced repetition.</p>
            <div className="flex gap-6">
              <a href="https://esli.app" className="text-sm text-slate-500 hover:text-slate-800 no-underline">Home</a>
              <a href={`${APP_URL}/register`} className="text-sm text-slate-500 hover:text-slate-800 no-underline">Get Started</a>
              <a href="https://esli.app/pricing" className="text-sm text-slate-500 hover:text-slate-800 no-underline">Pricing</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
