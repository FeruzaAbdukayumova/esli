/**
 * SEO Landing Page: AI Flashcard Generator
 * Route: /use-case/ai-flashcard-generator
 * Meta title: AI Flashcard Generator — Free, Any Topic | Esli (52 chars)
 * Meta description: Generate flashcards with AI for any topic or PDF in seconds. Free spaced repetition app. No signup needed. The best free AI flashcard generator. (152 chars)
 * Target keywords: AI flashcard generator, free flashcard generator, AI flashcard maker, flashcard generator free, make flashcards with AI
 * Week: 2026-W39
 * Note: This targets the #1 HIGH-PRIORITY keyword in the marketing plan.
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, Upload, Zap, BookOpen } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Esli really a free AI flashcard generator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Esli's AI flashcard generation is completely free — unlimited cards, unlimited decks, any topic. No credit card required. You can start generating flashcards without even creating an account. Pro features are available for heavy users, but the core AI generation is free forever.",
      },
    },
    {
      '@type': 'Question',
      name: 'What topics can the AI generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Any topic you can name. Type a subject (\"mitosis\", \"French Revolution\", \"AWS Lambda\"), a specific concept (\"OODA loop\", \"Black-Scholes model\"), or an exam name (\"MCAT biochemistry\", \"CompTIA Security+\") and the AI generates a complete, accurate deck. Esli's AI understands academic subjects, professional certifications, languages, and technical topics.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate flashcards from a PDF or document?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — textbook chapter, lecture slides, study guide, research paper — and Esli extracts the key concepts and generates a complete flashcard deck automatically. This works for any subject and any document format supported.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes Esli different from ChatGPT for generating flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ChatGPT can generate flashcard text, but you then have to copy-paste each card into another app to actually study. Esli generates flashcards AND gives you the study environment — spaced repetition scheduling, flip animations, progress tracking — in one place. No workflow gap.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli use spaced repetition after generating flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every generated deck is studied with the SM-2 spaced repetition algorithm — the same one that powers Anki. Cards you find difficult resurface sooner; cards you know well are shown less often. This maximizes retention per minute of study time.',
      },
    },
  ],
}

const useCases = [
  { icon: BookOpen, title: 'Students', body: 'Generate a complete study deck for any course, chapter, or exam topic in seconds. Upload lecture notes or textbook PDFs for a personalized deck.' },
  { icon: Brain, title: 'Self-learners', body: 'Learning a new skill, language, or subject on your own? Type a topic and get structured flashcards instantly — no need to figure out what to study.' },
  { icon: Upload, title: 'PDF readers', body: 'Turn any document into a study deck. Research papers, professional reports, certification guides — upload and get flashcards automatically.' },
  { icon: Zap, title: 'Fast prep', body: 'Exam tomorrow? Type "quick review [topic]" and get a targeted deck in under a minute. Study the most important concepts first with spaced repetition.' },
]

const sampleCards = [
  {
    q: 'What is spaced repetition and why does it work?',
    a: 'Spaced repetition: reviewing material at increasing intervals over time. Works because of the "spacing effect" — memory is stronger when learning is spread out. The SM-2 algorithm (Herman Ebbinghaus + Wozniak, 1987) calculates the optimal review interval for each card based on how well you recalled it.',
  },
  {
    q: 'What is the difference between RAM and ROM?',
    a: 'RAM (Random Access Memory): volatile, temporary storage for active programs and data — clears when powered off. ROM (Read-Only Memory): non-volatile, permanent storage for firmware — persists without power. Modern PCs: RAM = 16-64GB for active use; ROM = small chip for BIOS/UEFI firmware.',
  },
  {
    q: 'Explain the water cycle in 3 steps.',
    a: 'Evaporation: water from oceans/lakes converts to water vapor (solar energy). Condensation: water vapor rises, cools, forms clouds (water droplets on particles). Precipitation: water falls as rain, snow, sleet when droplets become heavy enough. Then: runoff returns to oceans/rivers, completing the cycle.',
  },
  {
    q: 'What are the 5 stages of the Krebs cycle inputs and outputs?',
    a: 'Input: 1 acetyl-CoA (2C) + 1 oxaloacetate (4C). Per turn: releases 2 CO2, produces 3 NADH, 1 FADH2, 1 ATP (or GTP). Net per glucose (2 turns): 4 CO2, 6 NADH, 2 FADH2, 2 ATP. Occurs in mitochondrial matrix. Regenerates oxaloacetate to continue the cycle.',
  },
  {
    q: 'Define opportunity cost. Give a real-world example.',
    a: "Opportunity cost: the value of the next-best alternative foregone when a choice is made. Example: Going to university for 4 years — direct cost: tuition + living expenses; opportunity cost: 4 years of full-time salary you didn't earn. Total cost of the decision includes both. Core concept in economics and decision-making.",
  },
  {
    q: 'What does the HTTP status code 429 mean?',
    a: "429 Too Many Requests — the client has sent too many requests in a given time window (rate limiting). The server may include a Retry-After header specifying when to try again. Common cause: exceeding API rate limits. Fix: implement exponential backoff, cache responses, or upgrade to a higher API tier.",
  },
]

export default function AIFlashcardGeneratorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

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
              Try Free
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
                Free — No Signup Required
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                The Free{' '}
                <span className="text-primary-600">AI Flashcard Generator</span>{' '}
                for Any Topic
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any topic or upload a PDF and Esli generates a complete study deck in seconds. Then study with spaced repetition. No more copying cards from ChatGPT into another app.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Any Subject', 'PDF Upload', 'Spaced Repetition', 'Browser Extension', '14 Languages', 'No Signup'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Flashcards Free
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

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Generate flashcards in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to studying in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type a topic or upload a PDF',
                  body: 'Enter any topic — "cellular respiration", "World War II causes", "Python decorators" — or upload a PDF of your textbook, notes, or study guide.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck instantly',
                  body: 'Esli\'s AI reads the topic or document and creates Q&A flashcards covering the key concepts, definitions, and processes — accurate, targeted, ready to study.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules each card at the optimal interval. Hard cards come back sooner. Easy cards less often. Maximum retention per minute of study.',
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

        {/* Sample Cards */}
        <section id="sample-cards" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Example AI-generated flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Across subjects — biology, CS, economics, history. Click any card to flip it.
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
                Generate Your Flashcards Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Who uses the Esli AI flashcard generator
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((uc, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <uc.icon size={22} className="text-primary-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{uc.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{uc.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Esli vs alternatives */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why Esli instead of alternatives
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'vs ChatGPT', body: 'ChatGPT generates card text — then you\'re on your own to copy it somewhere to study. Esli generates AND hosts your study session with spaced repetition in one place.' },
                { title: 'vs Anki', body: 'Anki has powerful spaced repetition but requires you to create every card manually. Esli generates the entire deck from a topic or PDF, then studies it with the same SM-2 algorithm.' },
                { title: 'vs Quizlet', body: "Quizlet's AI generation requires a paid Plus subscription ($7.99/mo). Esli's AI generation is free. Both have spaced repetition, but Esli uses the research-backed SM-2 algorithm." },
                { title: 'vs manual creation', body: 'Creating flashcards by hand takes hours. You spend time on card production instead of on learning. Esli takes seconds — generating 20 high-quality cards while you could be studying the first one.' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
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
                AI flashcard generator FAQs
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

        {/* CTA */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Generate flashcards for any topic — free
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Type a topic or upload a PDF. Esli handles the rest. Study-ready in seconds.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Flashcards Free
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
              <a href="/use-case/pdf-to-flashcards" className="hover:text-white transition-colors no-underline">PDF to Flashcards</a>
              <a href="/compare/esli-vs-anki" className="hover:text-white transition-colors no-underline">Esli vs Anki</a>
              <a href="/compare/esli-vs-quizlet" className="hover:text-white transition-colors no-underline">Esli vs Quizlet</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
