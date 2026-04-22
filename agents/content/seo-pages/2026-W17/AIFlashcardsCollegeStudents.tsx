/**
 * SEO Landing Page: AI Flashcards for College Students
 * Route: /use-case/college-students
 * Meta title: AI Flashcards for College Students — Free | Esli
 * Meta description: Esli generates college flashcards instantly from any topic or PDF. Biology, history, economics, law — study smarter with AI + spaced repetition. Free.
 * Target keywords: AI flashcards for college, college flashcard app free, study flashcards for students, AI study cards
 * Week: 2026-W17
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, BookOpen, FileText, Clock, Zap } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Esli free for college students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. You can generate unlimited flashcards with AI, upload PDFs, study with spaced repetition, and access all core features — no credit card or sign-up required to start.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my lecture slides or textbook PDFs to make flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli accepts PDF uploads. Upload your lecture slides, textbook chapters, professor notes, or lab handouts, and the AI will extract the key concepts and generate a complete flashcard deck automatically. This turns passive reading material into active study sessions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What subjects can I study with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any subject. Type any topic and get flashcards: biology, chemistry, physics, history, economics, psychology, law, literature, political science, computer science, and more. Esli\'s AI generates accurate, subject-specific cards for virtually any college course.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does spaced repetition help college students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spaced repetition is the most research-backed method for long-term retention. Instead of cramming the night before, Esli schedules short daily reviews that resurface material just before you would forget it. This means less total study time for better exam performance — ideal for juggling multiple college courses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I share flashcard decks with classmates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli supports shared/community decks. You can make a deck public so classmates can copy and study it, or browse the 800+ premade community decks for common college subjects. Share a link to your deck and anyone can import it into their own account.',
      },
    },
  ],
}

const painPoints = [
  {
    icon: Clock,
    problem: 'No time to make flashcards',
    solution: 'Generate a full deck from any topic or PDF in under 60 seconds. No manual card creation.',
  },
  {
    icon: BookOpen,
    problem: 'Drowning in lecture notes',
    solution: 'Upload your PDF slides or notes. Esli extracts the key concepts and turns them into flashcards automatically.',
  },
  {
    icon: Brain,
    problem: 'Forgetting material between exams',
    solution: 'SM-2 spaced repetition schedules reviews at the optimal time so material stays in long-term memory, not just short-term.',
  },
  {
    icon: Zap,
    problem: 'Cramming doesn\'t stick',
    solution: 'Daily 10-15 min review sessions outperform 3-hour cram sessions. Esli makes this effortless.',
  },
]

const useCases = [
  {
    subject: 'Biology',
    example: 'Cell signaling pathways, genetics, evolution — type any chapter topic and get a deck in seconds.',
    tags: ['Cell Biology', 'Genetics', 'Physiology'],
  },
  {
    subject: 'Economics',
    example: 'Macro and micro concepts, market structures, elasticity — AI generates precise definition + example cards.',
    tags: ['Microeconomics', 'Macroeconomics', 'Game Theory'],
  },
  {
    subject: 'History',
    example: 'Dates, events, causes, figures — AI generates cards that test context and significance, not just memorization.',
    tags: ['World History', 'US History', 'Historiography'],
  },
  {
    subject: 'Psychology',
    example: 'Theories, experiments, psychologists — upload your Intro Psych textbook PDF for a complete deck.',
    tags: ['Social Psych', 'Cognitive', 'Abnormal Psych'],
  },
  {
    subject: 'Law / Pre-Law',
    example: 'Case names, legal concepts, constitutional provisions — generate case-by-case or doctrine-by-doctrine decks.',
    tags: ['Constitutional Law', 'Contracts', 'Torts'],
  },
  {
    subject: 'Computer Science',
    example: 'Data structures, algorithms, complexity — AI generates cards with examples, definitions, and code concepts.',
    tags: ['Data Structures', 'Algorithms', 'OS Concepts'],
  },
]

const benefits = [
  { title: 'Works for any course', body: 'Biology, history, law, CS, economics — Esli generates accurate flashcards for any subject. No templates, no setup.' },
  { title: 'Turn lecture slides into flashcards', body: 'Upload your professor\'s PDF slides and Esli builds a study deck automatically. No manual card creation.' },
  { title: 'Study 14 languages', body: 'Studying abroad or in a foreign language program? Esli supports 14 interface languages for multilingual learners.' },
  { title: 'Free forever, no account required', body: 'Start studying immediately. No sign-up required to try. Create a free account to save decks and track progress.' },
]

export default function AIFlashcardsCollegeStudentsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* FAQ Schema JSON-LD */}
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
                Free AI Flashcard Generator
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                AI Flashcards{' '}
                <span className="text-primary-600">for College Students</span>{' '}
                — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any topic or upload your lecture notes and get a full flashcard deck in seconds. Study smarter with AI generation + spaced repetition. Free forever.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Flashcards Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#subjects"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Subjects
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pain Points ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                The biggest college study problems — solved
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {painPoints.map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1 line-through">{item.problem}</p>
                      <p className="text-base font-medium text-slate-900">{item.solution}</p>
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
                From lecture notes to flashcards in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Under a minute. No manual card creation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: FileText,
                  num: '01',
                  title: 'Type a topic or upload PDF',
                  body: 'Enter any course topic — "Keynesian economics", "DNA replication", "French Revolution causes" — or upload your lecture slides PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates precise, subject-accurate flashcards tailored to college-level content. Definitions, key terms, cause-and-effect relationships, examples.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules reviews optimally. 15 minutes a day beats 3-hour cramming. Review across all your courses without getting overwhelmed.',
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

        {/* ── Subject Use Cases ── */}
        <section id="subjects" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Works for every college subject
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From STEM to humanities — Esli generates accurate flashcards for any course.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((uc, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{uc.subject}</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{uc.example}</p>
                  <div className="flex flex-wrap gap-2">
                    {uc.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Start Generating Flashcards Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why college students choose Esli
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

        {/* ── FAQ ── */}
        <section id="faq" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                FAQs for college students
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
              Study smarter this semester
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any course in seconds. Free forever. No cramming required.
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
              <a href="/use-case/medical-students" className="hover:text-white transition-colors no-underline">Medical Students</a>
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
