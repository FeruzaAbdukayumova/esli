/**
 * SEO Landing Page: AI Flashcards for Professionals (Use-Case)
 * Route: /use-case/professionals
 * Meta title: AI Flashcards for Professionals — Learn at Work Free | Esli (61 chars - 60 limit, trim to:)
 * Meta title: AI Flashcards for Professionals — Free | Esli (49 chars)
 * Meta description: Generate flashcards for professional development with AI. Certifications, skills, compliance training — free, spaced repetition. (131 chars)
 * Target keywords: flashcards for professionals, work skills flashcards, continuing education flashcards, professional development flashcards, certification study app
 * Week: 2026-W30
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
      name: 'How do professionals use Esli for work-related learning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Professionals use Esli in three main ways: 1. Certification prep — upload study guides, PDFs, or official documentation for AWS, PMP, CPA, SHRM, CFA, CompTIA, and similar exams to generate targeted flashcard decks. 2. Onboarding new domains — when starting a new role or project, type the key concepts you need to learn fast and get a structured review deck in minutes. 3. Compliance training — convert compliance documents, policies, and regulatory material into flashcards for retention across a team.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli to study for professional certifications?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Esli is well-suited for professional certification prep across fields: IT (AWS, Azure, GCP, CompTIA Security+, CISSP, PMP), Finance (CFA, CPA, Series 7, CFP), HR (SHRM-CP, PHR), Legal (bar exam, paralegal cert), Healthcare (NCLEX, USMLE, medical coding), Project Management (PMP, Agile/Scrum). Upload official study materials as PDFs or type specific exam domains and get a complete flashcard deck in seconds. The spaced repetition algorithm optimizes your review schedule around your exam date.",
      },
    },
    {
      '@type': 'Question',
      name: "Can I convert my company's internal training documents into flashcards?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Upload any PDF — company policy documents, onboarding materials, compliance training, product documentation, SOPs — and Esli converts them into a structured flashcard deck. This is useful for: accelerating onboarding for new hires, compliance training retention, learning a new product line or technical system, and preparing for an internal assessment or promotion. All processing happens on Esli's servers — no training data is retained.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much time does Esli require for professional development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Spaced repetition is designed for exactly this use case: short, distributed study sessions rather than marathon cramming. Most users study 10-20 minutes per day during commutes, lunch breaks, or between meetings. The SM-2 algorithm calculates the optimal review interval for each card so you only review what you need to review — no time wasted on things you already know. This makes Esli compatible with a full-time work schedule in a way that textbook reading or video courses are not.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for professional development and certification prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes AI flashcard generation, PDF upload, spaced repetition, and browser extension — no credit card required. Guest mode lets you start studying without an account. For heavy users preparing for multiple certifications simultaneously, the Pro plan ($5/mo) removes any generation limits and provides extended study analytics.',
      },
    },
  ],
}

const audienceCards = [
  { role: 'IT / Cloud', examples: ['AWS Certified Solutions Architect', 'Azure Fundamentals', 'CompTIA Security+', 'CISSP', 'Kubernetes (CKA)'] },
  { role: 'Finance', examples: ['CFA Level 1-3', 'CPA exam (FAR, AUD, REG, BEC)', 'Series 7 / Series 63', 'CFP certification', 'Financial modeling'] },
  { role: 'Project Management', examples: ['PMP certification', 'Agile/Scrum fundamentals', 'PRINCE2', 'Six Sigma (DMAIC)', 'OKR frameworks'] },
  { role: 'Healthcare', examples: ['NCLEX-RN / NCLEX-PN', 'USMLE Steps 1-3', 'Medical coding (CPC)', 'HIPAA compliance', 'Drug interaction reference'] },
  { role: 'HR / People Ops', examples: ['SHRM-CP / SHRM-SCP', 'PHR / SPHR', 'Employment law fundamentals', 'Compensation & benefits', 'DEI terminology'] },
  { role: 'Legal', examples: ['Bar exam (MBE, MEE, MPT)', 'Paralegal certification', 'Contract law fundamentals', 'Compliance regulations', 'Intellectual property basics'] },
]

const painPoints = [
  {
    problem: 'No time to study after work',
    solution: '10 minutes of spaced repetition during your commute beats 2 hours of passive reading on a Sunday. The algorithm does the scheduling — you just show up.',
  },
  {
    problem: 'Certification books are 600+ pages',
    solution: 'Upload the PDF. Esli extracts the exam-relevant content into focused flashcards. You study what matters, not what the publisher needed to fill pages.',
  },
  {
    problem: 'You read it once and forget it by next week',
    solution: 'Spaced repetition means you see each concept at the exact moment before you would have forgotten it. Long-term retention instead of short-term review cram.',
  },
  {
    problem: 'New role, new domain — too much to absorb',
    solution: 'Type the key concepts of your new domain into Esli and get a structured deck in minutes. Onboard faster than reading everything from scratch.',
  },
]

export default function AIFlashcardsForProfessionalsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
                AI Flashcards for Working Professionals
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                The Fastest Way to{' '}
                <span className="text-primary-600">Learn at Work</span>{' '}
                — Without the Time
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Generate AI flashcards from any certification guide, policy document, or professional topic. 10 minutes a day builds retention that a 600-page textbook can not.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Certification Prep', 'Compliance Training', 'Domain Onboarding', 'Skills Development', 'PDF Upload', 'Spaced Repetition'].map((tag) => (
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
                  Generate Your First Deck Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#certifications"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Certification Types
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-20 sm:py-28 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                The professional learning problem
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                You need to keep learning. You have no time. Esli fixes the math.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {painPoints.map((p, i) => (
                <div key={i} className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                  <p className="text-sm font-medium text-rose-400 mb-2">Problem</p>
                  <p className="text-base font-semibold text-white mb-4">{p.problem}</p>
                  <p className="text-sm font-medium text-primary-400 mb-2">Esli solution</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{p.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                From document to flashcard in 3 steps
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type a topic or upload a PDF',
                  body: 'Type any professional topic or upload your certification study guide, compliance doc, or training material as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli extracts the key concepts, definitions, and exam-relevant content into a focused flashcard deck — no manual card writing.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: '10 min/day builds retention',
                  body: 'The SM-2 algorithm shows you each card at the optimal interval. Study during your commute, lunch break, or between meetings.',
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

        {/* Certifications Grid */}
        <section id="certifications" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Certifications professionals study with Esli
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {audienceCards.map((aud, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
                  <h3 className="text-base font-bold text-slate-900 mb-3">{aud.role}</h3>
                  <ul className="space-y-1">
                    {aud.examples.map((ex, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check size={13} className="text-primary-500 shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
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
                Professional learning FAQs
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
              Start learning smarter at work
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards from any professional material in seconds. Free forever — no credit card required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Your First Deck Free
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
              <a href="/flashcards/aws-certification" className="hover:text-white transition-colors no-underline">AWS Flashcards</a>
              <a href="/use-case/medical-students" className="hover:text-white transition-colors no-underline">Medical Students</a>
              <a href="/use-case/self-study" className="hover:text-white transition-colors no-underline">Self-Study</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
