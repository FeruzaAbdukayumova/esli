/**
 * SEO Landing Page: Esli vs ChatGPT for Flashcards
 * Route: /compare/esli-vs-chatgpt-flashcards
 * Meta title: Esli vs ChatGPT for Flashcards — Which is Better? (52 chars)
 * Meta description: ChatGPT can make flashcards but has no spaced repetition, no scheduling, and no deck management. See why Esli is the better choice. (133 chars)
 * Target keywords: ChatGPT flashcard alternative, better than ChatGPT for flashcards, AI flashcard app vs ChatGPT, ChatGPT vs Anki alternative
 * Week: 2026-W36
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, ChevronDown, Check, X, Minus } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can ChatGPT make flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, ChatGPT can generate flashcard-style content. You can paste a text and ask 'Make 20 flashcards from this' and ChatGPT will produce a numbered list of question-and-answer pairs. The quality is often good for conceptual topics. The limitation is everything that happens after generation: ChatGPT has no flashcard review system, no spaced repetition scheduling, no deck storage, no progress tracking, and no way to study the cards interactively inside the tool. You would need to copy the output into another app (Anki, Quizlet, or Esli) to actually use them as flashcards. Esli solves this by combining AI generation with a built-in spaced repetition study system — you type a topic and get cards you can immediately start studying, without any copying or pasting.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does Esli have that ChatGPT does not for studying?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Esli has: (1) Built-in spaced repetition scheduling (SM-2 algorithm) — cards are automatically scheduled for review at the optimal interval before you forget them. ChatGPT has no study scheduling at all. (2) Interactive card flip interface — tap to reveal the answer, then rate your recall. ChatGPT shows a numbered list. (3) Persistent deck storage — your decks are saved and available on any device. ChatGPT conversation history is searchable but not structured as reviewable decks. (4) Progress tracking — Esli tracks which cards you know and which you need to review more. (5) PDF upload — drop any PDF and get flashcards from its content. ChatGPT Plus also has this, but the output must still be exported. (6) 14 interface languages + 13-language card translation. (7) Community decks — 812+ premade cards across shared decks. (8) Browser extension for saving vocabulary while browsing.",
      },
    },
    {
      '@type': 'Question',
      name: 'When is ChatGPT better than Esli for making flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "ChatGPT is better than Esli when: (1) You want highly customized formatting — ChatGPT can produce cards in any format you describe, including tables, cloze deletions with specific syntax, or cards paired with code blocks for programming practice. (2) You want to ask follow-up questions while generating — 'Make cards, but explain the 3rd concept in more depth first.' ChatGPT is conversational; Esli is purpose-built for a specific workflow. (3) You want to generate a large number of cards that you will then import into Anki with a specific note type. (4) You are experimenting with card structure for a new subject and want to iterate quickly in conversation. For these cases, using ChatGPT to draft the content and then importing it into Esli or Anki gives you the best of both tools.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli compare to ChatGPT Plus for PDF flashcard generation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Both Esli (free) and ChatGPT Plus ($20/month) can upload a PDF and generate flashcard content from it. The differences: ChatGPT Plus outputs the cards in a conversation as text — you then need to copy them somewhere to actually study them. Esli outputs cards directly into its flashcard study interface — you can start studying with spaced repetition immediately after generation. Esli is free; ChatGPT Plus costs $20/month. Esli is purpose-built for spaced repetition learning; ChatGPT is a general-purpose chat tool that happens to be able to generate flashcards when asked. For most students, Esli is the better choice for PDF-to-flashcards specifically because the workflow ends in a working study deck rather than a block of text in a conversation window.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free compared to ChatGPT Plus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is free — no credit card required. This includes AI flashcard generation, spaced repetition scheduling, PDF upload, and community decks. ChatGPT Plus costs $20/month for advanced features including PDF upload and GPT-4. For students who are using ChatGPT mainly to generate flashcards, Esli provides that specific workflow for free with the addition of the study system that ChatGPT lacks. Guest mode means you can start using Esli immediately without even creating an account.',
      },
    },
  ],
}

type FeatureStatus = 'yes' | 'no' | 'partial'

interface Feature {
  feature: string
  esli: FeatureStatus
  chatgpt: FeatureStatus
  note: string
}

const comparisonFeatures: Feature[] = [
  { feature: 'AI flashcard generation from a topic', esli: 'yes', chatgpt: 'yes', note: 'Both generate cards from typed topics' },
  { feature: 'AI flashcard generation from PDF', esli: 'yes', chatgpt: 'partial', note: 'ChatGPT Plus ($20/mo) only; Esli is free' },
  { feature: 'Spaced repetition scheduling (SM-2)', esli: 'yes', chatgpt: 'no', note: 'Esli only — core differentiator' },
  { feature: 'Interactive card flip interface', esli: 'yes', chatgpt: 'no', note: 'ChatGPT outputs a numbered text list' },
  { feature: 'Persistent deck storage', esli: 'yes', chatgpt: 'no', note: 'ChatGPT shows cards only in conversation' },
  { feature: 'Progress tracking & recall scoring', esli: 'yes', chatgpt: 'no', note: 'Esli tracks which cards you struggle with' },
  { feature: 'Community / premade decks', esli: 'yes', chatgpt: 'no', note: '812+ premade cards in Esli' },
  { feature: 'Browser extension', esli: 'yes', chatgpt: 'no', note: 'Chrome, Firefox, Edge, Brave' },
  { feature: 'Card translation (13 languages)', esli: 'yes', chatgpt: 'partial', note: 'ChatGPT can translate but it is manual' },
  { feature: '14 interface languages', esli: 'yes', chatgpt: 'partial', note: 'ChatGPT responds in your language but UI is English' },
  { feature: 'Free to use', esli: 'yes', chatgpt: 'partial', note: 'ChatGPT free tier exists; PDF upload requires Plus ($20/mo)' },
  { feature: 'Conversational follow-up during generation', esli: 'no', chatgpt: 'yes', note: "ChatGPT's conversational format is better for iteration" },
  { feature: 'Custom card formatting / cloze syntax', esli: 'partial', chatgpt: 'yes', note: 'ChatGPT allows arbitrary format instructions' },
  { feature: 'General knowledge Q&A while studying', esli: 'no', chatgpt: 'yes', note: 'ChatGPT is a general-purpose assistant' },
]

function StatusIcon({ status }: { status: FeatureStatus }) {
  if (status === 'yes') return <Check size={18} className="text-green-600 mx-auto" />
  if (status === 'no') return <X size={18} className="text-red-400 mx-auto" />
  return <Minus size={18} className="text-amber-500 mx-auto" />
}

export default function EsliVsChatGPTFlashcardsPage() {
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                <Sparkles size={14} />
                Honest Comparison
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Esli vs ChatGPT{' '}
                <span className="text-primary-600">for Flashcards</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                ChatGPT can generate flashcard content. But it has no spaced repetition, no deck storage, and no study system. Here is an honest side-by-side comparison.
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
                  href="#comparison-table"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Full Comparison
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Key Differences */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                The core difference
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                ChatGPT is a text generator. Esli is a learning system.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: 'Spaced repetition',
                  esli: 'SM-2 algorithm schedules every review automatically — daily, optimal timing.',
                  chatgpt: 'No review system. Cards exist only in the conversation window.',
                },
                {
                  title: 'Study interface',
                  esli: 'Interactive flip cards with recall rating — tap to reveal, mark easy / hard.',
                  chatgpt: 'Numbered text list in a chat. Copy-paste required to study interactively.',
                },
                {
                  title: 'Price',
                  esli: 'Free — including AI generation and PDF upload. No credit card.',
                  chatgpt: 'Free tier exists. PDF upload requires ChatGPT Plus at $20/month.',
                },
              ].map((d, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="px-5 py-3 bg-slate-100 border-b border-slate-200">
                    <p className="text-sm font-semibold text-slate-700">{d.title}</p>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-primary-600 mb-1">Esli</p>
                      <p className="text-sm text-slate-700">{d.esli}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 mb-1">ChatGPT</p>
                      <p className="text-sm text-slate-500">{d.chatgpt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison-table" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Full feature comparison
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                An honest look at what each tool offers.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full max-w-3xl mx-auto border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 w-1/2">Feature</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-primary-600 w-1/4">Esli</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-slate-500 w-1/4">ChatGPT</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}`}>
                      <td className="py-3 px-4">
                        <p className="text-sm text-slate-800">{row.feature}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{row.note}</p>
                      </td>
                      <td className="py-3 px-4 text-center"><StatusIcon status={row.esli} /></td>
                      <td className="py-3 px-4 text-center"><StatusIcon status={row.chatgpt} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-center text-xs text-slate-400 mt-4">
                <Check size={12} className="inline text-green-600" /> = Yes &nbsp;
                <Minus size={12} className="inline text-amber-500" /> = Partial &nbsp;
                <X size={12} className="inline text-red-400" /> = No
              </p>
            </div>
          </div>
        </section>

        {/* When ChatGPT is better */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                When ChatGPT is the better choice
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                We are being honest — ChatGPT genuinely beats Esli in a few scenarios.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'You want highly customized card formats',
                  body: 'ChatGPT lets you describe any card structure — cloze deletions with {{c1::}} syntax for Anki import, cards with code blocks, table-formatted cards. Esli generates standard Q&A format.',
                },
                {
                  title: 'You want to iterate in conversation while generating',
                  body: '"Make 10 cards, but explain concept 3 in more depth before making the card." ChatGPT is conversational. Esli is purpose-built for generating a deck from a prompt, not conversational iteration.',
                },
                {
                  title: 'You plan to import into Anki with a specific note type',
                  body: 'Advanced Anki users with custom note types often use ChatGPT to generate the content, then import it manually. Esli is better if you want to study within Esli itself.',
                },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white rounded-xl border border-slate-200">
                  <h3 className="text-base font-semibold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
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
                Esli vs ChatGPT — common questions
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
              Try the flashcard app built for studying
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              AI generation + spaced repetition in one place. Free forever — no ChatGPT Plus subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Try Esli Free — No Signup Required
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
              <a href="/compare/esli-vs-anki-mobile" className="hover:text-white transition-colors no-underline">Esli vs Anki Mobile</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
