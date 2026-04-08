/**
 * SEO Landing Page: AI Flashcards for Medical Students
 * Route: /use-case/medical-students
 * Meta title: AI Flashcards for Medical Students — Free | Esli
 * Meta description: Esli generates medical flashcards instantly from any topic or PDF. USMLE,
 *   MCAT, anatomy, pharmacology — study smarter with AI + spaced repetition. Free forever.
 * Target keywords: AI flashcards medical students, USMLE flashcards AI, medical school
 *   flashcards, MCAT flashcards AI, anatomy flashcards free, pharmacology flashcards
 * Week: 2026-W15
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, FileText } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can Esli generate USMLE Step 1 flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type any USMLE Step 1 topic — "cardiac pharmacology", "renal pathophysiology", "First Aid biochemistry chapter" — and Esli\'s AI generates a high-yield flashcard deck. You can also upload your First Aid PDF pages directly and Esli will extract the key facts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I make flashcards from my medical lecture PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload any PDF to Esli — lecture slides, Harrison\'s chapters, Robbins pathology notes, UWorld explanations — and the AI automatically identifies key concepts, diseases, mechanisms, and drug facts, then generates flashcards from them. No manual selection required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli a replacement for Anki in medical school?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli is a strong alternative. Both use SM-2 spaced repetition. Esli\'s advantage is AI generation — you don\'t need to spend hours making cards or hunting for pre-made Anki decks. However, Anki has more community decks (like Zanki/Brosencephalon for USMLE) and deeper card customization. Many students use Esli to quickly generate topic-specific decks and Anki for established community card sets.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli work for NCLEX study?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Generate NCLEX-focused flashcard decks by prompting topics like "NCLEX pharmacology priority drugs", "fluid and electrolyte imbalances NCLEX", or "infection control nursing interventions". You can also upload your NCLEX prep book as a PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for medical students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Esli is completely free. AI generation, spaced repetition, PDF upload, and all features are available at no cost — no subscription, no free trial limits, no credit card required.',
      },
    },
  ],
}

const painPoints = [
  {
    problem: 'Spending hours making flashcards instead of studying',
    solution: 'Type a topic → AI builds the deck in seconds. Study instead of formatting.',
  },
  {
    problem: 'Lecture PDFs that are impossible to memorize',
    solution: 'Upload any PDF and Esli extracts high-yield facts into reviewable cards automatically.',
  },
  {
    problem: 'Forgetting everything before exam day',
    solution: 'SM-2 spaced repetition schedules every card at the optimal interval for maximum retention.',
  },
  {
    problem: 'Studying on your phone but Anki costs $25 on iOS',
    solution: 'Esli is free on every device — web, iOS, Android.',
  },
]

const useCases = [
  {
    title: 'USMLE Step 1 & 2',
    body: 'Generate topic-specific decks for any First Aid chapter — biochemistry, cardio, micro, pharm — in seconds. No Anki deck hunting required.',
    icon: '🩺',
  },
  {
    title: 'MCAT Prep',
    body: 'AI generates cards for organic chemistry, biochemistry, CARS passage strategies, psychology, and every other MCAT section.',
    icon: '🧬',
  },
  {
    title: 'NCLEX & Nursing Boards',
    body: 'Build focused decks for priority medications, lab values, disease processes, and nursing interventions — prompt by topic or upload your prep books.',
    icon: '💊',
  },
  {
    title: 'Anatomy & Physiology',
    body: 'Upload your Gray\'s Anatomy notes or type "upper limb muscles and innervations" and get a complete deck with origin, insertion, action, and nerve supply.',
    icon: '🫀',
  },
  {
    title: 'Pharmacology',
    body: 'Drug classes, mechanisms, side effects, contraindications — generate complete pharm decks for any drug class in a single prompt.',
    icon: '⚗️',
  },
  {
    title: 'Pathology',
    body: 'Robbins pathology, disease mechanisms, buzzword lab findings — describe the chapter and get a high-yield deck ready to review.',
    icon: '🔬',
  },
]

export default function AIFlashcardsMedicalStudentsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* ── Navbar ── */}
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

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50/30 -z-10" />
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                <Sparkles size={14} />
                Built for Medical Students
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                AI Flashcards for{' '}
                <span className="text-primary-600">Medical Students</span>{' '}
                — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Stop spending hours making Anki cards. Type any USMLE topic, MCAT subject, or upload your lecture PDF — Esli generates a complete, high-yield flashcard deck instantly. Study with spaced repetition. Retain more. Score higher.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Medical Flashcards Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#use-cases"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Use Cases
                </a>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['USMLE Step 1', 'USMLE Step 2', 'MCAT', 'NCLEX', 'Anatomy', 'Pharmacology', 'Pathology', 'Physiology'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Pain Points → Solutions ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                The medical student studying problem — solved
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Esli eliminates every major study bottleneck.
              </p>
            </div>
            <div className="space-y-4">
              {painPoints.map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <span className="text-rose-400 text-lg shrink-0">✗</span>
                        <p className="text-slate-700 font-medium">{item.problem}</p>
                      </div>
                    </div>
                    <div className="hidden sm:block w-px bg-slate-200 self-stretch" />
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <Check size={18} className="text-primary-600 shrink-0 mt-0.5" />
                        <p className="text-slate-700">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                From lecture to study deck in 3 steps
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: FileText,
                  num: '01',
                  title: 'Type a topic or upload a PDF',
                  body: '"Cardiac glycosides mechanism and toxicity", or drop in your pharmacology lecture slides — Esli handles either.',
                },
                {
                  icon: Sparkles,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'High-yield Q&As covering mechanisms, clinical pearls, drug interactions, exam buzzwords — whatever matters most for your boards.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Cards you struggle with resurface sooner. By exam day, every card is locked in. Same algorithm Anki uses.',
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

        {/* ── Use Cases ── */}
        <section id="use-cases" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Every medical exam, covered
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Generate flashcards for any medical subject in under a minute.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Generate Your Medical Deck Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Why AI Generation Matters for Med Students ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why AI generation changes everything for med school
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Save 5+ hours per week', body: 'The average medical student spends 5-7 hours a week creating Anki cards. Esli eliminates this entirely — generate a full deck in 30 seconds and spend that time reviewing instead.' },
                { title: 'Cover more material', body: 'When card creation is instant, you never skip making cards for "less important" topics. Esli ensures complete coverage across all exam subjects.' },
                { title: 'Better than pre-made decks', body: 'Generic decks like Zanki are comprehensive but rigid. Esli generates cards tailored to your specific weak areas, your professor\'s lecture style, or your school\'s curriculum.' },
                { title: 'Works with your existing materials', body: 'Upload your own notes, annotated textbook pages, or UWorld explanations. Esli turns your personal study materials into flashcards — not someone else\'s.' },
              ].map((b, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Brain size={14} className="text-primary-600" />
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

        {/* ── FAQ ── */}
        <section id="faq" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Medical student FAQs
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

        {/* ── Final CTA ── */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stop making cards. Start studying.
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join medical students who generate smarter flashcards with AI. Free, forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Medical Flashcards Free
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* ── Footer ── */}
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
