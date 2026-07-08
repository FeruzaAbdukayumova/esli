/**
 * SEO Landing Page: Economics Flashcards
 * Route: /flashcards/economics
 * Meta title: Economics Flashcards Free — AI Generator | Esli (50 chars)
 * Meta description: Generate economics flashcards with AI. AP Macro, AP Micro, GDP, monetary policy — free, spaced repetition. No signup needed. (130 chars)
 * Target keywords: economics flashcards, macroeconomics flashcards, AP Macroeconomics flashcards, microeconomics flashcards, economics study cards AI
 * Week: 2026-W28
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
      name: 'Can I use Esli for both AP Macroeconomics and AP Microeconomics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Just specify the unit and section in your topic prompt — "AP Macroeconomics Unit 3: National Income and Price Determination" or "AP Microeconomics market structures and elasticity." Esli generates cards aligned with College Board content outlines. You can build separate decks for each AP course and review them independently.',
      },
    },
    {
      '@type': 'Question',
      name: 'What economics textbooks can I upload as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Any PDF works — Mankiw's Principles of Economics, Krugman's Economics, Varian's Intermediate Microeconomics, or your professor's lecture slides. Upload the chapter and Esli extracts the key concepts, definitions, and models into flashcard Q&A pairs automatically.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I make flashcards for economics graphs and diagrams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Describe the graph in your prompt or ask specifically: "AD-AS model: what shifts aggregate demand right and left?", "supply and demand: price ceiling effects", "Laffer curve: revenue maximizing tax rate concept." Esli generates cards that describe the visual relationship in words, so you can recall the shape and interpretation without seeing the graph.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli good for studying game theory and advanced economics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Graduate-level topics work just as well as introductory ones. Try prompts like \"Nash equilibrium and dominant strategies\", \"prisoner's dilemma payoff matrix\", \"mechanism design and incentive compatibility\", or \"econometrics: OLS assumptions and violations.\" The AI adapts to the level of complexity you specify.",
      },
    },
    {
      '@type': 'Question',
      name: 'How many economics flashcards can I generate for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Esli's free plan lets you generate and study flashcards with no card limit and no credit card required. You can create decks for every economics unit you're studying. Guest mode means you don't even need to sign up to try it — just visit app.esli.app and start generating.",
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the law of demand? Why does the demand curve slope downward?',
    a: 'As price increases, quantity demanded decreases (ceteris paribus). Two reasons: substitution effect (higher price makes alternatives more attractive) and income effect (higher price reduces real purchasing power). The demand curve slopes downward left to right.',
  },
  {
    q: 'What does GDP measure? Write the expenditure formula.',
    a: 'GDP measures the total market value of all final goods and services produced within a country in a given period. Expenditure formula: GDP = C + I + G + (X − M). C = consumer spending, I = business investment, G = government spending, X − M = net exports (exports minus imports).',
  },
  {
    q: 'What is the difference between monetary policy and fiscal policy?',
    a: 'Monetary policy: controlled by the central bank (e.g. the Federal Reserve). Tools — interest rates, reserve requirements, open market operations. Goal: control inflation and employment. Fiscal policy: controlled by the government. Tools — taxation and spending. Goal: stimulate or cool the economy. Both target aggregate demand but through different channels.',
  },
  {
    q: 'Name the four market structures and their key characteristics.',
    a: '1. Perfect competition: many firms, identical products, price takers, no barriers. 2. Monopolistic competition: many firms, differentiated products, some pricing power. 3. Oligopoly: few large firms, high barriers to entry, interdependence (game theory). 4. Monopoly: single seller, unique product, price maker, high barriers.',
  },
  {
    q: 'What is the spending multiplier? How is it calculated?',
    a: 'An initial injection of spending generates additional rounds of spending as recipients spend part of their income. Multiplier = 1 / (1 − MPC) where MPC is the marginal propensity to consume. If MPC = 0.8, multiplier = 1 / 0.2 = 5. A $100 injection ultimately increases GDP by $500.',
  },
  {
    q: 'What is opportunity cost? Give an example.',
    a: 'The value of the best alternative forgone when making a choice. If you spend an hour studying economics, the opportunity cost is whatever else you would have done with that hour (e.g. earning $15 at work). Opportunity cost is the foundation of economic reasoning — it explains why "there is no such thing as a free lunch."',
  },
]

const benefits = [
  {
    title: 'AP Macro and AP Micro fully covered',
    body: 'Generate cards for any College Board unit — supply and demand, elasticity, macroeconomic indicators, monetary and fiscal policy, international trade. Specify the exact unit for targeted decks.',
  },
  {
    title: 'Upload your textbook or lecture slides',
    body: 'Turn Mankiw, Krugman, Varian, or your professor\'s slides into a flashcard deck instantly. Upload any PDF and Esli extracts key concepts, definitions, and models automatically.',
  },
  {
    title: 'Graphs and models in words',
    body: 'Describe any economic graph in a prompt — AD-AS, Phillips curve, production possibilities frontier — and get flashcards that let you recall the visual relationship without seeing the diagram.',
  },
  {
    title: 'From intro to graduate level',
    body: 'Works for Econ 101 and for game theory, econometrics, or development economics at the PhD level. The AI calibrates card complexity to whatever level you specify in your prompt.',
  },
]

export default function EconomicsFlashcardsPage() {
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
                <span className="text-primary-600">Economics</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any economics topic — AP Macro, microeconomics models, GDP, monetary policy, game theory — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Supply & Demand', 'Macroeconomics', 'Microeconomics', 'AP Macro', 'GDP & Growth', 'Monetary Policy', 'Market Structures', 'Game Theory'].map((tag) => (
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
                  Generate Economics Flashcards Free
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
                Master economics concepts in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From a topic or PDF to a full study deck — faster than any textbook highlight.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your economics topic',
                  body: 'Enter "AP Macroeconomics fiscal policy", "elasticity of demand", "market structures and competition", or upload a PDF of your textbook chapter.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering definitions, formulas, models, and cause-and-effect relationships — calibrated to your level from introductory to graduate.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm resurfaces concepts at the right time — terms you struggle with come back sooner, concepts you know are spaced further out.',
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
                Example economics flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Click any card to flip it and see the answer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-48 cursor-pointer [perspective:1200px]"
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
                Generate Your Economics Deck Free
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
                Why economics students choose Esli
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
                Economics flashcard FAQs
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
              Start mastering economics today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Type any economics topic and get a complete flashcard deck in seconds. Free forever — no credit card needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Economics Flashcards Free
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
              <a href="/flashcards/microeconomics" className="hover:text-white transition-colors no-underline">Microeconomics Flashcards</a>
              <a href="/flashcards/sat-vocabulary" className="hover:text-white transition-colors no-underline">SAT Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
