/**
 * SEO Landing Page: AI Flashcards for Online Students
 * Route: /use-case/online-students
 * Meta title: AI Flashcards for Online Students — Free | Esli (51 chars)
 * Meta description: Esli turns your Coursera, Udemy, or edX course notes into flashcards with AI — free, spaced repetition, no signup needed. (128 chars)
 * Target keywords: flashcards for online learners, Coursera study flashcards, remote student study tools, online course flashcard generator, self-paced learning app
 * Week: 2026-W32
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, BookOpen, Clock, Laptop, Target } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Esli help with online course learning on Coursera, edX, or Udemy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Online courses deliver information faster than classrooms — without built-in review, most of it disappears within days. Esli fills the retention gap: type any lecture topic and get a flashcard deck in seconds, or upload your course notes and PDFs for automatic extraction. Then spaced repetition schedules daily 10-15 minute review sessions that build durable memory — the same material that took you 3 hours to watch becomes accessible recall within 2-3 weeks. Works with any online course: Coursera, edX, Udemy, Khan Academy, LinkedIn Learning, Skillshare, bootcamps, and university OCW materials.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload course slides, transcripts, and PDFs from my online courses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any course material as a PDF: lecture slides, course notes, module summaries, or textbook chapters. Esli extracts key concepts, definitions, and relationships into a flashcard deck automatically. This is especially useful for courses that release weekly reading packets or comprehensive course PDFs (common on Coursera and edX). You can also copy-paste content from course transcripts or video captions into the topic field for instant flashcard generation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from just re-watching course videos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Re-watching is passive recognition — it feels productive but doesn't build durable memory. Your brain already 'recognized' the content on the first watch; it needs active recall to actually retain it. Flashcards force retrieval: you see the question and must generate the answer from memory. Every successful retrieval strengthens the memory; every failed retrieval tells the spaced repetition algorithm to schedule that card more frequently. 10 minutes of active recall practice is more effective for retention than 60 minutes of passive re-watching — this is well-established in cognitive science (Roediger & Karpicke, 2006). Esli automates both the generation (type a topic, get a deck) and the scheduling (SM-2 algorithm decides when to review each card).",
      },
    },
    {
      '@type': 'Question',
      name: 'What types of online courses work best with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Any course with factual content that needs to be retained — not just understood — benefits from flashcards. Best fits: Technical courses (programming, data science, cloud computing, cybersecurity) — precise syntax and definitions matter. Language courses (Spanish, Mandarin, Japanese, French) — vocabulary and grammar rules need repetition. Professional certifications (AWS, PMP, CPA, CFA) — breadth of content requires systematic review. Business and finance (accounting, economics, MBA courses) — terminology-heavy, concept-dense. Medical and health sciences (anatomy, pharmacology, pathology) — exact names and mechanisms matter. Less suited: project-based courses where doing is the practice (woodworking, creative writing), or discussion-based courses where synthesis matters more than recall.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for online learners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes AI flashcard generation, spaced repetition scheduling, and access to community decks — no credit card required. Whether you are taking a free Coursera audit, a paid Udemy course, or working through university OCW, you can generate unlimited flashcard decks at no cost. Guest mode means you can start immediately without creating an account — useful when you want to turn this week\'s lecture into cards right now.',
      },
    },
  ],
}

const painPoints = [
  {
    icon: BookOpen,
    title: 'Lectures move fast, memory doesn\'t keep up',
    body: 'Online courses front-load information with no classroom review built in. Without active recall practice, 70% of new material is forgotten within a week. Esli generates review cards from every lecture topic you cover.',
  },
  {
    icon: Clock,
    title: 'Self-paced means no accountability for review',
    body: 'In a classroom, quizzes and lectures repeat material. In self-paced courses, nothing forces review — only motivation, which runs out. Spaced repetition creates a 10-15 min daily habit that replaces classroom repetition automatically.',
  },
  {
    icon: Laptop,
    title: 'Course PDFs and slides are hard to convert to practice',
    body: 'Most online learners highlight their notes and then never look at them again. Esli turns any PDF, slide deck, or course module into an active recall deck — upload and study, no manual card creation needed.',
  },
  {
    icon: Target,
    title: 'Certificate exams require exact recall, not just understanding',
    body: 'AWS, PMP, CPA, CFA — professional certification exams test precise knowledge across 100+ hours of material. Spaced repetition is the only method that makes breadth-of-content retention tractable in a reasonable time window.',
  },
]

const courseTypes = [
  {
    platform: 'Coursera / edX',
    examples: ['Google Data Analytics', 'IBM Data Science', 'Yale Psychology', 'MIT 18.01 Calculus'],
    prompt: '"Week 3 neural networks: layers, activation functions, backpropagation — key definitions and math"',
  },
  {
    platform: 'Udemy / Skillshare',
    examples: ['AWS Certified Solutions Architect', 'The Complete Python Bootcamp', 'UI/UX Design Course'],
    prompt: '"AWS EC2 instance types: families, use cases, pricing models — key distinctions for the exam"',
  },
  {
    platform: 'Professional Certifications',
    examples: ['AWS SAA', 'PMP', 'CFA Level 1', 'Google Analytics'],
    prompt: '"PMP: PMBOK process groups and knowledge areas — complete mapping for the exam"',
  },
  {
    platform: 'Language Learning',
    examples: ['Duolingo supplementary', 'italki prep', 'JLPT prep', 'HSK exam'],
    prompt: '"Japanese N3 vocabulary: top 100 words by frequency with example sentences"',
  },
]

export default function AIFlashcardsOnlineStudentsPage() {
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
                AI Flashcards for Online Learners
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Actually Retain What You{' '}
                <span className="text-primary-600">Learn Online</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Online courses move fast and nothing forces review. Esli generates flashcards from any lecture topic or PDF and schedules them with spaced repetition — so what you watch on Monday is still in your head on Friday.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Coursera', 'edX', 'Udemy', 'AWS Certifications', 'LinkedIn Learning', 'Bootcamps', 'University OCW', 'JLPT / HSK Prep'].map((tag) => (
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
                  Start Generating Flashcards Free
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
                Why online course material disappears
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                These are the retention gaps Esli was built to solve.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {painPoints.map((p, i) => (
                <div key={i} className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-600/20 border border-primary-600/30 rounded-xl flex items-center justify-center shrink-0">
                      <p.icon className="text-primary-400" size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Turn any lecture into lasting knowledge
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Three steps, 2 minutes to set up, 10 minutes a day to maintain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type a topic or upload a PDF',
                  body: 'After each lecture module, type the topic — "AWS EC2 instance types and use cases" — or upload course slides as a PDF. Esli generates a focused flashcard deck in seconds.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'Review for 10-15 minutes',
                  body: 'Go through your new deck the same day you learned the material. That first active recall session is the highest-leverage study action you can take — it locks in what passive watching cannot.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Let spaced repetition do the rest',
                  body: 'The SM-2 algorithm schedules when to review each card based on how well you knew it. Set a 10-minute daily session and Esli manages the schedule — you just show up and answer.',
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

        {/* Course Types Grid */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Works with every platform and course type
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Example prompts you can use right now after your next lecture.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courseTypes.map((ct, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
                  <h3 className="font-semibold text-slate-900 mb-3">{ct.platform}</h3>
                  <ul className="text-xs text-slate-500 mb-4 space-y-1">
                    {ct.examples.map((ex) => (
                      <li key={ex} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-primary-400 rounded-full shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-400 mb-1">Example prompt:</p>
                    <p className="text-xs text-primary-700 italic leading-relaxed">{ct.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Generate Your First Deck Free
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
                Why online learners choose Esli
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: 'AI generation replaces hours of manual note summarizing',
                  body: 'Instead of manually converting lecture notes into study cards (30-60 min per module), type the topic and get a deck in under 30 seconds. Spend your time studying, not preparing to study.',
                },
                {
                  title: 'PDF upload covers dense course materials instantly',
                  body: 'Upload weekly reading packets, course slides, or textbook chapters. Esli extracts the key concepts, definitions, and relationships you need to retain — not the examples and explanations you need only once.',
                },
                {
                  title: 'Spaced repetition does what self-paced courses cannot',
                  body: "Self-paced platforms don't have built-in review. Esli's SM-2 algorithm schedules daily review sessions that space out over time — so you are still reviewing Module 1 material when you are finishing Module 8.",
                },
                {
                  title: 'Available in 14 languages for international learners',
                  body: 'Study in your native language or the language of your course. Esli supports 14 interface languages, and can generate flashcards in any language you type your prompt in — including non-English course content.',
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
        <section id="faq" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Frequently asked questions
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
              Make your next online course actually stick
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards from any lecture topic or PDF in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Start Generating Flashcards Free
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
              <a href="/use-case/test-prep" className="hover:text-white transition-colors no-underline">Test Prep Flashcards</a>
              <a href="/use-case/self-study" className="hover:text-white transition-colors no-underline">Self-Study Flashcards</a>
              <a href="/flashcards/aws-certification" className="hover:text-white transition-colors no-underline">AWS Certification Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
