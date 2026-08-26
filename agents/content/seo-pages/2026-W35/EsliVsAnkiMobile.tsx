/**
 * SEO Landing Page: Esli vs Anki Mobile (Comparison)
 * Route: /compare/esli-vs-anki-mobile
 * Meta title: Esli vs Anki Mobile — Easier AI Alternative | Esli (52 chars)
 * Meta description: Esli vs Anki mobile: easier setup, AI card generation, no syncing headaches. Free. See how Esli compares for iOS and Android users. (133 chars)
 * Target keywords: Anki mobile alternative, Anki iOS alternative, easier than Anki app, Anki app too complicated, Anki alternative mobile
 * Note: W15 has a general Esli vs Anki page (/compare/esli-vs-anki). This page targets mobile-specific Anki frustration searches — a distinct keyword cluster.
 * Week: 2026-W35
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
      name: 'Is Esli easier to use than AnkiMobile on iPhone and iPad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. AnkiMobile is a capable tool but it comes with significant friction that many mobile users find frustrating: the iOS app costs $24.99 one-time (one of the most expensive apps on the App Store); syncing between desktop and mobile requires AnkiWeb setup; the interface is utilitarian and can be overwhelming for new users; and creating cards with formatting on mobile is cumbersome. Esli is a web app that works on any mobile browser (iOS Safari, Android Chrome) without a separate app install. It's completely free. Cards are in the cloud — no syncing required. AI generation means you get a full flashcard deck in seconds without manually creating each card. If you want something that works on your phone today without a learning curve, Esli is the faster path.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli have an iOS app or Android app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Esli is a progressive web app — it works in your mobile browser (Safari on iPhone, Chrome on Android) without requiring an App Store or Google Play install. You can add it to your home screen from your browser for an app-like experience. This means no download, no update management, and your decks are accessible from any device — phone, tablet, laptop — automatically synced because everything lives in the cloud. Mobile browser performance is smooth for studying flashcards, and the interface is designed to be thumb-friendly.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does Esli have that AnkiMobile does not?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The key differentiator is AI card generation. AnkiMobile requires you to create every card manually, or import pre-made decks (which may be outdated or not match your curriculum). Esli lets you type a topic — 'MCAT biochemistry: glycolysis' — and get a complete, high-quality flashcard deck in seconds. For PDF upload: drag a textbook chapter, lecture notes, or a research paper and Esli extracts the key concepts into flashcard form. This changes the time investment from hours of card creation to minutes of review. Other Esli advantages: completely free (no $24.99 app purchase), 14 interface languages, community/shared decks, and card translation into 13 languages for language learners.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli use the same spaced repetition algorithm as Anki?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Esli uses the SM-2 (SuperMemo 2) spaced repetition algorithm — the same core algorithm that Anki is based on. Both systems increase the review interval for cards you know well and surface difficult cards more frequently. The core spaced repetition logic is functionally equivalent. Anki also offers FSRS (Free Spaced Repetition Scheduler), a more recent algorithm, as an option in newer versions — Esli currently uses SM-2. For most users studying for exams, language learning, or professional certification, SM-2 is highly effective and the difference between algorithms is unlikely to meaningfully affect outcomes compared to study consistency.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I import my existing Anki decks into Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Esli supports CSV import, which means you can export your Anki deck as a CSV/text file and import the cards into Esli. Anki allows exporting decks as .txt files with tab-separated front/back fields — this format is importable into Esli. For decks with complex formatting, media, or custom note types, some manual cleanup may be needed. Alternatively, rather than migrating old Anki decks, many users find it faster to use Esli's AI generation to create new, well-structured decks for their current study topics — the result is often higher quality than cards imported from years-old Anki decks.",
      },
    },
  ],
}

type ComparisonRow = {
  feature: string
  esli: string
  esliPass: boolean
  anki: string
  ankiPass: boolean
}

const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Price (mobile)',
    esli: 'Free',
    esliPass: true,
    anki: '$24.99 one-time (iOS) / Free (Android)',
    ankiPass: false,
  },
  {
    feature: 'AI card generation',
    esli: 'Yes — type a topic or upload PDF',
    esliPass: true,
    anki: 'No — manual creation only',
    ankiPass: false,
  },
  {
    feature: 'Setup time',
    esli: 'Under 2 minutes — start in browser',
    esliPass: true,
    anki: '15-30 min — app install, AnkiWeb sync, profile setup',
    ankiPass: false,
  },
  {
    feature: 'Syncing across devices',
    esli: 'Automatic — cloud-native',
    esliPass: true,
    anki: 'Requires AnkiWeb setup and manual sync',
    ankiPass: false,
  },
  {
    feature: 'Spaced repetition algorithm',
    esli: 'SM-2',
    esliPass: true,
    anki: 'SM-2 + FSRS (more options)',
    ankiPass: true,
  },
  {
    feature: 'Deck customization',
    esli: 'Standard deck and card options',
    esliPass: true,
    anki: 'Extensive — custom note types, templates, add-ons',
    ankiPass: true,
  },
  {
    feature: 'Community decks',
    esli: '812+ curated cards in 13 shared decks',
    esliPass: true,
    anki: 'Thousands of user-submitted decks (variable quality)',
    ankiPass: true,
  },
  {
    feature: 'PDF upload for card generation',
    esli: 'Yes — AI extracts key concepts',
    esliPass: true,
    anki: 'No',
    ankiPass: false,
  },
  {
    feature: 'Interface languages',
    esli: '14 languages',
    esliPass: true,
    anki: 'English-primary (community translations available)',
    ankiPass: false,
  },
  {
    feature: 'Card translation',
    esli: '13 languages (MyMemory API)',
    esliPass: true,
    anki: 'No built-in translation',
    ankiPass: false,
  },
  {
    feature: 'Rich text / LaTeX / KaTeX math',
    esli: 'Yes — rich text editor with KaTeX',
    esliPass: true,
    anki: 'Yes — full LaTeX support',
    ankiPass: true,
  },
  {
    feature: 'Add-ons and extensions',
    esli: 'Browser extension (Chrome, Firefox, Edge)',
    esliPass: true,
    anki: 'Extensive desktop add-on ecosystem',
    ankiPass: true,
  },
]

const faqItems = faqSchema.mainEntity

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
                Honest Comparison
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Esli vs{' '}
                <span className="text-slate-500">AnkiMobile</span>
                <br />
                <span className="text-primary-600">Easier. Free. AI-powered.</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                AnkiMobile is powerful — but it costs $24.99, requires setup, and you create every card by hand. Esli is free, works instantly in your browser, and generates flashcard decks from any topic with AI.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Try Esli Free — No Download
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
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: 'Cost on mobile',
                  esliValue: 'Free',
                  ankiValue: '$24.99 (iOS)',
                  winner: 'esli',
                },
                {
                  label: 'Card creation',
                  esliValue: 'AI generates in seconds',
                  ankiValue: 'Manual, card by card',
                  winner: 'esli',
                },
                {
                  label: 'Setup required',
                  esliValue: 'None — open browser, start',
                  ankiValue: 'App + AnkiWeb + sync config',
                  winner: 'esli',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
                  <p className="text-xs font-medium text-slate-500 mb-4 uppercase tracking-wide">{item.label}</p>
                  <div className="space-y-3">
                    <div className="p-3 bg-primary-50 rounded-xl border border-primary-200">
                      <p className="text-xs text-primary-600 font-medium mb-1">Esli</p>
                      <p className="text-sm font-semibold text-slate-900">{item.esliValue}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-500 font-medium mb-1">AnkiMobile</p>
                      <p className="text-sm font-semibold text-slate-600">{item.ankiValue}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Full feature comparison
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                An honest look at where each app wins.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left pb-4 text-sm font-semibold text-slate-500 pr-8">Feature</th>
                    <th className="text-center pb-4 text-sm font-bold text-primary-700 px-4 min-w-[160px]">Esli</th>
                    <th className="text-center pb-4 text-sm font-semibold text-slate-500 px-4 min-w-[160px]">AnkiMobile</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="py-4 text-sm font-medium text-slate-700 pr-8">{row.feature}</td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {row.esliPass ? (
                            <Check size={16} className="text-primary-600 shrink-0" />
                          ) : (
                            <X size={16} className="text-slate-300 shrink-0" />
                          )}
                          <span className="text-xs text-slate-600 text-center leading-tight">{row.esli}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {row.ankiPass ? (
                            <Check size={16} className="text-slate-400 shrink-0" />
                          ) : (
                            <X size={16} className="text-slate-300 shrink-0" />
                          )}
                          <span className="text-xs text-slate-500 text-center leading-tight">{row.anki}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-base font-semibold text-slate-900 mb-2">When AnkiMobile is the better choice</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                AnkiMobile is the right tool if you are already invested in the Anki ecosystem with years of deck history and reviews, use advanced note types and custom templates, rely heavily on add-ons for specialized workflows (medical imaging cards, language audio), or need the FSRS algorithm. Anki's power-user depth is genuinely unmatched. For everyone else — students who want to start today, people who find Anki overwhelming, or anyone who wants AI generation instead of manual card creation — Esli is the faster path to actually studying.
              </p>
            </div>
          </div>
        </section>

        {/* AI generation highlight */}
        <section className="py-20 sm:py-28 bg-primary-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
              <Sparkles size={14} />
              The key difference
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Anki requires hours to build a deck.<br />
              Esli builds it in seconds.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Type any topic — "MCAT organic chemistry reactions", "N5 Japanese vocabulary", "AWS Solutions Architect key concepts" — and Esli's AI generates a complete, high-quality flashcard deck instantly. No manual card creation. No hunting for pre-made decks that may be outdated or wrong.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Try AI Generation Free
                <ArrowRight size={18} />
              </a>
              <p className="text-sm text-slate-500">No download. No signup required to start.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Esli vs AnkiMobile — FAQs
              </h2>
            </div>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
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
              Start studying in under 2 minutes
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              No app download. No $24.99 purchase. No manual card creation. Open Esli in your mobile browser and generate your first deck with AI — free.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Try Esli Free — No Download Needed
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
              <a href="/compare/esli-vs-anki" className="hover:text-white transition-colors no-underline">Esli vs Anki</a>
              <a href="/compare/esli-vs-quizlet" className="hover:text-white transition-colors no-underline">Esli vs Quizlet</a>
              <a href="/compare/esli-vs-brainscape" className="hover:text-white transition-colors no-underline">Esli vs Brainscape</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
