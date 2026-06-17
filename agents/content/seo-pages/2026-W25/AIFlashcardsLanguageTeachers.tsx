/**
 * SEO Landing Page: AI Flashcards for Language Teachers
 * Route: /use-case/language-teachers
 * Meta title: AI Flashcards for Language Teachers — Free | Esli
 * Meta description: Create and share vocabulary flashcard decks for your students with AI. 14 interface languages, spaced repetition, free forever.
 * Target keywords: flashcards for language teachers, AI tools for language educators, create flashcards for students, vocabulary flashcard decks for class, ESL flashcards teacher
 * Week: 2026-W25
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, Users, Clock, Globe } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can language teachers create flashcard decks for their students on Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli lets you generate a complete flashcard deck from any topic — "unit 3 vocabulary intermediate Spanish", "business English collocations", "French irregular verbs B1" — and share it as a deck your students can study on their own with spaced repetition. No coding or setup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli support multiple languages for language teachers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli supports 14 interface languages and can generate flashcard content in any language your students are learning, including Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese, Arabic, and more. Students can use the interface in their native language while studying the target language.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my lesson materials or textbook pages as a PDF to generate flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your course handouts, textbook vocabulary lists, reading passages, or assessment materials as a PDF. Esli\'s AI extracts vocabulary, key phrases, grammar examples, and cultural notes into a ready-to-study flashcard deck. This works for any language and any level.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for teachers and students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Teachers can generate decks and students can study with full spaced repetition — no credit card, no subscription required. There is no institutional plan needed; just sign up and start generating.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli help students retain vocabulary better than a word list?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli uses SM-2 spaced repetition — the same algorithm behind Anki, proven to dramatically improve long-term retention. Instead of cramming a word list the night before a test, students review words at scientifically optimal intervals. Words they know well appear less often; words they struggle with appear more. Students retain 2-3x more vocabulary over time compared to passive review.',
      },
    },
  ],
}

const painPoints = [
  {
    problem: 'Spending hours every week creating vocabulary lists and handouts',
    solution: 'Generate a complete 30-card deck from any topic in under 60 seconds with AI.',
  },
  {
    problem: 'Students forget 80% of new vocabulary within a week',
    solution: 'Spaced repetition resurfaces words at exactly the right time — students retain far more without extra effort.',
  },
  {
    problem: 'No easy way to share custom decks digitally with the whole class',
    solution: 'Generate a deck once and students can access it immediately — no logins, no setup for them.',
  },
  {
    problem: 'Generic decks that don\'t match what you actually teach',
    solution: 'Generate cards from your exact lesson topics, textbook chapters, or uploaded PDF materials.',
  },
]

const benefits = [
  {
    icon: Clock,
    title: 'Cut prep time from hours to minutes',
    body: 'Type your lesson topic or vocabulary theme and let AI generate 20-30 targeted flashcards in seconds. No more typing definitions one by one.',
  },
  {
    icon: Globe,
    title: '14 interface languages',
    body: 'Students use Esli in their native language while studying the target language. Works for ESL, Spanish, French, German, Japanese, Korean, Mandarin, and more.',
  },
  {
    icon: Users,
    title: 'Decks for any class size',
    body: 'Generate once, share with your whole class. Each student studies on their own schedule with spaced repetition automatically tracking what they know.',
  },
  {
    icon: Brain,
    title: 'Upload your own course materials',
    body: 'Turn textbook chapters, reading passages, or assessment vocabulary into flashcards instantly. AI extracts exactly the words and phrases from your PDF.',
  },
]

export default function AIFlashcardsLanguageTeachersPage() {
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
                Free for Teachers and Students
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                AI Flashcards for{' '}
                <span className="text-primary-600">Language Teachers</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Generate custom vocabulary flashcard decks for your students with AI. Type your lesson topic or upload your course materials — get a complete, shareable deck in seconds. Free, no setup required.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  'ESL / EFL',
                  'Spanish',
                  'French',
                  'German',
                  'Japanese',
                  'Chinese',
                  'Business Language',
                  'Exam Prep',
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
                  Create Your First Deck Free
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
        <section className="py-20 sm:py-28 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                The vocabulary problem every language teacher knows
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Esli fixes the friction that slows down vocabulary teaching.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {painPoints.map((p, i) => (
                <div key={i} className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                  <p className="text-slate-400 text-sm line-through mb-3">✕ {p.problem}</p>
                  <p className="text-white text-sm font-medium">✓ {p.solution}</p>
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
                From lesson plan to student deck in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Generate once. Students study on their own schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your vocabulary topic',
                  body: 'Enter your lesson topic — "Unit 5 travel vocabulary B1 Spanish", "business English email phrases", "DELF B2 vocabulary" — or upload your course materials as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates the deck',
                  body: 'Esli creates complete Q&A cards with definitions, example sentences, and usage notes. Cards are contextual and teacher-quality — not generic dictionary definitions.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Students study with spaced repetition',
                  body: 'Share the deck link and students study at their own pace. SM-2 spaced repetition surfaces what they need to review — so vocabulary sticks beyond the next class.',
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

        {/* Benefits */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Built for how language teachers actually work
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                      <b.icon size={20} className="text-primary-600" />
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

        {/* Example use cases */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                What language teachers generate with Esli
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                '"IELTS academic vocabulary band 7+"',
                '"French DELF B2 expressions"',
                '"Spanish irregular preterite verbs A2"',
                '"Business English meeting phrases"',
                '"German accusative vs dative prepositions"',
                '"TOEFL integrated task vocabulary"',
                '"Japanese N3 kanji readings"',
                '"Medical English for nursing students"',
                '"Portuguese European travel phrases A1"',
              ].map((example, i) => (
                <div
                  key={i}
                  className="p-4 bg-white rounded-xl border border-slate-200 text-sm text-slate-700 font-mono"
                >
                  {example}
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-slate-500 text-sm">
              Type any topic like these and get a complete deck in seconds.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                FAQs for language teachers
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
              Save hours of prep every week
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate your first vocabulary deck in under a minute. Free for you and all your students.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Create Your First Deck Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Need subject-specific decks?{' '}
              <a href="/flashcards/japanese-vocabulary" className="text-white underline hover:no-underline">
                Japanese vocabulary
              </a>{' '}
              and{' '}
              <a href="/flashcards/spanish-vocabulary" className="text-white underline hover:no-underline">
                Spanish vocabulary
              </a>{' '}
              pages are available too.
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
