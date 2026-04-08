/**
 * SEO Landing Page: Esli vs Anki
 * Route: /compare/anki
 * Meta title: Esli vs Anki — Which Flashcard App Is Better?
 * Meta description: Esli vs Anki compared honestly. Both use spaced repetition — but Esli adds
 *   AI generation so you never make cards manually again. Free. See the full comparison.
 * Target keywords: Esli vs Anki, Anki alternative, Anki alternative with AI, free Anki
 *   alternative, best flashcard app 2025
 * Week: 2026-W15
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Check, X, ChevronDown } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Esli better than Anki?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on your needs. Esli is better if you want AI to generate your flashcards automatically — you describe a topic and get a complete deck in seconds. Anki is more established, has a larger community deck library, and offers deep customization for power users. Both use the same SM-2 spaced repetition algorithm. If you spend significant time making cards rather than studying them, Esli will likely serve you better.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli use the same spaced repetition algorithm as Anki?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Both Esli and Anki use the SM-2 (SuperMemo 2) spaced repetition algorithm. Cards are rated Again / Hard / Good / Easy and scheduled at increasing intervals based on your performance. The core retention science is the same.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I import my Anki decks into Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can copy any of Esli\'s 13 shared community decks with one click, and you can also generate an AI equivalent of any Anki deck you have by describing the topic to Esli. Direct .apkg import is not currently supported, but it is on the roadmap.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli really free? Anki is free on desktop but charges on iOS.',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli is free across all platforms — web browser, iOS, and Android. There are no in-app purchases or paid tiers. Anki desktop is free but AnkiMobile for iOS costs $24.99. If you study on an iPhone, Esli is a no-cost alternative.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli have as many community decks as Anki?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anki has a massive community deck library with thousands of pre-made decks. Esli currently has 13 curated public decks covering popular subjects. However, Esli\'s AI generation means you rarely need to search for a pre-made deck — you can generate a custom deck for any topic in seconds.',
      },
    },
  ],
}

const comparisonRows = [
  { feature: 'AI flashcard generation', esli: true, anki: false, note: 'Esli generates cards from any topic or PDF in seconds' },
  { feature: 'Spaced repetition (SM-2)', esli: true, anki: true, note: 'Both use the same core algorithm' },
  { feature: 'PDF upload → flashcards', esli: true, anki: false, note: 'Unique to Esli' },
  { feature: 'Browser extension', esli: true, anki: false, note: 'Save words/passages while browsing' },
  { feature: 'Free on iOS & Android', esli: true, anki: false, note: 'AnkiMobile costs $24.99; Esli is free everywhere' },
  { feature: '14 language AI translations', esli: true, anki: false, note: 'Esli translates card backs to 13+ languages' },
  { feature: 'Community deck library', esli: false, anki: true, note: 'Anki has thousands of community decks' },
  { feature: 'Deep card customization', esli: false, anki: true, note: 'Anki supports HTML, CSS, LaTeX, custom templates' },
  { feature: 'Desktop app (offline)', esli: false, anki: true, note: 'Anki has native desktop apps; Esli is web-based' },
  { feature: 'No account required', esli: true, anki: true, note: 'Both support guest/local use' },
  { feature: 'Free to use', esli: true, anki: true, note: 'Anki desktop + Android are free; iOS is paid' },
]

export default function EsliVsAnkiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
              Try Esli Free
            </a>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50/30 -z-10" />
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                <Sparkles size={14} />
                Honest Comparison
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Esli vs Anki —{' '}
                <span className="text-primary-600">Which Should You Use?</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Both apps use spaced repetition. The key difference: <strong>Esli generates flashcards with AI</strong> so you never spend hours making cards manually. Anki has a larger community and deeper customization. Here's the honest breakdown.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Try Esli Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#comparison"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Full Comparison
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── The One-Sentence Summary ── */}
        <section className="py-12 bg-slate-50 border-y border-slate-200">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-lg text-slate-700 leading-relaxed">
              <strong>Choose Esli if</strong> you want AI to create your cards — type a topic and study in 30 seconds.{' '}
              <strong>Choose Anki if</strong> you need a massive pre-made deck library or advanced card formatting with LaTeX and custom templates.
            </p>
          </div>
        </section>

        {/* ── Comparison Table ── */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Feature comparison
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Side-by-side breakdown of Esli vs Anki.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-slate-700 font-semibold bg-slate-50 w-1/2">Feature</th>
                    <th className="px-6 py-4 text-center text-primary-600 font-bold bg-primary-50 w-1/4">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="w-5 h-5 bg-primary-600 rounded flex items-center justify-center">
                          <span className="text-white font-bold text-xs">E</span>
                        </div>
                        Esli
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-slate-600 font-semibold bg-slate-50 w-1/4">Anki</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-800">{row.feature}</span>
                        {row.note && <p className="text-xs text-slate-500 mt-0.5">{row.note}</p>}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.esli
                          ? <Check size={18} className="text-primary-600 mx-auto" />
                          : <X size={18} className="text-slate-300 mx-auto" />}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.anki
                          ? <Check size={18} className="text-emerald-500 mx-auto" />
                          : <X size={18} className="text-slate-300 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-400 mt-3 text-center">
              Comparison based on publicly available feature information as of April 2026.
            </p>
          </div>
        </section>

        {/* ── Key Differentiators ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Where Esli wins
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '⚡',
                  title: 'Zero card-creation time',
                  body: 'With Anki, you spend hours making cards. With Esli, type a topic and your deck is ready in seconds. The AI does the work.',
                },
                {
                  icon: '📄',
                  title: 'PDF → flashcards',
                  body: 'Upload any textbook chapter, lecture notes, or study guide and Esli extracts the key concepts into cards automatically.',
                },
                {
                  icon: '📱',
                  title: 'Free on every platform',
                  body: 'AnkiMobile costs $24.99. Esli is free on web, iOS, and Android — no hidden costs.',
                },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all text-center">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
              <h3 className="text-base font-semibold text-slate-900 mb-2">Where Anki wins (being honest)</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span><span><strong>Community decks:</strong> Anki's shared deck library has thousands of high-quality pre-made decks for medical boards, languages, and more.</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span><span><strong>Card customization:</strong> Anki supports HTML, CSS, LaTeX, audio, and image occlusion — power users can build anything.</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span><span><strong>Offline desktop app:</strong> Anki works fully offline; Esli requires an internet connection.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
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

        {/* ── Final CTA ── */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Try the AI-powered Anki alternative
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Same spaced repetition science. Zero card-creation time. Free on every device.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Get Started with Esli — Free
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
