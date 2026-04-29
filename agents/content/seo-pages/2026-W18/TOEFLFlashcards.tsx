/**
 * SEO Landing Page: TOEFL Vocabulary Flashcards
 * Route: /flashcards/toefl
 * Meta title: TOEFL Vocabulary Flashcards — AI Generator | Esli
 * Meta description: Generate TOEFL vocabulary flashcards with AI. Type any TOEFL topic and get study-ready cards instantly. Free, spaced repetition. Score higher on the TOEFL.
 * Target keywords: TOEFL vocabulary flashcards, TOEFL prep flashcards, TOEFL flashcards free, TOEFL iBT flashcards
 * Week: 2026-W18
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
      name: 'Are TOEFL flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. You can generate unlimited TOEFL vocabulary flashcards with AI, study with spaced repetition, and use all core features — no credit card or account required to start.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate TOEFL vocabulary flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any TOEFL topic — "academic vocabulary for TOEFL Reading", "TOEFL transition words", "science vocabulary for TOEFL Listening" — and the AI creates a full deck of cards in seconds. Each card includes the word, definition, example sentence, and usage notes. You can also upload TOEFL prep PDFs and Esli generates flashcards from the content automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli cover vocabulary for all four TOEFL sections?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can generate targeted cards for all four TOEFL iBT sections: Reading (academic vocabulary, inference, rhetorical purpose), Listening (lecture vocabulary, note-taking cues), Speaking (transition phrases, hedging language), and Writing (essay structures, cohesive devices). Just type the section and topic you need.',
      },
    },
    {
      '@type': 'Question',
      name: 'What TOEFL score level can Esli help me reach?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli helps students at all levels — from 60-70 (basic academic) up to 100+ (graduate school admissions). You control the difficulty by specifying your target score in the prompt, e.g. "advanced academic vocabulary for TOEFL 100+" and the AI calibrates the cards accordingly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from other TOEFL vocabulary apps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most TOEFL apps give you a fixed word list from years ago. With Esli, you generate cards for exactly the topics and academic domains you need — biology lectures, humanities readings, business passages — not just a generic word list. The AI builds cards around your specific weak areas, and spaced repetition ensures you actually remember them on exam day.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What does "corroborate" mean? Use it in a TOEFL-style sentence.',
    a: 'Corroborate (v): to confirm or support with evidence. "The results of the second experiment corroborated the initial findings, lending strong support to the proposed theory." Synonyms: confirm, substantiate, validate.',
  },
  {
    q: 'What is the meaning of "mitigate" in academic contexts?',
    a: 'Mitigate (v): to lessen the severity, seriousness, or painfulness of something. "Urban planners designed green spaces to mitigate the heat island effect." Common TOEFL collocations: mitigate risk, mitigate damage, mitigate the effects of.',
  },
  {
    q: 'Explain the difference between "infer" and "imply" — a common TOEFL Reading trap.',
    a: 'Imply: the author/speaker suggests something without stating it directly. Infer: the reader/listener draws a conclusion from hints. Memory trick: the author implies; the reader infers. TOEFL questions often ask what can be "inferred" — look for what\'s strongly suggested, not stated.',
  },
  {
    q: 'What does "ubiquitous" mean? How is it used in TOEFL lectures?',
    a: 'Ubiquitous (adj): present, appearing, or found everywhere. "Smartphones have become ubiquitous in modern society, changing how people communicate and access information." In TOEFL Listening, professors use this to describe widespread phenomena in science or culture.',
  },
  {
    q: 'What TOEFL Writing transition phrases show contrast?',
    a: 'Contrast transitions: However / Nevertheless / Nonetheless / In contrast / On the other hand / Conversely / That said / Yet / Despite this. Use these to introduce a counterargument or limitation. TOEFL raters reward cohesive transitions — avoid overusing "but" or "however" alone.',
  },
  {
    q: 'What does "phenomenon" mean, and how do you form its plural?',
    a: 'Phenomenon (n): a fact or event in nature or society that can be observed. Plural: phenomena (not "phenomenons"). "Researchers studied the phenomenon of bioluminescence in deep-sea organisms." TOEFL Reading and Listening frequently uses this word in scientific contexts.',
  },
]

const benefits = [
  { title: 'All 4 TOEFL sections covered', body: 'Reading, Listening, Speaking, and Writing vocabulary — generate targeted cards for each section based on your weak areas.' },
  { title: 'Upload your TOEFL prep materials', body: 'Have Official Guide PDFs, ETS practice tests, or course notes? Upload them and Esli generates flashcards from your exact materials.' },
  { title: 'SM-2 spaced repetition', body: 'The proven algorithm ensures you review words at the optimal interval. Build a lasting vocabulary bank — not just short-term memorization for test day.' },
  { title: 'Study in your language', body: 'Esli supports 14 interface languages. Study TOEFL vocabulary with explanations in your native language — then switch to English-only mode when ready.' },
]

const topicTags = ['TOEFL Reading', 'TOEFL Listening', 'TOEFL Speaking', 'TOEFL Writing', 'Academic Vocabulary', 'Science Terms', 'Transition Phrases', 'TOEFL iBT']

export default function TOEFLFlashcardsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

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
                Free AI Flashcard Generator
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Generate{' '}
                <span className="text-primary-600">TOEFL Vocabulary Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any TOEFL topic — academic vocabulary, transition phrases, science terms — and get a full deck of study cards in seconds. Free, with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {topicTags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate TOEFL Flashcards Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#sample-cards"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Example Cards
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Build your TOEFL vocabulary deck in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a targeted study deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your topic',
                  body: 'Enter anything — "TOEFL academic vocabulary Reading section", "science lecture terms for Listening", "essay transition phrases for TOEFL Writing" — or upload your prep book as PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates flashcards with word definitions, example sentences in academic context, and usage notes — calibrated to TOEFL iBT standards and your target score.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm resurfaces words you find difficult more often. Build a lasting vocabulary bank before exam day — not just last-minute cramming.',
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

        {/* ── Sample Cards ── */}
        <section id="sample-cards" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Example TOEFL vocabulary flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                These are the kinds of cards Esli generates — click any card to flip it.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-44 cursor-pointer [perspective:1200px]"
                  onClick={() => setFlippedCard(flippedCard === i ? null : i)}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                      flippedCard === i ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    <div className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden]">
                      <p className="text-xs text-slate-400 mb-2">Question</p>
                      <p className="text-sm font-medium text-slate-800 text-center leading-snug">{card.q}</p>
                      <p className="absolute bottom-3 right-4 text-xs text-slate-300">tap to flip</p>
                    </div>
                    <div className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-xs text-primary-500 mb-2">Answer</p>
                      <p className="text-sm text-slate-700 text-center leading-snug">{card.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Generate Your TOEFL Deck Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why TOEFL test-takers choose Esli
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
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                TOEFL flashcard FAQs
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
              Ready to hit your TOEFL target score?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate vocabulary flashcards for every TOEFL section. Any topic, in seconds. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate TOEFL Flashcards Free
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
              <a href="/use-case/language-learners" className="hover:text-white transition-colors no-underline">Language Learners</a>
              <a href="/flashcards/gre-vocabulary" className="hover:text-white transition-colors no-underline">GRE Vocabulary</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
