/**
 * SEO Landing Page: AI Flashcards for Adult Learners
 * Route: /use-case/adult-learners
 * Meta title: AI Flashcards for Adult Learners — Free | Esli (50 chars)
 * Meta description: Learn anything as an adult with AI flashcards. New language, career skills, professional certs — spaced repetition, free, no signup. (138 chars)
 * Target keywords: flashcards for adult learners, AI study tools for working professionals, learn new skill flashcards, adult learning flashcard app, professional development flashcards
 * Week: 2026-W27
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
      name: 'Is spaced repetition effective for adult learners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — and research suggests it may be even more effective for adults than for children. Adults have richer prior knowledge to attach new information to, and spaced repetition\'s core mechanism (reviewing information at increasing intervals before forgetting) works independently of age. The SM-2 algorithm Esli uses is the same algorithm used by Anki, which has a dedicated community of adult professional learners including doctors, lawyers, language learners, and software engineers who learn complex material efficiently using spaced repetition.',
      },
    },
    {
      '@type': 'Question',
      name: 'I only have 10-15 minutes a day. Is Esli worth it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — 10-15 minutes is ideal for spaced repetition. The SM-2 algorithm is designed for short, consistent sessions rather than long cramming marathons. After your initial deck is generated, daily review sessions typically take 5-15 minutes. The key advantage over other study methods: those 10 minutes are spent on exactly the cards you need to review today, not re-reading things you already know.',
      },
    },
    {
      '@type': 'Question',
      name: 'What subjects work best for adult learners using Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anything where you need to memorise a body of knowledge: foreign languages (vocabulary and grammar), professional certifications (AWS, PMP, real estate, CPA), medical or legal terminology, historical events, programming concepts, musical theory, geography. Esli is less suited for procedural skills that require hands-on practice (surgery, playing an instrument), but it is excellent for the knowledge component that underpins any skill.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from just reading or watching videos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Reading and watching videos create the "fluency illusion" — content feels familiar while you\'re consuming it, but retrieval is different from recognition. Esli forces active recall: you read a question and must retrieve the answer before seeing it. This retrieval practice has been shown in cognitive science research to produce 2-3x better long-term retention compared to passive re-reading. Combined with spaced repetition, it is the most time-efficient study method known.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I generate cards from a book, article, or podcast transcript I\'m reading?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — a book chapter, a research article, a course handout, a transcript — and Esli extracts the key concepts into flashcards. You can also paste text or type a topic. Many adult learners generate cards from professional development articles, technical documentation, or business books they are working through, turning passive reading into active retention.',
      },
    },
  ],
}

const painPoints = [
  {
    problem: 'You forget what you learned last week',
    solution: 'Spaced repetition resurfaces each card before you forget it — not after. You review the right thing at the right time.',
  },
  {
    problem: 'You have no time for long study sessions',
    solution: '10 minutes of active recall with Esli beats 60 minutes of re-reading. Short sessions are the feature, not a compromise.',
  },
  {
    problem: 'Pre-made decks don\'t match what you\'re learning',
    solution: 'Generate cards from your exact course, book, article, or documentation. Your deck, your materials, your pace.',
  },
  {
    problem: 'You lose motivation without structure',
    solution: 'Daily review streaks, progress tracking, and a clear due-card queue give adult learners a system that runs on autopilot.',
  },
]

const examplePrompts = [
  '"AWS Solutions Architect concepts for the SAA-C03 exam"',
  '"Spanish B2 vocabulary from CEFR word frequency list"',
  '"PMP exam terms and process groups from PMBOK 7th edition"',
  '"Real estate license exam terms — contracts and agency"',
  '"Python data structures and algorithms for coding interviews"',
  '"Wine regions of France for WSET Level 2"',
  '"Human nutrition macronutrients and micronutrients"',
  '"Stoic philosophy key concepts and thinkers"',
  '"Business law contract formation and breach remedies"',
]

export default function AIFlashcardsAdultLearnersPage() {
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
                <span className="text-primary-600">Adult Learners</span>{' '}
                — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Learning something new between a full-time job and the rest of life is hard. Esli generates flashcards from any topic or PDF in seconds, then surfaces them on a spaced schedule so you retain what you learn — in 10 minutes a day.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Language Learning', 'Professional Certs', 'Career Skills', 'Coding', 'Finance', 'Law', 'History', 'Science'].map((tag) => (
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
                  Start Learning Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See How It Works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-20 sm:py-28 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                The problems adult learners actually face
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                And how Esli solves them without asking for hours you don't have.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {painPoints.map((p, i) => (
                <div key={i} className="p-6 bg-slate-700/50 rounded-2xl border border-slate-600">
                  <p className="text-sm font-semibold text-red-400 mb-2">The problem</p>
                  <p className="text-white font-medium mb-4">{p.problem}</p>
                  <p className="text-sm font-semibold text-primary-400 mb-2">Esli's solution</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{p.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                How adult learners use Esli
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Generate once. Review daily. Retain forever.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type a topic or upload a PDF',
                  body: 'Enter "AWS concepts for Solutions Architect exam", "Spanish B2 vocabulary", or upload a chapter from any book or course material.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates a complete flashcard deck in seconds — definitions, concepts, examples, and nuances extracted from your topic or document.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Review 10 minutes a day',
                  body: 'SM-2 spaced repetition schedules exactly what to review each day. Nothing falls through the cracks; nothing is over-reviewed.',
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
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                What adult learners generate
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Real prompts from professionals building real expertise.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
              {examplePrompts.map((prompt, i) => (
                <div
                  key={i}
                  className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm text-slate-700 leading-snug"
                >
                  {prompt}
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Try Your Topic Free
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
                Why Esli works for adult learners
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: 'Generate from your own materials',
                  body: 'Upload a textbook chapter, article, or course PDF. Your deck is built from what you\'re actually studying, not a generic pre-made card set.',
                },
                {
                  title: 'No signup required to start',
                  body: 'Try Esli in guest mode immediately — no account, no email, no friction. Create an account later to save your progress.',
                },
                {
                  title: '14 interface languages',
                  body: 'Study in your native language or in the language you\'re learning. The interface works in 14 languages so no translation friction gets in the way.',
                },
                {
                  title: 'Works on phone and browser extension',
                  body: 'Review cards on your phone during a commute, or use the browser extension to study whenever you have a spare 5 minutes at your desk.',
                },
              ].map((b, i) => (
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
                Questions from adult learners
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
              Start learning — 10 minutes a day
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Type any topic or upload a PDF and get a complete flashcard deck in seconds. Free forever — no credit card needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Get Started Free
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
              <a href="/use-case/language-learners" className="hover:text-white transition-colors no-underline">Language Learners</a>
              <a href="/flashcards/aws-certification" className="hover:text-white transition-colors no-underline">AWS Certification</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
