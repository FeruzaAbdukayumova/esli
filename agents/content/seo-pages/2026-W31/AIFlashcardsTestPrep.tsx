/**
 * SEO Landing Page: AI Flashcards for Test Prep
 * Route: /use-case/test-prep
 * Meta title: AI Flashcards for Test Prep — SAT, GRE, GMAT | Esli (53 chars)
 * Meta description: Generate test prep flashcards with AI for SAT, ACT, GRE, GMAT, LSAT, and more. Free, spaced repetition. No signup. (115 chars)
 * Target keywords: test prep flashcards, SAT flashcards app, GRE flashcards free, GMAT flashcard generator, standardized test study app
 * Week: 2026-W31
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
      name: 'Which standardized tests can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Esli generates flashcards for any standardized test: SAT (vocabulary, math concepts, grammar rules, reading comprehension strategies), ACT (math formulas, science reasoning, English grammar), GRE (high-frequency GRE vocabulary, quant concepts, argument analysis), GMAT (critical reasoning, sentence correction, quant formulas), LSAT (logical reasoning, argument types, sufficient vs necessary conditions), MCAT (covered in detail on the MCAT page), TOEFL/IELTS (academic vocabulary, grammar, writing structures), and more. Type the test name and section for targeted decks.",
      },
    },
    {
      '@type': 'Question',
      name: 'How are AI-generated flashcards better than premade test prep decks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Premade decks cover every student equally — and miss your specific gaps. AI-generated decks are targeted: 'GRE vocabulary: high-frequency words I keep missing', 'SAT Math: quadratic formula applications and common traps', 'GMAT Critical Reasoning: strengthen vs weaken question types'. You get exactly the cards you need, not a generic list of 500 vocabulary words where you already know 400 of them. Generate targeted topic decks, identify weak spots fast, then double down with more specific prompts.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload official test prep materials as PDFs to generate flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your official GRE prep book, Khan Academy notes, Princeton Review chapters, or GMAT OG sections as PDFs and Esli generates flashcards from the actual material you are using. This is especially useful for official vocabulary lists, grammar rules sections, and math concept reviews — converting dense reference pages into active recall practice that sticks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much time should I spend on test prep flashcards each day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Esli's spaced repetition algorithm does the scheduling for you. Most test prep students see strong results with 15-20 minutes per day of active recall review. The SM-2 algorithm surfaces due cards at optimal intervals — you review a card right before you'd forget it. This outperforms marathon study sessions because it spaces practice over time, which is how long-term memory actually forms. Start 8-12 weeks before your exam for vocabulary-heavy tests (GRE, LSAT), 4-6 weeks for concept-heavy tests (GMAT Quant, SAT Math).",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for test prep students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes AI flashcard generation, spaced repetition, and community decks — no credit card required. Generate test prep decks for SAT, GRE, GMAT, LSAT, or any other exam at no cost. Guest mode lets you start studying immediately without signing up.',
      },
    },
  ],
}

const tests = [
  {
    name: 'SAT / ACT',
    areas: ['Vocabulary in context', 'Math formulas & geometry', 'Grammar rules', 'Reading strategies'],
    prompt: '"SAT vocabulary: high-frequency words with context sentences"',
  },
  {
    name: 'GRE',
    areas: ['High-frequency GRE words', 'Quant concepts', 'Argument analysis', 'Issue essay structure'],
    prompt: '"GRE vocab: 50 most tested words with definitions, synonyms, and example sentences"',
  },
  {
    name: 'GMAT',
    areas: ['Critical reasoning types', 'Sentence correction rules', 'Quant formulas', 'Data sufficiency'],
    prompt: '"GMAT Critical Reasoning: 8 question types and how to approach each"',
  },
  {
    name: 'LSAT',
    areas: ['Argument types', 'Sufficient vs necessary', 'Assumption questions', 'Logic games rules'],
    prompt: '"LSAT sufficient vs necessary conditions: definitions, common traps, and practice"',
  },
  {
    name: 'TOEFL / IELTS',
    areas: ['Academic vocabulary', 'Task 1/2 structures', 'Listening strategies', 'Collocations'],
    prompt: '"Academic English collocations and transition phrases for TOEFL writing"',
  },
  {
    name: 'AP Exams',
    areas: ['Subject-specific content', 'FRQ response structures', 'Key terms', 'Historical examples'],
    prompt: '"AP US History: all 9 periods — key events, themes, and exam-ready summaries"',
  },
]

const painPoints = [
  {
    title: 'You study the wrong things',
    body: 'Most students re-read notes on topics they already know. AI-generated decks target your actual weak spots — generate specific prompts for the question types and content you keep missing.',
  },
  {
    title: 'Vocabulary lists are passive and boring',
    body: 'Reading through 500 GRE words once does nothing. Spaced repetition with active recall turns passive lists into permanent memory. Each card forces you to produce the answer, not recognize it.',
  },
  {
    title: 'Prep books are dense and hard to convert to practice',
    body: 'Upload any prep book PDF and get a focused flashcard deck instantly. Turn 300 pages of Princeton Review into active recall practice in minutes, not hours.',
  },
  {
    title: 'Inconsistent study is the #1 reason scores plateau',
    body: "The SM-2 algorithm emails you when cards are due and builds a daily review habit. 15 minutes every day beats 3-hour weekend cramming sessions for vocabulary and concept retention.",
  },
]

export default function AIFlashcardsTestPrepPage() {
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
                <span className="text-primary-600">Test Prep</span>{' '}
                — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Generate targeted flashcards for SAT, ACT, GRE, GMAT, LSAT, or any standardized test in seconds. No more passive re-reading — active recall with spaced repetition, free.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['SAT', 'ACT', 'GRE', 'GMAT', 'LSAT', 'TOEFL', 'IELTS', 'AP Exams'].map((tag) => (
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
                  Generate Test Prep Flashcards Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#tests"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Your Test
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
                Why test prep feels harder than it should
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                And how Esli fixes each one.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {painPoints.map((pt, i) => (
                <div key={i} className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                  <h3 className="text-base font-semibold text-white mb-2">{pt.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{pt.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                How Esli fits your test prep
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Generate targeted decks',
                  body: 'Type the test, section, and specific topics you need. "GRE vocabulary: words with Greek roots" beats a generic 500-word dump every time.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'Or upload your prep materials',
                  body: 'Drop official prep book PDFs and Esli converts dense reference pages into active recall flashcard decks in seconds.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study 15 min/day until exam',
                  body: 'Spaced repetition schedules reviews automatically. Hard cards repeat more; mastered cards space out. Build lasting retention before your test date.',
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

        {/* Tests Grid */}
        <section id="tests" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                What to generate for your test
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Ready-to-use prompts for the most popular standardized tests.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tests.map((test, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{test.name}</h3>
                  <ul className="space-y-1 mb-4">
                    {test.areas.map((area, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-primary-400 rounded-full shrink-0" />
                        {area}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-400 mt-3 font-mono bg-slate-50 rounded-lg p-2 leading-relaxed">
                    Try: {test.prompt}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Start Generating Test Prep Flashcards Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Test prep flashcard FAQs
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

        {/* Benefits */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why test prep students choose Esli
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { title: 'Targeted decks for your specific weak spots', body: 'Unlike premade decks, AI-generated cards address exactly what you struggle with — the question types and content areas where you lose the most points.' },
                { title: 'No signup needed to try it', body: 'Guest mode lets you generate a deck and start studying in seconds. No account, no email, no friction — just type a topic and start drilling.' },
                { title: 'Upload official prep materials', body: 'Convert Princeton Review chapters, Khan Academy notes, or official practice test explanations into active recall flashcard decks instantly.' },
                { title: 'Study smarter, not longer', body: '15 minutes of spaced repetition beats 2 hours of passive re-reading. The SM-2 algorithm ensures you review each concept at the ideal moment for long-term retention.' },
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

        {/* Final CTA */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start your test prep today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any standardized test in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Test Prep Flashcards Free
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
              <a href="/flashcards/mcat" className="hover:text-white transition-colors no-underline">MCAT Flashcards</a>
              <a href="/flashcards/gre-vocabulary" className="hover:text-white transition-colors no-underline">GRE Vocabulary</a>
              <a href="/flashcards/lsat" className="hover:text-white transition-colors no-underline">LSAT Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
