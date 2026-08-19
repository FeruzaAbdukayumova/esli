/**
 * SEO Landing Page: AP Human Geography Flashcards
 * Route: /flashcards/ap-human-geography
 * Meta title: AP Human Geography Flashcards Free — AI | Esli
 * Meta description: Generate AP Human Geography flashcards with AI. Key terms, models, FRQs — free, spaced repetition. Ace the AP HuGe exam. No signup.
 * Target keywords: AP Human Geography flashcards, AP HuGe flashcards, human geography study cards,
 *   AP HuGe exam prep, human geography key terms, AP Human Geography review
 * Week: 2026-W34
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
      name: 'Are AP Human Geography flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited AP Human Geography flashcards with AI and study with spaced repetition — no credit card, no account required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which AP Human Geography units can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All 7 units: Unit 1 Thinking Geographically, Unit 2 Population & Migration, Unit 3 Cultural Patterns, Unit 4 Political Organization of Space, Unit 5 Agriculture & Rural Land Use, Unit 6 Cities & Urban Land Use, Unit 7 Industrial & Economic Development. Just type the unit or specific term.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me with AP Human Geography models like Von Thunen or Burgess?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "Von Thunen model flashcards" or "urban land use models" and Esli generates cards that explain each model, its assumptions, limitations, and how to apply it to FRQ scenarios. Spatial models are a consistent high-frequency AP exam topic.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use Esli to prep for AP HuGe FRQs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type "AP Human Geography FRQ vocabulary" or specific FRQ themes (e.g., "globalization and cultural diffusion FRQ terms"). Esli generates definition cards that reinforce the precise language AP graders look for. Knowing definitions cold lets you write FRQ responses faster and with more precision.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli useful for AP Human Geography students taking the course for the first time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Definitely. AP Human Geography introduces a large volume of new vocabulary (diffusion types, migration push/pull, land use patterns, demographic models) early in the course. Esli helps you build that vocabulary with spaced repetition so you\'re not cramming before the May exam.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the difference between relocation diffusion and expansion diffusion? Give an example of each.',
    a: 'Relocation diffusion: idea/practice moves when people physically relocate (e.g., immigrants bring their religion to a new country). Expansion diffusion: spreads outward from origin while source retains it. Subtypes: contagious (wave-like, proximity-based), hierarchical (city to city, then rural), stimulus (idea adapts). Example of stimulus: McDonald\'s adapts its menu (no beef in India) while the fast-food concept expands globally.',
  },
  {
    q: 'Describe the Demographic Transition Model (DTM). What defines each stage?',
    a: 'Stage 1: High CBR + CDR, low natural increase (pre-industrial). Stage 2: CDR falls (medicine, sanitation), CBR stays high — population explosion (developing countries). Stage 3: CBR begins to fall (urbanization, education), growth slows. Stage 4: Low CBR + CDR, stable population (developed countries). Stage 5 (proposed): CBR < CDR, natural decrease (parts of Europe, Japan).',
  },
  {
    q: 'Explain the Von Thunen model of agricultural land use.',
    a: 'Concentric ring model around a central market city. Inner ring: dairy & market gardening (perishable, high transport cost). Second ring: forest/timber (heavy, bulky). Third ring: crops (grain, field crops). Outer ring: ranching/grazing (low value, low transport cost). Assumptions: flat isotropic plain, single market, rational farmers minimizing transport costs. Critique: ignores terrain, multiple markets, and modern refrigeration.',
  },
  {
    q: 'What is the rank-size rule and how does the primate city pattern differ?',
    a: 'Rank-size rule: the nth-largest city in a country has 1/n the population of the largest city (e.g., #2 city = 1/2 population of #1). Primate city: the largest city is disproportionately large relative to the next-largest — often 2-3x bigger, concentrating political, economic, and cultural power. Example primate cities: Bangkok (Thailand), Paris (France historically), Mexico City.',
  },
  {
    q: 'Define the concept of "supranationalism" and give two examples of supranational organizations.',
    a: 'Supranationalism: political, economic, or cultural cooperation between states that supersedes national authority in defined areas. States voluntarily cede some sovereignty. Examples: European Union (EU) — common market, single currency, free movement; United Nations (UN) — collective security, human rights norms; WTO — trade dispute arbitration. Tension: supranationalism vs. devolution (centrifugal forces pulling sovereignty back to regional/ethnic groups).',
  },
  {
    q: 'What is Wallerstein\'s World Systems Theory? Name the three tiers.',
    a: 'World Systems Theory: global economy divided into hierarchical tiers based on economic development and dependency. Core countries: high-income, tech-intensive, capital-rich (USA, Germany, Japan). Semi-periphery: industrializing, middle-income, mix of core and periphery characteristics (Brazil, China, Mexico). Periphery: low-income, export raw materials, labor-intensive (parts of Sub-Saharan Africa, SE Asia). Core extracts value from periphery through trade terms.',
  },
]

const benefits = [
  {
    title: 'Covers all 7 AP HuGe units',
    body: 'From population pyramids and migration theory to urban models and economic development — AI generates cards for any unit or specific vocabulary list.',
  },
  {
    title: 'Model-focused card format',
    body: 'Von Thunen, Burgess, Rostow, DTM — cards structured to explain assumptions, predictions, and critiques. The format AP graders test in FRQs.',
  },
  {
    title: 'Upload your review packet or textbook chapter',
    body: 'Turn your Barron\'s prep book pages, AMSCO chapter, or teacher review packet into a complete flashcard deck automatically.',
  },
  {
    title: 'Spaced repetition keeps 400+ terms fresh',
    body: 'AP Human Geography has one of the highest vocabulary loads of any AP course. SM-2 repetition ensures terms stay in long-term memory through May.',
  },
]

export default function APHumanGeographyFlashcardsPage() {
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
                <span className="text-primary-600">AP Human Geography Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any AP HuGe unit, model, or vocabulary set and get a complete flashcard deck in seconds. All 7 units covered. Spaced repetition included. No signup needed.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Diffusion Types', 'DTM Stages', 'Urban Models', 'Von Thunen', 'Migration Push/Pull', 'Supranationalism', 'World Systems Theory', 'FRQ Vocabulary'].map((tag) => (
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
                  Generate AP HuGe Flashcards Free
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
                AP HuGe prep in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From a blank review sheet to a full study deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your AP HuGe topic',
                  body: 'Enter "Unit 2 migration key terms", "urban land use models", "cultural diffusion types" — or upload your AMSCO chapter or review packet PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'AI creates definition cards, model explanation cards, and comparison cards — the exact types of questions on the AP HuGe exam and FRQs.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 algorithm ensures the 400+ key terms stay in long-term memory. Study smarter across the school year instead of cramming before May.',
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
                Example AP Human Geography flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                These are the kinds of cards Esli generates — click any card to flip it.
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
                    className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flippedCard === i ? '[transform:rotateY(180deg)]' : ''}`}
                  >
                    <div className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden]">
                      <p className="text-xs text-slate-400 mb-2">Question</p>
                      <p className="text-sm font-medium text-slate-800 text-center leading-relaxed">{card.q}</p>
                      <p className="absolute bottom-3 right-4 text-xs text-slate-300">tap to flip</p>
                    </div>
                    <div className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-xs text-primary-500 mb-2">Answer</p>
                      <p className="text-sm text-slate-700 text-center leading-relaxed">{card.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Generate Your AP HuGe Deck
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
                Why AP students use Esli for Human Geography
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Check className="text-primary-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{b.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-slate-200">
              {faqSchema.mainEntity.map((item, i) => (
                <div key={i}>
                  <button
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-slate-900">{item.name}</span>
                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="pb-5 text-slate-600 leading-relaxed">{item.acceptedAnswer.text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start studying smarter for AP HuGe
            </h2>
            <p className="text-lg text-primary-100 mb-10">
              Generate your first AP Human Geography deck in under a minute — free, no account needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-700 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate AP HuGe Flashcards Free
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-slate-500 mb-6">Related AP exam study tools</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'AP Biology Flashcards', href: '/flashcards/ap-biology' },
                { label: 'AP US History Flashcards', href: '/flashcards/ap-us-history' },
                { label: 'AI Flashcards for High School', href: '/use-case/high-school-students' },
                { label: 'World History Flashcards', href: '/flashcards/world-history' },
                { label: 'Sociology Flashcards', href: '/flashcards/sociology' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-primary-300 hover:text-primary-700 transition-colors no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a href="https://esli.app" className="flex items-center gap-2 no-underline">
              <div className="w-7 h-7 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">E</span>
              </div>
              <span className="text-lg font-bold text-slate-900">Esli</span>
            </a>
            <p className="text-sm text-slate-400">Free AI flashcard generator with spaced repetition.</p>
            <div className="flex gap-6">
              <a href="https://esli.app" className="text-sm text-slate-500 hover:text-slate-800 no-underline">Home</a>
              <a href={`${APP_URL}/register`} className="text-sm text-slate-500 hover:text-slate-800 no-underline">Get Started</a>
              <a href="https://esli.app/pricing" className="text-sm text-slate-500 hover:text-slate-800 no-underline">Pricing</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
