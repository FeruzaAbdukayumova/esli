/**
 * SEO Landing Page: Best Flashcard App 2026 — Roundup Comparison
 * Route: /compare/best-flashcard-app
 * Meta title: Best Flashcard App 2026: Honest Comparison | Esli (50 chars)
 * Meta description: Honest comparison of the best flashcard apps in 2026: Esli, Anki, Quizlet, Memrise, and more. Find the right app for your needs. (132 chars)
 * Target keywords: best flashcard app, best flashcard app 2026, flashcard app comparison, Quizlet alternative free, Anki alternative easier
 * Week: 2026-W31
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, ChevronDown, Check, X } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best free flashcard app in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "It depends on what you need. For AI generation (type a topic and get cards instantly): Esli. For the largest community card library and social features: Quizlet. For maximum control and custom algorithm tuning: Anki. For language learning with gamification: Memrise or Duolingo. For serious spaced repetition power users willing to invest time: Anki or SuperMemo. For most students who want fast setup and smart review: Esli — it generates cards from any topic or PDF and uses SM-2 spaced repetition, all free with no signup required.",
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Quizlet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Esli vs Quizlet: both let you study with flashcards and are free. Key differences: Esli uses AI to generate cards from any topic or PDF you provide — Quizlet's AI generation is limited to the paid tier. Esli uses SM-2 spaced repetition algorithm built in — Quizlet's spaced repetition is in the paid plan. Esli has no ads — Quizlet's free tier has ads. Quizlet wins on: community deck library (500M+ cards), study games (Match, Gravity, Learn mode), and social/class features for teachers. Esli wins on: AI card generation, clean distraction-free UX, and full spaced repetition for free.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Anki still the best flashcard app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Anki is still the best app for long-term retention power users — its algorithm, plugin ecosystem, and fine-grained scheduling control are unmatched. But Anki has a steep learning curve, an outdated UI, no AI generation, and a paid iOS app ($25). If you want the best algorithm and don't mind the setup cost: use Anki. If you want AI card generation, a modern UX, and spaced repetition without setup: Esli is a strong alternative. Many users use both — Esli for rapid deck creation, Anki for long-term retention of their most important material.",
      },
    },
    {
      '@type': 'Question',
      name: 'Which flashcard app is best for medical students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Medical students typically use Anki (with pre-made decks like AnkiHub's Zanki, or Lightyear) for structured long-term retention, and Esli for rapid deck generation from lecture PDFs, textbook chapters, or specific topics they're weak on. Esli is especially useful for: uploading a USMLE First Aid chapter and getting a targeted deck, generating cards for obscure pharmacology or anatomy topics not covered well in premade decks, and study with no setup cost on the go. For MCAT/USMLE/NCLEX, dedicated pages with more detail are linked in the footer.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I try Esli without signing up?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli has a guest mode — no account required to try it. Generate flashcards for any topic immediately and start studying with spaced repetition. If you want to save your decks and access them from multiple devices, create a free account. The free plan includes AI generation, spaced repetition, and community decks indefinitely — no credit card, no trial period.',
      },
    },
  ],
}

type CellValue = boolean | string | null

interface AppRow {
  feature: string
  esli: CellValue
  anki: CellValue
  quizlet: CellValue
  memrise: CellValue
}

const comparisonRows: AppRow[] = [
  { feature: 'AI card generation (type topic → deck)', esli: true, anki: false, quizlet: 'Paid only', memrise: false },
  { feature: 'PDF upload → flashcards', esli: true, anki: false, quizlet: false, memrise: false },
  { feature: 'Spaced repetition (built-in, free)', esli: true, anki: true, quizlet: 'Paid only', memrise: true },
  { feature: 'No signup required', esli: true, anki: true, quizlet: false, memrise: false },
  { feature: 'Free plan', esli: true, anki: true, quizlet: 'Limited', memrise: 'Limited' },
  { feature: 'iOS app (free)', esli: 'Coming soon', anki: '$24.99', quizlet: true, memrise: true },
  { feature: 'Android app', esli: 'Coming soon', anki: true, quizlet: true, memrise: true },
  { feature: 'Browser extension', esli: true, anki: false, quizlet: false, memrise: false },
  { feature: 'Community / premade decks', esli: '800+ cards', anki: 'Large library', quizlet: '500M+ cards', memrise: 'Language courses' },
  { feature: 'Algorithm quality', esli: 'SM-2', anki: 'SM-2 + FSRS', quizlet: 'Basic (free)', memrise: 'Custom' },
  { feature: '14-language interface', esli: true, anki: false, quizlet: false, memrise: false },
  { feature: 'Ad-free', esli: true, anki: true, quizlet: 'Paid only', memrise: 'Paid only' },
  { feature: 'KaTeX math support', esli: true, anki: true, quizlet: 'Limited', memrise: false },
  { feature: 'Price (paid tier)', esli: '$5-12/mo', anki: 'Free (iOS $25)', quizlet: '$35.99/yr', memrise: '$8.99/mo' },
]

function Cell({ value }: { value: CellValue }) {
  if (value === true) return <Check size={18} className="text-emerald-500 mx-auto" />
  if (value === false) return <X size={18} className="text-slate-300 mx-auto" />
  return <span className="text-xs text-slate-500 text-center block">{value}</span>
}

const chooserCards = [
  {
    title: 'Choose Esli if you want to...',
    color: 'bg-primary-50 border-primary-200',
    headingColor: 'text-primary-700',
    points: [
      'Generate flashcards from any topic or PDF with AI',
      'Start studying in seconds with no setup',
      'Use spaced repetition for free (no paywall)',
      'Use the browser extension to save cards while browsing',
      'Have a clean, distraction-free study experience',
    ],
  },
  {
    title: 'Choose Anki if you want to...',
    color: 'bg-amber-50 border-amber-200',
    headingColor: 'text-amber-700',
    points: [
      'Maximum algorithm control (FSRS + extensive tuning)',
      'Hundreds of community-made decks (AnkiHub, AnkiWeb)',
      'Deep plugin ecosystem for custom workflows',
      'Long-term (years) retention of large card libraries',
      "Don't mind a steep learning curve and older UI",
    ],
  },
  {
    title: 'Choose Quizlet if you want to...',
    color: 'bg-slate-50 border-slate-200',
    headingColor: 'text-slate-700',
    points: [
      'The largest community library (500M+ premade cards)',
      'Study games and collaborative class features',
      "Access decks your teacher or classmates already made",
      "Don't need spaced repetition on the free plan",
      'Social / sharing features',
    ],
  },
]

export default function BestFlashcardAppPage() {
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
              Try Esli Free
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
                Honest Comparison — 2026
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Best Flashcard App in 2026:{' '}
                <span className="text-primary-600">Honest Comparison</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                We compared Esli, Anki, Quizlet, and Memrise across the things that actually matter: AI generation, spaced repetition, price, and ease of use. Here's what we found.
              </p>

              <p className="mt-3 text-sm text-slate-400 italic">
                Note: this page is published by Esli. We've tried to be honest — including where competitors win.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Feature comparison
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Green check = supported. X = not supported. Text = nuanced.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-200">
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900 w-2/5">Feature</th>
                    <th className="text-center px-4 py-3 text-sm font-bold text-primary-700 bg-primary-50">Esli</th>
                    <th className="text-center px-4 py-3 text-sm font-semibold text-slate-700">Anki</th>
                    <th className="text-center px-4 py-3 text-sm font-semibold text-slate-700">Quizlet</th>
                    <th className="text-center px-4 py-3 text-sm font-semibold text-slate-700">Memrise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="px-4 py-3 text-sm text-slate-700">{row.feature}</td>
                      <td className="px-4 py-3 bg-primary-50/40 text-center"><Cell value={row.esli} /></td>
                      <td className="px-4 py-3 text-center"><Cell value={row.anki} /></td>
                      <td className="px-4 py-3 text-center"><Cell value={row.quizlet} /></td>
                      <td className="px-4 py-3 text-center"><Cell value={row.memrise} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Chooser */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Which app is right for you?
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Honest guidance — not just "pick us."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {chooserCards.map((card, i) => (
                <div key={i} className={`p-6 rounded-2xl border ${card.color}`}>
                  <h3 className={`text-base font-bold mb-4 ${card.headingColor}`}>{card.title}</h3>
                  <ul className="space-y-2">
                    {card.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* "You don't have to choose" synthesis */}
            <div className="mt-10 max-w-2xl mx-auto p-6 bg-slate-900 rounded-2xl text-center">
              <h3 className="text-lg font-bold text-white mb-2">You don't have to choose just one</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Many serious learners use Esli to rapidly generate decks from any topic or PDF, then export their best cards to Anki for long-term retention using Anki's advanced algorithm. Esli handles the content creation problem; Anki handles the long-term scheduling problem. Together they cover the full workflow.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Flashcard app FAQs
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

        {/* Why Esli section */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                What makes Esli different
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { title: 'AI generation is the core feature', body: 'Esli was built around AI card creation. Type any topic or upload a PDF and get a complete, study-ready deck in seconds. This is what Anki and Quizlet have not solved at the free tier.' },
                { title: 'Spaced repetition free — no paywall', body: "Quizlet locks spaced repetition behind its paid plan. Esli's SM-2 algorithm is free for everyone. You shouldn't have to pay to study smart." },
                { title: 'No ads, clean interface', body: "Quizlet's free tier is ad-heavy. Esli has no ads. The interface is clean, distraction-free, and built to keep you in a study flow state." },
                { title: 'Browser extension saves cards from anywhere', body: 'The Esli browser extension lets you save and create flashcards while reading articles, Wikipedia pages, or any web content. No other free app in this comparison offers that.' },
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
              Try Esli — no signup needed
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any topic in seconds. Free forever — no credit card, no subscription, no ads.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Try Esli Free
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
              <a href="/compare/anki" className="hover:text-white transition-colors no-underline">Esli vs Anki</a>
              <a href="/compare/quizlet" className="hover:text-white transition-colors no-underline">Esli vs Quizlet</a>
              <a href="/compare/supermemo" className="hover:text-white transition-colors no-underline">Esli vs SuperMemo</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
