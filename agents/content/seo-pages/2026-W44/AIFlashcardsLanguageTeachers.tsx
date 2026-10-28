/**
 * SEO Landing Page: AI Flashcards for Language Teachers
 * Route: /use-case/language-teachers
 * Meta title: AI Flashcards for Language Teachers — Create Decks | Esli
 * Meta description: Create AI-generated flashcard decks for your students. Type a topic or upload a PDF — instant vocabulary decks for any language class. Free, no signup.
 * Target keywords: flashcards for language teachers, create flashcard decks for students, language teaching tools, AI flashcards teacher
 * Week: 2026-W44
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, Users } from 'lucide-react'

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
        text: 'Yes. Teachers can create a deck in minutes by typing vocabulary topics or uploading a PDF of their lesson materials. Esli\'s AI generates the flashcards automatically. The deck can then be shared with students via a public link — no account required for students to study.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for language teachers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The core features — unlimited decks, unlimited cards, AI generation, spaced repetition, and public deck sharing — are free. No credit card, no student account required. Students can study shared decks without signing up.',
      },
    },
    {
      '@type': 'Question',
      name: 'What languages does Esli support for language teaching?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli\'s interface is available in 14 languages, and the card translation feature supports 13 languages including Spanish, French, Japanese, Korean, German, Italian, Portuguese, Chinese, Arabic, and more. You can create cards in any language and translate them for multilingual classrooms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I create vocabulary decks from my lesson PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — your textbook chapter, vocabulary list, or grammar handout — and Esli\'s AI will extract the key vocabulary and create a complete flashcard deck automatically. This turns an hour of manual card-making into a 30-second task.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do students study a deck their teacher shared?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Teachers share a public link to the deck. Students open the link and can study immediately without creating an account — guest mode gives full access to spaced repetition, card flipping, and all study modes. Students who create a free account can also save the deck and track their own progress.',
      },
    },
  ],
}

const teacherWorkflow = [
  {
    icon: Sparkles,
    num: '01',
    title: 'Create your vocabulary deck',
    body: 'Type "Spanish irregular preterite verbs" or upload your lesson PDF. Esli\'s AI generates a complete set of Q&A flashcards in seconds.',
  },
  {
    icon: Users,
    num: '02',
    title: 'Share with your class',
    body: 'Make the deck public and share a link. Students click it and start studying immediately — no account, no download, no friction.',
  },
  {
    icon: RotateCcw,
    num: '03',
    title: 'Students study with spaced repetition',
    body: 'Each student\'s study session is tracked with the SM-2 algorithm. Cards they miss resurface sooner. Vocabulary actually sticks.',
  },
]

const benefits = [
  { title: 'Deck creation in under a minute', body: 'Type a topic or upload your PDF. AI generates the cards. No manual entry, no formatting. A 50-card vocabulary deck takes 30 seconds.' },
  { title: 'Students need no account', body: 'Share a public link. Students study immediately in guest mode — full spaced repetition, all study modes. Zero barrier to entry for your class.' },
  { title: '14 languages, 13 translation targets', body: 'Create decks in any language. Translate vocabulary to any of 13 languages for multilingual classrooms or immersion programs.' },
  { title: 'Upload your lesson materials', body: 'Turn your existing textbook chapters, grammar handouts, or vocabulary lists into flashcard decks automatically. Reuse what you already have.' },
]

const useCases = [
  { subject: 'Spanish class', example: '"A2 Spanish vocabulary — household objects + irregular verbs ir/ser/estar" → 40 cards in 20 seconds' },
  { subject: 'ESL / EFL', example: '"IELTS Academic Word List Part 3" or upload a Cambridge vocabulary PDF → ready-to-study deck' },
  { subject: 'French immersion', example: '"French subjunctive triggers — verbs of doubt and emotion" → detailed cards with conjugation examples' },
  { subject: 'Japanese class', example: '"JLPT N5 hiragana + katakana" → 96 character cards with stroke order notes' },
]

export default function AIFlashcardsLanguageTeachersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeCase, setActiveCase] = useState(0)

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
                For Language Teachers
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Create{' '}
                <span className="text-primary-600">AI Flashcard Decks</span>{' '}
                for Your Students — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type a vocabulary topic or upload your lesson PDF. Esli generates a complete flashcard deck in seconds. Share a link — students study immediately, no account needed. 14 languages supported.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Create Your First Deck Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#use-cases"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Examples by Language
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
                From lesson plan to student deck in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                A vocabulary deck that used to take an hour now takes under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {teacherWorkflow.map((step, i) => (
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

        {/* Use Cases by Language */}
        <section id="use-cases" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Works for every language class
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Click a subject to see how teachers use Esli.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {useCases.map((uc, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCase(i)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer border ${
                      activeCase === i
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-primary-400 hover:bg-primary-50'
                    }`}
                  >
                    {uc.subject}
                  </button>
                ))}
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-slate-700 leading-relaxed">{useCases[activeCase].example}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why language teachers choose Esli
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
                Language teacher FAQs
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
              Ready to build your first student deck?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Create a vocabulary deck in seconds. Share it with your class. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Create Your First Deck Free
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
              <a href="/flashcards/japanese-vocabulary" className="hover:text-white transition-colors no-underline">Japanese Flashcards</a>
              <a href="/flashcards/spanish-vocabulary" className="hover:text-white transition-colors no-underline">Spanish Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
