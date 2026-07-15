/**
 * SEO Landing Page: Esli vs Roam Research
 * Route: /compare/roam
 * Meta title: Esli vs Roam Research for Flashcards — Which Wins? | Esli (59 chars)
 * Meta description: Roam Research is powerful for networked thought. But for retention? Honest comparison — SRS, AI generation, ease of use. Free tool included. (147 chars)
 * Target keywords: Roam Research flashcards, Roam Research vs Anki, Roam Research spaced repetition, Roam Research alternative, bidirectional links flashcards
 * Week: 2026-W29
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
      name: 'Does Roam Research have built-in spaced repetition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Roam has a basic delta (Δ) review system, but it is not a full SM-2 spaced repetition implementation. It lacks the interval scheduling, ease ratings, and adaptive algorithm that proper SRS tools provide. Many Roam users supplement it with Anki (via plugins) or a dedicated SRS app for actual retention. Esli has full SM-2 spaced repetition built in from day one.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I export my Roam Research notes to Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Export your Roam graph as Markdown or JSON, then upload the relevant pages as PDFs or text files to Esli. The AI reads your notes and generates flashcards from them. This is a popular workflow: use Roam for networked note-taking and processing, then pipe the distilled concepts into Esli for spaced repetition review.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Roam Research worth the price compared to Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Roam Research is $15/month (or $165/year). It's worth it if you need a connected knowledge graph with bidirectional links, block references, and daily notes. It is not the right tool if your primary goal is retention — that's a flashcard app's job. Esli is free and purpose-built for retention. Many users use both: Roam for thinking and writing, Esli for remembering.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does Roam Research do better than Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Roam is significantly better for networked thought — bidirectional links, block references, and graph view make it ideal for connecting ideas across notes. It's a powerful thinking environment for researchers and writers. Roam's daily notes system and structured journaling workflows have no equivalent in Esli. If you want a personal knowledge management (PKM) system, Roam wins. If you want to memorize and retain information, Esli wins.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Roam Research AND Esli together?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — this is the recommended approach for knowledge workers who want both connected thinking and durable retention. Use Roam to process, connect, and synthesize ideas. When you identify concepts you need to memorize (vocabulary, formulas, definitions, frameworks), generate flashcards in Esli — either by typing the concept or uploading your Roam export PDF. Roam handles the graph; Esli handles the memory.",
      },
    },
  ],
}

const comparisonRows = [
  { feature: 'AI flashcard generation', esli: true, roam: false, note: 'Type a topic, get cards in seconds' },
  { feature: 'Spaced repetition (SM-2)', esli: true, roam: false, note: "Roam's delta review is basic, not adaptive SRS" },
  { feature: 'PDF to flashcards', esli: true, roam: false, note: 'Esli: upload PDF, get a deck' },
  { feature: 'Interactive flip cards', esli: true, roam: false, note: '' },
  { feature: 'Free plan available', esli: true, roam: false, note: 'Roam is $15/mo or $165/yr' },
  { feature: 'Guest mode (no signup)', esli: true, roam: false, note: '' },
  { feature: 'Browser extension', esli: true, roam: false, note: '' },
  { feature: 'Bidirectional links', esli: false, roam: true, note: "Roam's core strength" },
  { feature: 'Block references', esli: false, roam: true, note: '' },
  { feature: 'Knowledge graph view', esli: false, roam: true, note: '' },
  { feature: 'Daily notes system', esli: false, roam: true, note: '' },
  { feature: 'Outline-based editor', esli: false, roam: true, note: '' },
]

export default function EsliVsRoamPage() {
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
                <span className="text-primary-600">Roam Research</span>
                {' '}for Flashcards
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Roam Research is a brilliant tool for networked thinking. But for actually remembering what you learn? That's a different job — and the wrong tool for it. Honest breakdown, no hype.
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

        {/* Key Difference Callout */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-2xl border border-slate-200">
                <div className="text-2xl font-bold text-slate-900 mb-2">Roam Research</div>
                <p className="text-slate-500 text-sm mb-4">Personal knowledge management</p>
                <p className="text-slate-700 leading-relaxed">
                  Roam excels at connecting ideas. Bidirectional links, block references, and a graph view make it one of the best tools for networked thinking, research, and writing. It captures relationships between concepts brilliantly.
                </p>
                <p className="mt-4 text-slate-500 text-sm">
                  What it doesn't do well: actually making you remember those ideas long-term. Basic review, no adaptive SRS, $15/month.
                </p>
              </div>
              <div className="p-8 bg-primary-600 rounded-2xl text-white">
                <div className="text-2xl font-bold mb-2">Esli</div>
                <p className="text-primary-200 text-sm mb-4">AI flashcards with spaced repetition</p>
                <p className="text-primary-100 leading-relaxed">
                  Esli is purpose-built for one thing: getting information from your notes into long-term memory. AI generates flashcards from any topic or PDF in seconds, and SM-2 spaced repetition schedules review at the optimal moment.
                </p>
                <p className="mt-4 text-primary-200 text-sm">
                  What it doesn't do well: networked note-taking, bidirectional links, or being a thinking environment. That's not the goal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-20 sm:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Feature comparison
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-4 px-4 text-slate-500 font-medium w-1/2">Feature</th>
                    <th className="text-center py-4 px-4 text-primary-600 font-semibold w-1/4">Esli</th>
                    <th className="text-center py-4 px-4 text-slate-600 font-semibold w-1/4">Roam Research</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}`}>
                      <td className="py-4 px-4 text-slate-700 font-medium">
                        {row.feature}
                        {row.note && <span className="block text-xs text-slate-400 font-normal mt-0.5">{row.note}</span>}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.esli
                          ? <Check size={18} className="text-primary-600 mx-auto" />
                          : <X size={18} className="text-slate-300 mx-auto" />}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.roam
                          ? <Check size={18} className="text-slate-600 mx-auto" />
                          : <X size={18} className="text-slate-300 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Which Should You Use */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Which should you use?
              </h2>
            </div>

            <div className="space-y-4 mb-12">
              {[
                { condition: 'You want to connect ideas, do research, and write', pick: 'Roam', color: 'slate' },
                { condition: 'You want to memorize vocabulary, concepts, or exam material', pick: 'Esli', color: 'primary' },
                { condition: "You're a student who needs to retain course content", pick: 'Esli', color: 'primary' },
                { condition: "You're a researcher who wants to see connections between ideas", pick: 'Roam', color: 'slate' },
                { condition: "You want free and no setup required", pick: 'Esli', color: 'primary' },
                { condition: 'You want a long-term personal knowledge graph', pick: 'Roam', color: 'slate' },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200">
                  <p className="flex-1 text-slate-700 text-sm">{row.condition}</p>
                  <span className={`shrink-0 px-3 py-1 text-xs font-semibold rounded-full ${
                    row.color === 'primary'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    Use {row.pick}
                  </span>
                </div>
              ))}
            </div>

            {/* You don't have to choose */}
            <div className="p-8 bg-white rounded-2xl border-2 border-primary-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Or use both — they complement each other perfectly
              </h3>
              <p className="text-slate-600 leading-relaxed">
                The most effective workflow for knowledge workers: use Roam to think, connect, and write. When you identify something you need to permanently remember — a concept, a definition, a framework — export it to Esli and let spaced repetition handle retention. Roam builds your knowledge graph; Esli moves it into long-term memory.
              </p>
              <p className="mt-4 text-slate-500 text-sm">
                You can upload your Roam export as a PDF to Esli and generate flashcards from your own notes.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Roam Research vs Esli FAQs
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
              Add a retention layer to your PKM workflow
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Keep using Roam for networked thinking. Use Esli to make sure you actually remember what you learn. Free, no credit card required.
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
              <a href="/compare/obsidian" className="hover:text-white transition-colors no-underline">Esli vs Obsidian</a>
              <a href="/compare/notion" className="hover:text-white transition-colors no-underline">Esli vs Notion AI</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
