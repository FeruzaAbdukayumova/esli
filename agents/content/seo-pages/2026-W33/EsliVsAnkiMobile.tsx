/**
 * SEO Landing Page: Esli vs Anki Mobile
 * Route: /compare/anki-mobile
 * Meta title: Anki Mobile Alternative Free — Esli vs AnkiMobile | Esli
 * Meta description: AnkiMobile costs $24.99 on iOS. Esli is a free Anki alternative with AI
 *   flashcard generation across all devices. Honest comparison inside.
 * Target keywords: Anki mobile alternative, AnkiMobile alternative free, free Anki iOS,
 *   Anki iPhone alternative, AnkiDroid alternative, free flashcard app mobile
 * Week: 2026-W33
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
      name: 'Why does AnkiMobile cost $24.99 while Anki desktop is free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AnkiMobile for iOS is a separate paid app developed by the same person behind Anki. The revenue funds ongoing Anki development across all platforms. AnkiDroid for Android is free (community-developed). So the mobile cost gap only affects iPhone/iPad users.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli really free on iPhone and Android?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is free across all platforms — web browser on desktop, iOS Safari, and Android Chrome. No app purchase, no in-app purchases, no subscription required to access core features. AI generation, spaced repetition, and deck syncing are all free.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli work offline on mobile like Anki does?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli is a web app, so full offline support is not available. If you have reviewed cards recently, your browser may cache some content for offline access. Anki\'s native apps (desktop, AnkiMobile, AnkiDroid) are stronger for full offline use. If offline studying is critical to you, Anki is the better choice for that feature.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli replace Anki for serious long-term studying?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For most students — including medical students, language learners, and exam preppers — yes. Esli uses the same SM-2 spaced repetition algorithm as Anki. The main things Anki does that Esli doesn\'t yet: offline-first native apps, .apkg import, and deep card customization (HTML/CSS templates, cloze deletion). If you depend on those specifically, Anki remains the right tool. If you spend significant time making cards and want AI to do it for you, Esli saves that time entirely.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli on my phone without downloading an app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Open app.esli.app in your mobile browser and it works immediately. You can add it to your home screen as a PWA (Progressive Web App) for an app-like experience. No App Store or Google Play download needed.',
      },
    },
  ],
}

const comparisonRows = [
  { feature: 'AI flashcard generation', esli: true, anki: false, note: 'Esli generates cards from any topic or PDF instantly; Anki requires manual entry or downloaded decks' },
  { feature: 'Spaced repetition (SM-2)', esli: true, anki: true, note: 'Both use the same core algorithm — same science, same retention results' },
  { feature: 'Free on iOS (iPhone/iPad)', esli: true, anki: false, note: 'AnkiMobile is $24.99 on the App Store; Esli works free in any mobile browser' },
  { feature: 'Free on Android', esli: true, anki: true, note: 'Both are free on Android (Esli via browser, AnkiDroid is free)' },
  { feature: 'Free on desktop', esli: true, anki: true, note: 'Both are free on desktop (Esli via browser, Anki as a native app)' },
  { feature: 'PDF upload → flashcards', esli: true, anki: false, note: 'Upload any PDF and Esli auto-generates a deck — unique to Esli' },
  { feature: 'Browser extension', esli: true, anki: false, note: 'Esli extension saves words and passages while browsing the web' },
  { feature: '13-language translations', esli: true, anki: false, note: 'Esli translates card content into 13 languages automatically' },
  { feature: 'No download required', esli: true, anki: false, note: 'Esli is web-based — open a browser, start studying. Anki requires an app install.' },
  { feature: 'Full offline support', esli: false, anki: true, note: 'Anki\'s native apps work fully offline; Esli requires a connection for AI features' },
  { feature: 'Community deck library', esli: false, anki: true, note: 'Anki has thousands of community decks; Esli has 13 curated decks (but AI generates any topic)' },
  { feature: 'Deep card customization', esli: false, anki: true, note: 'Anki supports HTML, CSS, LaTeX, cloze deletion, custom templates — unmatched flexibility' },
  { feature: '.apkg import', esli: false, anki: true, note: 'Anki decks export as .apkg; Esli does not yet import this format' },
]

export default function EsliVsAnkiMobilePage() {
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
                Honest Comparison
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Free{' '}
                <span className="text-primary-600">Anki Mobile Alternative</span>{' '}
                — with AI Generation
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                AnkiMobile costs $24.99 on iOS. Esli is free across all devices — and adds AI flashcard generation so you never make cards manually. Here's the honest comparison.
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

        {/* Key difference callout */}
        <section className="py-12 bg-amber-50 border-y border-amber-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg font-medium text-amber-900">
              <span className="font-bold">The mobile price gap:</span>{' '}
              AnkiMobile (iOS) = $24.99 one-time. AnkiDroid (Android) = Free. Esli = Free everywhere, in your browser, no download.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Esli vs Anki — full feature comparison
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                An honest look at what each app does well.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 px-4 text-left text-slate-600 font-medium w-1/2">Feature</th>
                    <th className="py-3 px-4 text-center text-primary-600 font-semibold w-1/4">Esli</th>
                    <th className="py-3 px-4 text-center text-slate-600 font-medium w-1/4">Anki</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                      <td className="py-4 px-4">
                        <p className="font-medium text-slate-900">{row.feature}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{row.note}</p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.esli ? (
                          <div className="inline-flex items-center justify-center w-7 h-7 bg-green-100 rounded-full">
                            <Check size={16} className="text-green-600" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-7 h-7 bg-slate-100 rounded-full">
                            <X size={16} className="text-slate-400" />
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.anki ? (
                          <div className="inline-flex items-center justify-center w-7 h-7 bg-green-100 rounded-full">
                            <Check size={16} className="text-green-600" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-7 h-7 bg-slate-100 rounded-full">
                            <X size={16} className="text-slate-400" />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When to choose each */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Which one is right for you?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-primary-50 rounded-2xl border border-primary-200">
                <h3 className="text-xl font-bold text-primary-800 mb-4">Choose Esli if you...</h3>
                <ul className="space-y-2">
                  {[
                    'Want to study on iPhone without paying $24.99',
                    'Spend too much time making cards instead of studying them',
                    'Want to turn a PDF or topic into a deck in under a minute',
                    'Need multilingual support for card translations',
                    'Prefer not to install an app — just open a browser',
                    'Are just getting started with spaced repetition',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-primary-900">
                      <Check size={15} className="text-primary-600 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={`${APP_URL}/register`}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors no-underline"
                >
                  Try Esli Free
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Stick with Anki if you...</h3>
                <ul className="space-y-2">
                  {[
                    'Need full offline support (no internet while studying)',
                    'Have an existing library of .apkg decks you rely on',
                    'Use Anki\'s community decks (Zanki, Lightyear, etc.)',
                    'Want deep card customization — HTML, CSS, cloze deletion',
                    'Prefer a native desktop app over a web browser',
                    'Are a power user who has built a complex Anki setup over years',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={15} className="text-slate-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Anki mobile alternative FAQs
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
              Try the free Anki mobile alternative
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              AI flashcard generation + SM-2 spaced repetition + free on every device. No $24.99 required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Get Started — Free on Mobile
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
