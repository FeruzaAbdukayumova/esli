/**
 * SEO Landing Page: AI Flashcards for Medical Residents
 * Route: /use-case/medical-residents
 * Meta title: AI Flashcards for Medical Residents — Free | Esli (52 chars)
 * Meta description: Build clinical flashcard decks fast during rotations. AI generates cards from topic or PDF. Free, spaced repetition, no signup needed. (136 chars)
 * Target keywords: flashcards for medical residents, clinical rotation flashcards, attending rounds prep AI, residency flashcards free, USMLE Step 3 flashcards AI
 * Week: 2026-W26
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, Clock, BookOpen, Stethoscope, Target } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can residents use Esli during rotations when time is limited?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli is built for short windows of time. After a clinical encounter, type the condition you just saw — "Duke criteria infective endocarditis" or "hepatic encephalopathy management" — and get a review deck in 30 seconds. Study on your phone during call, between cases, or on the commute. The SM-2 algorithm means even 5 minutes of spaced review is more effective than 30 minutes of passive reading.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I generate flashcards from UpToDate or clinical guidelines PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — clinical practice guidelines, UpToDate printouts, society recommendations, or your own notes from didactics — and Esli extracts the key criteria, management algorithms, diagnostic workups, and drug dosages into a study-ready flashcard deck. This is especially useful for rare conditions you encounter once on rotation and need to remember for boards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli help with USMLE Step 3 or specialty board preparation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Residents preparing for Step 3, ABIM, ABFM, or other specialty boards use Esli to maintain an ongoing review practice during training. Generate decks for high-yield Step 3 topics — CCS management algorithms, preventive medicine guidelines, ethics cases — or drill specialty board content alongside your clinical work. Continuous spaced repetition is far more effective than a last-minute cram.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for residents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free — no credit card, no subscription, no institutional license needed. Individual residents can sign up and generate unlimited clinical flashcard decks at no cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli compare to Anki for residency study?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anki is powerful but requires significant time investment to create cards — formatting, tagging, building decks from scratch — time residents simply don\'t have. Esli generates a complete, structured deck from any topic in seconds. Both use spaced repetition; Esli removes the hours of card-creation work that make consistent Anki use difficult during residency. Many residents use Esli for new clinical content and keep existing Anki decks for board topics already built.',
      },
    },
  ],
}

const painPoints = [
  {
    icon: Clock,
    problem: '80-hour weeks leave almost no time for dedicated study',
    solution: 'Generate a deck in 30 seconds and study in 5-minute micro-sessions — on your phone, between cases, on call.',
  },
  {
    icon: Stethoscope,
    problem: 'You see a rare condition once, then forget the details by boards',
    solution: 'Type the condition right after the encounter. AI generates clinical pearls, diagnostic criteria, and management cards. Spaced repetition resurfaces them at the right time.',
  },
  {
    icon: BookOpen,
    problem: 'Pre-made decks don\'t match what you actually saw in clinic today',
    solution: 'Generate custom decks from your exact clinical encounter or the guideline your attending mentioned — not a deck built for med students.',
  },
  {
    icon: Target,
    problem: 'Specialty board prep gets pushed back until a few months before the exam',
    solution: 'Build a running board deck throughout residency. 10 minutes of spaced repetition per week compounds — by exam time, most of the work is done.',
  },
]

const examplePrompts = [
  '"Duke criteria major and minor for infective endocarditis"',
  '"Hepatic encephalopathy: precipitants, grading, and management"',
  '"ABCDE staging criteria for melanoma with survival rates"',
  '"Pediatric fever workup by age: neonate vs 1-3 months vs >3 months"',
  '"Thyroid storm vs myxedema coma: presentation and management"',
  '"DKA vs HHS: key differences in diagnosis and management"',
  '"Wells score DVT criteria with pretest probability"',
  '"Antidotes: acetaminophen, TCA, organophosphate, iron"',
  '"Renal tubular acidosis types 1, 2, 4 — distinguishing features"',
]

export default function AIFlashcardsMedicalResidentsPage() {
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
                Free AI Flashcard Generator
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                AI Flashcards for{' '}
                <span className="text-primary-600">Medical Residents</span>{' '}
                — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Generate a clinical flashcard deck from any condition, guideline, or PDF in 30 seconds. Study in the micro-windows residency actually gives you — between cases, on call, on the bus. Free, with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Internal Medicine', 'Surgery', 'Pediatrics', 'OB-GYN', 'Psychiatry', 'Emergency Medicine', 'Family Medicine', 'Step 3 Prep'].map((tag) => (
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
                  Generate Clinical Flashcards Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#example-prompts"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Example Topics
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
                Residency makes self-study hard. Esli makes it fast.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {painPoints.map((p, i) => (
                <div key={i} className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-600/20 rounded-xl flex items-center justify-center shrink-0">
                      <p.icon size={20} className="text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-2 leading-relaxed">{p.problem}</p>
                      <div className="flex items-start gap-2">
                        <Check size={14} className="text-primary-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-200 leading-relaxed">{p.solution}</p>
                      </div>
                    </div>
                  </div>
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
                Clinical review in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From clinical encounter to spaced review deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type the condition or upload the guideline',
                  body: 'Enter a clinical topic right after a case — or upload a guidelines PDF, UpToDate printout, or didactics handout.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates clinical flashcards',
                  body: 'Esli creates cards covering diagnostic criteria, management algorithms, key pearls, and drug choices — structured for fast recall.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study in 5-minute micro-sessions',
                  body: 'Spaced repetition resurfaces the rare conditions and guidelines before boards, not just the morning after you saw the case.',
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

        {/* Example Prompts */}
        <section id="example-prompts" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                What residents type into Esli
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Examples of high-yield clinical topics — just type these and get a deck in seconds.
              </p>
            </div>
            <div className="space-y-2">
              {examplePrompts.map((prompt, i) => (
                <div key={i} className="px-5 py-3 bg-white rounded-xl border border-slate-200 font-mono text-sm text-slate-700">
                  {prompt}
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Generate Your Clinical Deck Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                FAQs for medical residents
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
              Stay sharp through residency
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate clinical flashcard decks from any topic or guideline PDF. Free forever — no credit card needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Clinical Flashcards Free
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
              <a href="/use-case/medical-students" className="hover:text-white transition-colors no-underline">AI for Med Students</a>
              <a href="/flashcards/mcat" className="hover:text-white transition-colors no-underline">MCAT Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
