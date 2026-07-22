/**
 * SEO Landing Page: Business English Vocabulary Flashcards
 * Route: /flashcards/business-english
 * Meta title: Business English Flashcards Free — AI | Esli (51 chars)
 * Meta description: Generate business English vocabulary flashcards with AI. Meetings, negotiation, presentations, emails — free, spaced repetition. (131 chars)
 * Target keywords: business English vocabulary flashcards, professional English flashcards, corporate English vocabulary, business English study cards
 * Week: 2026-W30
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
      name: 'Can Esli generate business English vocabulary flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type any business English topic into Esli — "negotiation vocabulary", "email writing phrases", "presentation language", "business meetings phrases", "financial reporting vocabulary" — and get a complete flashcard deck in seconds. You can also upload your business English textbook, course PDFs, or even a real email template to extract vocabulary from real professional documents.',
      },
    },
    {
      '@type': 'Question',
      name: 'What business English topics work best for flashcard study?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-value topics: formal vs informal email registers, signposting language for presentations ('Firstly', 'Building on that', 'To summarise'), negotiation phrases (proposing, countering, agreeing), meeting language (chairing, turn-taking, action items), business idioms and phrasal verbs, financial vocabulary (revenue, EBITDA, forecast), HR vocabulary (onboarding, performance review). Specific context prompts produce the most useful cards: 'Phrases for disagreeing politely in a business meeting' rather than just 'business vocabulary'.",
      },
    },
    {
      '@type': 'Question',
      name: 'I already speak English. Why do I need business English flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Business English is a register — a specific style and vocabulary set used in professional contexts — separate from everyday conversational English. Even native speakers benefit from learning formal presentation structures, negotiation tactics, and industry-specific jargon. For non-native professionals, the gap is even larger: passive vocabulary knowledge isn't the same as being able to produce these phrases under pressure in a meeting or call. Spaced repetition bridges that gap by moving phrases from recognition to active use.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload a business English course PDF to generate flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Upload any business English PDF — Business Vocabulary in Use (Cambridge), Market Leader, professional email guides, your company's style guide, or even a real business document from your industry — and Esli extracts vocabulary, phrases, and expressions into a structured deck ready for spaced repetition.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for business English learners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes AI flashcard generation, spaced repetition, and no signup requirement. Generate as many business English decks as you need — by topic, register, or situation — and study with the SM-2 spaced repetition algorithm that builds long-term vocabulary retention. Guest mode means you can start studying immediately without creating an account.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What phrase do you use to diplomatically disagree in a business meeting?',
    a: "Diplomatic disagreement phrases: 'I see your point, however...' / 'That's an interesting perspective — I'd like to add a different angle.' / 'I'm not sure I fully agree on that point.' / 'I take your point, but have we considered...?' / 'With respect, I think there's another way to look at this.' Avoid blunt 'No' or 'You're wrong' — use softeners (I see, I understand) + pivot (however, but, though) + your point.",
  },
  {
    q: 'What are signposting phrases for a business presentation?',
    a: "Opening: 'I'd like to start by...', 'The aim of today's presentation is...' Sequencing: 'Firstly... Secondly... Finally...', 'Moving on to...' Referring to visuals: 'As you can see from this chart...', 'This slide shows...' Summarizing: 'To recap...', 'In summary...' Transitioning: 'Building on that...', 'That brings me to my next point.' Closing: 'To conclude...', 'I'd now like to open the floor to questions.'",
  },
  {
    q: 'What does EBITDA stand for and why is it used?',
    a: "EBITDA: Earnings Before Interest, Taxes, Depreciation, and Amortization. Used as a proxy for a company's core operational profitability, stripping out financing decisions (interest), tax environments (taxes), and non-cash accounting charges (depreciation, amortization). Preferred in M&A and investment analysis because it allows comparison across companies with different capital structures and tax jurisdictions. Limitation: excludes real cash costs like capital expenditure (CapEx) — critics call it 'earnings before the bad stuff'.",
  },
  {
    q: "What is the difference between 'revenue', 'gross profit', and 'net profit'?",
    a: "Revenue (top line): total income from sales before any deductions. Gross profit: revenue minus cost of goods sold (COGS) — measures production efficiency. Gross margin = gross profit / revenue. Operating profit (EBIT): gross profit minus operating expenses (SG&A, R&D) — measures operational efficiency. Net profit (bottom line): operating profit minus interest and taxes — what the company actually keeps. Key phrase: 'Revenue is vanity, profit is sanity, cash is reality.'",
  },
  {
    q: 'What phrases do you use to chair a meeting professionally?',
    a: "Opening: 'Right, let's get started. We have [time] today to cover [agenda].' Giving the floor: 'I'd like to hand over to [name].' Managing time: 'We're running short on time — let's table that for later.' Encouraging input: 'Does anyone have anything to add?' Summarizing decisions: 'So we've agreed that...' Assigning actions: '[Name] will [action] by [date].' Closing: 'That's everything on the agenda. I'll send around the minutes. Thank you all.'",
  },
  {
    q: 'What is the difference between a formal and informal email register in business English?',
    a: "Formal register: used with clients, senior management, new contacts. Features: full sentences, no contractions ('I am' not 'I'm'), formal salutations ('Dear Mr. Smith'), professional vocabulary ('Please find attached'), passive voice, hedging language ('It would be appreciated if...'). Informal register: used with colleagues you know well. Features: contractions OK, first names, direct requests ('Can you send me...'), conversational phrases ('Just a heads-up'). Match the register to your relationship and the stakes of the message.",
  },
]

const benefits = [
  {
    title: 'Situation-specific vocabulary, not generic word lists',
    body: "Generate decks for specific contexts: 'negotiation vocabulary for sales calls', 'phrases for performance review conversations', 'email vocabulary for declining requests politely', 'financial reporting language for investor updates'. The more specific the prompt, the more useful the cards.",
  },
  {
    title: 'Build active production, not just passive recognition',
    body: 'Spaced repetition trains your brain to retrieve vocabulary under pressure — exactly what you need when you are on a call or in a meeting, not just reading a document.',
  },
  {
    title: 'Upload real business documents and extract vocabulary',
    body: 'Upload your company style guide, a market report, a sales pitch deck, or a business English textbook — Esli extracts the key phrases and expressions into a structured deck.',
  },
  {
    title: 'Covers all business English contexts',
    body: 'Negotiations, presentations, email writing, meetings, job interviews, performance reviews, financial reporting, project management. Generate targeted decks for each situation in minutes.',
  },
]

export default function BusinessEnglishFlashcardsPage() {
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
                Generate{' '}
                <span className="text-primary-600">Business English</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any business English topic — negotiation phrases, email vocabulary, presentation language, meeting idioms — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Negotiations', 'Presentations', 'Email Writing', 'Meetings', 'Financial English', 'Job Interviews', 'Project Management', 'Corporate Vocabulary'].map((tag) => (
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
                  Generate Business English Flashcards Free
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
                Build professional vocabulary in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From meeting phrases to financial reporting language — generate, study, and use.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your business English topic',
                  body: 'Enter "Phrases for presenting data in a board meeting", "Negotiation vocabulary for sales", or upload a business English textbook PDF or company style guide.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates context-specific cards covering phrases, vocabulary, and usage examples — not generic word lists, but situational language you can actually use.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules reviews at optimal intervals, moving phrases from passive recognition into active memory — ready to use under pressure.',
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
                Example business English flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Click any card to flip it and see the answer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-52 cursor-pointer [perspective:1200px]"
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
                    <div className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200 shadow-md flex flex-col items-start justify-start p-5 overflow-y-auto [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-xs text-primary-500 mb-2">Answer</p>
                      <p className="text-xs text-slate-700 leading-relaxed">{card.a}</p>
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
                Generate Your Business English Deck Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why professionals choose Esli for business English
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

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Business English flashcard FAQs
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
              Sound more professional from day one
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate business English flashcards for any context in seconds. Free forever — no credit card required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Business English Flashcards Free
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
              <a href="/flashcards/ielts" className="hover:text-white transition-colors no-underline">IELTS Flashcards</a>
              <a href="/flashcards/toefl" className="hover:text-white transition-colors no-underline">TOEFL Flashcards</a>
              <a href="/use-case/professionals" className="hover:text-white transition-colors no-underline">Flashcards for Professionals</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
