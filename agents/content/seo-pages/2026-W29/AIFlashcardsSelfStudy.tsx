/**
 * SEO Landing Page: AI Flashcards for Self-Study
 * Route: /use-case/self-study
 * Meta title: AI Flashcards for Self-Study — Learn Anything Free | Esli (58 chars)
 * Meta description: Generate flashcards on any topic with AI. Self-study, autodidact, lifelong learning — free, spaced repetition, no signup needed. (133 chars)
 * Target keywords: self-study flashcards, learn anything flashcards AI, autodidact study tools, self-taught learning flashcards, independent learning app
 * Week: 2026-W29
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
      name: 'Can I use Esli to learn any topic — not just school subjects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Esli's AI generates flashcards on any topic you can describe. Self-learners use it for personal finance, investing, history, philosophy, music theory, cooking techniques, wine tasting, chess openings, tax law, photography, game design, public speaking, and more. If you can type the topic, Esli can generate cards for it.",
      },
    },
    {
      '@type': 'Question',
      name: 'How is AI flashcard generation better than making cards manually?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Manual card creation is slow and often leads to card-making procrastination — you spend time formatting instead of learning. Esli generates a full deck in 10-30 seconds, so you can start reviewing immediately. The AI also structures questions and answers in a pedagogically effective format: precise question, complete answer, key distinction highlighted. You can still edit any card that doesn't fit your needs.",
      },
    },
    {
      '@type': 'Question',
      name: 'I have a PDF, book, or article I want to learn from. Can I upload it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — a textbook chapter, research paper, article printout, or your own notes — and Esli extracts the key concepts, definitions, and distinctions into a flashcard deck ready to study. This is ideal for self-study where you have a specific resource you want to internalize rather than just read through once.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does spaced repetition help with self-directed learning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Self-study lacks external accountability — no tests, no professor scheduling your review. Spaced repetition fills that gap. Esli's SM-2 algorithm automatically schedules each card at the optimal interval for long-term retention: you see it again just before you'd forget it. This means 15-20 minutes a day of review is more effective than several hours of re-reading. The system handles the schedule so you focus on learning.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for self-study use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes AI card generation, spaced repetition scheduling, and a library of community decks across hundreds of subjects. You can even use Esli without creating an account (guest mode) — just start generating cards immediately. No credit card, no trial period, no paywall for core features.',
      },
    },
  ],
}

const painPoints = [
  {
    problem: 'No structure to your learning',
    solution: 'Type any topic and instantly get a structured set of key concepts, definitions, and distinctions — a curriculum in 30 seconds.',
  },
  {
    problem: 'You read it but forget it fast',
    solution: 'Spaced repetition resurfaces material at the exact interval you need — just before you would forget — compounding retention over time.',
  },
  {
    problem: 'No one tests you when you self-study',
    solution: 'Flashcards are active recall — you retrieve information from memory each time, which is proven to strengthen the memory trace far better than rereading.',
  },
  {
    problem: 'PDFs and articles pile up unread',
    solution: 'Upload any PDF and Esli converts it into a study-ready flashcard deck in seconds. Turn a research paper into 20 retention-focused cards instantly.',
  },
]

const exampleTopics = [
  'Personal finance: compound interest, index funds, tax-advantaged accounts',
  'History of philosophy: Stoicism, existentialism, epistemology key figures',
  'Music theory: chord progressions, modes, circle of fifths',
  'Behavioral economics: cognitive biases and heuristics (Kahneman)',
  'Wine tasting: varietals, regions, terroir vocabulary',
  'Chess openings: Sicilian Defense, Ruy Lopez, King\'s Indian principles',
  'Public speaking: rhetorical devices, speech structure, Aristotle\'s ethos/pathos/logos',
  'Photography: exposure triangle, aperture, shutter speed, ISO',
  'Nutrition science: macronutrients, micronutrients, metabolism basics',
]

const benefits = [
  {
    title: 'Learn anything — zero curriculum required',
    body: "No textbook, no teacher, no syllabus. Just type what you want to learn. Esli generates structured, effective flashcards for any topic a curious person might explore.",
  },
  {
    title: 'Upload what you\'re already reading',
    body: 'Turn PDFs, articles, and ebooks into study-ready decks. Self-learners often have great resources — Esli makes sure you actually retain what you read.',
  },
  {
    title: 'Built-in schedule so you never forget to review',
    body: "The SM-2 spaced repetition algorithm handles scheduling for you. You don't have to think about when to review — Esli resurfaces each card at the right moment.",
  },
  {
    title: 'Free, no signup needed',
    body: 'Start generating and studying immediately — no account required. Guest mode lets you build decks and study them right away. Create an account later to save your progress.',
  },
]

export default function AIFlashcardsSelfStudyPage() {
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
                <span className="text-primary-600">Self-Study</span>{' '}
                — Learn Anything, Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any topic — history, finance, music theory, philosophy, coding, languages — and get a complete flashcard deck in 30 seconds. Spaced repetition makes sure you actually remember it.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Any Topic', 'No Curriculum', 'PDF Upload', 'Spaced Repetition', 'Guest Mode', 'No Signup', 'Lifelong Learning', 'Autodidact'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-primary-700 bg-primary-50 border border-primary-200 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={APP_URL}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Start Learning — No Signup Needed
                  <ArrowRight size={18} />
                </a>
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  Create Free Account
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
                The self-study struggle is real
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Esli solves each of these head-on.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {painPoints.map((p, i) => (
                <div key={i} className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                  <p className="text-sm font-semibold text-rose-400 mb-2">Problem</p>
                  <p className="text-base font-medium text-white mb-4">{p.problem}</p>
                  <p className="text-sm font-semibold text-primary-400 mb-2">Esli solves it</p>
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
                From curiosity to knowledge in 3 steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type or upload anything',
                  body: 'Enter a topic you want to learn, or upload a PDF of a book, article, or your own notes. Esli works with both open-ended topics and specific documents.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds your deck',
                  body: 'In seconds, you have a structured set of flashcards covering the key concepts, distinctions, and knowledge gaps in your chosen topic.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Review daily, retain forever',
                  body: "15-20 minutes of spaced repetition review each day keeps your knowledge fresh indefinitely. You're not re-reading — you're retrieving, which is what creates lasting memory.",
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

        {/* Example Topics */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                What self-learners study with Esli
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                A small sample — any topic works.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {exampleTopics.map((topic, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={12} className="text-primary-600" />
                  </div>
                  <p className="text-slate-700 text-sm font-mono leading-relaxed">{topic}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href={APP_URL}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Start with Your Topic — Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Built for the self-directed learner
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
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
        <section id="faq" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Self-study flashcard FAQs
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
              Start learning anything today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards on any topic in seconds. Free forever — no account required to start.
            </p>
            <a
              href={APP_URL}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Flashcards Free — No Signup
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
              <a href="/use-case/adult-learners" className="hover:text-white transition-colors no-underline">Adult Learners</a>
              <a href="/use-case/language-learners" className="hover:text-white transition-colors no-underline">Language Learners</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
